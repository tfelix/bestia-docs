---
title: World History
weight: 1050
description: The thousand years before play begins - peoples, wars, families, gods, world bosses and relics - and what each of them leaves in the world for players to find.
---

{{< alert context="warning" text="**Partly built.** The history simulation, wars, ruins, tombs, relics and what townsfolk remember run today. Every section marked **Planned** describes the history rework and is design. The server side is on [History Generation](/docs/server/history-generation/)." />}}

Every world gets a thousand years of history before the first player arrives. The world generator plays it out on the
land it just made: peoples settle, grow, fight, pray, and fall. When play begins, the history is over, but everything
it did is still there. A ruin is a town that was razed. A tomb holds someone who lived. A buried sword was lost in a
real battle.

Nothing in the history is placed for the player's sake. It is the reason things are where they are, and the players
find it by walking, digging and asking.

# How a History Comes About

The land comes first. The generator places settlement sites where people would want to live: good soil, fresh water,
safe ground. History does not move these sites. It decides **when** each one was founded, **whether** it still stands,
and **who** holds it today.

The simulation runs in five-year steps. In each step peoples grow and found new towns, trade turns into rivalry and
rivalry into war, disasters strike, notable people rise and die, and things get built and lost. Every step that
matters is written into the **chronicle**, the world's event log. Each event knows what caused it, so the chronicle
is a chain of causes rather than a list of dates.

Each new world in the [cycle of incarnations](/docs/mechanics/world/doomsday/) gets a new history. Names, peoples and
gods differ from world to world.

# Peoples

A **people** (a civilisation in the chronicle) is a group of towns under one rule, with one culture. The culture
decides how warlike, inventive and far-reaching it is.

The largest settlements found the first peoples, and those peoples spread by founding daughter towns nearby. A
world with one people would have no wars, so when the cities give only one, a second people settles the site
farthest from the first capital.

A people rules from its capital. When the capital is conquered or lost, the people rules from its largest town
instead.

## How New Peoples Arise

{{< alert context="warning" text="**Partly built.** Arrival over the sea, migration overland, secession, refugees and exiled houses run today. Cult realms come with cults." />}}

Every world starts with **at least two peoples**. Over the centuries, more can arise. Each path below is possible in
any world, and none has to happen. A large world sees more of them than a small one.

| Path                    | What happened                                                                          |
| ----------------------- | -------------------------------------------------------------------------------------- |
| Arrival over the sea    | Strangers land on an empty coast and settle there                                      |
| Migration overland      | A people comes from beyond the mountains or the waste and settles a remote valley      |
| Secession               | Far-off towns, cut off or wronged by their capital, break away and rule themselves     |
| Refugees                | Survivors of a razed, buried or blighted town found a new people elsewhere             |
| Exiled house            | A noble house that lost a succession war leaves and founds its own realm               |
| Cult realm              | A persecuted cult rises up and takes the towns that follow it                          |

A people that broke away remembers why. Its first enemy is usually the one it left.

# Wars and Battlefields

Neighbouring peoples grow hostile over time. Peoples of the same culture compete harder, and warlike cultures
quicker. When hostility boils over, they go to war. Wars bring battles, sieges, sacked towns and razed cities, and
they end in conquest or peace.

## Battlefields Along a Frontier

{{< alert context="info" text="**Built.**" />}}

Two peoples at war meet along their **frontier**: the line between their nearest towns. A long frontier sees battles
in many places, and when towns change hands the frontier moves. Over the centuries a border leaves a trail of
battlefields behind it. A battle near an older battlefield adds to it, and armies often return to old ground on
their way, so some fields were fought over again and again.

Each battlefield remembers how many battles were fought there and how many fell.

## What a Battlefield Holds

{{< alert context="info" text="**Built.** The pieces on the ground are placeholder boxes until they have models." />}}

Some of what was left lies on the surface: bones, rusted blades, broken shields and, on a young field, rags of old
banners on broken poles. The more fell, the more lies there. Players pick up bones as **bone shards** and blades and
shields as **rusted scrap**. Where a hero slew a [world boss](#world-bosses), its giant skeleton lies at the heart of
the field.

More lies **0.5 m to 1 m under the soil**, in one cache or more: about one for every 125 dead, up to 12. To find them,
a player first has to find the battlefield and then dig with the [treasure digging](/docs/mechanics/world/treasure-caches/)
tools.

The age of the battlefield decides what is left:

| Age                 | On the surface                                       | Under the soil                                                              |
| ------------------- | ---------------------------------------------------- | --------------------------------------------------------------------------- |
| Under 450 years     | Bones, rusted blades, broken shields, banner rags    | Many caches: rusted scrap, bone and plain gear; one in five also hides a valuable |
| 450 years and older | Fewer bones and arms the older it is; no banners     | Fewer caches, with valuables only: scavengers took the rest                 |

A battlefield does not refill. What is picked up or dug up is gone until the next world.

## The Restless Dead

{{< alert context="info" text="**Built.** The four battlefield species have placeholder looks." />}}

At night, from 22:00 to 4:00, the dead rise on every battlefield. When the day comes they fade out. Their level
follows the region, so a battlefield in quiet farmland holds weak spirits, and one in the deep wild holds the
[Fallen Knight](/docs/mechanics/bestias/bestia-list/) and worse. A field where more fell sends a bigger pack: two,
and one more for every 500 dead, up to six.

Four species rise on battlefields and nowhere else:

| Bestia             | Lv | Kind             | What it is                                                     |
| ------------------ | -- | ---------------- | -------------------------------------------------------------- |
| Restless Levy      | 16 | Undead           | A farmhand called up for a lost war, still swinging its tool   |
| Grave Wisp         | 34 | Formless, ghost  | A cold flame over a grave nobody dug                           |
| Oathbound Revenant | 56 | Undead, elite    | A captain still holding the line it swore to hold              |
| War Wraith         | 85 | Undead, ghost, elite | The rage of a whole battle in one shape of smoke and banners |

The undead, demons and ghosts of the wild join them, whichever fits the level best. Bosses keep to their own dens.

# Notable People and Their Families

Rulers, generals, prophets, smiths, explorers and scholars rise in every people. The chronicle remembers what they
did, how they died, and where they are buried. A ruler or prophet gets a tomb. Others rest in their town's cemetery,
where a player can read their name on the headstone.

{{< alert context="info" text="**Built.**" />}}

Notable people belong to **families**. A people's first ruler founds its **ruling house**, and the throne passes from
parent to child. A house with no heir ends in a **succession crisis**: a new house takes the throne, and the
quarrel can split the people, or send the old house into exile, where it founds a people of its own.

Some figures are the children of earlier ones, so a craft or a command can run in a family. Rulers of two peoples at
peace may marry, and the marriage cools what was building between them. Generals who faced each other in battle can
become sworn enemies. When a general falls, their child, spouse or parent may swear vengeance on the people who
won, and keep the oath when their own people win a battle against them. A general can open the gates of a besieged
town to the enemy. An heirloom passes to the holder's child first, then their spouse, then their house.

Some townsfolk today descend from these families, and say so. Half the houses that ruled from near a town have one
family there that claims them, as a story handed down:

> My father used to tell it by the fire. We come down from House Ashford. Talric founded it, long before anybody's
> grandparents.

Nobody can prove such a claim. That is where heirloom quests will come from (see
[Quests from History](#quests-from-history)).

# Gods and Cults

{{< alert context="info" text="**Built** in the history: gods, patron gods, cults and sanctuaries. Customs, festivals and town temples that show their god are planned." />}}

Every world has its own gods. Their domains are fixed (war, the sea, the harvest, death, and others) but their names
are new in every world, and each people calls them by a name of its own. A small world knows four or five gods, a
large one about ten. The [Pantheon](/docs/mechanics/world/pantheon/) page lists every domain.

Each people and each town has a **patron god**, and its temple is dedicated to that god.

**Cults** are smaller and stranger than the temples. A cult may worship a god, a kind of bestia, or the star that
fell. A prophet founds it and raises a **sanctuary** outside their town. The cult wins over nearby towns. The people
that holds most of its towns may turn on it: the cult is then wiped out, or it rises up and rules its towns as a
realm of its own, or it endures. On a world where the [Orders](/docs/mechanics/society/factions/) are known, a cult
may join the Order its teaching leans toward.

Townsfolk, priests above all, remember the gods and the cults of their region.

A cult leaves traces that outlive it: an outdoor **sanctuary** with an idol, a bestia nobody in a town will hunt, a
festival whose meaning is forgotten, a few households that still keep the old faith in secret.

# World Bosses

{{< alert context="info" text="**Built.** The stories run in the history, a living boss waits in its lair, and a seal can be broken. The two new species have placeholder looks." />}}

A few monsters are older and greater than any den. There are five **world bosses**. They never spawn in a normal den.
Each world gives its bosses names of their own: "Ysolde, the Bone Wyrm".

| Id  | World boss      | Level | Lair                         | What it is                                               |
| --- | --------------- | ----- | ---------------------------- | -------------------------------------------------------- |
| 101 | Ossuary Wyrm    | 108   | Deep in a cave               | A dragon of fused bones from a robbed tomb or a field of the dead |
| 102 | Leviathan       | 112   | Far out at sea               | A sea serpent woken by a Wound or a cult                 |
| 103 | Behemoth        | 120   | The remotest dry land        | The oldest beast of the land, woken by fire or a Wound   |
| 104 | Ember Sovereign | 110   | Deep in a cave               | A fire elemental of magma and slag that rules the deep vents |
| 105 | Mire Mother     | 104   | The remotest dry land        | A rotting bog brood-mother that buds lesser creatures    |

Each world's history includes some of them: at least two on a small world, up to all five on a large one. Each one
has a story: what woke it (the blight near a Wound, a tomb that was robbed, an eruption, a cult that called it, the
dead of a battlefield), whom it terrorised, and who stood against it. The story ends in one of four ways:

| Fate         | What it means today                                                                                     |
| ------------ | ------------------------------------------------------------------------------------------------------- |
| Slain        | A legendary hero killed it and kept a trophy. The field where it fell is on the map, and the hero takes the trophy to their tomb |
| Sealed       | A prophet or scholar bound it into a crystal on a stone plinth. Whoever breaks the crystal wakes it, for everyone |
| Withdrawn    | It went into hiding: deep in a cave, in the most remote place of the land, or far out at sea. A lair is never on the map |
| Vanished     | Nobody knows where it went. It is alive in its lair, and only legends point the way                     |

While it raged, a world boss fell on the towns around it, and each one remembers. At least one world boss is alive
in every world.

**In its lair** a living boss waits alone. It wakes when a player comes near, like any den. When **players** kill
it, it stays dead for the rest of the world. If it dies any other way, it comes back.

**A seal** is a ring of masonry with a plinth in its middle, and the crystal stands on the plinth. The crystal is
hard to break. When it breaks, the boss rises where the crystal stood. This happens only once per world: the crystal
never comes back, and the boss is not bound again.

# Relics

{{< alert context="info" text="**Built.**" />}}

Smiths and rulers forge **artifacts**: blades, crowns, rings, reliquaries, tomes and banners, each with a name and a
history. An artifact passes from hand to hand. When its owner dies, half the time it goes into their grave. Otherwise
it passes to their kin, or the temple of their capital takes it in, or it is lost on a battlefield or in a ruin.

Today an artifact is in one of three places:

| Where                 | What it means                                                                                  |
| --------------------- | ---------------------------------------------------------------------------------------------- |
| In the ground         | In a tomb, a ruin, a battlefield, a cave hoard or a monument. Players can dig it up as a relic  |
| Kept in a town        | The temple or treasury of a standing town keeps it. Townsfolk know where it is                 |
| Carried               | A living figure of the history carries it                                                       |

A town keeps an artifact until something happens to the town. Conquerors may carry it off to their own capital, and
the town it came from still wants it back. A sack may hide it in a cave hoard. When the town is lost, the artifact
stays in its ruin. A capital that raises a monument may seal its most precious artifact into the stone.

**Guards.** Undead guard every tomb and monument with an artifact in it. They are as strong as the wild around them:
a boss alone, anything weaker as a band of three. Where no undead fits the level of the land, the site has no
guard yet.

**Relics.** Players find buried artifacts as [relics](/docs/mechanics/world/treasure-caches/#relics). A relic is
of [item level](/docs/mechanics/items-crafting/items/#item-level) **80 to 110**. The longer the artifact's history,
the stronger the relic.

# Disasters and the Mana

Volcanoes erupt and bury towns in ash. Floods, famines and plagues come and go. Early in every history a star falls,
and the mana pools where its shards came down: these places are the **Wounds**. The blight spreads from them. Towns
raise wards against it or are abandoned to it. Seers walk out to the Wounds and are not seen again.

# What People Remember

Townsfolk know the history of their own town and of the places around it. Famous events are known everywhere. Older
events are known by fewer people, often only by the oldest household in town. See
[Dialog](/docs/server/dialog/) for how a person's knowledge is chosen.

## Hearsay and Legends

{{< alert context="info" text="**Built.**" />}}

People are not equally sure of what they know. What somebody alive saw, they tell plainly. What happened a few
generations back, or what only one family remembers, they tell as something they were told:

> My grandfather told me this, and he had it from his. The walls of Erzvein went up a few generations back.

What happened longer ago than that, they tell as an old saying:

> An old saying goes like this. The Ashen Wyrm is not dead. It crawled away long before anybody's grandparents and
> lies somewhere east of Erzvein.

Each person keeps one way of saying it, so it reads as their habit of speech.

**Legends** point at hidden things: cave hoards, the lair of a living world boss, a seal, the field a world boss
was slain on, and a relic lost on a battlefield. A legend names the nearest standing town and a direction from it.
A town tells the legends of the hidden places near it, at most four, nearest first. A world boss is talked about
twice as far away as a hoard. In each town, a few of the oldest households keep a legend.

Each town tells each legend its own way, and not every telling is true:

| Kind of telling | Share  | What it says                                                  |
| --------------- | ------ | ------------------------------------------------------------- |
| True            | ~60%   | The right direction                                           |
| Distorted       | ~30%   | One point of the compass off, and the wrong age               |
| Myth            | ~10%   | A direction where nothing is                                  |

A player who asks in several towns can tell which telling to trust.

# Quests from History

{{< alert context="warning" text="**Partly built.** The history records its open threads today. There is no quest system yet (see [Questing](/docs/mechanics/world/questing/)), so the quests below are design." />}}

The chronicle leaves threads open, and it records each one with the event it has stayed open since:

| Thread                | What is open                                                                  |
| --------------------- | ----------------------------------------------------------------------------- |
| A lost artifact       | Nobody holds it, nobody keeps it, and nobody laid it to rest                  |
| An artifact away      | The town that first kept it still stands and wants it back                    |
| A vengeance not taken | Somebody swore to avenge their kin, and never did                             |
| A sealed boss         | A world boss lies bound, and the seal still holds                             |
| A boss at large       | A world boss withdrew to its lair or vanished                                 |
| A house without heir  | A ruling house ended, and nobody of its blood is alive                        |
| A persecuted cult     | Its people turned on it, and it is still kept in secret                       |
| A forgotten god       | No standing town, living people or cult worships it; its last shrine is a ruin |

These threads are where quests come from. A world of the genesis size leaves about a dozen lost artifacts, eight
houses without heirs and one or two living world bosses. The other threads are rarer, and many worlds have none of
some kinds. There are three kinds of quest:

| Kind     | Example                                                                                 | How many                | Who                     |
| -------- | --------------------------------------------------------------------------------------- | ----------------------- | ----------------------- |
| Personal | Recover a family heirloom from an old battlefield; lay an ancestor's bones to rest     | Many per town, rotating | Everyone, each their own |
| Shared   | Dig up a cave hoard; find a relic                                                       | Dozens per world        | The first to get there  |
| World    | Be the first to return a unique artifact to its temple; break a seal; slay a world boss | A few per world         | Everyone, once          |

Personal quests must be plentiful, so every player can take part in the world's history, not only a lucky few. An
heirloom item is created for the player who takes the quest, so many players can do the same quest.

World quests happen once. A unique artifact can be returned only once, even when it is of little use to the player
who carries it: the temple's reward and the line in the chronicle are the point.

Other quest ideas:

- **Offerings and deeds for the gods.** Each domain has its own (see
  [Pantheon](/docs/mechanics/world/pantheon/#quests-for-the-gods)).
- **Assassinations.** A historic figure who is still alive today can be the target of a rare, hard world quest.

# Books and Prose

{{< alert context="warning" text="**Idea, not designed.**" />}}

The chronicle is a set of facts. Later, these facts may be written out as prose: chronicles written by in-world
authors (the same war told by both sides), epitaphs, legends of relics, hymns to the gods. The texts would be
written once, after the world is generated, and translated into every game language. A tech spike will show whether
the server can do this. No prose is invented that the chronicle does not support.
