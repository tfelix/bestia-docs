---
weight: 355
title: Dynamic Text
description: "Design for text that is written per world - LLM prose for quests, books, epitaphs and NPC lines - how the zone refers to it, how the api-server delivers it in the player's language, and how the text job writes it at world creation."
---

{{< alert context="warning" text="**Partly built.** The text reference, the store, the endpoint, the client cache and readable things exist. The text job does not, so no world has written texts yet." />}}

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

The job runs after world generation, next to the running world. It follows the prose spike:

1. **Fact sheet.** For each text, plain code collects the facts, the allowed names, the voice and a length limit.
   For a clue it also collects the **lead**: the place, person or thing the text must point at.
2. **Write.** A small model on the server CPU writes the text. It runs in its own container next to the zone.
3. **Validate.** Every name and number must come from the fact sheet. Every placeholder must still be there. The
   lead must still be there. A text that fails is written again, up to three times, and then rejected.
4. **Translate.** The same model translates the accepted English text. The translation is validated too.

The table is the queue, so the job can stop and go on later.

## Order and cap

| Order | Texts                                                         |
| ----- | ------------------------------------------------------------- |
| 1     | Unique quests and the carriers on their clue chains           |
| 2     | Quests and carriers near the start towns                      |
| 3     | The rest of the history: epitaphs, legends, chronicles, books |
| 4     | Possible live quests of each town                             |

English is written first, then the next language in the same order. The job stops when the time for a language is
used up. What is left stays a template.

# Limits

- The client translation files hold English only today. German templates are a task of their own.
- The validator cannot see a true name in the wrong place.
- A body is public to everyone who has its id. Players can share texts, as they can share any other knowledge.
