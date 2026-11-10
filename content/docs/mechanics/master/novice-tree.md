---
weight: 210
title: Novice Tree
description: "The few basic skills every master starts with, and the gate to all other trees."
---

In order to learn how to interact with other players you need to invest your first skill points in this skill tree. It is expected that every user learns at least **Basic Skill Lv. 5**, since this is the threshold which unlocks all the other skill trees.

{{< alert context="info" text="Basic Skill Lv. 5 is the gate for every other tree - no skill outside of the Novice tree can be learned before it. As soon as you take a single skill point in any other tree, the Novice tree closes and no further novice skills can be learned." />}}

```mermaid
graph TD
    BasicSkill["Basic Skill (1-5)"]
    CallBestia["Call Bestia (1)"]
    Sprint["Sprint (1-3)"]
    FirstAid["First Aid (1-3)"]
    Cooking["Cooking (1-3)"]

    BasicSkill -->|Lv.1| CallBestia
    BasicSkill -->|Lv.2| Sprint
    BasicSkill -->|Lv.3| FirstAid
    BasicSkill -->|Lv.3| Cooking
```

<br>
{{< skill name="Basic Skill" maxLevel="5"
    type="Passive"
    description="The first lessons every wanderer learns before mana ever answers their call - how to speak with others, strike a fair trade, and hold their own among strangers." >}}
{{< skill-level level="1" >}}Allows to trade with other players.{{< /skill-level >}}
{{< skill-level level="2" >}}Allows to chat with other players via public and whisper chat.{{< /skill-level >}}
{{< skill-level level="3" >}}Allows to list and buy at trade posts. Browsing them needs no rank.{{< /skill-level >}}
{{< skill-level level="4" >}}Sitting doubles HP & Mana recovery, for the master and for the master's Bestias when they sit.{{< /skill-level >}}
{{< skill-level level="5" >}}Allows to create parties and invite players into them. Joining a party needs no rank. Unlocks all the other skill trees.{{< /skill-level >}}
{{< /skill >}}

{{< skill name="Call Bestia" maxLevel="1" requires="Basic Skill Lv. 1"
    type="Active" manaCost="10" castTime="5s" cooldown="5min" range="0" target="Self"
    description="A whistle every Bestia learns to answer. Calls the master's Bestias back from wherever they wandered off to." >}}

Every Bestia the master owns that is out in the world, and not in storage, appears next to the master when the channel
ends. Taking damage breaks the channel. A Bestia that is fighting does not answer, so the skill cannot
pull one out of a lost fight.

{{< /skill >}}

{{< skill name="Sprint" maxLevel="3" requires="Basic Skill Lv. 2"
    type="Active" castTime="Instant" cooldown="30s" duration="5s" range="0" target="Self"
    description="A burst of speed for when walking away is not fast enough - the first escape every wanderer learns, and the one they never stop using." >}}

Costs stamina instead of mana. Ends early when the master attacks or casts a skill.

| Lv. | Movement Speed | Stamina Cost |
| --- | -------------- | ------------ |
| 1   | +30%           | 20           |
| 2   | +40%           | 20           |
| 3   | +50%           | 20           |

{{< /skill >}}

{{< skill name="Cooking" maxLevel="3" requires="Basic Skill Lv. 3"
    type="Active" castTime="Instant" cooldown="None"
    description="The Master and his Bestia can learn recipes and start to cook meals on fire places. Food helps a Bestia to keep its health and stamina up and usually apply buff effects when they are eaten." >}}

Needs a burning [campfire](/docs/mechanics/items-crafting/crafting-stations/#campfires) within about 3 m. Lv. 1 unlocks the campfire kit.

The three ranks only govern how well the Master handles a cooking place. What a Master can actually cook grows through
**recipes**, discovered the same way a Craftsman discovers a blueprint - by experimenting with ingredients. A Lv. 1 cook
with a long recipe book outperforms a Lv. 3 cook who never left the campfire.

| Lv. | Cooking Time Reduction | Success Chance | Stamina Cost |
| --- | ---------------------- | -------------- | ------------ |
| 1   | 0%                     | +0%            | 5            |
| 2   | 20%                    | +20%           | 8            |
| 3   | 40%                    | +40%           | 11           |

{{< /skill >}}

{{< skill name="First Aid" maxLevel="3" requires="Basic Skill Lv. 3"
    type="Active" manaCost="per Lv." castTime="Channeled" cooldown="3min" duration="10s" range="2" target="Self or Ally"
    description="Apply bandages to yourself or to a friendly Bestia or master, channeling a steady mend into whatever's bleeding." >}}

Uses one Bandage when the cast starts, then channels for 10s and heals in a pulse every 2s. A hit breaks the channel;
what was healed so far stays. A target can only receive a single First Aid every 60 secs. The pulses together heal the
smaller of the two amounts, so the flat value caps it.

| Lv. | Max HP Healed (% based) | Max HP Healed (flat) | Mana |
| --- | ----------------------- | -------------------- | ---- |
| 1   | +30%                    | +100 HP              | 12   |
| 2   | +60%                    | +200 HP              | 16   |
| 3   | +100%                   | +350 HP              | 20   |

{{< /skill >}}
