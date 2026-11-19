---
weight: 505
title: Quest Manager
description: "Design of the QuestManager - how the zone plans quests from the world history and from real events in the live world, offers them through townsfolk, found things and the blackboard, runs chains with a choice, and writes their endings back into the world."
---

{{< alert context="warning" text="**Design, not built.** The [quest core](/docs/server/quests/) and the blackboard exist. Built so far: the [fact store](#what-a-player-knows), stages and the new objective kinds of the [quest core](#changes-to-the-quest-core), the store and the questions of the [living chronicle](#the-living-chronicle), the [planner](#the-planner) with its catalogues and the plan store, the [director](#plan-store-and-director) and the townsfolk [giver](#givers). The build order is at the [end](#build-order)." />}}

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
| Damage   | The destroyed buildings of a town                                         | Each director run                          | Local shared repairs               |
| Rumours  | The [rumour ledger](/docs/server/dialog/#recent-events-the-rumour-ledger) | Each director run                          | Carry news to the next town        |

A seed from the live world is dropped when its cause is gone: the stock recovered, somebody repaired the building.

Built today: the thread source for lost artifacts, and the shortage, damage and rumour sources. Worn buildings are
not a cause yet, only destroyed ones.

## A town that lacks a good

This is the first quest from the live world, and the first shared one.

- **Cause.** A town's stock of a good is far below what it should hold: by default at least half is missing, and
  at least 20 units. That happens when players bought the town empty or its workplaces were destroyed. A town asks
  for one good at a time, the one it lacks most.
- **Plan.** One step: deliver the good. All comers fill one counter. The town asks for a part of what is missing,
  60 percent by default; the rest comes back by its own trade.
- **Offer.** The request goes on the blackboards, at a price a little above the town's own market price.
- **Hand-in.** Every board lists the request. Only the board of the town that asked takes the goods. They go into
  the town's stock, and the town pays from its own treasury. So a delivery really ends the shortage, and no coin is
  minted. A town with an empty treasury pays what it has.
- **End.** The quest is complete when the counter is full. When the town has enough again before that, the request
  comes down. A request that ran out of time ends too, and the town is asked anew what it lacks.

# The Planner

The planner turns one seed into one **plan**, or into none. It is a pure function of the seed, the world and the
catalogues. It uses no randomness. So it can be tested alone, and the same world always gets the same plans.

The planner is built for the lost artifact. The thread source and the plan store are built too.

## Catalogues

Two YAML files hold everything a designer can change:

- **Step patterns** (`quest-steps.yml`). A step pattern is one thing a player does. It has an objective kind, the
  kind of real thing it points at, what must be true before, what is true after, a tension value from 1 to 3, and a
  text template.
- **Motifs** (`quest-motifs.yml`). A motif belongs to a seed kind. It names the goal, the step patterns that fit,
  and what the player may decide at the end. The motif keeps a chain about one thing, so a quest does not wander
  between unrelated tasks.

The conditions are short statements. A step may be used when the steps before it give what it needs:

```text
knows:legend      knows:site      holds:relic      at:relic:home
```

## Planning

1. Take the goal of the motif, for example `holds:relic`.
2. Chain **backwards**: which step gives this, and what does that step need? When two steps give the same thing,
   both ways become a chain.
3. Bind each step to something real. A chain with a step that points at nothing is dropped.
4. Add the decide point of the motif, but only when the step after every choice can be bound too.
5. Score the chains that are left. The best one is the plan.

A chain has 2 to 5 steps. A seed with no chain gets no plan, and the log says what the world was missing.

For a lost artifact the planner binds these things:

| Step                | Points at                                                           |
| ------------------- | ------------------------------------------------------------------- |
| Hear the legend     | A household that tells the **true** legend of the artifact          |
| Ask about the loss  | A household that remembers the event the artifact was lost in       |
| Read the epitaph    | The named grave of a figure who held the artifact                   |
| Dig up the artifact | The treasure cache it lies in. This is the payoff                   |
| Bring it home       | The standing town whose temple first kept it. Only after "return"   |

## Score

The parts are multiplied.

| Part           | Favors                                                                      |
| -------------- | --------------------------------------------------------------------------- |
| Tension arc    | A chain that rises to one peak and then falls, from the step tension values |
| History weight | More facts taught along the way                                             |
| Novelty        | Things that no other plan points at                                         |
| Walk           | A short way from step to step                                               |

The level of a plan is the level of its prize. A fit of the level to the region is not part of the score yet.

## The plan

A plan holds the seed, the motif, the title, where the quest starts, the steps with their stage and text, and what
each step teaches. The reward plan comes with the endings. Every target in a plan is a **stable world id**: a
townsperson's identity, the figure of a grave, the id of a cache, a settlement. It is never a live entity id.

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

When the zone starts, the QuestManager plans every seed that has no plan yet. So a new world is planned once, and
a restart changes nothing. Later it also plans, for each town, the live quests that are **possible** there: repair
this temple, feed this town. They stay `PLANNED` until their cause really happens, but their text can be written
ahead.

The **director** runs off the tick, every five minutes and once at start. It decides which plans are offered now:

- A budget per town by its size: one quest, and one more for every 400 people. The best plans go first.
- A plan nobody took is withdrawn when its cause is gone.
- Not built yet: a cap per region and a spread of levels around the start towns.

## A town with destroyed buildings

- **Cause.** A building of a town was destroyed. It does not come back by itself.
- **Plan.** The same single step as for a shortage: deliver the repair material. By default that is 20 planks for
  each destroyed building, at a fixed price of 15 coins each.
- **Offer and hand-in.** As for a shortage: on every board, taken at the town's own board, paid from its treasury.
- **End.** When the counter is full, every destroyed building of the town stands again. A request that ran out of
  time ends, and the town counts anew.

## News that stopped on the way

A [rumour](/docs/server/dialog/#recent-events-the-rumour-ledger) reaches the towns inside its reach and goes no
further by itself. This quest moves it on.

- **Cause.** A town talks of big news, a slain boss or a fallen town, and a standing town within 40 km has not
  heard it. Small news (strength below 0.5) and a misdeed somebody saw are not carried.
- **Seed.** One per piece of news: the shortest way from a town that knows to a town that does not. A town is told
  one thing at a time.
- **Plan.** Two steps: hear the news from a townsperson who tells it, then talk to anybody in the other town.
  The first step is done as the master accepts.
- **No race.** Up to 100 masters may take the quest, and each one finishes it for themself. Each gets experience
  and a little honor (5) in the town that was told.
- **Effect.** When the first master tells it, the town holds the rumour itself, with the same last day as in the
  town it came from. Its people talk of it, and the next town on the way can be asked for.
- **End.** 36 hours after the first master told it, the quest closes for all: the news counts as known. Masters
  who made it keep their completed quest. Without any master it ends at the normal deadline.
- **Text.** News happens in play, long after the [text job](/docs/server/dynamic-text/) has run. So the job
  writes the giver's words ahead: 10 texts per kind of news, each in another voice (an old farmer, a busy
  innkeeper, ...). A text tells what happened and leaves the town open as `{town}`. A plan uses one of them, always
  the same one, and the client fills in the town. The translation must keep `{town}` as it is. Without a written
  text the giver speaks a template line per kind of news.
- **Gone cause.** When the other town hears of it another way, or the news is too old, an offer nobody took is
  withdrawn. News that got too old on the way arrives nowhere.

A plan becomes a quest of the quest core when the first master accepts it. Later masters join the same quest, so a
unique prize is one quest and a race.

# Givers

| Giver       | How it offers                                                                                                                                                 |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Townsfolk   | A new topic in the [conversation](/docs/server/dialog/) with an action option to accept. Built. A player the town gives the cold shoulder never sees it       |
| Found thing | A **carrier**: a prop or an item with a text, such as an epitaph or a letter. Reading it teaches a fact and puts the lead into the quest log                  |
| Blackboard  | A town's request in the same list as the player postings, shown first. Built for shortages and repairs                                                        |

When the first step of a plan is "hear the giver out", it is done as the master accepts: they stand before the
giver. Found things and the blackboard do not offer generated quests yet.

# Changes to the Quest Core

All changes are generic. None is about one quest. Stages, the four kinds and the observers are built. The new
rewards and the superseded state are not.

- **Stages.** An objective names its stage. A master works on one stage at a time, and its log entry holds where it
  is. The log shows only the stages a master reached. A quest of today is a quest with one stage. A quest with more
  than one stage has personal objectives only.
- **Objective kinds.** Each new kind is one enum value and one check.

  | Kind      | The player...                                        | Counted by                                    |
  | --------- | ---------------------------------------------------- | --------------------------------------------- |
  | `EXAMINE` | reads a carrier, examines a site, or digs at a spot  | The quest core, on the tick                   |
  | `TALK`    | asks a named townsperson or anybody of a named town  | The quest core, on the tick                   |
  | `BRING`   | brings an item to a person or a place                | The source, which takes the goods             |
  | `DECIDE`  | picks one of the choices. The pick is final          | The quest core, from the client's own message |

- **Targets.** An examine, talk or bring objective points at a **world target**: a prop, a POI or a townsperson, by
  an id that outlives the entity.
- **Branches.** An objective of a later stage may follow one choice only. So "keep the blade" ends the chain and
  "return it" goes on to the temple.
- **Observers.** Examine and talk are reported through an observer port, like kills today. Readable props, POIs and
  the talk service report. The lookup stays a hash lookup on the master's active quests.
- **Stage event.** When a master meets a stage, the quest core tells the source, with the pick if there was one.
  The source decides what the last stage is worth.
- **Rewards.** Coins from a town treasury, an item, a fact, experience.
- **Superseded.** An end state for the losers of a race. It is built: the log entry says who was there first. The
  next lead is not built yet.

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

A world fact uses the event kinds of the generated chronicle, so it reads like the history before it. It holds the
actors, the place, the master who did it and the game day. Today the living chronicle understands two kinds:

| World fact           | Meaning for the artifact                                        |
| -------------------- | --------------------------------------------------------------- |
| `ARTIFACT_TAKEN`     | A master holds it. It is no longer lost                         |
| `ARTIFACT_ENSHRINED` | A town keeps it. It is away until its home temple is that town  |

Nothing writes world facts yet. The endings do that.

An ending runs a small closed set of effects:

| Effect       | What it does                                                         |
| ------------ | -------------------------------------------------------------------- |
| World fact   | Appends an event to the living chronicle and posts a rumour          |
| Move thing   | Puts the object where the ending says: the relic into the temple     |
| Repair thing | Restores the damaged building                                        |
| Standing     | Changes [honor](/docs/server/honor/) and the regard of the household |
| Reward       | Pays coins, items, facts and experience                              |

A new world fact is also a new seed. So the ending of one quest is the start of the next one.

## How a quest ends

This part is built for the lost artifact:

- **The find is a fact.** Whoever opens the cache of an artifact took it, with or without a quest. That is written
  as the world fact `ARTIFACT_TAKEN`. Everything else follows from the fact.
- **The race.** When the fact names a master in the quest, the quest is over for every other master, and the
  winner goes on. When somebody outside the quest took the artifact, the quest ends for all.
- **The offer.** An artifact that was taken is no longer lost, so its offer is withdrawn.
- **The last step.** The master who does the last step of the plan finishes the quest and the plan.
- **The deadline.** A quest nobody finished in time ends. Its plan is offered anew while its cause is real.

Not built yet: the rewards, the return of the artifact to its temple, and a follow-up quest for the losers.

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

More quest shapes that are not built, and the open work on quest lines that branch, are collected in
[Quest Ideas](/docs/server/quest-ideas/).

# References

- E. S. de Lima, B. Feijó, A. L. Furtado: [Procedural generation of branching quests for games](https://doi.org/10.1016/j.entcom.2022.100491).
  Taken: steps with conditions, the motif, the tension arc, endings as the start of the next quest. Not taken: the
  genetic search, because plans must be the same for the same world.
- V. Prins, J. Prins, M. Preuss, M. Gómez-Maureira: [StoryWorld: Procedural Quest Generation Rooted in Variety & Believability](https://doi.org/10.1145/3582437.3587181).
  Taken: a quest comes from a real event and a need, it is given only on a good relationship, and it leaves a
  lasting change.
