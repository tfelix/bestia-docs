---
weight: 500
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

{{< table >}}

| Item Level | Category  |
| ---------- | --------- |
| 1 - 20     | Mundane   |
| 21 - 50    | Superior  |
| 51 - 80    | Rare      |
| 81 - 100   | Legendary |
| 101+       | Epic      |

{{< /table >}}

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
The upgrade chances can be increased by leveling up the relevant [Master Skill](/docs/mechanics/master/#master-skills) (e.g. Weaponry Research).

# Armor Refinement

A refined armor grants increased **[hard defense](/docs/server/battle#value-hard_def)**. Each refinement level adds 10 armor points. These armor points are then converted into a hard-defense percentage with diminishing returns: the value asymptotically approaches 100% but never reaches it, so every additional percent of hard defense costs progressively more armor points. There is no hard cap — extremely high defense is possible in theory, just increasingly expensive.

```kotlin
hardDefense = armorPoints / (armorPoints + 100)
```

{{< chart >}}
{
	type: 'line',
	data: {
		labels: Array.from({length: 101}, (_, i) => i * 10),
		datasets: [
			{
				label: 'Hard Defense',
				function: function(x) { return x / (x + 100); },
				fill: false
			}
		]
	},
  options: {
    responsive: true,
    scales: {
      x: {
        type: 'linear',
        title: { display: true, text: 'Armor Points' }
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
The upgrade chances can be increased by leveling up the relevant [Master Skill](/docs/mechanics/master/#master-skills) or by buffs and items.

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

# Item Crafting

Bestia uses a flexible, discovery-driven crafting system. Every player can attempt to craft anything, but crafting
always happens in two distinct phases:

1. **Discovery** – you experiment with raw materials to *learn a blueprint*. This is the risky part: it consumes the
   materials and can fail.
2. **Production** – once a blueprint is learned, you (or your Bestia) can produce that item repeatedly and reliably.

What you are even *allowed* to attempt depends on the **crafting school** you use — each tied to a
[Master Skill](/docs/mechanics/master/#master-skills). There are six domains of craftable, user-generated content:

* **Weapons** (Blacksmith)
* **Armor** (Blacksmith)
* **Magical Artifacts** (Magic Artisan)
* **Potions and Usables** (Alchemy)
* **Meals** (Cooking)
* **Buildings, Traps, non-magical Devices** (Craftsmanship)

Some materials are exclusive to certain schools (a grape is useless for forging, and a Craftsman cannot forge a blade).
The school is the only "category" you actively choose — and you choose it just by picking the craft action, never by
typing a keyword.

## Discovery: Learning a Blueprint

Every craftable item lives at a point in a shared **feature space**. Each raw material carries its own coordinates in
that space; when you combine materials their vectors **sum** into a single point, so the *proportion* of materials is
the "shape" you are aiming for — far more flexible than a rigid grid pattern.

Your crafting skill defines a **radius** around that point. Every known blueprint that falls inside this sphere is a
candidate. Starting from the lowest-level candidate, the game rolls against your skill and the item's difficulty to see
whether you learn it. A discovery attempt always consumes the materials and ends in one of three ways:

{{< table >}}

| Outcome     | Condition                | In-game feedback                             |
| ----------- | ------------------------ | -------------------------------------------- |
| **Learned** | in range, roll succeeded | "You grasp the pattern — blueprint learned!" |
| **Slipped** | in range, roll failed    | "A pattern resonates here but slips away…"   |
| **Nothing** | nothing in range         | "These materials resonate with nothing."     |

{{< /table >}}

This resonance feedback removes the classic frustration of not knowing whether a combination is *impossible* or merely
*unlucky*: a **Slipped** result means the blueprint exists — keep trying with the same materials, while **Nothing**
means you should swap materials. If a blueprint sits just outside your radius, the game instead hints *"something faint
lies beyond your skill"* — telling you to level up rather than swap materials, since the radius grows with skill.

The chance to learn drops with item level and rises with skill. It is floored at **0.1%** for items up to Lv. 100 and
**0.01%** above Lv. 100, so in theory every blueprint is discoverable given enough attempts.

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

## Production: Crafting a Known Item

Once a blueprint is learned it is saved to your **blueprint list**, and you or your Bestia can produce the item on
demand. Production success is determined by the **level and quality of the raw materials** used — higher-level materials
mean a higher success chance. On a failed production the materials are lost.

A learned blueprint can be **inscribed onto paper** as a shareable **recipe** and handed to other players, who consume
the recipe to learn the blueprint themselves. Learning from a recipe takes time depending on the item level.

Some properties are not baked into the blueprint but **inherited from the materials at production time**. A single
"elemental flask" blueprint yields a fire flask if you load embercoal or a frost flask if you load frost shard; a
magical draught takes its school from the magical reagent you feed it. Some blueprints also demand a special ingredient
that cannot be substituted. This keeps the feature space small while letting one blueprint cover a whole family of
variants.

## The Feature Space Axes

The feature space uses a handful of **bipolar** axes. Each runs from a negative pole through a neutral `0` to a positive
pole, so an axis that is irrelevant to an item simply sits near `0` (a potion has no *Edge*, a sword has no *Vitality*).

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
place on every *material* axis. What separates them is pure geometry — exactly the **Heft** and **Edge** axes:

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

# Damaging of Items

As with any item in Bestia, it can be damaged. There will be professions capable of repairing items. The durability of an item is given via a percentage. Items will function normally within a wide range of their condition. At a certain
level, they slowly lose their properties (armor loses its defense value, weapons hit less often, magic staffs suffer a damage penalty, etc.), until the items become unusable. If you then inflict further damage on them, they can be completely and
irretrievably destroyed.

| Durability | State                     |
| ---------- | ------------------------- |
| 30 - 100%  | Normal Operation          |
| 1 - 29%    | Increasing Damage Effects |
| 0%         | Item breaks unrecoverably |

Items on the ground can suffer damage from attacks. They are affected by Area Of Effect spells and can be targeted manually, although they are not auto-targeted like enemies.

## Item Status Values

In order to let items participate in the battle system they need status values. An item's status value distribution is based upon their type (weapon, potion, book etc) and the total amount of points to distribute is given by the item level. See [Status Values](/docs/mechanics/statusvalues/) for how these points translate into combat stats.

```kotlin
availableItemStatPoints = itemLv
```

# Inventory

The inventory is an important system for interaction between the player and the game mechanics. It must be easy to access
and logically built. Each Bestia has its own inventory. So the player must be careful to exchange items between the
Bestias in time. Trading must be fast to do to reduce the annoyance.

If a Bestia/Entity is killed and has had some items inside its inventory usually the items are dropped and can be looted.
If a player killed a mob, the loot will be protected for 30 seconds so they can exclusively loot it.

## Weight Limit

Items weight is given by units of about 1kg per unit. The smallest division is 0.1 units which approximates to 100gr.
The maximum amount a Bestia can carry is dependent on its strength and its vitality. The [Maximize Carry Capacity](/docs/mechanics/master/#skill-maximize-carry-capacity) and [Enlarge Weight Limit](/docs/mechanics/master/#skill-enlarge-weight-limit) skills can increase the carriable weight limit. The formula is given as:

```kotlin
weightLimit = STR / 2 + VIT / 5 + 15 + LEVEL / 5
```

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


Please note that depending on your used up weight limit regeneration of certain [status values](/docs/mechanics/statusvalues/)
might be affected.
