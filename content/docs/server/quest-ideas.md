---
weight: 506
title: Quest Ideas
description: "Ideas for generated quests that are not built yet - work many players can do for a town or its university, and the open work on quest lines that branch and follow the storylines of the world."
---

{{< alert context="info" text="**Ideas, not built and not decided.** This page collects quest shapes for the [Quest Manager](/docs/server/quest-manager/) so they can be refined later. Nothing here is a promise." />}}

The [Quest Manager](/docs/server/quest-manager/) makes quests from real causes. Today it knows four shapes: the
lost artifact, the town that lacks a good, the town that rebuilds, and news that is carried on. This page lists
more shapes. Each one has to answer the same questions before it can be built:

| Question                | Why it matters                                                                |
| ----------------------- | ----------------------------------------------------------------------------- |
| What is the real cause? | A quest never starts from a made-up reason. Something in the world must be so |
| Who asks?               | A giver the player can find: a townsperson, a board, an institution           |
| What are the steps?     | Each step is an objective kind of the quest core, or a new one                |
| What changes?           | The ending must leave something in the world, or the quest was only a task    |
| What is missing?        | Systems the game does not have yet                                            |

# Quests for Many Players

These are not races. They follow the two patterns that exist:

- **One counter for all.** All comers fill one counter, as for a [town that lacks a good](/docs/server/quest-manager/#a-town-that-lacks-a-good).
- **Each for themself, with a limit.** Many masters take the quest and each one finishes it, as for
  [carried news](/docs/server/quest-manager/#news-that-stopped-on-the-way): a limit on how many may take it
  (100 today), and the quest closes for all some time after the first one finished.

The limit should later follow the number of players of the world, not a fixed number.

## The university asks for a bestia

The university of a big town studies bestias and asks for an egg or a living one of a species.

- **Cause.** The university keeps a list of the species it has studied. A species that lives in its region and is
  not on the list is a gap. The list is real and players can read it.
- **Giver.** A scholar of the university, or the town's board.
- **Steps.** Bring an egg or a caught bestia of the species. Several specimens are needed, so many players add to
  one counter.
- **What changes.** The species is on the list. The university can then tell players about it: where it lives,
  what it fears. That is knowledge for the fact store.
- **Missing.** A university as a place and a giver. The list of studied species per town. Handing over a living
  bestia or an egg as an objective.
- **Open.** May the same species be asked for again, for example when the university burned?

## Gather samples

A scholar wants samples from a place: water of a lake, soil of a battlefield, a plant of a swamp.

- **Cause.** Something happened there that the scholar wants to understand: a flood, a fire, a mana storm, a
  field that no longer bears.
- **Steps.** Go there, take a sample (examine a spot with the right tool in the bag), bring it back. Each master
  for themself, with a limit.
- **What changes.** The scholar knows the cause. That can open the next quest: the well is poisoned, so somebody
  has to find out who did it.
- **Missing.** A sample item that remembers where it was taken. Spots that can be sampled.

## Measure mana storms

Mana storms pass over the outskirts. The university wants them measured.

- **Cause.** A real storm of the weather system, now or soon.
- **Steps.** Stand inside the storm with a measuring device until it has read enough, then report back. The quest
  only takes work while the storm lasts.
- **What changes.** The town knows the storm. It could then warn of the next one: a forecast at the board or on
  the map.
- **Missing.** Mana storms as weather. A device item. An objective that counts time spent in an area under a
  condition.
- **Open.** Is being in a storm dangerous enough to make this a real choice?

## Place detection devices

The town wants devices set up around it that warn of storms, of a boss, or of raiders.

- **Cause.** The town was surprised by something, or a device that stood there is broken.
- **Steps.** Carry a device to a named spot and set it up. There are several spots, so many players fill one
  counter.
- **What changes.** The devices stand in the world as things. While they stand, the town knows earlier what
  comes. They wear out or get destroyed, and then the town asks again.
- **Missing.** An objective "place this at that spot". The devices as props with an effect. Something worth being
  warned of.

## Mark the portals

Old portals stand in the wild. Once they are marked, a guild in the big city can send travellers there.

- **Cause.** A portal exists that nobody has marked. Portals are placed by the world generator.
- **Steps.** Find a portal and mark it. Each portal is marked once for the world; many portals make many small
  quests, or one shared quest with a counter.
- **What changes.** The portal is on the map for everybody. An NPC in the big city sends a player to a marked
  portal for a fee. The player picks the portal on the map. The fee goes to the town's treasury.
- **Missing.** Portals as places of the world. The travel NPC and its map picker. A link to
  [long-distance travel](/docs/server/long-distance-travel/), so the two do not make each other pointless.
- **Open.** Is travel one way only? Can a portal be lost again?

## Help on the fields

A town cannot bring in its harvest alone.

- **Cause.** It is harvest time and the town has too few people for its fields, or its food stock is low.
- **Steps.** Work on the fields: one action per plot. All comers fill one counter.
- **What changes.** The harvest goes into the town's stock, so the town really has more food.
- **Missing.** Fields as things a player can work on. Seasons in the town's economy.
- **Open.** How is this more than clicking plots? Bestias that help could be the answer.

# Quest Lines that Branch

Today a quest is a short chain with at most one choice at its end. The paper of Lima et al. (see the
[references](/docs/server/quest-manager/#references)) goes further: a quest is a tree of events, and each path
through it is a different story.

What exists and points this way:

- Steps have conditions and effects, and the planner chains them.
- An ending writes a world fact, and a world fact is a seed. So the end of one quest can start the next.
- A master who loses a race is told who won. A follow-up for them is planned but not built.

What a quest line would add:

- **Several choices in one line**, not only one at the end. Each choice closes some later steps and opens others.
- **Lines that follow a storyline of the world**: a war between two peoples, a feud of two houses, a god who was
  forgotten. The line takes its people and places from the chronicle and moves the storyline on.
- **Choices that last.** What one master decided is known to the people it concerned, and later quests react.

Open questions:

- Who owns a branch when many masters play the same line? One decision for the world, or one per master?
- How long may a line be before its texts cost too much to write ahead?
- How does the planner keep a line coherent without the genetic search of the paper, which we left out because
  plans must be the same for the same world?
- Which storylines does the chronicle hold that are worth a line?
