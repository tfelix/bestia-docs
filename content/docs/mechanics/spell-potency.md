---
weight: 115
title: Spell Potency and Rituals
description: How strong a cast spell is, how two spells decide a contest, and how a group raises a spell above what one caster can do.
---

Many spells meet resistance. A Dispel meets the buff it tries to lift. A Detect meets the aura that hides a thief. A
Teleport meets a mana storm at its target. Who wins should depend on the skill, but even more on **who cast it**. A
Sage who spent a career on magic must cast a stronger Dispel than a Warrior who bought two ranks of it.

Every cast spell therefore carries one number, its **Potency** (`P`). "Spell level" would be the natural word, but
`Lv.` already means the rank of a skill, so this page says Potency.

{{< alert context="warning" text="This is a concept. The pages listed under [Pages This Changes](#pages-this-changes) still show the old rules until it is accepted." />}}

# What Potency Decides

Potency decides **contests**: one magic against another, or one magic against the world.

| Contest                 | Attacker                        | Defender                              | Outcome                     |
| ----------------------- | ------------------------------- | ------------------------------------- | --------------------------- |
| Lift a buff             | Dispel                          | The buff                              | Lifted or not               |
| Break an enchantment    | Dispel at an item on the ground | The enchantment, e.g. a Postal Seal   | Broken or not               |
| Shake off a debuff      | The debuff                      | The target's [Resolve](#resist)       | Chance and duration         |
| Find a hidden creature  | Detect, Ruwach, Magic Sense     | HIDDEN, CLOAKED, Suppress Aura        | How close you must stand    |
| Catch or block a spell  | Magic Rod, Land Protector       | The incoming spell                    | Caught, blocked or not      |
| Reach a far place       | Teleport, Warp Portal, Scry     | The [Disturbance](#against-the-world) | How far off you land or see |
| Bring down a ward stone | Dispel as a [ritual](#rituals)  | The stone's ward                      | Countered or not            |

Potency **never changes the numbers in a skill's own table**: damage, healing, duration, radius, number of users.
Those come from the rank, as before. Potency only decides how much of that survives against an opponent. A ritual can
therefore make a Dispel break a ward stone, but it can never turn a Fire Bolt into a city-killer.

# How Potency Is Built

Potency is fixed at the moment of the cast and stays with whatever the spell leaves behind: a buff, a debuff, an
enchantment, a hiding aura, a trap. When the caster later changes gear, the spell already cast does not change.

## Masters

```text
P = Rank + Lore + Mind + Focus + Place
```

| Part  | What it is                                                                                                                             | Range       |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Rank  | `30 × rank / max rank` of the skill, rounded down. Dispel Lv. 3 of 5 gives `18`.                                                       | `0 .. 30`   |
| Lore  | Skill points the master spent in the sub-tree that holds the skill, e.g. in Sage for Dispel. For a base-tree skill, in that base tree. | `0 .. 30`   |
| Mind  | `30 × M / (M + 100)` with `M = INT + WIL / 2`. The same flattening curve as [Resist](/docs/mechanics/status-effects/#resist).          | `0 .. 30`   |
| Focus | Equipment and buffs that add Potency, like a Sage's staff.                                                                             | `0 .. 10`   |
| Place | Local [mana concentration](/docs/mechanics/environment/#mana-concentration): drained `-10`, ordinary `0`, thick `+10`.                 | `-10 .. 10` |

**Lore is the career part.** Two masters with Dispel Lv. 5 are not equal when one of them spent 30 points in Sage and
the other only the 7 points it took to reach Dispel. This is what makes the caster count, not only the skill.

| M = INT + WIL / 2 | Mind |
| ----------------- | ---- |
| 50                | 10   |
| 100               | 15   |
| 200               | 20   |
| 300               | 22   |
| 500               | 25   |

## Bestias

A Bestia has no skill tree. Its attack level and its own level take the place of rank and lore:

```text
P = 3 × attack level + min(level / 4, 30) + Mind + Place
```

## Example Casters

| Caster                         | Rank | Lore | Mind | Focus | Place | P       |
| ------------------------------ | ---- | ---- | ---- | ----- | ----- | ------- |
| Dabbler, Dispel Lv. 2          | 12   | 4    | 11   | 0     | 0     | **27**  |
| Adept Sage, Dispel Lv. 3       | 18   | 18   | 16   | 0     | 0     | **52**  |
| Master Sage, Dispel Lv. 5      | 30   | 30   | 20   | 5     | 0     | **85**  |
| The same, staff and thick mana | 30   | 30   | 24   | 10    | 10    | **104** |

About `100` is the ceiling of one caster. Everything above needs a [ritual](#rituals).

## Potency Bands

Players see Potency as a band, not as a number. A caster sees the band of their own skills in the skill window.
[Magic Sense](/docs/mechanics/master/#skill-magic-sense) Lv. 4 shows the band of a spell it picks apart, so a Sage can
judge a seal before trying it.

| Band         | P          |
| ------------ | ---------- |
| Faint        | below 30   |
| Steady       | 30 - 59    |
| Strong       | 60 - 89    |
| Mighty       | 90 - 119   |
| Overwhelming | 120 and up |

# Edge: One Curve for Every Contest

Every contest uses the same curve. `A` is the attacker's Potency, `D` the defender's:

```text
Edge = 0.5 + (A - D) / 50        clamped to 0 .. 1
```

| A - D | Edge |
| ----- | ---- |
| -25   | 0%   |
| -10   | 30%  |
| 0     | 50%  |
| +10   | 70%  |
| +25   | 100% |

Equal spells are a coin flip. A lead of 25 always wins, and a gap of 25 never does. When the outcome is yes or no, Edge
is the chance. When the outcome is an amount, like a detection range, Edge is the share of it that the attacker gets.
Players learn one rule and can read every contest from it.

# Contests

## Dispel

Dispel rolls **once per buff** on the target, each against the Potency of that buff. A Master Sage (`85`) lifts an
adept's Blessing (`52`) for sure, but lifts another master's buff only half of the time. A dabbler with two ranks of
Dispel (`27`) can clean off faint buffs and nothing else. Buffs that are not dispellable stay out of it, as before.

This replaces the base chance `(50 + 10 × SkillLv)%` and the target's SMDEF. The rank is now part of the Dispel's
Potency, and the defence is the buff's own Potency.

## Enchantments and Seals

An [enchantment](/docs/mechanics/items/#enchantments) takes the Potency of the one who bound it as its strength. Some
enchantments have a fixed Potency instead, see [Fixed Potency](#fixed-potency).

The [Postal Seal](/docs/mechanics/postal/#breaking-a-seal) has `P 90`. A Master Sage (`85`) breaks it `40%` of the time.
With Dispel's 15 s cooldown they get two tries in the 30 s the sack lies on the ground, `64%` together. An adept
(`52`) has no chance. A ritual takes too long to help here, so robbing a sack stays the work of a strong Sage, not of a
crowd.

## Resist

A creature defends against hostile spells with its **Resolve**:

```text
Resolve = 30 + min(level / 4, 30) + Mind + Focus
```

`30` stands for the creature's own mind, which it knows as well as a fully learned skill. Resolve and Potency then
replace the level term of the [resist formula](/docs/mechanics/status-effects/#resist):

```text
S = attribute1 + attribute2
R = S / (S + 150) + (Resolve - P) / 100
R is clamped to 0 .. 0.8
```

**Example.** The level-40 bestia from the status effect page has VIT 50 and STR 30, so its attributes give `35%`. Its
INT 20 and WIL 20 give Mind `6`, so its Resolve is `30 + 10 + 6 = 46`.

| Caster  | P   | R   | 30% STUN lands with |
| ------- | --- | --- | ------------------- |
| Dabbler | 27  | 54% | 14%                 |
| Adept   | 52  | 29% | 21%                 |
| Master  | 85  | 0%  | 30%                 |

Brutes with high VIT but a dull mind still shrug off a weak caster. A master caster cuts through their body's
resistance. [Immunities](/docs/mechanics/status-effects/#immunities) stay absolute: no Potency lands a stun on a boss.

## Concealment and Detection

HIDDEN, CLOAKED and [Suppress Aura](/docs/mechanics/master/#skill-suppress-aura) take the Potency of the one who hid.
A detecting skill finds a concealed target only within part of its range:

```text
range against this target = range × Edge(P detect - P conceal)
```

A Scholar with Magic Sense Lv. 5 (`50 m`, `P 65`) finds a dabbler's Suppress Aura (`P 35`) at the full 50 m. Against a
master Wizard's aura (`P 80`) the range shrinks to 10 m. The hider is not invisible, but the seeker must come close.
Suppress Aura's own column "Mana Suppression" goes away: its rank now works through Potency.

## Counter-Magic

The same contest decides every spell that stops another spell:

- [Magic Rod](/docs/mechanics/master/#skill-magic-rod) catches a single-target spell with a chance of
  `Edge(P rod - P spell)`. A failed catch lets the spell land, and the rod stays up for the next one.
- [Land Protector](/docs/mechanics/master/#skill-land-protector) rolls once for each ground spell cast into it. A
  stronger spell can still take root.
- [Suppress Magic](/docs/mechanics/master/#skill-suppress-magic) multiplies its interrupt chance by
  `Edge(P suppress - P spell)` of the spell it tries to break.

# Against the World

Some spells do not fight another caster but the place. The world gives them a **Disturbance** `D` instead of a
defender's Potency.

| Source of Disturbance                                               | D         |
| ------------------------------------------------------------------- | --------- |
| Any long-range spell                                                | 10        |
| Distance                                                            | +5 per km |
| A [Mana Storm](/docs/mechanics/doomsday/#mana-storms) at either end | +40       |
| An open rift nearby                                                 | +60       |

A [Teleport](/docs/mechanics/master/#skill-teleport) lands off target by up to `1.5 km × (1 - Edge(P - D))`. This is the
story from the [Master Skills](/docs/mechanics/master/#master-skills) page in numbers: Saferu (`P 85`) jumps 8 km
(`D 50`) into a mana storm (`D 90`). Edge is `40%`, and the group lands up to 900 m off target. Without the storm the
group lands on the rune. A jump of 20 km (`D 110`) is a lottery for one caster and exact for a ritual.

[Scry](/docs/mechanics/master/#skill-scry) uses the same Edge for how clearly it shows the far place. A Warp Portal
uses it for where its far end opens.

# Fixed Potency

Spells that no player cast have a fixed Potency.

| Spell                                                   | P   | Why                                                              |
| ------------------------------------------------------- | --- | ---------------------------------------------------------------- |
| [Postal Seal](/docs/mechanics/postal/#the-seal)         | 90  | A strong solo Sage has a real chance. A crowd has no time.       |
| [Ward stone](/docs/mechanics/pvp/#protected-zones) aura | 170 | No single caster ever counters it. A full ritual can, with luck. |
| Permanent enchantments of the Artificer                 | -   | They cannot be dispelled at all.                                 |

# Refresh

[Effects do not stack](/docs/mechanics/status-effects/#no-stacking): a second cast refreshes the first. With Potency, a
**weaker cast cannot refresh a stronger one**. It fails, and the caster is told so. Otherwise an ally with a faint
buff could lower a friend's protection, and an enemy could cover a strong curse with a weak one to make it easy to lift.

# Rituals

One caster tops out at about `P 100`. A **ritual** is how a group pushes a spell further. It uses the
[Mana Circle](/docs/mechanics/master/#mana-circles) that crafting rites already use: the same prop, the same rules for
mana and lockout. In a crafting rite the circle adds to the success roll. In a spell ritual it adds to Potency.

## Who Takes Part

- The **leader** casts the spell. Only they need the skill.
- Up to **5 helpers** stand in the circle. Each must be the master of a different player. Bestias cannot join, so one
  player cannot fill a circle with their own Bestias.
- A helper who **knows the spell** lends more. A helper of **another profession** adds harmony. Both matter, so the
  best circle is a mix and not six copies of one class.

## The Bonus

```text
Ritual P = P leader + ManaFactor × (Helpers + Harmony)

Helpers = 8 for each helper, 12 if the helper knows the spell (any rank)
Harmony = 6 for each base tree in the circle (Scholar, Warrior, Craftsman, Survival)
```

Each participant, leader included, counts for the base tree in which they spent the most points. `ManaFactor` is the
one from the Mana Circle: `0.5` drained, `1.0` ordinary, `1.5` thick.

| Circle (leader is a Master Sage, P 85)                               | Helpers | Harmony | Ritual P (ordinary place) |
| -------------------------------------------------------------------- | ------- | ------- | ------------------------- |
| Leader and one Warrior                                               | 8       | 12      | 105                       |
| Leader, a Sage who knows the spell, a Warrior                        | 20      | 12      | 117                       |
| Leader and five Sages who know the spell                             | 60      | 6       | 151                       |
| Leader, two Sages who know it, a Warrior, a Blacksmith, a Prospector | 48      | 24      | **157**                   |

Against a ward stone (`P 170`) the best ordinary circle has an Edge of `24%` per try.

## Rules

- **It takes 30 seconds.** Every participant channels for the whole time. The
  [channeling rules](/docs/mechanics/status-effects/#channeling) apply to each of them. A helper who is hit drops out
  and the bonus is calculated again. If the leader is hit, the ritual fails and its mana is lost. Guarding the circle
  is the job of whoever is not in it.
- **It costs three times the spell's mana**, split evenly over all participants, and the spell's reagents once.
- **Every participant is locked out of rituals and rites for 5 minutes** afterwards, like in a crafting rite.
- **It cannot target an enemy creature.** A fight moves faster than a rite. Targets are places, items, props, the
  circle itself or the participants.
- **It cannot cast a spell that deals damage or heals.** Those do not use Potency, so a ritual would add nothing.

## What Rituals Are For

- **Countering a ward stone.** A Dispel ritual is the counter-magic the [Protected Zones](/docs/mechanics/pvp/#protected-zones)
  wait for. It takes a full circle, several tries and a village that does not drive the circle away.
- **Long or stormy jumps.** A Teleport or Warp Portal as a ritual lands where it should, even through a mana storm.
- **Lasting work.** A Spell Binding cast as a ritual makes a trap or alarm that only a ritual can find or lift. A
  settlement can guard its gate with it.
- **Hiding something big.** A Suppress Aura ritual on a camp or a stash is out of reach of any single seeker.

# Hooks for Later

These are not designed yet, but they fit the same rule:

- **Orders.** The rituals of the [Orders](/docs/mechanics/factions/) at temples and citadels are spell rituals. "Cheaper
  rituals" in a dominated region can be a better ManaFactor there.
- **Doomsday.** A rift can carry a Potency that grows each day it stays open. A sealing ritual is a contest against it.
  The longer the world waits, the bigger the circle it needs.

# Pages This Changes

When this concept is accepted, these pages change:

- [Status Effects](/docs/mechanics/status-effects/#resist): the level term of Resist becomes `(Resolve - P) / 100`.
  Concealment takes the hider's Potency, and Detect works within `range × Edge`.
- [Master Skills](/docs/mechanics/master/): Dispel loses its base chance table. Suppress Aura loses its suppression
  column. The Mana Circle rule "only a success roll" also allows Potency.
- [Items](/docs/mechanics/items/#dispelling-an-enchantment): the formula `Dispel base chance - strength` becomes
  `Edge(P dispel - strength)`. A dropped endowed weapon keeps the binder's Potency instead of `0`.
- [Postal System](/docs/mechanics/postal/#breaking-a-seal): the seal gets `P 90` and the new chances.
- [PvP](/docs/mechanics/pvp/#protected-zones): the ward stone gets `P 170` and the ritual as its counter.

# Server Notes

Today Dispel lifts every dispellable buff, Detect finds every concealed creature, and Resist weighs only attributes and
level. Potency changes that in a few places:

- One calculator turns a cast into a Potency. It needs the skill rank, the points in the skill's tree, the caster's
  status values, the equipment bonus and the mana concentration at the caster.
- `ActiveStatusEffect` and the item enchantment carry that Potency. The enchantment's `strength` is the same value.
- `StatusEffectService.dispel` rolls Edge per effect. `StatusResistance.of` takes Resolve and Potency in place of the
  level lead. The `Detecting` system compares the two Potencies per target.
- A ritual is one cast with a raised Potency. The spell scripts do not need to know a circle was involved.
