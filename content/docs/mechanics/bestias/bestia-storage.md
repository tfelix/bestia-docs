---
weight: 306
title: Bestia Storage
description: "Where a master keeps the Bestias that are not out in the world: the storage centers, the Bestia Ledger, summoning and swapping, and what happens to a stored Bestia's items."
---

{{< alert context="warning" text="Not built yet. All numbers on this page are placeholders." />}}

# Storage

A master has a few **active slots**. Every Bestia in an active slot is out in the world, also while the master is
logged out. Every other Bestia the master owns waits in the **storage**. A stored Bestia is not in the world. Nobody can
see it, hurt it or give it orders.

| Slots   | Base | With add-ons |
| ------- | ---- | ------------ |
| Active  | 4    | up to 8      |
| Storage | 20   | up to 100    |

Each master has their own storage. Masters of the same account do not share Bestias. The add-ons count for the whole
account, in steps of 20 storage slots. There is no way to get them yet.

A new Bestia goes into a free active slot first. If none is free, it goes into the storage. This holds for a
[caught](/docs/mechanics/bestias/bestia/#catching-bestias) Bestia and for a
[hatched](/docs/mechanics/bestias/bestia/#hatching-the-egg) one. Only when both are full does the creature get away, or
the egg wait in the incubator.

# Storage Centers

A master manages the storage at a **storage center**, or anywhere with the Bestia Ledger.

- **In generated settlements.** Every generated village and town has one, run by a **Bestia Keeper**. A hamlet has
  none. The center is open while the keeper works.
- **In player cities.** A [player settlement](/docs/mechanics/towns-trade/player-settlements/) gets one when its
  players build it, from a **storage center kit** (a [Carpentry](/docs/mechanics/master/craftsman-tree/#skill-carpentry)
  Lv. 3 recipe). It follows the rules of the [post office](/docs/mechanics/towns-trade/postal/#in-player-cities): one
  per settlement, no owner and no fee, 5 building points, and it stops working when the city sign falls.

Using the storage is free.

## The Bestia Ledger

The keeper gives every master a **Bestia Ledger** for free. It weighs 0.1 and is **bound**: it cannot be dropped,
traded, sent or put into a chest. A master has only one.

Using the ledger opens the storage anywhere in the world. It does not work while the master is fighting.

# Summoning and Swapping

**Summon.** A stored Bestia comes into a free active slot. It appears next to the master.

**Swap.** When every active slot is full, a stored Bestia can **replace** an active one. The stored Bestia appears
**where the active one stood**, and the active one goes into the storage. So a swap never brings a Bestia closer to the
master. A free slot is always filled first: a swap is refused while an active slot is free.

There is no way to put a Bestia away without bringing another one out. Otherwise the storage would be a free teleport to
the master.

A Bestia **cannot be swapped out** while it:

- is dead,
- is fighting,
- is the Bestia the player controls right now, or
- is paired in a [Breeding Farm](/docs/mechanics/bestias/bestia/#breeding).

A Bestia that went into the storage **rests for 30 min**. Only then can it be summoned again.

## Items of a Stored Bestia

A Bestia does not take its items into the storage. Before the swap, the storage warns about every item the Bestia
carries. When it goes in, **all** its items drop where it stood, the worn gear too, packed into one **Item Bundle**.

- The master has a short head start to pick the bundle up. After that, anybody may take it.
- A bundle in the bag weighs as much as its contents.
- **Unpack** moves everything into the bag at once, if the master can carry it.
- A bundle never holds another bundle.

## In the Storage

A stored Bestia does not change. Its HP, mana, stamina and status effects stay as they were. Its
[orders](/docs/mechanics/bestias/bestia-orders/) are cleared.

**Release.** A stored Bestia can be released for good, after a confirmation. It does not come back.

# Open Questions

- How masters get storage add-ons.
- Whether the [Companion App](/docs/mechanics/companion-app/) shows the storage.
