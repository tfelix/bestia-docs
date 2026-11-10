---
weight: 240
title: Scholar Tree
description: "Priest, Trader and Sage: keeping a party alive, running trade and chasing magic to its source."
---

The Scholar tree contains skills which help with sensing mana, hidden things and the world's events. Priests keep a party alive, Traders keep the gears of commerce turning, and Sages chase magic to its source - inscribing, discovering, and eventually bending distance itself.

```mermaid
graph TD
    MagicSense["Magic Sense (1-5)"]
    Sense["Sense (1)"]
    Ruwach["Ruwach (1)"]
    Observation["Observation (1-5)"]
    Gate["5+ pts in Scholar Tree"]
    Priest["Priest"]
    Trader["Trader"]
    Sage["Sage"]

    MagicSense -->|Lv.1| Sense
    MagicSense -->|Lv.2| Ruwach
    MagicSense -->|Lv.3| Observation
    MagicSense -.-> Gate
    Sense -.-> Gate
    Ruwach -.-> Gate
    Observation -.-> Gate
    Gate -.->|unlocks| Priest
    Gate -.->|unlocks| Trader
    Gate -.->|unlocks| Sage
```

<br>
{{< skill name="Magic Sense" maxLevel="5"
    type="Active" manaCost="12" castTime="2s" cooldown="10s" duration="15s" range="Self" target="Self"
    description="A prickle at the back of the mind that flags mana at work nearby, and picks apart what spell an item or entity carries bound to it." >}}

Sweeps the area around the caster once per cast. What comes back gets sharper with rank: first that something is there,
then where it is, and finally what it actually does. Local [mana concentration](/docs/mechanics/world/environment/#mana-concentration)
adds to the range in a mana-rich region and eats into it in a drained one.

| Lv. | Range | What It Reveals                                                                       |
| --- | ----- | ------------------------------------------------------------------------------------- |
| 1   | 10m   | That something nearby carries mana                                                    |
| 2   | 20m   | Direction and rough strength of each source                                           |
| 3   | 30m   | The element the mana belongs to                                                       |
| 4   | 40m   | The exact spell bound to an item or place                                             |
| 5   | 50m   | Who bound it, and what trigger a [Spell Binding](#skill-spell-binding) is waiting for |

{{< /skill >}}

{{< skill name="Sense" maxLevel="1" requires="Magic Sense Lv. 1"
    type="Active" manaCost="6" castTime="1s" cooldown="3s" range="12" target="Enemy"
    description="Cast on a monster to read what mana and instinct alone can tell about it." >}}
Reveals the monster status values, element, HP and Mana.
{{< /skill >}}

{{< skill name="Ruwach" maxLevel="1" requires="Magic Sense Lv. 2"
    type="Active" manaCost="14" castTime="Instant" cooldown="10s" duration="10s" range="10m" target="Self"
    description="A pulse of second sight that peels back concealment - hidden traps, hiding Bestia and cloaked Assassins stand out for what they are. Useful to any Scholar, whether they're scrying old ruins or walking a party into an ambush." >}}

While it is active, everything hidden within 10m of the caster is revealed. Detection resistance, such as that of
[Hide](#skill-hide), does not help against it.

{{< /skill >}}

{{< skill name="Observation" maxLevel="5" requires="Magic Sense Lv. 3"
    type="Active" manaCost="20" castTime="5s" cooldown="60s" range="0" target="Observation Outpost"
    description="The Scholar's ear to the ground - a sense for the direction and distance of world-changing events long before word of them travels." >}}

Detects nearby world events like mana rifts which open, spawned bosses or other world changing events. It reads
**events**, not things: a [Resource Sense](#skill-resource-sense) finds the ore vein, a [Scry](#skill-scry) looks at a
place you are not standing in, and a [Magic Sense](#skill-magic-sense) picks apart a single spell. Observation is the
only one that notices something is about to happen.

It only works at an Observation Outpost, and the distance counts from the outpost. An outpost is built in the wild from
an outpost kit, which is made with [Carpentry](#skill-carpentry). Level 1 is needed to build it. A Bestia can keep watch
there while you are away.

| Lv. | Detection Distance |
| --- | ------------------ |
| 1   | 1km                |
| 2   | 2km                |
| 3   | 3km                |
| 4   | 4km                |
| 5   | 5km                |

{{< /skill >}}

# Priest

Priests channel mana into blessings that keep a party alive - restoring health, lifting curses, and bolstering the vitality of Bestia out in the field.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [scholar tree](#scholar-tree)" />}}

The Priest has two routes. The **Cleric** is the full support of a party: heals, blessings and wards. The **Exorcist** hunts Demons and the Undead with holy light and holy water.

```mermaid
graph TD
    MagicSense[/"Magic Sense (Scholar Tree)"/]

    Heal["Heal (1-10)"]

    Suffragium["Suffragium (1)"]
    Gloria["Gloria (1)"]

    AquaBenedicta["Aqua Benedicta (1)"]
    StatusRecovery["Status Recovery (1)"]
    Aspersio["Aspersio (1-3)"]

    Blessing["Blessing (1-5)"]
    IncreaseAGI["Increase AGI (1-3)"]
    KyrieEleison["Kyrie Eleison (1-3)"]
    Pneuma["Pneuma (1)"]
    Magnificat["Magnificat (1-3)"]


    SignumCrucis["Signum Crucis (1-3)"]
    HolyLight["Holy Light (1-5)"]
    DemonBane["Demon Bane (1-5)"]
    TurnUndead["Turn Undead (1-3)"]
    LexAeterna["Lex Aeterna (1)"]
    MagnusExorcismus["Magnus Exorcismus (1-3)"]

    Sanctuary["Sanctuary (1-3)"]
    Resurrection["Resurrection (1)"]

    MagicSense -->|Lv.2| Gloria
    MagicSense -->|Lv.2| Suffragium

    Heal -->|Lv.2| StatusRecovery
    Heal -->|Lv.3| Blessing

    SignumCrucis -->|Lv.1| AquaBenedicta
    Heal -->|Lv.8| Resurrection
    StatusRecovery -->|Lv.1| Resurrection
    AquaBenedicta -->|Lv.1| Aspersio


    Blessing -->|Lv.3| Magnificat
    KyrieEleison -->|Lv.3| Magnificat
    KyrieEleison -->|Lv.2| Pneuma

    SignumCrucis -->|Lv.2| HolyLight
    SignumCrucis -->|Lv.2| DemonBane
    HolyLight -->|Lv.3| LexAeterna
    HolyLight -->|Lv.3| TurnUndead
    HolyLight -->|Lv.5| MagnusExorcismus
    DemonBane -->|Lv.3| TurnUndead
    TurnUndead -->|Lv.3| MagnusExorcismus

    Magnificat -->|Lv.3| Sanctuary
    Pneuma -->|Lv.1| Sanctuary
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

{{< skill name="Suffragium" maxLevel="1" requires="Magic Sense Lv. 2"
    type="Active" manaCost="18" castTime="Instant" cooldown="20s" duration="30s" range="9" target="Ally"
    description="A murmured rite that lightens the burden of spellcasting for a short while - a Sage burning through scrolls, a Priest chaining blessings and a Trader rushing a linking ritual all feel the difference equally." >}}
The next spell the target ally casts within `30s` has `30%` less cast time.
{{< /skill >}}

{{< skill name="Gloria" maxLevel="1" requires="Magic Sense Lv. 2"
    type="Active" manaCost="22" castTime="2s" cooldown="30s" duration="90s" range="9" target="Party"
    description="A quiet benediction that lets a crafter's hands find the better cut. Every item the party starts crafting while it holds rolls its random stats with better odds." >}}

`+15%` to the chance of every [random stat](/docs/mechanics/items-crafting/items/#forging-and-random-stats) slot and socket of the item.

{{< /skill >}}

{{< skill name="Aqua Benedicta" maxLevel="1" requires="Signum Crucis Lv. 1"
    type="Active" manaCost="12" castTime="3s" cooldown="5s" range="0" target="Self"
    description="The rite of blessing plain water into [Holy Water](/docs/mechanics/items-crafting/item-list/#holy-water). User must be standing in water, consuming an [Empty Bottle](/docs/mechanics/items-crafting/item-list/#empty-bottle) in the process. Holy Water is the reagent behind Aspersio and several higher rites." >}}
{{< /skill >}}

{{< skill name="Blessing" maxLevel="5" requires="Heal Lv. 3"
    type="Active" manaCost="28" castTime="2s" cooldown="None" duration="per Lv." range="9" target="Party"
    description="A benediction that steadies body and mind and lends striking power, raising a party's core stats for a short while." >}}

On an Undead or Demon target it turns into a curse: it halves DEX and INT instead.

| Lv. | STR/INT/DEX | HIT | ATK and MATK | Duration |
| --- | ----------- | --- | ------------ | -------- |
| 1   | +2          | +4  | +3           | 80s      |
| 2   | +4          | +8  | +6           | 120s     |
| 3   | +6          | +12 | +9           | 160s     |
| 4   | +8          | +16 | +12          | 200s     |
| 5   | +10         | +20 | +15          | 240s     |

{{< /skill >}}

{{< skill name="Increase AGI" maxLevel="3"
    type="Active" manaCost="20" castTime="Instant" cooldown="None" duration="per Lv." range="9" target="Ally"
    description="Lightens a target's limbs with borrowed haste, quickening step and swing alike." >}}
Grants a flat `+15%` Movement Speed at any level, plus the table below. The bonus only lasts while the buff holds, and
it **stacks** with the permanent [Quick Travel](#skill-quick-travel), so a well-buffed traveller adds both.

| Lv. | AGI | ASPD | Duration |
| --- | --- | ---- | -------- |
| 1   | +4  | +1%  | 80s      |
| 2   | +6  | +3%  | 120s     |
| 3   | +8  | +5%  | 160s     |

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

{{< skill name="Pneuma" maxLevel="1" requires="Kyrie Eleison Lv. 2"
    type="Active" manaCost="25" castTime="1s" cooldown="10s" duration="20s" range="6" target="Ground"
    description="Lays a veil of still air over a patch of ground; anything standing in it becomes untouchable by arrows, bolts and thrown weapons, though a blade still finds its mark." >}}

The veil covers a radius of 3m.

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

{{< skill name="Demon Bane" maxLevel="5" requires="Signum Crucis Lv. 2"
    type="Passive"
    description="Years spent studying the weak points of the unholy pay off - every strike against a Demon or Undead lands harder, and what they strike back with lands softer." >}}

| Lv. | Damage vs Demon/Undead | Damage Taken from Demon/Undead |
| --- | ---------------------- | ------------------------------ |
| 1   | +5%                    | -6%                            |
| 2   | +10%                   | -12%                           |
| 3   | +15%                   | -18%                           |
| 4   | +20%                   | -24%                           |
| 5   | +25%                   | -30%                           |

{{< /skill >}}

{{< skill name="Status Recovery" maxLevel="1" requires="Heal Lv. 2"
    type="Active" manaCost="20" castTime="Instant" cooldown="10s" range="9" target="Ally"
    description="Clears the fog from a target's mind - lifting [Blind, Confused and Feared](/docs/mechanics/combat/statusvalues/#status-effects) in a single rite." >}}

{{< alert context="info" text="To do: effects on the body, such as Stun, Frozen, Stone and Poison, need a cure of their own." />}}

{{< /skill >}}

{{< skill name="Aspersio" maxLevel="3" requires="Aqua Benedicta Lv. 1"
    type="Active" manaCost="22" castTime="2s" cooldown="10s" duration="per Lv." range="2" target="Ally"
    description="Anoints a weapon with Holy Water, temporarily imbuing its strikes with the holy element. Consumes one [Holy Water](/docs/mechanics/items-crafting/item-list/#holy-water) per cast." >}}

| Lv. | Duration |
| --- | -------- |
| 1   | 60s      |
| 2   | 120s     |
| 3   | 180s     |

{{< /skill >}}

{{< skill name="Turn Undead" maxLevel="3" requires="Demon Bane Lv. 3 and Holy Light Lv. 3"
    type="Active" manaCost="30" castTime="2s" cooldown="5s" range="9" target="Enemy"
    description="A judgment of pure holy mana that punches through armor and unravels the unnatural knot holding an undead together." >}}
Higher levels raise the chance of an instant kill against sufficiently weak undead.

Inflicts single target Holy, armor piercing damage. If the target is an Undead property monster, this spell has a chance of immediately ending its existence.

| Lv. | Base Chance of Effect |
| --- | --------------------- |
| 1   | 8%                    |
| 2   | 24%                   |
| 3   | 40%                   |

```text
Chance of Effect = [Base_Chance_of_Effect + (BaseLv ÷ 10) + (INT ÷ 10) + (WIL ÷ 10) + {1 − (Target_HP ÷ Target_MaxHP)} × 20]%
Damage = Holy Light damage of the same skill level
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
    description="The Priest's offensive capstone: a pillar of holy mana erupts around the target spot, searing everything caught in it and the undead and demonic worst of all." >}}

| Lv. | MATK | Bonus Damage vs Demon/Undead |
| --- | ---- | ---------------------------- |
| 1   | +15% | +10%                         |
| 2   | +30% | +20%                         |
| 3   | +45% | +30%                         |

{{< /skill >}}

{{< skill name="Sanctuary" maxLevel="3" requires="Magnificat Lv. 3 and Pneuma Lv. 1"
    type="Active" manaCost="50" castTime="3s" cooldown="30s" duration="30s" range="6" target="Ground"
    description="Consecrates a patch of ground into holy ground: allies standing in it are steadily mended, while any undead or demon caught inside burns instead." >}}
Every second it heals the allies standing within, and deals the same amount as holy damage to undead and demon-type
enemies.

| Lv. | Max HP Healed per Second |
| --- | ------------------------ |
| 1   | +5%                      |
| 2   | +10%                     |
| 3   | +15%                     |

{{< /skill >}}

{{< skill name="Resurrection" maxLevel="1" requires="Heal Lv. 8 and Status Recovery Lv. 1"
    type="Active" manaCost="120" castTime="10s" cooldown="10 min" range="5" target="Ally"
    description="The rite few Priests ever get to cast and fewer still get to cast twice in a row on the same ally - channels enough mana to call a fallen Bestia or Master back over the threshold, returning them to the world with a portion of their HP restored. Long cooldown; can not be used on the caster." >}}
{{< /skill >}}

# Trader

Coin has its own kind of magic. Traders read markets instead of mana flows, linking auction houses together, minting the coin everyone else trades in, and looking out for goods that might otherwise walk off on their own.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [scholar tree](#scholar-tree)" />}}

The Trader has two routes. The **Merchant** buys cheap, sells dear and runs stalls and auction houses. The **Moneyer** recovers scrap and mints coin.

```mermaid
graph TD
    Scavenger["Scavenger (1-5)"]
    TradePostOwner["Trade Post Owner (1-5)"]
    Minting["Minting (1-5)"]
    TradeAgreement["Trade Agreement (1-5)"]
    HonorableCitizen["Honorable Citizen (1-5)"]
    Haggling["Haggling (1-5)"]
    StreetStall["Street Stall (1-5)"]

    Scavenger -->|Lv.3| Minting
    TradePostOwner -->|Lv.3| TradeAgreement
    Haggling -->|Lv.2| StreetStall

    Minting -->|Lv.2| HonorableCitizen
    TradeAgreement -->|Lv.1| HonorableCitizen
```

<br>
{{< skill name="Scavenger" maxLevel="5"
    type="Passive"
    description="A scrapper's eye for what's still worth keeping - coaxes more usable components out of anything broken down for parts." >}}

| Lv. | Recycle Chance |
| --- | -------------- |
| 1   | +10%           |
| 2   | +20%           |
| 3   | +30%           |
| 4   | +40%           |
| 5   | +50%           |

{{< /skill >}}

{{< skill name="Minting" maxLevel="5" requires="Scavenger Lv. 3"
    type="Active" manaCost="15" castTime="10s" cooldown="0s" range="2" target="Mint"
    description="The final step between a fistful of raw gold and coin that actually spends. Allows the master to mint gold bars into gold coins. See [Currency](/docs/mechanics/towns-trade/economy-trade/#currency) for how the world's money supply is minted from mined gold." >}}

Level 1 allows you to place a Mint. The cast only places the mint or opens its recipes. The minting itself takes the
[craft duration](/docs/mechanics/items-crafting/items/#craft-duration) of the bar.

A mint never creates gold. It recovers a share of the gold in a bar as coin, and the rest goes back to the world
reserve. See [Minting yield is a recovery rate](/docs/server/money-supply/#minting-yield-is-a-recovery-rate-not-a-bonus).

| Lv. | Gold Recovered as Coin |
| --- | ---------------------- |
| 1   | 60%                    |
| 2   | 70%                    |
| 3   | 80%                    |
| 4   | 90%                    |
| 5   | 100%                   |

{{< /skill >}}

{{< skill name="Trade Post Owner" maxLevel="5"
    type="Active" manaCost="40" castTime="10s" cooldown="0s" range="2" target="Ground"
    description="Builds an auction house where other citizens can buy and sell their wares, turning any settlement into a proper marketplace." >}}

Only one auction house can stand inside a settlement, and none within 5km of another. See
[Building an Auction House](/docs/mechanics/towns-trade/economy-trade/#building-an-auction-house).

| Lv. | Auction Houses | Max Owner Fee |
| --- | -------------- | ------------- |
| 1   | 1              | 5%            |
| 2   | 2              | 10%           |
| 3   | 3              | 15%           |
| 4   | 4              | 20%           |
| 5   | 5              | 25%           |

{{< /skill >}}

{{< skill name="Haggling" maxLevel="5"
    type="Passive"
    description="A Trader never pays the price on the sign." >}}

| Lv. | Buying from a Merchant | Selling to a Merchant |
| --- | ---------------------- | --------------------- |
| 1   | -2%                    | +2%                   |
| 2   | -4%                    | +4%                   |
| 3   | -6%                    | +6%                   |
| 4   | -8%                    | +8%                   |
| 5   | -10%                   | +10%                  |

{{< /skill >}}

{{< skill name="Street Stall" maxLevel="5" requires="Haggling Lv. 2"
    type="Active" manaCost="10" castTime="5s" cooldown="0s" duration="1h" range="1" target="Ground"
    description="A cloth on the ground and a few goods on it - every road is a market for a Trader." >}}

Sets up a market stall where the Trader stands. Other players buy the listed items from it. The stall closes when the
Trader walks away or after `1h`. Unlike an [auction house](#skill-trade-post-owner) it needs no settlement.

| Lv. | Listings |
| --- | -------- |
| 1   | 3        |
| 2   | 5        |
| 3   | 7        |
| 4   | 9        |
| 5   | 11       |

{{< /skill >}}

{{< skill name="Trade Agreement" maxLevel="5" requires="Trade Post Owner Lv. 3"
    type="Active" manaCost="30" castTime="5s" cooldown="60s" range="10" target="Player"
    description="Weaves this Trader's auction house into those of other consenting players, merging their listings into a single, wider [marketplace](/docs/mechanics/towns-trade/economy-trade/#linking-auction-houses)." >}}
To be linked by other players, at least level 1 in this skill is required.

| Lv. | Linked Players |
| --- | -------------- |
| 1   | 1              |
| 2   | 2              |
| 3   | 3              |
| 4   | 4              |
| 5   | 5              |

{{< /skill >}}

{{< skill name="Honorable Citizen" maxLevel="5" requires="Minting Lv. 2 and Trade Agreement Lv. 1"
    type="Passive"
    description="A quiet ledger of who's been caught with sticky fingers. Anyone caught stealing from this Trader's stock, mint or linked auction listings suffers a steeper honor penalty than they otherwise would." >}}

| Lv. | Honor Penalty for Robbers |
| --- | ------------------------- |
| 1   | +20%                      |
| 2   | +40%                      |
| 3   | +60%                      |
| 4   | +80%                      |
| 5   | +100%                     |

{{< /skill >}}

# Sage

Books, wards and long nights spent staring into scrying bowls. Sages study magic itself - discovering it, inscribing it, binding it, and eventually learning to fold distance in on itself with teleportation and portals.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [scholar tree](#scholar-tree)" />}}

The Sage has two routes. The **Scribe** trains, inscribes and binds spells and opens the way with Teleport and Warp Portal. The **Battle Sage** fights magic itself: dispels, wards, mana drain and endowed weapons.

```mermaid
graph TD
    MagicSense[/"Magic Sense (Scholar Tree)"/]
    Observation[/"Observation (Scholar Tree)"/]
    SpellTraining["Spell Training (1-5)"]
    FreeCast["Free Cast (1-5)"]
    Scry["Scry (1-5)"]
    Dispel["Dispel (1-5)"]
    SpellInscription["Spell Inscription (1-5)"]
    SpellBinding["Spell Binding (1-5)"]
    Teleport["Teleport (1-2)"]
    WarpPortal["Warp Portal (1-5)"]
    MagicRod["Magic Rod (1-3)"]
    ManaDrain["Mana Drain (1-3)"]
    LandProtector["Land Protector (1-3)"]
    Endow["Endow (1-3)"]

    MagicSense -->|Lv.3| SpellTraining
    Observation -->|Lv.3| Scry
    SpellTraining -->|Lv.2| Dispel
    SpellTraining -->|Lv.3| SpellInscription
    SpellInscription -->|Lv.3| SpellBinding

    Scry -->|Lv.5| Teleport
    Teleport -->|Lv.2| WarpPortal

    Dispel -->|Lv.2| MagicRod
    MagicRod -->|Lv.1| ManaDrain
    MagicRod -->|Lv.2| LandProtector

    FreeCast -->|Lv.2| Endow
```

<br>

{{< skill name="Spell Training" maxLevel="5" requires="Magic Sense Lv. 3"
    type="Active" manaCost="25" castTime="10s" cooldown="None" range="2" target="Bestia"
    description="Trains a spell from a scroll into a Bestia's memory, the first step of every Sage's education." >}}

Consumes the scroll, also when the training fails. The base chance depends on the level of the spell and uses the same
table as [Spell Inscription](#skill-spell-inscription). Each level adds to it.

| Lv. | Success Chance |
| --- | -------------- |
| 1   | +10%           |
| 2   | +20%           |
| 3   | +30%           |
| 4   | +40%           |
| 5   | +50%           |

{{< /skill >}}

{{< skill name="Free Cast" maxLevel="5"
    type="Passive"
    description="Trains a Sage to keep moving through an incantation instead of rooting to the spot. Raises how much movement speed is kept while a spell is being cast and lowers the chance an incoming hit breaks concentration." >}}

| Lv. | Movement Speed While Casting | Interrupt Resistance |
| --- | ---------------------------- | -------------------- |
| 1   | 20%                          | +10%                 |
| 2   | 40%                          | +20%                 |
| 3   | 60%                          | +30%                 |
| 4   | 80%                          | +40%                 |
| 5   | 100%                         | +50%                 |

{{< /skill >}}

{{< skill name="Scry" maxLevel="5" requires="Observation Lv. 3"
    type="Active" manaCost="30" castTime="5s" cooldown="60s" duration="20s" range="Any charted location" target="Location"
    description="Casts a Sage's sight far beyond their own eyes, scouting distant ground and the resources hiding on it before ever setting foot there." >}}

The Sage sees the chosen spot for 20s. Only [charted](#skill-cartography) land can be scried.

| Lv. | View Radius |
| --- | ----------- |
| 1   | 20m         |
| 2   | 40m         |
| 3   | 60m         |
| 4   | 80m         |
| 5   | 100m        |

{{< /skill >}}

{{< skill name="Dispel" maxLevel="5" requires="Spell Training Lv. 2"
    type="Active" manaCost="40" castTime="2s" cooldown="15s" range="9" target="Any"
    description="Unravels every magical effect clinging to a target in a single word, undoing buffs and curses alike." >}}

Success chance is based on skill level and the target's SMDEF, with a base chance of `(50 + 10 * SkillLv)%`. Requires 1 [Yellow Mana Crystal](/docs/mechanics/items-crafting/item-list/#yellow-mana-crystal) per cast.

{{< alert context="info" text="To do: decide whether Dispel is how a [ward stone](/docs/mechanics/society/pvp/#protected-zones) can be countered. The honor table already lists dispelling one." />}}

| Lv. | Base Success Chance |
| --- | ------------------- |
| 1   | 60%                 |
| 2   | 70%                 |
| 3   | 80%                 |
| 4   | 90%                 |
| 5   | 100%                |

{{< /skill >}}

{{< skill name="Magic Rod" maxLevel="3" requires="Dispel Lv. 2"
    type="Active" manaCost="20" castTime="Instant" cooldown="20s" duration="per Lv." range="0" target="Self"
    description="A reactive ward raised at a gesture. The next single-target spell to strike the caster is caught and unravelled instead of landing, its energy siphoned back as mana. Area spells wash straight over it - only single-target magic is caught." >}}
Catches a single incoming spell while the ward holds.

| Lv. | Mana Recovered (of spell cost) | Ward Duration |
| --- | ------------------------------ | ------------- |
| 1   | 50%                            | 10s           |
| 2   | 75%                            | 15s           |
| 3   | 100%                           | 20s           |

{{< /skill >}}

{{< skill name="Mana Drain" maxLevel="3" requires="Magic Rod Lv. 1"
    type="Active" manaCost="25" castTime="1s" cooldown="15s" duration="per Lv." range="per Lv." target="Self"
    description="Opens a slow siphon on the mana of everything hostile standing too close, pulling it steadily into the Sage's own reserves for a short while." >}}

Each second drains a share of each target's max mana.

| Lv. | Range | Max Mana Drained per Second | Duration |
| --- | ----- | --------------------------- | -------- |
| 1   | 2m    | 1%                          | 10s      |
| 2   | 4m    | 2%                          | 20s      |
| 3   | 6m    | 3%                          | 30s      |

{{< /skill >}}

{{< skill name="Land Protector" maxLevel="3" requires="Magic Rod Lv. 2"
    type="Active" manaCost="55" castTime="3s" cooldown="40s" duration="per Lv." range="6" target="Ground"
    description="Consecrates a patch of ground against hostile magic. While it holds, no area-of-effect or ground-targeted spell can take root inside its bounds - friend and foe alike." >}}

| Lv. | Radius | Duration |
| --- | ------ | -------- |
| 1   | 3m     | 15s      |
| 2   | 4m     | 25s      |
| 3   | 5m     | 35s      |

{{< /skill >}}

{{< skill name="Spell Inscription" maxLevel="5" requires="Spell Training Lv. 3"
    type="Active" manaCost="35" castTime="15s" cooldown="None" range="2" target="Bestia"
    description="Enables you to extract an attack from the memory of a Bestia onto a scroll, which can then either trigger the attack once or teach it to another Bestia instead. However, there is a chance that the mind of a Bestia is destroyed during the extraction, killing the Bestia in the process." >}}
The base success chance depends on the level of the attack being inscribed and is further modified by skill level, equipment and intelligence (`INT / 2 + WIL / 4`):

| Attack Level | Base Success |
| ------------ | ------------ |
| 1–20         | 80%          |
| 21–40        | 70%          |
| 41–60        | 60%          |
| 61–80        | 50%          |
| 81–90        | 10%          |
| 91–100       | -20%         |
| 101+         | -40%         |

A negative base means the extraction is impossible on raw talent alone and only becomes viable with strong bonuses from intelligence, skill level and equipment.
{{< /skill >}}

{{< skill name="Spell Binding" maxLevel="5" requires="Spell Inscription Lv. 3"
    type="Active" manaCost="45" castTime="10s" cooldown="None" range="2" target="Item or Ground"
    description="Binds a spell to an object or place and ties it to a trigger, giving rise to enchanted artifacts, standing alarms and hidden traps alike." >}}

{{< alert context="warning" text="To be designed: which spells can be bound, which triggers exist, and what each level adds." />}}

{{< /skill >}}

{{< skill name="Teleport" maxLevel="2" requires="Scry Lv. 5"
    type="Active" manaCost="35" castTime="2s" cooldown="30s" range="0" target="Self"
    description="Moves the Sage and their Bestias close by in a single step." >}}

Every cast consumes a Teleport Rune. A teleported entity cannot teleport again for 5 minutes.

| Lv. | Destination                  |
| --- | ---------------------------- |
| 1   | A random spot within 150m    |
| 2   | The master's home settlement |

{{< /skill >}}

{{< skill name="Warp Portal" maxLevel="5" requires="Teleport Lv. 2"
    type="Active" manaCost="70" castTime="5s" cooldown="120s" duration="30s" range="3" target="Ground"
    description="The Sage's capstone. Where Teleport moves only the Sage and their Bestias, a Portal tears a standing hole that anyone can walk through. As soon as a portal has opened it can be used in both directions for some time." >}}

Every cast consumes a Portal Rune, which costs more than a Teleport Rune.

{{< alert context="info" text="To do: decide where a portal leads. Runes are spent on the cast, so they cannot mark the far end." />}}

| Lv. | Simultaneous Users |
| --- | ------------------ |
| 1   | 2                  |
| 2   | 4                  |
| 3   | 6                  |
| 4   | 8                  |
| 5   | 10                 |

{{< /skill >}}

{{< skill name="Endow" maxLevel="3" requires="Free Cast Lv. 2"
    type="Active" manaCost="28" castTime="2s" cooldown="5s" duration="per Lv." range="5" target="Ally"
    description="Temporarily infuses an ally's weapon with an element, so its strikes burn, freeze, crack or crush as well as bite. Consumes a [Blue Mana Crystal](/docs/mechanics/items-crafting/item-list/#blue-mana-crystal) to carry the charge." >}}

The caster picks the element when casting: fire, water, wind or earth. The weapon takes on the element, so the
[element table](/docs/mechanics/bestias/bestia-design/#7-element-size-and-defences) applies. The bonus damage comes on top.

| Lv. | Duration | Bonus Damage of the Element |
| --- | -------- | --------------------------- |
| 1   | 60s      | +5%                         |
| 2   | 120s     | +10%                        |
| 3   | 180s     | +15%                        |

{{< /skill >}}
