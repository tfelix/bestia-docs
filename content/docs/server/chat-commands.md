---
weight: 360
title: Chat Commands
description: "Every command a player or GM can type into the chat box: the client's own prefixes, the player commands, and the GM commands with the authority each one needs."
---

# How a command reaches the server

The chat box in the client handles a few prefixes itself. Everything else that starts with `/` goes
to zone-server as a command line (`ChatType.COMMAND`). There, `ChatCommandHandler` asks each
`ChatCommand` in turn whether the line is theirs, and the first match runs.

- A command can need an **authority** (`net.bestia.account.Authority`). An account gets its
  authorities from its role (`net.bestia.account.Role`), which travels in the login token. Today `GM`
  and `SUPER_GM` hold every authority, `USER` holds none. A player who types a command they may not use
  is told so; an unknown command gets a different message.
- Commands do not need Basic Skill rank 2, unlike talking to other players.
- `/help` lists every command the caller may use, with its help text.
- Commands that change the world for good (`/carve`, `/ignite`, `/raze`, `/water`) also need
  `chunk-stream.allow-debug-edits` switched on in the server config. Otherwise they are refused, even for
  a GM.

The source of each command is `zone-server/src/main/kotlin/net/bestia/zone/chat/net/<Name>ChatCommand.kt`.

# Client prefixes

These never reach the server as commands. The client handles them in `Game/UI/Chat/chat.gd`.

{{< table >}}

| Prefix      | What it does                                      |
| ----------- | ------------------------------------------------- |
| `/s <text>` | Switches to public chat and sends the text there  |
| `/p <text>` | Switches to party chat and sends the text there   |
| `/g <text>` | Switches to guild chat and sends the text there   |
| `/w <text>` | Whisper. Not implemented yet: the line is dropped |
| `/clear`    | Clears the chat window                            |

{{< /table >}}

An emote the controlled body cannot play (a bestia asked to cheer) is refused by the client too,
before it is sent.

# Player commands

Every player may use these.

{{< table >}}

| Command                                                  | What it does                                                                      | Source                   |
| -------------------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------ |
| `/help`                                                  | Lists the commands you may use                                                    | `ChatCommandHandler`     |
| `/cheer`, `/jump`, `/point`, `/flourish`, `/sit`, `/lie` | Plays an emote. Emotes can be bound to Alt+1 to Alt+0 in the emote window (Alt+E) | `EmoteChatCommand`       |
| `/party <name>`                                          | Creates a party with that name                                                    | `PartyCreateChatCommand` |
| `/invite <username>`                                     | Invites a player into your party                                                  | `PartyInviteChatCommand` |
| `/kick <username>`                                       | Removes a player from your party (owner only)                                     | `PartyKickChatCommand`   |
| `/leave`                                                 | Leaves your party                                                                 | `PartyLeaveChatCommand`  |

{{< /table >}}

The emote list is `AnimationKind.EMOTES`; a new emote becomes a command by itself.

# GM commands

{{< table >}}

| Command                               | Authority    | What it does                                                                                                                                               | Source                 |
| ------------------------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `/mm <target>`                        | `MAP_MOVE`   | Moves you to a map position, on the ground. Target is a grid reference (`/mm H12 41 37`), a settlement name (`/mm Trestein`) or voxels (`/mm 64000 64000`) | `MapMoveChatCommand`   |
| `/reveal [metres]`                    | `MAP_REVEAL` | Puts a chart of the whole world in your bag, or of a disc that wide around you                                                                             | `RevealMapChatCommand` |
| `/item <ITEM_ID or DB_NAME> <AMOUNT>` | `ITEM`       | Spawns an item for you                                                                                                                                     | `ItemChatCommand`      |
| `/exp <AMOUNT>`                       | `EXP`        | Adds EXP to your active bestia                                                                                                                             | `ExpChatCommand`       |
| `/allskills`                          | `SKILLS`     | Master: every skill at max level. Bestia: its whole learnset at level 1. Written to the database                                                           | `AllSkillsChatCommand` |
| `/spawn <IDENTIFIER> <X> <Y>`         | `SPAWN`      | Spawns an NPC bestia at a position                                                                                                                         | `SpawnChatCommand`     |
| `/ambient`                            | `SPAWN`      | Reports the ambient wilderness density around you, and why                                                                                                 | `AmbientChatCommand`   |
| `/townsfolk here`                     | `SPAWN`      | Spawns the household of the nearest house                                                                                                                  | `TownsfolkChatCommand` |
| `/townsfolk <OCCUPATION> <X> <Y>`     | `SPAWN`      | Puts one townsperson of that trade at a position. `/help` lists the known occupations                                                                      | `TownsfolkChatCommand` |
| `/talk [OPTION]`                      | `SPAWN`      | Talks to the nearest townsperson (12 m), or picks one of the options they offered                                                                          | `TalkChatCommand`      |
| `/knows [HOUSEHOLD]`                  | `SPAWN`      | What this town remembers, or what one household of it does                                                                                                 | `KnowsChatCommand`     |
| `/sites`                              | `SPAWN`      | Describes the settlement you stand in                                                                                                                      | `SitesChatCommand`     |
| `/sites prices`                       | `SPAWN`      | What that settlement has on its shelves, and at what price                                                                                                 | `SitesChatCommand`     |
| `/rumour post <STRENGTH>`             | `SPAWN`      | Posts news of a kill where you stand, strength 0 to 1                                                                                                      | `RumourChatCommand`    |
| `/rumour here`                        | `SPAWN`      | Lists what the settlements that heard it are still saying                                                                                                  | `RumourChatCommand`    |
| `/rumour sweep`                       | `SPAWN`      | Forgets every rumour past its expiry                                                                                                                       | `RumourChatCommand`    |
| `/date`                               | `WORLD_TIME` | Shows the world date                                                                                                                                       | `WorldTimeChatCommand` |
| `/date <HH:MM>`                       | `WORLD_TIME` | Jumps to that time today. For everyone, until restart                                                                                                      | `WorldTimeChatCommand` |
| `/date <YEAR>-<MONTH>-<DAY> <HH:MM>`  | `WORLD_TIME` | Jumps to a full date                                                                                                                                       | `WorldTimeChatCommand` |
| `/date reset`                         | `WORLD_TIME` | Returns to real time                                                                                                                                       | `WorldTimeChatCommand` |
| `/carve <X> <Y> <Z> [RADIUS]`         | `TERRAIN`    | Removes a sphere of rock. Z is the global vertical index, 0 is sea level. Radius in voxels                                                                 | `CarveChatCommand`     |
| `/water <X> <Y> <Z> [RADIUS]`         | `TERRAIN`    | Pours the lower half of a sphere of water into air. Radius in voxels                                                                                       | `WaterChatCommand`     |
| `/ignite <X> <Y> [RADIUS]`            | `TERRAIN`    | Sets the grass at a position alight. Radius in tiles. Ground that will not burn stays as it is                                                             | `IgniteChatCommand`    |
| `/raze <SETTLEMENT>`                  | `TERRAIN`    | Destroys every building of a settlement by its index, so it falls                                                                                          | `RazeChatCommand`      |

{{< /table >}}

Some authorities have no chat command. `KICK` and `BAN` are GM actions of the login server
(`GmActionService`). `TEST_BESTIA` hands a GM a test bestia when a master is created. `KILL` and
`DIALOG` are granted but nothing checks them yet.

{{< alert context="info" text="The help text of `/item` says it can also give the item to another player by id. The command does not accept that argument today." />}}
