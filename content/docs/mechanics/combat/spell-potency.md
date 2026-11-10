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

| Part  | What it is                                                                                                                           | Range       |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| Rank  | `30 × rank / max rank` of the skill, rounded down. Dispel Lv. 3 of 5 gives `18`. A Bestia attack of level 7 gives `21`.              | `0 .. 30`   |
| Level | `level / 4` of the caster, master or Bestia.                                                                                         | `0 .. 30`   |
| Mind  | `30 × M / (M + 100)` with `M = INT + WIL / 2`. The same flattening curve as [Resist](/docs/mechanics/combat/status-effects/#resist). | `0 .. 30`   |
| Focus | Equipment and buffs that add Potency, like a Sage's staff.                                                                           | `0 .. 10`   |
| Place | Local [mana concentration](/docs/mechanics/world/environment/#mana-concentration): drained `-10`, ordinary `0`, thick `+10`.         | `-10 .. 10` |

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

Every contest, except [Dispel](#dispel), uses the same curve. `A` is the attacker's Potency, `D` the defender's:

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
Players learn one rule and can read every contest from it. Dispel is the exception: a Dispel at full rank should work on
everything that is not stronger than itself, so it does not start at a coin flip.

| Contest                | Attacker                    | Defender                              | Outcome                     |
| ---------------------- | --------------------------- | ------------------------------------- | --------------------------- |
| Shake off a debuff     | The debuff                  | The target's [Resolve](#resist)       | Chance and duration         |
| Find a hidden creature | Detect, Ruwach, Magic Sense | HIDDEN, CLOAKED, Suppress Aura        | How close you must stand    |
| Catch or block a spell | Magic Rod, Land Protector   | The incoming spell                    | Caught, blocked or not      |
| Reach a far place      | Teleport, Warp Portal, Scry | The [Disturbance](#against-the-world) | How far off you land or see |

Potency alone **never changes the numbers in a skill's own table**: damage, healing, duration, radius, number of users.
Those come from the rank, as before. Only a [ritual charge](#how-every-skill-reacts-to-a-charge) raises them, and only
by a little.

# Contests

## Dispel

Dispel keeps the base chance of its rank, `(50 + 10 × SkillLv)%`, so Lv. 5 has `100%`. The Potency of the target only
lowers it, and only when that Potency is higher than the Dispel's own:

```text
chance = base chance × min(1, P dispel / P target)
```

Equal Potency keeps the full base chance. A target with twice the Potency halves it. The chance gets small but never
reaches zero, so a very strong spell is a long shot, not out of reach.

| P target ÷ P dispel | Chance at Lv. 5 |
| ------------------- | --------------- |
| 1 or less           | 100%            |
| 1.5                 | 67%             |
| 2                   | 50%             |
| 4                   | 25%             |
| 10                  | 10%             |
| 20                  | 5%              |

Dispel rolls **once per buff** on the target. A Master Sage (`P 80`, Lv. 5) lifts an adept's Blessing (`49`) and every
other buff up to `80` for sure. The strongest buff a ritual can make (`150`) falls `53%` of the time. A dabbler (`P 33`,
Lv. 2, base `70%`) lifts a faint buff up to `33` `70%` of the time, the adept's Blessing `47%` and a master's buff
`29%`. Buffs that are not dispellable stay out of it, as before.

This replaces the target's SMDEF: the defence is now the Potency of the buff. The rank counts twice, in the base chance
and in the Dispel's own Potency.

## Enchantments and Seals

An [enchantment](/docs/mechanics/items-crafting/items/#enchantments) takes the Potency of the one who bound it as its strength. Some
enchantments have a fixed Potency instead, see [Fixed Potency](#fixed-potency). A Dispel meets the strength by the rule
above.

The [Postal Seal](/docs/mechanics/towns-trade/postal/#breaking-a-seal) has `P 350`. A Master Sage (`P 80`, Lv. 5) breaks
it `23%` of the time per try. With Dispel's 15 s cooldown they get two tries in the 30 s the sack lies on the ground,
`40%` together. An adept (`P 49`, Lv. 3) has `11%` per try and a dabbler (`P 33`, Lv. 2) `7%`.

A gang can charge a [ritual](#rituals) before the ambush. A full circle lifts the leader's Dispel to the cap of `150`,
and the seal breaks `43%` of the time on that one try. That takes six players, a circle next to the road and a kill
within one minute of the charge, so it stays rare.

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

HIDDEN, CLOAKED and [Suppress Aura](/docs/mechanics/combat/attack-list/#suppress-aura) take the Potency of the one who
hid. A detecting skill finds a concealed target only within part of its range:

```text
range against this target = range × Edge(P detect - P conceal)
```

HIDDEN and CLOAKED hide from eyes, Suppress Aura from magic only. Together they hide from both. Suppress Aura is a
Bestia attack, so its Potency is the Bestia's, like for every Bestia attack.

A level 80 Scholar with Magic Sense Lv. 5 (`50 m`, `P 70`) finds the aura of a young Bestia (`P 38`) at the full 50 m.
Against an old Bestia with a sharp mind (`P 66`) the range shrinks to 29 m. The hider is not invisible, but the seeker
must come close.

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

| Source of Disturbance                                                     | D         |
| ------------------------------------------------------------------------- | --------- |
| Any long-range spell                                                      | 10        |
| Distance                                                                  | +5 per km |
| A [Mana Storm](/docs/mechanics/world/doomsday/#mana-storms) at either end | +40       |
| An open rift nearby                                                       | +60       |

A [Teleport](/docs/mechanics/master/scholar-tree/#skill-teleport) lands off target by up to `1.4 km × (1 - Edge(P - D))`. This is the
story from the [Master Skills](/docs/mechanics/master/basics/#master-skills) page in numbers: Saferu (`P 80`) jumps 8 km
(`D 50`) into a mana storm (`D 90`). Edge is `30%`, and the group lands up to 980 m off target. Without the storm the
group lands on the rune. A jump of 20 km (`D 110`) is a lottery for one caster and exact with a ritual charge.

[Scry](/docs/mechanics/master/scholar-tree/#skill-scry) uses the same Edge for how clearly it shows the far place. A Warp Portal
uses it for where its far end opens.

# Fixed Potency

Spells that no player cast have a fixed Potency. Against a Dispel, a fixed Potency is just the wanted chance turned
around: `P target = P dispel ÷ chance`. So it can be far above what one caster reaches.

| Spell                                                           | P    | Why                                                                         |
| --------------------------------------------------------------- | ---- | --------------------------------------------------------------------------- |
| [Postal Seal](/docs/mechanics/towns-trade/postal/#the-seal)     | 350  | A strong solo Sage breaks it about once in four tries (`23%`).              |
| [Ward stone](/docs/mechanics/society/pvp/#protected-zones) aura | 3000 | The best circle, at the [ritual cap](#the-charge) of 150, has `5%` per try. |
| Permanent enchantments of the Artificer                         | -    | They cannot be dispelled at all.                                            |

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

Against a ward stone (`P 3000`) the full circle of level 100 helpers has `5%` per try. A circle of level 60 helpers
(`P 130`) has `4%`, and a lone Master Sage (`P 80`) `2.7%`. The ward settles for 5 minutes after every Dispel, as long as
the Ritual Fatigue of the circle, so a group tries once per rest. The full circle needs about 20 tries, nearly two hours.

## How Every Skill Reacts to a Charge

Any skill can take a charge: a Dispel, a Fire Bolt, a Heal, a Teleport, a crafting skill. Each skill reacts in one or
more of four ways:

| Reaction      | Skills                                         | What the charge does                                                          |
| ------------- | ---------------------------------------------- | ----------------------------------------------------------------------------- |
| Contest       | Dispel, debuffs, Detect, Magic Rod             | The higher Potency enters [Edge](#edge-one-curve-for-every-contest) or Resist |
| Against world | Teleport, Warp Portal, Scry                    | The higher Potency enters Edge against the Disturbance                        |
| Success roll  | Forging, Spell Inscription, Transmutation, ... | `+5% × participants × ManaFactor`, the Mana Circle bonus of today             |
| Surge         | Damage, healing, shields, buff duration        | `+1%` for every `4` points of bonus, at most `+25%`                           |

A skill that has a contest and also deals damage, like a Stone Curse or a Fire Bolt with a burn, gets both. Surge is
small on purpose. Six players who channel for 30 seconds and rest for 5 minutes get one Meteor Storm that hits a quarter
harder, not a city-killer.

Each skill script says which reactions it has. A skill with none of the four ignores the charge, and the skill window
says so before the leader wastes a ritual on it.

## What Rituals Are For

- **Countering a ward stone.** A Dispel with a charge is the counter-magic of the
  [Protected Zones](/docs/mechanics/society/pvp/#protected-zones). A full circle roughly doubles the chance of a lone
  Sage, and the stone allows one try every five minutes.
- **Long or stormy jumps.** A charged Teleport or Warp Portal lands where it should, even through a mana storm.
- **Lasting work.** A charged Spell Binding makes a trap or alarm that only another charged skill can find or lift. A
  settlement can guard its gate with it.
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
- [Master Skills](/docs/mechanics/master/basics/): [Mana Circles](/docs/mechanics/master/basics/#mana-circles) run as a
  ritual with a charge, so a crafting rite and a spell ritual are the same thing. Bestias may now join.

# Server Notes

Today Dispel lifts every dispellable buff, Detect finds every concealed creature, and Resist weighs only attributes and
level. Potency changes that in a few places:

- One calculator turns a cast into a Potency. It needs the skill rank, the caster's level and status values, the
  equipment bonus and the mana concentration at the caster.
- `ActiveStatusEffect` and the item enchantment carry that Potency. The enchantment's `strength` is the same value.
- `StatusEffectService.dispel` rolls the base chance times the Potency ratio per effect. `StatusResistance.of` takes Resolve and Potency in place of the
  level lead. The `Detecting` system compares the two Potencies per target.
- Ritual Charge and Ritual Fatigue are status effects. The charge holds its bonus and participant count. The skill
  pipeline spends the charge on the next cast and hands its bonus to the calculator and to the skill script, which
  applies its reactions.
- The Mana Circle is a prop with a focus stone. Using it joins or starts the ritual, and the circle runs the 30-second
  channel of all participants.
