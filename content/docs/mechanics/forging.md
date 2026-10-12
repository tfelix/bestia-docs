---
weight: 510
title: Forging & Random Stats
description: How a forged item rolls random stats and sockets, and how its item level follows from them.
---

# Forging

Most weapons and armor in Bestia are forged by players. Every forged copy of an item can be a little different:
it may roll extra stats and open sockets for bestia essences. Like in Diablo, two iron swords from the same forge
are rarely equal.

An item has three parts:

- **Base properties.** Weapon attack and armor defense. They make a weapon a weapon. Every copy has the same.
- **Fixed stats.** Bonuses that every copy has, such as `+4 STR` on an iron sword.
- **Random stats and sockets.** Bonuses that the forge rolls for each copy from the item's **template**.

The item level of a copy follows from all three. A copy with more or bigger stats has a higher level. See
[Item Level](#item-level).

Forging itself (discovering a blueprint, the success chance, craft time) is described in
[Item Crafting](/docs/mechanics/items/#item-crafting) and in the skills
[Forge Weapon](/docs/mechanics/master/#skill-forge-weapon) and [Forge Armor](/docs/mechanics/master/#skill-forge-armor).

# Templates

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

## Stat Pools

| Pool      | Stats                                                      |
| --------- | ---------------------------------------------------------- |
| ATTRIBUTE | STR, AGI, VIT, INT, DEX, WIL                               |
| OFFENSE   | ATK, MATK, HIT, CRIT                                       |
| DEFENSE   | DEF, MDEF, FLEE, max HP                                    |
| ARCANE    | max mana, cast time, HP, mana and stamina recovery         |
| RESIST    | resistance against one element (neutral, fire, water, ...) |

# Item Level

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
[category](/docs/mechanics/items/#item-level), and with it the refinement bonus and chances, the chance to cut
another socket with [Item Customization](/docs/mechanics/items/#item-customization), and which
[Equipment Repair](/docs/mechanics/master/#skill-equipment-repair) rank can fix it. The upgrade level is not part of
the item level.

## What the Numbers Mean

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
1.2 times as tough at level 65. The [reference master](/docs/mechanics/bestia-design/#2-the-reference-master) that
bestias are balanced against carries exactly such a set.

{{< alert context="warning" text="There is no stat cap. A build that puts every top roll into one attribute gets very strong: nine top-rolled STR items at Lv 100 deal about ten times the damage, and nine VIT items make a master almost immune to bestias of the same level. Such a build can do nothing else. A soft cap is an open option for later." />}}

# Rolling

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

## The Cap

The cap comes from the smith and from the material:

```text
cap = min(reliableItemLevel, mainMaterialLevel + 20)
```

- `reliableItemLevel` is the "Reliable Item Level" of [Forge Weapon](/docs/mechanics/master/#skill-forge-weapon) or
  [Forge Armor](/docs/mechanics/master/#skill-forge-armor): 10 per skill level. At skill level 10 the smith sets no
  limit, only the material does.
- `mainMaterialLevel` is the level of the input the recipe needs most of, for example the iron of an iron sword,
  not its coal.

| Main material                                           | Level | Cap | Points at most |
| ------------------------------------------------------- | ----: | --: | -------------: |
| [Tin](/docs/mechanics/item-list/#tin-ore)               |     5 |  25 |              8 |
| [Copper](/docs/mechanics/item-list/#copper-ore)         |    10 |  30 |             10 |
| Iron                                                    |    20 |  40 |             13 |
| Silver                                                  |    35 |  55 |             18 |
| Gold                                                    |    50 |  70 |             23 |
| Mercury                                                 |    60 |  80 |             26 |
| Palladium                                               |    70 |  90 |             30 |
| Mithril                                                 |    85 | 105 |             35 |
| [Adamantium](/docs/mechanics/item-list/#adamantium-ore) |   100 | 120 |             40 |

The material levels are the ore levels from [Refining](/docs/mechanics/natural-resources/#refining).

**Example.** A smith with Forge Weapon Lv. 5 forges an iron sword. The cap is `min(50, 20 + 20) = 40`, so the roll
has 13 points. The socket (10%) does not open. The attribute slot rolls STR with a quality of 0.23: `0.23 × 13.3`
gives +3 STR. The offense slot (30%) does not roll. The copy has its fixed `+4 STR +1 DEX` and a rolled `+3 STR`.
That is 8 points, and its item level is 31.

## Loot

Equipment that drops from a bestia will roll the same way, with the bestia's level as the cap. This is not built
yet: today a dropped item has no per-copy state until someone picks it up.

# Sockets and Essences

A socket is an open slot for a bestia essence, like a card slot in Ragnarok Online. Sockets come from two places:

- The template rolls them when the item is forged.
- [Item Customization](/docs/mechanics/items/#item-customization) cuts them into an item later.

Every socket raises the item level by 5 points, both ways. So cutting a socket into an item makes it harder to
wear, and harder to cut the next one.

Essences are made with Runic Etching, which is not part of the game yet. These rules are set:

- **Every essence fits every socket.** There is no level limit.
- An essence brings its own stats. It does not change the item level: the socket already paid for it.

# Item Level Calculator

{{< include "/docs/mechanics/item-level-calculator" >}}
