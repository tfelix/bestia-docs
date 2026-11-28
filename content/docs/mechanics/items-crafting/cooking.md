---
weight: 615
title: Cooking
description: Meals, the Satisfied buff they leave, where their ingredients come from, and what work costs a bestia.
---

A meal is buff food. It is cooked at a burning [campfire](/docs/mechanics/items-crafting/crafting-stations/#campfires)
with the [Cooking](/docs/mechanics/master/novice-tree/#skill-cooking) skill. Each one restores some health and
stamina and then leaves its eater **Satisfied** for a while. Satisfied always speeds up stamina regeneration and adds
one or two bonuses of its own.

Meals matter most for bestias that work. Gathering, mining and crafting at a station all cost a bestia stamina (see
[Work Fatigue](#work-fatigue)), and a well-fed worker stays at it longer.

# Eating

- Using a meal takes **6 s** and shows on the cast bar, like a craft.
- Moving, taking a hit, or being stunned or frozen breaks it off. The meal stays in the bag.
- Only when the 6 s are through is the meal taken from the bag. Then it restores its health and stamina and lays
  on **Satisfied**.
- A bestia eats on its own when its stamina falls below its eating line (40 % unless its orders say otherwise).
  It reaches for a meal first when it is not Satisfied, and saves its meals for later when it is.

## Satisfied

- There is only ever **one** Satisfied. Eating again before it runs out replaces it whole: the new meal's bonuses
  and the new meal's duration, even if that is shorter than what was left.
- It stays on through a logout.
- Its tooltip names the meal behind it and what that meal grants.
- A meal may also lay on other effects next to Satisfied. Each of those follows its own rules. The Frost-Mint Tea
  Cake warms its eater against the cold, and the Date-Stuffed Eel cools against the heat.

Every meal's Satisfied speeds up stamina regeneration by its level band, and lasts as long:

| Meal level | Stamina regeneration | Duration |
| ---------- | -------------------- | -------- |
| 1 - 20     | +10 %                | 15 min   |
| 21 - 40    | +20 %                | 20 min   |
| 41 - 60    | +30 %                | 30 min   |
| 61 - 80    | +40 %                | 45 min   |
| 81+        | +50 %                | 60 min   |

What a meal restores on the spot grows with its level, from `40` health and `40` stamina at level 0 by
`10` health and `3.1` stamina per level: `1190` health and `396` stamina at level 115.

# Learning Recipes

Only the Hearty Stew is known from the start. Every other meal is a recipe to
[discover](/docs/mechanics/items-crafting/crafting/#discovery-learning-a-blueprint) at a campfire, by mixing ingredients the way a
craftsman discovers a blueprint. Every ingredient has a place in the feature space: meat is heavy and restorative,
jelly is fluid, spices are keen, and the rare things from far biomes and great beasts are charged.

The chance to learn a recipe is `(10 * Cooking level / meal level)²`. A cook at Cooking 3 learns every meal up to
level 30 on the first try, a level 60 meal one time in four, and a level 100 meal one time in eleven. What really
gates a high meal is its ingredients.

| Meal level | Craft time | Base success |
| ---------- | ---------- | ------------ |
| any        | `4 + 0.15 * level` s | `0.9 - 0.008 * level` |

Cooking's ranks, DEX and WIL add to the success chance as for every craft.

# The Meals

| #  | Meal | Lv | Ingredients | Satisfied |
| -- | ---- | -- | ----------- | --------- |
| 1 | Hearty Stew | 1 | apple ×2, jelly | +2 VIT |
| 2 | Grilled Skewer | 2 | raw meat ×2, wild onion | +5 % speed off the road |
| 3 | Jelly Dumplings | 2 | jelly ×2, grain | +3 % healing received |
| 4 | Garlic Fish | 3 | raw fish, wild garlic | +3 HIT |
| 5 | Rat-Grain Porridge | 3 | grain ×3, apple | skills cost 10 % less stamina |
| 6 | Fried Egg & Herbs | 4 | speckled egg, wild herb | +2 HP regeneration |
| 7 | Crab-Claw Broth | 5 | crab claw, salt, sea kelp | +5 % water resistance |
| 8 | Mushroom Pan | 5 | field mushroom ×2, raw meat | +2 INT, +2 mana regeneration |
| 9 | Sweetroot Mash | 7 | sweetroot ×2, jelly | 15 % less stamina lost to work, weather and the road |
| 10 | Berry Tart | 8 | bramble berries ×2, grain, nectar drop | +2 AGI |
| 11 | Garlic Snails | 9 | snail meat ×2, wild garlic | +10 % poison resistance |
| 12 | Smoked Perch | 10 | perch, salt | +5 % carry capacity |
| 13 | Puffcap Risotto | 14 | puffcap cap, marsh rice, wild herb | +3 WIL |
| 14 | Cranberry Boar Roast | 16 | raw meat ×2, bog cranberry ×2 | +3 STR |
| 15 | Crispy Scorpion | 18 | scorpion tail ×2, wild onion | +3 CRIT |
| 16 | Bream Rice Bowl | 20 | bream, marsh rice, sea kelp | +5 % carry capacity, 5 % less stamina lost to work, weather and the road |
| 17 | Venison Pie | 22 | venison ×2, grain ×2, field mushroom | +4 VIT, +3 % max HP |
| 18 | Frost-Mint Tea Cake | 24 | frost mint, grain, nectar drop | +10 % water resistance, 10 % less stamina lost to work, weather and the road; warms against the cold |
| 19 | Peppered Pike | 26 | pike, peppercorn | +5 HIT, +3 FLEE |
| 20 | Yak Butter Bread | 28 | yak butter, grain ×2, salt | 25 % less stamina lost to work, weather and the road |
| 21 | Veil-Jelly Aspic | 30 | veil jelly ×2, frost mint | +5 % max mana, +4 mana regeneration |
| 22 | Mutton Hotpot | 32 | mountain mutton ×2, wild garlic, sweetroot | +10 % carry capacity |
| 23 | Date-Stuffed Eel | 34 | eel, desert date ×2 | +10 % fire resistance; cools against the heat |
| 24 | Cinnamon Honeycakes | 36 | honeycomb, cinnamon bark, grain | +4 DEX, 5 % faster casting |
| 25 | Blubber Stew | 38 | seal blubber, sea kelp, salt | HP and mana keep regenerating in combat |
| 26 | Lava-Jelly Flambé | 40 | magma jelly, ember chili | +8 % damage against earth creatures |
| 27 | Royal Jelly Custard | 42 | royal jelly, speckled egg, nectar drop | +3 to every attribute |
| 28 | Smoked Salmon Plate | 44 | salmon, frost mint | +6 WIL, +5 % healing received |
| 29 | Croc-Tail Gumbo | 46 | croc tail, marsh rice, peppercorn | +10 % poison and bleeding resistance |
| 30 | Sunmane Steak | 48 | sunmane flank, ember chili, salt | +6 STR, +3 % attack speed |
| 31 | Cloudberry Parfait | 50 | cloudberry ×2, yak butter | creatures notice you 15 % closer |
| 32 | Truffle Venison | 54 | venison, black truffle, wild herb | +5 catch chance when taming |
| 33 | Queen's Honey Glaze | 56 | queen's honey, sturgeon | 40 % less stamina lost to work, weather and the road, +10 % carry capacity |
| 34 | Thunder-Egg Soufflé | 60 | thunder egg, vanilla pod, yak butter | +8 AGI, +10 % speed off the road |
| 35 | Drake Steak Diane | 64 | drake steak, saffron thread, frost marrow | +6 % max HP, +8 VIT |
| 36 | Serpent Sushi | 70 | serpent fillet, marsh rice, moonscale | +8 DEX, +8 HIT |
| 37 | Hydra Heart Ragout | 76 | hydra heart, black truffle, ember chili | 1 % of damage dealt heals you |
| 38 | Wyvern Wellington | 82 | wyvern tenderloin, ember gland, saffron thread | +10 STR, +10 % fire and water resistance |
| 39 | Lotus Leviathan Broth | 100 | deepmaw, starlight lotus, leviathan steak | +10 % max HP and mana, skills cost 20 % less stamina |
| 40 | Phoenix Feast | 115 | phoenix egg, ambrosia bloom, behemoth rib | +10 to every attribute, HP and mana keep regenerating in combat |

Every meal up to level 20 is cooked from what a new master finds early: drops of bestias up to level 15, forage an
untrained herbalist may pick, and fish a willow rod lands.

# Ingredients

## Forage Patches

A forage patch is a low, reddish tuft that grows among the herbs, about one herb in four on ground that is not
blighted. It is picked like a herb and grows back after 15 min. What it yields depends on the biome it grows in: one
item drawn by weight, and with a 35 % chance a second. Only what the picker's
[Herbalism](/docs/mechanics/master/craftsman-tree/#skill-herbalism) reaches is in the draw: level 10 untrained, then 20 per rank. A
biome with nothing in reach yields nothing.

| Biome | Forage (weight) |
| ----- | --------------- |
| Temperate forest | wild garlic (30), field mushroom (30), sweetroot (20), wild herb (15), bramble berries (15), apple (10) |
| Temperate rainforest | field mushroom (35), wild herb (20), bramble berries (15), black truffle (4) |
| Grassland | wild onion (30), grain (25), wild garlic (20), wild herb (15) |
| Dryland | wild onion (30), grain (20), desert date (10), saffron thread (3) |
| Desert | desert date (30), wild onion (15) |
| Cold desert | wild onion (15), saffron thread (5) |
| Riparian | sweetroot (25), marsh rice (25), wild herb (15) |
| Lake shore | wild herb (20), starlight lotus (5) |
| Beach | sea kelp (40), salt (20) |
| Bog | bog cranberry (40), wild herb (10) |
| Swamp | marsh rice (30), bog cranberry (20) |
| Tundra | frost mint (30), wild herb (10) |
| Taiga | frost mint (25), bramble berries (20), field mushroom (15) |
| Alpine | cloudberry (30), wild herb (15) |
| Tropical seasonal forest | peppercorn (30), cinnamon bark (20), apple (15), grape (15) |
| Tropical rainforest | cinnamon bark (20), grape (20), vanilla pod (5) |
| Volcanic field | ember chili (30) |
| Badlands | ember chili (20), wild onion (10) |
| Geothermal basin | wild herb (20), ambrosia bloom (4) |

| Forage | Level |
| ------ | ----- |
| wild garlic, wild onion | 1 |
| field mushroom | 3 |
| sweetroot | 5 |
| sea kelp | 6 |
| bog cranberry | 8 |
| marsh rice | 9 |
| frost mint | 22 |
| peppercorn | 25 |
| desert date | 30 |
| cinnamon bark | 34 |
| ember chili | 42 |
| cloudberry | 46 |
| black truffle | 52 |
| vanilla pod | 58 |
| saffron thread | 66 |
| starlight lotus | 80 |
| ambrosia bloom | 100 |

## Bestia Drops

| Ingredient | Level | Dropped by | Chance |
| ---------- | ----- | ---------- | ------ |
| speckled egg | 2 | Pecklet | 25 % |
| crab claw | 4 | Shellsnip | 25 % |
| nectar drop | 6 | Buzzlet | 20 % |
| snail meat | 7 | Bogsnail | 25 % |
| puffcap cap | 10 | Puffcap | 25 % |
| scorpion tail | 12 | Stingtail | 20 % |
| venison | 20 | Tallhorn, Mossback Stag | 25 % |
| yak butter | 25 | Woolhorn Yak | 20 % |
| veil jelly | 26 | Jellyveil | 25 % |
| mountain mutton | 29 | Crag Ram | 30 % |
| seal blubber | 34 | Tuskseal | 25 % |
| croc tail | 37 | Mudjaw | 25 % |
| magma jelly | 39 | Magmaslug | 30 % |
| royal jelly | 42 | Blob Queen | 100 % |
| sunmane flank | 44 | Sunmane | 25 % |
| queen's honey | 54 | Hive Queen | 100 % |
| thunder egg | 55 | Stormstrider | 15 % |
| frost marrow | 60 | Rimehulk Yeti | 20 % |
| drake steak | 62 | Geyser Drake | 25 % |
| serpent fillet | 70 | Brineserpent | 25 % |
| hydra heart | 75 | Hydra | 10 % |
| wyvern tenderloin | 78 | Frost Wyvern, Canyon Wyvern | 20 % |
| ember gland | 79 | Salamander | 20 % |
| phoenix egg | 105 | Ember Phoenix | 100 % |
| leviathan steak | 112 | Leviathan | 100 % |
| behemoth rib | 120 | Behemoth | 100 % |

Raw meat (Moonhop, Burrow Boar, Puddlehop), jelly (Blob), raw fish (Splashfin, Shellsnip), grain (Fieldrat) and salt
(Shellsnip) come from the first bestias a master meets. The Moonhop drops raw meat at 30 % and the Blob jelly at
25 %, so the first meals are not a grind. Fish come from [fishing](/docs/mechanics/items-crafting/fishing/).

# Work Fatigue

An owned bestia pays stamina for its work. Its stamina drain reduction, from a worker's meal or a tough body, takes
its share off, as for the weather, but a piece of work always costs at least `1`.

| Work | Stamina |
| ---- | ------- |
| picking a prop (herb, forage patch, stick, stone ...) | 2 |
| mining a voxel out of a shaft | 3 |
| making an item at a station | 1 per 10 s it took |

A master's own work costs no stamina.
