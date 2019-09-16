---
title: Items
weight: 100
---
# Items

Items can be optained by the player and carried around. The amount of items limited to each entity is determined via
its [Inventory](/mechanics/inventory).

Each item has a level assigned. This level is important to determine how hard or easy it is to forge this item, upgrade
it and so on. It also effects how spels interact with the item entity.

## Item Level

Items are grouped into three categories and inside this documentation often refered to via its category.

| Item Level | Category  |
| ---------- | --------- |
| 1 - 20     | Mundane   |
| 21 - 80    | Superior  |
| 81 - 100   | Legendary |

## Weapon Refinement

Weapons and armors can be refined which accounts to extra damage dealt if the weapon is used. Each upgrade step can
result in a destruction of the equipment.

A refined weapon has increased base damage per level:

| Weapon Category | Base Damage Bonus / Upgrade Level |
| --------------- | --------------------------------- |
| Mundane         | 2                                 |
| Superior        | 4                                 |
| Legendary       | 6                                 |

These are the base upgrade chances. The chances can be altered via skills or item usages.

### Uprade Chances

| Weapon Category | Uprade Formula                  |
| --------------- | ------------------------------- |
| Mundane         | $min(1, e^{-(itemLv-5)/9.8)})$  |
| Superior        | $min(1, e^{-(itemLv-4)/8,69)})$ |
| Legendary       | $min(1, e^{-(itemLv-3)/7.69)})$ |

## Equipment Refinement

The equipment refine level is not capped but each higher refinement process can destroy the weapon/equipment.
The chance of success is depending on skill and refine items used.

A refined armor has increased resistance for hard defense. Each upgrade point grants ⅓ points more defense.

## Item Crafting

Bestia uses an innovative new item crafting. Basically the player is allowed to craft all items. Some items however
might be so hard to craft so it is not possible to craft it without appropriate skill. Some items may require special
ingredients which can not be substituted. The higher the crafted item level and the harder it get to successful craft
it. If the crafting of the item fails all the materials used to craft it are lost. In order to craft an item two things
are important: the sum of raw materials used to craft and how the materials are laid out.

Item craft success chance is determined if the raw materials.

After an item was successfully crafted the recipe is saved for the user inside his recipe list. From this list the
recipe can be inscribed upon a paper to give it to other players who can consume and learn it. The learning will take
some time (depending of the level of the item).

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
