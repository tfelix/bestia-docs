---
title: Equipment Design
weight: 520
description: How equipment is designed and balanced, and the catalogue of every piece of gear built that way.
---

This page is the rulebook for designing gear: which numbers a new weapon or piece of armor gets, which level a
player needs to wear it, and how it fits the crafting game. The [catalogue](#catalogue) at the end lists every
piece of gear designed by these rules. The catalogue in `items.yml` (ids 500 and up) is generated from it.

How a forged copy rolls its stats, and how stats turn into an item level, is on the [Forging](/docs/mechanics/items-crafting/crafting/#forging-and-random-stats)
page. This page only says what a designer puts into an item's template.

# Who Wears What

A master's professions decide which gear they can use. A master has the professions of their two strongest skill
sub-trees. Each profession allows a heaviest armor type and a list of weapon types. Every master can always use
slings, tools and cloth armor, whatever their professions.

A bestia has no professions. Only its species limits it: the slots its body has and the armor types it can carry,
see [Designing a Bestia](/docs/mechanics/bestias/bestia-design/#10-equipment).

## Equipment per Profession

| Profession | Heaviest armor | Weapon types                                               |
| ---------- | -------------- | ---------------------------------------------------------- |
| Blacksmith | Medium         | Mace, Hammer, Axe, Greataxe                                |
| Alchemist  | Light          | Dagger, Mace, Thrown                                       |
| Artificer  | Medium         | Dagger, Wand, Staff, Crossbow                              |
| Forester   | Medium         | Axe, Greataxe, Spear, Bow                                  |
| Prospector | Medium         | Sword, Spear, Crossbow                                     |
| Miner      | Medium         | Mace, Hammer, Greataxe                                     |
| Trader     | Light          | Sword, Crossbow                                            |
| Sage       | Cloth          | Wand, Staff, Tome                                          |
| Priest     | Medium         | Mace, Staff, Tome                                          |
| Wizard     | Cloth          | Wand, Staff, Tome                                          |
| Assassin   | Light          | Dagger, Fist, Sword, Thrown                                |
| Knight     | Heavy          | Sword, Greatsword, Axe, Greataxe, Mace, Hammer, Spear, Polearm |
| Brawler    | Light          | Fist, Staff                                                |
| Hunter     | Light          | Spear, Bow, Crossbow, Thrown                               |
| Bard       | Light          | Whip, Bow, Instrument                                      |

A heaviest armor type allows everything lighter as well: a Knight wears heavy, medium, light and cloth.

## Spreading Gear Evenly

Every weapon type gets about ten items, from a plain one at the bottom to a legendary at the top. A profession with
few weapon types (Trader, Brawler) still gets enough to choose from, and one with many (Knight) does not crowd
everyone else out.

Besides the type, every named item is designed for one profession, in the "For" column. That decides its fixed
stats: a Bard's whip leans on DEX and WIL, a Brawler's gauntlet on STR and VIT. Every profession gets one signature
legendary weapon. Legendary armor and accessories are shared between the professions that fit them.

# Min Level

`min-level` is the level a character needs to wear a piece of gear. Every piece of gear sets one by hand.

It is **not** the item level. A forged copy's item level rises with its rolled stats and sockets. If that decided
who can wear it, a lucky roll would lock its own maker out. So the item level decides rarity, crafting, upgrading and
repair, and `min-level` decides wearing.

Guideline:

| Item level | Min level           |
| ---------- | ------------------- |
| up to 80   | about half, so 1–40 |
| 81–100     | 60–75               |
| 101+       | 85 and up           |

So almost all gear can be worn from level 40. Only legendary and epic gear asks for more.

Stray from the guideline on purpose, never by accident:

- Plain items (Knife, Gladius, Greataxe) sit a little lower: they are where everyone starts.
- Finesse weapons and heavy pieces sit a little higher: a Rapier (item level 56, min level 30), a Windlass Arbalest
  (64, 34), the first heavy plate (Iron Plate Coat: 20, 12).

# Item Level and Base Level

A designer picks the item level a template should have **with its fixed stats**. The rarity follows from it:

| Item Level | Category  |
| ---------- | --------- |
| 1 - 20     | Mundane   |
| 21 - 50    | Superior  |
| 51 - 80    | Rare      |
| 81 - 100   | Legendary |
| 101+       | Epic      |

The `base-level` in `items.yml` is then solved backwards from the [item level formula](/docs/mechanics/items-crafting/crafting/#item-level-of-a-forged-copy):
`base = √(itemLevel² − (3 · points)²)`. The more fixed stats an item has, the lower its base level. The fixed stats
must stay worth clearly less than the item level, or no base level is left.

Watch the expensive stats. One point is one attribute, but CRIT costs a point per +1/3, so `CRIT: 4` is worth 12
points. Regeneration is cheap (5 per point) and resistances are cheap too (3 per point).

# Value Curves

The base properties (ATK, MATK, DEF, MDEF) do not raise the item level; the item level prices them. They follow
these curves, with `i` the item level.

## Weapons

| Weapon                                   | ATK    | MATK   |
| ---------------------------------------- | ------ | ------ |
| Dagger                                   | 1.7i+6 | —      |
| Fist                                     | 1.8i+8 | —      |
| One-handed sword, axe, mace, spear, whip | 2i+8   | —      |
| Greatsword, greataxe, hammer, polearm    | 2.6i+5 | —      |
| Bow                                      | 2.2i+5 | —      |
| Crossbow                                 | 2i+8   | —      |
| Sling                                    | i+4    | —      |
| Thrown                                   | 1.8i+6 | —      |
| Wand                                     | 0.4i   | 2i+10  |
| Staff                                    | i+5    | 2.6i+5 |
| Tome                                     | —      | 1.5i+8 |
| Instrument                               | 0.8i   | 1.8i+8 |

A hybrid weapon (a censer flail, a runeblade) splits about the same total between ATK and MATK. A fighting staff for
a Brawler swaps the staff's numbers around. Ranged weapons add their ammunition's attack. Range is 8–13 tiles for
slings, 9–14 for crossbows and 11–16 for bows.

## Armor

Equipment `defense` and `magic-defense` are flat percentages. So the curve is a budget for a full set, not a number
per piece. A full set at item level 100 adds up to about:

| Armor type | DEF | MDEF |
| ---------- | --: | ---: |
| Heavy      |  70 |   15 |
| Medium     |  55 |   25 |
| Light      |  40 |   35 |
| Cloth      |  25 |   50 |

The set budget splits by slot:

| Slot     | Share |
| -------- | ----: |
| Body     |   40% |
| Shield   |   25% |
| Head     |   15% |
| Footgear |   10% |
| Garment  |   10% |

A piece of item level `i` gets its share of the budget, times `0.25 + 0.0075 · i`. Face gear, accessories and light
sources have no defense at all; they carry stats only.

## Weight and Durability

Weight scales with the type and grows slowly with the item level: `typeWeight · (1 + i/200)`. Type weights, in
10 g units:

| Item kind           | Weight                                                                                  |
| ------------------- | --------------------------------------------------------------------------------------- |
| Weapons             | wand 30, dagger 50, fist and whip 60, tome 60, bow 100, sword and staff 120–150, axe and mace 150, spear 180, crossbow 200, two-handed 400–500 |
| Body armor          | cloth 100, light 400, medium 900, heavy 1600                                            |
| Head                | 30 / 80 / 200 / 350, light to heavy                                                     |
| Shields             | light 150, medium 400, heavy 900                                                        |
| Accessories, faces  | 5–10                                                                                    |

`max-durability` is about `100 + 3 · i`, plus 60 for heavy armor. A light source's durability is its burn time
instead: ten seconds per point, from four hours for a tin lantern to thirty for the Lantern of the Lost Saint.
Stackable thrown weapons do not wear; each throw spends one.

# Sockets and Rolls

What a forged copy may roll follows from its category. A designer does not choose per item.

| Item level | Socket chances |
| ---------- | -------------- |
| up to 20   | 10%            |
| 21–35      | 20%            |
| 36–50      | 20%, 5%        |
| 51–65      | 30%, 10%       |
| 66–80      | 30%, 15%       |
| Legendary  | 40%, 20%, 10%  |
| Epic       | 50%, 25%, 10%, 5% |

Each socket needs the one before it to have opened.

Affixes, by item kind. The first affix always rolls; the others roll with the chance given.

| Item kind                                       | Item level up to 50     | Item level 51–80             | Legendary         | Epic                  |
| ----------------------------------------------- | ----------------------- | ---------------------------- | ----------------- | --------------------- |
| Physical weapon                                 | Offense, Attribute 40%  | + Attribute 25%              | Offense           | Offense, Attribute    |
| Magic weapon (wand, staff, tome, instrument, MATK hybrids) | Arcane, Attribute 40% | + Attribute 25%       | Arcane            | Arcane, Attribute     |
| Armor                                           | Defense, Resist 40%     | + Defense 25%                | Defense           | Defense, Resist       |
| Cloth armor                                     | Arcane, Resist 40%      | + Arcane 25%                 | Arcane            | Arcane, Resist        |
| Face, accessory, light source                   | Attribute, Attribute 50%, Resist 30% | (same)          | Attribute, Resist 30% | Attribute, Resist |

Stackable thrown weapons roll nothing: copies in one pile must be identical.

# Plain and Signature Items

Every weapon type starts with **plain** items: Knife, Dagger, Gladius, Greataxe, Short Bow. They have no fixed
stats, so a forged copy is only its base properties plus what it rolled. They are the crafting canvases: cheap,
common and the first recipes a new crafter finds.

Higher up, items get **fixed signature stats** that make them recognisable: an Alchemist's Lancet always resists
poison, a Templar's Warhammer always carries WIL. A legendary is mostly signature, with one roll on top.

# Where Gear Comes From

Gear is crafted. Recipes are **discovered** by experimenting in the crafting game, see
[Discovery](/docs/mechanics/items-crafting/crafting/#discovery-learning-a-blueprint):

- Plain items sit close to the origin of the [feature space](/docs/mechanics/items-crafting/crafting/#the-feature-space-axes), so a
  new crafter finds them first.
- Named items need more precise material and axis combinations.
- Most legendaries can be discovered the same way by a skilled crafter. They need main materials of level 75 or more,
  since a roll is capped at the main material's level plus 20.

A few of the hardest items also exist as **learnable blueprints**: drops from bosses or events that teach the
recipe outright. A blueprint teaches the recipe; it does not replace the materials. They are:

- the two epics, Skyrender Halberd and Starfall Wand;
- the three hardest legendaries, Oathkeeper, Anvilheart and Aegis of the Unbroken.

The material tiers line up with the item level bands: bronze and iron up to about 30, steel up to about 50, and rare
metals, silk and crystal above that.

## How a Piece is Made

Every piece of the catalogue has one recipe, generated from `items.yml` by `./gradlew genGearRecipes` and kept in
`gear_recipes.yml`. It is built from three parts, and the discovery maths in
[Discovery](/docs/mechanics/items-crafting/crafting/#discovery-learning-a-blueprint) is what makes them findable:

- A **main material** at the piece's tier, from the ladder of what it is made of. A name that says what it is made of
  wins: a bronze stiletto is bronze, an ironwood bo is ironwood. A legendary takes a main material of level 75 or
  more where the ladder has one, since a forged roll is capped at the main material's level plus 20.
- A **kit** that makes the type: a keen thing for a dagger or a sword, a heavy blunt one for a mace or a hammer, a cord
  for a whip or a sling. Without it a sword, a mace and a hammer of one metal would be the same point.
- A **signature** for what the name promises: a poison dagger takes deathcap, an ember staff an ember core, a sapphire
  pendant a cut sapphire. Plain pieces take a quiet extra, which is what tells them apart.

Weapons, bows, crossbows and tomes included, are **Forge Weapon**. Armour, cloth included, and accessories and
lanterns are **Forge Armor**. The rank is the item level divided by ten, rounded up, at most 10. Metal is worked at a
forge and anything else at a workbench. The success chance is the construction curve, `0.90 - max(0, level - 10) * 0.015`,
which is **below zero above level 70**: only skill ranks, DEX and WIL lift it, and no attempt is ever below 1%. The base
time is `1.2 * level^2` seconds.

No two blueprints of one skill sit closer than 0.20 in the feature space, so at skill 1 (radius 0.18) the nearest recipe
to a mix is the one it was meant for. `GearRecipesTest` checks this for the whole catalogue.

# Not Built Yet

{{< alert context="warning" text="Every piece can be crafted, but several items have effects, icons and models still to come." />}}

- The five hardest items still have no learnable blueprint drop; they are discovered like the rest for now.
- Some items describe an effect their stats do not cover. They work as plain stat items until a script exists:
  - the Miner's Lamp Helm's light;
  - the Boots of the Seven Leagues' extra move speed;
  - the Philosopher's Orb returning to the hand;
  - the elemental damage of the Caustic and Fire Flasks, and the slow of the Bolas;
  - the Band of a Thousand Bargains' better shop prices.
- No catalogue item has an icon, a ground model or a worn model yet.

# Catalogue

Legendary and epic items are in **bold**. ilvl is the item level with fixed stats and before rolls. CRIT is shown
at its actual value. Resistances are written `R.FIRE` and so on.

### Dagger, 1H (Al, Ar, As)

| Item | Rarity | ilvl | Min Lv | ATK / MATK | Fixed stats | For |
|---|---|---|---|---|---|---|
| Knife | Mundane | 4 | 1 | 13 | — | all |
| Dagger | Mundane | 10 | 5 | 23 | — | all |
| Combat Knife | Mundane | 18 | 8 | 37 | — | all |
| Great Knife | Superior | 26 | 13 | 50 | STR 1 | As |
| Bronze Stiletto | Superior | 30 | 15 | 57 | AGI 2, CRIT 1 | As |
| Alchemist's Lancet | Superior | 36 | 18 | 55 / 20 | INT 2, DEX 2, R.POISON 6 | Al |
| Assassin's Dagger | Superior | 46 | 25 | 84 | AGI 3, CRIT 2 | As |
| Gearwork Dirk | Rare | 56 | 28 | 101 | DEX 3, INT 2 | Ar |
| Nightglass Kris | Rare | 68 | 34 | 122 | AGI 4, CRIT 2 | As |
| **Whisper of the Veil** | Legendary | 94 | 68 | 166 | AGI 8, DEX 6, CRIT 4 | As |

### Fist, 1H (As, Bw)

| Item | Rarity | ilvl | Min Lv | ATK / MATK | Fixed stats | For |
|---|---|---|---|---|---|---|
| Hand Wraps | Mundane | 4 | 1 | 15 | — | all |
| Cestus | Mundane | 10 | 5 | 26 | — | Bw |
| Knuckleduster | Mundane | 18 | 9 | 40 | — | Bw |
| Spiked Knuckles | Superior | 26 | 13 | 55 | STR 1 | Bw |
| Iron Claw | Superior | 34 | 17 | 69 | AGI 2, CRIT 1 | As |
| Tigerclaw Katar | Superior | 44 | 22 | 87 | AGI 3, CRIT 2 | As |
| Brass Gauntlet | Rare | 52 | 26 | 102 | STR 3, VIT 2 | Bw |
| Monk's Iron Bands | Rare | 60 | 30 | 116 | AGI 3, FLEE 4 | Bw |
| Stonefist Gauntlet | Rare | 72 | 36 | 138 | STR 4, VIT 3 | Bw |
| **Fists of the Mountain King** | Legendary | 92 | 64 | 174 | STR 8, VIT 6, HP_REGEN 4 | Bw |

### Whip, 1H (Bd)

| Item | Rarity | ilvl | Min Lv | ATK / MATK | Fixed stats | For |
|---|---|---|---|---|---|---|
| Rope Lash | Mundane | 5 | 2 | 18 | — | Bd |
| Braided Whip | Mundane | 12 | 6 | 32 | — | Bd |
| Thornvine Whip | Mundane | 20 | 10 | 48 | DEX 2 | Bd |
| Bullwhip | Superior | 28 | 14 | 64 | — | Bd |
| Chain Whip | Superior | 36 | 18 | 80 | STR 1, DEX 1 | Bd |
| Silken Scourge | Superior | 44 | 22 | 70 / 28 | DEX 3, WIL 2 | Bd |
| Barbed Lash | Rare | 54 | 27 | 116 | DEX 3, CRIT 1 | Bd |
| Serpent-Chain Whip | Rare | 66 | 33 | 140 | DEX 4, AGI 3, R.POISON 6 | Bd |
| Ribbon of the Masque | Rare | 74 | 37 | 120 / 50 | DEX 4, WIL 4 | Bd |
| **Tongue of the Tempest** | Legendary | 92 | 64 | 192 | DEX 7, AGI 5, R.WIND 9 | Bd |

### Sword, 1H (Pr, Tr, As, Kn)

| Item | Rarity | ilvl | Min Lv | ATK / MATK | Fixed stats | For |
|---|---|---|---|---|---|---|
| Short Sword | Mundane | 6 | 3 | 20 | — | all |
| Gladius | Mundane | 12 | 6 | 32 | — | all |
| Arming Sword | Mundane | 20 | 10 | 48 | — | Kn |
| Broadsword | Superior | 28 | 14 | 64 | STR 1 | Kn |
| Merchant's Sabre | Superior | 32 | 16 | 72 | DEX 2, AGI 1 | Tr |
| Steel Longsword | Superior | 40 | 20 | 88 | STR 3 | Kn |
| Surveyor's Backsword | Superior | 48 | 24 | 104 | VIT 2, DEX 2, HIT 4 | Pr |
| Rapier | Rare | 56 | 30 | 120 | DEX 4, HIT 5 | Tr/As |
| Duskforged Falchion | Rare | 70 | 35 | 148 | STR 4, CRIT 1 | As |
| **Gilded Tongue** | Legendary | 91 | 62 | 190 | DEX 6, AGI 6, CRIT 2 | Tr |

### Axe, 1H (Bs, Fo, Kn)

| Item | Rarity | ilvl | Min Lv | ATK / MATK | Fixed stats | For |
|---|---|---|---|---|---|---|
| Hand Axe | Mundane | 5 | 2 | 18 | — | all |
| Bearded Axe | Mundane | 12 | 6 | 32 | — | Fo |
| Broad Axe | Mundane | 20 | 10 | 48 | — | Kn |
| Woodward's Axe | Superior | 28 | 14 | 64 | STR 1, AGI 1 | Fo |
| Smith's Hewing Axe | Superior | 36 | 18 | 80 | STR 2, DEX 1 | Bs |
| Steel War Axe | Superior | 46 | 23 | 100 | STR 3, CRIT 1 | Kn |
| Crescent Axe | Rare | 54 | 27 | 116 | STR 3, AGI 2 | Fo |
| Runed Tomahawk | Rare | 64 | 32 | 136 | AGI 3, DEX 3 | Fo |
| Blackiron Cleaver | Rare | 74 | 37 | 156 | STR 5 | Bs |
| **Heartwood Cleaver** | Legendary | 93 | 66 | 194 | STR 6, AGI 5, HP_REGEN 4 | Fo |

### Mace, 1H (Bs, Al, Mi, Pt, Kn)

| Item | Rarity | ilvl | Min Lv | ATK / MATK | Fixed stats | For |
|---|---|---|---|---|---|---|
| Cudgel | Mundane | 5 | 2 | 18 | — | all |
| Flanged Mace | Mundane | 12 | 6 | 32 | — | Mi |
| Spiked Club | Mundane | 18 | 9 | 44 | — | Mi |
| Morning Star | Superior | 28 | 14 | 64 | STR 2 | Kn |
| Pickhead Mace | Superior | 34 | 17 | 76 | STR 1, VIT 1 | Mi |
| Censer Flail | Superior | 42 | 21 | 62 / 30 | WIL 3 | Pt |
| Alembic Mace | Superior | 50 | 25 | 84 / 30 | INT 3, R.POISON 6 | Al |
| Orebreaker Mace | Rare | 60 | 30 | 128 | STR 3, VIT 2 | Mi/Bs |
| Warden's Holy Mace | Rare | 72 | 36 | 112 / 40 | WIL 4, VIT 2, R.UNDEAD 9 | Pt |
| **Dawnbringer** | Legendary | 95 | 70 | 160 / 80 | WIL 7, INT 4, R.UNDEAD 15 | Pt |

### Spear, 1H (Fo, Pr, Kn, Hu)

| Item | Rarity | ilvl | Min Lv | ATK / MATK | Fixed stats | For |
|---|---|---|---|---|---|---|
| Wooden Spear | Mundane | 4 | 1 | 16 | — | all |
| Fire-Hardened Spear | Mundane | 10 | 5 | 28 | — | Hu |
| Short Spear | Mundane | 18 | 9 | 44 | — | all |
| Boar Spear | Superior | 26 | 13 | 60 | STR 1, DEX 2 | Hu |
| Cavalry Lance | Superior | 34 | 17 | 76 | STR 2 | Kn |
| Trident | Superior | 42 | 21 | 92 | DEX 2, R.WATER 6 | Hu |
| Winged Spear | Superior | 50 | 25 | 108 | DEX 2, HIT 4 | Kn |
| Prospector's Pike | Rare | 58 | 29 | 124 | VIT 3, DEX 2 | Pr |
| Hunting Partisan | Rare | 70 | 35 | 148 | DEX 4, AGI 3 | Hu |
| **Lodestar Pike** | Legendary | 92 | 64 | 192 | DEX 6, VIT 5, HIT 8 | Pr |

### Greatsword, 2H (Kn)

| Item | Rarity | ilvl | Min Lv | ATK / MATK | Fixed stats | For |
|---|---|---|---|---|---|---|
| Two-Handed Sword | Mundane | 14 | 7 | 41 | — | Kn |
| Zweihander | Superior | 22 | 11 | 62 | — | Kn |
| Flamberge | Superior | 30 | 15 | 83 | — | Kn |
| Claymore | Superior | 38 | 19 | 104 | STR 2 | Kn |
| Executioner's Sword | Superior | 46 | 24 | 125 | STR 3, CRIT 1 | Kn |
| Steel Greatblade | Rare | 54 | 27 | 145 | STR 3, VIT 1 | Kn |
| Runeblade | Rare | 62 | 31 | 140 / 30 | STR 3, INT 2 | Kn |
| Wyrmbone Greatsword | Rare | 70 | 35 | 187 | STR 4, R.FIRE 6 | Kn |
| Sunderer | Rare | 78 | 39 | 208 | STR 5, VIT 3 | Kn |
| **Oathkeeper** | Legendary | 96 | 72 | 255 | STR 8, VIT 6, MDEF 4 | Kn |

### Greataxe, 2H (Bs, Fo, Mi, Kn)

| Item | Rarity | ilvl | Min Lv | ATK / MATK | Fixed stats | For |
|---|---|---|---|---|---|---|
| Woodsplitter | Mundane | 12 | 6 | 36 | — | Fo |
| Greataxe | Mundane | 20 | 10 | 57 | — | all |
| Woodcutter's Greataxe | Superior | 28 | 14 | 78 | STR 1 | Fo |
| Double-Bitted Axe | Superior | 36 | 18 | 99 | STR 2 | Kn |
| Bearded Greataxe | Superior | 44 | 22 | 119 | STR 3 | Kn |
| Quarry Breaker | Rare | 52 | 26 | 140 | STR 2, VIT 2 | Mi |
| Moon Axe | Rare | 60 | 30 | 161 | STR 3, CRIT 1 | Kn |
| Ironbark Reaver | Rare | 68 | 34 | 182 | STR 4, AGI 2 | Fo |
| Forgemaster's Labrys | Rare | 76 | 38 | 203 | STR 4, DEX 3 | Bs |
| **Veinsplitter** | Legendary | 93 | 66 | 247 | STR 7, VIT 5 | Mi |

### Hammer, 2H (Bs, Mi, Kn)

| Item | Rarity | ilvl | Min Lv | ATK / MATK | Fixed stats | For |
|---|---|---|---|---|---|---|
| Mallet | Mundane | 6 | 3 | 21 | — | all |
| Stone Maul | Mundane | 14 | 7 | 41 | — | Mi |
| Sledgehammer | Superior | 22 | 11 | 62 | — | Mi |
| War Maul | Superior | 30 | 15 | 83 | STR 1 | Kn |
| Forge Hammer | Superior | 38 | 19 | 104 | STR 2, DEX 2 | Bs |
| Bronze-Headed Maul | Superior | 46 | 23 | 125 | STR 2, VIT 1 | Mi |
| Pick-Hammer | Rare | 54 | 27 | 145 | STR 3, HIT 3 | Mi |
| Earthshaker Maul | Rare | 64 | 32 | 171 | STR 4, VIT 2 | Mi |
| Templar's Warhammer | Rare | 74 | 37 | 197 | STR 4, WIL 3 | Kn |
| **Anvilheart** | Legendary | 96 | 72 | 255 | STR 8, DEX 6, R.FIRE 12 | Bs |

### Polearm, 2H (Kn)

| Item | Rarity | ilvl | Min Lv | ATK / MATK | Fixed stats | For |
|---|---|---|---|---|---|---|
| Billhook | Mundane | 14 | 7 | 41 | — | Kn |
| Bardiche | Superior | 22 | 11 | 62 | — | Kn |
| Guisarme | Superior | 30 | 15 | 83 | — | Kn |
| Glaive | Superior | 38 | 19 | 104 | STR 2, AGI 2 | Kn |
| Lucerne Hammer | Superior | 46 | 23 | 125 | STR 3 | Kn |
| Voulge | Rare | 54 | 27 | 145 | STR 2, VIT 2 | Kn |
| Bec de Corbin | Rare | 62 | 31 | 166 | STR 3, HIT 4 | Kn |
| Steel Halberd | Rare | 70 | 35 | 187 | STR 4, VIT 2 | Kn |
| Warden's Partisan | Rare | 78 | 40 | 208 | STR 4, VIT 4 | Kn |
| **Skyrender Halberd** | Epic | 104 | 88 | 275 | STR 9, VIT 7, HIT 8 | Kn |

### Staff, 2H (Ar, Sa, Pt, Wz, Bw)

| Item | Rarity | ilvl | Min Lv | ATK / MATK | Fixed stats | For |
|---|---|---|---|---|---|---|
| Walking Stick | Mundane | 4 | 1 | 9 / 15 | — | all |
| Quarterstaff | Mundane | 10 | 5 | 25 / 10 | — | Bw |
| Willow Staff | Mundane | 16 | 8 | 21 / 47 | INT 1 | Wz |
| Iron-Shod Quarterstaff | Superior | 24 | 12 | 52 / 15 | STR 1 | Bw |
| Pilgrim's Staff | Superior | 32 | 16 | 37 / 88 | WIL 3 | Pt |
| Brass Conduit Staff | Superior | 42 | 21 | 47 / 114 | INT 2, DEX 2 | Ar |
| Ironwood Bo | Superior | 50 | 25 | 120 / 25 | STR 2, AGI 3 | Bw |
| Sage's Rootstaff | Rare | 58 | 29 | 63 / 156 | INT 3, WIL 3 | Sa |
| Staff of Mending Light | Rare | 70 | 35 | 75 / 187 | WIL 5, MANA_REGEN 4 | Pt |
| **Staff of the Seventh Ember** | Legendary | 95 | 70 | 100 / 252 | INT 8, WIL 4, R.FIRE 12 | Wz |

### Wand, 1H (Ar, Sa, Wz)

| Item | Rarity | ilvl | Min Lv | ATK / MATK | Fixed stats | For |
|---|---|---|---|---|---|---|
| Twig Wand | Mundane | 4 | 1 | 2 / 18 | — | all |
| Birch Wand | Mundane | 10 | 5 | 4 / 30 | — | Wz |
| Apprentice's Wand | Mundane | 18 | 9 | 7 / 46 | — | Sa |
| Bone Wand | Superior | 26 | 13 | 10 / 62 | INT 1, R.UNDEAD 3 | Wz |
| Crystal-Tipped Wand | Superior | 34 | 17 | 14 / 78 | INT 2 | Sa |
| Tinker's Spark Rod | Superior | 42 | 21 | 17 / 94 | DEX 2, INT 2 | Ar |
| Coral Wand | Superior | 50 | 25 | 20 / 110 | INT 2, WIL 2, R.WATER 6 | Sa |
| Obsidian Wand | Rare | 60 | 30 | 24 / 130 | INT 4, WIL 2 | Wz |
| Ley-Iron Scepter | Rare | 72 | 36 | 29 / 154 | INT 4, MAX_MANA 4 | Ar/Sa |
| **Starfall Wand** | Epic | 102 | 85 | 41 / 214 | INT 9, WIL 6, CAST_TIME 8 | Sa/Wz |

### Tome, shield slot (Sa, Pt, Wz)

| Item | Rarity | ilvl | Min Lv | ATK / MATK | Fixed stats | For |
|---|---|---|---|---|---|---|
| Primer | Mundane | 6 | 3 | 0 / 17 | — | all |
| Primer of Sparks | Mundane | 14 | 7 | 0 / 29 | — | Wz |
| Hymnal | Mundane | 20 | 10 | 0 / 38 | WIL 1 | Pt |
| Field Herbarium | Superior | 28 | 14 | 0 / 50 | INT 1, HP_REGEN 2 | Sa |
| Book of Psalms | Superior | 36 | 18 | 0 / 62 | WIL 2 | Pt |
| Grimoire of Ash | Superior | 44 | 22 | 0 / 74 | INT 3 | Wz |
| Annotated Bestiary | Rare | 52 | 26 | 0 / 86 | INT 2, HIT 3 | Sa |
| Atlas of Ley Lines | Rare | 62 | 31 | 0 / 101 | INT 2, WIL 3, MAX_MANA 4 | Sa |
| Liturgy of the Lantern | Rare | 74 | 37 | 0 / 119 | WIL 5, R.SHADOW 9 | Pt |
| **Codex of Unwritten Pages** | Legendary | 94 | 68 | 0 / 149 | INT 6, WIL 6, MANA_REGEN 6, CAST_TIME 6 | Sa |

### Bow, 2H, arrows (Fo, Hu, Bd)

| Item | Rarity | ilvl | Min Lv | ATK / MATK | Fixed stats | For |
|---|---|---|---|---|---|---|
| Short Bow | Mundane | 6 | 3 | 18 (range 11) | — | all |
| Yew Shortbow | Mundane | 12 | 6 | 31 (range 12) | — | Hu |
| Hunting Bow | Mundane | 20 | 10 | 49 (range 12) | — | Hu |
| Longbow | Superior | 28 | 14 | 67 (range 14) | — | Fo |
| Recurve Bow | Superior | 36 | 18 | 84 (range 13) | DEX 2 | Bd |
| Horn Bow | Superior | 44 | 22 | 102 (range 13) | DEX 2, STR 1 | Hu |
| Composite Longbow | Rare | 52 | 26 | 119 (range 15) | DEX 3, HIT 4 | Fo |
| Elmwood Warbow | Rare | 62 | 31 | 141 (range 15) | STR 2, DEX 3 | Fo |
| Songstring Bow | Rare | 72 | 36 | 163 (range 14) | DEX 4, WIL 3 | Bd |
| **Windrunner's Longbow** | Legendary | 94 | 68 | 212 (range 16) | DEX 7, AGI 5, HIT 8 | Hu |

### Crossbow, 2H, bolts (Ar, Pr, Tr, Hu)

| Item | Rarity | ilvl | Min Lv | ATK / MATK | Fixed stats | For |
|---|---|---|---|---|---|---|
| Wooden Crossbow | Mundane | 8 | 4 | 24 (range 9) | — | all |
| Hunting Crossbow | Mundane | 16 | 8 | 40 (range 10) | — | Hu |
| Stirrup Crossbow | Superior | 24 | 12 | 56 (range 10) | — | Pr |
| Arbalest | Superior | 32 | 16 | 72 (range 11) | — | Pr |
| Steel Arbalest | Superior | 40 | 20 | 88 (range 12) | DEX 2, VIT 1 | Pr |
| Caravan Guard Crossbow | Superior | 48 | 24 | 104 (range 11) | DEX 2, AGI 2 | Tr |
| Repeating Crossbow | Rare | 56 | 28 | 120 (range 11) | DEX 3, AGI 2 | Tr |
| Windlass Arbalest | Rare | 64 | 34 | 136 (range 13) | DEX 3, STR 2 | Pr |
| Gearwork Siege Crossbow | Rare | 74 | 37 | 156 (range 13) | DEX 4, INT 2 | Ar |
| **Clockwork Arbalest** | Legendary | 95 | 70 | 198 (range 14) | DEX 7, INT 4, CRIT 2 | Ar |

### Instrument, 2H (Bd)

| Item | Rarity | ilvl | Min Lv | ATK / MATK | Fixed stats | For |
|---|---|---|---|---|---|---|
| Tin Whistle | Mundane | 4 | 1 | 3 / 15 | — | Bd |
| Reed Flute | Mundane | 10 | 5 | 8 / 26 | — | Bd |
| Hand Drum | Mundane | 18 | 9 | 14 / 40 | — | Bd |
| Traveller's Mandolin | Superior | 26 | 13 | 21 / 55 | DEX 2, WIL 1 | Bd |
| Bagpipes | Superior | 34 | 17 | 27 / 69 | VIT 2 | Bd |
| Fiddle | Superior | 42 | 21 | 34 / 84 | DEX 3 | Bd |
| Warband Drum | Superior | 50 | 25 | 40 / 98 | VIT 2, WIL 2 | Bd |
| Silver Harp | Rare | 60 | 30 | 48 / 116 | INT 3, WIL 3 | Bd |
| Hurdy-Gurdy of Hours | Rare | 72 | 36 | 58 / 138 | WIL 4, MANA_REGEN 4 | Bd |
| **Lyre of the Last Verse** | Legendary | 93 | 66 | 74 / 175 | WIL 7, DEX 5, MANA_REGEN 6 | Bd |

### Thrown, 1H, stackable (Al, As, Hu)

| Item | Rarity | ilvl | Min Lv | ATK / MATK | Fixed stats | For |
|---|---|---|---|---|---|---|
| Throwing Knife | Mundane | 8 | 4 | 20 | — | As |
| Darts | Mundane | 14 | 7 | 31 | — | As |
| Throwing Axe | Superior | 22 | 11 | 46 | — | Hu |
| Bolas | Superior | 28 | 14 | 56 | — | Hu |
| Weighted Javelin | Superior | 34 | 17 | 67 | — | Hu |
| Star Darts | Superior | 42 | 21 | 82 | — | As |
| Caustic Flask | Superior | 48 | 24 | 92 | — | Al |
| Steel Chakram | Rare | 58 | 29 | 110 | — | As |
| Fire Flask | Rare | 66 | 33 | 125 | — | Al |
| **Philosopher's Orb** | Legendary | 92 | 64 | 172 | DEX 6, INT 5 | Al |

### Sling, 1H, stones (everyone)

| Item | Rarity | ilvl | Min Lv | ATK / MATK | Fixed stats | For |
|---|---|---|---|---|---|---|
| Shepherd's Sling | Mundane | 6 | 3 | 10 (range 8) | — | all |
| Braided Sling | Mundane | 14 | 7 | 18 (range 9) | — | all |
| Hide Sling | Superior | 22 | 11 | 26 (range 9) | — | all |
| Leaded Sling | Superior | 30 | 15 | 34 (range 10) | DEX 1 | all |
| Forked Slingshot | Superior | 38 | 19 | 42 (range 10) | DEX 2 | all |
| Balearic Sling | Superior | 46 | 23 | 50 (range 11) | DEX 2, HIT 3 | all |
| Silk Sling | Rare | 54 | 27 | 58 (range 11) | DEX 3, AGI 1 | all |
| Giant-Hunter's Sling | Rare | 64 | 32 | 68 (range 12) | STR 2, DEX 3 | all |
| Stormcord Sling | Rare | 76 | 38 | 80 (range 12) | DEX 4, R.WIND 6 | all |
| **Shepherd King's Sling** | Legendary | 90 | 60 | 94 (range 13) | DEX 6, AGI 4, CRIT 2 | all |

### Body, ARMOR

| Item | Type | Rarity | ilvl | Min Lv | DEF / MDEF | Fixed stats | For |
|---|---|---|---|---|---|---|---|
| Plain Robe | Cloth | Mundane | 6 | 3 | 3 / 6 | — | all |
| Woven Robe | Cloth | Mundane | 14 | 7 | 3 / 7 | INT 1 | Wz |
| Acolyte's Cassock | Cloth | Superior | 22 | 11 | 4 / 8 | WIL 1 | Pt |
| Scholar's Habit | Cloth | Superior | 30 | 15 | 5 / 10 | INT 2, WIL 2 | Sa |
| Herbalist's Smock | Cloth | Superior | 38 | 19 | 5 / 11 | INT 1, VIT 1, R.POISON 6 | Al |
| Embroidered Magister Robe | Cloth | Superior | 50 | 25 | 6 / 13 | INT 3, WIL 3, CAST_TIME 4 | Wz |
| Silkweave Vestment | Cloth | Rare | 62 | 31 | 7 / 14 | WIL 4, MANA_REGEN 3 | Sa/Pt |
| Robe of the Ashen Circle | Cloth | Rare | 74 | 37 | 8 / 16 | INT 5, R.FIRE 9 | Wz |
| **Mantle of the Starlit Choir** | Cloth | Legendary | 95 | 70 | 10 / 19 | INT 8, WIL 6, MAX_MANA 6, CAST_TIME 5 | Sa/Wz |
| Padded Gambeson | Light | Mundane | 8 | 4 | 5 / 4 | — | all |
| Hide Vest | Light | Mundane | 16 | 8 | 6 / 5 | — | all |
| Hunter's Leathers | Light | Superior | 24 | 12 | 7 / 6 | AGI 2, DEX 1 | Hu |
| Boiled Leather Cuirass | Light | Superior | 32 | 16 | 8 / 7 | VIT 1 | Tr/Al |
| Minstrel's Doublet | Light | Superior | 40 | 20 | 9 / 8 | DEX 2, WIL 2 | Bd |
| Shadowweave Jerkin | Light | Superior | 48 | 25 | 10 / 9 | AGI 3, FLEE 5 | As |
| Pugilist's Wrap-Vest | Light | Rare | 56 | 28 | 11 / 9 | STR 2, AGI 2 | Bw |
| Trailwarden Leathers | Light | Rare | 66 | 33 | 12 / 10 | DEX 3, AGI 3 | Hu |
| **Hide of the Nightstalker** | Light | Legendary | 93 | 66 | 15 / 13 | AGI 8, DEX 5, FLEE 10 | As/Hu/Bw |
| Ring Mail | Medium | Mundane | 14 | 7 | 8 / 4 | — | all |
| Studded Brigandine | Medium | Superior | 22 | 11 | 9 / 4 | VIT 1 | Fo/Pr |
| Scale Vest | Medium | Superior | 30 | 15 | 10 / 5 | — | Pr |
| Smith's Hauberk | Medium | Superior | 38 | 19 | 12 / 5 | STR 2, R.FIRE 6 | Bs/Mi |
| Lamellar Coat | Medium | Superior | 46 | 23 | 13 / 6 | VIT 2 | Fo |
| Warden's Scale Vest | Medium | Rare | 56 | 28 | 15 / 7 | VIT 3, AGI 2 | Fo/Pr |
| Vestments of the Dawn | Medium | Rare | 62 | 31 | 14 / 9 | WIL 4, R.HOLY 9 | Pt |
| Artificer's Brass Harness | Medium | Rare | 72 | 36 | 17 / 8 | DEX 3, INT 3 | Ar |
| **Deepforged Hauberk** | Medium | Legendary | 92 | 64 | 21 / 9 | STR 6, VIT 6, R.FIRE 15 | Bs/Mi/Ar |
| Iron Plate Coat | Heavy | Mundane | 20 | 12 | 11 / 2 | — | Kn |
| Splint Mail | Heavy | Superior | 30 | 16 | 13 / 3 | — | Kn |
| Banded Plate | Heavy | Superior | 40 | 20 | 15 / 3 | VIT 3, AGI -1 | Kn |
| Steel Breastplate | Heavy | Superior | 50 | 25 | 18 / 4 | VIT 3 | Kn |
| Templar's Plate | Heavy | Rare | 60 | 30 | 20 / 4 | VIT 3, WIL 2 | Kn |
| Bastion Plate | Heavy | Rare | 72 | 36 | 22 / 5 | VIT 5, MAX_HP 5, AGI -2 | Kn |
| Blackiron Fullplate | Heavy | Rare | 80 | 40 | 24 / 5 | STR 4, VIT 5, AGI -2 | Kn |
| **Aegis of the Unbroken** | Heavy | Legendary | 97 | 74 | 27 / 6 | VIT 10, STR 4, MAX_HP 10 | Kn |

### Head, HEAD_UPPER

| Item | Type | Rarity | ilvl | Min Lv | DEF / MDEF | Fixed stats | For |
|---|---|---|---|---|---|---|---|
| Felt Hood | Cloth | Mundane | 6 | 3 | 1 / 2 | — | all |
| Straw Hat | Cloth | Mundane | 10 | 5 | 1 / 2 | — | all |
| Wizard's Cone Hat | Cloth | Superior | 28 | 14 | 2 / 4 | INT 2, MAX_MANA 3 | Wz |
| Scholar's Cap | Cloth | Superior | 36 | 18 | 2 / 4 | INT 2 | Sa |
| Circlet of Clarity | Cloth | Rare | 54 | 27 | 3 / 5 | INT 3, WIL 3 | Sa |
| Silver Diadem | Cloth | Rare | 68 | 34 | 3 / 6 | WIL 4, MAX_MANA 4 | Pt/Sa |
| **Crown of the Eclipse** | Cloth | Legendary | 91 | 62 | 3 / 7 | INT 6, WIL 6, MATK 4 | Wz/Sa |
| Leather Cap | Light | Mundane | 10 | 5 | 2 / 2 | AGI 1 | all |
| Bandana | Light | Mundane | 18 | 9 | 2 / 2 | AGI 1, FLEE 2 | As/Bw |
| Feathered Tricorn | Light | Superior | 32 | 16 | 3 / 3 | DEX 2 | Bd/Tr |
| Ranger's Hood | Light | Superior | 42 | 21 | 3 / 3 | DEX 2, AGI 2, HIT 3 | Hu |
| Assassin's Cowl | Light | Rare | 52 | 26 | 4 / 3 | AGI 3, CRIT 1 | As |
| Plumed Bard's Cap | Light | Rare | 62 | 31 | 4 / 4 | DEX 3, WIL 3 | Bd |
| Hood of the Silent Hunt | Light | Rare | 74 | 37 | 5 / 4 | DEX 4, AGI 3 | Hu |
| Bronze Sallet | Medium | Mundane | 20 | 10 | 3 / 2 | — | all |
| Miner's Lamp Helm | Medium | Superior | 28 | 14 | 4 / 2 | VIT 1 | Mi/Pr |
| Kettle Hat | Medium | Superior | 36 | 18 | 4 / 2 | VIT 1 | Fo/Pr |
| Priest's Mitre | Medium | Superior | 48 | 24 | 5 / 4 | WIL 4, R.HOLY 6 | Pt |
| Horned Helm | Medium | Rare | 58 | 29 | 6 / 3 | STR 3 | Bs/Mi |
| Gearwright's Helm | Medium | Rare | 70 | 35 | 6 / 3 | DEX 3, INT 2 | Ar |
| Nasal Helm | Heavy | Superior | 24 | 13 | 5 / 1 | — | Kn |
| Great Helm | Heavy | Superior | 40 | 20 | 6 / 1 | VIT 2 | Kn |
| Bascinet | Heavy | Rare | 52 | 26 | 7 / 2 | VIT 2, STR 1 | Kn |
| Visored Barbute | Heavy | Rare | 66 | 33 | 8 / 2 | STR 3, VIT 3 | Kn |
| Crested Warhelm | Heavy | Rare | 78 | 39 | 9 / 2 | STR 4, VIT 4 | Kn |
| **Warhelm of the Iron Tide** | Heavy | Legendary | 94 | 68 | 10 / 2 | STR 5, VIT 6, R.FIRE 9 | Kn |

### Garment, GARMENT

| Item | Type | Rarity | ilvl | Min Lv | DEF / MDEF | Fixed stats | For |
|---|---|---|---|---|---|---|---|
| Traveller's Cloak | Cloth | Mundane | 10 | 5 | 1 / 2 | R.WATER 3 | all |
| Pilgrim's Shawl | Cloth | Superior | 22 | 11 | 1 / 2 | WIL 1 | Pt |
| Scholar's Mantlet | Cloth | Superior | 34 | 17 | 1 / 3 | INT 2 | Sa |
| Mantle of Embers | Cloth | Rare | 56 | 28 | 2 / 3 | INT 3, R.FIRE 9 | Wz |
| Shroud of the Quiet Grave | Cloth | Rare | 72 | 36 | 2 / 4 | WIL 4, R.UNDEAD 9 | Pt |
| Wool Mantle | Light | Mundane | 16 | 8 | 2 / 1 | VIT 1 | all |
| Oilskin Cape | Light | Superior | 26 | 13 | 2 / 2 | R.WATER 6 | Tr |
| Hunter's Ghillie | Light | Superior | 38 | 19 | 2 / 2 | AGI 2, FLEE 3 | Hu |
| Performer's Half-Cape | Light | Superior | 48 | 24 | 2 / 2 | DEX 2, WIL 2 | Bd |
| Shadowsilk Cape | Light | Rare | 66 | 33 | 3 / 3 | AGI 4, CRIT 1 | As |
| **Wings of the Wandering Wind** | Light | Legendary | 92 | 64 | 4 / 3 | AGI 6, DEX 4, FLEE 8, R.WIND 9 | Hu/Bd/Tr |
| Fur-Lined Mantle | Medium | Superior | 30 | 15 | 3 / 1 | VIT 1, R.WATER 3 | Mi/Fo |
| Herald's Tabard | Medium | Superior | 42 | 21 | 3 / 2 | VIT 2, WIL 1 | Pt/Kn |
| Forester's Weathercloak | Medium | Rare | 60 | 30 | 4 / 2 | AGI 2, VIT 2 | Fo |
| Mail Cape | Heavy | Superior | 50 | 25 | 4 / 1 | VIT 2 | Kn |
| Knight's Warcloak | Heavy | Rare | 74 | 37 | 6 / 1 | VIT 4, MAX_HP 4 | Kn |

### Footgear, FOOTGEAR

| Item | Type | Rarity | ilvl | Min Lv | DEF / MDEF | Fixed stats | For |
|---|---|---|---|---|---|---|---|
| Rope Sandals | Cloth | Mundane | 6 | 3 | 1 / 1 | — | all |
| Felt Slippers | Cloth | Mundane | 16 | 8 | 1 / 2 | MANA_REGEN 1 | Wz |
| Pilgrim's Slippers | Cloth | Superior | 36 | 18 | 1 / 3 | WIL 2, MANA_REGEN 2 | Pt/Sa |
| Starwalker Slippers | Cloth | Rare | 68 | 34 | 2 / 4 | INT 3, WIL 2 | Sa/Wz |
| Soft Leather Boots | Light | Mundane | 14 | 7 | 1 / 1 | AGI 1 | all |
| Ranger's Moccasins | Light | Superior | 24 | 12 | 2 / 1 | AGI 1, DEX 1 | Hu |
| Silent-Step Boots | Light | Superior | 40 | 20 | 2 / 2 | AGI 3, FLEE 3 | As |
| Troubadour's Buckled Shoes | Light | Superior | 50 | 25 | 3 / 2 | DEX 2, WIL 2 | Bd |
| Fighter's Foot Wraps | Light | Rare | 58 | 29 | 3 / 2 | STR 2, AGI 2 | Bw |
| Courier's Boots | Light | Rare | 70 | 35 | 3 / 3 | AGI 4, STAMINA_REGEN 3 | Tr |
| **Boots of the Seven Leagues** | Light | Legendary | 90 | 60 | 4 / 3 | AGI 6, STAMINA_REGEN 4 | all |
| Hobnailed Boots | Medium | Superior | 22 | 11 | 2 / 1 | VIT 1, STAMINA_REGEN 1 | Mi/Pr |
| Riveted Boots | Medium | Superior | 34 | 17 | 3 / 1 | VIT 1 | Fo |
| Strider's Boots | Medium | Rare | 52 | 26 | 4 / 2 | AGI 2, STAMINA_REGEN 2 | Fo |
| Forge-Soled Boots | Medium | Rare | 62 | 31 | 4 / 2 | VIT 2, R.FIRE 9 | Bs |
| Deepdelver's Boots | Medium | Rare | 76 | 38 | 5 / 2 | VIT 3, STR 2 | Mi |
| Ironshod Greaves | Heavy | Superior | 30 | 16 | 3 / 1 | VIT 1 | Kn |
| Plated Greaves | Heavy | Superior | 44 | 22 | 4 / 1 | VIT 2 | Kn |
| Sabatons of the Bulwark | Heavy | Rare | 66 | 33 | 5 / 1 | VIT 3 | Kn |
| **Treads of the Last Stand** | Heavy | Legendary | 91 | 62 | 6 / 1 | VIT 5, STR 3, MAX_HP 4 | Kn |

### Shield, shield slot

| Item | Type | Rarity | ilvl | Min Lv | DEF / MDEF | Fixed stats | For |
|---|---|---|---|---|---|---|---|
| Wicker Buckler | Light | Mundane | 8 | 4 | 3 / 3 | — | all |
| Hide Targe | Light | Mundane | 20 | 10 | 4 / 4 | AGI 1 | As/Tr |
| Studded Buckler | Light | Superior | 34 | 17 | 5 / 5 | AGI 1, FLEE 2 | Al |
| Duelist's Parrying Buckler | Light | Superior | 50 | 25 | 6 / 5 | DEX 2, FLEE 4 | Tr/As |
| Mirrored Buckler | Light | Rare | 68 | 34 | 8 / 7 | AGI 3, R.HOLY 6 | Al/Tr |
| Round Shield | Medium | Mundane | 18 | 9 | 5 / 2 | — | all |
| Bronze Heater | Medium | Superior | 26 | 13 | 6 / 3 | — | Pr/Bs |
| Steel Kite Shield | Medium | Superior | 48 | 24 | 8 / 4 | VIT 2 | Mi/Fo |
| Runed Ward | Medium | Rare | 60 | 30 | 10 / 5 | WIL 3, R.SHADOW 6 | Pt |
| Gearlock Shield | Medium | Rare | 72 | 36 | 11 / 5 | DEX 2, INT 2 | Ar |
| Iron Pavise | Heavy | Superior | 30 | 16 | 8 / 2 | — | Kn |
| Bulwark Pavise | Heavy | Rare | 60 | 30 | 12 / 3 | VIT 3 | Kn |
| Cathedral Tower Shield | Heavy | Rare | 78 | 39 | 15 / 3 | VIT 4, WIL 2 | Kn |
| **Bastion of the First Wall** | Heavy | Legendary | 95 | 70 | 17 / 4 | VIT 6, MAX_HP 6, R.NORMAL 6 | Kn |

### Face, HEAD_MID

| Item | Rarity | ilvl | Min Lv | Fixed stats | For |
|---|---|---|---|---|---|
| Cracked Monocle | Mundane | 10 | 5 | DEX 1, HIT 2 | Tr/Ar |
| Leather Eyepatch | Mundane | 14 | 7 | HIT 3 | As |
| Cloth Face Mask | Mundane | 18 | 9 | R.POISON 3 | all |
| Smoked Goggles | Superior | 24 | 12 | DEX 2, R.FIRE 3 | Ar/Bs |
| Jeweller's Loupe | Superior | 32 | 16 | DEX 3, HIT 4 | Tr/Pr |
| Plague Beak Mask | Superior | 34 | 17 | VIT 1, R.POISON 9 | Al |
| Masquerade Half-Mask | Superior | 40 | 20 | DEX 2, WIL 2 | Bd |
| Assassin's Veil | Superior | 46 | 23 | AGI 2, CRIT 1 | As |
| Spyglass Monocle | Rare | 52 | 26 | DEX 2, HIT 6 | Hu |
| Iron Face-Guard | Rare | 58 | 29 | VIT 3, R.NORMAL 3 | Kn/Bw |
| Owl-Eye Lenses | Rare | 64 | 32 | DEX 3, INT 3, HIT 5 | Ar/Hu |
| **Mask of the Hollow Choir** | Legendary | 92 | 64 | INT 4, WIL 4, MDEF 3, R.SHADOW 9 | Sa/Pt/Wz |

### Accessory, ACCESSORY_1/2

| Item | Rarity | ilvl | Min Lv | Fixed stats | For |
|---|---|---|---|---|---|
| Copper Band | Mundane | 8 | 4 | — | all |
| Bone Charm | Mundane | 14 | 7 | WIL 1, R.UNDEAD 3 | Pt |
| Iron Ring | Mundane | 16 | 8 | STR 1 | all |
| Rabbit's-Foot Charm | Mundane | 18 | 9 | AGI 1, FLEE 2 | all |
| Brawler's Bracer | Superior | 24 | 12 | STR 2 | Bw |
| Ranger's Thumb Ring | Superior | 26 | 13 | DEX 2, HIT 3 | Hu/Bd |
| Merchant's Signet | Superior | 30 | 15 | DEX 1, AGI 1 | Tr |
| Alchemist's Phylactery | Superior | 32 | 16 | INT 2, R.POISON 6 | Al |
| Jade Earring | Superior | 34 | 17 | WIL 2, MANA_REGEN 2 | Sa |
| Silver Holy Symbol | Superior | 38 | 19 | WIL 3, R.SHADOW 6 | Pt |
| Tiger's-Eye Ring | Superior | 40 | 20 | DEX 2, CRIT 1 | As |
| Garnet Ring | Superior | 44 | 22 | STR 2, VIT 2, MAX_HP 3 | Kn/Bs |
| Sapphire Pendant | Superior | 48 | 24 | INT 3, MAX_MANA 4 | Wz |
| Bard's Charm Bracelet | Superior | 50 | 25 | DEX 2, WIL 2 | Bd |
| Miner's Lodestone | Rare | 52 | 26 | VIT 2, R.EARTH 9 | Mi |
| Wolf-Tooth Necklace | Rare | 54 | 27 | STR 2, AGI 2 | Hu/Bw |
| Earring of the Dancing Blade | Rare | 58 | 29 | AGI 3, CRIT 1 | As |
| Ring of Warding | Rare | 60 | 30 | VIT 2, MDEF 2, R.NORMAL 3 | Kn/Pr |
| Runestone Amulet | Rare | 64 | 32 | — | Ar |
| Emerald Ring of Growth | Rare | 66 | 33 | VIT 3, HP_REGEN 4 | Fo/Pt |
| Opal of the Tides | Rare | 68 | 34 | INT 3, R.WATER 9 | Sa |
| Ruby Signet | Rare | 72 | 36 | STR 4, R.FIRE 6 | Bs/Kn |
| Onyx Ring | Rare | 74 | 37 | AGI 3, DEX 3, R.SHADOW 6 | As/Tr |
| Pilgrim's Amulet | Rare | 78 | 39 | WIL 4, VIT 2, R.HOLY 9 | Pt |
| **Band of a Thousand Bargains** | Legendary | 90 | 60 | DEX 4, AGI 4 | Tr |
| **Eye of the Oracle** | Legendary | 92 | 64 | INT 5, WIL 5, CAST_TIME 6 | Sa/Pt/Wz |
| **Heart of the Behemoth** | Legendary | 94 | 68 | VIT 6, STR 4, MAX_HP 8 | Kn/Bs/Mi/Fo |
| **Ring of the Hollow King** | Legendary | 96 | 72 | AGI 5, DEX 5, CRIT 2, R.SHADOW 9 | As/Hu/Al |

### Light source, LIGHT_SOURCE

| Item | Rarity | ilvl | Min Lv | Fixed stats | For |
|---|---|---|---|---|---|
| Tin Lantern | Mundane | 10 | 5 | — | all |
| Hooded Lantern | Superior | 30 | 15 | DEX 1 | all |
| Miner's Carbide Lamp | Superior | 40 | 20 | VIT 1 | Mi/Pr |
| Glowcap Lantern | Superior | 50 | 25 | R.POISON 3 | Al/Sa |
| Everflame Lantern | Rare | 60 | 30 | WIL 2, R.SHADOW 6 | Pt |
| **Lantern of the Lost Saint** | Legendary | 90 | 60 | WIL 5, R.UNDEAD 15, R.SHADOW 9 | Pt |
