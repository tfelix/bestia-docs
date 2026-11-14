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
   | `artifacts`   | kind, maker, material, forge town, provenance (event ids in order); today's keeper: a resting site, a living holder, or a town that keeps it; the town that first kept it |
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

**Families.** Each civ has at most one living ruler. Its first ruler founds a `DynastyRecord`. When a ruler dies,
an heir of their house takes the throne at once (`SUCCESSION`, 75%). Otherwise there is a `SUCCESSION_CRISIS`: a new
ruler founds a new house, and the crisis may send the old house into exile, where it founds a civ of origin
`EXILED` (`DYNASTY_EXILED`, 25%). It may instead split the civ through a certain revolt (25%), when the civ is large
enough to split. Other figures are the child of an earlier figure of their civ a third of the time.

Ties between figures are `RelationRecord`s, each citing the event that made it:

| Relation   | Event                                          | When                                                                   |
| ---------- | ---------------------------------------------- | ---------------------------------------------------------------------- |
| `SPOUSE`   | `MARRIAGE_ALLIANCE`                            | Two civs at peace, both rulers unmarried; halves their hostility        |
| `RIVAL`    | `FEUD_BEGAN`                                   | The two sides' generals of a battle, 30%                                |
| `AVENGER`  | `VENGEANCE_SWORN` → `VENGEANCE_FULFILLED`      | Kin of a figure slain in battle, 50%; kept when their civ wins against the slayers |
| `BETRAYED` | `BETRAYAL`                                     | A general of the besieged civ hands over the town unsacked, 6% per siege |

**Artifacts.** A dead holder's artifact goes into the grave with a chance of 0.5; a slain world boss's trophy always
does. Otherwise it passes to the holder's child, then spouse, then house, then anyone of their people (0.55). If
nobody takes it, the capital of the holder's civ keeps it (`ARTIFACT_ENSHRINED`, 0.5), or it is lost. A kept
artifact records `keptAt` and its first keeper as `homeTemple`. When the town is conquered, the victors carry it to
their capital (`ARTIFACT_PLUNDERED`, 0.6). A sack hides it in a hoard first. When the town is abandoned, it rests in
the ruin. A capital that raises a monument seals a kept artifact into it (`ARTIFACT_SEALED`, 0.5), and the monument
holds a cache for it. Over 16 genesis seeds a world forges about 46 artifacts and logs 26 entombings, 19 inheritances and
7 enshrinings; plunder and sealing happen on some worlds. On the genesis seed 20 lie in the ground, 6 are kept in
towns and 6 are carried today.

Over 16 genesis seeds a world has about 29 successions and 8 crises; marriages happen on 10 of 16 worlds, oaths
on 9, feuds on 6, betrayals on 4, and exiles on 2.

**Gods and cults.** Before the first civ is seeded, the world draws its gods from the `Domain` catalogue without
repeats: 4 plus 1.5 per doubling of settlement sites against the reference, plus a coin flip, at least 3 and at
most 12. The land weights the draw (coast for the sea, soil for the harvest, mana and volcanism for death, healing
and fate, the cities' bellicosity for war, ore for craft). The first plague or forsaken town can add a god of
healing or death later (`DEITY_RISEN`), once per world. A god's name is a seed that each culture renders in its own
style (`Names.deity`). Each civ draws a patron from the gods, weighted by its culture; a civ that broke away keeps
its parent's. A town takes its founders' patron and keeps it when it changes hands (`HistoryChannels.PATRON`).

A living prophet founds a cult (`CULT_FOUNDED`) of a god, a beast kind, or the fallen star, and raises a
`SANCTUARY` 900 m outside their town: an idol on a paved floor. A cult spreads to the nearest town within 40 km of
one that keeps it (`CULT_SPREAD`). The civ holding most of its towns may persecute it (`CULT_PERSECUTED`), and the
cult is then wiped out (`CULT_WIPED_OUT`), rises as a civ of origin `CULT_REALM` (`CULT_REVOLT`), or endures. On a
world with the Orders, a cult may join the Order its teaching leans toward (`CULT_ABSORBED`). Townsfolk lines name
gods and cults through the `deity` and `cult` slots, and priests take an interest in these events.

Over 16 genesis seeds a world has 4-5 gods; cults are founded on 12 worlds, persecuted on 12, wiped out on 10, and
rise as realms on 5.

**World bosses.** `WorldBoss` lists the five species with their mob identifier, level, kind of lair (`CAVE`,
`REMOTE_LAND`, `OCEAN`) and the pasts that can wake them. A world wakes 2 plus 1 per doubling of settlement sites
plus a coin flip, up to 5, skipping a species whose kind of lair the world lacks. Each wakes in a year between 150
and 850 out of the most fitting past its history holds: a Wound, a robbed tomb, an eruption, a cult, or a battlefield
with 500 dead or more (`MONSTER_AWOKE` cites it), or out of nowhere (`ANCIENT`). For 15 to 60 years it falls on the
nearest town within 40 km (`MONSTER_RAVAGED`, a quarter of the town's people each time). Then its story ends:

| Fate        | Weight | Event               | Site                                                                       |
| ----------- | ------ | ------------------- | -------------------------------------------------------------------------- |
| `SLAIN`     | 0.4    | `MONSTER_SLAIN`     | a `BATTLEFIELD` where it fell; the hero keeps a trophy reliquary           |
| `SEALED`    | 0.25   | `MONSTER_SEALED`    | a `SEAL`: a stone plinth in a ring, with a crystal on the plinth            |
| `WITHDRAWN` | 0.25   | `MONSTER_WITHDREW`  | a `LAIR`: the deepest unused cave end, the remotest dry land, or deep sea   |
| `VANISHED`  | 0.1    | `MONSTER_VANISHED`  | a `LAIR` as well, but no event names it                                    |

The last boss to meet its end is never slain when all before it were, so one always lives; a fate that finds no
place falls back to `SEALED`. Seal, lair and slaying field carry the boss as `SiteChannels.MONSTER`. Lairs and seals
are named after their boss. Townsfolk lines name the boss through the `monster` slot; lairs are secret on the map.
Over 16 genesis seeds a world wakes 2.4 bosses; all four fates occur.

**World bosses in the zone.** The five species are mob ids 101 to 105 with `world-boss: true`. A
`WildSpawnerService` den never admits one, and `MobCatalogueTest` checks each `WorldBoss` identifier against them.

- *Lairs.* `WorldBossLairService` puts a dormant den holding the boss alone at every `LAIR` marker, on the cave floor
  (the marker's `ELEVATION`) or on the ground. Its `DenIdentity` is the marker's. `WorldBossSlainSystem` sees a lair
  boss die before `DeathSystem` does. When an account dealt damage, it destroys the den and writes a
  `world_boss_slain` row, so later boots skip that lair. The row carries the world id and pipeline version, and
  `WorldBossWipe` clears it with the world. A boss that dies without a player's damage comes back like any den's
  pack.
- *Seals.* `TownStructures.sealCrystals` stands a `FixtureKind.SEAL_CRYSTAL` on the plinth of every `SEAL`, on the
  bare ground plus the plinth height (`ChunkMaterializer.VERSION` 16). In the zone it is `FIXTURE_SEAL_CRYSTAL`, a
  terminal prop with 5000 HP. `WorldBossSealService` finds the sealed boss by the crystal's prop id, and
  `WorldBossSealSystem` spawns it, persistent, where the crystal broke. Being terminal, the crystal stays broken.

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
| `treasure`                             | caches at history sites; a site with an artifact gets a splendid cache; a monument only with one; a battlefield gets one per 125 dead (up to 12, thinned by age), 0.5-1 m deep, with its `battlefield_age` |
| `dressing`                             | cemetery headstones for figures who died at home                                               |
| chunk materialiser (`TownStructures`)  | ruins, ash mounds, tombs, monuments, forts, monasteries, lighthouses, mines, Wounds, shrines    |
| chunk materialiser (`FixtureProps`)    | bones, blades, shields and young banners over a battlefield by its `fallen` and `decay`; a slain world boss's skeleton |
| zone: map, places, regions             | site symbols and names, town names, region names                                               |
| zone: [townsfolk](/docs/server/dialog/) | each town's events, turned into `HISTORY_<KIND>_<n>` lines; the English `detail` is not used |
| zone: master creation                  | the home card's founded / walled / sacked lines                                                 |
| zone: treasure                         | a dug artifact becomes a relic named from the chronicle, item level 80-110 by its history; `RelicGuards` puts an undead den at each tomb and monument with an artifact, at the level of the nearest wild den |
| zone: spawn                            | `BattlefieldHaunts` puts a night-only den on each battlefield: a battlefield species or a wild undead, demon or ghost at the level of the nearest wild den; pack 2 + 1 per 500 dead, up to 6 |

# Tests and Invariants

- `worldgen/src/test/.../history/`: `HistoryStageTest`, `OrderHistoryTest`, `ManaHistoryTest`, `SpecialSitesTest`,
  `VolcanicHistoryTest`, `WasteTombTest`.
- `pipeline/Invariants.kt` checks, over a seed sweep, that the history is self-consistent: years within the span, no
  event about a town outside its lifetime, no cited event pruned, ordered artifact chains, one keeper per artifact,
  one ruin per ruined town,
  sites within the chunk query margin.
- `ParamsVersionTest` pins the params and catalogue digests.

# Tools

```bash
./gradlew :worldgen:chronicle                 # the shape of this world's history
./gradlew :worldgen:chronicle -Ptop=60        # the most important events
./gradlew :worldgen:chronicle -Pyear=430      # the world as it stood in one year
./gradlew :worldgen:chronicle -Pquests        # unresolved threads
./gradlew :worldgen:chronicle -Pgenesis       # the zone server's own world settings
./gradlew :worldgen:chronicle -Psweep=16      # a census line per seed, then every event kind over all seeds
./gradlew :worldgen:chronicle -Pdynasties     # ruling houses, their rulers, and the ties between figures
./gradlew :worldgen:chronicle -Pdeities       # the world's gods, named by every culture, and whose patron each is
./gradlew :worldgen:chronicle -Pcults         # every cult, how far it spread and how it ended
./gradlew :worldgen:chronicle -Pmonsters      # every world boss, what woke it and how its story ended
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
| Families                   | **Built.** Parents, houses and spouses; succession and its crises; marriage alliances, feuds, betrayals, vengeance; exiled houses found civs |
| Pantheon and cults         | **Built.** A domain catalogue; 4-5 gods on a small world, about 10 on a large one; patron gods; cults; sanctuaries ([Pantheon](/docs/mechanics/world/pantheon/)) |
| World bosses               | **Built.** Five world-boss species (ids 101-105), at least two per small world and at least one alive; slain, sealed, withdrawn to a lair, or vanished. A lair boss spawns in its lair and stays dead once players kill it; breaking a seal wakes its boss |
| Surviving artifacts        | **Built.** Artifacts kept in temples, plundered or sealed in monuments; undead guard artifact tombs and monuments; relics of item level 80-110 |
| Battlefields in the world  | **Built.** Bones and arms on the surface, a slain boss's skeleton, caches 0.5-1 m deep by the dead and the field's age, the dead rising at night; four battlefield species |
| Hearsay and legends        | **Built.** Old knowledge told as hearsay; legends about hidden places, true, distorted or myth per town; townsfolk claiming descent from a house ([Dialog](/docs/server/dialog/#hearsay-legends-and-old-houses)) |
| Quest hooks                | Open threads recorded in the chronicle for a future quest system                                                     |
| Tuning                     | Sweeps over many seeds and world sizes; target ranges pinned as invariants                                          |

**Scaling with world size.** Counts such as the number of gods, world bosses and how likely each new-civ path is
scale with the number of settlement sites, with the genesis world (about 28 sites) as the reference. Sites stand for
the land a history can use; open sea and empty waste do not count.

**New records.** `DynastyRecord`, `RelationRecord`, `DeityRecord`, `CultRecord` and `MonsterRecord` are built. `ThreadRecord`
joins them later. Every relation and cause is data that a tool, an NPC or a prose step can quote.

**Later: storing the chronicle.** Only a prose step needs the chronicle stored: the texts must point at stable
ids even after the code changes. It will be stored together with the texts, as a world-scoped blob that is wiped when
the world is recreated.
