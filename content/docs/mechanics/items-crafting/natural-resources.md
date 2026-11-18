---
title: Resources
weight: 600
description: This page explains the types, uses, and mechanics of resources in the game, including gathering and recycling.
---

Resources are raw materials that can be sold to other players. They can also be used to craft items or construct buildings.
Resources can be obtained by the following means:

- Killing enemies and looting them.
- Gathering natural resources in the game world.
- Using special extracting buildings or devices.
- Recycling existing items.

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

| Type                          | Biome Occurrence          | Usage                            |
| ----------------------------- | ------------------------- | -------------------------------- |
| Ores                          | Mountains, Sea, Caves     | Alchemy, Blacksmiths             |
| Minerals                      | Mountains, Sea, Caves     | Alchemy, Blacksmiths, Magic Uses |
| Crystals                      | Mountains, Sea, Caves     | Magical Uses                     |
| Mana                          | World                     | Magical Uses                     |
| Herbs                         | World, especially Forests | Magical Uses & Alchemy           |
| {{< item "log" >}}            | Forests                   | Material                         |
| {{< item "quarried_stone" >}} | Mountains                 | Material                         |

{{< /table >}}

## List of Resources

The **Type** column reuses the base resource types listed above, plus the refined categories they become. `Metal` is not a raw type found in a biome: ingots are the refined (tier 2) form of the corresponding ore — iron ore becomes an iron ingot and then steel, gold ore becomes a gold bar, and so on.

The [Item Database](/docs/mechanics/items-crafting/item-database/) has the in-game numbers of each: [ores](/docs/mechanics/items-crafting/item-database/?category=ore), [metals](/docs/mechanics/items-crafting/item-database/?category=metal),
[gems](/docs/mechanics/items-crafting/item-database/?category=gem), [herbs](/docs/mechanics/items-crafting/item-database/?category=herb) and [wood](/docs/mechanics/items-crafting/item-database/?category=wood).

{{< table >}}

| Name                                                                     | Type    | Description                                                                               |
| ------------------------------------------------------------------------ | ------- | ----------------------------------------------------------------------------------------- |
| {{< item "tin_ore" >}}                                                   | Ore     | A soft, low-melting ore. Alloyed with copper for bronze and basic crafting.               |
| {{< item "iron_ore" >}}                                                  | Ore     | The workhorse ore of any smith. Smelted into steel for weapons, armor and tools.          |
| {{< item "copper_ore" >}}                                                | Ore     | A reddish-brown ore that can be refined into copper. Used for forging and crafting.       |
| {{< item "silver_ore" >}}                                                | Ore     | Used for crafting.                                                                        |
| {{< item "gold_ore" >}}                                                  | Ore     | Used for crafting and money creation.                                                     |
| {{< item "palladium_ore" >}}                                             | Ore     | A precious metallic ore with excellent catalytic properties. Used for high-end equipment. |
| {{< item "mithril_ore" >}}                                               | Ore     | Used for magic artefacts.                                                                 |
| {{< item "adamantium_ore" >}}                                            | Ore     | Hardest material known, used for various items.                                           |
| {{< item "mercury_ore" >}}                                               | Ore     | A rare silvery ore containing mercury. Used for advanced alchemy and magical crafting.    |
| {{< item "steel_ingot" >}}                                               | Metal   | Iron ingot worked with coal in a furnace. The staple metal for weapons and armor.         |
| {{< item "silver_ingot" >}}                                              | Metal   | Refined from silver ore. Excellent conductivity, used for crafting and magical purposes.  |
| {{< item "gold_bar" >}}                                                  | Metal   | A valuable refined gold ingot. Highly sought after for crafting and trade.                |
| {{< item "palladium_ingot" >}}                                           | Metal   | Refined from palladium ore. A precious metal for delicate and costly work.                |
| {{< item "mana_essence" >}}                                              | Mana    | Raw mana-bearing powder. Fed into a Mana Harvester to grow mana crystals.                 |
| {{< item "pure_mana_essence" >}}                                         | Mana    | A purer grade of mana powder. Yields higher-quality mana crystals.                        |
| {{< item "mana_concentrate" >}}                                          | Mana    | Highly concentrated mana powder. Raw material for the finest mana crystals.               |
| {{< item "mana_dust" >}}                                                 | Mana    | Fine, faintly glowing dust of condensed mana. Empowers Bestia traps and ritual crafting.  |
| {{< item "blue_mana_crystal" >}}                                         | Mana    | Used for magic artefacts. Quite a common crystal.                                         |
| {{< item "yellow_mana_crystal" >}}                                       | Mana    | Used for magic artefacts. Quite rare.                                                     |
| {{< item "red_mana_crystal" >}}                                          | Mana    | Used for magic artefacts. Very rare.                                                      |
| [Rough Gems](/docs/mechanics/items-crafting/item-database/?category=gem) | Crystal | Amethyst, emerald, ruby, pyrelith and diamond. Cut into vessels for Bestia essences.      |
| {{< item "coal" >}}                                                      | Mineral | A black mineral fuel dug from seams. The reference fuel of every furnace.                 |
| {{< item "charcoal" >}}                                                  | Mineral | Wood burned down into fuel. Cheaper than coal, but never gets a furnace as hot.           |
| {{< item "salt" >}}                                                      | Mineral | Common mineral salt. Used for food preservation and various crafting recipes.             |
| {{< item "clay" >}}                                                      | Mineral | Smooth, earthy clay dug from riverbanks. Shaped into bricks, pottery and magical seals.   |
| {{< item "wild_herb" >}}                                                 | Herb    | The everyday herb of open ground. Anyone can pick it.                                     |
| {{< item "medicinal_herb" >}}                                            | Herb    | A healing herb of the forest floor. A base ingredient for many potions.                   |
| {{< item "mana_herb" >}}                                                 | Herb    | A mana-touched herb found in high-mana regions. Used in more potent alchemical brews.     |
| {{< item "frost_herb" >}}                                                | Herb    | A tough herb of tundra, taiga and the high mountains.                                     |
| {{< item "sun_herb" >}}                                                  | Herb    | A sun-dried herb of the desert and the badlands.                                          |
| {{< item "ghost_herb" >}}                                                | Herb    | A pale herb that only grows on blighted ground.                                           |
| {{< item "log" >}}                                                       | Wood    | Standard building material.                                                               |
| {{< item "resin" >}}                                                     | Wood    | Sticky and burnable. Lights torches and campfires.                                        |
| {{< item "quarried_stone" >}}                                            | Stone   | Standard building material.                                                               |
| {{< item "marble" >}}                                                    | Stone   | High quality building material.                                                           |
| {{< item "obsidian" >}}                                                  | Stone   | A glass-like, very hard material.                                                         |

{{< /table >}}

In Bestia, Mana is considered a resource. It permeates the land, and there are regions with different concentration levels. As higher mana levels usually mean more unstable biomes, it is up to the player to "harvest" mana and specialize in the extraction of this resource. The raw material is a mana-bearing powder (the Mana Essences listed above); when fed into a Mana Harvester it slowly grows into a mana crystal as the device draws mana from the surrounding environment. Mana crystals can also be found directly in the world, for example while mining. These crystals have various powerful magical usages.

## Herbs

Herbs grow all over the world as small plants you can pick. Most of them are wild herbs. Where the land is special,
part of the herbs there are a rarer kind:

{{< table >}}

| Herb                          | Item Level | Grows                                    | Share of the herbs there |
| ----------------------------- | ---------- | ---------------------------------------- | ------------------------ |
| {{< item "wild_herb" >}}      | 1          | Everywhere                               | The rest                 |
| {{< item "medicinal_herb" >}} | 20         | Forest floors                            | 25%                      |
| {{< item "mana_herb" >}}      | 40         | Where the mana concentration is over 60% | 30%                      |
| {{< item "frost_herb" >}}     | 60         | Tundra, taiga, cold desert, alpine       | 35%                      |
| {{< item "sun_herb" >}}       | 80         | Desert and badlands                      | 50%                      |
| {{< item "ghost_herb" >}}     | 100        | Blighted ground                          | 30%                      |

{{< /table >}}

Where two of these meet, the rarer herb wins: a blighted forest grows ghost herbs, not medicinal herbs. A picked herb
grows back after 10 minutes. [Herbalism](/docs/mechanics/master/craftsman-tree/#skill-herbalism) decides which herbs
you can pick. Without it you can only pick herbs up to level 10, which is the wild herb.

## Felling Trees

Trees are where wood comes from. A grown tree drops four logs when it is felled, and some
[resin](/docs/mechanics/items-crafting/crafting-stations/#resin).

A tree that is removed leaves a stump. It does not matter how: chopped down, burnt, or blown apart by a
spell. The stump grows back in stages, and each stage takes one real week.

| Stage      | Size                  | Logs when felled |
| ---------- | --------------------- | ---------------- |
| Stump      | Cut just above ground | Cannot be felled |
| Sapling    | About a third         | None             |
| Young tree | About two thirds      | 2                |
| Grown tree | Full                  | 4                |

A stump only sprouts if a grown tree stands within 12 m of it. If none does, it stays a stump and tries
again a week later. So a forest grows back from its edges, one ring of trees at a time. A forest that was
cut down completely never comes back.

A sapling or a young tree can be felled again. It turns back into a stump and starts over.

A tree whose ground was dug away is gone for good, stump and all. Nothing grows back over a hole.

# Refining

Ore must be processed into metal bars before it is usable — steel, for example, is refined from iron ore together with
fuel inside a {{< item "furnace_kit" "Furnace" >}}. Placing a furnace and smelting at all requires a Master
with the [Ore Refinement](/docs/mechanics/master/craftsman-tree/#skill-ore-refinement) skill; every further rank raises the odds that
a batch survives the heat.

## Ore Levels

Every ore carries an **ore level** just like any other item (see [Item Level](/docs/mechanics/items-crafting/items/#item-level)), and
that level alone decides the base chance of a smelt succeeding:

```kotlin
baseChance = 0.30 - max(0, oreLevel - 10) * 0.01
```

{{< table >}}

| Ore                           | Ore Lv. | Category  | Base Refine Chance |
| ----------------------------- | ------- | --------- | ------------------ |
| {{< item "tin_ore" >}}        | 5       | Mundane   | 30%                |
| {{< item "copper_ore" >}}     | 10      | Mundane   | 30%                |
| {{< item "iron_ore" >}}       | 20      | Mundane   | 20%                |
| {{< item "silver_ore" >}}     | 35      | Superior  | 5%                 |
| {{< item "gold_ore" >}}       | 50      | Superior  | -10%               |
| {{< item "mercury_ore" >}}    | 60      | Rare      | -20%               |
| {{< item "palladium_ore" >}}  | 70      | Rare      | -30%               |
| {{< item "mithril_ore" >}}    | 85      | Legendary | -45%               |
| {{< item "adamantium_ore" >}} | 100     | Legendary | -60%               |

{{< /table >}}

The two entry ores sit at or below Lv. 10 and share the same `30%` base chance, so a smith who has just placed their
first furnace can work tin and copper reliably from the very first rank of the skill. From there the chance erodes by
1% per ore level, turning negative at level 40 — beyond that point smelting is only worth attempting with skill ranks,
good fuel and the stats to back them up. Nothing caps this: an Epic-tier ore above Lv. 100 keeps losing another 1% per
level, so the ladder always has another rung that hurts.

## Fuel

Every smelt burns fuel alongside the ore, and a failed batch loses both.

{{< table >}}

| Fuel                    | Modifier | Notes                                                                        |
| ----------------------- | -------- | ---------------------------------------------------------------------------- |
| {{< item "coal" >}}     | ±0%      | The reference fuel. Mined from seams in mountains and caves.                 |
| {{< item "charcoal" >}} | -10%     | Burned down from wood. Cheap and craftable, but never gets a furnace as hot. |

{{< /table >}}

On top of the base chance and the fuel come the smith's
[Ore Refinement](/docs/mechanics/master/craftsman-tree/#skill-ore-refinement) rank (up to `+90%`) and their STR and WIL — see
[Ore Refinement Success Chance](/docs/mechanics/items-crafting/crafting/#ore-refinement-success-chance) for the full formula and worked
examples.

# Item Recycling

For each item there is a list of base resources which the item is roughly based upon (this list is also used when forging or creating the item). When an attempt is made to recycle the item, there is a chance that the item is destroyed and the resources are lost. The skill [Scavenger](/docs/mechanics/master/scholar-tree/#skill-scavenger) can increase the success chance.

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

The amount reclaimed is driven by the care taken while stripping the item apart rather than by raw knowledge, so `DEX` carries the most weight, `WIL` (steady focus) contributes a little, and no skill adds to it:

```kotlin
  R_total = R_base + DEX / 15 + WIL / 30
```
