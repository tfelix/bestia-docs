---
weight: 100
title: Server Architecture
description: The zone-server/login-server split, the module layout of the bestia-behemoth monorepo, the boot sequence, and the database setup.
---

Both servers are plain **Spring Boot** applications (`ZoneServerApplication.kt` /
`LoginServerApplication.kt`, each a `@SpringBootApplication` with a `fun main`). There is no custom
application container, no Akka, no actor cluster — Spring's dependency injection wires together
plain Kotlin classes, most of them `@Component`/`@Service` beans.

# Module layout

Gradle multi-module build, declared in `settings.gradle`:

```text
bestia-behemoth/
  zone-server/     the game server (this page + most of the /docs/server/* pages)
  login-server/    stateless REST auth — see Authentication
  bnet-messages/   protobuf message contracts, generates both Kotlin and C# classes
  shared/          Role/Authority + EIP-712 DTOs, shared by both servers (not a shared DB)
  worldgen/        standalone world-generation pipeline, invoked by zone-server at boot
  cli-client/      headless Kotlin dev client
  bestia-client/   the Godot client (separate build, not a Gradle subproject)
```

Each server has its own `application.yml` and its own MariaDB database — see [Database](#database)
below.

# Boot sequence

`zone-server` starts up as an ordered chain of Spring `CommandLineRunner`/`ApplicationRunner` beans,
each carrying a `@Order` that fixes its position in the chain. Most live under
`zone-server/src/main/kotlin/net/bestia/zone/boot/`, but a few (like the item script validator
below) live next to the domain they validate and simply share the same `@Order` numbering scheme:

| Order                   | Runner                              | Purpose                                                                                                                                                                                                          |
| ----------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1                       | `WorldGenerationBootRunner`         | Generate or load the world. First and slowest step — everything else stands on it (entities load at positions in it, mobs spawn onto its terrain), so it fails fast rather than after importing everything else. |
| 8                       | `ChunkEditBootRunner`               | Put back the terrain players dug, saved by an earlier run                                                                                                                                                        |
| 100                     | `ItemImporterBootRunner`            | Import item definitions                                                                                                                                                                                          |
| 101                     | `MobImporterBootRunner`             | Import mob definitions                                                                                                                                                                                           |
| 102                     | `SkillImporterBootRunner`           | Import skill definitions                                                                                                                                                                                         |
| 103                     | `MasterSkillTreeImporterBootRunner` | Import the player skill tree                                                                                                                                                                                     |
| 104                     | `StatusEffectImporterBootRunner`    | Import status effect definitions                                                                                                                                                                                 |
| 110                     | `EntityLoaderBootRunner`            | Reload persisted entities into the ECS `World`                                                                                                                                                                   |
| 150                     | `EquipmentScriptBinderBootRunner`   | Bind equipment scripts to their items                                                                                                                                                                            |
| 200                     | `ContentValidationBootRunner`       | Run every `CatalogValidator` (skills, status effects, dialogs, item scripts, occupations, economy, mint chain) — fails boot on a mismatch, before any login or tick                                              |
| `LOWEST_PRECEDENCE - 2` | `ZoneReadyBootRunner`               | Flip `ZoneReadinessService` to ready, so logins are accepted only once everything above has finished                                                                                                             |
| `LOWEST_PRECEDENCE - 1` | `WorldBootRunner`                   | Start `ZoneEngine` — the ECS tick loop begins running                                                                                                                                                            |
| `LOWEST_PRECEDENCE`     | `SocketServerBootRunner`            | Bind the Netty socket and start accepting connections                                                                                                                                                            |
| `LOWEST_PRECEDENCE`     | `DevDataBootstrapRunner`            | Dev-only seed data (`@Profile("!test")`)                                                                                                                                                                         |

The ordering is deliberate: the socket only opens after the tick loop is running, and
`ZoneReadyBootRunner` gates client logins so nobody connects into a half-loaded world (see
`ClientMessageHandler.handleAuthenticationSuccess`, which checks `zoneReadinessService.isReady()`
before accepting an otherwise-valid login).

`login-server` has no comparable boot chain — it's a stateless REST controller layer over a JPA
repository, ready as soon as Spring context startup finishes. Its one boot-time actor is
`DevAccountSeeder`, an `ApplicationRunner` that seeds two dev accounts (`admin`, `user`) on every
start, needed because the in-memory database resets every restart.

# The pieces, at a glance

- **[Networking](/docs/server/networking)** — the Netty pipeline and the `Envelope` protobuf that
  every message, in both directions, travels as.
- **[Authentication](/docs/server/authentication)** — how `login-server` issues a JWT and how
  `zone-server` independently re-validates it; the two servers never call each other directly.
- **[ECS](/docs/server/ecs)** — `ZoneEngine` drives a single-threaded tick loop over a `World` of
  entities/components/systems, then flushes whatever changed to clients over the socket.
- Everything else (AI, battle, world generation, ...) is a set of ECS systems and supporting
  services layered on top of these three.

# Database

Both servers use **MariaDB** via Spring Data JPA/Hibernate, each with its own database and its own
`compose.yaml`:

| Server         | Database                   | Schema                                  |
| -------------- | -------------------------- | --------------------------------------- |
| `login-server` | `bestia_login` (port 3307) | Flyway migrations, `ddl-auto: validate` |
| `zone-server`  | `bestia_zone` (port 3306)  | no migrations, `ddl-auto: update`       |

Each server defines its **own** `Account` JPA entity independently; they are linked only by the
convention that `zone-server` carries a `loginAccountId: Long`, never a shared entity class or shared
table. Tests run on in-memory H2.

## How the zone writes

Nothing on the tick thread talks to the database. A system or handler takes a **snapshot** of an
entity (plain values, no live components) and hands it to `EntityWriteBehind`, which writes it on the
DB executor (`AsyncJobExecutor`). Every write about one owner uses the same key: a master's id, or
one shared key for the generic entity rows. So the writes for one owner land in the order they were
taken, and a delete never overtakes an earlier write.

- A master is written on every exp gain, on every status or skill point spend, on logout (the
  `PersistAndRemove` component), and by the periodic save. Selecting a master first waits for its
  pending writes, so a quick relog reads what the logout wrote.
- While a master is online its components are the authority, and `MasterEntityPersister` is the only
  writer of its level, exp, points, effort values and learned skill levels. A spend changes the
  components on the tick and is saved like any other change: the points and the skill levels they
  bought land in one transaction, so a crash loses both or neither.
- Party and inventory changes still write the `master` row directly, under a row lock. `Master` uses
  `@DynamicUpdate`, so such a write sets only the columns it changed and cannot put back a level the
  persister just saved. A party change locks the party row first; the party component on each member
  changes only after the commit, and a member who logs in gets it back from the row.
- The periodic save (`EntityPersistenceSystem`) runs on the tick. It saves each `Persistent` entity
  once per `persistence.interval-ms` (90 s by default) and spreads them over that time, a slice every
  second. An entity whose snapshot equals the last one queued is skipped. A failed write is retried by
  the next save. A blob row is updated in place, and Hibernate batches the updates.
- A failed DB job is logged with its owner key and counted (`zone_db_jobs_failed_total`). An item
  grant goes to the live inventory first, so its write is tried again when it lost a lock race; each
  such failure rolls back, so a second try cannot grant twice.
- On shutdown, `PersistOnShutdown` stops the tick, saves what changed, flushes the economy ledger and
  the terrain edits, and gives the DB executor up to 30 s to finish.
- Terrain edits: every edited chunk is one `chunk_edit` row. `ChunkEditJournal` writes the chunks edited
  since its last write every 10 s, keyed by chunk; see
  [World Generation](/docs/server/world-generation#storage-voxels-chunks-player-edits-and-regeneration).
- Wild den packs are not saved: a den makes a fresh pack when a player comes near.
- A drop removes the item in the database first; only then does it leave the live inventory and
  appear on the ground. A drop can lose an item but never copy one.
- Static content (items, species, loot tables, commodities) is read into in-memory catalogues once
  at boot (`CatalogueWarmUpBootRunner`), so the tick never needs a lookup.
- `TickSqlGuard`, a Hibernate statement inspector, reports any SQL that still runs on the tick
  thread (`zone.sql-on-tick: log`). It sees lazy loads behind a service call too.
