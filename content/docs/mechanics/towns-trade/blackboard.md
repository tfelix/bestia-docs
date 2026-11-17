---
weight: 730
title: City Blackboard
description: "The blackboard where players post and take delivery commissions, the quest log that remembers what you signed, and the quest tracker on the screen."
---

A **city blackboard** is a wooden board in a town square. Players pin paid work to it, and other players take it. It
is where [player commissions](/docs/mechanics/world/questing/#player-commissions) live: what they cost, how they are
signed and how they pay is on the [Questing](/docs/mechanics/world/questing/) page. This page is about the board
itself, its window, and how a player keeps track of what they signed.

{{< alert context="info" text="**Being built** on the bestia-behemoth branches `quest/01..07`. The board uses a placeholder model, and the window layouts are not final." />}}

# The Board

## Where boards stand

- Each of the three **start towns** has a board beside its [market hall](/docs/mechanics/towns-trade/economy-trade/#the-start-towns-auction-houses). Nobody owns it.
- A [player settlement](/docs/mechanics/towns-trade/player-settlements/) may build **one** board. It is built from a
  **blackboard kit**, a [Carpentry](/docs/mechanics/master/craftsman-tree/#skill-carpentry) recipe at the
  [workbench](/docs/mechanics/items-crafting/crafting-stations/). Like every building in a player settlement, anybody may
  put it up.

The world generator places no boards. The start-town boards are added by the zone when it starts, if none stands
there yet.

## One network

All boards share **one list**. Every board shows every open commission in the world, and every board takes signatures
and hand-ins for any of them. You can post in one town, and a player on the other side of the world can deliver at
the board in theirs. A board in a small player town is as useful as one in a start town, so a town gains a real
service by building one.

## The board marker

A **"!"** floats above a board when at least one open commission **fits your level**: its
[suggested level](/docs/mechanics/world/questing/#difficulty-and-level-range) lies in a band around your own. The marker
is checked again when you level up.

The marker is the same for every player of the same level. So it also lights up for a commission you posted yourself
or have already signed.

# The Window

Click a board to open its window. It closes when you walk more than 10 m away, like the other windows a building
opens. It has three tabs:

| Tab              | What you do there                                                                                                                                                       |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Open quests**  | Read every open commission in the world. Search by item name, sort by pay or by level. **Sign** a commission, or **hand in** units of one you signed.                   |
| **Post a quest** | Pick the item, the amount, the coins per unit and the duration (1, 3 or 7 days). The tab shows the pot, the fee and the total before you post.                           |
| **My postings**  | See your open commissions and how far each has come. **Withdraw** one; it closes after a [notice hour](/docs/mechanics/world/questing/#withdrawing-a-commission).        |

Each row shows the [commission's text](/docs/mechanics/world/questing/#the-text-of-a-commission), its suggested level in
colour, the coins per unit, how many units are still missing, and the time left.

When you hand in, the board takes as many copies of the item as you carry, up to what is still missing. Any copy
counts. The coins go into your bag, and the goods are in the issuer's mailbox at once, like
[auction mail](/docs/mechanics/towns-trade/postal/#auction-mail).

# The Quest Log

The **quest log** (Alt+Q) lists every quest you signed and every commission you posted. It works anywhere; you do not
need to stand at a board.

The left side is a list in two groups, **Accepted** and **Posted by you**. Each entry shows its level in colour. The
right side shows the chosen quest:

- the title, the suggested level and the full text,
- a bar per objective. For a Gather commission it shows how many units are in, how many you delivered yourself, and how
  many you carry right now,
- the reward, the time left and the status,
- **Dropped by**: the species that drop the wanted item, see below,
- **Abandon** and **Track**.

The log is live. When another signer hands in, your bar moves. When a quest is completed, expires or is withdrawn, a
notice appears on screen and in the chat. An ended quest stays in the log, with its status, until you clear it or
3 days pass. So a player who was offline still learns how it ended.

The log holds at most [25 quests](/docs/mechanics/world/questing/#limits). Abandoning a Gather commission costs
nothing.

## Dropped by

The detail lists the Bestia species that **drop the wanted item**, with the chance per kill. It only lists species you
have **seen**. The list comes from your [Bestia Compendium](/docs/mechanics/bestias/bestia/#bestia-compendium), so it
never tells you more than you already know. To find a new source, you explore.

# The Quest Tracker

The **tracker** sits on the right side of the screen, below the minimap. It shows up to **5** quests you ticked
**Track** in the log, one line per objective. The "you carry" count changes as soon as your inventory does, so you see
on the road when you have enough.

The tracker remembers your choice on your own computer only. Another computer starts with an empty tracker.
