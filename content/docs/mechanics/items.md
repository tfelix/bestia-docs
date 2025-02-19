---
title: Items & Crafting
---

# Items

Items can be optained by the player and carried around. The amount of items limited to each entity is determined via
its [Inventory](#inventory). Each Bestia (and also a lot of other entities), have their own inventory with different sizes.

Items are mostly crafted by the players. Its quite rare to obtain direct item drops from killed enemies. Instead its very common
to loot resources when enemies are killed.

## Item Level

Each item has a level assigned. This level is important to determine how hard or easy it is to forge this item, upgrade
it and so on. It also effects how spells interact with the item entity.

### Item Category

Items are grouped into three categories and inside this documentation often refered to via its category.

| Item Level | Category  |
| ---------- | --------- |
| 1 - 20     | Mundane   |
| 21 - 50    | Superior  |
| 51 - 80    | Rare      |
| 81 - 100   | Legendary |
| 101+       | Epic      |

## Weapon Refinement

Weapons and armors can be refined which accounts to extra damage dealt if the weapon is used. Each upgrade step can
result in a destruction of the equipment.

A refined weapon has increased base damage per level:

| Weapon Category | Base Damage Bonus / Upgrade Level |
| --------------- | --------------------------------- |
| Mundane         | 2                                 |
| Superior        | 4                                 |
| Legendary       | 6                                 |
| Epic            | 10                                |

### Uprade Chances

These are the base upgrade chances. The chances can be altered via skills or item usages. If a upgrade fails the weapon is destroyed. It is then complelty unusable and also the resources are lost.

| Weapon Category | Uprade Formula                                            |
| --------------- | --------------------------------------------------------- |
| Mundane         | {{< katex >}} min(1, e^{-(itemLv-5)/9.8)}){{< /katex >}}  |
| Superior        | {{< katex >}} min(1, e^{-(itemLv-4)/8.69)}){{< /katex >}} |
| Legendary       | {{< katex >}} min(1, e^{-(itemLv-3)/7.69)}){{< /katex >}} |
| Epic            | {{< katex >}} min(1, e^{-(itemLv-2)/7.31)}){{< /katex >}} |

The refine level is not capped but each higher refinement process can destroy the weapon/equipment with an increasing chance.
The chance of success is depending on skill and refine items used.

A refined armor has increased resistance for hard defense. Each upgrade point grants ⅓ points more defense.

The upgrade chances can be increased by leveling up the Skill Mastery `Upgrade Mastery`.

## Item Crafting

Bestia uses an innovative new item crafting. The player is basically is allowed to craft all items. Some items however
might be so hard to craft so it is not possible to craft it without appropriate skill. Some items may require special
ingredients which can not be substituted. The higher the crafted item level and the harder it get to successful craft
it. If the crafting of the item fails all the materials used to craft it are lost. In order to craft an item two things
are important: the sum of raw materials used to craft and how the materials are laid out.

Item craft success chance is determined if the raw materials.

After an item was successfully crafted the recipe is saved for the user inside his recipe list. From this list the
recipe can be inscribed upon a paper to give it to other players who can consume and learn it. The learning will take
some time (depending of the level of the item).

Players are encouraged to try and create stuff. There are basically 6 domains of craftable and user generatable content
in the world of Bestia, and are related to the linked [Skill Mastery](/docs/mechanics/master#skill-mastery).

* Weapons (Blacksmith: Weapon)
* Armor (Blacksmith: Armor)
* Magical Artifacts (Scholar: Crafting)
* Potions and Usables (Alchemy Mastery)
* Meals (Cooking)
* Buildings, Traps and non magical devices (Engineering)

### Craft Duration

Craft duration is determined by the item level which the player wants to craft. Skill points in the suitable skill tree
(weapon, equipment, construction or alchemy, artifacts) reduces the build time. The `baseDuration` is given in real
time minutes.

```kotlin
baseDuration = 28.8 * itemLevel
```

## Alchemy

The brewing is a time consuming process. The process should be somehow deterministic so the results are logically to be obtained.

Once a receipt was discovered it is saved for the user so it can be reused very quickly. If a player repeatedly makes
the same receipt the quality of the produced potions increases over time. The player can choose to write down the
receipt and give it to other players who might increase their skill by reading it.

## Item and Entity Interactions

It should be possible to link items to entities. Nesting should be possible. With this technique it is possible to
combine active items.

Its possible to do something like:

* Attaching or removing energy crystals to a magical artifact
* Boxes that can be stuffed with other items for shipping

For this purpose the items that can be stored in an entity must be limited. Filtering must be very flexible, be able to
exclude certain items, be able to limit weight, etc. Each item also has its own resistance values. As soon as a Bestia
is killed it will be checked if and if so how much damage individual items take. Even items lying on the ground can be
damaged or even destroyed by attacks.

## Damaging of Items

As with any item in Bestia, it can be damaged. There will be professions capable of repairing items. The durability of
an item is given via a percentage. Items will function normally within a wide range of their condition. At a certain
level, they slowly lose their properties (armor their armor value, weapons hit less often, magic staffs suffer a damage
penalty, etc.). Until the items become unusable. If you then inflict further damage on them, they can be completely and
irretrievably destroyed.

| Durability | State                     |
| ---------- | ------------------------- |
| 30 - 100%  | Normal Operation          |
| 1 - 29%    | Increasing Damage Effects |
| 0%         | Item breaks unrecoverably |

Items on the ground can suffer damage from attacks. They are affected by Area Of Effect spells and can be targetted manually
albeit they are not auto targeted like enemies.

### Item Status Values

In order to let items participate in the battle system they need status values. Items status value distribution is based
upon their type (weapon, potion, book etc) and the total amount of points to distribute is given by the item level.
Later there might be items which get preset custom values but for now on they are based upon a lookup table.

## Inventory

The inventory is an important system for interaction between the player and the game mechanics. It must be easy to access
and logical build. Each Bestia has its own inventory. So the player must be careful to exchange items between the
Bestias in time. Trading must be fast to do to reduce the annoyance.

If a Bestia/Entity is killed and has had some items inside its inventory usually the items are dropped and can be looted.
In case a player killed a mob the loot will be protected for 30 seconds so he can exclusivly loot it.

### Weight Limit

Items weight is given by units of about 1kg per unit. The smallest division is 0.1 units which aproximates to 100gr.
The maximum amount a Bestia can carry is dependent on its strength and its vitality. The
[Packhorse skill](/docs/mechanics/skills/#packhorse) can  increase the carriable weight limit. The formula is given as:

```kotlin
limit = STR / 2 + VIT / 5 + 15 + LEVEL / 10
```

Please not that depending of your used up weight limit regeneration of certain [status values](/docs/mechanics/bestia/statusvalues/)
might be affected.
