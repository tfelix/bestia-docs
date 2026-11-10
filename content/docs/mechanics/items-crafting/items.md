---
weight: 500
title: Items
description: Item level, armor and weapon types, refinement, customization, enchantments, durability and inventory.
katex: true
---

Items can be obtained by the player and carried around. The number of items each entity can carry is determined by
its [Inventory](#inventory). Each Bestia (and many other entities) has its own inventory with a different size.

Items are mostly [crafted](/docs/mechanics/items-crafting/crafting/) by the players. It's quite rare to obtain direct item drops from killed enemies. Instead it's very common to loot resources when enemies are killed.

# Item Level

Each item has a level assigned. This level is important to determine how hard or easy it is to forge this item, upgrade
it and so on. It also affects how spells interact with the item entity.

The level of a forged item is not fixed. A copy starts at its item's base level, and its stats and sockets raise it -
see [Forging](/docs/mechanics/items-crafting/crafting/#forging-and-random-stats). A character needs this level to wear the copy.

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
[Sockets and Essences](/docs/mechanics/items-crafting/crafting/#sockets-and-essences). So the next slot is harder to cut.

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
[Essences](/docs/mechanics/items-crafting/crafting/#sockets-and-essences) in a socket are not enchantments: they are part of the item.

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
