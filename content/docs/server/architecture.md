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

Each server has its own `application.yml` and its own H2 datasource — see [Database](#database)
below.

# Boot sequence

`zone-server` starts up as an ordered chain of Spring `CommandLineRunner`/`ApplicationRunner` beans,
each carrying a `@Order` that fixes its position in the chain. Most live under
`zone-server/src/main/kotlin/net/bestia/zone/boot/`, but a few (like the item script validator
below) live next to the domain they validate and simply share the same `@Order` numbering scheme:

| Order | Runner | Purpose |
| --- | --- | --- |
| 1 | `WorldGenerationBootRunner` | Generate or load the world. First and slowest step — everything else stands on it (entities load at positions in it, mobs spawn onto its terrain), so it fails fast rather than after importing everything else. |
| 100 | `ItemImporterBootRunner` | Import item definitions |
| 101 | `MobImporterBootRunner` | Import mob definitions |
| 102 | `SkillImporterBootRunner` | Import skill definitions |
| 103 | `MasterSkillTreeImporterBootRunner` | Import the player skill tree |
| 104 | `StatusEffectImporterBootRunner` | Import status effect definitions |
| 110 | `EntityLoaderBootRunner` | Reload persisted entities into the ECS `World` |
| 150 | `EquipmentScriptBinderBootRunner` | Bind equipment scripts to their items |
| 200 | `ItemScriptValidator` | Validate every consumable/equip item's script reference resolves — fails boot on a mismatch |
| `LOWEST_PRECEDENCE - 2` | `ZoneReadyBootRunner` | Flip `ZoneReadinessService` to ready, so logins are accepted only once everything above has finished |
| `LOWEST_PRECEDENCE - 1` | `WorldBootRunner` | Start `ZoneEngine` — the ECS tick loop begins running |
| `LOWEST_PRECEDENCE` | `SocketServerBootRunner` | Bind the Netty socket and start accepting connections |
| `LOWEST_PRECEDENCE` | `DevDataBootstrapRunner` | Dev-only seed data (`@Profile("!test")`) |

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

Both servers use **H2, in-memory**, via Spring Data JPA/Hibernate:

```yaml
spring:
  datasource:
    url: jdbc:h2:mem:behemoth   # zone-server; login-server uses jdbc:h2:mem:login
  jpa:
    hibernate:
      ddl-auto: create          # schema dropped and recreated on every start
```

There is no Flyway/Liquibase and no persistent volume — this is explicitly a development
configuration, not something to assume is production-ready. Each server defines its **own** `Account`
JPA entity independently; they are linked only by the convention that `zone-server` carries a
`loginAccountId: Long`, never a shared entity class or shared table. The H2 web console is enabled
on both (`spring.h2.console.enabled: true`).

`zone-server`'s world state is a partial exception: player-owned entities are persisted (see
`EntityLoaderBootRunner` reloading them at boot, and the `PersistAndRemove` component that persists
a disconnecting player's entity asynchronously before removing it from the live `World`), but this
still lives in the same schema-per-boot H2 instance as everything else.
