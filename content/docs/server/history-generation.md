---
weight: 610
title: History Generation
description: How the worldgen history stage simulates a thousand years over the placed settlements - the chronicle it writes, the sites it leaves, how it stays deterministic and versioned, who reads it - and the planned rework.
---

{{< alert context="warning" text="**Partly built.** The sections up to **Tools** describe running code. **Planned Rework** is design; the player-facing side is on [World History](/docs/mechanics/world/world-history/)." />}}

The `history` stage of the [world generation pipeline](/docs/server/world-generation/) plays out a thousand years on
the settlement sites that the `settlements` stage placed. It does not place settlements. It decides when each one was
founded, whether it still stands, who holds it, how rich and walled it is, and what happened around it.

Code: `worldgen/src/main/kotlin/net/bestia/worldgen/history/` (`HistoryStage`, `HistorySim`, `SpecialSites`,
`Names`, `OrderInfluence`) and `core/Chronicle.kt`.

# Inputs and Outputs

**Inputs.** The stage reads the settlement markers and samples a few layers once per site: soil fertility, sediment
and river discharge (flood risk), distance to the ocean, resource value, volcanism and mana. It also reads the
volcano vents, and the terrain candidates for built sites (see below). All of this is frozen into plain data
(`SiteFacts`, `VentFacts`, `SpecialSiteCandidates`) before the simulation starts, so the simulation is a pure function
over facts.

**Outputs.** Two products:

1. The **chronicle**, the third world-tier product next to the layers and the features. It is an append-only log of
   events plus the entities they happened to:

   | List          | What it holds                                                                                      |
   | ------------- | -------------------------------------------------------------------------------------------------- |
   | `events`      | year, kind, actors, place, causes (event ids), importance, one rendered English sentence (`detail`) |
   | `settlements` | one record per placed site, founded or not: years, population, wealth, owner, walls, names, sacks |
   | `civs`        | culture, capital, technology, grudges (each one an event id), sworn Order                          |
   | `figures`     | role, home, years, resting place, sworn Order                                                       |
   | `artifacts`   | kind, maker, material, forge town, resting place, provenance (event ids in order)                  |
   | `sites`       | kind, position, year, radius, decay, host settlement, artifact, figure                             |

   Ids are indices into these lists. An actor is typed (`Actor(type, index)`), so "who did this" cannot be answered
   with the wrong list.

2. **Features** for chunk generation: one `SETTLEMENT_HISTORY` marker per settlement, and one marker per site:
   `RUIN`, `ASH_RUIN`, `BATTLEFIELD`, `TOMB`, `MONUMENT`, `MINE`, `MONASTERY`, `FORT`, `LIGHTHOUSE`, `CAVE_HOARD`,
   `WOUND`, `SHRINE`. Their station channels copy what a chunk or a runtime reader needs, so it does not have to reach
   into the chronicle.

**Names are seeds.** A station channel holds a `Double`, so it cannot hold a string. It holds a 48-bit name seed
instead, and `Names` turns the seed into a name in the culture's style. A town, its ruin and every event about it carry
the same seed.

# The Simulation

The loop runs from year 1 to year 1000 in five-year ticks. Each tick, in order:

1. Every civ grows its towns, founds daughter towns, and gains technology.
2. Hostility grows between neighbouring civs; wars are declared, fought (battle, siege, sack, raze) and ended.
3. Disasters: plague, famine, flood. Then volcano eruptions, rolled per vent.
4. The mana: the star falls once (the Wounds), the blight spreads, towns raise wards or are forsaken.
5. The Orders, only on a world whose predecessor had a victor (`OrderInfluence`).
6. Figures rise and die; artifacts are forged, inherited, lost and entombed; seers and travellers vanish.
7. Monuments, mines, monasteries, forts, lighthouses, shrines and walls are built.
8. Civs with no standing town end.

**Civs.** Only CITY-tier sites seed civs. A city joins the nearest civ of its culture within reach, or founds a new
one. Towns, villages and hamlets are only ever founded by a civ's expansion. There is one city per 26,000 km², so a
world of 128 × 128 km has one city and therefore one civ, and no wars.

**Built sites** follow one rule: the terrain decides where a site *may* go (`SpecialSiteCandidates`: ore deposits for
mines, remote high ground for monasteries, saddles between civs for forts, headlands for lighthouses, deep cave ends
for hoards), and the simulation decides *whether* a civ ever builds it.

**Pruning.** An event's importance comes only from its kind. Events at or above the floor (40) are kept, the rest are
sampled one in 24. Every event a kept event cites is kept too, so the log never cites a dropped cause. A kind that
leaves something on the ground must have importance 40 or more, or its site would exist with no event to explain it.

# Determinism

Every random decision is a **keyed roll**: a hash of the world seed, the stage, the year, the subject and a salt that
names the decision. Nothing draws from a shared stream. A new decision therefore does not change the outcome of the old
ones, as long as it uses a salt of its own.

What a keyed roll does not protect is **indices**. Events, sites, figures and artifacts are numbered in the order they
happen. A new decision that creates an entity shifts the numbers, and with them the name seeds, of everything after
it. Before release this is accepted: a changed history means a regenerated world.

# Versioning

The stage folds into the world's `pipelineVersion` like every other stage (see
[World Generation](/docs/server/world-generation/)):

- `HistoryStage.version` is part of the roll base. Bumping it re-rolls the whole history.
- `paramsVersion` hashes `HistoryParams` and the catalogues the stage depends on: `Culture`, `SettlementTier`,
  `EventKind` (name and importance), `Names` (every word pool) and `Faction`. Adding an event kind or a name pool
  moves the version.

# Who Reads It

The chronicle is **not stored**. The zone server runs the whole pipeline at every boot and reads
`worldService.generated.world.chronicle` from memory.

| Reader                                 | What it uses                                                                                    |
| -------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `towns`, `economy`                     | which towns stand, their population, wealth and walls                                           |
| `corruption`, `spawners`, `nav_graph`  | standing towns hold back the blight, ring spawners, act as hubs; Wounds raise corruption       |
| `treasure`                             | caches at history sites; a site with an artifact gets a splendid cache                          |
| `dressing`                             | cemetery headstones for figures who died at home                                               |
| chunk materialiser (`TownStructures`)  | ruins, ash mounds, tombs, monuments, forts, monasteries, lighthouses, mines, Wounds, shrines    |
| zone: map, places, regions             | site symbols and names, town names, region names                                               |
| zone: [townsfolk](/docs/server/dialog/) | each town's events, turned into `HISTORY_<KIND>_<n>` lines; the English `detail` is not used |
| zone: master creation                  | the home card's founded / walled / sacked lines                                                 |
| zone: treasure                         | a dug artifact becomes a relic named from the chronicle                                         |

# Tests and Invariants

- `worldgen/src/test/.../history/`: `HistoryStageTest`, `OrderHistoryTest`, `ManaHistoryTest`, `SpecialSitesTest`,
  `VolcanicHistoryTest`, `WasteTombTest`.
- `pipeline/Invariants.kt` checks, over a seed sweep, that the history is self-consistent: years within the span, no
  event about a town outside its lifetime, no cited event pruned, ordered artifact chains, one ruin per ruined town,
  sites within the chunk query margin.
- `ParamsVersionTest` pins the params and catalogue digests.

# Tools

```bash
./gradlew :worldgen:chronicle                 # the shape of this world's history
./gradlew :worldgen:chronicle -Ptop=60        # the most important events
./gradlew :worldgen:chronicle -Pyear=430      # the world as it stood in one year
./gradlew :worldgen:chronicle -Pquests        # unresolved threads
./gradlew :worldgen:chronicle -Pgenesis       # the zone server's own world settings
./gradlew :worldgen:town                      # one settlement: layout, economy, history
```

The viewer draws every site kind on the map.

# Planned Rework

{{< alert context="warning" text="**Planned.** Each part below lands as its own change. This page is updated as each part is built." />}}

The goal is a history rich enough that every place a player finds has a story with causes, and that a later
prose step (books, epitaphs, legends) has facts to work from instead of inventing them. Every new fact gets a reader
in the game, and every new feature shows in the tools.

| Part                       | What changes                                                                                                         |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Groundwork                 | Civs can be added during the run; a seed-sweep census in the chronicle tool                                          |
| Two or more civs           | At least two civs from the start. Later, optional paths: arrival over the sea, migration overland, secession, refugees |
| Frontiers                  | Battles are spread along the shifting border; battles near an older field add to it; battlefields record battles and fallen |
| Families                   | Parents, houses and spouses; succession and its crises; marriage alliances, feuds, betrayals, vengeance; exiled houses found civs |
| Pantheon and cults         | A domain catalogue; 4-5 gods on a small world, about 10 on a large one; patron gods; cults; sanctuaries ([Pantheon](/docs/mechanics/world/pantheon/)) |
| World bosses               | Five world-boss species, at least two per small world and at least one alive; slain, sealed, withdrawn to a lair, or vanished |
| Surviving artifacts        | Artifacts kept in treasuries and temples, guarded tombs, relics of item level 80-100+                               |
| Battlefields in the world  | Surface scatter, caches buried 0.5-1 m by battlefield age, undead and ghosts at night                                |
| Hearsay and legends        | Old knowledge told as hearsay; legends about hidden places, true, distorted or myth                                 |
| Quest hooks                | Open threads recorded in the chronicle for a future quest system                                                     |
| Tuning                     | Sweeps over many seeds and world sizes; target ranges pinned as invariants                                          |

**Scaling with world size.** Counts such as the number of gods, world bosses and how likely each new-civ path is are
functions of land area, with the genesis world (128 × 128 km) as the reference.

**New records.** `DynastyRecord`, `RelationRecord`, `DeityRecord`, `CultRecord`, `MonsterRecord` and `ThreadRecord`
join the chronicle, so every relation and cause is data that a tool, an NPC or a prose step can quote.

**Later: storing the chronicle.** Only a prose step needs the chronicle stored: the texts must point at stable
ids even after the code changes. It will be stored together with the texts, as a world-scoped blob that is wiped when
the world is recreated.
