---
title: Resources
weight: 600
description: This page explains the types, uses, and mechanics of resources in the game, including gathering and recycling.
---


Resources are raw materials that can be sold to other players. They can also be used to craft items or construct buildings.
Resources can be obtained by the following means:

* Killing enemies and looting them.
* Gathering natural resources in the game world.
* Using special extracting buildings or devices.
* Recycling existing items.

{{< alert context="info" text="The loot from monsters should be somewhat logical: a dead wolf would very likely not drop iron ore or golden coins." />}}

Dropped items in the world are semi-permanent. Players have a strong incentive to gather dropped items to participate in the market.

{{< alert context="info" text="Dropped items usually persist for up to 4 days (96 h real time) before they are deleted by the server." />}}

The resource system of Bestia consists roughly of three tiers:

1. Raw materials
2. Refined crafting raw materials
3. Crafted Items

Whereas the first tier must usually be found and gathered in the world, it is then refined by certain players into the 2nd tier and lastly forged or crafted into usable items like equipment or weapons.

# Resource Types

The following base types of resources exist in the game.

{{< table >}}

| Type     | Biome Occurrence          | Usage                            |
| -------- | ------------------------- | -------------------------------- |
| Ores     | Mountains, Sea, Caves     | Alchemy, Blacksmiths             |
| Minerals | Mountains, Sea, Caves     | Alchemy, Blacksmiths, Magic Uses |
| Crystals | Mountains, Sea, Caves     | Magical Uses                     |
| Mana     | World                     | Magical Uses                     |
| Herbs    | World, especially Forests | Magical Uses & Alchemy           |
| Wood     | Forests                   | Material                         |
| Stone    | Mountains                 | Material                         |

{{< /table >}}

## List of Resources

The **Type** column reuses the base resource types listed above, plus the refined categories they become. `Metal` is not a raw type found in a biome: metal bars are the refined (tier 2) form of the corresponding ore — iron becomes steel, gold ore becomes gold bars, and so on.

{{< table >}}

| Name                | Type    | Description                                                                                 |
| ------------------- | ------- | ------------------------------------------------------------------------------------------- |
| Tin Ore             | Ore     | A soft, low-melting ore. Alloyed with copper for bronze and basic crafting.                 |
| Iron Ore            | Ore     | The workhorse ore of any smith. Smelted into steel for weapons, armor and tools.            |
| Copper Ore          | Ore     | A reddish-brown ore that can be refined into copper. Used for forging and crafting.         |
| Silver Ore          | Ore     | Used for crafting.                                                                          |
| Gold Ore            | Ore     | Used for crafting and money creation.                                                       |
| Palladium Ore       | Ore     | A precious metallic ore with excellent catalytic properties. Used for high-end equipment.   |
| Mithril Ore         | Ore     | Used for magic artefacts.                                                                   |
| Adamantium Ore      | Ore     | Hardest material known, used for various items.                                             |
| Mercury Ore         | Ore     | A rare silvery ore containing mercury. Used for advanced alchemy and magical crafting.      |
| Steel Bar           | Metal   | Refined from iron ore and charcoal in a furnace. The staple metal for weapons and armor.    |
| Silver Bar          | Metal   | A refined silver ingot with excellent conductivity. Used for crafting and magical purposes. |
| Gold Bar            | Metal   | A valuable refined gold ingot. Highly sought after for crafting and trade.                  |
| Platin Bar          | Metal   | A precious refined platinum ingot. Used for premium crafting and magical applications.      |
| Mana Essence        | Mana    | Raw mana-bearing powder. Fed into a Mana Harvester to grow mana crystals.                   |
| Pure Mana Essence   | Mana    | A purer grade of mana powder. Yields higher-quality mana crystals.                          |
| Mana Concentrate    | Mana    | Highly concentrated mana powder. Raw material for the finest mana crystals.                 |
| Mana Dust           | Mana    | Fine, faintly glowing dust of condensed mana. Empowers Bestia traps and ritual crafting.    |
| Blue Mana Crystal   | Mana    | Used for magic artefacts. Quite a common crystal.                                           |
| Yellow Mana Crystal | Mana    | Used for magic artefacts. Quite rare.                                                       |
| Red Mana Crystal    | Mana    | Used for magic artefacts. Very rare.                                                        |
| Rough Gemstone      | Crystal | Uncut gemstones pried from mineral veins. Cut and faceted for use in socketed equipment.    |
| Salt                | Mineral | Common mineral salt. Used for food preservation and various crafting recipes.               |
| Clay                | Mineral | Smooth, earthy clay dug from riverbanks. Shaped into bricks, pottery and magical seals.     |
| Medicinal Herb      | Herb    | A common healing herb gathered in the wild. A base ingredient for many potions.             |
| Mana Herb           | Herb    | A mana-touched herb found in high-mana regions. Used in more potent alchemical brews.       |
| Wood                | Wood    | Standard building material.                                                                 |
| Stone               | Stone   | Standard building material.                                                                 |
| Marble              | Stone   | High quality building material.                                                             |
| Obsidian            | Stone   | A glass-like, very hard material.                                                           |

{{< /table >}}

In Bestia, Mana is considered a resource. It permeates the land, and there are regions with different concentration levels. As higher mana levels usually mean more unstable biomes, it is up to the player to "harvest" mana and specialize in the extraction of this resource. The raw material is a mana-bearing powder (the Mana Essences listed above); when fed into a Mana Harvester it slowly grows into a mana crystal as the device draws mana from the surrounding environment. Mana crystals can also be found directly in the world, for example while mining. These crystals have various powerful magical usages.

# Refining

Steel for example can be refined from iron ore together with charcoal inside a furnace.
Ore must be processed into metal bars before they are usable. This processing usually means you need a furnace and ideally a Master with the skill [Ore Refinement](/docs/mechanics/master) to increase the yield.

# Item Recycling

For each item there is a list of base resources which the item is roughly based upon (this list is also used when forging or creating the item). When an attempt is made to recycle the item, there is a chance that the item is destroyed and the resources are lost. The skill [Scavenger](/docs/mechanics/master) can increase the success chance.

The base chance for item recycling is:

| Item Lv. | Successful Recycle Probability |
| -------- | ------------------------------ |
| 1 - 20   | 70%                            |
| 21 - 60  | 50%                            |
| > 60     | 30%                            |

The chance can be altered by the player's INT (slightly) and DEX and also by the appropriate skill:

```kotlin
  P_total = P_base + INT / 40 + DEX / 20 + P_skill
```

If a recycling attempt is performed successfully, the amount of captured resources is determined:

| Item Lv. | Base Resource Reclaim |
| -------- | --------------------- |
| 1 - 20   | 70%                   |
| 21 - 60  | 50%                   |
| > 60     | 30%                   |

The amount reclaimed is driven by the care taken while stripping the item apart rather than by raw knowledge, so `DEX` carries the most weight, `WIL` (steady focus) contributes a little, and the appropriate skill adds a flat bonus:

```kotlin
  R_total = R_base + DEX / 15 + WIL / 30 + R_skill
```
