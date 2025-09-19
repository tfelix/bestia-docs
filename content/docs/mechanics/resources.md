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

{{< alert context="info" text="The item loot from monster should be somewhat logcal: a dead wolve would very likly not drop iron ore or golden coins." />}}

Dropped items in the world are semi-permanent. The player have a strong incentive to gather dropped items to participate
in the market.

{{< alert context="info" text="Dropped items usually persist for up to 4 days (96 h real time) before they are deleted by the server." />}}

## Mana

Mana pervades the world. The concentration of mana flows is redefined in each incarnation of Bestias plays. Mana concentration is used, among other things, to determine how quickly the Bestia regenerate mana in a particular area. Mana is a two-edged-sword: As resource its quite valuable but concentrating it in a small area can lead to magic build up and lead to magic-storms or even rift events which will attract strong Bestias. In areas with high concentration magical artifacts can be built, powerful rituals can be held and mana can be "harvested" to transport it for research purposes.

The mana value of an area is calculated in fixed intervals with a discrete diffusion simulation and depends on how many spells were used in a certain interval or the presence of mana emitter or sinks.

## Resource Types

The following base types of resources exist in the game.

{{< table >}}

| Typ                | Occurrence                 | Usage                            |
| ------------------ | -------------------------- | -------------------------------- |
| Ores               | Mountains, Sea, Caves      | Alchemy, Blacksmiths             |
| Minerals, Crystals | Mountains, Sea, Caves      | Alchemy, Blacksmiths, Magic Uses |
| Crystals           | Mountains, Sea, Caves      | Magic Uses                       |
| Mana               | World                      | Magical Uses                     |
| Herbs              | World, especially Forrests | Magic Uses & Alchemy             |
| Wood               | Forrests                   | Material                         |
| Stone              | Mountains                  | Material                         |

{{< /table >}}

## List of Resources

{{< table >}}

| Name                 | Type      | Description                                    |
| -------------------- | --------- | ---------------------------------------------- |
| Iron Ore             | Ore       |                                                |
| Copper Ore           | Ore       |                                                |
| Mercury Ore          | Ore       |                                                |
| Palladium Ore        | Ore       |                                                |
| Mithril Ore          | Ore       | Used for magic artefacts                       |
| Adamantium Ore       | Ore       | Hardest material known, used for various items |
| Silver Bar           | Metal     |                                                |
| Gold Bar             | Metal     |                                                |
| Platin Bar           | Metal     |                                                |
| Blue Mana Christal   | Mana      | Used for magic artefacts. A common crystal.    |
| Yellow Mana Christal | Mana      | Used for magic artefacts. Quite rare.          |
| Red Mana Christal    | Mana      | Used for magic artefacts. Very rare.           |
| Salt                 | Mineral   |                                                |
| Wood                 | Wood      | Standard bulding material.                     |
| Stone                | Mountains | Standard building material.                    |
| Marble               | Mountains | High quality building material.                |

{{< /table >}}

Steel for example can be refined from iron ore together with charcoal.

### Refining

Ore must be processed into metal bars before they are usable. This processing usually means you need a furnace and ideally a Master with the skill `Ore Refining` to increase the yield.

## Item Recycling

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
