---
title: Resources
weight: 600
description: This page explains the types, uses, and mechanics of resources in the game, including gathering and recycling.
---


Resources are raw materials used to sell to other players. They can be used to craft items or construct buildings.
Resources can be obtained by the following means:

* Killing enemies and loot them.
* Gathering of natural resources in the game world.
* Using special extracting buildings or devices.
* Recycling of existing items.

{{< alert context="info" text="The item loot from monster should be somewhat logcal: a dead wolve would very likely not drop iron ore or golden coins." />}}

Dropped items in the world are semi-permanent. The player have a strong incentive to gather dropped items to participate in the market.

{{< alert context="info" text="Dropped items usually persist for up to 4 days (96 h real time) before they are deleted by the server." />}}

The resource system of Bestia consists roughly of three tiers:

1. Raw materials
2. Refined crafting raw materials
3. Crafted Items

Where as usually the first must be found and gathered in the world, refined by certain players into the 2nd tier and lastely forged or crafted into usable items like equipment or weapons.

# Resource Types

The following base types of resources exist in the game.

{{< table >}}

| Typ      | Biome Occurrence           | Usage                            |
| -------- | -------------------------- | -------------------------------- |
| Ores     | Mountains, Sea, Caves      | Alchemy, Blacksmiths             |
| Minerals | Mountains, Sea, Caves      | Alchemy, Blacksmiths, Magic Uses |
| Crystals | Mountains, Sea, Caves      | Magical Uses                     |
| Mana     | World                      | Magical Uses                     |
| Herbs    | World, especially Forrests | Magical Uses & Alchemy           |
| Wood     | Forrests                   | Material                         |
| Stone    | Mountains                  | Material                         |

{{< /table >}}

## List of Resources

{{< table >}}

| Name                | Type    | Description                                                       |
| ------------------- | ------- | ----------------------------------------------------------------- |
| Tin Ore             | Ore     |                                                                   |
| Iron Ore            | Ore     |                                                                   |
| Copper Ore          | Ore     |                                                                   |
| Silver Ore          | Ore     | Used for crafting                                                 |
| Gold Ore            | Ore     | Used for crafting and money creation                              |
| Palladium Ore       | Ore     |                                                                   |
| Mithril Ore         | Ore     | Used for magic artefacts                                          |
| Adamantium Ore      | Ore     | Hardest material known, used for various items                    |
| Steel Bar           | Metal   |                                                                   |
| Silver Bar          | Metal   |                                                                   |
| Gold Bar            | Metal   |                                                                   |
| Platin Bar          | Metal   |                                                                   |
| Mana Essence        | Mana    | Mana sludge. Raw material for mana infused crystals.              |
| Pure Mana Essence   | Mana    | More pure mana sludge. Raw material for mana infused crystals.    |
| Mana Concentrate    | Mana    | Concentrated mana sludge. Raw material for mana infused crystals. |
| Blue Mana Chrystal  | Mana    | Used for magic artefacts. Quite a common crystal.                 |
| Yellow Mana Crystal | Mana    | Used for magic artefacts. Quite rare.                             |
| Red Mana Crystal    | Mana    | Used for magic artefacts. Very rare.                              |
| Salt                | Mineral |                                                                   |
| Wood                | Wood    | Standard bulding material.                                        |
| Stone               | Stone   | Standard building material.                                       |
| Marble              | Stone   | High quality building material.                                   |
| Obsidian            | Stone   | A glass like very hard material.                                  |

{{< /table >}}

In Bestia Mana is considered a resource. It permeates the land and there are regions with different concentration levels. As higher mana levels usually means more unstable biomes it is up to the player to "harvest" mana and specialize in the extraction of this resource. Usually you would infuse gels with it which then can be used to create powerful mana crystals which have various other usages.

# Refining

Steel for example can be refined from iron ore together with charcoal inside a furnace.
Ore must be processed into metal bars before they are usable. This processing usually means you need a furnace and ideally a Master with the skill `Ore Refining` to increase the yield.

# Item Recycling

For each item is a list of base resources which the item is roughly based upon (this list is also used when forging or creating the item). When an attempt to recycle the item there is a chance that the item is destroyed and the resources are lost. The skill `Recycling Expert` can increase success chance.

The base chance for item recycling is:

| Item Lv. | Successful Recycle Probability |
| -------- | ------------------------------ |
| 1 - 20   | 70%                            |
| 21 - 60  | 50%                            |
| > 61     | 30%                            |

The chance can be altered by players INT (slightly) and DEX and also by the apropriate skill:

```kotlin
  P_total = P_base + INT / 40 + DEX / 20 + P_skill
```

If successfull performed a recycling attempt the amount of captured resources is determined:

| Item Lv. | Base Resource Reclaim |
| -------- | --------------------- |
| 1 - 20   | 70%                   |
| 21 - 60  | 50%                   |
| > 61     | 30%                   |

This is the base probability which is altered by the aprobiate skill as well as INT (slightly) and DEX.

```kotlin
  P_total = P_base + INT / 40 + DEX / 20 + P_skill
```
