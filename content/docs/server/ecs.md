---
weight: 250
title: Entity Component System
description: The hand-rolled ECS that runs the game loop — World, component stores, the parallel-wave scheduler, and how component changes reach clients.
---

`zone-server`'s game loop is a **hand-rolled ECS** (no external ECS library) living under
`zone-server/src/main/kotlin/net/bestia/zone/ecs/`. Everything gameplay-related — position, health,
inventory, AI state — is a component on an entity, and every rule that acts on that data is a
`System`.

# World

`ecs/core/World.kt` is the central facade: entities, component stores, the system scheduler, and
the deferred-change queue. Its own doc comment states the tick pipeline plainly:

```text
tick(dt):
  1. run posted work          -> tick-lane messages, leases, skill resolutions
  2. run due systems          -> scheduler (parallel waves)
  3. apply deferred structural changes emitted by systems
```

The tick thread owns the world and calls its accessors (`get`, `add`, `query`, ...) directly. Other
threads (IO-lane handlers, schedulers, DB jobs) never call an accessor. They either `post { ... }` work
to the tick thread, or use a `WorldView` scope (`read`/`modify`/`createEntity`), which borrows the
world for a moment between two ticks — see [Threads and the Tick](/docs/server/threading). Structural changes requested while systems are
iterating (`world.defer { ... }`) are automatically pushed to the next safe sync point rather than
corrupting an in-progress iteration.

```kotlin
// The common "get or create, then mutate" pattern used across systems:
world.update(entityId, default = { Exp() }) { exp ->
  exp.addExperience(150) // mutating through the component's own setter marks it dirty
}
```

# Components, stores, and queries

A component is a plain data class implementing the marker `Component` interface. `World.store()`
lazily creates a `ComponentStore<T>` per component type. `World.query(...)` builds a `Query` that
joins several stores by entity id, iterating the _smallest_ store and skipping entities missing any
of the rest — iteration cost is proportional to the rarest component in the join, not the whole
world:

```kotlin
world.query(Position::class, Speed::class).each { id ->
  val pos = get<Position>()
  val speed = get<Speed>()
  // ...
}
```

# Systems and the wave scheduler

A `System` declares how often it runs and which component types it reads/writes:

```kotlin
interface System {
  val schedule: Schedule get() = Schedule.EveryTick
  val reads: ComponentClassSet get() = emptySet()
  val writes: ComponentClassSet get() = emptySet()
  fun update(world: World, deltaTime: Float)
}
```

`Schedule` is `EveryTick`, `EveryTicks(n)`, or `EverySeconds(seconds)` — expensive systems (e.g.
something that only matters every few minutes) don't need to run every tick, and when they do run
less often, `deltaTime` is the _real_ elapsed time since they last ran, not just one tick's worth, so
time-integrating logic (countdowns, decay) stays correct regardless of cadence.

`SystemScheduler` groups registered systems into ordered **waves**: two systems conflict if one
writes a component type the other reads or writes, and a system is placed in the earliest wave
strictly after any conflicting, earlier-registered system. Non-conflicting systems within a wave may
run concurrently on the scheduler's own `ForkJoinPool` when `world.parallel-systems: true` (`application.yml`,
default `false` — the whole simulation runs single-threaded by default and this is a genuinely
optional feature, not the normal mode).

Every `System` bean is Spring-collected (`List<System>` injection) into one `World` in
`EcsConfiguration`:

```kotlin
@Bean
fun ecsWorld(systems: List<System>, worldConfig: WorldConfig, zoneShardConfig: ZoneConfig): World {
  val idGenerator = SnowflakeEntityIdGenerator(nodeId = zoneShardConfig.shardId)
  return World(parallelSystems = worldConfig.parallelSystems, idGenerator = idGenerator, systems = systems)
}
```

To add game logic: implement `System`, register it as a Spring `@Component`/`@Service` bean, and
declare accurate `reads`/`writes` sets — that's what makes the parallel-wave scheduling safe.

## When a system fails

One broken system must not stop the world, so failures are contained at three levels:

- **Per system.** The scheduler catches what a system throws, logs it, and goes on with the next
  system. The deferred changes and the client sync still happen on that tick. A system that fails
  5 ticks in a row (`SystemScheduler.MAX_CONSECUTIVE_FAILURES`) is switched off with an ERROR log.
- **Per entity.** Inside a tick, `query(...).each` skips an entity whose action throws. More than 8
  failures in one pass is a bug in the system, not in one entity, so it counts as a system failure.
- **Per deferred change and posted task.** One that throws is logged; the rest still apply.

Only errors after which the JVM cannot be trusted (out of memory, internal VM errors) end the tick
loop, and `ZoneEngine` logs that the loop died instead of losing the thread silently.

# ZoneEngine: the tick loop

`ecs/ZoneEngine.kt` owns the actual running loop. `start()` runs a loop on a dedicated
single-thread executor (`zone-tick`) that ticks the `World` at `world.tick-rate` (20 Hz by default,
`application.yml`). After every `world.tick(dt)` call, `ZoneEngine.syncDirtyComponents()` flushes
whatever changed out to clients — see below.

The step is **fixed**: every tick hands the systems exactly `1 / tick-rate` seconds (50 ms), measured
on `System.nanoTime`, so a wall-clock jump cannot produce a negative or huge delta. `FixedStepClock`
counts the steps that are due. A late loop runs at most 3 steps back to back to catch up and drops
the rest, so after a long pause the world runs slow for a moment instead of racing. Dropped steps
show up in the slow-tick warning.

There's also an `ecs/EcsRunner.kt`, explicitly documented as not a Spring bean by default — a
leftover/utility alternative driver, not part of the live boot path (`WorldBootRunner` starts
`ZoneEngine`, not `EcsRunner`).

# Dirty components and sync

A component says whether it needs re-sending through the `Dirtyable` interface:

```kotlin
interface Dirtyable {
  val dirtyFlag: DirtyFlag
  fun isDirty(): Boolean   // dirtyFlag.isSet
  fun markDirty()          // force a resync even though nothing changed (e.g. client re-requests state)
  fun clearDirty()
  fun toEntityMessage(entityId: Long, removed: Boolean = false): EntitySMSG
  fun syncTargets(world: World, entityId: EntityId): SyncTargets
}
```

Mutating a `Dirtyable` component through its own setters marks it dirty; a freshly added component
starts dirty. When its `DirtyFlag` goes from clean to dirty, it enters the entity into the world's
`DirtyLog` — the component store attached the flag when the component was added. Each tick,
`ZoneEngine` drains that log rather than scanning every store, so an idle world costs nothing to
sync. For each entry that is still dirty it builds `toEntityMessage()` and resolves who should
receive it:

```kotlin
sealed interface SyncTargets {
  data object PublicInRange : SyncTargets            // everyone who sees the entity
  data object OwnerOnly : SyncTargets                 // only the owning account
  data class Accounts(val accountIds: Set<Long>) : SyncTargets  // an explicit set (e.g. + party)
}
```

`Position` has a second flag, `movedFlag`, with its own log: every step re-indexes the entity in the
area-of-interest services (below), even the steps that are not sent.
Everything the sync has for one account, changes, removals, vanishes and snapshots, goes out as one
`StateBatchSMSG` stamped with `World.tickCount`. The batches go into the tick's `TickOutbox` and
leave as one write per account when the tick ends, so the tick thread never blocks on network
I/O — see [Networking](/docs/server/networking#entity-state-one-batch-per-client-per-tick).
An account that starts to see an entity (it walked into view, or the account received the chunk the
entity stands in) gets a full snapshot instead (`EntitySnapshotBuilder`): every component it may
see, visual first, then position, speed and path. That account skips the entity's changed
components in the same tick, so a spawning entity reaches each client once and in order.

A component explicitly removed from a still-alive entity (implementing `Removable`) gets one more
sync call with `removed = true`; a whole entity being destroyed instead gets a `VanishEntitySMSG`
in the next sync's batches, addressed to the union of every synced component's targets.

`AsyncJobExecutor` is for database and other blocking work only. Its four workers each queue at most
2048 jobs; a job that does not fit is dropped and counted (and logged) rather than run on the
caller, because the caller is usually the tick.

# Area of interest

Two different questions have two different answers:

- **Who sees this entity?** The accounts holding the chunk it stands in
  (`EntityVisibility.observersOf`, backed by the chunk subscriptions of the terrain stream), plus
  the player's own account. `EntityAudience` holds this rule. Component state and one-off events
  (`OutMessageProcessor.sendToObserversOf`) both use it, so they always reach the same clients.
- **What is near this position?** `EntityAOIService`, an `AreaOfInterestService`, keyed by entity
  id. Game logic uses it for range queries, such as perception and the victims of an area effect.

`AreaOfInterestService` answers "what is inside this box" with a **uniform grid** of 32 × 32-column
cells, one cell per chunk column. A step inside a cell is three array writes; a step into the next
cell moves the entity between two cell lists; a query visits only the cells it overlaps and builds
no tree. Each service holds two grids, one per `AoiLayer`, so a question about moving things never
walks the tens of thousands of static ones (trees, rocks, buildings).

```kotlin
fun queryEntitiesInCube(center: Vec3L, size: Long, layers: Set<AoiLayer> = AoiLayer.ALL): Set<Long>
fun forEachInCube(center: Vec3L, size: Long, layers: Set<AoiLayer>, action: (Long, Long, Long, Long) -> Unit)
fun anyWithinHorizontal(x: Long, y: Long, radius: Long): Boolean
```

The grid takes no lock: it is only touched with the world to itself (on the tick thread, or inside a
world scope). The index follows `Position.movedFlag` in `ZoneEngine.syncDirtyComponents()`, so
every step is indexed, including the steps that are not sent to clients.
