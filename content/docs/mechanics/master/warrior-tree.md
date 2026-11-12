---
weight: 250
title: Warrior Tree
description: "Wizard, Brawler, Hunter, Assassin, Knight and Bard: the fighting professions."
---

Where the other trees build, gather and study, the Warrior tree is built to fight. Wizards burn the battlefield down with elemental and arcane fury, Brawlers fight with fist and staff, Hunters shoot from afar, Assassins strike from hiding with poisoned blades, Knights hold the front line in plate, and Bards fight or play their allies to victory.

```mermaid
graph TD
    Endure["Endure (1)"]
    IronSkin["Iron Skin (1-5)"]
    MagicArmor["Magic Armor (1-3)"]
    Meditation["Meditation (1-5)"]
    Gate["5+ pts in Warrior Tree"]
    Wizard["Wizard"]
    Brawler["Brawler"]
    Hunter["Hunter"]
    Assassin["Assassin"]
    Knight["Knight"]
    Bard["Bard"]

    Endure -.-> Gate
    IronSkin -.-> Gate
    MagicArmor -.-> Gate
    Meditation -.-> Gate
    Gate -.->|unlocks| Wizard
    Gate -.->|unlocks| Brawler
    Gate -.->|unlocks| Hunter
    Gate -.->|unlocks| Assassin
    Gate -.->|unlocks| Knight
    Gate -.->|unlocks| Bard
```

<br>
{{< skill name="Endure" maxLevel="1"
    type="Passive"
    description="A warrior's steadied breath - the body keeps mending itself even in the thick of a fight." >}}
HP and Mana regeneration is not stopped during combat.
{{< /skill >}}

{{< skill name="Iron Skin" maxLevel="5"
    type="Passive"
    description="Hide toughened by nothing more than sheer stubbornness. Reduces incoming physical damage. Unlike Magic Armor this costs no mana, but the reduction is more modest." >}}

It cuts every physical blow, melee and ranged, after defence. It adds up with other cuts to physical damage.

| Lv. | Physical Damage Taken |
| --- | --------------------- |
| 1   | -3%                   |
| 2   | -6%                   |
| 3   | -9%                   |
| 4   | -12%                  |
| 5   | -15%                  |

{{< /skill >}}

{{< skill name="Magic Armor" maxLevel="3"
    type="Active" manaCost="30" castTime="5s" cooldown="10s" duration="5 min" target="Self"
    description="A shimmering ward of raw mana wrapped around the caster, turning aside blade and spell alike at the cost of their own reserves." >}}

When active, each hit costs 2% of the owner's current mana, at least one point. A burn or a poison tick is no hit and
costs nothing. When the mana drops below 20% the ward breaks. The reduction cuts blows and spells alike. It is its own
damage modifier, so it multiplies with Iron Skin instead of adding to it: Iron Skin 5 and Magic Armor 3 let `0.85 x 0.7`
of a blow through.

| Lv. | Damage Reduction |
| --- | ---------------- |
| 1   | 10%              |
| 2   | 20%              |
| 3   | 30%              |

{{< /skill >}}

{{< skill name="Meditation" maxLevel="5"
    type="Passive"
    description="A calm, centered breathing that quickens the master's natural mending." >}}

| Lv. | HP/Mana Regeneration |
| --- | -------------------- |
| 1   | +6%                  |
| 2   | +12%                 |
| 3   | +18%                 |
| 4   | +24%                 |
| 5   | +30%                 |

{{< /skill >}}

# Wizard

Fire, water, wind, earth, and the deeper currents of holy and dark magic - Wizards bend all of it into a weapon, at the cost of the armor most masters would rather keep.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [warrior tree](/docs/mechanics/master/warrior-tree/)" />}}

The Wizard has two routes. The **Elementalist** casts the bolts and the great area spells of the elements they choose. The **Arcanist** controls the field with walls, curses and raw mana.

```mermaid
graph TD
    FireBolt["Fire Bolt (1-5)"]
    IceBolt["Ice Bolt (1-5)"]
    ThunderBolt["Thunder Bolt (1-5)"]
    EarthSpike["Earth Spike (1-5)"]
    ArcaneMastery["Arcane Mastery (1-3)"]

    FireWall["Fire Wall (1-3)"]
    MeteorStorm["Meteor Storm (1-3)"]
    SturmGust["Storm Gust (1-3)"]
    FrostNova["Frost Nova (1-3)"]
    Quagmire["Quagmire (1-3)"]
    ThunderStorm["Thunder Storm (1-3)"]
    Earthquake["Earthquake (1-3)"]

    MagicArmor[/"Magic Armor (Warrior Tree)"/]
    SafetyWall["Safety Wall (1-3)"]
    StoneCurse["Stone Curse (1-3)"]
    SuppressMagic["Suppress Magic (1-3)"]

    SoulBreak["Soul Break (1-3)"]
    Mindbreak["Mindbreak (1-3)"]

    FireBolt -->|Lv.3| FireWall
    FireBolt -->|Lv.5| MeteorStorm
    EarthSpike -->|Lv.3| Earthquake

    IceBolt -->|Lv.1| FrostNova
    IceBolt -->|Lv.5| SturmGust

    ThunderBolt -->|Lv.2| Quagmire
    ThunderBolt -->|Lv.3| ThunderStorm

    MagicArmor -->|Lv.3| SafetyWall
    SafetyWall -->|Lv.3| StoneCurse
    StoneCurse -->|Lv.2| SuppressMagic

    ArcaneMastery -->|Lv.2| SoulBreak
    SoulBreak -->|Lv.3| Mindbreak

    %% Layout only: `~~~` renders as an invisible link and implies no requirement.
    %% It ranks the ward/spirit branch below the elemental chains so it forms its
    %% own row instead of widening the diagram by another two columns.
    FrostNova ~~~ MagicArmor
    ThunderStorm ~~~ ArcaneMastery
```

<br>

{{< skill name="Fire Bolt" maxLevel="5"
    type="Active" manaCost="18" castTime="2.0s" cooldown="None" range="9" target="Enemy"
    description="A quick bolt of flame hurled at a single target. The first spell most Wizards ever learn, and the one they cast the most often." >}}

A bolt of `MATK * (100% + bonus)` of its element, weighed by the element table and the target's resistance to the
element, less MDEF. The cast time is 2.0s less the reduction.

| Lv. | MATK  | Cast Time Reduction |
| --- | ----- | ------------------- |
| 1   | +20%  | 0.2s                |
| 2   | +40%  | 0.4s                |
| 3   | +60%  | 0.6s                |
| 4   | +80%  | 0.8s                |
| 5   | +100% | 1.0s                |

{{< /skill >}}

{{< skill name="Ice Bolt" maxLevel="5"
    type="Active" manaCost="18" castTime="2.0s" cooldown="None" range="9" target="Enemy"
    description="A shard of hardened cold flung at a single target - the water-elemental counterpart to Fire Bolt." >}}

A bolt of `MATK * (100% + bonus)` of its element, weighed by the element table and the target's resistance to the
element, less MDEF. The cast time is 2.0s less the reduction.

| Lv. | MATK  | Cast Time Reduction |
| --- | ----- | ------------------- |
| 1   | +20%  | 0.2s                |
| 2   | +40%  | 0.4s                |
| 3   | +60%  | 0.6s                |
| 4   | +80%  | 0.8s                |
| 5   | +100% | 1.0s                |

{{< /skill >}}

{{< skill name="Thunder Bolt" maxLevel="5"
    type="Active" manaCost="18" castTime="2.0s" cooldown="None" range="9" target="Enemy"
    description="A crack of lightning called down onto a single target - the wind-elemental counterpart to Fire Bolt." >}}

A bolt of `MATK * (100% + bonus)` of its element, weighed by the element table and the target's resistance to the
element, less MDEF. The cast time is 2.0s less the reduction.

| Lv. | MATK  | Cast Time Reduction |
| --- | ----- | ------------------- |
| 1   | +20%  | 0.2s                |
| 2   | +40%  | 0.4s                |
| 3   | +60%  | 0.6s                |
| 4   | +80%  | 0.8s                |
| 5   | +100% | 1.0s                |

{{< /skill >}}

{{< skill name="Earth Spike" maxLevel="5"
    type="Active" manaCost="18" castTime="2.0s" cooldown="None" range="9" target="Enemy"
    description="A jagged spar of stone erupts beneath a single target - the earth-elemental counterpart to Fire Bolt." >}}

A bolt of `MATK * (100% + bonus)` of its element, weighed by the element table and the target's resistance to the
element, less MDEF. The cast time is 2.0s less the reduction.

| Lv. | MATK  | Cast Time Reduction |
| --- | ----- | ------------------- |
| 1   | +20%  | 0.2s                |
| 2   | +40%  | 0.4s                |
| 3   | +60%  | 0.6s                |
| 4   | +80%  | 0.8s                |
| 5   | +100% | 1.0s                |

{{< /skill >}}

{{< skill name="Arcane Mastery" maxLevel="3"
    type="Passive"
    description="A deeper communion with raw mana beyond the elements, sharpening the spells that draw on it: Soul Break and Mindbreak." >}}

It raises Soul Break's damage and the MATK Mindbreak gives by the table's percent. Mindbreak 3 with Arcane Mastery 3
gives `100% x 1.25 = 125%` more MATK.

| Lv. | Raw-Mana Spell Damage |
| --- | --------------------- |
| 1   | +5%                   |
| 2   | +15%                  |
| 3   | +25%                  |

{{< /skill >}}

{{< skill name="Safety Wall" maxLevel="3" requires="Magic Armor Lv. 3"
    type="Active" manaCost="30" castTime="1s" cooldown="10s" duration="per Lv." range="6" target="Ground"
    description="Conjures a shimmering barrier of solidified mana on one tile. It blocks incoming physical projectiles and melee strikes until it has absorbed enough hits or its duration runs out." >}}

The wall covers one tile. Every ally standing on it is shielded: each melee blow or projectile at them is stopped whole
and spends one of the wall's hits. Everyone on the tile shares the count, and the last hit breaks the wall. Spells
pass through. Foes standing on it get nothing.

| Lv. | Hits Absorbed | Duration |
| --- | ------------- | -------- |
| 1   | 2             | 20s      |
| 2   | 6             | 36s      |
| 3   | 10            | 52s      |

{{< /skill >}}

{{< skill name="Stone Curse" maxLevel="3" requires="Safety Wall Lv. 3"
    type="Active" manaCost="25" castTime="1s" cooldown="15s" duration="per Lv." range="6" target="Enemy"
    description="Encases a target in solid stone, applying [Stoning](/docs/mechanics/combat/status-effects/#all-status-effects) where they stand. Stoning turns into Stone unless it is cured first. Requires 1 [Red Mana Crystal](/docs/mechanics/items-crafting/item-list/#red-mana-crystal) per cast." >}}

Stoning is a 10s warning; the Stone that follows lasts as long as the table says. The target's resistance cuts the
chance, as for any status. The crystal is spent whether the roll wins or not.

| Lv. | Stoning Chance | Stone Duration |
| --- | -------------- | -------------- |
| 1   | 20%            | 15s            |
| 2   | 40%            | 30s            |
| 3   | 60%            | 45s            |

{{< /skill >}}

{{< skill name="Suppress Magic" maxLevel="3" requires="Stone Curse Lv. 2"
    type="Active" manaCost="30" castTime="Instant" cooldown="20s" duration="per Lv." range="9" target="Enemy"
    description="A ward of counter-mana thrown over a target mid-incantation, interrupting whatever spell they were weaving and leaving them [Silenced](/docs/mechanics/combat/status-effects/#all-status-effects) for a short time after." >}}

One roll decides it. On a win it breaks the running cast, if there is one, and silences the target. On a loss nothing
happens. The target's resistance cuts the chance and the silence, as for any status.

| Lv. | Chance | Silence Duration |
| --- | ------ | ---------------- |
| 1   | 20%              | 3s               |
| 2   | 40%              | 5s               |
| 3   | 60%              | 7s               |

{{< /skill >}}

{{< skill name="Fire Wall" maxLevel="3" requires="Fire Bolt Lv. 3"
    type="Active" manaCost="35" castTime="2s" cooldown="10s" duration="20s" range="6" target="Ground"
    description="Conjures a wall of roaring flame across the ground. Anything that tries to push through is burned and shoved back the way it came." >}}

The wall is three tiles long and runs across the line from the caster to the target tile, diagonals included. Twice a
second each tile burns the foe standing on it for `MATK * (100% + bonus)` of fire, weighed like a bolt, and throws it
back against its facing. Allies walk through unharmed.

| Lv. | MATK (per tick) | Knockback |
| --- | --------------- | --------- |
| 1   | +10%            | 1m        |
| 2   | +30%            | 2m        |
| 3   | +50%            | 3m        |

{{< /skill >}}

{{< skill name="Meteor Storm" maxLevel="3" requires="Fire Bolt Lv. 5"
    type="Active" manaCost="70" castTime="6s" cooldown="30s" duration="10s" range="12" target="Ground"
    description="Calls down a rain of blazing meteors onto an area, scorching everything caught beneath it over and over as it falls." >}}

The area is 7x7 tiles. The meteors fall one after another, evenly spread over the 10s, each on a random tile of the
area. A meteor hits every foe within 3 tiles of where it lands (a 7x7 splash, as in Ragnarok Online) for
`MATK * (100% + bonus)` of fire, weighed like a bolt.

| Lv. | MATK (per meteor) | Meteor Count |
| --- | ----------------- | ------------ |
| 1   | +10%              | 3            |
| 2   | +30%              | 5            |
| 3   | +50%              | 7            |

{{< /skill >}}

{{< skill name="Storm Gust" maxLevel="3" requires="Ice Bolt Lv. 5"
    type="Active" manaCost="65" castTime="5s" cooldown="25s" duration="10s" range="12" target="Ground"
    description="A freezing gale that batters an area with repeated waves of ice, each one carrying a chance to freeze anything caught in the flurry solid." >}}

The area is 9x9 tiles. A wave hits every foe in it each second, ten in all, for `MATK * (100% + bonus)` of water,
weighed like a bolt, and rolls the freeze chance. The next wave breaks a freeze, as any blow does.

| Lv. | MATK (per wave) | Freeze Chance (per wave) |
| --- | --------------- | ------------------------ |
| 1   | +8%             | 5%                       |
| 2   | +24%            | 15%                      |
| 3   | +40%            | 25%                      |

{{< /skill >}}

{{< skill name="Frost Nova" maxLevel="3" requires="Ice Bolt Lv. 1"
    type="Active" manaCost="40" castTime="2s" cooldown="15s" range="per Lv." target="Self"
    description="A burst of subzero cold erupts outward from the caster, freezing anything caught too close." >}}

One burst around where the caster stands, half a second after the cast. It deals no damage. Each foe in reach rolls
the freeze chance, cut by its resistance as for any status. The radius counts tiles in every direction, so 2m covers
5x5 tiles.

| Lv. | Radius | Freeze Chance |
| --- | ------ | ------------- |
| 1   | 2m     | 15%           |
| 2   | 4m     | 35%           |
| 3   | 6m     | 55%           |

{{< /skill >}}

{{< skill name="Quagmire" maxLevel="3" requires="Thunder Bolt Lv. 2"
    type="Active" manaCost="30" castTime="2s" cooldown="20s" duration="30s" range="9" target="Ground"
    description="Turns the ground in an area into thick, clinging mud. Any AGI-increasing buff on someone caught in it is stripped away, and their own AGI and DEX are dragged down for as long as they remain inside." >}}

The mud covers 5x5 tiles and holds only foes. It strips Increase AGI when it takes hold and keeps stripping it, so a
recast inside the mud does not last. Regardless of level, the reduction is capped at `25%` against Bestia Masters and
their Bestias and `50%` against wild Bestias and monsters. It ends shortly after the target wades out, and it cannot be
dispelled.

| Lv. | AGI/DEX Reduction (uncapped) |
| --- | ---------------------------- |
| 1   | 10%                          |
| 2   | 30%                          |
| 3   | 50%                          |

{{< /skill >}}

{{< skill name="Thunder Storm" maxLevel="3" requires="Thunder Bolt Lv. 3"
    type="Active" manaCost="60" castTime="4s" cooldown="20s" duration="8s" range="12" target="Ground"
    description="Wind churns into a raging storm overhead, calling down lightning bolts across the whole area at random." >}}

The area is 5x5 tiles. The strikes fall one after another, evenly spread over the 8s, each on a random tile of the
area. A strike hits every foe within 1 tile of it (3x3) for `MATK * (100% + bonus)` of wind, weighed like a bolt.

| Lv. | MATK (per strike) | Strike Count |
| --- | ----------------- | ------------ |
| 1   | +10%              | 3            |
| 2   | +30%              | 5            |
| 3   | +50%              | 7            |

{{< /skill >}}

{{< skill name="Earthquake" maxLevel="3" requires="Earth Spike Lv. 3"
    type="Active" manaCost="60" castTime="4s" cooldown="25s" duration="8s" range="per Lv." target="Self"
    description="Splits the ground in a wide radius around the caster, the shockwave dealing repeated damage to everything caught standing on it." >}}

The split ground stays where the caster stood when the spell resolved. Each second it hits every foe on it for
`MATK * (100% + bonus)` of earth, weighed like a bolt: eight shocks in all. Allies are not hurt. The radius counts
tiles in every direction, so 2m covers 5x5 tiles.

| Lv. | MATK (per tick) | Radius |
| --- | --------------- | ------ |
| 1   | +10%            | 2m     |
| 2   | +30%            | 4m     |
| 3   | +50%            | 6m     |

{{< /skill >}}

{{< skill name="Soul Break" maxLevel="3" requires="Arcane Mastery Lv. 2"
    type="Active" manaCost="45" castTime="2s" cooldown="15s" range="9" target="Enemy"
    description="Tears into a target with raw, undirected mana that ignores elemental resistance, ripping away a portion of their own mana in the process." >}}

Raw mana of `MATK * (100% + bonus)`, raised by Arcane Mastery, less MDEF. It has no element, so neither the element
table nor a resistance weighs it. The target loses the table's share of its current mana; the caster gains none of it.

| Lv. | MATK  | Target Mana Drained |
| --- | ----- | ------------------- |
| 1   | +20%  | 5%                  |
| 2   | +60%  | 15%                 |
| 3   | +100% | 25%                 |

{{< /skill >}}

{{< skill name="Mindbreak" maxLevel="3" requires="Soul Break Lv. 3"
    type="Active" manaCost="50" castTime="3s" cooldown="60s" duration="60s" range="5" target="Bestia"
    description="A buff channeling so much raw magic through one of the master's Bestias at once that its armor is the first thing to give. Once applied it reduces the magic defense but increases magical attack of the Bestia." >}}

Only the caster's own Bestias; any other target is refused before the cast bar. Arcane Mastery raises the MATK it
gives. The reduction takes the soft MDEF only.

| Lv. | MATK  | SMDEF Reduction |
| --- | ----- | --------------- |
| 1   | +20%  | 20%             |
| 2   | +60%  | 60%             |
| 3   | +100% | 100%            |

{{< /skill >}}

# Brawler

No fancy footwork, no elemental theatrics - just fists, a staff, and the kind of toughness that keeps going long after everyone else has called it quits.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [warrior tree](/docs/mechanics/master/warrior-tree/)" />}}

```mermaid
graph TD
    IronSkin[/"Iron Skin (Warrior Tree)"/]
    ToughGuy["Tough Guy (1-5)"]
    SecondWind["Second Wind (1-3)"]
    Unbreakable["Unbreakable (1-3)"]
    IronFist["Iron Fist (1-10)"]
    TripleBlow["Triple Blow (1-10)"]
    ChainCombo["Chain Combo (1-5)"]
    BattleFury["Battle Fury (1-3)"]
    UltimaFist["Ultima Fist (1-5)"]
    StaffSweep["Staff Sweep (1-5)"]
    Rush["Rush (1)"]

    ToughGuy -->|Lv.3| SecondWind
    SecondWind -->|Lv.2| Unbreakable
    IronSkin -->|Lv.3| Unbreakable
    ToughGuy -->|Lv.3| BattleFury

    IronFist -->|Lv.3| TripleBlow
    TripleBlow -->|Lv.5| ChainCombo
    BattleFury -->|Lv.3| UltimaFist
    ChainCombo -->|Lv.3| UltimaFist

    StaffSweep -->|Lv.2| Rush
```

<br>
{{< skill name="Tough Guy" maxLevel="5"
    type="Passive"
    description="A Brawler's conditioning - stamina holds out longer under strain and comes back quicker once it's spent." >}}

| Lv. | Stamina Cost Reduction | Stamina Regeneration |
| --- | ---------------------- | -------------------- |
| 1   | 10%                    | +10%                 |
| 2   | 20%                    | +20%                 |
| 3   | 30%                    | +30%                 |
| 4   | 40%                    | +40%                 |
| 5   | 50%                    | +50%                 |

{{< /skill >}}

{{< skill name="Second Wind" maxLevel="3" requires="Tough Guy Lv. 3"
    type="Active" manaCost="0" castTime="Instant" cooldown="per Lv." range="0" target="Self"
    description="A Brawler's answer to running on empty: dig deep once, and get back up." >}}

| Lv. | Stamina Restored | HP Restored | Cooldown |
| --- | ---------------- | ----------- | -------- |
| 1   | 50%              | -           | 180s     |
| 2   | 50%              | 20%         | 180s     |
| 3   | 50%              | 20%         | 120s     |

{{< /skill >}}

{{< skill name="Unbreakable" maxLevel="3" requires="Iron Skin Lv. 3 and Second Wind Lv. 2"
    type="Passive"
    description="The Brawler's capstone. Everyone else has a breaking point; this is the skill that argues otherwise." >}}

Once per cooldown, an otherwise lethal hit leaves the master at 1 HP instead.

| Lv. | Cooldown | Extra                                             |
| --- | -------- | ------------------------------------------------- |
| 1   | 10 min   |                                                   |
| 2   | 10 min   | Stun and knockback last half as long above 50% HP |
| 3   | 6 min    | Stun and knockback last half as long above 50% HP |

{{< /skill >}}

{{< skill name="Iron Fist" maxLevel="10"
    type="Passive"
    description="Knuckles hardened on posts, walls and the occasional jaw." >}}

| Lv. | ATK with Fist Weapons |
| --- | --------------------- |
| 1   | +3                    |
| 2   | +6                    |
| 3   | +9                    |
| 4   | +12                   |
| 5   | +15                   |
| 6   | +18                   |
| 7   | +21                   |
| 8   | +24                   |
| 9   | +27                   |
| 10  | +30                   |

{{< /skill >}}

{{< skill name="Triple Blow" maxLevel="10" requires="Iron Fist Lv. 3"
    type="Passive"
    description="Every swing carries the chance to become three, faster than the eye can follow." >}}

A basic attack that triggers strikes three times for `200%` ATK in all.

| Lv. | Chance per Basic Attack |
| --- | ----------------------- |
| 1   | 3%                      |
| 2   | 6%                      |
| 3   | 9%                      |
| 4   | 12%                     |
| 5   | 15%                     |
| 6   | 18%                     |
| 7   | 21%                     |
| 8   | 24%                     |
| 9   | 27%                     |
| 10  | 30%                     |

{{< /skill >}}

{{< skill name="Chain Combo" maxLevel="5" requires="Triple Blow Lv. 5"
    type="Active" manaCost="15" castTime="Instant" cooldown="None" range="1" target="Enemy"
    description="Follows a Triple Blow at once with four more hits, before the target has found its feet." >}}

Can only be used right after a [Triple Blow](#skill-triple-blow).

| Lv. | ATK over Four Hits |
| --- | ------------------ |
| 1   | 300%               |
| 2   | 350%               |
| 3   | 400%               |
| 4   | 450%               |
| 5   | 500%               |

{{< /skill >}}

{{< skill name="Battle Fury" maxLevel="3" requires="Tough Guy Lv. 3"
    type="Active" manaCost="20" castTime="Instant" cooldown="60s" duration="per Lv." range="0" target="Self"
    description="Works the Brawler into a red haze: more strength behind every blow, less care for what comes back." >}}

Applies [Berserk](/docs/mechanics/combat/status-effects/#all-status-effects): `+60%` ATK and `+30%` attack speed, but no DEF.

| Lv. | Duration |
| --- | -------- |
| 1   | 10s      |
| 2   | 20s      |
| 3   | 30s      |

{{< /skill >}}

{{< skill name="Ultima Fist" maxLevel="5" requires="Battle Fury Lv. 3 and Chain Combo Lv. 3"
    type="Active" manaCost="10" castTime="Instant" cooldown="None" range="1" target="Enemy"
    description="The Brawler's finisher: every last drop of mana poured into a single blow." >}}

Only while Berserk and with at least half the mana. Deals `ATK * (4 + mana spent / 10)` and spends all mana. Afterwards
the Berserk ends and [Mana Sealed](/docs/mechanics/combat/status-effects/#all-status-effects) stops mana regeneration for
`5 min`.

| Lv. | Damage Bonus |
| --- | ------------ |
| 1   | +10%         |
| 2   | +20%         |
| 3   | +30%         |
| 4   | +40%         |
| 5   | +50%         |

{{< /skill >}}

{{< skill name="Staff Sweep" maxLevel="5"
    type="Active" manaCost="20" castTime="Instant" cooldown="6s" range="0" target="Self"
    description="A wide sweep of the staff that clears a circle around the Brawler." >}}

Needs a staff. Hits every enemy within `2m` and knocks them back `1m`.

| Lv. | ATK  |
| --- | ---- |
| 1   | 120% |
| 2   | 140% |
| 3   | 160% |
| 4   | 180% |
| 5   | 200% |

{{< /skill >}}

{{< skill name="Rush" maxLevel="1" requires="Staff Sweep Lv. 2"
    type="Active" manaCost="12" castTime="Instant" cooldown="10s" range="6" target="Enemy"
    description="Covers the ground to a target in a single burst of speed." >}}

Dashes up to `6m` to the target.

{{< /skill >}}

# Hunter

Neither predator nor prey, exactly. Hunters move through the wild like the terrain isn't there, see their quarry long before it sees them, and finish the job from further away than most can aim.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [warrior tree](/docs/mechanics/master/warrior-tree/)" />}}

The Hunter has two routes. The **Archer** fights with the bow from as far away as the eye reaches. The **Tracker** marks the prey, hunts it down with spear and Bestias, and moves fast through the wild.

```mermaid
graph TD
    Camouflage["Camouflage (1-3)"]
    Trailblazer["Trailblazer (1-5)"]
    HuntersMark["Hunter's Mark (1-5)"]
    OwlsEye["Owl's Eye (1-5)"]
    VulturesEye["Vulture's Eye (1-5)"]
    DoubleStrafe["Double Strafe (1-10)"]
    ArrowShower["Arrow Shower (1-5)"]
    ChargeArrow["Charge Arrow (1)"]
    ImproveConcentration["Improve Concentration (1-5)"]
    ArrowCrafting["Arrow Crafting (1)"]
    Javelin["Javelin (1-5)"]
    PackHunt["Pack Hunt (1-3)"]

    Camouflage -->|Lv.2| HuntersMark
    Trailblazer -->|Lv.2| Javelin
    HuntersMark -->|Lv.3| PackHunt

    OwlsEye -->|Lv.3| VulturesEye
    OwlsEye -->|Lv.3| DoubleStrafe
    DoubleStrafe -->|Lv.5| ArrowShower
    VulturesEye -->|Lv.3| ChargeArrow
    VulturesEye -->|Lv.1| ImproveConcentration
```

<br>
{{< skill name="Camouflage" maxLevel="3"
    type="Passive"
    description="Teaches the Hunter to read the land well enough to disappear into it." >}}

Wild Bestia notice the master later. Camouflage does not hide the master, so [Ruwach](/docs/mechanics/master/scholar-tree/#skill-ruwach) has nothing to
reveal.

| Lv. | Notice Range of Wild Bestia |
| --- | --------------------------- |
| 1   | -10%                        |
| 2   | -20%                        |
| 3   | -30%                        |

{{< /skill >}}

{{< skill name="Trailblazer" maxLevel="5"
    type="Passive"
    description="A Hunter's sure footing, at home where the road ends." >}}

The master walks faster on any ground that is not a made road or paving.

| Lv. | Walk Speed off Roads |
| --- | -------------------- |
| 1   | +3%                  |
| 2   | +6%                  |
| 3   | +9%                  |
| 4   | +12%                 |
| 5   | +15%                 |

{{< /skill >}}

{{< skill name="Hunter's Mark" maxLevel="5" requires="Camouflage Lv. 2"
    type="Active" manaCost="15" castTime="Instant" cooldown="10s" duration="30s" range="9" target="Enemy"
    description="Once the Hunter has picked their prey, it does not get away." >}}

Marks one target. While the mark lasts, the target shows on the master's map, and its [Hide](#skill-hide) and
[Cloak](#skill-cloak) do not work against the master. A new mark ends the old one.

| Lv. | Critical Rate against the Target |
| --- | -------------------------------- |
| 1   | +3%                              |
| 2   | +6%                              |
| 3   | +9%                              |
| 4   | +12%                             |
| 5   | +15%                             |

{{< /skill >}}

{{< skill name="Javelin" maxLevel="5" requires="Trailblazer Lv. 2"
    type="Active" manaCost="14" castTime="Instant" cooldown="3s" range="7" target="Enemy"
    description="Not every hunt is won with a bow." >}}

Needs a spear or a thrown weapon. Hurls it at a target up to `7` tiles away for `150% + 30%/Lv.` ATK. A spear comes back
to hand; a thrown weapon is used up like ammunition.

{{< /skill >}}

{{< skill name="Pack Hunt" maxLevel="3" requires="Hunter's Mark Lv. 3"
    type="Passive"
    description="The Hunter's Bestias learn whom to go for." >}}

The master's Bestias deal more damage to the target of Hunter's Mark.

| Lv. | Bestia Damage vs Marked Target |
| --- | ------------------------------ |
| 1   | +10%                           |
| 2   | +20%                           |
| 3   | +30%                           |

{{< /skill >}}

{{< skill name="Owl's Eye" maxLevel="5"
    type="Passive"
    description="Eyes trained on far and small things, until the aim follows them by itself." >}}

`+1 DEX` per level.

{{< /skill >}}

{{< skill name="Vulture's Eye" maxLevel="5" requires="Owl's Eye Lv. 3"
    type="Passive"
    description="Patience on the draw, until the shot lands where the eye already is." >}}

Works with every ranged weapon: bow, crossbow and thrown weapons, so [Javelin](#skill-javelin) gains from it too.

| Lv. | Range    | HIT |
| --- | -------- | --- |
| 1   | +1 tile  | +2  |
| 2   | +2 tiles | +4  |
| 3   | +3 tiles | +6  |
| 4   | +4 tiles | +8  |
| 5   | +5 tiles | +10 |

{{< /skill >}}

{{< skill name="Double Strafe" maxLevel="10" requires="Owl's Eye Lv. 3"
    type="Active" manaCost="12" castTime="Instant" cooldown="0s" range="Bow" target="Enemy"
    description="Two arrows off the string before the first one lands." >}}

Needs a bow. Shoots two arrows at the target for `100% + 10%/Lv.` ATK each, but takes only one arrow out of the
quiver.

{{< /skill >}}

{{< skill name="Arrow Shower" maxLevel="5" requires="Double Strafe Lv. 5"
    type="Active" manaCost="15" castTime="Instant" cooldown="1s" range="Bow" target="Ground"
    description="A volley loosed high, coming down on everyone below it." >}}

Needs a bow. Hits every enemy in a 3×3 area for `80% + 10%/Lv.` ATK and knocks them back `1m`. Takes one arrow out of
the quiver.

{{< /skill >}}

{{< skill name="Charge Arrow" maxLevel="1" requires="Vulture's Eye Lv. 3"
    type="Active" manaCost="15" castTime="1.5s" cooldown="10s" range="Bow" target="Enemy"
    description="A shot drawn so far back it lifts the target off its feet." >}}

Needs a bow. One shot for `150%` ATK that knocks the target back `6m`. Useful to keep a melee fighter at a distance.

{{< /skill >}}

{{< skill name="Improve Concentration" maxLevel="5" requires="Vulture's Eye Lv. 1"
    type="Active" manaCost="25" castTime="Instant" cooldown="0s" duration="60s" range="0" target="Self"
    description="The Hunter's senses, sharpened to a point." >}}

When cast, it reveals everything hidden within `3m` of the master.

| Lv. | AGI | DEX |
| --- | --- | --- |
| 1   | +2  | +2  |
| 2   | +4  | +4  |
| 3   | +6  | +6  |
| 4   | +8  | +8  |
| 5   | +10 | +10 |

{{< /skill >}}

{{< skill name="Arrow Crafting" maxLevel="1"
    type="Active" manaCost="0" castTime="Instant" cooldown="0s" range="2" target="Ground"
    description="A Hunter who runs out of arrows in the wild does not have to walk back to town." >}}

Opens the crafting window with the arrow recipes. It needs no station: two
Reed Stalks and a [Feather](/docs/mechanics/items-crafting/item-list/#feather) make 20
[regular arrows](/docs/mechanics/combat/ranged-combat/#novice-bow). Special arrows come later.

{{< /skill >}}

# Assassin

Masters of hidden infiltration. They can deal high amount of single target damage and know a lot about poisons to coat their weapons.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [warrior tree](/docs/mechanics/master/warrior-tree/)" />}}

The Assassin has two routes. The **Shadow** strikes from hiding with Hide, Cloak, Backstab and Shadow Step. The **Duelist** fights in the open with two blades and poison. Strip Equipment and Plagiarism serve both.

```mermaid
graph TD
    StripEquipment["Strip Equipment (1-5)"]
    DualWield["Dual Wield (1-5)"]
    EquipmentCoating["Equipment Coating (1-3)"]
    GutPunch["Gut Punch (1-3)"]
    SonicBlow["Sonic Blow (1-5)"]

    Hide["Hide (1-5)"]
    Cloak["Cloak (1-3)"]
    Backstab["Backstab (1-5)"]
    ShadowStep["Shadow Step (1-3)"]

    PoisonResearch["Poison Research (1-5)"]
    EnchantPoison["Enchant Poison (1-5)"]

    Plagiarism["Plagiarism (1-5)"]

    StripEquipment -->|Lv.2| DualWield
    StripEquipment -->|Lv.3| EquipmentCoating
    StripEquipment -->|Lv.2| GutPunch
    DualWield -->|Lv.3| SonicBlow
    Hide -->|Lv.3| Cloak
    Hide -->|Lv.2| Backstab
    Backstab -->|Lv.3| ShadowStep
    Cloak -->|Lv.1| ShadowStep
    PoisonResearch -->|Lv.3| EnchantPoison
```

<br>
{{< skill name="Strip Equipment" maxLevel="5"
    type="Active" manaCost="22" castTime="Instant" cooldown="12s" range="2" target="Enemy"
    description="A snap of the wrist at exactly the wrong moment for whoever is wearing it. Knocks a random piece of equipment off a target and leaves them unable to put it back on for a while." >}}

The slot is chosen at random. Accessories cannot be stripped. Stripping the weapon takes the weapon hand, not a shield.
Stripping the shield takes the shield hand. On a dual wielder both take the two weapons. Each slot stays empty while its
[stripped status effect](/docs/mechanics/combat/status-effects/#all-status-effects) lasts. Fails outright against a piece
protected by [Equipment Coating](#skill-equipment-coating).

| Lv. | Strip Chance | Slot Blocked |
| --- | ------------ | ------------ |
| 1   | 20%          | 5s           |
| 2   | 30%          | 10s          |
| 3   | 40%          | 15s          |
| 4   | 50%          | 20s          |
| 5   | 60%          | 25s          |

{{< /skill >}}

{{< skill name="Dual Wield" maxLevel="5" requires="Strip Equipment Lv. 2"
    type="Passive"
    description="Learning to disarm someone teaches you exactly how a weapon wants to be held - and that there is no good reason to stop at one. Lets the Assassin carry a one-handed weapon in each hand at a shrinking penalty." >}}

Without this skill no master can hold a weapon in the left hand, whatever their professions allow. The off-hand
weapon always swings for less than the main hand. Rank buys that gap back.

| Lv. | Off-Hand Damage | Attack Speed Penalty |
| --- | --------------- | -------------------- |
| 1   | 30%             | 25%                  |
| 2   | 40%             | 20%                  |
| 3   | 50%             | 15%                  |
| 4   | 60%             | 10%                  |
| 5   | 70%             | 5%                   |

{{< /skill >}}

{{< skill name="Equipment Coating" maxLevel="3" requires="Strip Equipment Lv. 3"
    type="Active" manaCost="26" castTime="2s" cooldown="None" duration="10 min" range="0" target="Self"
    description="A thin, oiled coating worked into weapons and armor that slows their wear and shrugs off attempts to strip them away." >}}

Coats every piece the Assassin wears. While it holds, [Strip Equipment](#skill-strip-equipment) cannot take any of them.

| Lv. | Durability Wear |
| --- | --------------- |
| 1   | -20%            |
| 2   | -60%            |
| 3   | -100%           |

{{< /skill >}}

{{< skill name="Gut Punch" maxLevel="3" requires="Strip Equipment Lv. 2"
    type="Active" manaCost="20" castTime="Instant" cooldown="30s" range="1" target="Enemy"
    description="A short, vicious blow below the ribs that leaves the target doubled over, stunned and gasping for air." >}}

Applies [Stun](/docs/mechanics/combat/status-effects/#all-status-effects). A boss recovers twice as fast.

| Lv. | Stun Duration |
| --- | ------------- |
| 1   | 4s            |
| 2   | 5s            |
| 3   | 6s            |

{{< /skill >}}

{{< skill name="Sonic Blow" maxLevel="5" requires="Dual Wield Lv. 3"
    type="Active" manaCost="20" castTime="Instant" cooldown="5s" range="1" target="Enemy"
    description="Eight strikes in a single heartbeat, split across both blades. Too fast to parry, too many to count." >}}

The damage is shared evenly between the eight hits.

| Lv. | ATK over All Hits |
| --- | ----------------- |
| 1   | 340%              |
| 2   | 380%              |
| 3   | 420%              |
| 4   | 460%              |
| 5   | 500%              |

{{< /skill >}}

{{< skill name="Hide" maxLevel="5"
    type="Active" manaCost="18" castTime="Instant" cooldown="5s" duration="Until cancelled" range="0" target="Self"
    description="Drops the Assassin flat against whatever cover is at hand. Nothing hostile can see them while they stay put - but standing still is the whole price of admission." >}}

Breaks the moment the Assassin moves or attacks. Detection resistance works against eyes, not against
[Ruwach](/docs/mechanics/master/scholar-tree/#skill-ruwach), which always reveals.

| Lv. | Mana Drain per Second | Detection Resistance |
| --- | --------------------- | -------------------- |
| 1   | 3                     | 10%                  |
| 2   | 2.5                   | 20%                  |
| 3   | 2                     | 30%                  |
| 4   | 1.5                   | 40%                  |
| 5   | 1                     | 50%                  |

{{< /skill >}}

{{< skill name="Cloak" maxLevel="3" requires="Hide Lv. 3"
    type="Active" manaCost="30" castTime="Instant" cooldown="8s" duration="Until cancelled" range="0" target="Self"
    description="What Hide is for standing still, Cloak is for walking. The Assassin stays unseen while moving, at the cost of speed and a steady bleed of mana." >}}

Still breaks on attacking. [Ruwach](/docs/mechanics/master/scholar-tree/#skill-ruwach) strips it outright.

| Lv. | Movement Speed | Mana Drain per Second |
| --- | -------------- | --------------------- |
| 1   | 50%            | 6                     |
| 2   | 70%            | 5                     |
| 3   | 90%            | 4                     |

{{< /skill >}}

{{< skill name="Backstab" maxLevel="5" requires="Hide Lv. 2"
    type="Active" manaCost="16" castTime="Instant" cooldown="8s" range="1" target="Enemy"
    description="A blade driven in from behind, by someone the target never saw coming." >}}

Only works from [Hide](#skill-hide) or [Cloak](#skill-cloak), and only from behind the target. The strike ends the hiding.

| Lv. | ATK  |
| --- | ---- |
| 1   | 200% |
| 2   | 250% |
| 3   | 300% |
| 4   | 350% |
| 5   | 400% |

{{< /skill >}}

{{< skill name="Shadow Step" maxLevel="3" requires="Backstab Lv. 3 and Cloak Lv. 1"
    type="Active" manaCost="15" castTime="Instant" cooldown="20s" range="per Lv." target="Enemy"
    description="Slips through the shadows to stand right behind a target, still hidden, so that a Backstab can follow." >}}

| Lv. | Range |
| --- | ----- |
| 1   | 4m    |
| 2   | 6m    |
| 3   | 8m    |

{{< /skill >}}

{{< skill name="Poison Research" maxLevel="5"
    type="Passive"
    description="A long, unhealthy familiarity with everything that should not be swallowed. Raises how hard the Assassin's own poisons bite and how well they shrug off somebody else's." >}}

The poisons themselves are not made here - they are ordinary Alchemist goods, brewed with
[Alchemy](/docs/mechanics/master/craftsman-tree/#skill-alchemy) and bought like any other reagent. This skill only governs what an Assassin gets out of them.

| Lv. | Poison Damage | Poison Resistance |
| --- | ------------- | ----------------- |
| 1   | +20%          | +10%              |
| 2   | +40%          | +20%              |
| 3   | +60%          | +30%              |
| 4   | +80%          | +40%              |
| 5   | +100%         | +50%              |

{{< /skill >}}

{{< skill name="Enchant Poison" maxLevel="5" requires="Poison Research Lv. 3"
    type="Active" manaCost="24" castTime="2s" cooldown="None" duration="5 min" range="2" target="Ally"
    description="Works a brewed poison into the edge of a weapon so every strike carries a chance to leave it behind. Consumes one Alchemist-brewed poison, such as [Basic Poison](/docs/mechanics/items-crafting/item-list/#basic-poison), per cast." >}}

Applies the [Poison](/docs/mechanics/combat/statusvalues/#status-effects) status effect on hit. The poison item decides how hard it
bites; this skill decides how often it lands.

| Lv. | Poison Chance per Hit |
| --- | --------------------- |
| 1   | 5%                    |
| 2   | 10%                   |
| 3   | 15%                   |
| 4   | 20%                   |
| 5   | 25%                   |

{{< /skill >}}

{{< skill name="Plagiarism" maxLevel="5"
    type="Passive"
    description="A passive knack for stealing more than just gold - whenever the Assassin is struck by an enemy spell, there's a chance they memorize it well enough to cast it back once. Casting the copied spell consumes it, and getting hit by a new spell overwrites whatever was memorized before." >}}

Bestia attacks can be copied too. The cap is the attack level, as for [Spell Inscription](/docs/mechanics/master/scholar-tree/#skill-spell-inscription). A
master's spell counts 10 attack levels per skill level, so Plagiarism Lv. 2 copies a Fire Bolt up to Lv. 4.

At Lv. 5 the Assassin keeps what they stole: a new spell no longer overwrites the copy, which is only lost when it is
cast.

| Lv. | Copy Chance | Max Attack Level Copied |
| --- | ----------- | ----------------------- |
| 1   | 10%         | 20                      |
| 2   | 20%         | 40                      |
| 3   | 30%         | 60                      |
| 4   | 40%         | 80                      |
| 5   | 50%         | 100+                    |

{{< /skill >}}

# Knight

Where a Brawler trusts bare knuckles and a Wizard trusts raw mana, a Knight trusts steel - a lot of it, worn on the body and swung in the hand. This is the tree for masters who would rather stand at the front of a fight than avoid it.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [warrior tree](/docs/mechanics/master/warrior-tree/)" />}}

The Knight has two routes. The **Vanguard** hits hard with heavy weapons and charges in. The **Guardian** holds the line with plate and shield and takes the blows meant for others.

```mermaid
graph TD
    HeavyWeaponMastery["Heavy Weapon Mastery (1-10)"]
    HeavyArmorMastery["Heavy Armor Mastery (1-10)"]
    Provoke["Provoke (1-5)"]
    Bash["Bash (1-5)"]
    Charge["Charge (1-5)"]
    ShieldWall["Shield Wall (1-5)"]
    AutoGuard["Auto Guard (1-5)"]
    Juggernaut["Juggernaut (1-3)"]
    Devotion["Devotion (1-3)"]
    BrandishSpear["Brandish Spear (1-5)"]

    HeavyWeaponMastery -->|Lv.3| Bash
    Bash -->|Lv.3| Charge
    HeavyWeaponMastery -->|Lv.3| BrandishSpear

    HeavyArmorMastery -->|Lv.2| ShieldWall
    ShieldWall -->|Lv.2| AutoGuard
    ShieldWall -->|Lv.2| Devotion

    HeavyArmorMastery -->|Lv.5| Juggernaut
    Charge -->|Lv.3| Juggernaut
    AutoGuard -->|Lv.3| Juggernaut
```

<br>
{{< skill name="Heavy Weapon Mastery" maxLevel="10"
    type="Passive"
    description="Years spent drilling with sword, axe, mace and spear until the weight stops mattering. Increases damage dealt with the Knight's melee weapons." >}}

Counts for every weapon type the Knight may use: Sword, Greatsword, Axe, Greataxe, Mace, Hammer, Spear and Polearm.

| Lv. | ATK |
| --- | --- |
| 1   | +3  |
| 2   | +6  |
| 3   | +9  |
| 4   | +12 |
| 5   | +15 |
| 6   | +18 |
| 7   | +21 |
| 8   | +24 |
| 9   | +27 |
| 10  | +30 |

{{< /skill >}}

{{< skill name="Heavy Armor Mastery" maxLevel="10"
    type="Passive"
    description="Plate and mail punish anyone who hasn't trained to wear them. This skill teaches the body to carry the weight, complementing the protection of Iron Skin." >}}

| Lv. | Hard DEF (heavy armor) |
| --- | ---------------------- |
| 1   | +2                     |
| 2   | +4                     |
| 3   | +6                     |
| 4   | +8                     |
| 5   | +10                    |
| 6   | +12                    |
| 7   | +14                    |
| 8   | +16                    |
| 9   | +18                    |
| 10  | +20                    |

{{< /skill >}}

{{< skill name="Provoke" maxLevel="5"
    type="Active" manaCost="14" castTime="Instant" cooldown="10s" duration="per Lv." range="6" target="Enemy"
    description="A shout, a slammed shield, whatever gets the job done - forces a monster to attack the Knight instead of their allies for a short duration." >}}

Works on monsters and wild Bestias only. A master cannot be forced to fight.

| Lv. | Duration |
| --- | -------- |
| 1   | 4s       |
| 2   | 5s       |
| 3   | 6s       |
| 4   | 7s       |
| 5   | 8s       |

{{< /skill >}}

{{< skill name="Shield Wall" maxLevel="5" requires="Heavy Armor Mastery Lv. 2"
    type="Active" manaCost="25" castTime="Instant" cooldown="15s" duration="Until cancelled" range="0" target="Self"
    description="Plants the Knight's feet and raises their shield into a proper wall. While active, incoming physical damage is reduced but movement speed drops sharply." >}}

Needs a shield. At Lv. 5 it also returns `10%` of the blocked damage to the attacker.

| Lv. | Physical Damage Taken | Movement Speed |
| --- | --------------------- | -------------- |
| 1   | -15%                  | -50%           |
| 2   | -20%                  | -40%           |
| 3   | -25%                  | -30%           |
| 4   | -30%                  | -30%           |
| 5   | -35%                  | -30%           |

{{< /skill >}}

{{< skill name="Bash" maxLevel="5" requires="Heavy Weapon Mastery Lv. 3"
    type="Active" manaCost="18" castTime="Instant" cooldown="6s" range="2" target="Enemy"
    description="A single committed swing that trades finesse for raw impact, with a chance to [Stun](/docs/mechanics/combat/status-effects/#all-status-effects) whatever it lands on for `1s`." >}}

| Lv. | Bonus Damage | Stun Chance |
| --- | ------------ | ----------- |
| 1   | +20%         | +5%         |
| 2   | +40%         | +10%        |
| 3   | +60%         | +15%        |
| 4   | +80%         | +20%        |
| 5   | +100%        | +25%        |

{{< /skill >}}

{{< skill name="Brandish Spear" maxLevel="5" requires="Heavy Weapon Mastery Lv. 3"
    type="Active" manaCost="12" castTime="Instant" cooldown="4s" range="1" target="Area"
    description="A long weapon swung wide, clearing the ground in front of the Knight." >}}

Needs a spear or a polearm. Hits every enemy in a 3×3 area in front of the Knight for `120% + 40%/Lv.` ATK.

{{< /skill >}}

{{< skill name="Auto Guard" maxLevel="5" requires="Shield Wall Lv. 2"
    type="Passive"
    description="A trained reflex that raises the shield on its own the instant a blow lands, sometimes fast enough to stop it cold." >}}

Needs a shield.

| Lv. | Full Block Chance |
| --- | ----------------- |
| 1   | +4%               |
| 2   | +8%               |
| 3   | +12%              |
| 4   | +16%              |
| 5   | +20%              |

{{< /skill >}}

{{< skill name="Devotion" maxLevel="3" requires="Shield Wall Lv. 2"
    type="Active" manaCost="25" castTime="Instant" cooldown="30s" duration="per Lv." range="7" target="Ally"
    description="The Knight steps between an ally and harm, and the harm goes to the Knight." >}}

While it lasts, all damage the ally takes goes to the Knight instead. It ends early when the ally moves more than `7m`
away.

| Lv. | Duration |
| --- | -------- |
| 1   | 15s      |
| 2   | 30s      |
| 3   | 45s      |

{{< /skill >}}

{{< skill name="Charge" maxLevel="5" requires="Bash Lv. 3"
    type="Active" manaCost="22" castTime="Instant" cooldown="per Lv." range="12" target="Enemy"
    description="Closes the distance to a target in an instant, weapon first. The impact deals damage and briefly forces the target to focus the Knight, folding a gap closer and a taunt into a single swing." >}}

Deals `150%` ATK and applies a `3s` [Provoke](#skill-provoke) effect on impact.

| Lv. | Cooldown |
| --- | -------- |
| 1   | 14.5s    |
| 2   | 14s      |
| 3   | 13.5s    |
| 4   | 13s      |
| 5   | 12.5s    |

{{< /skill >}}

{{< skill name="Juggernaut" maxLevel="3" requires="Heavy Armor Mastery Lv. 5 and Charge Lv. 3 and Auto Guard Lv. 3"
    type="Active" manaCost="60" castTime="Instant" cooldown="per Lv." duration="per Lv." range="0" target="Self"
    description="The Knight's capstone. For a short time the line between wall and weapon stops meaning anything." >}}

Gains `+20%` DEF and `+20%` ATK while active.

| Lv. | Duration | Cooldown | Extra                                                                         |
| --- | -------- | -------- | ----------------------------------------------------------------------------- |
| 1   | 10s      | 120s     |                                                                               |
| 2   | 15s      | 120s     | Immune to Stun and knockback                                                  |
| 3   | 15s      | 90s      | A hit fully blocked by [Auto Guard](#skill-auto-guard) refreshes the duration |

{{< /skill >}}

# Bard

Bards fight and perform with the same hands. Some lash out with whip and lute and leave their enemies stumbling; others
stay at the back and play until everyone around them, Bestia included, hits harder, moves faster and walks further.
Most do a bit of both.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [warrior tree](/docs/mechanics/master/warrior-tree/)" />}}

The Bard has two routes. The **fighter** route fights with whip and instrument and weakens enemies. The **support**
route plays songs.

A **song** needs an instrument in hand. It buffs every party member and their Bestias within `3` tiles for `60s`.
Different songs stack, and playing the same song again refreshes it.

```mermaid
graph TD
    InstrumentMastery["Instrument Mastery (1-10)"]
    NimbleSteps["Nimble Steps (1-5)"]
    HobblingLash["Hobbling Lash (1-5)"]
    DiscordStrike["Discord Strike (1-5)"]
    DissonantChord["Dissonant Chord (1-5)"]
    VoiceTraining["Voice Training (1-5)"]
    BattleHymn["Battle Hymn (1-5)"]
    WarMarch["War March (1-5)"]
    MirageDance["Mirage Dance (1-5)"]
    WanderersTune["Wanderer's Tune (1-5)"]
    GrandPerformance["Grand Performance (1-3)"]

    InstrumentMastery -->|Lv.3| HobblingLash
    InstrumentMastery -->|Lv.3| DiscordStrike
    DiscordStrike -->|Lv.3| DissonantChord

    BattleHymn -->|Lv.2| WarMarch
    VoiceTraining -->|Lv.3| MirageDance
    BattleHymn -->|Lv.5| GrandPerformance
    WarMarch -->|Lv.5| GrandPerformance
```

<br>
{{< skill name="Instrument Mastery" maxLevel="10"
    type="Passive"
    description="Training with lute, flute and whip until each one is as much a weapon as an instrument." >}}

`+2 ATK` per level with an instrument or a whip.

{{< /skill >}}

{{< skill name="Nimble Steps" maxLevel="5"
    type="Passive"
    description="A Bard trusts footwork over plate and simply is not where the hit lands." >}}

`+2 FLEE` per level in light armor, cloth or no armor.

{{< /skill >}}

{{< skill name="Hobbling Lash" maxLevel="5" requires="Instrument Mastery Lv. 3"
    type="Active" manaCost="15" castTime="Instant" cooldown="6s" range="4" target="Enemy"
    description="A whip strike aimed less at the flesh than at the footing." >}}

Needs a whip. Hits for `120% + 20%/Lv.` ATK and leaves the target
[Slowed](/docs/mechanics/combat/status-effects/#all-status-effects) (`-20%` move speed).

| Lv. | Slowed |
| --- | ------ |
| 1   | 4s     |
| 2   | 5s     |
| 3   | 6s     |
| 4   | 7s     |
| 5   | 8s     |

{{< /skill >}}

{{< skill name="Discord Strike" maxLevel="5" requires="Instrument Mastery Lv. 3"
    type="Active" manaCost="18" castTime="1s" cooldown="2s" range="9" target="Enemy"
    description="One sharp, ugly note, played loud enough to hurt." >}}

Needs an instrument. A sound wave that hits the target for `150% + 30%/Lv.` ATK.

{{< /skill >}}

{{< skill name="Dissonant Chord" maxLevel="5" requires="Discord Strike Lv. 3"
    type="Active" manaCost="30" castTime="2s" cooldown="20s" duration="20s" range="0" target="Area"
    description="Off-key on purpose. Rattles nearby enemies badly enough to throw off their aim and their swing." >}}

Needs an instrument. Every enemy within `3` tiles gets [ASPD Down](/docs/mechanics/combat/status-effects/#all-status-effects)
and loses HIT.

| Lv. | HIT  |
| --- | ---- |
| 1   | -3%  |
| 2   | -6%  |
| 3   | -9%  |
| 4   | -12% |
| 5   | -15% |

{{< /skill >}}

{{< skill name="Voice Training" maxLevel="5"
    type="Passive"
    description="A trained voice reaches further and holds a note longer than an untrained one ever could." >}}

| Lv. | Song Radius | Song Duration |
| --- | ----------- | ------------- |
| 1   | +1 tile     | +10%          |
| 2   | +2 tiles    | +20%          |
| 3   | +3 tiles    | +30%          |
| 4   | +4 tiles    | +40%          |
| 5   | +5 tiles    | +50%          |

{{< /skill >}}

{{< skill name="Battle Hymn" maxLevel="5"
    type="Active" manaCost="30" castTime="2s" cooldown="5s" duration="60s" range="0" target="Party"
    description="A driving hymn that steels the arm of everyone in earshot." >}}

A song. `+3% ATK and MATK` per level.

{{< /skill >}}

{{< skill name="War March" maxLevel="5" requires="Battle Hymn Lv. 2"
    type="Active" manaCost="30" castTime="2s" cooldown="5s" duration="60s" range="0" target="Party"
    description="A quickstep tune that puts a spring in the step and a snap in the swing." >}}

A song. `+2% movement and attack speed` per level.

{{< /skill >}}

{{< skill name="Mirage Dance" maxLevel="5" requires="Voice Training Lv. 3"
    type="Active" manaCost="30" castTime="2s" cooldown="5s" duration="60s" range="0" target="Party"
    description="A dance that shares the Bard's knack for not being where the hit lands." >}}

A song. `+3 FLEE` per level.

{{< /skill >}}

{{< skill name="Wanderer's Tune" maxLevel="5"
    type="Active" manaCost="20" castTime="2s" cooldown="5s" duration="10 min" range="0" target="Party"
    description="A steady, ground-eating rhythm that keeps a travelling party's legs fresh long after they should have given out." >}}

A song that lasts `10 min` instead of `60s`. `-10%` stamina drain per level. Made for long journeys with a Bestia team.

{{< /skill >}}

{{< skill name="Grand Performance" maxLevel="3" requires="Battle Hymn Lv. 5 and War March Lv. 5"
    type="Passive"
    description="The Bard's capstone. Every song lands a little harder once the crowd knows who is playing." >}}

`+10%` per level to the effect of every song the master plays.

{{< /skill >}}
