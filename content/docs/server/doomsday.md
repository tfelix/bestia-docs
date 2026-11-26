---
weight: 512
title: Doomsday
description: "Server design for the doomsday: the doom clock, threats as beans, the Foreshadowing, the world end, the rebirth with its carry-over, the login gate, GM tools and the build order."
---

{{< alert context="warning" text="**Designed, not built.** The player-facing rules are on [Doomsday](/docs/mechanics/world/doomsday/). This page says how the zone runs them. The [build order](#build-order) is a stack of small slices." />}}

The doomsday sits on top of the [World Events](/docs/server/world-events/) work. The mana field, provinces, the
director, rifts, seals, rumours and Observation all exist. The doomsday adds four things:

- a **doom clock** that is chosen with the world and runs in real time,
- **threats** as Spring beans, one per kind,
- a **world end** that records the outcome and restarts the zone,
- a **rebirth** that generates the next world and applies the carry-over.

```mermaid
graph LR
    Picker["DoomsdayPicker<br/>seeded, force keys"] --> Row["doomsday row"]
    Row --> Director["DoomsdayDirector<br/>every 5 min"]
    Threat["DoomThreat bean<br/>pressure, containment"] --> Director
    Director --> Clock["DoomClock<br/>D, stage"]
    Clock --> Threat
    Clock --> Look["WeatherSMSG doom fields,<br/>felt text, rumours"]
    Clock --> End["WorldEnd<br/>Last Stand or Calling"]
    End --> Restart["exit, compose restarts"]
    Restart --> Rebirth["recreate + carry-over"]
```

# Doom Clock

## Choosing the Threat

`DoomsdayPicker` runs once per world, on the first boot that finds no `doomsday` row. It does not touch the worldgen
pipeline, so no stage or `pipelineVersion` changes. It reads the generated world:

- Every `DoomThreat` bean answers `fits(world)` and `origin(world)`.
- The pick is weighted and seeded from the world seed, so a regenerated world with the same seed picks the same.
- `doomsday.force-kind`, `doomsday.force-foreshadow` and `doomsday.force-origin` override the pick for alpha tests.
  A forced kind whose `fits` is false is logged and replaced by a seeded pick.

The picker also rolls the times. All are real days, all are config:

| Value         | Default                                                          |
| ------------- | ---------------------------------------------------------------- |
| Onset         | `onset-min-days` 180 + rand(0..`onset-spread-days` 90)           |
| Unfold `U`    | rand(`unfold-min-days` 180 .. `unfold-max-days` 365)             |
| Life span `L` | onset + U                                                        |
| Foreshadowing | rand(`foreshadow-at-min` 0.4 .. `foreshadow-at-max` 0.6) × onset |
| Saved cap     | `saved-at-t` 150, so world age = 1.5 × L                         |
| Time scale    | `time-scale` 1                                                   |

World age comes from `PersistedWorld.createdAt`, the same anchor `WoundSources` and `BestiaClock` use. `time-scale`
multiplies real time for every doomsday reading, so `30` runs a whole world in about two weeks on a test server.

## The Clock

`DoomClock` is pure and has no Spring parts, so `DoomClockTest` runs a whole world in memory.

```text
baseRate = 1 / U                       per real day
pace     = clamp(1 + pressure - containment, 0.25, 3.0)
D       += baseRate * pace * days       after onset, clamped to 0..1
T        = worldAge / L * 100
```

- `push(delta)` moves `D` directly. Threats use it for big deeds, the Foreshadowing for its outcome on the onset, and
  the Last Stand for its win.
- Stages: Omens 0.00, Onset 0.15, Escalation 0.40, Cataclysm 0.90. A stage changes only once `D` is 0.02 past the
  threshold, so it does not flicker. Stages can go back down.
- `D = 1` opens the Last Stand. `T >= saved-at-t` opens the Calling.
- A GM pace override replaces the computed pace until it is set back to `auto`.

## DoomsdayDirector

`DoomsdayDirector` runs like `WorldEventDirector`: `@Scheduled` every 5 minutes, `@Transactional`, off the tick.
World actions go through `WorldView`.

1. Ask the threat for `pressure()` and `containment()`.
2. Step the clock and save the row.
3. On a stage change: `threat.onStage(from, to)`, the felt text, rumours and a chronicle fact.
4. Run the threat's `step(D, seconds)`.
5. Publish the doomsday to `BrewingEvents`, so Observation feels it at `feltFrom = 10`.
6. Check the endings.

The Foreshadowing has its own small state in the same row and is stepped by the same director.

## DoomThreat

```kotlin
interface DoomThreat {
  val kind: DoomKind
  val shape: Shape // ACTOR, FRONT, PULSE
  fun fits(world: GeneratedWorld): Boolean
  fun origin(world: GeneratedWorld, random: Random): Vec2d?
  fun onStage(from: DoomStage, to: DoomStage)
  fun step(d: Double, seconds: Double)
  fun pressure(): Double    // 0..1
  fun containment(): Double // 0..1
  fun look(at: Vec3L): Double // 0..1, how strongly a player there feels it
  fun avatar(): Avatar?
}
```

A threat runs in **foreshadow mode** with a province, a fixed duration and its own small `D`. It has no Last Stand
then.

Front threats compute containment the same way: `1 - actualArea / targetArea(D)`.

# Threats of the First Wave

## Void Tear

- `fits`: a Wound outside the sanctuary provinces. `origin`: the Wound with the highest potential.
- **Omens:** `WorldEventDirector` gets a weight bonus for `rift` in provinces within reach of the origin.
- **Onset:** a `tear` row (like `rift`, with a radius and a reservoir) and a gate entity at the origin.
  - The tear pours mana scaled by `D` (`WoundSources` pattern).
  - It seeds knots within `R(D)` through `Rifts.formKnot`.
  - A rift that merges into it pushes +0.01.
  - Hordes use `RiftHordes`.
- **Escalation:** the Void Sovereign anchors at every 0.1 of `D`.
  - Its fall pushes −0.03 and opens a seal window (`RiftSeals`, Dispel against the tear's potency).
  - A seal pushes −0.15 and shrinks `R`.
- **Pressure:** the density ring around the tear, and open rifts in reach.
- **Containment:** rifts sealed in reach over 7 real days, and the reservoir drained.

## Withering

- `fits`: land with blight history outside the sanctuaries.
  `origin`: the cell with the highest `CORRUPTION` near a `BLIGHT_SPREAD` or `SETTLEMENT_FORSAKEN` place.
- **CorruptionField:** 128 m cells in 4 km tiles, intensity 0..1, only changed tiles stored.
  - It is the `ManaField` layout with its own lock.
  - Persistence follows `ManaJournal`: `corruption_tile` rows stamped with the shape and pipeline version, flushed every
    5 minutes and at shutdown.
  - It is wiped by `WorldScopedData`.
- **Corruption crystals:** a new breakable prop kind with health, served by a `WorldObjectSource` like `SealStones`.
  - Rows: `corruption_crystal`.
  - Each crystal raises the cells within its radius every step.
  - New crystals sprout at the edge of cells above 0.6 while the corrupted area is below `A(D)`.
  - A broken crystal stops and drops shards.
- **Plants die:** a batch job walks the columns of cells above 0.7 and removes vegetation props with `GONE_FOR_GOOD`.
  It covers resident and unseen props, like `SettlementFateService.raze`.
- **Exposure:** `WITHERING` through `EnvironmentalExposureSystem`, the `MANA_SICKNESS` pattern.
- **Corrupted spawns:** event spawns in corrupted cells carry the `CORRUPTED` status. Capture refuses any target with
  it.
- **Cleansing:** a `RitualObserver` lowers the cells within 300 m and wards them for 7 real days.
- **Client:**
  - A `CORRUPTED` ground layer through `GroundOverlayService`, the scorch path.
  - The client gets a second ground-marks texture, because `GroundLayer.CHANNELS = 4` is full.
  - Terrain slot 11 is the creep material with a flowing UV animation. Grass blades wither where the layer is high.

## The Destroyer

- `fits`: a sealed world boss outside the sanctuaries (`WorldBossSealService.all()`).
- **Onset:** `OldSeal.freeBoss` frees it. A `destroyer` row holds the entity id, the stack, the target town and the
  state.
- **Status:** `DESTROYER` with stacked multipliers on HP, attack, defence and regeneration (config). Capture refuses
  any target with it.
- **March:** the home position is the next standing town (`StandingSettlements`). On arrival the town falls through
  `SettlementFateService.raze`, the Destroyer heals fully, its stack grows, and `D` is pushed +0.08.
- **Defeat:** −0.10 and a 3 real-day return timer. A ritual at the lair within the window re-seals it (the
  `CrackingSeals` pattern).

## Flood: Study First

Flood is not built in this wave. Step 12 is a study over many seeds that answers whether a flood can be fair:

- At least one start town must never be flooded, ideally a high one, so a late player can always start.
- The flood has a maximum height, so a real landmass remains.
- Temples and cult sanctuaries may be flooded.

The study measures, per world, the floor height of every start town and home village, and the share of land and
towns above `seaLevel + h` for `h` from 2 to 20 m. It evaluates:

- a per-world cap `maxRise = min(config, highestStartTownFloor - margin)`, with Flood unfit below a minimum rise;
- spawn safety: candidates under the line are dropped, the highest start town is never a target, and a drowned home
  is re-homed there;
- a landmass floor;
- a worldgen guarantee only if the numbers need one.

If the answer is go, Flood gets its own plan. The starting sketch:

- Water at or below a flood line inside a flood zone counts as a fixed source in `WaterChunk`.
- A `FloodRaiser` fills the zone from the sea with `ChunkService.editFluid`.
- `GeneratedWaterSource` adds the line.
- Ground items take `Element.WATER` damage through `GroundItemDamage`.
- Dikes are a structure kit that the fill treats as solid.

# Presentation

- **`WeatherSMSG`** gets `doom_kind`, `doom_stage` and `doom_local` (quantised 0..1) per player.
  - `WeatherPublisher` forces a send when they change, like `mana_tier`.
  - `doom_local` comes from `threat.look(at)`.
- **Client:**
  - `DoomLook` maps kind, stage and local intensity to a mood strength.
  - One mood resource per kind lives in `Sky/moods/`.
  - `environment.gd` replaces `_follow_mana_mood` with `_follow_moods`, which takes the stronger of the mana mood and
    the doom mood.
- **Felt text:** `AnnouncementSMSG` gets `ANNOUNCEMENT_DOOM_STAGE` with args, sent per player.
  - The args name the stage and the compass direction from the player to the origin.
  - The text never says how far away it is.
- **Rumours:** `DOOM_OMEN`, `DOOM_ONSET`, `DOOM_SPREADS` and `FORESHADOW_*` through `RumourService.post`, with lines
  in `rumours.yml` and `dialogs.csv`.
- **Chronicle:** `LivingChronicle.record` for stage changes, the Foreshadowing outcome and the end.

# World End

A world can only be loaded at boot. `WorldService.loaded` is set once, and many services cache the world `by lazy`.
So the world end is a controlled restart, not a live swap.

`WorldEnd` runs the sequence:

1. **Window.**
   - Lost: the Last Stand opens for 24 real hours and spawns `threat.avatar()` at the core. If it falls, `D` is pushed
     to 0.85 and the window closes.
   - Saved: the Calling counts down 24 real hours.
2. **Countdown.** `AnnouncementSMSG` `ANNOUNCEMENT_WORLD_ENDING` at 24 h, 1 h and 10 min.
3. **Final sequence.** 90 s before the kick, `WorldEndSMSG` goes to every connection, and to anyone who logs in during
   those 90 s. It holds:
   - the outcome
   - the summary: world name, threat, days lived, `T`, towns lost, top deeds, the victorious Order (empty until
     factions exist)
   - the seconds until the kick
4. **Record.** `world.ended_at`, `world.outcome` and `world.t_percent` are set. A `world_legacy` row is written: name,
   seed, threat, outcome, `T`, the summary, and the top contributors who opted in. `world_legacy` is never wiped.
5. **State.** The zone sets the Valkey key `world:state` to `REBIRTH` through the `bus` module.
6. **Kick.** `Disconnected{reason = "WORLD_ENDED"}` goes to every connection through `ChannelRegistry`.
7. **Exit.** `PersistOnShutdown` flushes everything, then the zone exits with a dedicated code.
   `deploy/compose.yaml` restarts it (`restart: unless-stopped`). In development the zone has to be started again by
   hand.

## The Client Sequence

`Game/UI/WorldEnd/` is a full-screen overlay that takes all input.

- **Lost:**
  - A burn-dissolve shader creeps in from the screen edges, with embers, and fades to black.
  - Red title "The world has ended".
  - The summary line by line.
  - "A new world is about to be born".
- **Saved:**
  - A music slot (no file yet).
  - A slow white fade.
  - A dissolve shader with rising light motes on every visible master and bestia.
  - White title "The world is saved".
  - The same summary.

After the disconnect the overlay stays and then hands over to the rebirth screen.

# Rebirth

## Boot After an End

- `WorldService.resolve` sees `ended_at != null` and calls `WorldProvisioning.recreate()`, whatever `on-mismatch` says.
- `WorldRecreatedEvent` gets a `cause`: `WORLD_ENDED` or `VERSION_MISMATCH`. The carry-over listeners act only on
  `WORLD_ENDED`, so a development regeneration keeps today's behaviour.
- `recreate()` already reads `winningFaction` off the discarded row. It stays null until factions exist.

## Carry-Over

Each slice that owns the data adds a `WorldRecreatedEvent` listener, ordered before `MASTER_HOMES`:

| Data                                                             | On a world end                                         |
| ---------------------------------------------------------------- | ------------------------------------------------------ |
| Master level, skills, recipes, compendium, global honor          | Kept                                                   |
| `player_bestia`, stored ones included                            | Kept, `stored_at` and `deposited_at_structure` cleared |
| `item_container` MASTER and BESTIA                               | Every slot emptied except `equippedIn` slots           |
| Guild level, exp, skills, members, ranks, emblem                 | Kept                                                   |
| `guild_storage`                                                  | Emptied                                                |
| `player_structure` with storage, farms, incubators, etching jobs | Deleted                                                |
| `player_settlement`, `order_place`, `stronghold`, seeds          | Deleted                                                |
| `letter`, `parcel`, auctions and pickups, street stalls          | Deleted, their items with them                         |
| `quest`, quest log, blackboard postings                          | Deleted                                                |
| Notebook marks and routes, warp marks, home post office          | Cleared                                                |
| `status_effect`, `bestia_egg`, loot and mob entities             | Deleted                                                |

`MasterWorldResetListener` then re-homes masters and bestia as it does today.

## Login Gate

- `bus` owns the key `world:state` (`REBIRTH` or absent). The zone clears it in `ZoneReadyBootRunner`.
- The login server reads it on a game login and refuses with `GameLoginReason.WORLD_REBIRTH`.
- The client shows a rebirth screen for that reason, for the zone's `SERVER_NOT_READY` and for `WORLD_ENDED`, instead
  of "connection lost". It retries on its own.
- The api server reads the same key, so the companion app shows the Interregnum page with the last `world_legacy` row.

# GM Tools

All under `Authority.WORLD_EVENTS`, following the `/event` pattern:

- `/doom`: kind, origin, stage, `D`, pace, pressure, containment, `T` now and the projected end day
- `/doom set <D>`, `/doom push <delta>`, `/doom pace <x|auto>`
- `/doom kind <kind>`, `/doom foreshadow <kind>`, `/doom foreshadow end contained|failed`
- `/doom end lost|saved [minutes]`
- `/doom sequence lost|saved`: plays the client sequence for the GM only, without ending anything

# Persistence

| Table                | Holds                                                                                 | Wiped on recreate |
| -------------------- | ------------------------------------------------------------------------------------- | ----------------- |
| `doomsday`           | kind, origin, onset, `L`, `U`, `D`, stage, pace override, foreshadow state, last step | yes               |
| `world`              | new `ended_at`, `outcome`, `t_percent`                                                | replaced          |
| `world_legacy`       | one row per ended world                                                               | never             |
| `tear`, `destroyer`  | threat state                                                                          | yes               |
| `corruption_tile`    | the Withering field                                                                   | yes               |
| `corruption_crystal` | crystals                                                                              | yes               |

Nothing is released yet, so `V1__*.sql` is changed in place.

# Build Order

There is one branch and one draft PR per step in bestia-behemoth, stacked on the one before.

| Step | What                                                                                                     |
| ---- | -------------------------------------------------------------------------------------------------------- |
| 01   | Doom clock: `DoomThreat`, picker with force keys, `DoomClock`, stages, `doomsday` row, director, `/doom` |
| 02   | End sequence on the server: windows, countdown, `WorldEndSMSG`, record, `world_legacy`, kick, exit       |
| 03   | End sequence on the client: overlay, Lost fire, Saved light, summary, music slot, `/doom sequence`       |
| 04   | Rebirth: recreate with a cause, carry-over listeners                                                     |
| 05   | Login gate: `world:state`, login refusal, client rebirth screen                                          |
| 06   | Presentation: `WeatherSMSG` doom fields, `DoomLook`, moods, felt text, rumours, Observation, chronicle   |
| 07   | Void Tear, the Foreshadowing frame and Mana Storm Season                                                 |
| 08   | Withering 1: `CorruptionField`, crystals, persistence, GM layer                                          |
| 09   | Withering 2: plants die, exposure, corrupted spawns, cleansing, Blight Bloom                             |
| 10   | Withering 3 on the client: second ground-marks texture, creep material, withering grass                  |
| 11   | Destroyer and the Harbinger                                                                              |
| 12   | Flood study                                                                                              |
| 13   | Companion app: stage, Interregnum page, last-world summary                                               |

## Numbers to Start From

All are configuration and are judged in play.

| Area                       | Value                                                                |
| -------------------------- | -------------------------------------------------------------------- |
| Director cadence           | 5 minutes                                                            |
| Pace clamp                 | 0.25 .. 3.0                                                          |
| Stage hysteresis           | 0.02                                                                 |
| Foreshadowing on the onset | ±14 real days                                                        |
| Last Stand / Calling       | 24 real hours                                                        |
| Last Stand win             | `D` back to 0.85                                                     |
| Final sequence             | 90 s before the kick                                                 |
| Void Tear                  | merge +0.01, Sovereign −0.03, seal −0.15                             |
| Destroyer                  | town +0.08, defeat −0.10, return 3 days                              |
| Withering                  | plants die above 0.7, sickness above 0.5, ward 7 days, cleanse 300 m |
