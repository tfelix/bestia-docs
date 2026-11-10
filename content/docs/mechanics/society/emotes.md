---
weight: 760
title: Emotes
description: "Body-language emotes in the spirit of Ragnarok Online, played as animations on the entity you control: typed as a / command or fired from a dedicated emote bar that every bestia of a master shares."
---

An **emote** is a short piece of body language - a cheer, sitting down on the grass, lying down for a rest - played as
an animation on the entity the player controls, for everyone nearby to see. Like in Ragnarok Online it costs nothing,
has no effect on the world and is only there so players can talk without typing.

Unlike Ragnarok Online's emotes, which are icons popping up over the head, Bestia's are animations of the body. The
master's model already carries a large set of clips that were not used yet, so the first set of emotes needs no new
art.

# Triggering an emote

There are two ways, and both end in the same place on the server.

* **A chat command.** Typing `/cheer` (or any other emote's command) in the chat box plays it. `/help` lists every
  emote with the other commands.
* **A shortcut.** An emote can be dragged from the emote window onto the emote bar (see below) or onto any slot of
  the ordinary shortcut bar, and fired by its key.

The server owns the commands. Each emote is one value of the animation kinds the server already sends, and its
command is that value's name in lower case, so a new emote is typed and listed in `/help` the moment it exists. The
client recognises the same words for one reason only: when the body the player controls has no clip for an emote, it
says so in the chat itself instead of asking the server for something nobody would see.

## Who may emote

Emoting needs **Basic Skill rank 2**, the same rank as chat: body language is talking too, and Ragnarok Online gates
its emotions at exactly that Basic Skill level. Ranks 1 to 5 of Basic Skill are described on the
[master](/docs/mechanics/master/novice-tree/#skill-basic-skill) page.

## Who sees it

Every client that sees the entity, the same audience as its movement, and a player who walks up mid-emote sees it
too. An emote is not written to the chat log.

# The first set

All of these are clips the master's model (the Mage rig, which every body type shares) already has.

| Command     | Clips played on a master                                     | Kind  |
|-------------|--------------------------------------------------------------|-------|
| `/cheer`    | `Cheer`                                                      | Once  |
| `/jump`     | `Jump_Full_Short`                                            | Once  |
| `/point`    | `Interact`                                                   | Once  |
| `/flourish` | `Spellcast_Raise`                                            | Once  |
| `/sit`      | `Sit_Floor_Down`, then `Sit_Floor_Idle`; `Sit_Floor_StandUp` | Lasts |
| `/lie`      | `Lie_Down`, then `Lie_Idle`; `Lie_StandUp`                   | Lasts |

A **once** emote plays its clip a single time; another emote can follow when it has played out. An emote that
**lasts** plays its way in, then loops until the entity walks, casts, is hit or dies, and then plays its way out.

An emote cannot be started while walking, casting or crafting; the player is told to stand still.

## What is missing

The most wanted emotes - wave, bow, laugh, clap, dance, cry - have no clip on the rig yet. New clips can be added to
the Mage rig as an extra animation library. Every body type is a set of parts on that rig, so one clip serves every
master.

## Bestias

Bestias are still a placeholder model with `Idle`, `Sleep`, `appear` and `death` clips. Only `/lie` (played as
`Sleep`) works for them. When the player controls a bestia, an emote its body has no clip for is refused on the
client with a line in the chat, and its shortcut is greyed out, the same way a skill the bestia does not know is.
Each bestia model brings its own list as real models arrive.

# The emote bar

## Why not the shared shortcut layer

The shortcut bar has three layers of its own for the master and for every bestia, and one shared layer below them
that shows wherever an entity's own slot is empty. The shared layer already belongs to the master rather than to any
one entity, so it looks like the natural home for emotes, but it does not work well:

* A shared slot only shows through on layers 1 to 3 while that slot is empty on the controlled entity's layer. To
  keep an emote reachable on every layer, every bestia has to leave that slot free, and the bar only has twelve.
* On the shared layer itself (★) emotes are always there, but switching to it in the middle of a fight to cheer is
  not something anyone will do.

## A bar of its own

Emotes get a **separate emote bar of ten slots**, bound to **Alt+1** to **Alt+0**, the keys Ragnarok Online uses for
its own emotion and chat macros. Those keys are free: the layers use Ctrl+1 to Ctrl+4 and the windows Alt and a
letter.

* It belongs to the master and is the same whichever entity is controlled. It has no layers and nothing shows
  through it.
* It is filled in the **emote window** (Alt+E, or the smiley in the profile's menu), which lists every emote:
  clicking one plays it, dragging one onto a slot binds it, and dragging a slot off the bar clears it. The ten slots
  sit at the top of the window, like Ragnarok Online's Alt+M macro window. There is no permanent strip on the
  screen; the keys work with the window closed.
* It is saved with the rest of the shortcuts in `user://shortcuts_config.json`, under the master, as a third list
  next to the entity layers and the shared one.

Because an emote is also an ordinary shortcut type, a player who wants `/sit` on a key of the main bar can still put
it there.

# Sitting as a mechanic

The design gives Basic Skill rank 4 **sitting recovery**, which does not exist yet. `/sit` is cosmetic for now, but it
is the same state: once sitting recovery is built, it reads whether the entity is sitting and adds its bonus when the
master holds rank 4. Nothing about the emote has to change for it.

# Implementation

## Wire

* Emotes are values of `AnimationKind`, the enum of the existing **Animation component**, next to the AI's `SLEEP`.
  The server shows an emote exactly the way it shows a sleeping creature: the component is synced to everyone who
  sees the entity, and `IDLE` ends it.
* The only new message is `EmoteCMSG { AnimationKind kind }`, from the client, for the entity the player controls.
  The server accepts only the emote kinds; nobody can ask for `SLEEP` or `IDLE`.
* Repeating an emote needs no sequence number: a once emote holds for about its clip's length and then goes back to
  `IDLE`, and a new one is refused until it has, so every cheer is a real change of the component.

## Server

* `Animation` carries the emote and, for a once emote, how many seconds it still holds. Masters have the component
  now too; before, only creatures did.
* `EmoteService` is where both ways of asking end - the `EmoteCMSG` handler and the `/cheer` chat command. It checks
  Basic Skill rank 2, that the entity is alive, and that it is not walking, casting or crafting.
* `EmoteChatCommand` is one chat command for every emote kind, generated from the enum, so `/help` lists them all.
* `EmoteSystem` ends a once emote when its hold runs out, and any emote when the entity walks, casts, crafts or dies.
  Walking and a hit also end it inline where they happen, so the player sees it on the same tick. The AI leaves an
  emote alone instead of writing its own pose over it.

## Client

* Each emote is a resource in `Game/Emote/DB/`, edited in the inspector: its kind (a dropdown), name, icon (or a
  glyph until there is art), whether it lasts, and per body the clips to play - one clip for a once emote, and the way
  in, the loop and the way out for one that lasts. The loop clip is made to loop when it is played, whatever the
  model's import settings say.
* `Entity` treats an emote like any other posture from the server: below death, above its own walk/idle heuristic.
  When the local player starts walking, the emote is dropped at once rather than waiting for the server to end it, and
  a body that comes into view mid-emote takes it up.
* `ShortcutData` has an `EMOTE` type that names the emote by its kind, and `ShortcutLayout` a third list of slots
  for the emote bar.
