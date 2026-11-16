---
weight: 615
title: History Prose
description: A spike on writing lore texts from a world's chronicle with a small LLM on a CPU-only server - epitaphs, artifact legends, hymns and biased war chronicles, translated to German. Measured speed, memory, reliability and quality, the chosen runtime and model, the storage and delivery design, and a go/no-go.
---

{{< alert context="warning" text="**Spike result, nothing built in the game.** The prototype lives on the local branch `spike/history-prose` in bestia-behemoth (`tools/history-prose/`). Storage and delivery below are a design only." />}}

The [history stage](/docs/server/history-generation/) leaves a chronicle full of named people, wars, gods and relics.
This spike asks: can the game server turn it into texts that players find in the world (grave stones, books,
legends, hymns), once per world, on a CPU, in every client language?

**Answer: go.** A 4B model wrote all 107 texts of a genesis world in 41 minutes on a 15 W laptop CPU, with every
name and year checked against the chronicle. The same model translates them to German in about the same time again.
Conditions and open points are at the [end](#recommendation).

The texts themselves, side by side for six models: **[reading set](https://claude.ai/artifact/CpT9uGUBw65a939Fa8kLCK)** (private Artifact page).

# Setup

**Machine.** An Intel i7-1355U laptop (2 performance and 8 efficiency cores, 12 threads, AVX2 and AVX-VNNI, no
AVX-512), 31 GB RAM. A server CPU will be faster; no server was measured. Generation runs on 6 threads, prompt
reading on 10: more threads made generation slower, because the efficiency cores hold the others back.

**Fact sheets.** `./gradlew :worldgen:chronicle -Pgenesis -Pfactsheet` writes one JSON object per civ, figure,
dynasty, artifact, war, battlefield, deity, cult and world boss. A sheet holds names, years, relations and the event
lines of that entity, and the list of names and years a text about it may use. It is built from the chronicle only.

**Text kinds.** Each model wrote the same 12 texts from the genesis world (seed 11753242):

| Kind | Count | Shape |
| --- | --- | --- |
| Chronicle book | 2 | The same war (901-911), once by a scribe of each side, biased, 100-180 words |
| Epitaph | 5 | 2-5 lines on a grave stone, 20-50 words |
| Artifact legend | 3 | A storyteller's tale of a relic's owners, 80-130 words |
| Hymn | 2 | 6-10 lines to a god, in the name one people uses |

**Models.** All quantised to 4 bits (`Q4_K_M`), all with licenses that allow commercial use in a game:

| Model | Size | License | Runtime |
| --- | --- | --- | --- |
| Gemma 4 E4B-it | 4.5 B effective, 5.0 GB file | Apache-2.0 | llama.cpp |
| Qwen3-8B | 8 B, 5.0 GB | Apache-2.0 | llama.cpp |
| Ministral-3-8B-Instruct-2512 | 8 B, 5.2 GB | Apache-2.0 | llama.cpp |
| Qwen3-4B | 4 B, 2.5 GB | Apache-2.0 | llama.cpp |
| Ministral-3-3B-Instruct-2512 | 3.4 B, 2.1 GB | Apache-2.0 | llama.cpp |
| Mistral-7B-Instruct v0.3 (`JQ4`) | 7 B, 4.5 GB | Apache-2.0 | Jlama 0.8.4 |

Jlama got Mistral-7B v0.3 because Jlama 0.8.4 cannot load Qwen3, Ministral 3 or Gemma 4.

# Results

## Speed

Clean numbers from `llama-bench` at 800 tokens of context (the size of a fact sheet prompt), and the mean time per
text in the reading set, retries included:

| Model | Prompt tok/s | Generation tok/s | Seconds per text |
| --- | ---: | ---: | ---: |
| Gemma 4 E4B | 42.7 | 6.9 | 22 |
| Ministral-3-3B | 32.2 | 9.2 | 40 |
| Qwen3-4B | 22.7 | 5.1 | 67 |
| Qwen3-8B | 12.6 | 2.8 | 46 |
| Ministral-3-8B | 13.8 | 3.8 | 76 |
| Mistral-7B on Jlama | 6.9 | 3.6 | 302 |

The Jlama row comes from the harness, since `llama-bench` cannot run it. Seconds per text depend on retries as much
as on speed: the 3-4B models are faster per token but need more tries.
Running several requests at once (llama.cpp slots) did not help on this CPU; the cores are busy computing, not
waiting on memory.

## Reliability

The validator checks every capitalised name, every number (also written out: "four hundred and eight") and the
letter case of every sheet name. A text that fails is written again with the findings added to the prompt, up to
three times.

| Model | Valid at once | Valid after retries |
| --- | ---: | ---: |
| Gemma 4 E4B | 12 of 12 | 12 of 12 |
| Qwen3-8B | 11 of 12 | 12 of 12 |
| Ministral-3-8B | 9 of 12 | 11 of 12 |
| Ministral-3-3B | 4 of 12 | 9 of 12 |
| Qwen3-4B | 5 of 12 | 8 of 12 |
| Mistral-7B on Jlama | 3 of 12 | 7 of 12 |

The validator grew during the spike. Ministral-3-8B ran with an older number check that misread one correct spoken
year ("five seventy-one"), so one of its retries was not needed. All other rows ran with the final validator.

**Whole genesis world, Gemma 4 E4B:** 107 of 107 texts valid, 106 at the first try. The one retry was a name in
lowercase.

## Quality

Scored by a rubric over all 72 texts: facts (counted twice), voice, language and form, each 1 to 5. "Score" is the
weighted mean, "Facts" the facts part alone. The scores are a first opinion; the [reading set](https://claude.ai/artifact/CpT9uGUBw65a939Fa8kLCK)
has every text with a comment.

| Model | Score | Facts | Strong | Weak |
| --- | ---: | ---: | --- | --- |
| Gemma 4 E4B | 4.5 | 4.8 | Facts closest to the sheet, clean language | Formulaic (see below); plain epitaphs |
| Qwen3-8B | 4.7 | 4.6 | Reliable, the best hymns | Small fact slips in the biased books |
| Ministral-3-8B | 4.3 | 3.7 | The best voice: a real storyteller, a real scribe | Moves facts around, invents calendars and causes of death |
| Qwen3-4B | 3.6 | 4.2 | Correct facts | Writes in lowercase and in lists |
| Ministral-3-3B | 3.4 | 2.8 | Fast | Garbles years, invents death counts and kings |
| Mistral-7B on Jlama | 3.4 | 3.4 | Vivid books | Leaks the prompt ("Here is your task:"), invents facts |

**Only Gemma 4 E4B and Qwen3-8B are still in the running.** The other four are out: Ministral-3-8B for its facts,
the two 3-4B models for facts and letter case, Jlama for speed and model support.

**Sameness.** Over the whole world, Gemma 4 E4B opened 31 of 32 legends with "Hark, and lend thine ear". A second
run of all 32 legends with four rotating framings per kind (a storyteller, a temple record, a traveller's note, a
scholar's catalogue) and "do not open with 'Hark'" brought that to 0, with 31 of 32 still valid. But a stock phrase
moved elsewhere: "a silent witness to the ages" stood in 12 legends before and 16 after. Varied prompts help; a
check for phrases repeated across the world's texts, fed back like a validator finding, should come with them.

What the validator **cannot** catch: a true name in the wrong place. Ministral-3-8B moved a sacking from Bortedag to
the capital Bortebulak; both are sheet names, so the text passed. A model that writes facts closely (Gemma 4 E4B,
Qwen3-8B) matters more than one with a better voice.

The spike also found gaps in the chronicle itself:

- **Renamed towns.** A town renamed after a conquest shows up under two names (Karatau, later Karaobo) with nothing
  saying they are the same place. Fact sheets should list old names.
- **No sex for figures.** Models guess "he" or "she", and the chronicle cannot say which is right. Either it records
  one, or the prompt asks for neutral wording.
- **Spelled-out years.** Some models write "in five seventy-one". That is checkable, but a translation model then
  turned "nine hundred six" into "96". The prompt should insist on digits.

## Translation to German

Each model's first book went to German twice: by the same model, and by
[Argos Translate](https://github.com/argosopentech/argos-translate)'s en→de model run with CTranslate2 (150 MB).
Then 18 texts of Gemma 4 E4B's world run, two of every kind, went the same two ways.

| | Same LLM (Gemma 4 E4B) | Argos (CTranslate2) |
| --- | --- | --- |
| Time | 12 s per epitaph, 25 s per legend, 44 s per book | under 1 s per text |
| Register | Keeps it, even rhymes the hymns in German | Modern, falls into the formal "Sie" ("hören Sie unsere Bitte") |
| In-world words | Mostly right ("Grabhügel") | Wrong: "barrow" becomes "Scheune" (barn) and "Leiche" (corpse), "casket" becomes "Sarg" (coffin), "sacked" becomes "entlassen" (dismissed) |
| Names | Kept exactly, so English epithets stay ("Gerel the Unbeaten") | Translated at random, even inside one text ("Coinkeeper", then "Münzhüter") |
| Other errors | Small grammar slips ("des Bestie") | Whole sentences in lowercase ("altani der weiner"), nonsense lines, "nine hundred six" became "96" |

**The same LLM wins.** Argos is a hundred times faster, but it fails on exactly the words lore uses, and its model
files state no license. The LLM's real gap is names. The fix needs no model: `Names.kt` builds every name from
parts, so it can render each name in each locale ("House Tregrube" → "Haus Tregrube", "the Unbeaten" → "der
Ungeschlagene", "Sabre of Erzvein" → "Säbel von Erzvein"). The translation prompt then gets those as a fixed
glossary, and the validator checks the German text against it.

Cost: translation takes about as long as writing, so each extra language adds about 40 minutes for a genesis world
and 1.6 hours for a large one.

## Memory

Peak RSS of the llama.cpp server after one text, by load mode:

| Model | Default | No mmap (`-lm none`) | No repacking (`--no-repack`) |
| --- | ---: | ---: | ---: |
| Gemma 4 E4B | 7.4 GB | 5.6 GB | 5.2 GB |
| Qwen3-8B | 8.9 GB | 5.7 GB | 5.7 GB |

By default llama.cpp maps the model file and also keeps a copy of the weights repacked for the CPU, so both count.
Either switch removes the double, at the same speed. Over the whole world run the default server grew to 11.3 GB:
it also keeps up to 8 GB of old prompts in RAM for reuse (`--cache-ram`), which never pays off here, since every
prompt is different. **Run it with `--no-repack --cache-ram 0`.** That should hold either model at about 5-6 GB
(measured for one text, not yet over a whole world), well inside a 16 GB server next to the zone. Jlama peaked at 10.4 GB.

## One world

`chronicle -Pfactsheet` also counts the texts a world needs:

| Text | Genesis (128 cells) | Large (256 cells) |
| --- | ---: | ---: |
| Epitaph, one per tomb with a known dead | 38 | 93 |
| Artifact legend | 32 | 63 |
| Hymn, one per god | 5 | 7 |
| War chronicle, one per side | 10 | 32 |
| People chronicle, one per civ | 4 | 8 |
| Battlefield memorial | 7 | 20 |
| Cult tract | 3 | 10 |
| World boss legend | 3 | 4 |
| House chronicle | 7 | 13 |
| **Total** | **109** | **250** |

**Measured: the whole genesis world with Gemma 4 E4B** (all nine kinds). The run wrote 107 texts, not 109: it
writes one epitaph per figure with a grave (36), and two tombs name a figure whose own record does not point back
to that tomb.

| | Genesis, measured | Large, from the count |
| --- | ---: | ---: |
| Time, English | 41 min (23 s per text) | about 1.6 h |
| Text, English | 43 KB, 13 KB deflated | about 100 KB |
| Mean length | 74 words; epitaphs 30, legends 92, books 139 | |

German with the same model adds about the same time again: about 1.4 h for English and German on a genesis world,
about 3.2 h on a large one.

# Prompts

Every text: this system prompt, then a user message `FACT SHEET <the sheet as short indented lines> TASK <the task>`.
Sampling: temperature 0.7, top_p 0.9, at most 400 new tokens; Qwen3's thinking turned off.

```text
You write short texts that players find inside a fantasy game world: books, grave stones, legends, prayers.
Rules:
- Use only the facts in the FACT SHEET. Do not invent people, places, peoples, gods, artifacts or titles.
- Write every name exactly as the fact sheet writes it. Do not add titles like King or Lord.
- Write years as digits, and use only years and numbers from the fact sheet.
- You may invent feelings, images, weather and small details that carry no name and no number.
- Normal capital letters: every sentence starts with a capital, and names keep their capitals.
- Old, simple language. No modern words. No title line, no notes, no explanation. Output only the text.
```

| Kind | Task |
| --- | --- |
| epitaph | Write the epitaph carved on the grave of {name}. 2 to 5 short lines, 20 to 50 words in total. Name the dead, the years of birth and death, and one deed or tie from the fact sheet. Solemn tone. |
| legend | Write the legend of {name} as an old storyteller tells it at the fire. One paragraph, 80 to 130 words. Follow the events in order: who made it, of what, where, what became of it, and where it is now. |
| hymn | Write a hymn to {name}, the god of {domain}, as the {people} sing it. 6 to 10 short lines. Speak to the god by the name the {people} use. Draw on the god's domain and on anything else the fact sheet says about temples, cults or events. |
| book | Write a passage from a chronicle about the war between the {side} and the {other}. A court scribe of the {side} wrote it. One or two paragraphs, 100 to 180 words. The scribe is biased: praises the {side}, blames the {other}, and explains away every defeat of the {side}. But every event, winner, death count and year must stay as the fact sheet gives it. Do not give the scribe a name. |

**Retry.** A rejected text is not sent back; small models copied it word for word. The next try gets the same prompt
plus an `AVOID` block with one line per finding, for example: *"Eldoria" is not a name in the fact sheet. Use only
names from the sheet.*

# Runtime: llama.cpp as a sidecar

llama.cpp's `llama-server` runs as its own container next to the zone. The zone sends each prompt over HTTP to its
OpenAI-style `/v1/chat/completions` endpoint, with Spring's `RestClient`. The spike used the official image
`ghcr.io/ggml-org/llama.cpp:server` (CPU build, 817 MB).

Jlama, pure Java inside the JVM, lost on every count:

- **Speed.** It reads the prompt half as fast. A text took 5 minutes, against 22-76 s on llama.cpp.
- **Models.** Version 0.8.4 (January 2025, no release since) loads only older architectures.
- **Memory.** 10.4 GB peak, inside the zone's own heap.

The sidecar also keeps a crash or an out-of-memory away from the game, can be held to fixed cores and a memory
limit by Docker so the game tick keeps its cores, and takes a new model as a new file with no code change. The cost
is one more container in the deploy bundle and a health check.

# Storage and delivery

Design only; built after this page is accepted.

## Chronicle snapshot

A table `world_chronicle`, one row per world, in the pattern of `PersistedChunkEdit`:

| Column | Type | Why |
| --- | --- | --- |
| `chronicle_hash` | `char(64)`, primary key | SHA-256 of the serialised chronicle; keys every lore text |
| `format` | `int` | Serialisation format, like `delta_format` |
| `pipeline_version` | `bigint` | The worldgen pipeline that made it |
| `payload` | `@Lob`, `Length.LONG32` | The chronicle, deflated |
| `created_at` | `timestamp` | |

The genesis world's fact sheets are 123 KB raw and 16 KB deflated (large world: 309 KB and 37 KB), so size is no
concern. The chronicle is a pure function of seed and pipeline, but a stored copy gives the texts stable ids even
after the code changes, lets the lore job run without building the world tier again, and lets other services read
the history without worldgen.

## Lore texts

A table `world_lore_text`, primary key (`entity_ref`, `text_kind`, `variant`, `locale`, `chronicle_hash`):

| Column | Type | Example |
| --- | --- | --- |
| `entity_ref` | `varchar(32)` | `figure#64`, `war#409` |
| `text_kind` | `varchar(16)` | `epitaph`, `legend`, `hymn`, `book` |
| `variant` | `varchar(32)` | The side a book is told by; else empty |
| `locale` | `varchar(8)` | `en`, `de` |
| `chronicle_hash` | `char(64)` | |
| `body` | `text` | |
| `model` | `varchar(64)` | `gemma-4-E4B-it Q4_K_M` |
| `attempts` | `int` | |
| `created_at` | `timestamp` | |

**The table is the job queue.** The job's work is the plan (every text the world needs) minus the rows that
exist. So it can stop at any time, at a restart or a deploy, and go on where it was. English rows come first; a
translation is a second row with the same key and another locale.

**Wiping.** One `WorldScopedData` bean clears both tables, like `TreasureWipe` and `WorldBossWipe` do for theirs.
The zone runs Hibernate with `ddl-auto: update`, so the tables need no Flyway file.

## Delivery

One language is 43 KB of text for a genesis world (13 KB deflated) and about 100 KB for a large one. Size does
not decide; three other things do.

**Chosen: on request.** `RequestLoreTextCMSG(entity_ref, text_kind, variant)` → `LoreTextSMSG(entity_ref, text_kind,
variant, locale, body)`, in the pattern of `RequestCompendiumCMSG`. The client caches by key, locale and chronicle
hash.

- **Spoilers.** A legend says where a relic lies; an epitaph names the barrow. A bundle hands every quest hook to
  anyone who reads the client cache. On request, the server answers only for texts the player has reached.
- **The world is playable before the job ends.** On request, the server answers "not written yet" and the client
  shows a short fallback line. A bundle would need versions.
- **No new path.** The api-server has no access to the zone's database, so a bundle served there needs a bus
  request or a file export first.

## Where players read them

- **Books** are readable items. An item carries only the reference; the text comes on request when the player opens
  it. A war's two books drop in the two peoples' libraries, temples and ruins, so a player finds the two sides in two
  places.
- **Epitaphs** are on grave stones at the barrows, as props with the same reference.
- **Legends** show when the player examines a relic, or in the temple that keeps it.
- **Hymns** are read at the god's temples and shrines.

# Recommendation

**Go**, with these choices:

- **Runtime:** llama.cpp's server as a sidecar container, called over HTTP. Pin the image version.
- **Model:** Gemma 4 E4B-it at `Q4_K_M`, run with `--no-repack --cache-ram 0`. Keep Qwen3-8B as the fallback if
  Gemma's sameness shows in play; it is as reliable, writes with more variety, and is twice as slow.
- **Translation:** the same model, with a per-locale name glossary rendered by `Names.kt`. No second model.
- **The job:** runs once after world generation as a background job, the table as its queue, the validator in the
  loop. The world is playable before it ends; a missing text has a fallback line.

Before or while building:

1. **Vary the prompts.** Rotate a few framings per text kind, picked by the entity's id. The spike tested this on
   legends (`PROSE_VARY=1`): the repeated opening disappeared.
2. **Fix the chronicle gaps:** old town names in fact sheets, a sex (or neutral wording) for figures, digits for
   years.
3. **Render names per locale** in `Names.kt`, and pass them to the translation prompt as a glossary.
4. **Check for repeated phrases** across a world's texts, and feed them back like a validator finding.
5. **Measure the target server CPU** once it is known: the numbers here are a 15 W laptop chip.
6. **Later, distillation.** Fine-tuning a 3-4B model on a few thousand validated (fact sheet, text) pairs would drop
   the instructions from the prompt and could halve the time per text again. Not needed for a go.
