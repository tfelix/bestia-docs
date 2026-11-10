---
weight: 500
aliases: ["/docs/mechanics/forging/"]
title: Items & Crafting
description: Overview of items, upgrades and the crafting system.
katex: true
---

Items can be obtained by the player and carried around. The number of items each entity can carry is determined by
its [Inventory](#inventory). Each Bestia (and many other entities) has its own inventory with a different size.

Items are mostly crafted by the players. It's quite rare to obtain direct item drops from killed enemies. Instead it's very common to loot resources when enemies are killed.

# Item Level

Each item has a level assigned. This level is important to determine how hard or easy it is to forge this item, upgrade
it and so on. It also affects how spells interact with the item entity.

The level of a forged item is not fixed. A copy starts at its item's base level, and its stats and sockets raise it -
see [Forging](#forging-and-random-stats). A character needs this level to wear the copy.

{{< table >}}

| Item Level | Category  |
| ---------- | --------- |
| 1 - 20     | Mundane   |
| 21 - 50    | Superior  |
| 51 - 80    | Rare      |
| 81 - 100   | Legendary |
| 101+       | Epic      |

{{< /table >}}

# Armor Type

Each piece of armor has a weight class. A master wears the classes their
[professions](/docs/mechanics/master/basics/#professions) allow. A bestia can only wear the classes its species lists, see
[Designing a Bestia](/docs/mechanics/bestias/bestia-design/#10-equipment). A blob has no rigid body, so plate slides off it.

| Armor type | Typical pieces                                |
| ---------- | --------------------------------------------- |
| Cloth      | Robes, tunics, hats and capes. No metal.      |
| Light      | Leather and hide: shoes, jerkins, bucklers.   |
| Medium     | Mail, scale and iron-shod leather.            |
| Heavy      | Plate. Only a strong, rigid body holds it.    |

Weapons have a [weapon type](#weapon-type) instead. Accessories have neither, so anyone with the free slot can wear
them. The server sets the type with `armor-type` in `items.yml`.

# Weapon Type

Each weapon has a weapon type. A master can only use the types their
[professions](/docs/mechanics/master/basics/#professions) allow. A bestia is not limited by weapon type, only by the slots of
its species.

| Group  | Weapon type | Hands    | Typical pieces                                |
| ------ | ----------- | -------- | --------------------------------------------- |
| Light  | Dagger      | One      | Knife, dirk, stiletto                         |
|        | Fist        | One      | Knuckles, claws, cestus                       |
|        | Whip        | One      | Whip, chain whip                              |
| Blade  | Sword       | One      | Sabre, rapier, longsword                      |
|        | Greatsword  | Two      | Claymore, zweihander                          |
| Axe    | Axe         | One      | Battle axe, broad axe                         |
|        | Greataxe    | Two      | Bardiche, war axe                             |
| Blunt  | Mace        | One      | Club, flail, morning star                     |
|        | Hammer      | Two      | Warhammer, sledgehammer                       |
| Reach  | Spear       | One      | Short spear, boar spear                       |
|        | Polearm     | Two      | Halberd, glaive, lance                        |
| Magic  | Wand        | One      | Wand, rod                                     |
|        | Staff       | Two      | Quarterstaff, mage staff                      |
|        | Tome        | Off-hand | Grimoire, prayer book                         |
| Ranged | Bow         | Two      | Short bow, long bow. Shoots arrows.           |
|        | Crossbow    | Two      | Light and heavy crossbow. Shoots bolts.       |
|        | Sling       | One      | Sling. Shoots stones.                         |
|        | Thrown      | One      | Throwing knife, shuriken, javelin, bomb flask |
| Song   | Instrument  | Two      | Lute, harp, flute                             |
| Work   | Tool        | One      | Pickaxe, hatchet, fishing rod                 |

- A two-handed weapon leaves no room for anything in the left hand.
- The left hand holds a shield or a tome. A second weapon in the left hand needs
  [Dual Wield](/docs/mechanics/master/warrior-tree/#skill-dual-wield).
- Bows, crossbows and slings shoot from the [quiver](/docs/mechanics/combat/ranged-combat/#the-quiver). A thrown weapon is its
  own ammunition: each throw uses up one piece of the stack in hand.
- Tools hit weakly. Their real job is gathering, which is why every master can hold one.
- There are no firearms in the world of Bestia.

# Weapon Refinement

Weapons and armor can be refined, which translates into extra damage dealt when the weapon is used. Each upgrade step can
result in the destruction of the equipment.

A refined weapon has increased base damage per level:

{{< table >}}

| Weapon Category | Base Damage Bonus / Upgrade Level |
| --------------- | --------------------------------- |
| Mundane         | 2                                 |
| Superior        | 4                                 |
| Rare            | 5                                 |
| Legendary       | 6                                 |
| Epic            | 10                                |

{{< /table >}}

## Upgrade Chances

These are the base upgrade chances. The chances can be altered via skills, buffs or equipments. If an upgrade fails the weapon is destroyed. It is then completely unusable and also the resources are lost. As you can see the chance of success gets lower and lower the higher the weapon is upgraded, and then caps (depending on the weapon level, between 5% and 15%).

**Example:** You upgrade a superior weapon to level 12. Until level 7 the chance of success is at 100%. Then it drops for every level: `0.9 * 0.81 * 0.72 * 0.63 * 0.53 = 0.17`, so the total chance of success for this upgrade chain is 17%.

<!-- prettier-ignore -->
{{< chart >}}
{
type: 'line',
data: {
labels: Array.from({length: 25}, (_, i) => i + 1),
datasets: [
{
label: 'Mundane',
function: function(x) { return x <= 7 ? 1 : x >= 16 ? 0.30 : -0.0875 * x + 1.7; },
fill: false
},
{
label: 'Superior',
function: function(x) { return x <= 6 ? 1 : x >= 15 ? 0.25 : -0.09375 * x + 1.65625; },
fill: false
},
{
label: 'Rare',
function: function(x) { return x <= 6 ? 1 : x >= 14 ? 0.20 : -0.1 * x + 1.6; },
fill: false
},
{
label: 'Legendary',
function: function(x) { return x <= 5 ? 1 : x >= 13 ? 0.15 : -0.10625 * x + 1.53125; },
fill: false
},
{
label: 'Epic',
function: function(x) { return x <= 4 ? 1 : x >= 12 ? 0.10 : -0.1125 * x + 1.45; },
fill: false
}
]
},
options: {
responsive: true,
scales: {
y: {
title: { display: true, text: 'Upgrade Chance %' },
max: 1.0,
min: 0.0
}
}
}
}
{{< /chart >}}

The refine level is not capped but each higher refinement process can destroy the weapon/equipment with an increasing chance.
The upgrade chances can be increased by leveling up the relevant [Master Skill](/docs/mechanics/master/basics/#master-skills) (e.g. Weaponry Research).

# Armor Refinement

A refined armor grants increased **[hard defense](/docs/server/battle#what-actually-deals-damage-today)**. Each refinement level adds 10 defense points. All defense points from equipment, refinement, buffs and skills are summed up and then converted into a hard-defense percentage:

```kotlin
val dp = defensePoints
hardDefense = (dp * dp) / (dp * dp + 50 * dp + 60000)
```

The curve deliberately starts out shallow. While defense points are low the constant `60000` dominates the denominator, so hard defense grows roughly quadratically out of zero: 50 points are worth about 4%, 100 points about 13%. That leaves room to hand out defense points in readable amounts — starter gear in the double digits, mid-game sets in the low hundreds, a fully refined endgame set somewhere around 1000 points — without a single early piece already being decisive.

The curve is at its steepest around 140 defense points and flattens continuously from there. The `50 * dp` term overtakes the constant at 1200 points and governs the entire top end, so hard defense approaches 100% asymptotically but never reaches it. There is no hard cap: extremely high defense remains possible in theory, just increasingly expensive.

{{< table >}}

| Defense Points | Hard Defense |
| -------------- | ------------ |
| 50             | 3.8%         |
| 100            | 13.3%        |
| 200            | 36.4%        |
| 271            | 50.0%        |
| 500            | 74.6%        |
| 1000           | 90.1%        |
| 2000           | 96.2%        |

{{< /table >}}

<!-- prettier-ignore -->
{{< chart >}}
{
type: 'line',
data: {
labels: Array.from({length: 101}, (_, i) => i * 20),
datasets: [
{
label: 'Hard Defense',
function: function(x) { return (x * x) / (x * x + 50 * x + 60000); },
fill: false
}
]
},
options: {
responsive: true,
scales: {
x: {
type: 'linear',
title: { display: true, text: 'Defense Points' }
},
y: {
title: { display: true, text: 'Hard Defense %' },
max: 1.0,
min: 0.0
}
}
}
}
{{< /chart >}}

## Upgrade Chances

The refine level is not capped but each higher refinement process can destroy the weapon/equipment with an increasing chance.
The upgrade chances can be increased by leveling up the relevant [Master Skill](/docs/mechanics/master/basics/#master-skills) or by buffs and items.

<!-- prettier-ignore -->
{{< chart >}}
{
type: 'line',
data: {
labels: Array.from({length: 15}, (_, i) => i + 1),
datasets: [
{
label: 'Armor',
function: function(x) { return x <= 4 ? 1 : x > 10 ? 0.10 : -0.15 * x + 1.6; },
fill: false
}
]
},
options: {
responsive: true,
scales: {
x: {
type: 'linear',
title: { display: true, text: 'Upgrade Level' },
min: 1,
ticks: { stepSize: 1 }
},
y: {
title: { display: true, text: 'Chance of Success' },
max: 1.1,
min: 0
}
}
}
}
{{< /chart >}}

# Item Customization

An item can be reworked to cut rune slots into it, which [Runic Etching](/docs/mechanics/master/craftsman-tree/#skill-runic-etching) can later
fill. This is governed by the Craftsman's [Item Customization](/docs/mechanics/master/craftsman-tree/#skill-item-customization) skill and
consumes an [Engraving Set](/docs/mechanics/items-crafting/item-list/#engraving-set) per attempt, whether it succeeds or not. A failed
attempt can destroy the item outright - see the skill's Destroy Chance column.

The chance of successfully cutting a slot has a **base chance** that depends purely on the item's own
[level](#item-level) - higher-level gear is tougher to rework - on top of which the skill's flat Success Chance bonus and
the crafter's DEX are added:

```kotlin
baseChance = 0.4 - max(0, itemLevel - 10) * 0.01
chance = clamp(baseChance + skillSuccessChance + floor(DEX / 10) * 0.01, 0.01, 1.0)
```

Levels 1-10 all share the same `40%` base chance; every level above that removes another 1%, so it reaches `0%` at
level 50 and `-50%` at level 100 - firmly negative, meaning a Craftsman needs a near-maxed
[Item Customization](/docs/mechanics/master/craftsman-tree/#skill-item-customization) rank (and preferably some DEX) just to bring a
level 100 item back up to a coin flip. Level 100 is only a landmark, not a ceiling - the base chance keeps falling by
1% per level for anything higher. The total is clamped so an attempt is never above 100% nor entirely impossible.

<!-- prettier-ignore -->
{{< chart >}}
{
type: 'line',
data: {
labels: Array.from({length: 100}, (_, i) => i + 1),
datasets: [
{
label: 'Base Slot Chance',
function: function(x) { return 0.4 - Math.max(0, x - 10) * 0.01; },
fill: false
}
]
},
options: {
responsive: true,
scales: {
x: { type: 'linear', title: { display: true, text: 'Item Level' }, min: 1 },
y: { title: { display: true, text: 'Base Chance' }, max: 0.5, min: -0.6 }
}
}
}
{{< /chart >}}

**Example:** A crafter with Item Customization Lv. 1 (`+10%` Success Chance) and no notable DEX attempts a single slot
on a level 10 item: `40% (base) - 0% (dex) + 10% (skill) - 0% (1 slot)  = 50%`. The same crafter at Item Customization Lv. 10 (`+100%`) attempting a
level 100 item instead: `-50% (base) + 100% (skill) = 50%` - the item level penalty has eaten the entire skill bonus, leaving the same coin-flip odds despite the enormous gap in both item and skill level.

Every slot that is cut raises the item level, like a socket rolled at the forge - see
[Sockets and Essences](#sockets-and-essences). So the next slot is harder to cut.

Putting more than one slot into an item costs further chance on top: every extra slot above the first subtracts another
`40` percentage points, i.e. `chance(n slots) = clamp(chance(1 slot) - 0.4 * (n - 1), 0.01, 1.0)`. So an item and skill
combination that would land on `80%` for a single slot drops to `40%` once you ask for two.

# Enchantments

A [status effect](/docs/mechanics/combat/status-effects/) sits on a creature. An **enchantment** is a spell bound to one
item instead. It stays with the item wherever the item goes: in a hand, in a bag, in a chest, on the ground or in a
parcel. Give an enchanted sword to a friend, and the enchantment goes with it.

- **Only items with an identity hold one.** Gear and parcels do. A pile of apples does not.
- **Its time runs in real time**, whether the item is used, stored or lying on the ground.
- **It does not stack.** The same enchantment again refreshes its time. An item holds one element at a time, so a
  new endow replaces the old one.
- **It has a strength.** The strength makes it harder to [dispel](#dispelling-an-enchantment).

| Enchantment                                     | Bound by                                                            | What it does                                                                 | Lasts           | Dispellable                       |
| ----------------------------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------- | --------------- | --------------------------------- |
| Endow Fire, Ice, Wind, Earth                    | The Sage's [Endow](/docs/mechanics/master/basics/#skill-endow-fire) skills | The weapon strikes with the element while somebody wields it                 | 60 to 180 s     | Only on the ground                |
| [Postal Seal](/docs/mechanics/towns-trade/postal/#the-seal) | The post office                                                     | The parcel cannot be opened. When it falls to the ground, it sends itself on | Until delivered | Only on the ground, strength `70` |

**Endow binds to the weapon.** A master's endow sits on the weapon in their hand, not on the master. Putting the
weapon away keeps the element on the weapon, and drawing another weapon does not carry it over. A creature that
fights without a weapon, like most Bestia, carries the endow on its body as a status effect, as before.

**Permanent enchantments use the same rules.** The enchantments that the parked Artificer skill Magic Artisan binds
at an altar are enchantments without an end time. They cannot be dispelled.
[Essences](#sockets-and-essences) in a socket are not enchantments: they are part of the item.

## Dispelling an Enchantment

[Dispel](/docs/mechanics/master/scholar-tree/#skill-dispel) reaches an enchantment only when it is **cast at the item itself**, lying on
the ground. Cast at a creature, it lifts the creature's status effects and leaves every item alone, worn or carried.
Otherwise one Dispel would strip a fighter's whole gear, and that would make it too strong.

Against an enchantment, the target's SMDEF does not count. The strength does:

```text
chance = Dispel base chance - strength
```

A Dispel Lv. 5 (`100%`) against a Postal Seal (`70`) succeeds `30%` of the time. Dispel Lv. 2 (`70%`) and below never
break it.
A dropped endowed weapon has strength `0`, so its endow falls at once. An endow on a Bestia's body is a status effect,
so Dispel lifts it like any buff.

# Item Crafting

Bestia uses a flexible, discovery-driven crafting system. Every player can attempt to craft anything, but crafting
always happens in two distinct phases:

1. **Discovery** – you experiment with raw materials to _learn a blueprint_. This is the risky part: it consumes the
   materials and can fail.
2. **Production** – once a blueprint is learned, you (or your Bestia) can produce that item repeatedly and reliably.

What you are even _allowed_ to attempt depends on the **crafting school** you use — each tied to a
[Master Skill](/docs/mechanics/master/basics/#master-skills). There are six domains of craftable, user-generated content:

- **Weapons** (Blacksmith)
- **Armor** (Blacksmith)
- **Magical Artifacts** (Magic Artisan)
- **Potions and Usables** (Alchemy)
- **Meals** (Cooking)
- **Buildings, Traps, non-magical Devices** (Craftsmanship)

Some materials are exclusive to certain schools (a grape is useless for forging, and a Craftsman cannot forge a blade).
The school is the only "category" you actively choose — and you choose it just by picking the craft action, never by
typing a keyword.

## Starter Blueprints

A new player cannot be expected to discover their first tools. So every master knows a short list of **starter
blueprints** from the start: the first meal, the first ingots, the first sword and armor. The server keeps this list
in one config file (`starter_kit.yml`). A change to the list applies to every master, old and new.

Discovery starts after the starter blueprints. By then a player knows how the crafting window works.

## Discovery: Learning a Blueprint

Every craftable item lives at a point in a shared **feature space**. Each raw material carries its own coordinates in
that space. When you combine materials, their vectors are **averaged** into a single point, weighted by amount. So the
_proportion_ of materials is the "shape" you are aiming for — far more flexible than a rigid grid pattern. A
blueprint's point is the average of its own recipe inputs, so the known recipe always lands exactly on it.

Your crafting skill defines a **radius** around that point. Every known blueprint that falls inside this sphere is a
candidate. Starting from the lowest-level candidate, the game rolls against your skill and the item's difficulty to see
whether you learn it. A discovery attempt always consumes the materials and ends in one of four ways:

{{< table >}}

| Outcome          | Condition                              | In-game feedback                                        |
| ---------------- | -------------------------------------- | ------------------------------------------------------- |
| **Learned**      | in range, roll succeeded               | "You grasp the pattern — blueprint learned!"            |
| **Slipped**      | in range, roll failed                  | "A pattern resonates here but slips away…"              |
| **Beyond skill** | just outside your radius               | "Something faint lies beyond your skill."               |
| **Nothing**      | nothing in range, with a hint (if any) | "These materials resonate with nothing. Too brittle..." |

{{< /table >}}

This resonance feedback removes the classic frustration of not knowing whether a combination is _impossible_ or merely
_unlucky_:

- **Slipped** means the blueprint exists. Keep trying with the same materials.
- **Beyond skill** means you are close, but your radius is too small. Level up the skill rather than swap materials.
- **Nothing** means you should swap materials. It also tells you **where to go**: it names the one or two axes with
  the biggest gap to the nearest blueprint you do not know yet, for example _"too brittle, too light"_. Each attempt
  moves you closer, so discovery is a search you can reason about, not a lottery. If the school has no unknown
  blueprint left, there is no hint.

Salvaging an item never teaches its blueprint. Discovery and shared recipes are the only ways to learn one.

The chance to learn drops with item level and rises with skill. It is floored at **0.1%** for items up to Lv. 100 and
**0.01%** above Lv. 100, so in theory every blueprint is discoverable given enough attempts.

<!-- prettier-ignore -->
{{< chart >}}
{
type: 'line',
data: {
labels: Array.from({length: 150}, (_, i) => i + 1),
datasets: [
{
label: 'Skill 30',
function: function(x) { return Math.max(0.001, Math.min(1, Math.pow(30 / x, 2))); },
fill: false
},
{
label: 'Skill 60',
function: function(x) { return Math.max(0.001, Math.min(1, Math.pow(60 / x, 2))); },
fill: false
},
{
label: 'Skill 90',
function: function(x) { return Math.max(0.001, Math.min(1, Math.pow(90 / x, 2))); },
fill: false
}
]
},
options: {
responsive: true,
scales: {
x: { type: 'linear', title: { display: true, text: 'Item Level' }, min: 1 },
y: { title: { display: true, text: 'Chance to Learn' }, max: 1.0, min: 0 }
}
}
}
{{< /chart >}}

**Example — telling a Health Potion from a Minor Poison.** Both are light fluids with almost identical coordinates;
the only meaningful difference is the **Vitality** axis, and that difference comes entirely from the ingredients, never
from a label you pick:

```text
                State   Vitality   Arcane    (other axes ~0)
Health Potion   -0.9     +0.6       +0.3
Minor Poison    -0.9     -0.5        0.0
```

Drop a healing herb into your mix and it lands at positive Vitality (Health Potion territory); drop a deathcap in and
the very same recipe lands at negative Vitality (Poison territory). Same skill, same station — a different mushroom.

## The Crafting Window

How the window opens and lists recipes is on [Crafting Stations](/docs/mechanics/items-crafting/crafting-stations/#the-window). This
section is about its discovery view.

The feature space is hidden math, so the discovery view shows it as pictures:

- **Material tooltips** name the axes a material pushes, for example _"fluid, restorative"_ for a healing herb. A player
  who wants a healing potion can reason that they need fluid and restorative materials.
- A **radar chart** with one spoke per axis shows the current mix as a shape. It changes as you add or remove
  materials. When you pick a blueprint you already know, its outline is drawn on top. Unknown blueprints are never
  drawn: finding them is the game.

The radar chart is only a view of the vectors. There is no grid, and the position of a material in the window does not
matter.

## Production: Crafting a Known Item

Once a blueprint is learned it is saved to your **blueprint list**, and you or your Bestia can produce the item on
demand. Production has no minigame. A craft by hand is not better than a craft by a Bestia.

The success chance uses two sources:

- The **skill levels** always come from the master, also when their Bestia crafts.
- The **status values** (DEX and WIL) come from whoever crafts: the master, or the Bestia they control. A Bestia with
  high DEX is a good crafter.

By hand, the materials come from the crafter's own inventory, and the item goes there too. At a station, the materials
are paid into the station when the craft is queued, see
[Crafting Stations](/docs/mechanics/items-crafting/crafting-stations/#the-queue). On a failed production the materials are lost.

### Crafted By

A crafted item remembers **who made it and where**: _"Crafted by Alice in Genesis"_. The maker is always the master,
also when their Bestia did the work. Both names are copies taken at craft time, so they stay when the master is
deleted or the world is reset.

This holds for stackable items too. Potions made by two masters never merge into one pile: you hold one pile of
Alice's potions and one of Bob's. Looted, bought and starter items have no maker and stack with each other. A crafted
pile sold to an NPC shop loses its maker, because a shop keeps only counts.

A learned blueprint can be **inscribed onto paper** as a shareable **recipe** and handed to other players, who consume
the recipe to learn the blueprint themselves. Learning from a recipe takes time depending on the item level.

Some properties are not baked into the blueprint but **inherited from the materials at production time**. A single
"elemental flask" blueprint yields a fire flask if you load embercoal or a frost flask if you load frost shard; a
magical draught takes its school from the magical reagent you feed it. Some blueprints also demand a special ingredient
that cannot be substituted. This keeps the feature space small while letting one blueprint cover a whole family of
variants.

## Construction Crafting Success Chance

For the Craftsmanship domain specifically — workbenches, structures, traps and other non-magical devices built with
[Carpentry](/docs/mechanics/master/craftsman-tree/#skill-carpentry) — the Production roll above is shaped by skill rank and status
values, not material quality alone, much like [Item Customization](#item-customization)'s slot-cutting chance. A
**base chance** falls off with the item level being attempted, on top of which
[Carpentry](/docs/mechanics/master/craftsman-tree/#skill-carpentry), [Master Craftsman](/docs/mechanics/master/craftsman-tree/#skill-master-craftsman),
temporary buffs and the Craftsman's own status values are added. The DEX and WIL terms apply to every craft, not only
to Craftsmanship, and they use the status values of whoever crafts (see [Production](#production-crafting-a-known-item)):

```kotlin
baseChance = 0.90 - max(0, itemLevel - 10) * 0.015
chance = clamp(baseChance + carpentryBonus + masterCraftsmanBonus + buffBonus + circleBonus + floor(DEX / 10) * 0.02 + floor(WIL / 10) * 0.01, 0.01, 1.0)
```

Levels 1-10 all share the same `90%` base chance, so [Carpentry](/docs/mechanics/master/craftsman-tree/#skill-carpentry) alone gets
you the rest of the way there: Lv. 1 (+5%) reaches 95%, Lv. 2 (+10%) already caps out at 100%. Every level above 10
removes another 1.5%, reaching `0%` at level 70 and `-30%` at level 90 - firmly negative, meaning a level 90 build
needs real investment across skill, buffs and stats to be worth attempting at all. Bonus sources:

- [Carpentry](/docs/mechanics/master/craftsman-tree/#skill-carpentry) rank — up to **+50%** at Lv. 10.
- [Master Craftsman](/docs/mechanics/master/craftsman-tree/#skill-master-craftsman) rank — up to **+10%** at Lv. 5.
- Temporary buffs (a support consumable, an ally's blessing, …) — typically **+5% to +10%** while active.
- A [Mana Circle](/docs/mechanics/master/basics/#mana-circles) — up to **+45%** with six participants on mana-rich ground.
- **DEX** — `+2%` per 10 points (see [Status Values](/docs/mechanics/combat/statusvalues/#dexterity---dex)).
- **WIL** — `+1%` per 10 points (see [Status Values](/docs/mechanics/combat/statusvalues/#willpower---wil)).

**Example:** A Craftsman attempts a level 90 item with maxed Carpentry (Lv. 10, +50%), maxed Master Craftsman (Lv. 5,
+10%), a +10% buff active, 150 DEX (+30%) and 50 WIL (+5%). `baseChance = 0.90 - 80 * 0.015 = -0.30`, so
`chance = -0.30 + 0.50 + 0.10 + 0.10 + 0.30 + 0.05 = 0.75` — a 75% success chance. Push the same fully-maxed build to
a level 100 item and `baseChance` drops to `-0.45`, bringing the total down to 60%: raising skill and stats raises
the ceiling, it never flattens the curve, so the chance keeps eroding the higher the item level climbs.

<!-- prettier-ignore -->
{{< chart >}}
{
type: 'line',
data: {
labels: Array.from({length: 150}, (_, i) => i + 1),
datasets: [
{
label: 'Base Chance (no bonuses)',
function: function(x) { return Math.max(0.01, 0.90 - Math.max(0, x - 10)*0.015); },
fill: false
},
{
label: 'Fully Maxed (Carpentry+Master Craftsman+Buff+DEX 150+WIL 50)',
function: function(x) { var base = 0.90 - Math.max(0, x - 10)*0.015; return Math.max(0.01, Math.min(1, base + 1.05)); },
fill: false
}
]
},
options: {
responsive: true,
scales: {
x: { type: 'linear', title: { display: true, text: 'Item Level' }, min: 1 },
y: { title: { display: true, text: 'Success Chance' }, max: 1.0, min: 0 }
}
}
}
{{< /chart >}}

## Ore Refinement Success Chance

Raw ore is dead weight until it has been through a [Furnace](/docs/mechanics/items-crafting/item-list/#furnace). Smelting is
deliberately **not** blueprint-driven — there is nothing to discover, every ore has exactly one refined form — but each
charge still rolls against a success chance, and a failed smelt turns the whole batch into slag: the ore **and** the
fuel are lost.

The roll is governed by the Blacksmith's [Ore Refinement](/docs/mechanics/master/craftsman-tree/#skill-ore-refinement) skill and, like
[Item Customization](#item-customization) and [Construction Crafting](#construction-crafting-success-chance), starts
from a **base chance that falls with the level of the ore** being worked:

```kotlin
baseChance = 0.30 - max(0, oreLevel - 10) * 0.01
chance = clamp(baseChance + oreRefinementBonus + fuelBonus + circleBonus + floor(STR / 10) * 0.02 + floor(WIL / 10) * 0.01, 0.01, 1.0)
```

The two simplest ores — [Tin](/docs/mechanics/items-crafting/item-list/#tin-ore) and [Copper](/docs/mechanics/items-crafting/item-list/#copper-ore) —
sit at or below Lv. 10 and therefore share the same `30%` base chance, which a single rank of Ore Refinement already
doubles. Every ore level above 10 removes another 1%, so the base reaches `0%` at ore level 40, `-30%` at level 70 and
`-60%` at [Adamantium Ore](/docs/mechanics/items-crafting/item-list/#adamantium-ore)'s level 100. See
[Refining](/docs/mechanics/items-crafting/natural-resources/#refining) for the level and base chance of every ore. Bonus sources:

- [Ore Refinement](/docs/mechanics/master/craftsman-tree/#skill-ore-refinement) rank — up to **+90%** at Lv. 3.
- **Fuel** — [Coal](/docs/mechanics/items-crafting/item-list/#coal) is the reference fuel at `±0%`;
  [Charcoal](/docs/mechanics/items-crafting/item-list/#charcoal) burns cooler and costs `-10%`.
- A [Mana Circle](/docs/mechanics/master/basics/#mana-circles) — up to **+45%** with six participants on mana-rich ground.
- **STR** — `+2%` per 10 points; working the bellows and turning a heavy charge is physical labour
  (see [Status Values](/docs/mechanics/combat/statusvalues/#strength---str)).
- **WIL** — `+1%` per 10 points; holding a furnace at temperature for hours is a matter of patience
  (see [Status Values](/docs/mechanics/combat/statusvalues/#willpower---wil)).

**Example:** A Blacksmith with maxed [Ore Refinement](/docs/mechanics/master/craftsman-tree/#skill-ore-refinement) (Lv. 3, `+90%`)
burning coal, at 60 STR (`+12%`) and 30 WIL (`+3%`), attempts [Adamantium Ore](/docs/mechanics/items-crafting/item-list/#adamantium-ore)
(Lv. 100): `baseChance = 0.30 - 90 * 0.01 = -0.60`, so `chance = -0.60 + 0.90 + 0.00 + 0.12 + 0.03 = 0.45` — a 45%
success chance on the hardest ore in the world, meaning even a maxed smith loses roughly every second batch. The same
smith at 80 STR / 40 WIL reaches `50%`; feeding the furnace charcoal instead of coal costs a flat 10 points off either
figure.

Ore level 100 is a landmark, not a ceiling — **the base chance is never capped** and keeps falling by 1% per level
beyond it, so an Epic-tier ore at Lv. 130 leaves the 60 STR / 30 WIL smith above at just 15%. Only the total is
clamped, so an attempt is never above 100% nor entirely impossible.

<!-- prettier-ignore -->
{{< chart >}}
{
type: 'line',
data: {
labels: Array.from({length: 140}, (_, i) => i + 1),
datasets: [
{
label: 'Base Chance (no bonuses)',
function: function(x) { return Math.max(0.01, 0.30 - Math.max(0, x - 10)*0.01); },
fill: false
},
{
label: 'Ore Refinement Lv. 3 + Coal + 60 STR/30 WIL',
function: function(x) { var base = 0.30 - Math.max(0, x - 10)*0.01; return Math.max(0.01, Math.min(1, base + 1.05)); },
fill: false
}
]
},
options: {
responsive: true,
scales: {
x: { type: 'linear', title: { display: true, text: 'Ore Level' }, min: 1 },
y: { title: { display: true, text: 'Success Chance' }, max: 1.0, min: 0 }
}
}
}
{{< /chart >}}

## The Feature Space Axes

The feature space uses a handful of **bipolar** axes. Each runs from a negative pole through a neutral `0` to a positive
pole, so an axis that is irrelevant to an item simply sits near `0` (a potion has no _Edge_, a sword has no _Vitality_).

{{< table >}}

| Axis           | − Pole ⟷ + Pole        | Captures                                        |
| -------------- | ---------------------- | ----------------------------------------------- |
| **State**      | Fluid ⟷ Solid          | consumables vs. solid goods                     |
| **Integrity**  | Brittle ⟷ Resilient    | fragile vs. durable (independent of hardness)   |
| **Heft**       | Light ⟷ Massive        | daggers vs. warhammers, trinkets vs. buildings  |
| **Edge**       | Blunt ⟷ Keen           | crushing vs. cutting weapons                    |
| **Vitality**   | Necrotic ⟷ Restorative | poisons vs. healing food & potions              |
| **Arcane**     | Warding ⟷ Charged      | anti-magic vs. mana-dense items (mundane = `0`) |
| **Complexity** | Crude ⟷ Intricate      | clubs & walls vs. artifacts & devices           |

{{< /table >}}

Element type (fire/ice/…) and magic school (restoration/illusion/…) are deliberately **not** axes — they are the
production-inherited facets described above. Forcing every element and school onto its own axis would explode the
dimensionality; letting the dominant reagent decide keeps the space small and flexible.

**Example — Mace vs. Sword vs. Hammer.** All three are solid, resilient, mundane metal weapons, so they sit at the same
place on every _material_ axis. What separates them is pure geometry — exactly the **Heft** and **Edge** axes:

```text
         Heft    Edge
Sword    -0.1    +0.7     light and keen
Mace     +0.4    -0.4     heavier, blunt
Hammer   +0.8    -0.6     massive, blunt
```

Without Heft and Edge these three would collapse onto a single point — which is why material properties alone were not
enough to describe every item.

# Craft Duration

Craft duration is determined by the item level which the player is crafting. Skill points in the suitable skill tree
(weapon, equipment, construction or alchemy, artifacts) reduces the build time. The `baseDuration` is given in real
time seconds.

```kotlin
baseDurationSeconds = 1.2 * itemLevel * itemLevel
baseDurationConsumablesSeconds = .3 * baseDurationSeconds
```

<!-- prettier-ignore -->
{{< chart >}}
{
type: 'line',
data: {
labels: Array.from({length: 100}, (_, i) => i + 1),
datasets: [
{
label: 'Craft Time / s',
function: function(x) { return 1.2 * x * x; },
fill: false
},
{
label: 'Craft Time Consumables / s',
function: function(x) { return 0.3 * 1.2 * x * x; },
fill: false
}
]
}
}
{{< /chart >}}

# Forging and Random Stats

Most weapons and armor in Bestia are forged by players. Every forged copy of an item can be a little different:
it may roll extra stats and open sockets for bestia essences. Like in Diablo, two iron swords from the same forge
are rarely equal.

An item has three parts:

- **Base properties.** Weapon attack and armor defense. They make a weapon a weapon. Every copy has the same.
- **Fixed stats.** Bonuses that every copy has, such as `+4 STR` on an iron sword.
- **Random stats and sockets.** Bonuses that the forge rolls for each copy from the item's **template**.

The item level of a copy follows from all three. A copy with more or bigger stats has a higher level. See
[Item Level](#item-level-of-a-forged-copy).

Forging itself (discovering a blueprint, the success chance, craft time) is described in
[Item Crafting](#item-crafting) and in the skills
[Forge Weapon](/docs/mechanics/master/craftsman-tree/#skill-forge-weapon) and [Forge Armor](/docs/mechanics/master/craftsman-tree/#skill-forge-armor).

## Templates

The item data (`items.yml` on the server) describes what a copy may roll. An item without a template only has its
fixed stats. An item without any stats is fine too.

```yaml
- id: 19
  item-db-name: iron_sword
  base-level: 20
  stats:
    STR: 4
    DEX: 1
  random-stats:
    affixes:
      - pool: ATTRIBUTE
      - pool: OFFENSE
        chance: 30
    sockets: [10]
```

- `base-level` is where the item level starts. It covers the base properties.
- `stats` are the fixed stats.
- Each entry under `affixes` is one **slot**. A slot rolls at most one stat. It names a `pool` to pick the stat from,
  or a single `stat`. `chance` is the chance in percent that the slot rolls at all (default 100). `min` and `max`
  limit the value, in the stat's own unit.
- `sockets` has one chance per socket. A socket can only open when the socket before it opened.

This template gives every iron sword one random attribute. Three in ten also get an offensive stat, and one in ten
gets a socket.

A slot can also name one stat with fixed limits. This linen tunic gives at most +3 INT:

```yaml
random-stats:
  affixes:
    - stat: INT
      chance: 60
      max: 3
    - pool: ARCANE
      chance: 50
```

### Stat Pools

| Pool      | Stats                                                      |
| --------- | ---------------------------------------------------------- |
| ATTRIBUTE | STR, AGI, VIT, INT, DEX, WIL                               |
| OFFENSE   | ATK, MATK, HIT, CRIT                                       |
| DEFENSE   | DEF, MDEF, FLEE, max HP                                    |
| ARCANE    | max mana, cast time, HP, mana and stamina recovery         |
| RESIST    | resistance against one element (neutral, fire, water, ...) |

## Item Level of a Forged Copy

Every stat is worth **points**. One point is what one attribute point gives a character. So all six attributes
cost the same, and a derived stat costs what the attribute behind it would cost:

| Stat                           | 1 point is | Why                                                                        |
| ------------------------------ | ---------- | -------------------------------------------------------------------------- |
| STR, AGI, VIT, INT, DEX, WIL   | +1         | The base unit.                                                             |
| ATK, MATK                      | +2         | The damage formula doubles the attribute part of ATK.                      |
| HIT                            | +1         | 1 DEX gives 1 HIT.                                                         |
| FLEE                           | +1         | 1 AGI gives 1 FLEE.                                                        |
| CRIT                           | +⅓         | CRIT is WIL ÷ 3, so +1 CRIT costs 3 points.                                |
| Max HP, max mana               | +1%        | 1 VIT gives 1% more HP, 1 INT 1% more mana.                                |
| DEF, MDEF                      | +1%        | About what 1 VIT gives: half a point of soft defense and 1% HP.            |
| HP, mana and stamina recovery  | +5%        | Recovery grows with VIT ÷ 5.                                               |
| Resistance against one element | +3%        | It only helps against one of ten elements.                                 |
| Cast time                      | −1%        | No attribute gives it. A cast never gets shorter than a fifth of its time. |

Sockets are worth points too. **One socket is 5 points**, about what a typical essence brings.

The item level is then:

```text
statLevel = 3 × (points of all stats + 5 × sockets)
itemLevel = round(√(baseLevel² + statLevel²))
```

So three item levels buy one point. Base level and stat level add like the two sides of a right triangle. More
stats always raise the level. But a strong base absorbs a small bonus: `+1 STR` on a level 95 sword does not make
it a level 98 sword. A drawback, such as `AGI: -2` on a heavy cuirass, lowers the level, but never below the base
level.

| Item                     | Base level | Stats                 | Points | Item level |
| ------------------------ | ---------: | --------------------- | -----: | ---------: |
| Simple shirt             |          1 | +5 INT                |      5 |         15 |
| Simple shirt             |          1 | 2 sockets             |     10 |         30 |
| Iron sword (fixed stats) |         20 | +4 STR, +1 DEX        |      5 |         25 |
| Iron sword, rolled       |         20 | fixed, +3 STR         |      8 |         31 |
| Iron sword, rolled       |         20 | fixed, +3 STR, socket |     13 |         44 |
| Adamantium blade         |         95 | +20 STR               |     20 |        112 |

The item level is the level a character needs to wear the copy. It also sets the item's
[category](/docs/mechanics/items-crafting/items/#item-level), and with it the refinement bonus and chances, the chance to cut
another socket with [Item Customization](/docs/mechanics/items-crafting/items/#item-customization), and which
[Equipment Repair](/docs/mechanics/master/craftsman-tree/#skill-equipment-repair) rank can fix it. The upgrade level is not part of
the item level.

### What the Numbers Mean

At item level L, a top roll of a single stat is about **L ÷ 3**:

| Category  | Item level | Top single stat |
| --------- | ---------- | --------------: |
| Mundane   | 20         |              +6 |
| Superior  | 50         |             +16 |
| Rare      | 80         |             +26 |
| Legendary | 100        |             +33 |
| Epic      | 130        |             +43 |

These numbers look big next to Ragnarok Online. They are not, because a level is worth few attribute points. A
master gains about three attribute points per level. The server's own combat formulas give, for a master against a
master of the same level:

| Level | +5 STR      | +20 STR     | +5 VIT          | +20 VIT         |
| ----: | ----------- | ----------- | --------------- | --------------- |
|    20 | +20% damage | +70% damage | +11% to survive | +44% to survive |
|    65 | +12% damage | +34% damage | +7% to survive  | +29% to survive |
|   100 | +10% damage | +28% damage | +5% to survive  | +26% to survive |

The forge takes the lower of two rolls (see [Rolling](#rolling)), so an average copy rolls about a third of the top
value. A full set of nine average items, spread over all attributes, makes a master about 1.5 times as deadly and
1.2 times as tough at level 65. The [reference master](/docs/mechanics/bestias/bestia-design/#2-the-reference-master) that
bestias are balanced against carries exactly such a set.

{{< alert context="warning" text="There is no stat cap. A build that puts every top roll into one attribute gets very strong: nine top-rolled STR items at Lv 100 deal about ten times the damage, and nine VIT items make a master almost immune to bestias of the same level. Such a build can do nothing else. A soft cap is an open option for later." />}}

## Rolling

When a forge succeeds, the server rolls the template of the new copy:

1. It works out the **cap**: the highest stat level this forge can reach.
2. Sockets roll first, one after the other. Each open socket uses 5 points of the cap.
3. Each slot rolls its chance. If it rolls, the slot picks a stat from its pool.
4. The **quality** is the lower of two random numbers between 0 and 1. A top roll is rare: a quality above 0.9
   happens in 1 of 100 rolls.
5. The value is `quality × remaining points`, in the stat's own unit, kept between the slot's `min` and `max`.
6. If all slots together go over the cap, every value shrinks by the same share. A value that becomes 0 is dropped.

Fixed stats do not count against the cap. Forge success and craft time use the base level, so a good roll can never
make a forge fail.

### The Cap

The cap comes from the smith and from the material:

```text
cap = min(reliableItemLevel, mainMaterialLevel + 20)
```

- `reliableItemLevel` is the "Reliable Item Level" of [Forge Weapon](/docs/mechanics/master/craftsman-tree/#skill-forge-weapon) or
  [Forge Armor](/docs/mechanics/master/craftsman-tree/#skill-forge-armor): 10 per skill level. At skill level 10 the smith sets no
  limit, only the material does.
- `mainMaterialLevel` is the level of the input the recipe needs most of, for example the iron of an iron sword,
  not its coal.

| Main material                                           | Level | Cap | Points at most |
| ------------------------------------------------------- | ----: | --: | -------------: |
| [Tin](/docs/mechanics/items-crafting/item-list/#tin-ore)               |     5 |  25 |              8 |
| [Copper](/docs/mechanics/items-crafting/item-list/#copper-ore)         |    10 |  30 |             10 |
| Iron                                                    |    20 |  40 |             13 |
| Silver                                                  |    35 |  55 |             18 |
| Gold                                                    |    50 |  70 |             23 |
| Mercury                                                 |    60 |  80 |             26 |
| Palladium                                               |    70 |  90 |             30 |
| Mithril                                                 |    85 | 105 |             35 |
| [Adamantium](/docs/mechanics/items-crafting/item-list/#adamantium-ore) |   100 | 120 |             40 |

The material levels are the ore levels from [Refining](/docs/mechanics/items-crafting/natural-resources/#refining).

**Example.** A smith with Forge Weapon Lv. 5 forges an iron sword. The cap is `min(50, 20 + 20) = 40`, so the roll
has 13 points. The socket (10%) does not open. The attribute slot rolls STR with a quality of 0.23: `0.23 × 13.3`
gives +3 STR. The offense slot (30%) does not roll. The copy has its fixed `+4 STR +1 DEX` and a rolled `+3 STR`.
That is 8 points, and its item level is 31.

### Loot

Equipment that drops from a bestia will roll the same way, with the bestia's level as the cap. This is not built
yet: today a dropped item has no per-copy state until someone picks it up.

## Sockets and Essences

A socket is an open slot for a bestia essence, like a card slot in Ragnarok Online. Sockets come from two places:

- The template rolls them when the item is forged.
- [Item Customization](/docs/mechanics/items-crafting/items/#item-customization) cuts them into an item later.

Every socket raises the item level by 5 points, both ways. So cutting a socket into an item makes it harder to
wear, and harder to cut the next one.

An essence lives in a gem. [Runic Etching](/docs/mechanics/master/craftsman-tree/#skill-runic-etching) binds the essence of a Bestia
into a cut gem, and the result is an **Essence Gem**. Runic Etching is not part of the game yet. These rules are set:

- **Every essence gem fits every socket.** There is no level limit on the socket side.
- **The gem limits the Bestia.** A cut gem has no power of its own. Its only property is how strong an essence it can
  hold, and that follows how rare it is. A rarer gem holds every lower level too.
- An essence brings its own stats. It does not change the item level: the socket already paid for it.

| Gem      | Found                                     | Holds Bestias up to |
| -------- | ----------------------------------------- | ------------------- |
| Amethyst | Shallow geodes, common                    | Lv. 20              |
| Emerald  | Deep in granite                           | Lv. 40              |
| Ruby     | In marble where plates collide            | Lv. 60              |
| Pyrelith | In cooled lava, in strong volcanic fields | Lv. 80              |
| Diamond  | Deepest of all, under the oldest land     | Any level           |

Mining a gem voxel gives a rough gem of its kind, and [Gem Cutting](/docs/mechanics/master/survival-tree/#skill-gem-cutting) turns it
into a cut gem. A failed cut and a failed etching both shatter the gem, so a strong essence costs a rare gem for every
try. A [Rough Gemstone](/docs/mechanics/items-crafting/item-list/#rough-gemstone) from a Bestia's digging or a treasure cache is one of
the five, unknown until it is cut.

## Item Level Calculator

{{< include "/docs/mechanics/items-crafting/item-level-calculator" >}}

# Damaging of Items

As with any item in Bestia, it can be damaged. There will be professions capable of repairing items. The durability of an item is given via a percentage. Items will function normally within a wide range of their condition. At a certain
level, they slowly lose their properties (armor loses its defense value, weapons hit less often, magic staffs suffer a damage penalty, etc.), until the items become unusable. If you then inflict further damage on them, they can be completely and
irretrievably destroyed.

| Durability | State                     |
| ---------- | ------------------------- |
| 30 - 100%  | Normal Operation          |
| 1 - 29%    | Increasing Damage Effects |
| 0%         | Item breaks unrecoverably |

## Stackable Gear

Most gear never stacks: every copy carries its own durability. A torch is different. Unlit torches are all the same, so
they share one pile. Durability only matters once a torch burns.

- **Wearing one splits it off.** Putting a torch into the light source slot takes one torch off the pile. That copy gets
  its own durability and burns down. The rest of the pile stays untouched.
- **A partly burnt torch stays a copy of its own.** It shows its own wear bar in the bag and never merges back into the
  pile. It can be worn again later.
- **An unused torch goes back.** A torch taken off before it ever burned folds back into its pile. A torch carried
  through the day therefore does not clutter the bag.
- **Burnt time cannot be repaired.** Equipment repair, upgrades and rune slots refuse a partly burnt torch. A repair would
  turn a stub into a fresh torch.

Stackable gear cannot have random stats, because rolled copies are not interchangeable.

Ammunition is not worn at all. The quiver only points at it in the bag, and each shot takes one. See
[Ranged Combat](/docs/mechanics/combat/ranged-combat/).

Items on the ground can suffer damage from attacks. They are affected by Area Of Effect spells and can be targeted manually, although they are not auto-targeted like enemies.

## Item Material

Every item is made of a material, and the material decides how a stack lying on the ground fares when something damages it. A pile of paper is gone in a flash of fire, while a pile of iron ingots shrugs the same flames off.

The server sets the material with `material` in `items.yml`. It is required: an item without one does not load. How each material behaves is described once, in `item-materials.yml`:

- **Integrity** is how much damage a stack can take before it is destroyed. It belongs to the whole stack, not to a single item, so every unit in a pile burns alike and fifty apples are no sturdier than one.
- **Hardness** comes off every hit. A hit at or below the hardness does nothing, however often it lands.
- **Element multipliers** are the percentage of a hit that lands, per attack element. An element that is not listed lands in full. Water is listed already for floods, which do not exist yet.

```kotlin
damage = max(0, hit * elementMultiplier / 100 - hardness)
```

The damage adds up over the time a stack lies on the ground, and the stack is destroyed once the total reaches its integrity. The values are shaped right rather than balanced, and will be tuned.

{{< table >}}

| Material | Integrity | Hardness | Fire | Water |
| -------- | --------- | -------- | ---- | ----- |
| Paper    | 10        | 0        | 300% | 300%  |
| Plant    | 20        | 0        | 200% | 100%  |
| Food     | 30        | 0        | 150% | 150%  |
| Cloth    | 30        | 0        | 200% | 50%   |
| Leather  | 80        | 2        | 100% | 50%   |
| Wood     | 100       | 3        | 150% | 25%   |
| Glass    | 40        | 5        | 50%  | 0%    |
| Crystal  | 200       | 10       | 25%  | 0%    |
| Metal    | 400       | 15       | 0%   | 0%    |
| Stone    | 500       | 20       | 0%   | 0%    |

{{< /table >}}

## Item Status Values

In order to let items participate in the battle system they need status values. An item's status value distribution is based upon their type (weapon, potion, book etc) and the total amount of points to distribute is given by the item level. See [Status Values](/docs/mechanics/combat/statusvalues/) for how these points translate into combat stats.

```kotlin
availableItemStatPoints = itemLv
```

# Inventory

The inventory is an important system for interaction between the player and the game mechanics. It must be easy to access
and logically built. Each Bestia has its own inventory. So the player must be careful to exchange items between the
Bestias in time. Trading must be fast to do to reduce the annoyance.

If a Bestia/Entity is killed and has had some items inside its inventory usually the items are dropped and can be looted.
If a player killed a mob, the loot will be protected for 30 seconds so they can exclusively loot it.

## Exchanging Items with Your Own Bestias

A Master and its Bestias hand items to each other without a trade window. Any two of them can do it: the Master and a
Bestia, either way round, or two Bestias. Neither has to be the one the player is controlling.

- **Reach:** the two have to stand within 5 m of each other, and at most 3 m apart in height. A Bestia on a ledge above
  the Master cannot pass anything down.
- **Opening it:** the inventory window shows a button for each of the player's other entities, greyed out while it
  stands too far away. Clicking one shows its bag beside the inventory. Right-clicking one of your own Bestias in the
  world and choosing *Exchange items* does the same. The bag stays chosen while the Bestia walks off and comes back by
  itself when it returns.
- **Moving items:**
  - Drag an item from one bag to the other to move the whole stack.
  - Hold Ctrl when dropping it to choose how many.
  - Shift-click an item to move its whole stack.
  - Right-click an item to choose *Move all*, *Move one* or *Move amount...*.
- **Limits:** the receiver's [weight limit](#weight-limit) applies. Only as much as it can still carry is offered,
  and a move that would overload it is refused. Worn gear has to be taken off first, and a crafted stack keeps its
  maker.
- **Cost:** moving items is instant and free.

A trade with another player is made by the Master alone, from the Master's own bag. A Bestia hands its goods to the
Master first.

## Weight Limit

Items weight is given by units of about 1kg per unit. The smallest division is 0.1 units which approximates to 100gr.
The maximum amount a Bestia can carry is dependent on its strength and its vitality. The [Maximize Carry Capacity](/docs/mechanics/master/survival-tree/#skill-maximize-carry-capacity) skill raises the carriable weight limit of the Master and of every Bestia alike. The formula is given as:

```kotlin
weightLimit = STR / 2 + VIT / 5 + 15 + LEVEL / 5
```

<!-- prettier-ignore -->
{{< chart >}}
{
type: 'line',
data: {
labels: Array.from({length: 100}, (_, i) => i + 1),
datasets: [
{
label: 'Weight Limit (High STR)',
function: function(x) { return 100 / 2 + 30 / 5 + 15 + x / 5; },
fill: false
},
{
label: 'Weight Limit (Medium STR)',
function: function(x) { return 60 / 2 + 30 / 5 + 15 + x / 5; },
fill: false
},
{
label: 'Weight Limit (Low STR, High VIT)',
function: function(x) { return 20 / 2 + 90 / 5 + 15 + x / 5; },
fill: false
}
]
}
}
{{< /chart >}}

Please note that depending on your used up weight limit regeneration of certain [status values](/docs/mechanics/combat/statusvalues/)
might be affected.
