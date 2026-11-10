---
weight: 610
title: Fishing
description: Casting a line, striking in time, what bites, and how the rod and the Fishing skill decide the catch.
---

Every master can fish. All it takes is a fishing rod in the right hand and some water within reach. The rod decides
which catches are possible at all. The [Fishing](/docs/mechanics/master/survival-tree/#skill-fishing) skill decides
how likely the better ones are.

# Casting and Striking

1. **Cast.** With a rod in hand, click on water up to `8 m` away. The master casts instead of walking there, and a
   bobber lands on the water. Each cast costs the rod `1` durability.
2. **Wait.** After a random `3 - 15 s`, something bites and the bobber plunges under the surface.
3. **Strike.** Click the bobber, or press the interact key, within `1.5 s` of the bite. In time, the catch lands in
   the bag. Too late, it gets away.

A strike before the bite only pulls the line in empty. Walking, attacking, using a skill or putting the rod away reels
the line in, and the cast is lost.

A catch gives the master gathering experience of `2 * catch level + 5`, the same as any other
[gathering](/docs/mechanics/bestias/bestia/#environment-interaction). Junk counts too.

{{< alert context="info" text="Fishing is a timing game, and a careful bot can play a timing game. The server logs strikes that are faster or more regular than a human can manage, so they can be looked into. It does not punish them on its own: a quick human should never lose a catch to a false alarm." />}}

# What Bites

For now every lake, river and sea shares one catch table. Water kind, biome, time of day and weather may change it
later.

A bite is drawn from the table in three steps:

1. **The rod filters.** Entries above the rod's _max catch level_ never bite.
2. **The skill weights.** Entries up to the master's _catch level cap_ keep their weight. Above the cap, the weight
   halves for every 5 levels over.
3. **One draw** by weight picks the catch.

```kotlin
weight = baseWeight * 0.5.pow(max(0, level - cap) / 5.0)
```

The cap is `10` without the Fishing skill and `20` per rank with it. A catch ten levels over the cap bites at a
quarter of its usual weight. Forty levels over is `1/256` of it, which is as good as never.

## Catch Table

| Catch               | Kind     | Catch Lv. | Weight |
| ------------------- | -------- | --------- | ------ |
| Old Boot            | Junk     | 1         | 40     |
| Driftwood           | Junk     | 3         | 40     |
| Tangled Net         | Junk     | 6         | 40     |
| Raw Fish            | Fish     | 1         | 100    |
| Perch               | Fish     | 8         | 100    |
| Bream               | Fish     | 15        | 100    |
| Sealed Bottle       | Treasure | 18        | 4      |
| Pike                | Fish     | 24        | 100    |
| Sea Pearl           | Treasure | 30        | 4      |
| Eel                 | Fish     | 32        | 100    |
| Rough Emerald       | Treasure | 40        | 4      |
| Salmon              | Fish     | 42        | 100    |
| Sturgeon            | Fish     | 55        | 100    |
| Rough Ruby          | Treasure | 60        | 4      |
| Swordfish           | Fish     | 68        | 100    |
| Moonscale           | Fish     | 82        | 100    |
| Deepmaw             | Fish     | 98        | 100    |
| Abyssal Lanternfish | Fish     | 115       | 100    |

A fish's catch level is its item level. Treasure has a catch level of its own, because a pearl is no harder to hook
than a fish, only rarer.

# Fishing Rods

A rod is a one-handed [tool](/docs/mechanics/items-crafting/items/#weapon-type), so every master may hold one whatever
their professions.

| Rod        | Item Lv. | Max Catch Lv. | Durability | How to get it                                                  |
| ---------- | -------- | ------------- | ---------- | -------------------------------------------------------------- |
| Willow Rod | 1        | 25            | 60         | Starter blueprint: 2 sticks and 1 resin, by hand               |
| Bamboo Rod | 20       | 50            | 120        | Discovered blueprint at a workbench, or bought from a merchant |
| Ash Rod    | 40       | 75            | 180        | Discovered blueprint at a workbench, or bought from a merchant |
| Steel Rod  | 60       | 120           | 260        | Discovered blueprint at a forge only                           |

The willow rod is made from what lies on the ground, like the
[first tools](/docs/mechanics/items-crafting/crafting/#starter-blueprints). A master's first rod therefore never waits
on a shop or on a find.

The bamboo and ash rods are also meant for merchants. Shops only stock
[commodities](/docs/mechanics/towns-trade/economy-trade/) today, and a tool is not one yet, so until it is, both
come from a discovered blueprint only.

The rod limits the catch and the skill shapes the odds below that limit. Neither alone is enough: a steel rod in
untrained hands hooks mostly boots and perch, and a master at rank 5 with a willow rod never sees a fish above level 25.

# Not Yet

- Catch tables that differ by water kind, biome, time of day, weather or how rich the water is in fish.
- Bait.
- Bestias that fish, or a bite that turns out to be a hostile water bestia.
- What is inside a sealed bottle.
