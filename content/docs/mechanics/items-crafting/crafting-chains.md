---
title: Crafting Chains
weight: 512
description: How a raw material becomes a crafting material, and which station, skill and tier each step needs.
---

Every crafting material reaches a player in one of two ways, and then goes into gear in a third step.

1. **Direct.** A bestia drops it, or a player gathers or mines it, and it is ready to use: a fang, a herb, a mana
   crystal, a dragon scale.
2. **Refined.** A bestia drops or the ground gives a **precursor**, and a player refines it at a **station** into the
   material: hide becomes leather at a tanning rack, sand and coal become glass at a glass furnace.
3. **Assembled.** Finished materials go into gear at a [forge](/docs/mechanics/items-crafting/crafting-stations/) (when the main
   material is metal) or at a workbench (everything else).

```text
raw, dropped or gathered  --[ station + recipe ]-->  material  --[ forge or workbench ]-->  gear
```

The chains are kept short on purpose. Sand makes glass; later, quartz sand can make a finer glass. A glassblowing
bench turns glass into bottles and lenses. That is the level of depth every family has.

The page [Crafting Chains, Generated](/docs/mechanics/items-crafting/crafting-chains-generated/) draws every chain per station from
the game's own data, so it is always current. This page is the rules behind it.

## Stations

Building a station is [Carpentry](/docs/mechanics/master/craftsman-tree/#skill-carpentry), from a kit. The one exception is the
workbench kit, which every master can make without any skill. Running a station is a separate question.

{{< table >}}

| Station            | Makes                                                                        | Skill to run it              |
| ------------------ | ---------------------------------------------------------------------------- | ---------------------------- |
| Furnace            | Ingots and alloys from ore, brick from clay                                  | Ore Refinement               |
| Forge              | Gear with a metal main material, cogs, nails                                 | Forge Weapon, Forge Armor    |
| Workbench          | Planks, cut stone, parchment, mana paper, lamp oil, ink, dye, poison, holy water, mana ink, gear with another material | none for materials           |
| Tanning Rack       | Leather, hardened leather, fine leather                                      | none                         |
| Loom               | Cloth, rope, silk cloth, shadowsilk, starweave                               | none                         |
| Glass Furnace      | Glass                                                                        | none                         |
| Glassblowing Bench | Bottles, lenses                                                              | none                         |

{{< /table >}}

"None" is the basic skill, which every master has. Ore Refinement is what lets you run a furnace at all, and its
ranks raise the yield.

All weapons, bows, crossbows and tomes included, are made with **Forge Weapon**. All armor, cloth included, is made
with **Forge Armor**. Accessories, faces and lanterns are Forge Armor.

## What gates a tier

The stations that need no skill do not gate a tier by skill. The **inputs** do. Shadowsilk needs a shadow shard or
an ectoplasm, starweave needs mana concentrate, blackiron needs steel and a shadow shard, and the clockwork core
needs quicksilver and a mana crystal. Smelting is gated by Ore Refinement: a higher ore needs a higher rank, and
fails more often.

## Refining is not discovered

Refining recipes are not discovered by experiment. Every master knows them from the start. The reason is how
[discovery](/docs/mechanics/items-crafting/crafting/#discovery-learning-a-blueprint) works: a recipe can only be discovered when
every input has coordinates in the feature space, and a **raw ore or hide has none**. Only materials meant for
assembly carry them. So a refining recipe has no point to find, and smelting really has "nothing to discover".

## The materials, by family

Levels are the item level. Each tier of a family leans on different axes, so recipes built from neighbouring tiers
land on different points and a player can tell them apart.

{{< table >}}

| Family  | Tiers (low to high)                                                                                     |
| ------- | ------------------------------------------------------------------------------------------------------- |
| Metal   | tin 5, copper 10, bronze 15, iron 20, steel 32, silver 38, gold 50, quicksilver 60, blackiron 65, palladium 70, mithril 85, adamantium 100 |
| Wood    | plank 5, yew billet 20, ironwood 45, heartwood 80                                                       |
| Leather | leather 5, hardened leather 22, fine leather 35, drake hide 55, dragon scale 75                         |
| Cloth   | cloth 5, silk cloth 35, shadowsilk 60, starweave 80                                                     |
| Mana    | mana essence 5, mana dust 15, mana concentrate 20, pure mana essence 30, blue, yellow and red crystal, star core 80 |
| Gems    | amethyst 20, garnet 30, jade 33, tiger's eye 37, emerald 40, sapphire 45, ruby 60, onyx 65, opal 66, pyrelith 80, diamond 100 |
| Paper   | parchment 5, mana ink 35, mana paper 60                                                                 |
| Glass   | glass 8, lens 30                                                                                        |

{{< /table >}}

Two ore make one ingot, and an alloy takes two ingots. How many a station makes at once is the station's queue, not
the recipe.

## Where Materials Come From

Anything no recipe makes has to be handed out by the world. `CraftingChainTest` fails a raw material that nothing does,
so the generated page never lists one.

{{< table >}}

| Source                      | What it gives                                                                                              |
| --------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Ore veins                   | copper, tin, iron, silver, gold and mithril ore; the rough amethyst, emerald, ruby, pyrelith and diamond                     |
| A host ore, rarely          | palladium (in copper), mercury (in silver), adamantium (in mithril), sapphire (in ruby), garnet, tiger's eye and lodestone (in iron), onyx and opal (in amethyst), jade (in emerald) |
| Obsidian                    | every obsidian voxel is a piece of obsidian                                                                |
| Plain rock                  | about 1 voxel in 200 gives a pinch of sand                                                                   |
| Beaches, and the deserts    | piles of sand lying on the ground                                                                          |
| Fishing                     | coral, besides the rough gems and the pearl                                                                |
| Bestias                     | the creature parts, the hardwoods (from treants), drake hide and wyrm bone, storm feathers, thornvine, glowcap, deathcap, mana essence and concentrate |

{{< /table >}}

The rare lumps are held against the miner's Mining rank like any ore, so a novice breaking copper never walks away with
palladium. Whether one drops is a hash of the voxel, not a roll, so breaking and refilling the same voxel gives nothing new.
Gold is left out entirely: what a gold voxel yields sizes the coin supply.

## Gear

Every piece of the equipment catalogue is made from a main material, a kit and a signature, see
[How a Piece is Made](/docs/mechanics/items-crafting/equipment-design/#how-a-piece-is-made). Weapons are Forge Weapon and armour is
Forge Armor, at the forge when the main material is metal and at the workbench otherwise. Their recipes sit in the
generated page below the others.
