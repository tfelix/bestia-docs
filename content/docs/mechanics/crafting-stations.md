---
title: Crafting Stations
weight: 510
description: "The one crafting window, crafting stations with their own work queue, Bestia workers, campfires and resin."
---

All crafting happens in **one window**. What the window shows depends on where you open it: at a crafting station it
shows what you can make there, anywhere else it shows what you can make by hand. A station keeps its own **queue**. You
or one of your Bestias works through it, and a Bestia keeps working while you are logged out.

This page is about the window and the stations. How a blueprint is discovered and how good a craft turns out is in
[Item Crafting](/docs/mechanics/items/#item-crafting).

# Opening the Window

| You are...                            | The window opens as | It shows                                              |
| ------------------------------------- | ------------------- | ----------------------------------------------------- |
| next to one of your stations          | that station        | the skills that work at this station                  |
| anywhere else                         | **Handiwork**       | everything that needs no station                      |
| casting a crafting skill at a station | that station        | the cast skill already selected                       |
| casting a crafting skill elsewhere    | **Handiwork**       | the cast skill already selected, with its kits on top |

"Next to" means within about 3 m. A skill that works at more than one kind of station shows up at each of them.

**Handiwork** is the station you always carry. Every master can open it. It lists a **Basics** entry for everyone, and
one entry for each learned skill that has something to make without a station:

| Entry                                                          | Makes without a station           |
| -------------------------------------------------------------- | --------------------------------- |
| Basics (every master)                                          | Torch, stone knife, stone hatchet |
| [Cooking](/docs/mechanics/master/#skill-cooking) Lv. 1         | [Campfire kit](#campfires)        |
| [Carpentry](/docs/mechanics/master/#skill-carpentry) Lv. 1     | Workbench kit                     |
| [Arrow Crafting](/docs/mechanics/master/#skill-arrow-crafting) | Arrows                            |

## Kits Place Stations

A station is always put down from a **kit**: an item that is crafted in Handiwork, carried in the bag, and placed from
there. A kit can also be sold or given away like any other item. Casting a skill on bare ground never builds a station
by itself any more. It opens Handiwork with that skill selected, where its kit is the first entry.

# The Window

```text
+------------------------------------------------------------------+
| [hammer] Workbench                      yours, 2 m                |
+----+------------------------+-------------------------------------+
| [C]| Carpentry  Lv. 2       | Wall kit                            |
| [I]|------------------------|   plank        18 / 15              |
|    | Wall kit          [6]  |   nail         40 / 25              |
|    | Weapon blueprint  [1]  |   8 s, 85 % each                    |
|    | Engraving set          |                                     |
|    |                        |   [-] 5 [+] [Max 6]     [Queue 5]   |
|    | [ Discover a recipe ]  |                                     |
+----+------------------------+-------------------------------------+
| Queue                                     Worker: [Grumble   v]   |
|   Wall kit           2 of 5   [=====-------]                 [x]  |
|   Weapon blueprint   0 of 1   waiting                        [x]  |
|   Held by the bench: 9 plank, 15 nail, 1 ink                      |
+------------------------------------------------------------------+
```

From left to right:

1. **Skill rail.** One button with icon and name for each skill that works here. Picking one folds the rail down to its
   icons, and the picked skill stays highlighted. Clicking it again unfolds the rail. When only one skill works here,
   the rail is left out.
2. **Recipe list.** The known blueprints of the picked skill, as a plain list. The number in brackets is how many you
   can make from what you carry right now. A recipe you cannot afford is greyed out.
3. **Recipe detail.** Every ingredient as `have / need`. The numbers follow the chosen amount, and a missing ingredient
   turns red. Below are the duration and the success chance of one item. `-`, `+` and `Max` set the amount, and
   **Queue** adds it to the station's queue.

**Discover a recipe** is a large button under the recipe list. It opens the
[discovery view](/docs/mechanics/items/#the-crafting-window) of the picked skill, and its back button returns to the
list. Discovery is not queued: it runs at once.

The header names the station and shows what it needs to keep working: a campfire shows its burn time and an **Add
wood** button.

# The Queue

The queue belongs to the station, not to the crafter. A station holds up to 10 queue entries. Handiwork has a queue of
its own. It lives on whoever opened it: the master, or the Bestia they control.

## Ingredients Are Paid In

Pressing **Queue** moves the ingredients for the whole amount from the master's bag into the station. From then on they
belong to the queue:

- **Nothing runs short halfway.** Everything a queue needs is set aside when it is queued.
- **No hand-over.** A Bestia worker does not need the materials in its own bag.
- **Workers can change.** The master can start a queue, walk away and let a Bestia take over, without moving a single
  item.

**Cancelling** an entry moves its unused ingredients back into the master's bag. What does not fit stays in the station
until there is room.

## Working Through It

Each item in an entry is crafted on its own and rolls its own success. A failed item loses its share of the ingredients,
as every failed craft does. The success chance follows the
[production rules](/docs/mechanics/items/#production-crafting-a-known-item): skill levels from the master, DEX and WIL
from the worker.

Finished items go into the **worker's bag**.

A queue **pauses** when one of these is true, and it picks up again on its own once the cause is gone:

- The worker is farther than about 3 m from the station.
- The worker's bag is full or too heavy for the next item.
- The station cannot work right now, for example a campfire that went out.
- The worker is the master, and the master disconnected. The item in progress stops where it was.

## Bestia Workers

The worker is picked in the queue panel: the master or one of their Bestias. A Bestia worker walks to the station and
stays there until the queue is empty or another worker is picked.

**A Bestia keeps working while its master is logged out.** A Bestia already stays in the world when its master leaves,
so nothing else changes for it. The station stays in the world as well: as long as a Bestia works at a station or stands
next to it, the station is never unloaded. A station nobody is near can be unloaded, but it keeps its queue and what it
holds.

## Who May Use a Station

Only the owner can queue, cancel, pick a worker or add fuel. Guild-wide use may come later.

A destroyed station drops everything it holds on the ground as loot: ingredients that are paid in and not used yet.

# Campfires

The campfire is the station of [Cooking](/docs/mechanics/master/#skill-cooking). Every meal needs a burning campfire
within about 3 m.

- **Kit.** Cooking Lv. 1 shows the campfire kit in Handiwork: 4 sticks, 3 loose stones and 1 resin.
- **Burning.** A placed campfire burns for 30 minutes.
- **Wood.** Each log adds 30 minutes, up to 2 hours of burn time. Wood can be added while it burns, so a long cooking
  queue does not stop halfway.
- **Going out.** A campfire that runs out goes cold and its queue pauses. A log within the next 30 minutes lights it
  again. After that the campfire is gone, and it drops what it holds.

# Resin

Resin is the first burnable material. It is what turns a stick into a torch and what lights a campfire.

- A few lumps lie on the ground under conifers. They are picked up as they lie and grow back, like loose stones and
  sticks.
- Felling a tree drops more. See [Felling Trees](/docs/mechanics/natural-resources/#felling-trees).

A torch is a Basics recipe: 1 stick and 1 resin make 1 [torch](/docs/mechanics/environment/#light-sources).

# Server Notes

- A station's held ingredients are an inventory component on the station entity, like a Bestia's bag.
- A station is only in the ECS while its ground is held. So the held items and the queue are saved with the station's
  structure row and loaded back when the station appears again.
- A Bestia is already a simulation anchor and holds the ground it stands on. A working Bestia gets an anchor priority
  above an idle one, so it keeps its ground even when the zone holds more anchors than its limit.
