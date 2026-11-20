---
weight: 504
title: From History to Quests
description: "The big picture of how a generated world gets its stories - the history that is simulated, what it leaves in the world, how quests are planned from it and from live events, how a language model writes the texts, and what of this is built."
---

{{< alert context="info" text="**Overview.** This page sums up several systems and links to the page of each. The state of the build is in the [last section](#what-is-built)." />}}

Every Bestia world is generated, and so are its stories. No designer writes a quest or a book for one world. Four
systems work one after the other:

```text
 world generation        zone server, at world creation         zone server, in play
 ────────────────        ──────────────────────────────         ────────────────────
 history ──chronicle──▶  quest planner ──plans──▶ text job      director ──▶ givers ──▶ quest core
 (1000 years)   │        (payoff first)           (LLM writes   (offers what            (steps, log)
                │                                  the texts)    has a real cause)           │
                ▼                                                     ▲                      ▼
          things in the world                                   live events            endings change
          (ruins, tombs, relics)                                (shortage, damage,     the world and are
                                                                 news)                 new causes
```

# 1. The History

The world generator plays out a thousand years on the places where towns can stand
([History Generation](/docs/server/history-generation/)). The result is the **chronicle**: a list of events with
the peoples, towns, people, gods, artifacts and world bosses they happened to. It is a set of facts, not prose.
The same seed always gives the same history.

The history also records **open threads**: stories that began and never ended. A lost artifact, an artifact that
is away from its temple, a vengeance not taken, a sealed boss, a boss at large, a house without heir, a persecuted
cult, a forgotten god.

# 2. What Can Be Found in the World

The history is not only told. It leaves things a player can walk to
([World History](/docs/mechanics/world/world-history/)):

| Thing                   | Where it comes from                                                                |
| ----------------------- | ---------------------------------------------------------------------------------- |
| Towns and their names   | Founded, walled, sacked and renamed by the history                                 |
| Ruins and ash ruins     | Towns that fell, or were buried by a volcano                                       |
| Battlefields            | Bones, blades and banners by the number of dead; undead that rise at night         |
| Tombs and monuments     | The resting places of notable people; a few hold an artifact and are guarded       |
| Grave stones            | People who died at home, in the cemetery of their town, with an epitaph to read    |
| Treasure caches         | Buried at history sites; a site with an artifact holds a splendid one              |
| Relics                  | A dug artifact is an item named from the chronicle, with its own history           |
| Forts, mines, shrines   | Monasteries, lighthouses, cave hoards and Wounds are placed the same way           |
| What people say         | [Townsfolk](/docs/server/dialog/) tell the events of their town, legends and rumours |

A townsperson who tells an event of the chronicle teaches it. The game keeps what each player has learned in the
**fact store**, so a quest can ask for it later.

# 3. Quests

The **quest core** ([Quests](/docs/server/quests/)) only keeps records: a quest, its steps, who took it, how far
each player is. It does not know where a quest comes from. Two sources make quests: players, on the blackboard,
and the world, through the [Quest Manager](/docs/server/quest-manager/).

The Quest Manager follows a few rules. A quest needs a **real cause**. It is planned **from its payoff backwards**,
so no quest ends in nothing. A quest shape is **data** in a catalogue, never code. And an **ending changes the
world**.

| Part       | What it does                                                                                             |
| ---------- | -------------------------------------------------------------------------------------------------------- |
| Sources    | Turn a cause into a **seed**: an open thread of the history, a town that lacks a good, a damaged building, news that has not reached a town |
| Planner    | Builds a chain of 2 to 5 steps from the seed, with real places and people. Same world, same plans         |
| Director   | Offers a plan when its cause is real and the town has room for it, and withdraws it when the cause is gone |
| Givers     | A townsperson in a conversation, or the town's board                                                     |
| Quest core | Tracks the steps: talk, examine, bring, deliver, kill, decide                                            |
| Endings    | Write a **world fact**, move the thing, repair the building, change standing, pay the reward             |

The four quest shapes that exist:

| Shape           | Cause                                  | Who                                   | What changes                                    |
| --------------- | -------------------------------------- | ------------------------------------- | ----------------------------------------------- |
| Lost artifact   | An open thread of the history          | A race: one prize in the world        | The relic is kept by the finder or in its temple |
| Town shortage   | The town's stock of a good is low      | All comers fill one counter           | The goods go into the town's stock              |
| Town damage     | Buildings of the town are destroyed    | All comers fill one counter           | The buildings are repaired                      |
| Carried news    | A town nearby has not heard a rumour   | Up to 100 masters, each for themself  | The other town now tells the news               |

A world fact is an event after year 1000. Together with the generated chronicle it is the **living chronicle**. A
new world fact is a new cause, so the end of one quest can start the next one. This is how history and play join:
the history gives the first causes, and the players write what comes after.

# 4. The Texts

A legend, an epitaph or the words of a quest giver belong to one world, so they cannot be in the game's
translation files ([Dynamic Text](/docs/server/dynamic-text/)).

- **A template always works.** Each text has a plain template behind it. The world is playable before any text is
  written.
- **Written once, at world creation.** A small language model runs on the server's CPU, in its own container that
  the zone starts and stops. Nothing is written while a player waits.
- **Facts in, text out.** For each text, plain code collects a **fact sheet**: the facts, the names that may be
  used, and what a quest text must point at. The model only puts them into words.
- **Checked.** A validator rejects a text with a name or a number that is not on the sheet. The model tries again,
  up to three times. A text that never passes stays a template.
- **Each language from the facts.** German is written from the same fact sheet, not translated from the English
  text.
- **A time cap.** The most important texts come first: unique quests, then quests near the start towns, then the
  rest. What is not written when the time is up stays a template.
- **Placeholders.** A text about something that only happens in play, such as news, is written ahead with a gap
  like `{town}`. The game fills it when the text is shown.

The zone sends a **text reference**: the template key, its arguments, and the id of the written text if there is
one. The client shows the template at once and swaps in the written text when it has loaded it from the
api-server, in the player's language.

# What Is Built

| Part                                                                 | State                                     |
| -------------------------------------------------------------------- | ----------------------------------------- |
| History, chronicle, open threads, the things in the world            | Built                                     |
| Text reference, text store, delivery, readable things                | Built                                     |
| Fact store, quest steps and stages, living chronicle                 | Built                                     |
| Planner, catalogues, director, townsfolk as givers                   | Built                                     |
| Endings, rewards, the race                                           | Built                                     |
| Text job with the language model, English and German                 | Built                                     |
| Town shortage, town damage, carried news                             | Built                                     |
| Client: steps in the quest log, the decide dialog, the paper sheet   | Built                                     |
| Quests from the other seven kinds of open thread                     | Not built                                 |
| Found things (a letter, an epitaph) as quest givers                  | Not built                                 |
| A follow-up quest for those who lost a race                          | Not built                                 |
| A window that shows what a player has learned                        | Not built                                 |
| Books and long prose                                                 | Not built                                 |
| Quest lines that branch, more quests for many players                | Ideas, see [Quest Ideas](/docs/server/quest-ideas/) |

The endings, the text job, the live quests and the client windows have not been played in a running game yet.
They are covered by tests only.
