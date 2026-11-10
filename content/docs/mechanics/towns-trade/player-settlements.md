---
weight: 660
title: Player Settlements
description: "How players found their own towns: the city sign, the sphere of influence that grows with every building, the post office and auction house a town can hold, and what happens when the sign falls."
---

The world generates its towns. Players can found more. A [Prospector](/docs/mechanics/master/survival-tree/#prospector)
with [Founder](/docs/mechanics/master/survival-tree/#skill-founder) plants a **city sign**, and a settlement grows around
it. The skill only starts the town. It grows because players keep building inside it.

A player settlement is what makes two buildings possible: a [post office](/docs/mechanics/towns-trade/postal/#in-player-cities)
and an [auction house](/docs/mechanics/towns-trade/economy-trade/#building-an-auction-house). Neither works anywhere else.

{{< alert context="info" text="**Conventions used on this page.** Durations are in **real time**, distances in metres on the ground." />}}

# Founding

## The Sign Site

The founder names the town and casts Founder on the ground. The cast plants a **sign site**, not a sign:

- The name is fixed. It is unique in the world, 3 to 24 characters, and follows the rules for guild names.
- The site claims the spot at once. No other founder can plant a sign too close to it.
- Anyone may help build the sign. It takes **10 min** of work.
- The settlement only exists once the sign is finished. Until then there is no sphere, no map entry and no post office.
- A site that is destroyed, or that nobody works on for **24 h**, disappears.

A master can found one settlement at a time. While their sign or sign site stands, Founder refuses to cast.

## Where a Town May Stand

- At least **5 km** from the centre of every other settlement: generated ones (hamlets too), player towns and sign
  sites.
- Outside every [ward stone](/docs/mechanics/society/pvp/#protected-zones) field.
- Not within 5 km of a town that [fell](#when-the-sign-falls) less than 48 h ago.

Because of the 5 km rule, every player town has room for an auction house of its own.

# The Sphere of Influence

The sphere is a circle around the sign. Its size depends on what is built in it.

**Radius = 150 m + 25 m per building point**, up to **500 m**.

Every finished player structure inside the sphere counts:

| Structure                                 | Building points |
| ----------------------------------------- | --------------- |
| Post office, auction house                | 5               |
| Crafting station (workbench, forge, ...)  | 1               |
| Wall, floor or stairs piece               | 0.1             |
| Campfire, war banner                      | 0               |

A structure counts if it stands inside the current radius. So a town grows outwards: a building on the edge pushes the
edge a little further.

**Anybody may build in a player settlement.** The founder does not decide who builds, and nobody needs permission.

# The City Sign

The sign is the heart of the town. It can be attacked like any building, and the town makes it stronger.

| Value         | Base    | Per building point | Highest  |
| ------------- | ------- | ------------------ | -------- |
| HP            | `2,000` | `+500`             | `30,000` |
| DEF           | `10`    | `+2`               | `60`     |

A bare sign falls to a small party. A grown town needs a siege, so an attacker has two ways in: knock down the town's
buildings first so the sign gets weaker, or go straight for the sign.

The sign heals **1% of its HP per minute** once nobody has hit it for **5 min**.

Destroying a town costs **no honor**.

At the sign, the founder can:

- **Hand the town over** to a master standing nearby who has Founder and no settlement of their own. They must accept.
  The old founder can found again after Founder's cooldown.
- **Tear the sign down**, but only while no post office or auction house stands in the sphere. This ends the town
  without the 48 h lock below.

## When the Sign Falls

When the sign is destroyed, the town ends:

- The sphere is gone and the town leaves every map.
- Every building that only works in a settlement **stops working**:
  - The **post office** is [lost](/docs/mechanics/towns-trade/postal/#losing-an-office). Waiting sacks go on through the
    nearest other office with their promise kept. Masters who had it as their home get the nearest office instead.
  - The **auction house** closes. Every listing is posted back to its seller, and every bid back to its bidder. The
    till is posted to the owner.
- Those buildings **decay**. A building at full HP breaks after **96 h**; a damaged one sooner. They cannot be repaired
  outside a settlement.
- For **48 h** nobody can found a town within 5 km of the fallen sign.

After 48 h anyone with Founder can **reclaim** the place. A new sign near the old buildings brings them back into a
sphere: they stop decaying, start working again and can be repaired. The reclaimed post office starts with no sacks and
no residents.

# Repairing

Any player structure inside a settlement can be repaired. Outside a settlement it cannot.

1. **Deposit materials.** Open the building and put in a share of its kit's materials. Restoring all of its HP needs
   **half the kit**; a smaller repair needs its share, rounded up per material.
2. **Work on it**, like a construction site. Restoring all of its HP takes **half the kit's build time**. Anybody can
   help.

Materials are used up as HP comes back. Leftovers stay in the building for the next repair. The sign has no kit, so it
needs only work: up to 5 min.

# On the Map

A player town appears on the [world map](/docs/mechanics/world/world-exploration/) for everyone who has charted the
spot of its sign, in the game and in the [companion app](/docs/mechanics/companion-app/). The map shows its sign under
its name, and its post office and auction house as services of the town.

{{< alert context="warning" text="All numbers on this page are placeholders. Not built yet: the sphere's outline on the map, and repairing wall, floor and stair pieces from the client, which cannot click them." />}}
