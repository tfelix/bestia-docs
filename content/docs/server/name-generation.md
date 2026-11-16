---
weight: 615
title: Name Generation
description: How the world generator names lands, regions, towns and their former names, people, houses, gods, cults, world bosses, artifacts, sites and wounds - the seeds and salts, the culture styles, how a name stays the same, how it is versioned, the sex of a given name, and the German forms.
---

{{< alert context="info" text="**Built.** Every reader shows English names today. The German forms exist in `Names`, but nothing in the zone or the client asks for them yet." />}}

Every generated name in a world comes from one file: `worldgen/src/main/kotlin/net/bestia/worldgen/history/Names.kt`.
The German words live next to it in `GermanNames.kt`. This page says what each kind of name is built from and why it
stays the same. The history that gives most names a reason is on [History Generation](/docs/server/history-generation/).

# A Name Is a Seed

A name is not stored as text. It is a **name seed**: a 48-bit number, made from the world seed and whatever identifies
the thing.

```kotlin
val seed = Names.seedOf(worldSeed, PLACE_NAME_SALT, town.index)   // 48 bits
val name = Names.place(seed, cultureIndex)                        // "Elmford"
```

- A station channel on a feature holds a `Double`. A `Double` holds a 48-bit integer exactly, so a `RUIN` marker can
  carry the name of the town it was. `Names.SEED_MASK` keeps every seed within 48 bits.
- A town, its ruin, its tomb and every event about it carry the same eight bytes. Any tool can print the name with no
  lookup table.
- The seed comes from the world seed and the thing's own key (an index, a year), never from a shared counter. A re-run
  gives the same names.

**Picks.** Inside `Names`, a name is built from word pools. Each word is chosen by a keyed hash of the seed and a
**salt**: `pick(pool, seed, salt)` takes `hash(seed, salt) mod pool.size`. Each part of a name has its own salt, so
the stem and the tail of one name do not move together. A new kind of name gets a new salt and reuses the pools.

Names are only shown, never compared or used as keys. Two things with one name is a cosmetic coincidence, not a bug.

# Culture Styles

Each culture has one `Style`: a set of word pools. The styles are indexed by the culture's position in `Culture.ALL`.

| Culture   | Sounds like                      | Place stems (some)      | Place tails (some)     | People tails (some)         | Given names (some)                |
| --------- | -------------------------------- | ----------------------- | ---------------------- | --------------------------- | --------------------------------- |
| Agrarian  | English river-valley farms       | ash, elm, wheat, hart   | ford, ton, field, bury | ings, folk, shire, vale     | Alden, Hilda, Leofric, Rowena     |
| Seafaring | Norse and Hanseatic coast        | salt, storm, gull, orm  | holm, havn, vik, ness  | mennir, folk, kin, reach    | Asgeir, Brynja, Ingrid, Olav      |
| Pastoral  | Steppe                           | kara, altan, sary, ulan | gol, tau, kum, obo     | khai, ulus, horde, riders   | Altani, Batu, Gerel, Temujin      |
| Highland  | Germanic and Cornish mining land | iron, grim, stein, pen  | fell, delve, burg, tor | volk, guild, delvers, clans | Berta, Dietrich, Kunimund, Ulrica |

Each style also has five **epithets** ("green", "storm", "sky", "iron" ...). They start an artifact's name and widen a
region's name.

A place is named in the culture of the people who settled near it. That is why a coast reads differently from a
highland.

# What Gets Named, and How

| Thing                  | Function                 | Built from                                                                   | Example                              |
| ---------------------- | ------------------------ | ---------------------------------------------------------------------------- | ------------------------------------ |
| Settlement             | `place`                  | place stem + place tail; a doubled letter at the joint is dropped            | Elmford, Karatau                     |
| Town quarter           | `place`                  | the same, off a seed derived from the town's seed (`civ/Districts.kt`)       | Ashbury                              |
| Volcano                | `place`                  | the same, in the culture of the nearest town; events say "the mountain X"    | the mountain Grimtor                 |
| Region                 | `region`                 | a stem or a whole place name, the region's form word, sometimes an epithet   | Elm Downs, Elder Elmford Vale        |
| People (civilisation)  | `civ`                    | place stem + people tail                                                     | the Elmings, the Karariders          |
| Ruling house           | `house`, `houseStem`     | "House" + place stem + place tail                                            | House Ashford                        |
| Notable figure         | `person`                 | a given name, and in 55% of cases a byname for the figure's role             | Kunimund the Reluctant               |
| Townsperson            | `townsperson`            | a given name only                                                            | Hedda                                |
| God                    | `deity`                  | a given name in the culture's style + a title of the god's domain            | Hilda of the Red Spear               |
| Cult                   | `cult`                   | a band + the god, the Fallen Star or a sacred beast                          | the Children of Hilda the Fair       |
| World boss             | `monster`                | a name of its own + the species' title (`WorldBoss.title`)                   | Gharzul, the Bone Wyrm               |
| Artifact               | `artifact`               | "the Noun of Place" (half the time, when it has a forge town) or epithet + noun | the Sabre of Elmford, Stormfang   |
| Site                   | `site`, `siteForm`       | the site kind's form word + the town (or people, or boss) it belongs to      | the barrow of Elmford, Elmford Battlefield |
| Wound                  | `site` with form "wound" | an epithet and a noun of its own, in no culture                              | the Starless Crater                  |

Some details:

- **Regions** (`place/RegionNaming.kt`) prefer history. A region with a Wound is named after the Wound. One with a ruin
  or a battlefield is named after that town ("the downs of Ashford"), one with a capital after the people. Otherwise
  it gets `Names.region`. A region where nobody lives draws a culture from its own seed. Two regions that touch never
  share a name: the naming re-rolls the seed, then tries an epithet, up to 48 times.
- **Sites** are culture-independent: the town's name already carries its culture. `Names.siteForm` gives the form word
  of each `SiteKind`: ruin, ash, battlefield, barrow, monument, mine, abbey, fort, light, hoard, wound, sanctuary, seal,
  lair. A shrine takes its Order's word: cairn, ward or circle.
- **A god** has one seed and a name in every culture. The given name changes with the culture and the title stays, so
  two peoples can tell it is the same god. A cult names its god in the culture of the town that founded it.
- **On the map**, the zone labels a site marker with `Names.place` of the site's own seed
  (`cartography/render/PlaceNames.kt`), not with `Names.site`. So the map calls a battlefield by a place name, while
  the event lines call it "Bortedag Battlefield".
- **A world boss** and **a Wound** belong to no people, so their words come from pools outside the culture styles.
- **Townsfolk** (`zone-server/.../townsfolk/ecs/TownsfolkNaming.kt`) get a given name from the world seed and their
  identity, in the culture of the people who hold their town. A plain headstone uses `person` the same way.
- **Bestias, mobs and items** are not generated. Their names come from the YAML data and the client's localisation
  files.

# When Two Things Share a Name

Names are not unique, and that is intended. A pool has fourteen given names per culture, so a world of a few hundred
figures has several of each: the genesis world (seed 11753242) has four figures called Chuluun. A real village
sounds the same way.

A site is named after its town and its kind, not its own seed. So two battlefields of one town share a name: the
genesis world has two sites called "Bortedag Battlefield", from the battles of 901 and 911. A battle near an older
field adds to that field, but a battle farther away starts a new one.

A reader tells them apart by what the chronicle records with the name, never by the name:

- Every event names its subjects as typed actors with an index (`Actor(SITE, 12)`), so the two battlefields are two
  sites with their own position, year, battles and fallen.
- A figure has a byname in about half the cases, and always a civ, a role, birth and death years, and maybe a house.

Where one name for two things made a chronicle unreadable, a placement rule fixed it, not a word pool: a town hosts
at most one shrine of an Order. A Wound draws an epithet from its own seed, because Wounds have no town to tell them
apart.

# Settlements and Their Former Names

A conquest may rename a town. The new seed comes from the town's index and the year of the conquest. The old name is
kept, because the conquered still use it.

`SettlementRecord` holds what is needed to render each name exactly as the event lines did:

| Field         | What it holds                                                                    |
| ------------- | -------------------------------------------------------------------------------- |
| `nameSeed`    | the current name                                                                 |
| `nameCulture` | the culture `Names.place` renders it in: the site's own, not the owner's         |
| `formerNames` | every earlier name, oldest first: `seed`, `cultureIndex`, and the years `since` and `until` |

A conquest line names both: "Karaobo passes to the Elmings, who rename it from Karatau". Every name of a town is
rendered in the culture of its site, also after a people of another culture took it. A reader that renders a town in
its owner's culture gets a name that no event line used.

# The Sex of a Given Name

Every given name in a pool is tagged female or male (`Names.GivenName`). A figure's sex follows from the given name it
already has. So the tags added no random roll and changed no name.

- `FigureRecord.sex` holds it, from `Names.personSex`.
- A god's given name comes from the same pools, but it differs per culture. So a god has no single sex:
  `Names.deitySex` answers per culture, and `DeityRecord` has no field for it.
- Many Mongolian names are given to both sexes. Each one is tagged as it is most often given.
- `NamesTest` fails if a name is tagged both ways, or a culture has names of only one sex. An untagged name does not
  compile.

The event lines stay neutral ("their parent").

# Names in Other Languages

`Names` renders every name in a `NameLocale`: `EN` (the default) or `DE`. The locale codes match the columns of the
client's localisation files (`bestia-client/src/Localization/*.csv`, which has only `en` today).

- **Same seeds, same picks.** `Names` always picks the English word. A German name then looks up the German form of
  the picked word in `GermanNames`. So the English and the German name are the same name.
- **Proper names stay.** Given names, place stems and tails, and monster names: "Elmford" is Elmford in every
  language.
- **Words are translated.** Bynames, "House", god titles, cult bands, sacred beasts, world-boss titles, people tails,
  epithets, artifact nouns, site and region forms, and the words of a Wound.
- **German grammar.** A byname follows the sex of its bearer: "Kunimund der Widerwillige", "Berta die Widerwillige".
  An agent noun takes its feminine form: "die Gesetzgeberin". A god's title that names a father or a mother follows the
  god's sex: "Weizenvater", "Weizenmutter".
- **Nominative only.** A name is rendered as it stands alone. A sentence that needs "Gerels des Unbezwungenen" must be
  worded around the name. The one genitive is the god inside a cult's name, because the name itself is built that
  way: "die Kinder der Hilda der Schönen".
- **Compounds.** German joins what English writes apart. A region is one word ("Elmtal", "Alt-Elmhöhen"). An artifact
  is epithet + noun ("Sturmzahn"), and "the Sabre of Elmford" becomes "der Säbel von Elmford".
- **Sites take "von".** "Elmford Battlefield" is "das Schlachtfeld von Elmford", not "Elmforder Schlachtfeld". The
  adjective form of an invented name has no safe rule (Elmmere, Karatau, Sube), and "von" keeps every site in one
  pattern. Because the owner follows "von", it must read in the dative: a town or a people does, a world boss with its
  title does not.

| English                        | German                           |
| ------------------------------ | -------------------------------- |
| Kunimund the Reluctant         | Kunimund der Widerwillige        |
| Hedda the Lawgiver             | Hedda die Gesetzgeberin          |
| Hilda the Fair                 | Hilda die Schöne                 |
| the Children of Hilda the Fair | die Kinder der Hilda der Schönen |
| Gharzul, the Bone Wyrm         | Gharzul, der Knochenlindwurm     |
| the Sabre of Elmford           | der Säbel von Elmford            |
| the barrow of Elmford          | das Hügelgrab von Elmford        |
| Elmford Battlefield            | das Schlachtfeld von Elmford     |
| Elm Vale                       | Elmtal                           |
| the Starless Crater            | der Sternenlose Krater           |
| House Ashford                  | Haus Ashford                     |
| the Karariders                 | die Karareiter                   |

The zone sends a name as finished text (`DialogArg.Name`), and it does not know the player's language. So a German
client needs the zone to learn the player's locale before it can ask `Names` for German.

`GermanNamesTest` fails if an English word has no German form, or a German entry has no English word.

# Determinism and Versioning

A name is a pure function of its seed, its culture and the pools. Re-running a world gives the same names.

**Changing a pool renames the world.** `pick` selects by position, and a style by the culture's position. Adding,
removing or moving one word renames everything that landed on it, in every existing world. Nothing shows this from
outside: a renamed world looks like a working world. So the pools reach a version number:

- `Names.catalogueDigest()` hashes every English pool, by key and in list order, the sex tags, and how each site
  kind is phrased ("X Battlefield", "the ruins of X"), since that phrase lives in code and not in a pool.
- `HistoryStage.paramsVersion` folds the digest in. A changed pool moves `pipelineVersion`, and a stored world is
  regenerated or refused at boot; see [World Generation](/docs/server/world-generation/).
- `ParamsVersionTest` and `PlaceRegionsTest` pin the digest. When the pin fails, re-pin it and say in the commit what
  moved.
- `NamesTest` pins a hash of every English name over a sweep of seeds and cultures. A change in how names are built
  that renames anything fails it, even when no pool changed.

The salts are not in the digest. A new kind of name with a new salt over the old pools moves no version. That is how
region names were added.

**The German tables are not in the digest.** A translation changes no world: the seeds and the picks stay the same. A
better German word only changes what a German reader sees.
