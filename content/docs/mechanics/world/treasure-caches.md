---
title: Treasure Caches
weight: 1150
description: Where the world generator buries treasure caches, what they hold, and how players sense, chart and dig them up.
---

Somebody buried something and never came back for it. **Treasure caches** are those things: coin, valuables and
gear under the ground, waiting for whoever digs first. The
[Prospector's Treasure Hunter route](/docs/mechanics/master/survival-tree/#prospector) is built around finding them,
but anyone with a shovel can dig one up once they know where it is.

# Where Caches Lie

The world generator places caches from three sources.

| Source             | Where                                                                    | How many                          |
| ------------------ | ------------------------------------------------------------------------ | --------------------------------- |
| Cave hoard         | At the back of a cave, where a sacked town's wealth was hidden           | Rare: one per sacking, 30% chance |
| History site       | Inside the radius of a site the world's history left behind              | One per site, by the table below  |
| Wild scatter       | Anywhere on wild land, away from towns and water                         | About 16 per km²                  |

Cave hoards come from the world's history. When a town is sacked, somebody may carry its treasury into the nearest
cave and never return. The [chronicle](/docs/mechanics/world/world-history/) records whose wealth it was and which sack
it fled. If the town held a relic at the time, the relic lies in the hoard too.

A history site buries one cache with a chance by its kind. A site where the chronicle buried a relic always
holds a cache:

| Site kind               | Chance |
| ----------------------- | ------ |
| Tomb                    | 70%    |
| Ruin, ash ruin          | 50%    |
| Fort, monastery         | 20%    |
| Monument                | Only with a relic sealed in it |

A battlefield holds one cache or more, by its dead, and they lie shallow. See
[What a Battlefield Holds](/docs/mechanics/world/world-history/#what-a-battlefield-holds).

The wild scatter covers the rest of the land. It is four times denser at the foot of cliffs and at old camps, where
travellers would hide what they could not carry. Old camps are cold fire rings beside the roads in the wild, about
one every 4 km of road and never closer than 2.5 km to a settlement.

Every cache lies between **0.5 m and 4 m** deep, a battlefield's no deeper than 1 m. Cave hoards lie under the cave
floor.

## Caches Do Not Come Back

A dug-up cache is gone for good. The world slowly runs out of treasure until the next world is generated. Who digs
first takes it all: a cache belongs to nobody until it is dug.

# Richness

Each cache has one of four richness tiers: **poor**, **modest**, **rich** and **splendid**.

The region sets the base tier. A cache in remote, dangerous country is richer than one next to a starter town. The
same danger that sets the level of the bestias there sets the tier of the cache.

History sites can lift a cache above its region. The ruin of a big town or a tomb is rich even next to a low-level
zone. A cave hoard is always at least rich. A cache with a relic is splendid.

# Contents

The contents are rolled when the cache is dug, not when the world is generated.

| Pool            | What                                                                                |
| --------------- | ----------------------------------------------------------------------------------- |
| Coins           | Gold coins. See [Coins](#coins).                                                    |
| Raw valuables   | Rough gems, rough rubies, gold ore and similar stackable goods                      |
| Gear            | Equipment with [random stats](/docs/server/item-stats/), at the level of the region |
| Relic           | Only at a site where the chronicle buried one                                       |

## The Top Item

Every cache has one **top slot**. It holds a piece of random-stat gear of the cache's tier, with a base chance of
**25%**. The [Excavation](/docs/mechanics/master/survival-tree/#skill-excavation) skill adds 5% per level, so a
Lv. 3 excavator gets the top item 40% of the time.

A cache with a relic always gives the relic. Its top slot is an extra roll on top.

## Coins

The world has a fixed coin supply (see [Money Supply](/docs/server/money-supply/)). A cache does not print new coin:
its coins are withdrawn from the world reserve when it is dug. When the reserve runs low, caches give less coin.

| Tier     | Coins          |
| -------- | -------------- |
| Poor     | 0 - 50         |
| Modest   | 100 - 400      |
| Rich     | 1,000 - 3,000  |
| Splendid | 5,000 - 15,000 |

The amount is scaled by how full the reserve is. A full reserve gives the whole amount.

## Relics

A relic is unique named gear. It keeps the name the chronicle gave it, and its tooltip names who forged it and
in which town. A relic is of item level **80 to 110**, whatever the region: base level 80, and its stats lift it
higher the longer the artifact's history is. Undead guard a tomb or monument that holds a relic.

| Relic kind | Slot        |
| ---------- | ----------- |
| Blade      | Right hand  |
| Crown      | Upper head  |
| Ring       | Accessory   |
| Reliquary  | Accessory   |
| Tome       | Left hand   |
| Banner     | Garment     |

# Digging

Digging needs a tool: a **shovel** for soil, sand and gravel, a **pickaxe** for rock. Both dig at the same speed.
Every metre dug costs the tool durability. Every master can make a shovel from 2 sticks and 1 log with Basic Skill
Lv. 1, like the stone hatchet.

Stand next to the spot and dig. Digging is a channel: moving or taking damage stops it. The base time is
**20 s per metre** of depth, so a cache takes 10 s to 80 s. Excavation cuts this by 20% per level.

The hole is real and it stays. Each metre you dig also cuts a step toward you, so the hole is a **stepped trench**
that anyone can walk into and out of. The trench is about 4 m wide, because the ground cannot show a narrower hole.
A cache 3 m deep leaves a trench about 4 m long with 1 m steps.

Digging that stops halfway leaves the hole as deep as it got. Anyone can come back and keep digging from there.

When the trench reaches the cache, the cache opens. Its contents go into the digger's bag. What does not fit falls
to the ground.

# Treasure Sense and Treasure Maps

[Treasure Sense](/docs/mechanics/master/survival-tree/#skill-treasure-sense) finds caches nearby. For 60 s the
caster sees a faint shimmer on the ground above each cache in range. A popup, like the one of Track Reading, says
how many there are and where the nearest lies. Higher levels also tell the depth and the richness.

A Prospector who does not want to dig can sell the spot instead.
[Treasure Map](/docs/mechanics/master/survival-tree/#skill-treasure-map) charts the nearest cache the caster sensed
in the last 10 minutes onto a sheet of blank vellum. The map shows a circle on its holder's map. The cache lies
somewhere inside it. The circle has a radius of 50 m, 25 m or 0 m by skill level. It is rolled once when the map is drawn.

When anyone digs a cache up, every map of it crumbles. Each map turns into a **crumbled treasure map**, so its owner
knows the treasure is gone and does not wonder where the map went.
