---
weight: 505
aliases: ["/docs/mechanics/forging/"]
title: Crafting & Forging
description: Discovering blueprints, producing items, how long a craft takes, and forging copies with random stats.
---

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
values, not material quality alone, much like [Item Customization](/docs/mechanics/items-crafting/items/#item-customization)'s slot-cutting chance. A
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
[Item Customization](/docs/mechanics/items-crafting/items/#item-customization) and [Construction Crafting](#construction-crafting-success-chance), starts
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
