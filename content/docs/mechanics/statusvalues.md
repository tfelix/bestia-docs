---
weight: 100
title: Status Values
description: Overview of the status values and derived stati.
---

The **status value** (e.g. INT or STR) is the fundamental number from which all in-game calculations are performed. It is built from three underlying value types, with a fourth category of values derived on top of it:

- **Base Values (BV)**
- **Individual Values (IV)**
- **Effort Values (EV)**
- **Status Based Values (SBV)**

The status value is calculated from the **base value (BV)**, the **individual value (IV)** and the **effort value (EV)**, scaled by the bestia's level (see the formula below).
The base value is a specialized value that is static for every bestia.
The **IVs** are determined when a bestia is caught and range from 0-100. The effort value is determined by the player and can be freely chosen when a level up happens.

**Status Based Values (SBV)** are values which are important for damage calculation but are just derived from status values.

# Status Values

The sophisticated status system describes the current state of a bestia (or simply any living entity) and does not strictly apply only to biological entities. The status system is important to calculate all battle related effects in the game.

All status values are calculated like this:

```kotlin
statusValue = (baseValue + individualValue) * level / 100 + effortValue
```

## Intelligence - INT

- Main influence value for magic domain related effects and power/damage of magic based attacks and skills.
- Increases the duration of magical effects from the player (buffs, skills, etc)
- Increases the total amount of available mana

## Willpower - WIL

- Increases resistance against enemy spells and magic effects.
- Increases mana regeneration over time
- Increases the duration of magic effects from the player
- Reduces cast duration of spells
- Slightly increases the stamina regeneration
- Slightly increases the total amount of stamina
- Slightly increases resistance against temperature
- Increases the flee rate (dodge chance) against physical attacks

## Strength - STR

- Increases damage of physical attacks (and slightly the damage of ranged attacks)
- Increases carry capacity
- Increases the maximum HP amount slightly
- Increases the maximum stamina amount slightly

## Vitality - VIT

- Reduces the damage of physical attacks
- Increases the HP regeneration over time
- Increases the maximum amount of HP
- Increases the stamina regeneration
- Increases the maximum amount of stamina
- Increases resistance against temperature

## Dexterity - DEX

- Increases the hit chance of physical based attacks
- Increases the probability of a critical hit
- Increases the damage of ranged attacks
- Increases upgrade chance of items and equipment by 1% every 10 DEX.

## Agility - AGI

- Increases the attack rate
- Increases the walking speed
- Increases the dodge chance (flee rate) for physical attacks (melee and ranged)

# Status Based Values

These values are highly relevant for battle calculations. The values are derived from the status values.

## Health

HP is the life energy of a Bestia or entity. If the HP reaches 0, the Bestia is killed.

```text
HP = floor(((15 + (baseValueHP * 2 + ivHp) * level / 100 + level) * (1 + VIT * 0.01) + HPModSum) * HPModPerc)
```

### HP Recovery

HP regenerates automatically over time, ticking every 6 seconds. The regeneration rate is doubled while the Bestia is resting.

```text
BaseHPR = max(1, floor(MaxHP / 200))
HPR = BaseHPR + floor(VIT / 5)
FinalHPR = floor(HPR * (1 + HPRMod * 0.01))
```

`HPRMod` is a percentage bonus contributed by gear, buffs, and passive skills (e.g. an Increase HP Recovery skill).

## Mana

Mana is the energy needed to cast spells or abilities. The more mana the Bestia has, the more and bigger spells she can cast.

```text
MANA = floor(((25 + (baseValueMana * 2 + ivMana) * level / 100 + level) * (1 + INT * 0.01) + ManaModSum) * ManaModPerc)
```

### Mana Recovery

Mana regenerates automatically over time, ticking every 8 seconds. The regeneration rate is doubled while the Bestia is resting.

```text
BaseMPR = 1 + floor(MaxMana / 100) + floor(INT / 6)
MPR = floor(BaseMPR * (1 + MPRMod * 0.01))
```

`MPRMod` is a percentage bonus contributed by gear, buffs, and passive skills.

If INT is 120 or higher, an additional flat bonus is added:

```text
MPR = MPR + 4 + floor((INT - 120) / 2)
```

## Stamina - STA

Stamina is the third core value and measures a bestia's "exhaustion". It rarely becomes critical during normal play, but it is a gentle reminder for the player to let the Bestia rest from time to time.

{{< alert context="warning" text="The stamina formulas below are **temporary** and still subject to balancing. VIT is the main driver, with STR and WIL contributing slightly." />}}

```text
STA = floor(((20 + (baseValueSta * 2 + ivSta) * level / 100 + level) * (1 + VIT * 0.02) + floor(STR / 5) + floor(WIL / 5) + StaModSum) * StaModPerc)
```

- From 30% stamina to 0% stamina the walkspeed linearly decreases by 50%.
- A stamina below 10% stops the mana and HP generation
- A stamina below 5% leads to a slow HP drop over time
  - 0.3% of max HP loss every tick (leads to death in about 8h real time)
- Stamina can be regenerated by resting in a safe spot or by using items/meals.

### Stamina Recovery

Stamina regenerates automatically over time, ticking every 10 seconds. The regeneration rate is doubled while the Bestia is resting.

```text
BaseSTR_rec = max(1, floor(MaxSta / 150))
STAR = BaseSTR_rec + floor(VIT / 6) + floor(WIL / 8)
FinalSTAR = floor(STAR * (1 + STARMod * 0.01))
```

`STARMod` is a percentage bonus contributed by gear, buffs, and passive skills.

## Hit Rate - HIT

Calculates the chance of hitting an enemy.

```text
HIT = floor((175 + BaseLv + DEX + floor(WIL ÷ 3) + HitModSum) * HitModPerc)
```

The chance to land a hit is calculated as `(AttackerHit - DefenderFlee)%`. The chance can neither be higher than 100% nor lower than 5%.

## Flee Rate - FLEE

This is the dodge rate of physical attacks (magic attacks can not be dodged).

```text
FLEE = floor((100 + BaseLv + AGI + Floor(WIL ÷ 5) + FleeModSum) * FleeModPerc)
```

## Critical Hit - CRIT

The Critical Hit rating, which increases damage by (40 + CRIT)%. Offensive attacks do not take CRIT into account except for a few exceptions. Critical Hit also ignores Flee rate but not [Hard Defense](/docs/server/battle#value-hard_def). Critical Hit Rate is doubled when wielding a Katar type weapon. Critical Hit rate is reduced based on the enemy's Critical Hit Shield.

```text
CRIT = WIL ÷ 3 + Bonus
```

- Critical damage always goes with the highest weapon level variance

## Soft Defense - SDEF

Soft defense, also known as "VIT" defense, reduces incoming physical damage directly, on top of the [hard defense](/docs/server/battle#value-hard_def) granted by armor and other equipment.

```text
SoftDEF = (floor(VIT + (STR / 5) + (AGI / 5) + (BaseLv / 4)) + SoftDefModAdditive) × SoftDefMod%
```

## Soft Magic Defense - SMDEF

Soft magic defense, also known as "INT" magic defense, reduces incoming magic damage directly.

```text
SoftMDEF = (floor(INT + (VIT / 5) + (DEX / 5) + (BaseLv / 4)) + SoftMdefModAdditive) × SoftMdefMod%
```

## Attack Speed - ASPD

The attack speed describes how quickly basic attacks can be performed. It depends on the following criteria:

- The player's class.
- The player's weapon type.
- Increasing AGI to gain higher Attack Speed. (DEX provides negligible Attack Speed increases)
- Wearing a shield applies a flat Attack Speed penalty (the `ShieldPenalty` in the formula below) that depends on the specific shield.
- Some items, skills and equipments can either increase or decrease Attack Speed.

```text
StartASPD = 150
EquipASPD % = [ { 195 − BaseASPD } × EquipASPDMod ]
BaseASPD = [ 200 − { 200 − [StartASPD + ShieldPenalty + √(AGI × 10 + DEX × 0.2) ] } × { 1 − PotionASPDMod − SkillASPDMod } ]
FinalASPD = BaseASPD * EquipASPD%  + EquipASPDFixed
```

The hits per second are calculated like this:

```text
Hit/s = 1000 / ((200 - ASPD) * 10 + 70)
```

## Attack - ATK

This is derived from the player's Base Level, STR, DEX, and WIL. This is always considered as Neutral property.

```text
ATK = (BaseLevel ÷ 4) + STR + (DEX ÷ 5) + (WIL ÷ 3)
```

when using ranged weapons the formula becomes:

```text
ATK = (BaseLevel ÷ 4) + DEX + (STR ÷ 5) + (WIL ÷ 3)
```

### Weapon Attack - WATK

This is derived from a player's equipped weapon and STR or DEX depending on your weapon type. Variance, StatBonus, and OverUpgradeBonus is not shown in the Status Window.

```text
WATK = (BaseWeaponDamage + Variance + StatBonus + RefinementBonus + OverUpgradeBonus) × SizePenalty
```

## Magic Attack - MATK

This is derived from the player's Base Level, INT, and WIL. Just like ATK, this is always considered as Neutral property unless a spell defines otherwise.

```text
MATK = (BaseLevel ÷ 4) + INT + (WIL ÷ 5)
```

# Effort Values

Upon level up of a Bestia or Master it gains **gain points** which the player is free to distribute into the **effort values**
of any of the status values. One point into the effort value will directly add 1 point to the respective Status Value.

Once spent, these points are fixed and cannot be re-distributed anymore (there might be quests or NPCs which
are able to reset these values a certain number of times).

The gain points for a level up is calculated like this:

```text
effGain = 5 + floor(reachedLevel / 2)
```

The amount of Gain Points the player needs to spend in order to raise an **effort value** is calculated like this:

```text
effGainNeeded = max(1, (nextEffValue / 3))
```

# Individual Values

The individual values **IVs** are generated when the Bestia spawns, which makes them somewhat random. It's possible to find better or worse Bestia. By [breeding Bestia](/docs/mechanics/bestia#breeding) these IVs are subject to manipulation by the player and it is possible to make stronger Bestia in a controlled way. A bestia master always has IVs of 50 for every stat.

# Base Values

Every Bestia has base values upon which the status values are calculated. With setting these values some baseline for status values can be controlled from the designer. Every status has its designated base value.

For other non-Bestia based entities like items or buildings etc. base values are usually generated via a ruleset and are assigned in a static manner.
