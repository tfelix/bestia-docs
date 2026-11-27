---
weight: 300
title: "About"
icon: "info"
description: "Introduction to Bestia, its open-source philosophy, and its history from a 2005 PHP browser game to a Kotlin and Godot MMORPG."
---

Welcome to the official documentation of **Bestia**!

Bestia is a persistent online world that grew from a browser-based prototype into a fully-fledged MMORPG. Rather than chasing a feature checklist, it aims for a world that feels alive: real-time mechanics, encounters that reward planning over reflexes, and an environment shaped by the players who inhabit it.

This documentation serves as a guide for developers, contributors, and enthusiasts who wish to understand, modify, or expand Bestia. Whether you're interested in game design, client development, or server-side mechanics, you'll find everything you need to get started here.

The free and open-source MMORPG runs on a Kotlin and Spring backend. Bestia is released under the **GPL v3.0 license**, ensuring that anyone can contribute, modify, and expand upon the game freely.

# The History of Bestia

Bestia is older than most of the technology it runs on today. The first game files date from August 2005, and the code has been rewritten from scratch several times since. Every version chased the same idea: a living world full of strange creatures, the _Bestias_, that players catch, raise and fight with.

This chapter is reconstructed from the old source archives, database dumps, version control history and the project's earlier websites. The early versions were written in German, so names from that time are given in their original German with a translation.

## At a Glance

| Years     | Version                                   | Technology                                                | Highlights                                                                                       |
| --------- | ----------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| 2005      | Pre-alpha                                 | PHP, MySQL, plain HTML                                    | Accounts, items, turn-based battles with elements, first map and mob editors                     |
| 2006–2007 | Alpha 1 (published as "Alpha 0")          | PHP, MySQL                                                | The world of Aventerra, the village of Kalarian, travel times, quests, shop, chat, an alpha test |
| 2007–2010 | Alpha 2 and Alpha 3 ("Alpha 1.0")         | PHP 5, AJAX and JSON, Prototype, Scriptaculous            | Rewrite as a web 2.0 interface, drag and drop, guilds, questlog, new admin tools                 |
| 2010–2011 | Alpha 4                                   | PHP 5, Mercurial                                          | Account skills, resources, battle animations, a content creation system for player-made content  |
| 2013      | Bestia Behemoth prototype                 | Java, Spring Data, Hibernate, RMI, Play 2.1               | The first standalone server, split into login, inter and zone servers                            |
| 2014–2021 | Bestia Behemoth                           | Java, then Kotlin; Spring Boot, Akka, Hazelcast, Phaser   | A persistent server with an entity component system, a Phaser browser client, world generation  |
| 2025–     | The rewrite                               | Kotlin, Spring Boot, own ECS, protobuf, Godot             | A Godot client, a voxel world, a generated world history, a companion app                        |

## 2005: A Game for the School Website

Development started in 2005 with a browser game in the spirit of [OGame](https://ogame.de/), meant to bring some life to a high school's webpage. According to the old project website, Bestia also grew out of a small competition with a befriended developer. He wrote a C++ engine in the style of old role-playing games like _Might & Magic_, while Bestia, for lack of C++ skills at the time, became a PHP game. The oldest game file, the account creation page, is dated 22 August 2005.

The first design note, the _Spielidee_ (game idea), reads like an idle game. Players obtain a Bestia and send it to train in certain regions or dungeons. When they log in again, the battles it had to survive are waiting for them, at most ten in a row, and then experience and items are handed out. In town, up to three bestias can be registered at an arena to challenge other players, with equipment allowed but no potions. Some ideas came straight from [Pokémon](https://en.wikipedia.org/wiki/Pok%C3%A9mon): elemental types like water, ice, grass, fire, dark, psychic, electric and dragon, and wild bestias that are caught with a trap, the _Bestia Falle_, whose chance improves the lower the target's HP is.

The encounter rule of that draft set the tone for the PHP years: a bestia that travels the world map rolls an encounter for each monster living there, and the chance grows with the time spent travelling.

By 12 November 2005 the patch notes on the start page listed a pre-alpha checklist. Account creation, the item system, the battle interface with ten attacks, attack learning, the elemental system and a map editor were done, the mob editor was at 80 %, the world map at 30 %, and the enemy AI was postponed.

## 2006–2007: Alpha 1 and the World of Aventerra

Through 2006 the game grew into its first playable version. Internally it was Alpha 1; the website later listed it as "Alpha 0", released in 2006. A database dump from 9 September 2006 already holds the world of **Aventerra**: a stretch of coast in the north with a lighthouse, the farming village of **Kalarian** with its fields, a belt of forest and a mountain wall to the south.

![The northern part of the Aventerra world map](images/history/2011-worldmap-north.png "The northern part of the Aventerra world map, rebuilt from the map tiles in the game's database. The lighthouse sits in the north-west, Kalarian's red houses and hay bales in the east. The whole map measured 52 × 44 tiles, but south of the mountains it stayed empty grassland: this corner is all of it that was ever built. It barely changed between 2006 and 2011.")

Moving worked in two modes. On the world map a bestia travelled from tile to tile, and every tile had a walk speed: a road took a fraction of the time of a swamp or a mountain slope. A trip of a few dozen tiles easily took hours of real time, during which wild bestias could attack, and these battles were fought turn by turn. Inside towns and buildings, on the _interior maps_, the player clicked a destination and an A\* path finder walked the bestia there.

![Alpha 1, travelling on the world map](images/history/alpha1-travel.jpg "Alpha 1 on the world map: the fire elemental needs 201 minutes for the chosen route. “Auf den Weg machen...” sets off.")

The plan for the alpha release (2006) records what made it in: a shop, status effects, a script system for maps and NPCs, GM commands and a GM login into player accounts, a chat, item images, up to six drops per monster, five times the experience, and a level cap of 60. The first quests were written for Kalarian. Dieter wanted twenty field rat tails from the fields, and the _Kitty Quest_ sent players to an island of cats to fight through three floors to its boss. The plans for a later beta already named an undead swamp, the _Totensümpfe_ (swamps of the dead), the undead city of _Astagoth_ as a dungeon, account skills with a trade tree, PvP and a level cap of 70.

![Alpha 1, the bestia overview](images/history/alpha1-bestias.jpg "Alpha 1, the bestia overview: a player owned up to ten bestias, each with its own stats, HP, mana and six equipment slots.")

![Twelve bestias from 2007](images/history/alpha-bestias.png "Twelve of the 18 bestias in the 2007 database, with their original German names. The blob and the field rat (Feldratte) still live in today's world.")

![The village of Kalarian](images/history/2007-kalarian-village.png "The village of Kalarian, rebuilt from the 2007 database: houses with shop signs, an inn and a pond, fenced in on all sides.")

![Alpha 1, the inventory](images/history/alpha1-inventory.jpg "The Alpha 1 inventory, split into usable items, equipment and everything else. Bestia traps, Yggdrasil seeds and an “Alpha Ticket” sit next to the loot.")

The game was online for an alpha test. In March 2008 the project news thanked all participants of the alpha test and promised that their accounts would be carried over to the next version.

## 2007–2010: Alpha 2 and Alpha 3, the AJAX Rewrite

In spring 2007 the game was rebuilt around a PHP 5 front controller that answered with JSON, and a JavaScript interface built on Prototype, Scriptaculous and a window library. Instead of reloading whole pages, the browser now opened windows and the chat polled for new messages. The database of September 2007 adds guilds and map scripts.

The old website described the goal: not a numbers-heavy browser game of tables and waiting times, but a dynamic world where players interact with each other with (almost) no delay, closer to an MMORPG than to a classic browser game. It ran on plain HTML, PHP and JavaScript, with no Flash and no Java, and every page was meant to be valid HTML 4.01 strict.

Alpha 3 was announced for summer 2008 with an "AJAX web 2.0 interface", battle animations and drag and drop for items, but it took until the end of 2009. In December 2009 a new homepage went online, the game got a questlog to tell better storylines, and all admin tools were rewritten from scratch to speed up content creation. This version was published in 2010 as "Alpha 1.0" (internally Alpha 3), and its changelog lists a chat, AJAX, a battle system with equipment, elements and status changes, an inventory, and the quest system with its questlog.

![Alpha 3, a quest in Kalarian](images/history/alpha3-kalarian-quest.jpg "Alpha 3 in Kalarian: the farmhand Edwen thanks the player for helping with the harvest, and the chat reports 400 experience and 200 gold.")

![Alpha 3, the selected bestia](images/history/alpha3-bestia.jpg "Alpha 3, the selected bestia with its stats, equipment, travel status and four attacks.")

![Alpha 3, the inventory](images/history/alpha3-inventory.jpg "The Alpha 3 inventory with tabs for usable items, equipment, quest items and the rest. Equipment is dragged onto the slots on the right.")

The intro for new players told the story of Aventerra. The world was created long ago by the god Tantalus, and not only lakes, forests and rivers came out of nothing, but also a host of strange creatures: the Bestias. Many of them are harmless and kept as pets or livestock. But legends tell of the mightiest bestias, as strong as titans, who laid waste to whole cities in the Great Bestia Wars until they vanished from Aventerra. Without a common enemy the kingdoms turned on each other. Yet now and then a person is born who understands bestias like no one else and can gather them under their command. The intro ends in Kalarian, one of the northernmost villages of Aventerra, where such a person is born, and jumps "about 20 years later" into the game.

## 2010–2011: Alpha 4 and Player-Made Content

On 22 March 2010 the code went into a Mercurial repository, which grew to 432 commits by August 2011. Alpha 4 brought:

- Bestias regenerate all HP and mana within 48 hours, and travel on the world map takes half as long.
- **Account skills** for the bestia master, learnable from 2010. The merchant tree covered forging, weapon repair, discounts, ore refining and treasure hunting; a mind tree with teleportation, summoning, rune craft, herbalism and alchemy was designed next to it.
- A new inventory and a shop that also takes other items as payment.
- **Guilds** with ranks. The design let members pay a tax of their experience, which levels up the guild and unlocks guild skills.
- Resources that can be harvested from the map (November 2010).
- Attack animations (2010), later with a small particle engine (February 2011).
- New maps: the coastal town of _Merrand_ and the _Misty Swamp_ with its camp.

A new wiki for players and developers went online in December 2010, and the repository tagged its releases as `vALPHA-1.0` and, in January 2011, `vALPHA-2.0`.

![The Misty Swamp](images/history/2011-misty-swamp.jpg "The Misty Swamp, rebuilt from the 2011 database: a maze of bog and grass.")

The last big idea of the PHP era was the **content creation system**: players should help to build the world. A logged-in player could upload items and tiles (25 × 25 pixels), whole tilesets and bestia illustrations, together with notes on how a bestia should play. The map editor got its own script editor. On 6 August 2011 a commit cheers "Map wird geliefert. MILESTONE. =)" (the map is delivered), and the last commit, a tileset overview, followed on 15 August 2011. That same month a batch of beta registration keys was generated. It is the last trace of the PHP game.

## 2013: Bestia Behemoth

By then it was clear that a PHP page, which only runs while it answers a request, could not simulate a living world. In March and April 2013 work started on a Java server, and the project took the name it still has: **Bestia Behemoth**. The Maven prototype already split the game into a core library (Hibernate and Spring Data JPA, Quartz, Groovy for item scripts), a login server, an inter server and a zone server that talked over RMI, plus a Play 2.1 front server. The zone server had an A\* path resolver and the first behaviour tree nodes for the AI.

By 2014 the old homepage had given way to a teaser: "Bestia Behemoth: online gaming redefined... soon".

## 2014–2021: Java, Akka and the Browser Client

The repository that holds Bestia today begins with an initial commit on 16 May 2014. Work picked up in February 2015 with an asynchronous message interface, a socket server and a multithreaded zone loader, and on 2 March 2015 the first message made the round trip between client and server. The client was still a browser game, now drawn with [Phaser](https://phaser.io/), on maps made in Tiled and checked by a custom Maven plugin. From May 2015 the zone ran the Ashley entity component system.

In 2016 the server moved to Spring Boot, the zone became an Akka cluster (July), and Hazelcast held the shared state (November); the first world generation experiments followed in December. 2017 was the busiest year of that era, with 766 commits. In 2018 the build moved to Gradle and the code to Kotlin, with the bulk of the conversion done by October 2018. 2019 and 2020 added a world generation module, an AI and a voxel module, a login server and the first protobuf messages.

In October 2020 the web interface was removed, which ended fifteen years of Bestia as a browser game. The new client was to be built with [Godot](https://godotengine.org/), a free and open-source engine that can be modified where the game's network connection needs it.

Then development stalled. Akka was powerful, but integrating it with Spring's dependency injection was hard, and much time went into workarounds instead of the game itself. A last experiment with goal-oriented action planning for the AI dates from April 2021. When Akka moved away from its open-source license in 2022, it was clear that the stack had to change once more.

## 2025–Today: The Rewrite

In September 2025 client and server were rewritten in a single monorepo: a Godot client in C#, a Kotlin and Spring Boot server, and protobuf messages between them. Many features were cut to make a playable first version realistic. In October 2025 Akka was replaced with Bestia's own entity component system.

Since the summer of 2026 development has moved faster than ever, with more than 2,000 commits in 2026 alone. The game now runs on Godot 4.7 with a voxel world, a world generator that also writes the world's history, and a companion web app.

Some things survived all the rewrites: the name, the bestias and the bestia master who leads them. The blob and the field rat from 2006 still roam the world, and Odin, the 2006 bestia for game masters with the identifier `gm_bestia`, lives on under that same identifier as today's GM test bestia.
