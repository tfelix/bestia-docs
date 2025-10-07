---
weight: 300
title: Items & Crafting
description: Overview of items, upgrades and the crafting system.
katex: true
---

Items can be optained by the player and carried around. The amount of items limited to each entity is determined via
its [Inventory](#inventory). Each Bestia (and also a lot of other entities), have their own inventory with different sizes.

Items are mostly crafted by the players. Its quite rare to obtain direct item drops from killed enemies. Instead its very common to loot resources when enemies are killed.

# Item Level

Each item has a level assigned. This level is important to determine how hard or easy it is to forge this item, upgrade
it and so on. It also effects how spells interact with the item entity.

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

Weapons and armors can be refined which accounts to extra damage dealt if the weapon is used. Each upgrade step can
result in a destruction of the equipment.

A refined weapon has increased base damage per level:

{{< table >}}

| Weapon Category | Base Damage Bonus / Upgrade Level |
| --------------- | --------------------------------- |
| Mundane         | 2                                 |
| Superior        | 4                                 |
| Legendary       | 6                                 |
| Epic            | 10                                |

{{< /table >}}

## Upgrade Chances

These are the base upgrade chances. The chances can be altered via skills, buffs or equipments. If a upgrade fails the weapon is destroyed. It is then complelty unusable and also the resources are lost. As you can see the chance of success gets less and less the higher the weapon is upgraded and then caps (depending on the weapon level between 5% and 15%).

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
The upgrade chances can be increased by leveling up the Master skill `Upgrade Mastery`.

# Armor Refinement

A refined armor has increased resistance for **hard defense**. Each upgrade point grants 10 points more hard defense.

{{< chart >}}
{
	type: 'line',
	data: {
		labels: Array.from({length: 101}, (_, i) => i * 10),
		datasets: [
			{
				label: 'Hard Defense',
				function: function(x) {  return 0.95 * Math.exp(-0.0017 * x) + 0.05;  },
				fill: false
			}
		]
	},
  options: {
    responsive: true,
    scales: {
      y: {
        title: { display: true, text: 'Armor %' },
        max: 1.0,
        min: 0.0
      }
    }
  }
}
{{< /chart >}}

## Upgrade Chances

The refine level is not capped but each higher refinement process can destroy the weapon/equipment with an increasing chance.
The upgrade chances can be increased by leveling up the Skill Mastery `Upgrade Mastery` or by buffs and items.

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

Bestia uses an innovative new item crafting system. The player is allowed to craft all items. Some items however
might be so hard to craft so it is not possible to craft it without appropriate skill. Some items may require special
ingredients which can not be substituted. The higher the crafted item level and the harder it get to successful craft
it. If the crafting of the item fails all the materials used to craft it are lost. In order to craft an item two things
are important: the sum of raw materials used to craft and how the materials are laid out.

Item craft success chance is determined by the level of the raw materials used. Higher level raw materials also means
a higher success chance.

After an item was successfully crafted the recipe is saved for the user inside his recipe list. From this list the
recipe can be inscribed upon paper to give it to other players who can consume and learn it. The learning will take
some time (depending of the level of the item).

Players are encouraged to try and create stuff. There are basically 6 domains of craftable and user generatable content
in the world of Bestia, and are related to the linked [Skill Mastery](/docs/mechanics/master#skill-mastery).

* **Weapons** (Blacksmith: Weapon)
* **Armor** (Blacksmith: Armor)
* **Magical Artifacts** (Scholar: Crafting)
* **Potions and Usables** (Alchemy Mastery)
* **Meals** (Cooking)
* **Buildings, Traps, non-magical Devices** (Engineering)

Some item are exclusivly usable for certain crafting schools (for example a grape can not be used for forging). Items are categorized into a feature space which consists of 6 axis which describe the different properties of the outcome. The items used add or subtract from those axis and depending on your skill and the distance to a potential target you will successfully learn the blueprint. An attempt to learn a blueprint consumes the raw materials. So you basically navigate in a 6 axis vector space and at the end there will be a circle, dependent on your crafting skill. An item inside this circle you will then randomly learn. The chance of learning this skill depends on your skill.

**Example:** You have Glass Shards (brittle +0.2), Mushroom (organic +0.2), blue manastone (white magic +0.5)

```text
Heal Potion Lv. 5 Properties: Brittle 0.5, Organic: 0.1, White Magic: 0.7
Mana Potion Lv. 10 Properties: Brittle 0.5, Organic: 0.05, White Magic: 0.8
Sword:  Brittle 0.1, Organic: 0, White Magic: 0
```

You combine all those three items and get a vector of `(0.2, 0.2, 0.5)`. With a level 10 forging skill this puts heal and mana potion into the possible range. A sword is out of range. Beginning from the lowest level you will now roll a dice against your skill success and the item difficulty to check if you successfully learned the item.

{{< chart >}}
{
	type: 'line',
	data: {
		labels: Array.from({length: 100}, (_, i) => i ),
		datasets: [
			{
				label: 'Item Level',
				function: function(x) { return 1.0 - (x / 50); },
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
        max: 1.1
      }
    }
  }
}
{{< /chart >}}

The chance to learn an item is capped at 0.1% for items lower than Lv. 100 and 0.01% for items bigger than Lv. 100. In theory you have the chance to learn every item blueprint.
After a blueprint was learnt you or your Bestia can produce the items for you.


## Feature Space Axis

### Armor

* Hardness - Which main material is mainly used? Metal, leather, cloth?
* Elasticity - How easy is it to rip it apart (a cloth based armoer will be less stable than a full plate armor)
* Arcane Absorbtion - How well the item channels magical schools.
* Elemental Resonance - How well the item aligns with existing elemental flow, which can grant magical effects.
* Pattern Complexity - Is it a very detailed and sophisticated or rather blunt item?

### Craft Duration

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
level, they slowly lose their properties (armor their armor value, weapons hit less often, magic staffs suffer a damage penalty, etc.). Until the items become unusable. If you then inflict further damage on them, they can be completely and
irretrievably destroyed.

| Durability | State                     |
| ---------- | ------------------------- |
| 30 - 100%  | Normal Operation          |
| 1 - 29%    | Increasing Damage Effects |
| 0%         | Item breaks unrecoverably |

Items on the ground can suffer damage from attacks. They are affected by Area Of Effect spells and can be targetted manually albeit they are not auto targeted like enemies.

## Item Status Values

In order to let items participate in the battle system they need status values. Items status value distribution is based upon their type (weapon, potion, book etc) and the total amount of points to distribute is given by the item level.

```kotlin
availableItemStatPoints = itemLv
```

# Inventory

The inventory is an important system for interaction between the player and the game mechanics. It must be easy to access
and logical build. Each Bestia has its own inventory. So the player must be careful to exchange items between the
Bestias in time. Trading must be fast to do to reduce the annoyance.

If a Bestia/Entity is killed and has had some items inside its inventory usually the items are dropped and can be looted.
In case a player killed a mob the loot will be protected for 30 seconds so he can exclusivly loot it.

## Weight Limit

Items weight is given by units of about 1kg per unit. The smallest division is 0.1 units which aproximates to 100gr.
The maximum amount a Bestia can carry is dependent on its strength and its vitality. The [Packhorse skill](/docs/mechanics/skills/#packhorse) can  increase the carriable weight limit. The formula is given as:

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


Please not that depending of your used up weight limit regeneration of certain [status values](/docs/mechanics/bestia/statusvalues/)
might be affected.
