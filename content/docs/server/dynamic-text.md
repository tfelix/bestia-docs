---
weight: 355
title: Dynamic Text
description: "Design for text that is written per world - LLM prose for quests, books, epitaphs and NPC lines - how the zone refers to it, how the api-server delivers it in the player's language, and how the text job writes it at world creation."
---

{{< alert context="info" text="**Built** for quest texts and epitaphs, in English and German. The text job is off by default. Books and the other kinds of lore text are not built." />}}

Most text in Bestia is a **template**: the server sends a key and typed arguments, and the client builds the
sentence in its own language (see [Saying it in another language](/docs/server/dialog/#saying-it-in-another-language)).
Text that is written for one world cannot work this way. The legend of a blade, an epitaph or a book does not exist
in the client's translation files.

This page describes how such text is written, stored and delivered. The [Quest Manager](/docs/server/quest-manager/)
is its first user.

# Rules

- **Written at world creation.** An LLM writes the texts once, after the world is generated. No text is written
  while a player waits, and NPCs never improvise.
- **A template always works.** Every text has a template behind it. The world is playable before the first LLM text
  exists, and a text the LLM never wrote stays a template.
- **A time cap.** The text job gets a fixed time per language, a few hours. The most important texts come first.
- **One way for all clients.** The game client and the companion app load text the same way.

# The Text Reference

The zone never sends the body of a dynamic text. It sends a **text reference**:

| Field     | Meaning                                                    |
| --------- | ---------------------------------------------------------- |
| `key`     | The template key, as today                                 |
| `args`    | Typed arguments: number, item, species, skill, name, token |
| `text_id` | Optional. The id of a written body                         |

Quest titles and texts, conversation lines and readable things all use this one type. The two argument types of
today, for dialog and for quests, become one.

The client shows the template at once. When the reference has a `text_id`, it loads the body and shows it instead.

# The Body

A body is prose with the same `{placeholders}` as a template.

- A value that changes at runtime, or that the client names itself, stays a placeholder: an amount, an item, a
  species, a player.
- A name from the chronicle is written into the body. Each language has its own form of the name, see
  [Names in Other Languages](/docs/server/name-generation/#names-in-other-languages).

A text can be written before the game knows a name in it. Then the brief lists the placeholder and says what it
stands for: `{town}`, the name of the town the news must be carried to. The writer is told to put it where the
name belongs in the sentence. A placeholder needs a name that is no common word: a small model read `{to}` as the
word "to" and wrote "carry this swiftly {to}".

```text
"{amount} beams of {item}, no less. The storm took half the roof, and Saint Orwen does not like the rain."
```

# Storing

The zone keeps the bodies in a table of the world. It is wiped with the world.

| Column    | Meaning                      |
| --------- | ---------------------------- |
| `text_id` | A random id, 32 hex digits   |
| `locale`  | The language                 |
| `body`    | The text                     |
| `state`   | Waiting, written or rejected |
| `model`   | The model that wrote it      |

- The id is **random**. A client cannot guess the id of a text it was never given, so it cannot read ahead.
- A body **never changes**. A new text is a new id. So every copy can be kept forever.

# Delivering

```text
GET /v1/companion/texts/{textId}/{locale}
```

The [api-server](/docs/server/api-server/) serves the body. It asks the zone over the bus, keeps the answer, and
tells the caller to keep it too. This is the same pattern as guild emblems.

- When the language is missing, the English body is sent. The `Content-Language` header names the language of
  the body. Nobody keeps such a fallback for long, because its language may be written later.
- When there is no body at all, the answer is "not found" and the client keeps the template.
- The game client keeps bodies on disk, like map tiles. It opens the route with its connection ticket.

# Readable Things

Signposts, milestones, graves and examined places send `ReadableSMSG`, a message with a text reference. The client
shows it as a chat line. A grave stone, a signpost and a milestone also open as a sheet of paper on the screen, so
they read as things of the world; a look at a place stays a chat line. Books become items that hold a text reference. So every readable thing can be translated,
with or without an LLM text.

# The Text Job

The job writes the texts of a new world with a small language model on the server CPU. It is built for quest texts
and epitaphs, in English and German. It is off by default (`prose.enabled`).

## What is written

A part of the game that wants texts is a **text source**. It names its subjects and gives a **brief** for each one.

| Source      | Texts                                                                    |
| ----------- | ------------------------------------------------------------------------ |
| Quest plans | What the giver says about the quest, and a journal line for each step    |
| Epitaphs    | One for every named grave                                                |

A brief holds the task, every name the text may use with what it is, the facts, and the **lead**: the names the text
must contain. The giver's tale must name where the next step is. An epitaph must name its dead and both years.

Each wanted text is a waiting row in the text table, under a **subject** that is stable in the world, such as
`grave:7`. So the table is the queue: the job can stop at any time and go on later.

## How a text is written

1. **Write.** The model gets hard rules, the task, the allowed names, the facts, and the word to write last.
2. **Validate.** Every proper name and every number must come from the brief, and the lead must be there. A text
   that fails is asked for again with what was wrong, up to three times. The rejected text is never shown to the
   model, because it would copy it. After three tries the text is rejected and the template stays.
3. **Translate.** After all English texts, the same model translates each one. It gets the names in the form of
   the other language. A translation is taken when the made-up words of the names and every number are still there.
   Grammar may bend a name.

## The model belongs to the zone

The zone starts the model itself, in a container, over the Docker socket. Nobody starts it by hand and it never runs
beside the game.

- The container runs the llama.cpp server with Gemma 4 E4B. Image, model, threads and memory are settings
  (`prose.llm.*`).
- The server fetches the model on the first start, about 5 GB, and keeps it in a Docker volume.
- When the job is done, or fails, the zone removes the container. A container that an earlier run left behind is
  removed first.
- The image is pinned by its digest. The `server` tag of llama.cpp moves with every build.
- A zone that runs in a container itself has no Docker socket. In the release bundle a small **socket proxy** gives
  it only the calls about containers and images. The zone finds its own Docker network and puts the model beside
  itself, so the model has no port on the host.

In the release bundle, `PROSE_ENABLED=true` in `.env` is the only setting.

## A reduced boot phase

The model needs most of the memory of a small machine. So the zone writes the texts while it is still small:

```text
world ─▶ catalogues ─▶ quest plans ─▶ TEXT JOB ─▶ entities ─▶ towns ─▶ tick ─▶ socket
```

The boot waits until the job is done. No entity is loaded, the tick does not run and no player can connect. A world
that is already written boots straight through. Whatever goes wrong in the job, the zone boots: a text that was not
written stays a template.

## Written once

The texts are rows in the database of the zone, like the world itself. When the zone starts again with the same
world, it finds them, starts no container and boots straight through. This holds for a text that was rejected too:
it is not tried again.

The model starts again only when the world wants a text it does not have, for example for a new quest plan, and
only while there is time left in the cap. A new world gets new texts.

## Order and cap

The job writes quest texts first, then epitaphs. English is written first, then the next language in the same order.

The job has a time cap per language, three hours by default. The time spent is stored with the world. So a restart
goes on where the job stopped, and it does not start the clock again. When the time is used up, what is left stays a
template for good.

## Measured

On the test world (i7-1355U laptop): 17 English texts and 17 German ones in 8 minutes, about 14 seconds per text.
All 34 passed at the first try. The container held 1.5 GB as Docker counts it; the model file is mapped on top.

## Trying it out

You need Docker, about 8 GB of free memory and 6 GB of disk for the model.

1. Start the zone with the job switched on:

   ```sh
   PROSE_ENABLED=true ./gradlew :zone-server:bootRun
   ```

2. Read the log. The lines come in this order:

   ```text
   Queued 34 new texts; 34 wait to be written
   Boot waits for the texts of the world, at most PT3H per language
   Started the model container ... with unsloth/gemma-4-E4B-it-GGUF:Q4_K_M
   The model is ready
   grave:13 [en]: written after 1 tries
   ...
   Text job done: 34 written, 0 rejected, 0 left as templates for now
   Removed the model container
   ```

   The first start fetches the image and the model, so "The model is ready" takes a few minutes. While the job
   runs, `docker ps` shows the container `bestia-llm`. After it, the container is gone.

3. Read the texts in the database:

   ```sh
   docker compose -f zone-server/compose.yaml exec mariadb mariadb -ubestia -pbestia bestia_zone \
     -e "select subject, locale, state, attempts, body from world_text order by subject, locale"
   ```

4. Read them in the game. Click a named grave in a town cemetery: the epitaph comes as a chat line, first the
   template and then the written text. Talk to a townsperson who offers a quest and take it: the giver's tale and
   the lines in the quest log are written texts. Switch the client to German to see the translation.

5. Stop the zone and start it again the same way. The log now says `Queued 0 new texts; 0 wait to be written`, and
   no container starts.

6. To have the texts written again, empty the two tables and start the zone:

   ```sql
   delete from world_text;
   delete from text_job_budget;
   ```

Without a game, two tests run the real model. They are skipped in a normal test run.

```sh
# Starts the container, asks one question, removes the container. About a minute once the model is fetched.
PROSE_REAL_HOST=true ./gradlew :zone-server:cleanTest :zone-server:test --tests '*DockerHostManualTest' -i

# Writes and prints every text of the test world, in English and German. About ten minutes.
PROSE_REAL=true ./gradlew :zone-server:cleanTest :zone-server:test --tests '*RealModelManualTest' -i
```

In a release, set `PROSE_ENABLED=true` in `.env` before the first start. The zone then shows as "starting" for as
long as the texts take.

## Later: more than one node

The job talks to a **model host**, not to a container. Today there are two hosts: the zone's own container, and a
llama.cpp server at a URL. On a cluster, one node plans and stores the texts, and other nodes are started only to
run the model. The planning node uses them through the URL host. When the texts are written, all boot as zones.
Only one node may hold the job.

# Limits

- The client translation files hold English only today. German templates are a task of their own.
- The validator cannot see a true name in the wrong place.
- The translation has grammar slips: a name after "von" in the wrong case, a word left in English now and then.
- A journal line does not always use the verb of its step: it may say "seek" where the step is "dig".
- A body is public to everyone who has its id. Players can share texts, as they can share any other knowledge.
