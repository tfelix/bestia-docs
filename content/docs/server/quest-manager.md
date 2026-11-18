---
weight: 505
title: Quest Manager
description: "Design of the QuestManager - how the zone plans quests from the world history and from real events in the live world, offers them through townsfolk, found things and the blackboard, runs chains with a choice, and writes their endings back into the world."
---

{{< alert context="warning" text="**Design, not built.** The [quest core](/docs/server/quests/) and the blackboard exist. Of this page only the [fact store](#what-a-player-knows) is built. The build order is at the [end](#build-order)." />}}

The [quest core](/docs/server/quests/) keeps quests, but only players make them, on the
[blackboard](/docs/mechanics/towns-trade/blackboard/). The **QuestManager** is the part that lets the world make
quests. It has three goals:

- **Local and global quests.** A local quest is work many players share: bring timber to repair the temple roof. A
  global quest has one prize in the whole world: the one lost book of a battlefield.
- **History matters.** A quest leads the player into the [world history](/docs/mechanics/world/world-history/), and
  what the player learns there helps.
- **Not only "kill x, collect y".** A quest is a short chain of steps with a choice, and its ending changes the
  world.

# Rules

These rules were decided before the design. Everything below follows from them.

| Rule                | Meaning                                                                                                        |
| ------------------- | -------------------------------------------------------------------------------------------------------------- |
| Real causes only    | A quest starts from a fact the game can show: a real shortage, a really damaged roof, a real thread of history |
| Payoff first        | The planner starts from a payoff and walks back to the clues. A quest without a payoff is never offered        |
| Data, not code      | A quest shape is an entry in a catalogue. A single quest never has code of its own                             |
| Text before play    | All text is planned at world creation. See [Dynamic Text](/docs/server/dynamic-text/)                          |
| Unique means a race | Everyone may try for a unique prize. The first one takes it; the others get a follow-up                        |
| Endings are real    | An ending writes a world fact, changes the thing itself and changes how people see the player                  |
| Nothing is minted   | Coins come from money a town really has, see [Money Supply](/docs/server/money-supply/)                        |

# Overview

```text
 sources ──seed──▶ planner ──plan──▶ plan store ──▶ director ──offer──▶ givers ──▶ quest core
 (threads,          (step catalogue,   (quest_plan)    (budget,          (townsfolk,     (stages,
  shortage,          score)              │              real cause)       carrier,        observers)
  damage, rumour)                        ▼                                board)             │
                                   text jobs ─▶ world_text ─▶ api-server                    ▼
                                                               endings ─▶ world facts, thing, standing, rewards
```

The QuestManager is a slice of the zone server (`questgen`). For the quest core it is one more **source**, next to
the blackboard: it makes quest records and pays its own rewards. The quest core stays a neutral record keeper.

# Sources and Seeds

A **source** watches one part of the world and reports **seeds**. A seed says: here is a reason for a quest. It
holds the kind, the subjects (records of the chronicle), the place, whether the prize is unique, the real cause, and
how urgent it is.

| Source   | What it reads                                                             | When                                       | Quests                             |
| -------- | ------------------------------------------------------------------------- | ------------------------------------------ | ---------------------------------- |
| Threads  | The [open threads](/docs/server/history-generation/) of the chronicle     | At world creation, and when a thread opens | Unique and personal history quests |
| Shortage | The settlement ledger of the [economy](/docs/server/economy/)             | Each director run                          | Local shared deliveries            |
| Damage   | Destroyed workplaces and worn buildings of a town                         | Each director run                          | Local shared repairs               |
| Rumours  | The [rumour ledger](/docs/server/dialog/#recent-events-the-rumour-ledger) | When a rumour is posted                    | Follow-ups: bring news, rebuild    |

A seed from the live world is dropped when its cause is gone: the stock recovered, somebody repaired the building.

# The Planner

The planner turns one seed into one **plan**. It is a pure function of the seed, the world and the catalogues, with
a random stream from the world seed. So it can be tested alone, and the same world always gets the same plans.

## Catalogues

Two YAML files hold everything a designer can change:

- **Step patterns** (`quest-steps.yml`). A step pattern is one thing a player does. It has a step kind, what must be
  true before, what is true after, a tension value, the kind of giver or carrier, and a text template with slots.
- **Motifs** (`quest-motifs.yml`). A motif belongs to a seed kind. It names the goal, the step patterns that fit,
  and the possible endings. The motif keeps a chain about one thing, so a quest does not wander between unrelated
  tasks.

The conditions are simple typed facts:

```text
knows(player, fact)      holds(player, thing)      at(thing, place)      regard(household, player)
```

## Planning

1. Take the goal of the motif, for example `holds(player, artifact)`.
2. Chain **backwards**: which step makes this true, and what does that step need? Repeat until every need can be
   met near a standing town.
3. Bind each step to something real: a tomb with an epitaph, a household that tells the legend, the cache on the
   battlefield.
4. Add the decide point and the endings of the motif.
5. Build a small, bounded set of candidates and score them. The best one is the plan.

A chain has 2 to 5 steps and 1 or 2 decide points.

## Score

| Part           | Favors                                                                        |
| -------------- | ----------------------------------------------------------------------------- |
| Tension arc    | A chain that rises and then resolves, measured from the step tension values   |
| History weight | More chronicle facts taught along the way                                     |
| Novelty        | A motif, a carrier and a giver that nearby plans do not use already           |
| Fit            | Level of the places near the level of the region; a walk that is not too long |

## The plan

A plan holds the stages, the decide points with their endings, the text slots, the reward plan and the uniqueness.
Every target in a plan is a **stable world id**: a chronicle record, a townsperson's identity, a site, a position.
It is never a live entity id.

| Uniqueness | Meaning                                                 | In the quest core                                    |
| ---------- | ------------------------------------------------------- | ---------------------------------------------------- |
| Unique     | One prize per world. Open race                          | One quest, many log entries, first to finish ends it |
| Shared     | Many players fill one counter                           | A shared objective                                   |
| Personal   | Each player does it alone; the prize is made per player | Personal objectives                                  |

# Plan Store and Director

Plans are rows in `quest_plan`. The table belongs to the world and is wiped with it.

```text
PLANNED ──▶ OFFERED ──▶ RUNNING ──▶ ENDED(ending)
```

At world creation the QuestManager plans every thread. It also plans, for each town, the live quests that are
**possible** there: repair this temple, feed this town. They stay `PLANNED` until their cause really happens, but
their text can be written ahead.

The **director** runs off the tick, every few minutes. It decides which plans are offered now:

- A budget per town by its size, at most one offer per household, a cap per region.
- A spread of levels, with easy quests near the start towns.
- A live plan is offered only while its cause is real.

# Givers

| Giver       | How it offers                                                                                                                                                 |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Townsfolk   | A new topic in the [conversation](/docs/server/dialog/) with an action option to accept. Only shown when the household's regard for the player is good enough |
| Found thing | A **carrier**: a prop or an item with a text, such as an epitaph or a letter. Reading it teaches a fact and puts the lead into the quest log                  |
| Blackboard  | A world posting in the same list as the player postings. Used for shared local quests                                                                         |

# Changes to the Quest Core

All changes are generic. None is about one quest.

- **Stages.** A quest gets an ordered list of stages. A stage holds objectives and an optional decide point. A quest
  of today is a quest with one stage.
- **Objective kinds.** Each new kind is one enum value and one check.

  | Kind      | The player...                                        |
  | --------- | ---------------------------------------------------- |
  | `EXAMINE` | reads a carrier, examines a site, or digs at a spot  |
  | `TALK`    | asks a named townsperson, or tells them a known fact |
  | `BRING`   | brings an item to a person or a place                |
  | `DECIDE`  | picks one of the endings                             |

- **Observers.** Examine and talk are reported through observer ports, like kills today. The lookup stays a hash
  lookup on the master's active quests.
- **Rewards.** Coins from a town treasury, an item, a fact, experience.
- **Superseded.** A new end state for the losers of a race. The log entry says who won and gives the next lead.

Escort and guard steps come later. They need NPC travel and rules for failing.

# What a Player Knows

Steps like "speak the name" need to know what a player has learned. The **fact store** keeps one row per player and
fact: the fact, where it came from, and when.

- A fact is a chronicle record plus an aspect (its name, its place, its fate), or a clue. An event of the chronicle
  is one fact as a whole.
- Facts come from carriers, from history lines of townsfolk, and from quest rewards. Today only townsfolk teach:
  a townsperson who tells a chronicle event teaches that event. A legend or a rumour teaches nothing, because a
  legend may be wrong and a rumour is not in the chronicle.
- A master learns a fact once. The rows are wiped with the world.
- A played master holds its facts in memory, so a check on the tick is a set lookup.
- A fact read before a quest started still counts for that quest.

There is no window for it yet. The quest log shows the open leads.

# The Living Chronicle

The generated chronicle ends in year 1000 and is never stored. The **living chronicle** is the generated chronicle
plus a table of **world facts**: events that happened in play. It answers questions like "who holds this artifact
now" and "is this thread still open".

An ending runs a small closed set of effects:

| Effect       | What it does                                                         |
| ------------ | -------------------------------------------------------------------- |
| World fact   | Appends an event to the living chronicle and posts a rumour          |
| Move thing   | Puts the object where the ending says: the relic into the temple     |
| Repair thing | Restores the damaged building                                        |
| Standing     | Changes [honor](/docs/server/honor/) and the regard of the household |
| Reward       | Pays coins, items, facts and experience                              |

A new world fact is also a new seed. So the ending of one quest is the start of the next one.

# Example: The Lost Artifact Race

This is the first quest shape to be built. A genesis world has about 13 lost artifacts.

1. **World creation.** The thread source reports a lost blade. The planner finds the battle where it was lost, the
   cache that holds it, the tomb of its last keeper and a town that tells the legend.
2. **The plan.**
   - `TALK`: a townsperson tells the legend of the blade.
   - `EXAMINE`: the keeper's epitaph names the battle.
   - `EXAMINE`: dig up the cache on the battlefield.
   - `DECIDE`: keep the blade, or `BRING` it to its home temple.
3. **The race.** Several players follow the leads. The first to dig up the cache has the blade. For the others the
   quest ends as superseded, with a new lead.
4. **Ending "return".** The blade rests in the temple. The chronicle gets a new event, the town talks about it, and
   the player gets honor in that town, coins from its treasury and experience.
5. **Ending "keep".** The chronicle records who took it. The temple's people remember it. A new thread opens for
   everyone else: the artifact is away from its temple.

# Open for a Cluster

Today there is one zone. The [cluster path](/docs/server/cluster-path/) is not part of this work, but the design
keeps to these rules so it does not block it:

- All truth is in database rows of the world. What a zone holds in memory is a cache for the masters it plays.
- The planner and the director each have **one owner**. Later one node holds a lease for them.
- A step signal is a fact that can be sent twice without harm: "master M examined carrier C". Later it travels over
  the bus from the zone where it happened to the owner.
- Targets are world ids, so a step can be done on any zone.
- Ids come from database sequences, and treasury payments are deltas.
- Text comes from the api-server, so any zone can answer for it.

# Build Order

One reviewable step each:

1. Text arguments and the text reference on the wire
2. Text store, api-server endpoint, client cache, readable props
3. Fact store
4. Stages and the new objective kinds
5. Living chronicle
6. Planner, catalogues, plan store, the thread source for lost artifacts
7. Director, townsfolk topic, carriers
8. Endings, rewards, the race follow-up
9. The text job with its time cap, German texts
10. Live sources: shortage, damage, rumours
11. Client: stages in the log, the decide dialog, a window for readable things

# References

- E. S. de Lima, B. Feijó, A. L. Furtado: [Procedural generation of branching quests for games](https://doi.org/10.1016/j.entcom.2022.100491).
  Taken: steps with conditions, the motif, the tension arc, endings as the start of the next quest. Not taken: the
  genetic search, because plans must be the same for the same world.
- V. Prins, J. Prins, M. Preuss, M. Gómez-Maureira: [StoryWorld: Procedural Quest Generation Rooted in Variety & Believability](https://doi.org/10.1145/3582437.3587181).
  Taken: a quest comes from a real event and a need, it is given only on a good relationship, and it leaves a
  lasting change.
