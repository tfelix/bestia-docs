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
| Artificer | Craftsman Tree | `### Blacksmith` |
| Priest    | Scholar Tree   | the Scholar base skills, before `### Trader` |
| Assassin  | Warrior Tree   | `### Wizard` and the parked Brawler/Hunter comment |
| Knight    | Warrior Tree   | `### Assassin` |

Anchors inside these sections (`#skill-...`, `#craftsman-tree`, ...) point into `master.md` and only resolve once the
section is back there.

### Artificer

Where Blacksmiths hammer steel, Artificers coax it into remembering spells. This path inscribes magic onto items, binds it to triggers, and crystalizes raw mana into shards other professions can build on.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [craftsman tree](#craftsman-tree)" />}}

```mermaid
graph TD
    ItemCustomization[/"Item Customization (Craftsman Tree)"/]
    ManaHarvester["Mana Harvester (1-10)"]
    ManaflowExpert["Manaflow Expert (1-5)"]
    RunicEtching["Runic Etching (1-10)"]
    MagicArtisan["Magic Artisan (1-10)"]

    ManaHarvester -->|Lv.3| ManaflowExpert
    ItemCustomization -->|Lv.3| RunicEtching
    RunicEtching -->|Lv.5| MagicArtisan
```

<br>
{{< skill name="Mana Harvester" maxLevel="10"
    type="Active" manaCost="19" castTime="10s" cooldown="30s"
    description="Build and operate Mana Harvesters which channel mana from the environment into raw crystals - the source of magic for many use cases. Yield follows the local [mana concentration](/docs/mechanics/environment/#mana-concentration), so where a harvester stands matters as much as its rank." >}}

Level 1 enables you to craft, place and use a Mana Harvester.

| Lv. | Harvesting Time Reduction | Crystal Yield | Total Active Harvesters |
| --- | ------------------------- | ------------- | ----------------------- |
| 1   | 5%                        | +3%           | 1                       |
| 2   | 10%                       | +6%           | 1                       |
| 3   | 15%                       | +9%           | 1                       |
| 4   | 20%                       | +12%          | 2                       |
| 5   | 25%                       | +15%          | 2                       |
| 6   | 30%                       | +18%          | 2                       |
| 7   | 35%                       | +21%          | 3                       |
| 8   | 40%                       | +24%          | 3                       |
| 9   | 45%                       | +27%          | 3                       |
| 10  | 50%                       | +30%          | 4                       |

{{< /skill >}}

{{< skill name="Manaflow Expert" maxLevel="5" requires="Mana Harvester Lv. 3"
    type="Active" manaCost="22" target="Crystal Lathe"
    description="Refine the raw and unstable mana crystals harvested by a Mana Harvester into the finest arcane raw materials used to build powerful magic artifacts. The Crystal Lathe is for mana crystals only - a Miner's [Gem Cut Station](/docs/mechanics/item-list/#gem-cut-station) handles ordinary gemstones." >}}
Level 1 enables you to craft, place and use a Crystal Lathe. Cast time depends on the processed material.

| Lv. | Success Chance |
| --- | -------------- |
| 1   | 4%             |
| 2   | 8%             |
| 3   | 12%            |
| 4   | 16%            |
| 5   | 20%            |

{{< /skill >}}

{{< skill name="Runic Etching" maxLevel="10" requires="Item Customization Lv. 3"
    type="Active" manaCost="25" cooldown="0s" target="Carving Table"
    description="Create runes from Bestia essences. These runes are imbued with the power of the Bestia and can be slotted into a weapon or piece of equipment that has been prepared with Item Customization. An attempt to convert a Bestia into an essence destroys the Bestia." >}}

Cast time depends on the level of the Bestia. Level 1 allows you to create a Carving Table.

| Lv. | Success Chance |
| --- | -------------- |
| 1   | +5%            |
| 2   | +10%           |
| 3   | +15%           |
| 4   | +20%           |
| 5   | +25%           |
| 6   | +30%           |
| 7   | +35%           |
| 8   | +40%           |
| 9   | +45%           |
| 10  | +50%           |

{{< /skill >}}

{{< skill name="Magic Artisan" maxLevel="10" requires="Runic Etching Lv. 5"
    type="Active" manaCost="38" range="2" target="Enchantment Altar"
    description="Can create magic artefacts by binding sustained enchantments to an item, going well beyond what a single etched rune can hold." >}}

Level 1 allows you to create an Enchantment Altar. Cast time depends on the item level and the enchantment you want to use.

| Lv. | Enchantment Chance | Destroy Chance on Failed Bind |
| --- | ------------------ | ----------------------------- |
| 1   | +4%                | 40%                           |
| 2   | +8%                | 37%                           |
| 3   | +12%               | 34%                           |
| 4   | +16%               | 31%                           |
| 5   | +20%               | 28%                           |
| 6   | +24%               | 25%                           |
| 7   | +28%               | 22%                           |
| 8   | +32%               | 19%                           |
| 9   | +36%               | 16%                           |
| 10  | +40%               | 13%                           |

{{< /skill >}}

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

### Assassin

Masters of hidden infiltration. They can deal high amount of single target damage and know a lot about poisons to coat their weapons.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [warrior tree](#warrior-tree)" />}}

```mermaid
graph TD
    StripWeapons["Strip Weapons (1-5)"]
    DualWield["Dual Wield (1-5)"]
    WeaponCoating["Weapon Coating (1-5)"]

    Hide["Hide (1-5)"]
    Cloak["Cloak (1-3)"]

    PoisonResearch["Poison Research (1-10)"]
    EnchantPoison["Enchant Poison (1-5)"]

    Plagiarism["Plagiarism (1-10)"]
    Preserve["Preserve (1)"]

    StripWeapons -->|Lv.2| DualWield
    DualWield -->|Lv.2| WeaponCoating
    Hide -->|Lv.3| Cloak
    PoisonResearch -->|Lv.3| EnchantPoison
    Plagiarism -->|Lv.5| Preserve
```

<br>
{{< skill name="Strip Weapons" maxLevel="5"
    type="Active" manaCost="22" castTime="Instant" cooldown="12s" range="2" target="Enemy"
    description="A snap of the wrist at exactly the wrong moment for whoever is holding the weapon. Knocks a piece of equipment out of a target's hands and leaves them unable to re-equip it for a while." >}}

Fails outright against a target protected by [Weapon Coating](#skill-weapon-coating).

| Lv. | Strip Chance | Re-equip Blocked |
| --- | ------------ | ---------------- |
| 1   | 20%          | 5s               |
| 2   | 30%          | 10s              |
| 3   | 40%          | 15s              |
| 4   | 50%          | 20s              |
| 5   | 60%          | 25s              |

{{< /skill >}}

{{< skill name="Dual Wield" maxLevel="5" requires="Strip Weapons Lv. 2"
    type="Passive"
    description="Learning to disarm someone teaches you exactly how a weapon wants to be held - and that there is no good reason to stop at one. Lets the Assassin carry a one-handed weapon in each hand at a shrinking penalty." >}}

The off-hand weapon always swings for less than the main hand. Rank buys that gap back.

| Lv. | Off-Hand Damage | Attack Speed Penalty |
| --- | --------------- | -------------------- |
| 1   | 30%             | 25%                  |
| 2   | 40%             | 20%                  |
| 3   | 50%             | 15%                  |
| 4   | 60%             | 10%                  |
| 5   | 70%             | 5%                   |

{{< /skill >}}

{{< skill name="Weapon Coating" maxLevel="5" requires="Dual Wield Lv. 2"
    type="Active" manaCost="26" castTime="2s" cooldown="None" duration="10 min" range="0" target="Self"
    description="A thin, oiled coating worked into weapons and armor that turns aside damage and shrugs off attempts to strip it away." >}}

Protects both hands at once. While it holds, [Strip Weapons](#skill-strip-weapons) cannot take either weapon.

| Lv. | Equipment Damage Reduction | Strip Resistance |
| --- | -------------------------- | ---------------- |
| 1   | 20%                        | 100%             |
| 2   | 40%                        | 100%             |
| 3   | 60%                        | 100%             |
| 4   | 80%                        | 100%             |
| 5   | 100%                       | 100%             |

{{< /skill >}}

{{< skill name="Hide" maxLevel="5"
    type="Active" manaCost="18" castTime="Instant" cooldown="5s" duration="Until cancelled" range="0" target="Self"
    description="Drops the Assassin flat against whatever cover is at hand. Nothing hostile can see them while they stay put - but standing still is the whole price of admission." >}}

Breaks the moment the Assassin moves or attacks. Revealed by [Ruwach](#skill-ruwach) and by a [Sense](#skill-sense) cast in range.

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

Still breaks on attacking. A Priest's [Ruwach](#skill-ruwach) strips it outright.

| Lv. | Movement Speed | Mana Drain per Second |
| --- | -------------- | --------------------- |
| 1   | 50%            | 6                     |
| 2   | 70%            | 5                     |
| 3   | 90%            | 4                     |

{{< /skill >}}

{{< skill name="Poison Research" maxLevel="10"
    type="Passive"
    description="A long, unhealthy familiarity with everything that should not be swallowed. Raises how hard the Assassin's own poisons bite and how well they shrug off somebody else's." >}}

The poisons themselves are not made here - they are ordinary Alchemist goods, brewed with
[Alchemy](#skill-alchemy) and bought like any other reagent. This skill only governs what an Assassin gets out of them.

| Lv. | Poison Damage | Poison Resistance |
| --- | ------------- | ----------------- |
| 1   | +10%          | +5%               |
| 2   | +20%          | +10%              |
| 3   | +30%          | +15%              |
| 4   | +40%          | +20%              |
| 5   | +50%          | +25%              |
| 6   | +60%          | +30%              |
| 7   | +70%          | +35%              |
| 8   | +80%          | +40%              |
| 9   | +90%          | +45%              |
| 10  | +100%         | +50%              |

{{< /skill >}}

{{< skill name="Enchant Poison" maxLevel="5" requires="Poison Research Lv. 3"
    type="Active" manaCost="24" castTime="2s" cooldown="None" duration="5 min" range="2" target="Ally"
    description="Works a brewed poison into the edge of a weapon so every strike carries a chance to leave it behind. Consumes one Alchemist-brewed poison per cast." >}}

Applies the [Poison](/docs/mechanics/statusvalues/#status-effects) status effect on hit. The poison item decides how hard it
bites; this skill decides how often it lands.

| Lv. | Poison Chance per Hit |
| --- | --------------------- |
| 1   | 5%                    |
| 2   | 10%                   |
| 3   | 15%                   |
| 4   | 20%                   |
| 5   | 25%                   |

{{< /skill >}}

{{< skill name="Plagiarism" maxLevel="10"
    type="Passive"
    description="A passive knack for stealing more than just gold - whenever the Assassin is struck by an enemy spell, there's a chance they memorize it well enough to cast it back once, at a reduced level. Casting the copied spell consumes it, and getting hit by a new spell overwrites whatever was memorized before." >}}

| Lv. | Copy Chance | Max Spell Level Copied |
| --- | ----------- | ---------------------- |
| 1   | 5%          | 10                     |
| 2   | 10%         | 20                     |
| 3   | 15%         | 30                     |
| 4   | 20%         | 40                     |
| 5   | 25%         | 50                     |
| 6   | 30%         | 60                     |
| 7   | 35%         | 70                     |
| 8   | 40%         | 80                     |
| 9   | 45%         | 90                     |
| 10  | 50%         | 100+                   |

{{< /skill >}}

{{< skill name="Preserve" maxLevel="1" requires="Plagiarism Lv. 5"
    type="Active" manaCost="10" castTime="Instant" cooldown="2s" duration="Until cancelled" range="0" target="Self"
    description="Toggle. While active, a spell memorized via Plagiarism is not lost to a fresh copy - the Assassin keeps whatever they stole last until they switch this off and let a new hit overwrite it." >}}
{{< /skill >}}

### Knight

Where a Brawler trusts bare knuckles and a Wizard trusts raw mana, a Knight trusts steel - a lot of it, worn on the body and swung in the hand. This is the tree for masters who would rather stand at the front of a fight than avoid it.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [warrior tree](#warrior-tree)" />}}

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

    HeavyWeaponMastery -->|Lv.3| Bash
    Bash -->|Lv.3| Charge

    HeavyArmorMastery -->|Lv.2| ShieldWall
    ShieldWall -->|Lv.2| AutoGuard

    HeavyArmorMastery -->|Lv.5| Juggernaut
    Charge -->|Lv.3| Juggernaut
    AutoGuard -->|Lv.3| Juggernaut
```

<br>
{{< skill name="Heavy Weapon Mastery" maxLevel="10"
    type="Passive"
    description="Years spent drilling with sword, axe, mace and spear until the weight stops mattering. Increases damage dealt with heavy one- and two-handed melee weapons and reduces the accuracy penalty from wielding oversized ones." >}}

| Lv. | ATK (heavy melee weapons) | Accuracy Penalty Reduction |
| --- | ------------------------- | -------------------------- |
| 1   | +3                        | 10%                        |
| 2   | +6                        | 20%                        |
| 3   | +9                        | 30%                        |
| 4   | +12                       | 40%                        |
| 5   | +15                       | 50%                        |
| 6   | +18                       | 60%                        |
| 7   | +21                       | 70%                        |
| 8   | +24                       | 80%                        |
| 9   | +27                       | 90%                        |
| 10  | +30                       | 100%                       |

{{< /skill >}}

{{< skill name="Heavy Armor Mastery" maxLevel="10"
    type="Passive"
    description="Plate and mail punish anyone who hasn't trained to move in them. This skill teaches the body to carry the weight without giving up speed, complementing the protection of Iron Skin with the ability to actually wear it." >}}

| Lv. | Hard DEF (heavy armor) | Speed Penalty Reduction |
| --- | ---------------------- | ----------------------- |
| 1   | +2                     | 5%                      |
| 2   | +4                     | 10%                     |
| 3   | +6                     | 15%                     |
| 4   | +8                     | 20%                     |
| 5   | +10                    | 25%                     |
| 6   | +12                    | 30%                     |
| 7   | +14                    | 35%                     |
| 8   | +16                    | 40%                     |
| 9   | +18                    | 45%                     |
| 10  | +20                    | 50%                     |

{{< /skill >}}

{{< skill name="Provoke" maxLevel="5"
    type="Active" manaCost="14" castTime="Instant" cooldown="10s" duration="per Lv." range="6" target="Enemy"
    description="A shout, a slammed shield, whatever gets the job done - forces nearby enemies to focus their attacks on the Knight instead of their allies for a short duration." >}}
Higher levels extend the duration and the range at which enemies can be provoked.

| Lv. | Chance-to-Target Bonus |
| --- | ---------------------- |
| 1   | +10%                   |
| 2   | +20%                   |
| 3   | +30%                   |
| 4   | +40%                   |
| 5   | +50%                   |

{{< /skill >}}

{{< skill name="Shield Wall" maxLevel="5" requires="Heavy Armor Mastery Lv. 2"
    type="Active" manaCost="25" castTime="Instant" cooldown="15s" duration="Until cancelled" range="0" target="Self"
    description="Plants the Knight's feet and raises their shield into a proper wall. While active, incoming physical damage is reduced but movement speed drops sharply." >}}
{{< skill-level level="1" >}}Reduces incoming physical damage by `15%` and movement speed by `50%` while active.{{< /skill-level >}}
{{< skill-level level="3" >}}Damage reduction improves to `25%` and the movement penalty eases to `30%`.{{< /skill-level >}}
{{< skill-level level="5" >}}Damage reduction improves to `35%` and a portion of blocked damage is returned to the attacker.{{< /skill-level >}}
{{< /skill >}}

{{< skill name="Bash" maxLevel="5" requires="Heavy Weapon Mastery Lv. 3"
    type="Active" manaCost="18" castTime="Instant" cooldown="6s" range="2" target="Enemy"
    description="A single committed swing that trades finesse for raw impact, with a chance to [Stagger](/docs/mechanics/statusvalues/#status-effects) whatever it lands on." >}}

| Lv. | Bonus Damage | Stagger Chance |
| --- | ------------ | -------------- |
| 1   | +20%         | +5%            |
| 2   | +40%         | +10%           |
| 3   | +60%         | +15%           |
| 4   | +80%         | +20%           |
| 5   | +100%        | +25%           |

{{< /skill >}}

{{< skill name="Auto Guard" maxLevel="5" requires="Shield Wall Lv. 2"
    type="Passive"
    description="A trained reflex that raises the shield on its own the instant a blow lands, sometimes fast enough to stop it cold." >}}

| Lv. | Full Block Chance |
| --- | ----------------- |
| 1   | +4%               |
| 2   | +8%               |
| 3   | +12%              |
| 4   | +16%              |
| 5   | +20%              |

{{< /skill >}}

{{< skill name="Charge" maxLevel="5" requires="Bash Lv. 3"
    type="Active" manaCost="22" castTime="Instant" cooldown="per Lv." range="12" target="Enemy"
    description="Closes the distance to a target in an instant, weapon first. The impact deals damage and briefly forces the target to focus the Knight, folding a gap closer and a taunt into a single swing." >}}
Deals damage and applies a short [Provoke](#skill-provoke) effect on impact.

| Lv. | Cooldown Reduction |
| --- | ------------------ |
| 1   | 0.5s               |
| 2   | 1.0s               |
| 3   | 1.5s               |
| 4   | 2.0s               |
| 5   | 2.5s               |

{{< /skill >}}

{{< skill name="Juggernaut" maxLevel="3" requires="Heavy Armor Mastery Lv. 5 and Charge Lv. 3 and Auto Guard Lv. 3"
    type="Active" manaCost="60" castTime="Instant" cooldown="120s" duration="per Lv." range="0" target="Self"
    description="The Knight's capstone. For a short time the line between wall and weapon stops meaning anything." >}}
{{< skill-level level="1" >}}Once activated, gains `+20%` DEF and `+20%` ATK for a short duration.{{< /skill-level >}}
{{< skill-level level="2" >}}Duration is extended and the Knight becomes immune to stagger and knockback while active.{{< /skill-level >}}
{{< skill-level level="3" >}}Cooldown is reduced and a fully blocked hit (via [Auto Guard](#skill-auto-guard)) refreshes the remaining duration.{{< /skill-level >}}
{{< /skill >}}
