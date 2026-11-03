---
weight: 120
title: Ranged Combat
description: Bows, the quiver and how arrows are spent.
---

A ranged weapon turns the basic attack into a shot. Each shot spends one piece of ammunition from the quiver. The
ammunition adds its own attack and decides the element of the shot.

# Ranged Weapons

A ranged weapon is worn in the right hand. It names two things:

- **Its range**, in tiles. The player walks only this close to the target before shooting.
- **The kind of ammunition it fires**, such as arrows. A bow never shoots anything else, even when the quiver holds it.

Bows need both hands. While a bow is worn, nothing can be worn in the left hand, and a bow cannot be put on while the
left hand holds something. Take the other item off first.

# The Quiver

The quiver is a list of up to five ammunition items, in the order they are shot. It does not hold the ammunition
itself: it points at the ammunition in the bag.

- **The ammunition stays in the bag.** It still counts towards the weight limit. It can be traded, stored and dropped
  like any other item.
- **The first entry that fits is shot.** An entry is skipped when its ammunition does not fit the weapon, or when the
  bag holds none of it.
- **An empty entry stays.** When an entry runs out, it is kept and drawn dimmed. Buying or crafting more of that
  ammunition fills it again without a click.

In the equipment window the quiver is the row of five slots below the gear. Drop ammunition from the bag into a slot,
or double click it in the bag while the equipment window is open. Drag an entry to another slot to change the order.
Double click an entry to take it out.

Every master and every player Bestia has a quiver of its own.

# Shooting

Each shot takes one piece of ammunition out of the bag. Nothing is spent while the target is out of range, so stepping
away from a shooter does not waste their arrows.

When the quiver has nothing left that fits the weapon, the attack stops and the player is told. A bow is not swung as a
club.

## Damage

A shot uses the ranged formula on [Status Values](/docs/mechanics/statusvalues/#attack---atk): DEX takes the place
STR has for a melee attack. On top of the weapon attack it adds the attack of the ammunition. Armor counts more against
a shot than against a swing, see [Soft Defense](/docs/mechanics/statusvalues/#soft-defense---sdef).

The shot has the element of its ammunition. A regular arrow is Neutral.

## Special Ammunition

Ammunition can carry an effect of its own. It can change the damage roll, for example by piercing armor, and it can act
on a hit, for example by stunning the target. Only regular arrows exist so far.

# Bestias With Bows

A player Bestia with a right hand can wear a ranged weapon. While its quiver has ammunition for it, the Bestia keeps its
distance and shoots instead of using its own default attack. When the quiver runs dry, it closes in and fights with its
own attack again. The owner is not told.

Wild Bestias never wear gear. A species whose default attack is ranged shoots without ammunition.

# Novice Bow

Every new master starts with a Novice Bow and 100 arrows in the bag. The novice knife stays in hand, and the quiver
already points at the arrows, so putting the bow on is all it takes to shoot.

| Item       | Type   | ATK | Range    | Notes                    |
| ---------- | ------ | --- | -------- | ------------------------ |
| Novice Bow | Weapon | 7   | 12 tiles | Two-handed, novices only |
| Arrow      | Ammo   | 3   | -        | Neutral, weighs 0.01 kg  |
