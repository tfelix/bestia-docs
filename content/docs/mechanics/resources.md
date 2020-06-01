---
title: Resources
weight: 100
---
# Resources

Resources are raw materials used to sell to other players. They can be used to craft items or construct buildings.
Resources can be obtained by the following means:

* Killing enemies and loot them
* Gathering of natural resources in the game world
* Using special extracting buildings or devices
* Recycling of existing items

> The item loot from monster should be somewhat logcal: a dead wolve would very likly not drop iron ore or golden coins.

Dropped items in the world are semi-permanent. The player have a strong incentive to gather dropped items to participate
in the market.

> Dropped items usually persist for up to 4 days (96 h real time) before they are deleted by the server.

## Mana

Mana pervades the world. The concentration of mana flows is redefined in each incarnation of Bestias plays. Mana concentration is used, among other things, to determine how quickly the Bestia regenerate mana in a particular area. Mana is a two-edged-sword: As resource its quite valuable but concentrating it in a small area can lead to magic build up and lead to magic-storms or even rift events which will attract strong Bestias. In areas with high concentration magical artifacts can be built, powerful rituals can be held and mana can be "harvested" to transport it for research purposes.

## Resource Types

The following base types of resources exist in the game.

| Typ                      | Occurrence                 | Usage                                  |
| ------------------------ | -------------------------- | -------------------------------------- |
| Ores, Minerals, Crystals | Mountains, Sea, Caves      | Raffinery, Alchemy, Magic, Blacksmiths |
| Mana                     | World                      | Magical Uses                           |
| Herbs                    | World, especially Forrests | Magic Uses & Alchemy                   |
| Wood                     | Forrests                   | Material                               |
| Stone                    | Mountains                  | Material                               |

## List of Resources

| Name                 | Type      | Description                                    |
| -------------------- | --------- | ---------------------------------------------- |
| Iron Ore             | Ore       |                                                |
| Silver               | Metal     |                                                |
| Gold                 | Metal     |                                                |
| Platin               | Metal     |                                                |
| Copper Ore           | Ore       |                                                |
| Mercury Ore          | Ore       |                                                |
| Palladium Ore        | Ore       |                                                |
| Mithril Ore          | Ore       | Used for magic artefacts                       |
| Adamantium Ore       | Ore       | Hardest material known, used for various items |
| Blue Mana Christal   | Mana      | Used for magic artefacts                       |
| Yellow Mana Christal | Mana      | Used for magic artefacts                       |
| Red Mana Christal    | Mana      | Used for magic artefacts                       |
| Salt                 | Mineral   |                                                |
| Wood                 | Wood      | Standard bulding material                      |
| Stone                | Mountains | Standard building material                     |
| Marble               | Mountains | High quality building material                 |
| Slate                | Mountains | Standard building material                     |

Steel for example can be refined from iron ore.

## Item Recycling

For each item is a list of base resources which the item is roughly based upon (this list is also used when forging or
creating the item). When an attempt to recycle the item there is a chance that the item is destroyed and the resources are lost.
Some items for example

The base chance for item recylcing is:

| Item Lv. | Successful Recycle Probability |
| -------- | ------------------------------ |
| 1 - 20   | 65%                            |
| 21 - 60  | 45%                            |
| > 61     | 25%                            |

The chance can be altered by players INT (slightly) and DEX and also by the apropriate skill:

{{< katex display >}}
  P_{total} = P_{base} + \frac{INT}{40} + \frac{DEX}{20} + P_{skill}
{{< /katex >}}

If successfull performed a recycling attempt the amount of captured resources is determined:

| Item Lv. | Base Resource Reclaim |
| -------- | --------------------- |
| 1 - 20   | 80%                   |
| 21 - 60  | 60%                   |
| > 61     | 40%                   |

This is the base probability which is altered by the aprobiate skill as well as INT (slightly) and DEX.

{{< katex display>}}
  P_{total} = P_{base} + \frac{INT}{40} + \frac{DEX}{20} + P_{skill}
{{< /katex >}}
