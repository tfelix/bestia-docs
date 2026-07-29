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
the command/deferred-change queues. Its own doc comment states the tick pipeline plainly:

```text
tick(dt):
  1. apply deferred structural changes queued last tick
  2. drain external commands  -> onCommand handlers
  3. run due systems          -> scheduler (parallel waves)
  4. apply deferred structural changes emitted by systems
```

Only the tick thread mutates ECS state directly. Other threads (network handlers, importers) may
call `World.send(command)` to enqueue intent, or `World.locked { ... }` / `World.read { ... }` to
take the world lock for a synchronous read — a single `ReentrantLock` guards all access, reentrant
so systems running inside `tick` (which already holds it) can freely call `get`/`add`/etc.
Structural changes requested while systems are iterating (`world.defer { ... }`) are automatically
pushed to the next safe sync point rather than corrupting an in-progress iteration.

```kotlin
// The common "get or create, then mutate" pattern used across systems:
world.update(entityId, default = { Exp() }) { exp ->
  exp.addExperience(150) // mutating through the component's own setter marks it dirty
}
```

# Components, stores, and queries

A component is a plain data class implementing the marker `Component` interface. `World.store()`
lazily creates a `ComponentStore<T>` per component type. `World.query(...)` builds a `Query` that
joins several stores by entity id, iterating the *smallest* store and skipping entities missing any
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
less often, `deltaTime` is the *real* elapsed time since they last ran, not just one tick's worth, so
time-integrating logic (countdowns, decay) stays correct regardless of cadence.

`SystemScheduler` groups registered systems into ordered **waves**: two systems conflict if one
writes a component type the other reads or writes, and a system is placed in the earliest wave
strictly after any conflicting, earlier-registered system. Non-conflicting systems within a wave may
run concurrently on the common `ForkJoinPool` when `world.parallel-systems: true` (`application.yml`,
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

# ZoneEngine: the tick loop

`ecs/ZoneEngine.kt` owns the actual running loop. `start()` submits a loop to a dedicated
single-thread executor (`zone-tick`) that ticks the `World` at `world.tick-rate` (20 Hz by default,
`application.yml`) and sleeps out the remainder of each tick period. After every `world.tick(dt)`
call, `ZoneEngine.syncDirtyComponents()` flushes whatever changed out to clients — see below.

There's also an `ecs/EcsRunner.kt`, explicitly documented as not a Spring bean by default — a
leftover/utility alternative driver, not part of the live boot path (`WorldBootRunner` starts
`ZoneEngine`, not `EcsRunner`).

# Dirty components and sync

The `World` keeps no separate change-tracking ledger. A component is the single source of truth for
whether it needs re-sending, via the `Dirtyable` interface:

```kotlin
interface Dirtyable {
  fun isDirty(): Boolean
  fun markDirty()   // force a resync even though nothing changed (e.g. client re-requests state)
  fun clearDirty()
  fun toEntityMessage(entityId: Long, removed: Boolean = false): EntitySMSG
  fun syncTargets(world: World, entityId: EntityId): SyncTargets
}
```

Mutating a `Dirtyable` component through its own setters marks it dirty; a freshly added component
starts dirty. Each tick, `ZoneEngine` scans every registered `Dirtyable` component type, and for
each dirty instance builds its `toEntityMessage()` and resolves who should receive it:

```kotlin
sealed interface SyncTargets {
  data object PublicInRange : SyncTargets            // broadcast to everyone in AOI range
  data object OwnerOnly : SyncTargets                 // only the owning account
  data class Accounts(val accountIds: Set<Long>) : SyncTargets  // an explicit set (e.g. + party)
}
```

`Position` changes also update the area-of-interest services (below) in the same pass. Outbound
sends are handed off to a small worker pool (`AsyncJobExecutor`) so the tick thread never blocks on
network I/O — see [Networking](/docs/server/networking#dirty-component-sync-not-full-state-broadcast).
A component explicitly removed from a still-alive entity (implementing `Removable`) gets one more
sync call with `removed = true`; a whole entity being destroyed instead triggers a `VanishEntitySMSG`
broadcast to the union of every synced component's targets.

# Area of interest

`AreaOfInterestService<T>` is a generic, auto-growing **octree** (subdivide above 40 entities per
node, merge below 15; doubles its root extent on demand rather than dropping out-of-bounds
entities). Two instances exist:

- `EntityAOIService` — every entity, keyed by entity id, used for `sendToAllPlayersInRange` fan-out.
- `ActivePlayerAOIService` — only players, keyed by account id, used to answer "who is near this
  position" for the sync pass above.

```kotlin
fun queryEntitiesInCube(center: Vec3L, size: Long): Set<T>
```

Both are kept in sync with `Position` changes as part of `ZoneEngine.syncDirtyComponents()` — there
is a `TODO` in that method noting it might be cleaner to update AOI directly from the movement
system instead, which hasn't been done yet.
