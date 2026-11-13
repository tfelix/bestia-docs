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

1. Every civ grows its towns, founds daughter towns, and gains technology. New peoples may arrive over the sea,
   migrate overland, or break away (see **New peoples** below).
2. Hostility grows between neighbouring civs; wars are declared, fought (battle, siege, sack, raze) and ended.
3. Disasters: plague, famine, flood. Then volcano eruptions, rolled per vent.
4. The mana: the star falls once (the Wounds), the blight spreads, towns raise wards or are forsaken.
5. The Orders, only on a world whose predecessor had a victor (`OrderInfluence`).
6. Figures rise and die; artifacts are forged, inherited, lost and entombed; seers and travellers vanish.
7. Monuments, mines, monasteries, forts, lighthouses, shrines and walls are built.
8. Civs with no standing town end.

**Civs.** CITY-tier sites seed civs. A city joins the nearest civ of its culture within reach, or founds a new one.
There is one city per 26,000 km², so a world of 128 × 128 km has one city. When seeding gives fewer than two civs, a
second civ is seeded at the empty site farthest from every capital, preferring a culture no civ holds and a bigger
site. Towns, villages and hamlets are otherwise founded by a civ's expansion. A civ whose capital is conquered or
emptied moves its capital to its largest standing town.

**New peoples.** Every civ enters through one `addCiv` helper and carries a `CivOrigin` and, where it has one, a
parent civ. Each path below is an independent keyed roll. Any of them can happen several times in a world, or never:

| Origin      | Event                          | When and where                                                                                                   |
| ----------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| `ARRIVED`   | `CIV_ARRIVED`                  | Years 150-750. The empty coastal site farthest from every standing town, at least 15 km from any                 |
| `MIGRATED`  | `CIV_MIGRATED`                 | Years 100-700. The same, inland                                                                                  |
| `SECEDED`   | `CIV_REVOLT` → `CIV_SECEDED`   | A civ with 5 or more standing towns. Its most aggrieved town rises; a won revolt takes every town nearer to it than to the capital |
| `REFOUNDED` | `CIV_REFOUNDED`                | When a town of 300 or more is razed, buried or forsaken. Survivors settle the best empty site within 90 km        |

Newcomers bring a culture no civ holds yet, when one is left, and the average technology of the living civs. A
grievance is half being beyond the capital's reach, and the rest sackings and blight. A lost revolt costs the town a
fifth of its people. A seceded civ starts with hostility 0.8 toward its parent (war is at 1.0), and both hold a
grudge that cites the secession.

How often arrivals and migrations happen scales with the world's **number of settlement sites**, against
`HistoryParams.referenceSites` (28, about a genesis world). Over 32 genesis seeds, every world has 2 to 7 civs and at
least one war. Arrivals over the sea happen on 5 seeds, migrations on 4, secessions on 18, refugees on 7.

The cost is more lost towns. Over 16 genesis seeds, about 16 of 28 sites still stand at the present day, against 21
when every world had one people: wars raze about 4 towns, and towns settled earlier lose about 2 more to the blight.
The tuning slice revisits this balance; until then the sweep's `ruins`, `standing` and per-cause columns track it.

**Battles** are fought along the frontier between two civs at war: every standing town of one civ paired with
the nearest standing town of the other, kept when the pair is no more than 1.5 times as far apart as the closest pair.
Each battle picks one pair, the closer ones more often, and is fought between the two towns: 30-70% of the way
along, up to 1.5 km to the side. It is fought on an existing battlefield when one lies within 1.5 km. Otherwise, with
a chance of one half, it returns to an old field near the line between the two towns. Only then does it open a new
field. A battlefield site counts its `battles` and `fallen`, and both are on its marker as station channels. Each
`BATTLE` event names its field as a `SITE` actor, and an invariant checks that the fields count every battle.

Over 16 genesis seeds a world has about 10 battles on 7 fields.

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
./gradlew :worldgen:chronicle -Psweep=16      # a census line per seed: civs by origin, wars, battles, sites
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
| Groundwork                 | **Built.** Civs can be added during the run; a seed-sweep census in the chronicle tool                              |
| Two or more civs           | **Built.** At least two civs from the start. Later, optional paths: arrival over the sea, migration overland, secession, refugees |
| Frontiers                  | **Built.** Battles are spread along the shifting border; battles near an older field add to it; battlefields record battles and fallen |
| Families                   | Parents, houses and spouses; succession and its crises; marriage alliances, feuds, betrayals, vengeance; exiled houses found civs |
| Pantheon and cults         | A domain catalogue; 4-5 gods on a small world, about 10 on a large one; patron gods; cults; sanctuaries ([Pantheon](/docs/mechanics/world/pantheon/)) |
| World bosses               | Five world-boss species, at least two per small world and at least one alive; slain, sealed, withdrawn to a lair, or vanished |
| Surviving artifacts        | Artifacts kept in treasuries and temples, guarded tombs, relics of item level 80-100+                               |
| Battlefields in the world  | Surface scatter, caches buried 0.5-1 m by battlefield age, undead and ghosts at night                                |
| Hearsay and legends        | Old knowledge told as hearsay; legends about hidden places, true, distorted or myth                                 |
| Quest hooks                | Open threads recorded in the chronicle for a future quest system                                                     |
| Tuning                     | Sweeps over many seeds and world sizes; target ranges pinned as invariants                                          |

**Scaling with world size.** Counts such as the number of gods, world bosses and how likely each new-civ path is
scale with the number of settlement sites, with the genesis world (about 28 sites) as the reference. Sites stand for
the land a history can use; open sea and empty waste do not count.

**New records.** `DynastyRecord`, `RelationRecord`, `DeityRecord`, `CultRecord`, `MonsterRecord` and `ThreadRecord`
join the chronicle, so every relation and cause is data that a tool, an NPC or a prose step can quote.

**Later: storing the chronicle.** Only a prose step needs the chronicle stored: the texts must point at stable
ids even after the code changes. It will be stored together with the texts, as a world-scoped blob that is wiped when
the world is recreated.
