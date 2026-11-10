---
weight: 115
title: Spell Potency and Rituals
description: How strong a cast skill is, how two spells decide a contest, and how a group charges a skill above what one caster can do.
---

Many spells meet resistance. A Dispel meets the buff it tries to lift. A Detect meets the aura that hides a thief. A
Teleport meets a mana storm at its target. Who wins should depend on the skill, but even more on **who cast it**. A
level 100 Sage must cast a stronger Dispel than a level 40 master who bought two ranks of it.

Every cast skill therefore carries one number, its **Potency** (`P`). "Spell level" would be the natural word, but
`Lv.` already means the rank of a skill, so this page says Potency.

{{< alert context="warning" text="This is a concept. The pages listed under [Pages This Changes](#pages-this-changes) still show the old rules until it is accepted." />}}

# How Potency Is Built

Potency is fixed at the moment of the cast and stays with whatever the skill leaves behind: a buff, a debuff, an
enchantment, a hiding aura, a trap. When the caster later changes gear, the spell already cast does not change.

```text
P = Rank + Level + Mind + Focus + Place
```

| Part  | What it is                                                                                                                    | Range       |
| ----- | ----------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Rank  | `30 × rank / max rank` of the skill, rounded down. Dispel Lv. 3 of 5 gives `18`. A Bestia attack of level 7 gives `21`.       | `0 .. 30`   |
| Level | `level / 4` of the caster, master or Bestia.                                                                                  | `0 .. 30`   |
| Mind  | `30 × M / (M + 100)` with `M = INT + WIL / 2`. The same flattening curve as [Resist](/docs/mechanics/combat/status-effects/#resist). | `0 .. 30`   |
| Focus | Equipment and buffs that add Potency, like a Sage's staff.                                                                    | `0 .. 10`   |
| Place | Local [mana concentration](/docs/mechanics/world/environment/#mana-concentration): drained `-10`, ordinary `0`, thick `+10`.        | `-10 .. 10` |

The rank says how well the skill is known. Level and Mind say who knows it. Masters and Bestias use the same formula.

| M = INT + WIL / 2 | Mind |
| ----------------- | ---- |
| 50                | 10   |
| 100               | 15   |
| 200               | 20   |
| 300               | 22   |
| 500               | 25   |

## Example Casters

| Caster                               | Rank | Level | Mind | Focus | Place | P       |
| ------------------------------------ | ---- | ----- | ---- | ----- | ----- | ------- |
| Dabbler, level 40, Dispel Lv. 2      | 12   | 10    | 11   | 0     | 0     | **33**  |
| Adept, level 60, Dispel Lv. 3        | 18   | 15    | 16   | 0     | 0     | **49**  |
| Master Sage, level 100, Dispel Lv. 5 | 30   | 25    | 20   | 5     | 0     | **80**  |
| Level 120, staff, in thick mana      | 30   | 30    | 24   | 10    | 10    | **104** |

About `100` is the ceiling of one caster. Everything above needs a [ritual](#rituals).

## Potency Bands

Players see Potency as a band, not as a number. A caster sees the band of their own skills in the skill window.
[Magic Sense](/docs/mechanics/master/scholar-tree/#skill-magic-sense) Lv. 4 shows the band of a spell it picks apart, so a Sage can
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
| -24   | 2%   |
| -10   | 30%  |
| 0     | 50%  |
| +10   | 70%  |
| +25   | 100% |

Equal spells are a coin flip. A lead of 25 always wins, and a gap of 25 never does. When the outcome is yes or no, Edge
is the chance. When the outcome is an amount, like a detection range, Edge is the share of it that the attacker gets.
Players learn one rule and can read every contest from it.

| Contest                 | Attacker                         | Defender                              | Outcome                     |
| ----------------------- | -------------------------------- | ------------------------------------- | --------------------------- |
| Lift a buff             | Dispel                           | The buff                              | Lifted or not               |
| Break an enchantment    | Dispel at an item on the ground  | The enchantment, e.g. a Postal Seal   | Broken or not               |
| Shake off a debuff      | The debuff                       | The target's [Resolve](#resist)       | Chance and duration         |
| Find a hidden creature  | Detect, Ruwach, Magic Sense      | HIDDEN, CLOAKED, Suppress Aura        | How close you must stand    |
| Catch or block a spell  | Magic Rod, Land Protector        | The incoming spell                    | Caught, blocked or not      |
| Reach a far place       | Teleport, Warp Portal, Scry      | The [Disturbance](#against-the-world) | How far off you land or see |
| Bring down a ward stone | Dispel with a [ritual](#rituals) | The stone's ward                      | Countered or not            |

Potency alone **never changes the numbers in a skill's own table**: damage, healing, duration, radius, number of users.
Those come from the rank, as before. Only a [ritual charge](#how-every-skill-reacts-to-a-charge) raises them, and only
by a little.

# Contests

## Dispel

Dispel rolls **once per buff** on the target, each against the Potency of that buff. A Master Sage (`80`) lifts an
adept's Blessing (`49`) for sure, but lifts another master's buff only half of the time. A dabbler (`33`) can clean off
faint buffs and nothing else. Buffs that are not dispellable stay out of it, as before.

This replaces the base chance `(50 + 10 × SkillLv)%` and the target's SMDEF. The rank is now part of the Dispel's
Potency, and the defence is the buff's own Potency.

## Enchantments and Seals

An [enchantment](/docs/mechanics/items-crafting/items/#enchantments) takes the Potency of the one who bound it as its strength. Some
enchantments have a fixed Potency instead, see [Fixed Potency](#fixed-potency).

The [Postal Seal](/docs/mechanics/towns-trade/postal/#breaking-a-seal) has `P 90`. A Master Sage (`80`) breaks it `30%` of the time.
With Dispel's 15 s cooldown they get two tries in the 30 s the sack lies on the ground, `51%` together. These are the
odds the postal page has today. An adept (`49`) has no chance.

A gang can charge a [ritual](#rituals) before the ambush and break the seal for sure. That takes six players, a circle
next to the road and a kill within one minute of the charge, so it stays rare.

## Resist

A creature defends against hostile spells with its **Resolve**:

```text
Resolve = 30 + level / 4 + Mind + Focus        level / 4 at most 30
```

`30` stands for the creature's own mind, which it knows as well as a fully learned skill. A caster at max rank with the
same level and Mind as the target meets it as an equal. Resolve and Potency replace the level term of the
[resist formula](/docs/mechanics/combat/status-effects/#resist):

```text
S = attribute1 + attribute2
R = S / (S + 150) + (Resolve - P) / 100
R is clamped to 0 .. 0.8
```

**Example.** The level-40 bestia from the status effect page has VIT 50 and STR 30, so its attributes give `35%`. Its
INT 20 and WIL 20 give Mind `6`, so its Resolve is `30 + 10 + 6 = 46`.

| Caster  | P   | R   | 30% STUN lands with |
| ------- | --- | --- | ------------------- |
| Dabbler | 33  | 48% | 16%                 |
| Adept   | 49  | 32% | 20%                 |
| Master  | 80  | 1%  | 30%                 |

Brutes with high VIT but a dull mind still shrug off a weak caster. A master caster cuts through their body's
resistance. [Immunities](/docs/mechanics/combat/status-effects/#immunities) stay absolute: no Potency lands a stun on a boss.

## Concealment and Detection

HIDDEN, CLOAKED and [Suppress Aura](/docs/mechanics/master/basics/#skill-suppress-aura) take the Potency of the one who hid.
A detecting skill finds a concealed target only within part of its range:

```text
range against this target = range × Edge(P detect - P conceal)
```

A level 80 Scholar with Magic Sense Lv. 5 (`50 m`, `P 70`) finds a dabbler's Suppress Aura (`P 33`) at the full 50 m.
Against a level 100 Wizard's aura (`P 80`) the range shrinks to 15 m. The hider is not invisible, but the seeker must
come close. Suppress Aura's own column "Mana Suppression" goes away: its rank now works through Potency.

## Counter-Magic

The same contest decides every spell that stops another spell:

- [Magic Rod](/docs/mechanics/master/scholar-tree/#skill-magic-rod) catches a single-target spell with a chance of
  `Edge(P rod - P spell)`. A failed catch lets the spell land, and the rod stays up for the next one.
- [Land Protector](/docs/mechanics/master/scholar-tree/#skill-land-protector) rolls once for each ground spell cast into it. A
  stronger spell can still take root.
- [Suppress Magic](/docs/mechanics/master/warrior-tree/#skill-suppress-magic) multiplies its interrupt chance by
  `Edge(P suppress - P spell)` of the spell it tries to break.

# Against the World

Some spells do not fight another caster but the place. The world gives them a **Disturbance** `D` instead of a
defender's Potency.

| Source of Disturbance                                               | D         |
| ------------------------------------------------------------------- | --------- |
| Any long-range spell                                                | 10        |
| Distance                                                            | +5 per km |
| A [Mana Storm](/docs/mechanics/world/doomsday/#mana-storms) at either end | +40       |
| An open rift nearby                                                 | +60       |

A [Teleport](/docs/mechanics/master/scholar-tree/#skill-teleport) lands off target by up to `1.4 km × (1 - Edge(P - D))`. This is the
story from the [Master Skills](/docs/mechanics/master/basics/#master-skills) page in numbers: Saferu (`P 80`) jumps 8 km
(`D 50`) into a mana storm (`D 90`). Edge is `30%`, and the group lands up to 980 m off target. Without the storm the
group lands on the rune. A jump of 20 km (`D 110`) is a lottery for one caster and exact with a ritual charge.

[Scry](/docs/mechanics/master/scholar-tree/#skill-scry) uses the same Edge for how clearly it shows the far place. A Warp Portal
uses it for where its far end opens.

# Fixed Potency

Spells that no player cast have a fixed Potency.

| Spell                                                   | P   | Why                                                                  |
| ------------------------------------------------------- | --- | -------------------------------------------------------------------- |
| [Postal Seal](/docs/mechanics/towns-trade/postal/#the-seal)         | 90  | A strong solo Sage has a real chance.                                |
| [Ward stone](/docs/mechanics/society/pvp/#protected-zones) aura | 174 | 24 above the [ritual cap](#the-charge), so the best circle has `2%`. |
| Permanent enchantments of the Artificer                 | -   | They cannot be dispelled at all.                                     |

# Refresh

[Effects do not stack](/docs/mechanics/combat/status-effects/#no-stacking): a second cast refreshes the first. With Potency, a
**weaker cast cannot refresh a stronger one**. It fails, and the caster is told so. Otherwise an ally with a faint
buff could lower a friend's protection, and an enemy could cover a strong curse with a weak one to make it easy to lift.

# Rituals

One caster tops out at about `P 100`. A **ritual** is how a group pushes the next skill of one master further. It uses
the [Mana Circle](/docs/mechanics/master/basics/#mana-circles), a ring of Mana Concentrate laid into the ground with a focus
stone in its middle.

## How a Ritual Runs

1. **Lay the circle.** A master places the Mana Circle. They are its **leader**. The circle stays after the ritual, and
   other groups can use it too.
2. **Gather.** Up to **5 helpers** step into the ring and use the focus stone to join. Each player sends one helper:
   their master **or** one of their Bestias, never both. So one player cannot fill a circle alone. A helper with
   Ritual Fatigue cannot join.
3. **Start.** The leader uses the focus stone. Nobody can join any more. Every participant pays a quarter of their
   maximum mana and starts to channel.
4. **Hold for 30 seconds.** The [channeling rules](/docs/mechanics/combat/status-effects/#channeling) apply to each
   participant: damage, STUN, FROZEN, STONE or a move ends their part. A helper who drops out adds nothing. If the
   leader drops out, the ritual fails. Guarding the circle is the job of whoever is not in it.
5. **Charge.** When the 30 seconds are over, the leader gets the buff **Ritual Charge**. It holds the
   [bonus](#the-charge) for 60 seconds.
6. **Release.** The next skill the leader uses takes the charge, whatever skill it is. The charge is spent even if the
   skill misses or fails.
7. **Rest.** Every participant who joined gets the debuff **Ritual Fatigue** for 5 minutes, whether the ritual worked
   or failed. While it holds, they cannot join or lead a ritual.

Ritual Charge and Ritual Fatigue cannot be dispelled. The charge ends when the leader dies. Everyone around can see the
charge on the leader, so a charged master walking at a ward stone is a target.

## The Charge

```text
Bonus  = ManaFactor × sum of each helper's share
share  = helper level / 6, rounded down, at most 20
P with charge = P of the skill + Bonus, at most 150
```

`ManaFactor` is the one of the Mana Circle: `0.5` in a drained region, `1.0` in an ordinary one, `1.5` where mana runs
thick. It is read where the circle lies. A Bestia helper's share uses the Bestia's level.

**The cap of 150** is what no circle can bind, however strong. It keeps the strongest goals, like a ward stone, at a
known chance and stops ever stronger circles from turning them into a routine.

| Circle (leader is a level 100 Master Sage, Dispel P 80) | Bonus | P with charge |
| ------------------------------------------------------- | ----- | ------------- |
| One helper of level 60                                  | 10    | 90            |
| Two helpers of level 100                                | 32    | 112           |
| Five helpers of level 60                                | 50    | 130           |
| Five helpers of level 100                               | 80    | **150** (cap) |

Against a ward stone (`P 174`) the full circle of level 100 helpers has `2%` per try. With a 5-minute rest between
tries, one circle needs four to five hours on average, and the village has all that time to drive it away. A circle of
level 60 helpers has no chance at all.

## How Every Skill Reacts to a Charge

Any skill can take a charge: a Dispel, a Fire Bolt, a Heal, a Teleport, a crafting skill. Each skill reacts in one or
more of four ways:

| Reaction      | Skills                                            | What the charge does                                                          |
| ------------- | ------------------------------------------------- | ----------------------------------------------------------------------------- |
| Contest       | Dispel, debuffs, Detect, Suppress Aura, Magic Rod | The higher Potency enters [Edge](#edge-one-curve-for-every-contest) or Resist |
| Against world | Teleport, Warp Portal, Scry                       | The higher Potency enters Edge against the Disturbance                        |
| Success roll  | Forging, Spell Inscription, Transmutation, ...    | `+5% × participants × ManaFactor`, the Mana Circle bonus of today             |
| Surge         | Damage, healing, shields, buff duration           | `+1%` for every `4` points of bonus, at most `+25%`                           |

A skill that has a contest and also deals damage, like a Stone Curse or a Fire Bolt with a burn, gets both. Surge is
small on purpose. Six players who channel for 30 seconds and rest for 5 minutes get one Meteor Storm that hits a quarter
harder, not a city-killer.

Each skill script says which reactions it has. A skill with none of the four ignores the charge, and the skill window
says so before the leader wastes a ritual on it.

## What Rituals Are For

- **Countering a ward stone.** A Dispel with a charge is the counter-magic the
  [Protected Zones](/docs/mechanics/society/pvp/#protected-zones) wait for. It takes a full circle of strong players, many
  tries and a village that does not drive them away.
- **Long or stormy jumps.** A charged Teleport or Warp Portal lands where it should, even through a mana storm.
- **Lasting work.** A charged Spell Binding makes a trap or alarm that only another charged skill can find or lift. A
  settlement can guard its gate with it.
- **Hiding something big.** A charged Suppress Aura on a camp or a stash is out of reach of any single seeker.
- **The opening blow.** A charged curse on a strong foe cuts through its resist, and a charged spell hits a little
  harder. The group pays with five minutes of rest.
- **Crafting.** A smith forging a masterpiece takes a charge into the next forge roll, as the Mana Circle does today.

# Hooks for Later

These are not designed yet, but they fit the same rule:

- **Orders.** The rituals of the [Orders](/docs/mechanics/society/factions/) at temples and citadels are charged skills.
  "Cheaper rituals" in a dominated region can be a better ManaFactor there.
- **Doomsday.** A rift can carry a Potency that grows each day it stays open. A sealing ritual is a contest against it.
  The longer the world waits, the closer the rift comes to the cap, and the luckier the circle must be.

# Pages This Changes

When this concept is accepted, these pages change:

- [Status Effects](/docs/mechanics/combat/status-effects/): Ritual Charge and Ritual Fatigue join the list. The list follows
  the server, so they come with the server work.
- [Master Skills](/docs/mechanics/master/basics/): Dispel loses its base chance table. Suppress Aura loses its suppression
  column. [Mana Circles](/docs/mechanics/master/basics/#mana-circles) run as a ritual with a charge, so a crafting rite and a
  spell ritual are the same thing. Bestias may now join.
- [Items](/docs/mechanics/items-crafting/items/#dispelling-an-enchantment): the formula `Dispel base chance - strength` becomes
  `Edge(P dispel - strength)`. A dropped endowed weapon keeps the binder's Potency instead of `0`.
- [Postal System](/docs/mechanics/towns-trade/postal/#breaking-a-seal): the seal gets `P 90`. The odds stay the same, and a charged
  gang can break it for sure.
- [PvP](/docs/mechanics/society/pvp/#protected-zones): the ward stone gets `P 174` and the charged Dispel as its counter.

# Server Notes

Today Dispel lifts every dispellable buff, Detect finds every concealed creature, and Resist weighs only attributes and
level. Potency changes that in a few places:

- One calculator turns a cast into a Potency. It needs the skill rank, the caster's level and status values, the
  equipment bonus and the mana concentration at the caster.
- `ActiveStatusEffect` and the item enchantment carry that Potency. The enchantment's `strength` is the same value.
- `StatusEffectService.dispel` rolls Edge per effect. `StatusResistance.of` takes Resolve and Potency in place of the
  level lead. The `Detecting` system compares the two Potencies per target.
- Ritual Charge and Ritual Fatigue are status effects. The charge holds its bonus and participant count. The skill
  pipeline spends the charge on the next cast and hands its bonus to the calculator and to the skill script, which
  applies its reactions.
- The Mana Circle is a prop with a focus stone. Using it joins or starts the ritual, and the circle runs the 30-second
  channel of all participants.
