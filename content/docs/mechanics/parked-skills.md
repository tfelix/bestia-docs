---
title: Parked Skill Trees
description: Master skill trees cut from the initial release. Kept here verbatim so they can be copied back into the Bestia Master page.
build:
  render: never
  list: never
  publishResources: false
---

These sub-trees were cut from the [Bestia Master](/docs/mechanics/master/) page to reduce the scope of the initial
release. This page is never rendered. Each section below is the original text, unchanged, so it can be pasted back as is.

To unpark a sub-tree:

1. Paste its section back into `master.md` at the place given in the table.
2. Un-comment its node and its `Gate -.->|unlocks|` arrow in the parent tree diagram (marked `%% parked`).
3. Restore its mention in the parent tree's intro text.

| Sub-tree  | Parent tree    | Paste after   |
| --------- | -------------- | ------------- |
| Priest    | Scholar Tree   | the Scholar base skills, before `### Trader` |

Anchors inside these sections (`#skill-...`, `#craftsman-tree`, ...) point into `master.md` and only resolve once the
section is back there.

### Priest

Priests channel mana into blessings that keep a party alive - restoring health, lifting curses, and bolstering the vitality of Bestia out in the field.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [scholar tree](#scholar-tree)" />}}

```mermaid
graph TD
    MagicSense[/"Magic Sense (Scholar Tree)"/]

    Heal["Heal (1-10)"]

    Suffragium["Suffragium (1-3)"]
    Gloria["Gloria (1-3)"]

    Cure["Cure (1)"]
    AquaBenedicta["Aqua Benedicta (1)"]
    StatusRecovery["Status Recovery (1)"]
    Aspersio["Aspersio (1-3)"]

    Blessing["Blessing (1-10)"]
    IncreaseAGI["Increase AGI (1-5)"]
    DecreaseAGI["Decrease AGI (1-3)"]
    KyrieEleison["Kyrie Eleison (1-3)"]
    ImpositioManus["Impositio Manus (1-3)"]
    Pneuma["Pneuma (1-3)"]
    Magnificat["Magnificat (1-3)"]


    SignumCrucis["Signum Crucis (1-3)"]
    HolyLight["Holy Light (1-5)"]
    DemonBane["Demon Bane (1-3)"]
    DivineProtection["Divine Protection (1-3)"]
    TurnUndead["Turn Undead (1-5)"]
    LexAeterna["Lex Aeterna (1)"]
    MagnusExorcismus["Magnus Exorcismus (1-3)"]

    Sanctuary["Sanctuary (1-3)"]
    Resurrection["Resurrection (1)"]

    MagicSense -->|Lv.2| Gloria
    MagicSense -->|Lv.2| Suffragium

    Heal -->|Lv.2| Cure
    Heal -->|Lv.3| Blessing

    Cure -->|Lv.1| AquaBenedicta
    Cure -->|Lv.1| StatusRecovery
    Heal -->|Lv.8| Resurrection
    StatusRecovery -->|Lv.1| Resurrection
    AquaBenedicta -->|Lv.1| Aspersio

    IncreaseAGI -->|Lv.2| DecreaseAGI

    Blessing -->|Lv.3| ImpositioManus
    Blessing -->|Lv.3| Magnificat
    KyrieEleison -->|Lv.3| Magnificat
    KyrieEleison -->|Lv.2| Pneuma

    SignumCrucis -->|Lv.2| HolyLight
    SignumCrucis -->|Lv.2| DemonBane
    SignumCrucis -->|Lv.2| DivineProtection
    HolyLight -->|Lv.3| LexAeterna
    HolyLight -->|Lv.3| TurnUndead
    HolyLight -->|Lv.5| MagnusExorcismus
    DemonBane -->|Lv.3| TurnUndead
    TurnUndead -->|Lv.3| MagnusExorcismus

    Magnificat -->|Lv.3| Sanctuary
    Pneuma -->|Lv.2| Sanctuary
```

<br>
{{< skill name="Heal" maxLevel="10"
    type="Active" manaCost="per Lv." castTime="1.5s" cooldown="None" range="9" target="Ally"
    description="Channels mana directly into a target's wounds, restoring HP in an instant. The Priest's bread and butter - simple, reliable, and the first rite every Priest learns." >}}

Heals a target's HP for `[(BaseLV+INT)/8]*(4+8*SkillLV)`. When used against Undead property monsters, it is a holy attack that ignores SMDEF and INT, but deals only half damage - that is,
`HealValue * ElementModifier / 2`. Targeting a monster with a healing spell has to be deliberate, so the client asks
for a modifier key rather than a plain click.

| Lv. | Mana Cost |
| --- | --------- |
| 1   | 13        |
| 2   | 16        |
| 3   | 19        |
| 4   | 22        |
| 5   | 25        |
| 6   | 28        |
| 7   | 31        |
| 8   | 34        |
| 9   | 37        |
| 10  | 40        |

{{< /skill >}}

{{< skill name="Suffragium" maxLevel="3" requires="Magic Sense Lv. 2"
    type="Active" manaCost="18" castTime="Instant" cooldown="20s" duration="30s" range="9" target="Ally"
    description="A murmured rite that lightens the burden of spellcasting for a short while - a Sage burning through scrolls, a Priest chaining blessings and a Trader rushing a linking ritual all feel the difference equally." >}}
Applies to the next spell cast by the target ally within `30s`.

| Lv. | Cast Time Reduction |
| --- | ------------------- |
| 1   | 10%                 |
| 2   | 20%                 |
| 3   | 30%                 |

{{< /skill >}}

{{< skill name="Gloria" maxLevel="3" requires="Magic Sense Lv. 2"
    type="Active" manaCost="22" castTime="2s" cooldown="30s" duration="per Lv." range="9" target="Party"
    description="A quiet benediction that nudges fortune to smile a little wider on the caster and their party for a short while - stalls turn up better goods, dice favor the bold, and the elusive becomes that much easier to spot." >}}

| Lv. | WIL Bonus | Duration |
| --- | --------- | -------- |
| 1   | +5        | 30s      |
| 2   | +10       | 60s      |
| 3   | +15       | 90s      |

{{< /skill >}}

{{< skill name="Cure" maxLevel="1" requires="Heal Lv. 2"
    type="Active" manaCost="15" castTime="Instant" cooldown="5s" range="9" target="Ally"
    description="Lifts the fog of [Silence, Blindness and Confusion](/docs/mechanics/statusvalues/#status-effects) from a target's mind with a touch." >}}
{{< /skill >}}

{{< skill name="Aqua Benedicta" maxLevel="1" requires="Cure Lv. 1"
    type="Active" manaCost="12" castTime="3s" cooldown="5s" range="0" target="Self"
    description="The rite of blessing plain water into [Holy Water](/docs/mechanics/item-list/#holy-water). User must be standing in water, consuming an [Empty Bottle](/docs/mechanics/item-list/#empty-bottle) in the process. Holy Water is the reagent behind Aspersio and several higher rites." >}}
{{< /skill >}}

{{< skill name="Blessing" maxLevel="10" requires="Heal Lv. 3"
    type="Active" manaCost="28" castTime="2s" cooldown="None" duration="per Lv." range="9" target="Party"
    description="A benediction that steadies body and mind, raising a party's core stats for a short while." >}}

| Lv. | STR/INT/DEX | Duration |
| --- | ----------- | -------- |
| 1   | +1          | 80s      |
| 2   | +2          | 100s     |
| 3   | +3          | 120s     |
| 4   | +4          | 140s     |
| 5   | +5          | 160s     |
| 6   | +6          | 180s     |
| 7   | +7          | 200s     |
| 8   | +8          | 220s     |
| 9   | +9          | 240s     |
| 10  | +10         | 260s     |

{{< /skill >}}

{{< skill name="Increase AGI" maxLevel="5"
    type="Active" manaCost="20" castTime="Instant" cooldown="None" duration="per Lv." range="9" target="Ally"
    description="Lightens a target's limbs with borrowed haste, quickening step and swing alike." >}}
Grants a flat `+15%` Movement Speed at any level, plus the table below. The movement bonus **stacks** with a
Prospector's [Quick Travel](#skill-quick-travel), so a well-buffed traveller adds both.

| Lv. | AGI | ASPD | Duration |
| --- | --- | ---- | -------- |
| 1   | +4  | +1%  | 80s      |
| 2   | +5  | +2%  | 100s     |
| 3   | +6  | +3%  | 120s     |
| 4   | +7  | +4%  | 140s     |
| 5   | +8  | +5%  | 160s     |

{{< /skill >}}

{{< skill name="Decrease AGI" maxLevel="3" requires="Increase AGI Lv. 2"
    type="Active" manaCost="20" castTime="Instant" cooldown="5s" duration="30s" range="9" target="Enemy"
    description="The same rite turned inside out - a mote of leaden mana that slows an enemy's step and swing instead of quickening it." >}}

| Lv. | Movement/Attack Speed Reduction |
| --- | ------------------------------- |
| 1   | 4%                              |
| 2   | 8%                              |
| 3   | 12%                             |

{{< /skill >}}

{{< skill name="Kyrie Eleison" maxLevel="3"
    type="Active" manaCost="30" castTime="1s" cooldown="15s" duration="60s" range="9" target="Ally"
    description="A shimmering ward of mana that stands between a target and harm, soaking up a number of hits before it gives out." >}}

| Lv. | Hits Absorbed | Damage Absorbed per Hit |
| --- | ------------- | ----------------------- |
| 1   | 1             | +10% of HP              |
| 2   | 2             | +20% of HP              |
| 3   | 3             | +30% of HP              |

{{< /skill >}}

{{< skill name="Pneuma" maxLevel="3" requires="Kyrie Eleison Lv. 2"
    type="Active" manaCost="25" castTime="1s" cooldown="10s" duration="per Lv." range="6" target="Ground"
    description="Lays a veil of still air over a patch of ground; anything standing in it becomes untouchable by arrows, bolts and thrown weapons, though a blade still finds its mark." >}}
Higher levels extend how long the veil holds.

| Lv. | Radius |
| --- | ------ |
| 1   | +1m    |
| 2   | +2m    |
| 3   | +3m    |

{{< /skill >}}

{{< skill name="Signum Crucis" maxLevel="3"
    type="Active" manaCost="16" castTime="1s" cooldown="8s" duration="per Lv." range="9" target="Enemy"
    description="The sign traced in the air before every holy rite. It burns a sigil onto a target that pries their guard open, and bites hardest into things that should not be walking around in the first place. Every other holy skill a Priest learns starts here." >}}

| Lv. | DEF Reduction | Extra vs Demon/Undead | Duration |
| --- | ------------- | --------------------- | -------- |
| 1   | 10%           | 10%                   | 30s      |
| 2   | 20%           | 20%                   | 45s      |
| 3   | 30%           | 30%                   | 60s      |

{{< /skill >}}

{{< skill name="Holy Light" maxLevel="5" requires="Signum Crucis Lv. 2"
    type="Active" manaCost="24" castTime="1.5s" cooldown="None" range="9" target="Enemy"
    description="Condenses raw holy mana into a single searing beam - the Priest's answer to needing to deal damage rather than mend it." >}}

| Lv. | MATK |
| --- | ---- |
| 1   | +10% |
| 2   | +20% |
| 3   | +30% |
| 4   | +40% |
| 5   | +50% |

{{< /skill >}}

{{< skill name="Demon Bane" maxLevel="3" requires="Signum Crucis Lv. 2"
    type="Passive"
    description="Years spent studying the weak points of the unholy pay off passively - every strike against a demon or undead lands that much harder." >}}

| Lv. | Damage vs Demon/Undead |
| --- | ---------------------- |
| 1   | +8%                    |
| 2   | +16%                   |
| 3   | +24%                   |

{{< /skill >}}

{{< skill name="Divine Protection" maxLevel="3" requires="Signum Crucis Lv. 2"
    type="Passive"
    description="The defensive twin of Demon Bane - a standing ward that dulls what comes back the other way from anything unholy." >}}

| Lv. | Damage Taken Reduction from Demon/Undead |
| --- | ---------------------------------------- |
| 1   | 10%                                      |
| 2   | 20%                                      |
| 3   | 30%                                      |

{{< /skill >}}

{{< skill name="Impositio Manus" maxLevel="3" requires="Blessing Lv. 3"
    type="Active" manaCost="26" castTime="1s" cooldown="20s" duration="60s" range="2" target="Ally"
    description="The laying on of hands, channeling raw striking power into a single ally rather than the whole party." >}}

| Lv. | ATK and MATK |
| --- | ------------ |
| 1   | +5           |
| 2   | +10          |
| 3   | +15          |

{{< /skill >}}

{{< skill name="Status Recovery" maxLevel="1" requires="Cure Lv. 1"
    type="Active" manaCost="20" castTime="Instant" cooldown="10s" range="9" target="Ally"
    description="Where Cure lifts the fog from a mind, Status Recovery breaks the ice, stone and cramp from a body - lifting [Stun, Freeze and Petrify](/docs/mechanics/statusvalues/#status-effects) in a single rite." >}}
{{< /skill >}}

{{< skill name="Aspersio" maxLevel="3" requires="Aqua Benedicta Lv. 1"
    type="Active" manaCost="22" castTime="2s" cooldown="10s" duration="per Lv." range="2" target="Ally"
    description="Anoints a weapon with Holy Water, temporarily imbuing its strikes with the holy element. Consumes a unit of [Holy Water](/docs/mechanics/item-list/#holy-water) per cast." >}}
Higher levels extend the duration and allow higher-grade Holy Water to be used for a stronger imbue.
{{< /skill >}}

{{< skill name="Turn Undead" maxLevel="5" requires="Demon Bane Lv. 3 and Holy Light Lv. 3"
    type="Active" manaCost="30" castTime="2s" cooldown="5s" range="9" target="Enemy"
    description="A judgment of pure holy mana that punches through armor and unravels the unnatural knot holding an undead together." >}}
Higher levels raise the chance of an instant kill against sufficiently weak undead.

Inflicts single target Holy, armor piercing damage. If the target is an Undead property monster, this spell has a chance of immediately ending its existence.

| Lv. | Base Chance of Effect |
| --- | --------------------- |
| 1   | 8%                    |
| 2   | 16%                   |
| 3   | 24%                   |
| 4   | 32%                   |
| 5   | 40%                   |

```text
Chance of Effect = [Base_Chance_of_Effect + (Lv ÷ 10) + (INT ÷ 10) + (WIL ÷ 10) + {1 − (Target_HP ÷ Target_MaxHP)} × 20]%
Damage = Base_Damage + Base_Lv + INT
```

{{< /skill >}}

{{< skill name="Lex Aeterna" maxLevel="1" requires="Holy Light Lv. 3"
    type="Active" manaCost="18" castTime="Instant" cooldown="15s" duration="20s" range="9" target="Any"
    description="Marks a single target so that the very next hit it takes lands twice as hard. The mark breaks the instant it's used, on friend or foe alike." >}}
{{< /skill >}}

{{< skill name="Magnificat" maxLevel="3" requires="Kyrie Eleison Lv. 3 and Blessing Lv. 3"
    type="Active" manaCost="35" castTime="3s" cooldown="60s" duration="90s" range="9" target="Party"
    description="A hymn of thanksgiving that quickens the natural recovery of everyone within earshot." >}}

| Lv. | HP/Mana Regeneration |
| --- | -------------------- |
| 1   | +10%                 |
| 2   | +20%                 |
| 3   | +30%                 |

{{< /skill >}}

{{< skill name="Magnus Exorcismus" maxLevel="3" requires="Turn Undead Lv. 3 and Holy Light Lv. 5"
    type="Active" manaCost="60" castTime="5s" cooldown="30s" duration="15s" range="12" target="Ground"
    description="The Priest's offensive capstone: a pillar of holy mana erupts around the caster, searing everything caught in it and the undead and demonic worst of all." >}}

| Lv. | MATK | Bonus Damage vs Demon/Undead |
| --- | ---- | ---------------------------- |
| 1   | +15% | +10%                         |
| 2   | +30% | +20%                         |
| 3   | +45% | +30%                         |

{{< /skill >}}

{{< skill name="Sanctuary" maxLevel="3" requires="Magnificat Lv. 3 and Pneuma Lv. 2"
    type="Active" manaCost="50" castTime="3s" cooldown="30s" duration="30s" range="6" target="Ground"
    description="Consecrates a patch of ground into holy ground: allies standing in it are steadily mended, while any undead or demon caught inside burns instead." >}}
Deals equivalent holy damage per tick to undead and demon-type enemies standing within.

| Lv. | Max HP Healed per Tick |
| --- | ---------------------- |
| 1   | +5%                    |
| 2   | +10%                   |
| 3   | +15%                   |

{{< /skill >}}

{{< skill name="Resurrection" maxLevel="1" requires="Heal Lv. 8 and Status Recovery Lv. 1"
    type="Active" manaCost="120" castTime="10s" cooldown="10 min" range="5" target="Ally"
    description="The rite few Priests ever get to cast and fewer still get to cast twice in a row on the same ally - channels enough mana to call a fallen Bestia or Master back over the threshold, returning them to the world with a portion of their HP restored. Long cooldown; can not be used on the caster." >}}
{{< /skill >}}
