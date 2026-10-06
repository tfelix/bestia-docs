---
weight: 260
title: Metrics and Logs
description: What zone-server measures about itself — tick time per system, queues, connections, socket traffic and database jobs — where to scrape it, and how to add a meter.
---

# Where the numbers are

`zone-server` serves its metrics as Prometheus text on a port of their own:

```sh
curl -s 127.0.0.1:8092/actuator/prometheus | grep ^zone_
```

The port binds to loopback only (`management.server` in `application.yml`). It is not the tile port
(8091) and not the game socket (8090), so a proxy in front of the tiles never reaches it. Only
`health` and `prometheus` are exposed.

# What is measured

| Meter                             | Type     | Tags                                       | What it says                                                  |
| --------------------------------- | -------- | ------------------------------------------ | ------------------------------------------------------------- |
| `zone_tick_duration_seconds`      | timer    | `part` = `total`, `systems`, `sync`        | Time per tick; buckets at half, one and two tick budgets      |
| `zone_tick_overruns_total`        | counter  |                                            | Ticks longer than their budget (50 ms at 20 Hz)               |
| `zone_tick_dropped_steps_total`   | counter  |                                            | Ticks skipped because the loop fell too far behind            |
| `zone_system_duration_seconds`    | function | `system`, `phase`                          | Time each system spent in its updates, and how often it ran   |
| `zone_system_failures_total`      | counter  | `system`                                   | Updates of a system that threw                                |
| `zone_systems_disabled`           | gauge    |                                            | Systems switched off after five failures in a row             |
| `zone_tick_posted_pending`        | gauge    |                                            | Tick-lane messages and leases waiting for the tick thread     |
| `zone_entities`                   | gauge    |                                            | Entities in the world                                         |
| `zone_inbox_pending`              | gauge    |                                            | Client messages that arrived and have not started             |
| `zone_inbox_io_queued`            | gauge    |                                            | IO-lane messages waiting for a free IO thread                 |
| `zone_inbox_overflows_total`      | counter  |                                            | Connections closed because their inbox was full               |
| `zone_db_jobs_pending`            | gauge    | `worker`                                   | DB jobs queued on one worker                                  |
| `zone_db_jobs_rejected_total`     | counter  |                                            | DB jobs dropped because their queue was full                  |
| `zone_db_jobs_failed_total`       | counter  |                                            | DB jobs that threw                                            |
| `zone_db_job_duration_seconds`    | function | `stage` = `wait`, `run`                    | How long DB jobs waited in their queue, and how long they ran |
| `zone_players_connected`          | gauge    |                                            | Accounts with a logged-in connection                          |
| `zone_players_sessions`           | gauge    |                                            | Accounts holding a session                                    |
| `zone_socket_channels`            | gauge    |                                            | Open game connections, logged in or not                       |
| `zone_socket_written_bytes_total` | counter  |                                            | Bytes flushed to clients                                      |
| `zone_socket_read_bytes_total`    | counter  |                                            | Bytes received from clients                                   |
| `zone_socket_flushes_total`       | counter  |                                            | Flushes to clients; each is at least one write call           |
| `zone_socket_flush_size_bytes`    | summary  |                                            | Bytes per flush, with buckets from 1 KiB to 256 KiB           |
| `zone_socket_dropped_total`       | counter  | `reason` = `backlog`, `unwritable`         | Clients closed because they stopped reading                   |
| `zone_chunk_inbox_pending`        | gauge    | `kind` = `requests`, `carves`, `teleports` | Chunk work waiting for the tick                               |
| `zone_map_renders_queued`         | gauge    |                                            | Map tiles waiting for a render thread                         |

Spring Boot adds its own meters on top: the JVM (`jvm_gc_pause_seconds` lines up with slow ticks),
the database pool (`hikaricp_connections_pending`, `hikaricp_connections_acquire_seconds`),
repository calls (`spring_data_repository_invocations_seconds`) and the tile requests
(`http_server_requests_seconds`).

Every series also carries `application="zone-server"` and `shard`, the zone's shard id.

**No meter is tagged with an account or an entity.** One series per player would grow without end.
To compare clients, divide: bytes written by connected players gives bytes per player, flushes by
players gives flushes per player.

# The slow-tick line

Prometheus shows how ticks are spread over time, not what one late tick was made of. For that the
zone still logs one warning when a tick overruns, at most once a second:

```
Zone tick took 87 ms against a 50 ms budget (systems 71 ms, component sync 16 ms): ChunkStreamSystem 40.1ms, ...
```

It names the five slowest systems of that tick. The line and `zone_tick_duration_seconds` come from
the same measurement.

# The account in a log line

While a client message runs, its account id is in the logging context. A log line written during
that time shows `account=<id>` right after the level:

```
2026-10-06T14:02:11.512+02:00  WARN account=42 81234 --- [zone-io-lane-1] n.b.z.item.UseItemHandler : ...
```

Lines that run for no account (the tick's systems, boot, DB jobs) have no such field.

# Adding a meter

1. Keep a plain counter where the thing happens: an `AtomicLong`, a `LongAdder`, or a size you can
   read. Code under `ecs/core` must not import Micrometer.
2. Bind it in `zone/metrics/` (`ZoneMeters` for a gauge or a count, `TickMetrics` for something the
   engine records per tick). Gauges and function meters are read when the metrics are scraped, so
   nothing on the tick pays for them.
3. Name it `zone.<area>.<what>`; Prometheus turns dots into underscores and adds the unit.
4. Use tags only with a small, fixed set of values.
5. Add it to the table above.
