---
title: Bestia Master
weight: 200
description: Overview of the Bestia Master, their origin and skill system, including skill trees, skill point progression, and profession design guidelines.
---

The small intro game tells players how they became a Bestia Master: They came into direct contact with an ephemeral mana crystal that changed their nature through magic and connected them to the mana flows of the universe. They are therefore receptive to the influence of mana and are able to communicate with the beings that emerge from this mythical energy: **the Bestia**.

The attachment to mana also explains why Bestia masters were able to survive the destruction of their world relatively unscathed and to pass on to the next incarnation of the world.

# Master Skills

The bestia master can learn a set of skills. These skills are freely chosen by the player and determine the job or profession of the master.

Some of these account skills can be used by every Bestia in possession of the master, or at least have a passive effect on them. Others can only be used actively by the master itself.

{{< alert context="info" text="Don't confuse this skill system with the regular attacks a Bestia is learning by item usage or just by level up. Those are simply called attacks." />}}

- The possible rank counts of a skill should be: **1, 3, 5 and 10**
- Budget skills per **branch**, not per tree. A branch is a chain of 3-6 dependent skills that a player buys as a unit, and holds **15-45 ranks** - that is what one career can realistically finish.
- Reaching the capstone of a single branch must cost **no more than 60 skill points**, so a career can finish one branch and still dabble in a second.
- A **base tree** holds **10-25 ranks**. It teaches the basics and gates its sub-trees.
- A **sub-tree** carries **2-6 branches**. Crafting and gathering sub-trees sit at the low end, fighting sub-trees at the high end. The Wizard is the widest of them all because it repeats the same branch shape once per element - that is width, not depth, and it costs a player nothing to ignore three quarters of it.
- There should be some meaningful dependency of the skills forming a tree
- In each profession tree there should form 2-3 sub-trees which create a meaningful hierarchy
- There should be some kind of three tiers inside a tree to lead from low and basic skills to the much more powerful ones

{{< alert context="warning" text="Most important: **No hardcoded skill effects!**" />}}

Especially crafting skills should be, when possible, require some sort of minigame or meaningful player interaction. Their outcome should also be dependent on the status values of a player, on the skill level but also on environmental aspects. An example teleport could go as follows:

> After the master Saferu has selected a few of his and friendly Bestia he prepares to teleport to a fairly distant location. While he is very skilled and has a maxed teleport skill, on the target location there is a manastorm causing some interference. Upon teleportation the group is set of course and spawns almost a kilometer off from their target in a very hostile environment.

Ultimately, it remains important to leave the outcome of skills open in some way. However, the result should remain understandable and influenceable by the player.

# Skill Progression

Every master starts out limited to the **Novice** skill tree - a small set of basics that teaches the player how to get around and how to deal with others. Once **5 skill points are invested into Basic Skill** all remaining skill trees unlock and the master can start to specialize.

The Novice tree then closes behind the player: as soon as the first skill point is spent outside of it, no further novice skills can be learned. Everything learned up to that point is kept. It depends on the player how much of the Novice tree he wants to finish before branching out.

On each level up the master gains 1 skillpoint to put into the skills rank. This is permanent and means a player can spend about 100 points for improving the ranks of his skills.

{{< alert context="info" text="The max level is not capped, so in principle more points can be earned - but progression gets continuously harder, so it is safe to assume every player has about 100 points." />}}

The skilltrees are designed as such that to reach the highest professions in each tree the player needs to spend about **60 points**.

The player can decide to have a mediocre profession in each tree, or to max out one and take maybe half of the
meaningful professions of another tree. The skilltree is a hierarchical dependency of skills.

# Professions

Skill points spent in a sub-tree (Blacksmith, Sage, Wizard, ...) do more than unlock its skills. They also make the
master a member of that **profession**, and the profession decides which weapons and armor the master can use.

- A sub-tree counts as a profession from its **first skill point**. One point in Knight is enough to pick up a sword.
- A master has **at most two professions**: the two sub-trees with the most points. A master with 8 points in Sage, 8
  in Knight and 2 in Forester is a **Sage / Knight**.
- The master may use every weapon type that one of the two professions allows, and the heavier of their two armor
  types.
- Points in a base tree (Novice, Craftsman, Survival, Scholar, Warrior) belong to no profession.
- Holding a weapon in each hand needs the Assassin skill [Dual Wield](#skill-dual-wield). No profession allows it on
  its own.

{{< alert context="info" text="A sub-tree only opens after 5 points in its parent tree, so the first levels after the Novice tree pass without a profession. The novice equipment carries a master through them." />}}

## Changing Professions

The two professions follow the skill points. A third sub-tree replaces one of the current two only when it has **more**
points than it. On a tie the master keeps the profession they already have, so two equal sub-trees never decide the
gear by chance.

When a profession is lost, everything it allowed and nothing else allows goes back to the bag. Nothing is destroyed,
and the master can wear it again as soon as the profession comes back.

## Base Equipment

Every master can use these, with or without a profession:

- Cloth armor
- Slings
- Tools: pickaxe, hatchet, fishing rod
- The novice equipment below

## Novice Equipment

Every new master starts with a novice set. It is weak, but it ignores professions: every master can use it at any
level. A Novice can try out each way of fighting before spending a point outside the Novice tree, and a master who
just left it is never unarmed while their first profession opens.

| Item          | Weapon or armor type | Slot                   |
| ------------- | -------------------- | ---------------------- |
| Novice Knife  | Dagger               | Right hand             |
| Novice Sword  | Sword                | Right hand             |
| Novice Bow    | Bow                  | Right hand, two-handed |
| Novice Rod    | Wand                 | Right hand             |
| Novice Shield | Light shield         | Left hand              |
| Novice Helmet | -                    | Head                   |
| Novice Shirt  | Cloth                | Armor                  |
| Novice Boots  | Light                | Footgear               |

The [Novice Bow](/docs/mechanics/ranged-combat/#novice-bow) comes with 100 arrows. The novice health and mana potions
are not equipment and stay for Novices only.

## Equipment per Profession

Armor is limited by its heaviest type. A master who may wear Medium armor may also wear Light and Cloth. Shields carry
an armor type as well and follow the same rule, see [Armor Type](/docs/mechanics/items/#armor-type). The weapon types
are listed in [Weapon Type](/docs/mechanics/items/#weapon-type).

| Profession                | Tree      | Armor  | Weapon Types                                                   |
| ------------------------- | --------- | ------ | -------------------------------------------------------------- |
| [Blacksmith](#blacksmith) | Craftsman | Medium | Mace, Hammer, Axe, Greataxe                                    |
| [Alchemist](#alchemist)   | Craftsman | Light  | Dagger, Mace, Thrown                                           |
| [Artificer](#artificer)   | Craftsman | Medium | Dagger, Wand, Staff, Crossbow                                  |
| [Forester](#forester)     | Survival  | Medium | Axe, Greataxe, Spear, Bow                                      |
| [Prospector](#prospector) | Survival  | Medium | Sword, Spear, Crossbow                                         |
| [Miner](#miner)           | Survival  | Medium | Mace, Hammer, Greataxe                                         |
| [Trader](#trader)         | Scholar   | Light  | Sword, Crossbow                                                |
| [Sage](#sage)             | Scholar   | Cloth  | Wand, Staff, Tome                                              |
| Priest                    | Scholar   | Medium | Mace, Staff, Tome                                              |
| [Wizard](#wizard)         | Warrior   | Cloth  | Wand, Staff, Tome                                              |
| [Assassin](#assassin)     | Warrior   | Light  | Dagger, Fist, Sword, Thrown                                    |
| [Knight](#knight)         | Warrior   | Heavy  | Sword, Greatsword, Axe, Greataxe, Mace, Hammer, Spear, Polearm |
| Brawler (parked)          | Warrior   | Light  | Fist, Staff                                                    |
| Hunter (parked)           | Warrior   | Light  | Spear, Bow, Crossbow, Thrown                                   |
| Bard (parked)             | Warrior   | Light  | Sword, Bow, Instrument                                         |
| Dancer (parked)           | Warrior   | Light  | Whip, Bow, Thrown                                              |

Heavy armor comes from the Knight alone, so a master who wants plate gives one of their two professions to it. Every
fighting profession owns at least one weapon type few others share - the Knight's greatsword and polearm, the
Assassin's fist weapons, the Dancer's whip, the Bard's instrument, the casters' tome - while every crafting and
gathering profession can still defend itself.

Bestias are not affected by professions. A bestia wears what its species allows, see
[Designing a Bestia](/docs/mechanics/bestia-design/#10-equipment).

# Mana Circles

Almost every master skill that can fail rolls against a success chance: forging a blade, cutting a rune slot, binding an
enchantment, transmuting matter, inscribing a spell. Skill rank, status values and equipment all feed that roll, and a
lone master eventually hits the ceiling of what those three can buy.

A **Mana Circle** is how a group pushes past it. It is a placeable prop - a ring of
[Mana Concentrate](/docs/mechanics/item-list/#mana-concentrate) laid into the ground - that anyone standing inside
contributes to, whatever their profession. The rite is started by the master who owns the skill; everyone else is simply
present, and presence is the whole contribution.

```text
Circle Bonus = 5 × Participants × ManaFactor   [Participants ≤ 6, caster included]
```

`ManaFactor` comes from the local [mana concentration](/docs/mechanics/environment/#mana-concentration): `0.5` in a
drained region, `1.0` in an ordinary one, `1.5` where mana runs thick. A full circle of six in a mana-rich place is
therefore worth `+45%` on the roll - as much as most governing skills grant at max rank - while the same six people
standing on drained ground get `+15%` and would have been better off scouting a different site first.

Three rules keep it from becoming a formality:

- The **mana cost of the rite is split evenly** across every participant, so a circle makes expensive rites affordable as
  well as more likely to land. A participant who cannot pay their share drops out and the circle recalculates.
- Every participant is **locked out of contributing again for 5 minutes**, and cannot act while the rite runs. Standing
  in someone's circle is a real cost, not a favor that takes a second.
- A circle only helps a **success roll**. It does nothing for damage, healing, movement or anything else a skill does.

{{< alert context="info" text="This is the intended answer to \"my crafting rolls have plateaued\": find other players, not better gear. It is also why the highest-level artifacts are expected to be group work - see the [Encourage Social Interaction](/docs/mechanics/overview/#encourage-social-interaction) principle." />}}

# Skill Trees

The following trees exist, they are organized in subtrees. These form the skill trees of a master. After a level up one skill point can be spend to increase a single level of a skill.

{{< alert context="info" text="Each tree and sub-tree below is illustrated with a dependency diagram. A slanted node is a skill borrowed from another tree, every other node is a skill of the tree itself, and a node with no incoming arrow is an entry skill with no prerequisite. Solid arrows are labeled with the required level in the source skill. Dashed arrows lead to the tree-mastery gate that unlocks a sub-tree once 5+ points are invested in its parent tree." />}}

## Novice Tree

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
{{< skill-level level="3" >}}Allows to use trade posts.{{< /skill-level >}}
{{< skill-level level="4" >}}Allows sitting to double HP & Mana recovery.{{< /skill-level >}}
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

Requires a cooking place. Lv 1 allows you to place a campfire which counts as cooking place.

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

Channels for 10s. A target can only receive a single First Aid every 60 secs. It heals the smaller of the two amounts, so the flat value caps it.

| Lv. | Max HP Healed (% based) | Max HP Healed (flat) | Mana |
| --- | ----------------------- | -------------------- | ---- |
| 1   | +30%                    | +100 HP              | 12   |
| 2   | +60%                    | +200 HP              | 16   |
| 3   | +100%                   | +350 HP              | 20   |

{{< /skill >}}

## Craftsman Tree

The workbenches, forges and cauldrons of the tradesfolk turn raw ambition into things a player can actually use. Every blade, trinket and bottled miracle a master ever relies on started out as somebody's Craftsman skill paying off.

Crafting always runs in two phases: a Craftsman first **discovers a blueprint** by experimenting with raw materials, then **produces** that item from it as often as they like. The skills below govern how reliably a Craftsman discovers, produces and refines within their trade — see [Item Crafting](/docs/mechanics/items/#item-crafting) for the full system.

{{< alert context="info" text="Some skills require a prop to interact with e.g. a cooking station and Lv. 1 of this skill allows you to place such a prop by using the item representation of it from within your inventory. If you have at least one level in such a skill you will be able to cast this spell on you and craft such a prop item (if you have the resources for it) for yourself." />}}

```mermaid
graph TD
    Carpentry["Carpentry (1-10)"]
    UpgradeEquipment["Upgrade Equipment (1)"]
    MasterCraftsman["Master Craftsman (1-5)"]
    ItemCustomization["Item Customization (1-10)"]
    Gate["5+ pts in Craftsman Tree"]
    Blacksmith["Blacksmith"]
    Artificer["Artificer"]
    Alchemist["Alchemist"]

    Carpentry -->|Lv.3| MasterCraftsman
    Carpentry -->|Lv.3| ItemCustomization
    Carpentry -.-> Gate
    MasterCraftsman -.-> Gate
    ItemCustomization -.-> Gate
    UpgradeEquipment -.-> Gate
    Gate -.->|unlocks| Blacksmith
    Gate -.->|unlocks| Artificer
    Gate -.->|unlocks| Alchemist
```

<br>
{{< skill name="Carpentry" maxLevel="10"
    type="Active" manaCost="20" cooldown="0s" range="2" target="Workbench"
    description="Turns raw timber and honest labor into the workbenches, furniture and structures every settlement needs to stand on its own." >}}

Lv. 1 allows you to build a [workbench](/docs/mechanics/item-list/#workbench), which you can use for crafting. The time it needs to craft an item depends on the item level you want to craft.

Carpentry also makes the kits for the buildings in the wild: the Observation Outpost, the Mining Shaft and the
Lumberjack Cabin. To build one, the master needs level 1 of the skill that uses it.

| Lv. | Success Chance | Max Item Level |
| --- | -------------- | -------------- |
| 1   | +5%            | 10             |
| 2   | +10%           | 20             |
| 3   | +15%           | 30             |
| 4   | +20%           | 40             |
| 5   | +25%           | 50             |
| 6   | +30%           | 60             |
| 7   | +35%           | 70             |
| 8   | +40%           | 80             |
| 9   | +45%           | 90             |
| 10  | +50%           | 100+           |

This bonus is added on top of the item-level base chance and the crafter's DEX/WIL — see
[Construction Crafting Success Chance](/docs/mechanics/items/#construction-crafting-success-chance) for the full formula.

{{< /skill >}}

{{< skill name="Master Craftsman" maxLevel="5" requires="Carpentry Lv. 3"
    type="Passive"
    description="A lifetime of calluses paid off - tools answer faster and structures rise quicker under this Craftsman's hand, and the Bestia working alongside them keep pace." >}}

| Lv. | Construction Time Reduction | Success Chance |
| --- | --------------------------- | -------------- |
| 1   | 10%                         | +2%            |
| 2   | 20%                         | +4%            |
| 3   | 30%                         | +6%            |
| 4   | 40%                         | +8%            |
| 5   | 50%                         | +10%           |

This bonus is added on top of the item-level base chance and the crafter's DEX/WIL — see
[Construction Crafting Success Chance](/docs/mechanics/items/#construction-crafting-success-chance) for the full formula.

{{< /skill >}}

{{< skill name="Upgrade Equipment" maxLevel="1"
    type="Active" manaCost="18" cooldown="0s"
    description="Time spent far from settlements teaches a Craftsman to adapt and improvise, reworking weapons and armor in the field to better suit their needs." >}}

Allows you to perform upgrades of armor and weapons. There is a chance this fails and potentially destroys your equipment.

See [Weapon Refinement](/docs/mechanics/items/#weapon-refinement) and [Armor Refinement](/docs/mechanics/items/#armor-refinement) for the upgrade chances and effects.

{{< /skill >}}

{{< skill name="Item Customization" maxLevel="10" requires="Carpentry Lv. 3"
    type="Active" manaCost="23" cooldown="0s"
    description="A meticulous rework that opens sockets in an item's frame, letting a Runic Etcher's runes be slotted into it later." >}}

Requires an [Engraving Set](/docs/mechanics/item-list/#engraving-set) which will be consumed in the process. You can choose how many slots you want to put into an item. But every slot makes it harder to succeed. Every extra slot above 1 reduces the success chance by 40%.

The Success Chance below is added on top of a **base chance that drops as the item's own level rises**. See [Item Customization](/docs/mechanics/items/#item-customization) for the full formula and worked examples.

| Lv. | Success Chance | Destroy Chance On Failure | Max Slots |
| --- | -------------- | ------------------------- | --------- |
| 1   | +10%           | 30%                       | 1         |
| 2   | +20%           | 28%                       | 1         |
| 3   | +30%           | 26%                       | 1         |
| 4   | +40%           | 24%                       | 2         |
| 5   | +50%           | 22%                       | 2         |
| 6   | +60%           | 20%                       | 2         |
| 7   | +70%           | 18%                       | 3         |
| 8   | +80%           | 16%                       | 3         |
| 9   | +90%           | 14%                       | 3         |
| 10  | +100%          | 12%                       | 3         |

{{< /skill >}}

### Blacksmith

Steel remembers who beat it into shape. Blacksmiths turn raw ore into the finest weaponry and armor, which protects its wearer even in the midst of the harshest environments and hottest battles.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [craftsman tree](#craftsman-tree)" />}}

```mermaid
graph TD
    ItemCustomization[/"Item Customization (Craftsman Tree)"/]
    UpgradeEquipment[/"Upgrade Equipment (Craftsman Tree)"/]
    OreRefinement["Ore Refinement (1-3)"]
    ForgeWeapon["Forge Weapon (1-10)"]
    ForgeArmor["Forge Armor (1-10)"]
    EquipmentRepair["Equipment Repair (1-5)"]
    WeaponryResearch["Weaponry Research (1-10)"]
    MasterSmith["Master Smith (1-5)"]

    ItemCustomization -->|Lv.5| ForgeWeapon
    ItemCustomization -->|Lv.5| ForgeArmor
    OreRefinement -->|Lv.1| ForgeWeapon
    OreRefinement -->|Lv.1| ForgeArmor
    UpgradeEquipment -->|Lv.1| WeaponryResearch
    OreRefinement -->|Lv.3| EquipmentRepair
    EquipmentRepair -->|Lv.3| WeaponryResearch
    ForgeWeapon -->|Lv.8| MasterSmith
    ForgeArmor -->|Lv.8| MasterSmith
```

<br>
{{< skill name="Ore Refinement" maxLevel="3"
    type="Active" manaCost="18" castTime="10s" cooldown="0s"
    description="Feeds raw ore to the roar of the furnace, coaxing out the pure ingots every weapon and suit of armor is ultimately built from." >}}

Lv. 1 allows you to place a [Furnace](/docs/mechanics/item-list/#furnace). Every batch burns fuel:
[Coal](/docs/mechanics/item-list/#coal). A failed smelt loses both the ore and the fuel.

| Lv. | Ore Refinement Success |
| --- | ---------------------- |
| 1   | +30%                   |
| 2   | +60%                   |
| 3   | +90%                   |

There is **no ore level cap** - the bonus is added on top of an ore-level base chance that starts at `30%` for
[Tin](/docs/mechanics/item-list/#tin-ore) and [Copper](/docs/mechanics/item-list/#copper-ore) and keeps falling by 1%
per ore level above 10, plus the smith's STR and WIL. Even a maxed smith loses roughly every second batch of
[Adamantium Ore](/docs/mechanics/item-list/#adamantium-ore). See
[Ore Refinement Success Chance](/docs/mechanics/items/#ore-refinement-success-chance) for the full formula and
[Refining](/docs/mechanics/natural-resources/#refining) for the level of every ore.

{{< /skill >}}

{{< skill name="Forge Weapon" maxLevel="10" requires="Ore Refinement Lv. 1 and Item Customization Lv. 5"
    type="Active" manaCost="23" castTime="10s" cooldown="0s" range="2" target="Forge"
    description="Discovers and forges weapon blueprints from smelted ingots - the Blacksmith's bread and butter. Higher skill levels reliably reach higher-level weapons; blueprints far above your skill can still be attempted, just at a steeply falling chance." >}}

Lv. 1 allows you to place a Forge.

| Lv. | Success Chance | Reliable Item Level |
| --- | -------------- | ------------------- |
| 1   | +5%            | 10                  |
| 2   | +10%           | 20                  |
| 3   | +15%           | 30                  |
| 4   | +20%           | 40                  |
| 5   | +25%           | 50                  |
| 6   | +30%           | 60                  |
| 7   | +35%           | 70                  |
| 8   | +40%           | 80                  |
| 9   | +45%           | 90                  |
| 10  | +50%           | 100+                |

There is **no hard cap**. A blueprint above the reliable item level can still be attempted - every item level above it
costs another `5%` success chance. A Lv. 5 smith reaching for a level 80 weapon is working at a deep penalty, not
against a locked door. See [Item Crafting](/docs/mechanics/items/#item-crafting) for the full roll.

The reliable item level also caps the random stats a forged copy can roll, see [The Cap](/docs/mechanics/items/#the-cap).

{{< /skill >}}

{{< skill name="Forge Armor" maxLevel="10" requires="Ore Refinement Lv. 1 and Item Customization Lv. 5"
    type="Active" manaCost="23" castTime="10s" cooldown="0s" range="2" target="Forge"
    description="The counterpart to Forge Weapon: discovers and forges armor blueprints - plate, mail and shields - from smelted ingots. Higher skill levels reliably reach higher-level armor; blueprints far above your skill can still be attempted, just at a steeply falling chance." >}}

Lv. 1 allows you to place a Forge.

| Lv. | Success Chance | Reliable Item Level |
| --- | -------------- | ------------------- |
| 1   | +5%            | 10                  |
| 2   | +10%           | 20                  |
| 3   | +15%           | 30                  |
| 4   | +20%           | 40                  |
| 5   | +25%           | 50                  |
| 6   | +30%           | 60                  |
| 7   | +35%           | 70                  |
| 8   | +40%           | 80                  |
| 9   | +45%           | 90                  |
| 10  | +50%           | 100+                |

Same rule as [Forge Weapon](#skill-forge-weapon): no hard cap, but every item level above the reliable one costs another
`5%` success chance. The reliable item level caps random stats the same way.

{{< /skill >}}

{{< skill name="Weaponry Research" maxLevel="10" requires="Equipment Repair Lv. 3 and Upgrade Equipment Lv. 1"
    type="Passive"
    description="Deeper knowledge of weapons and armor that raises the odds of successfully [refining](/docs/mechanics/items/#weapon-refinement) either one further after forging. If an upgrade fails the equipment can be destroyed." >}}

| Lv. | Upgrade Success | Forging Success |
| --- | --------------- | --------------- |
| 1   | +4%             | +1%             |
| 2   | +8%             | +2%             |
| 3   | +12%            | +3%             |
| 4   | +16%            | +4%             |
| 5   | +20%            | +5%             |
| 6   | +24%            | +6%             |
| 7   | +28%            | +7%             |
| 8   | +32%            | +8%             |
| 9   | +36%            | +9%             |
| 10  | +40%            | +10%            |

{{< /skill >}}

{{< skill name="Equipment Repair" maxLevel="5" requires="Ore Refinement Lv. 3"
    type="Active" manaCost="33" castTime="3s" cooldown="0s" range="2" target="Forge"
    description="Hammers dents from armor and sets a fresh edge to broken blades, coaxing worn-out equipment back into fighting shape." >}}

Restores the [durability](/docs/mechanics/items/#damaging-of-items) of weapons and armor alike. Those are the only
things in the world that wear out and can be repaired. A [light source](/docs/mechanics/environment/#light-sources) burns
down as well, but burnt time is gone: no repair gives it back.

| Lv. | Max Item Level |
| --- | -------------- |
| 1   | 20             |
| 2   | 40             |
| 3   | 60             |
| 4   | 80             |
| 5   | 100+           |

{{< /skill >}}

{{< skill name="Master Smith" maxLevel="5" requires="Forge Weapon Lv. 8 and Forge Armor Lv. 8"
    type="Passive"
    description="The capstone of the forge. Makes a Blacksmith's hands steady enough to trust with the rarest ore." >}}

| Lv. | Forging Chance | Upgrade Chance |
| --- | -------------- | -------------- |
| 1   | +5%            | +5%            |
| 2   | +10%           | +10%           |
| 3   | +15%           | +15%           |
| 4   | +20%           | +20%           |
| 5   | +25%           | +25%           |

{{< /skill >}}

### Artificer

Where Blacksmiths hammer steel, Artificers coax it into remembering spells. This path inscribes magic onto items, binds it to triggers, and crystallizes raw mana into shards other professions can build on.

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
    ManaflowExpert -->|Lv.3| MagicArtisan
```

<br>
{{< skill name="Mana Harvester" maxLevel="10"
    type="Active" manaCost="19" castTime="10s" cooldown="30s" range="2" target="Ground"
    description="Build and operate Mana Harvesters which channel mana from the environment into raw crystals - the source of magic for many use cases. Yield follows the local [mana concentration](/docs/mechanics/environment/#mana-concentration), so where a harvester stands matters as much as its rank." >}}

Level 1 enables you to place a Mana Harvester.

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
    type="Active" manaCost="22" castTime="10s" cooldown="0s" range="2" target="Crystal Lathe"
    description="Refine the raw and unstable mana crystals harvested by a Mana Harvester into the finest arcane raw materials used to build powerful magic artifacts. The Crystal Lathe is for mana crystals only - a Miner's [Gem Cutting](#skill-gem-cutting) handles ordinary gemstones." >}}
Level 1 enables you to place a Crystal Lathe. The cast only places the lathe or opens its recipes. The refining itself
takes the [craft duration](/docs/mechanics/items/#craft-duration) of the crystal's item level.

| Lv. | Success Chance | Max Crystal Level |
| --- | -------------- | ----------------- |
| 1   | +4%            | 20                |
| 2   | +8%            | 40                |
| 3   | +12%           | 60                |
| 4   | +16%           | 80                |
| 5   | +20%           | 100+              |

A crystal above your max crystal level cannot be refined.

{{< /skill >}}

{{< skill name="Runic Etching" maxLevel="10" requires="Item Customization Lv. 3"
    type="Active" manaCost="25" castTime="10s" cooldown="0s" range="2" target="Carving Table"
    description="Create runes from Bestia essences. These runes are imbued with the power of the Bestia and can be slotted into a weapon or piece of equipment that has been prepared with Item Customization. An attempt to convert a Bestia into an essence destroys the Bestia." >}}

Level 1 allows you to place a Carving Table. The Bestia to convert must stand next to the table. The cast only places
the table or opens its recipes. The etching itself takes the [craft duration](/docs/mechanics/items/#craft-duration) of
the Bestia's level.

| Lv. | Success Chance | Reliable Bestia Level |
| --- | -------------- | --------------------- |
| 1   | +5%            | 10                    |
| 2   | +10%           | 20                    |
| 3   | +15%           | 30                    |
| 4   | +20%           | 40                    |
| 5   | +25%           | 50                    |
| 6   | +30%           | 60                    |
| 7   | +35%           | 70                    |
| 8   | +40%           | 80                    |
| 9   | +45%           | 90                    |
| 10  | +50%           | 100+                  |

Same rule as [Forge Weapon](#skill-forge-weapon): no hard cap, but every Bestia level above the reliable one costs another
`5%` success chance.

{{< /skill >}}

{{< skill name="Magic Artisan" maxLevel="10" requires="Runic Etching Lv. 5 and Manaflow Expert Lv. 3"
    type="Active" manaCost="38" castTime="10s" cooldown="0s" range="2" target="Enchantment Altar"
    description="Can create magic artifacts by binding sustained enchantments to an item, going well beyond what a single etched rune can hold." >}}

Level 1 allows you to place an Enchantment Altar. Every binding needs refined mana crystals. The cast only places the
altar or opens its recipes. The binding itself takes the [craft duration](/docs/mechanics/items/#craft-duration) of the
item level.

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

### Alchemist

Equal parts kitchen and laboratory. Alchemists turn raw ingredients - mundane or mana-soaked - into tonics and reagents nobody else can make. Some carry the first bandages they ever learned to wrap as a Novice all the way into a healer's toolkit.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [craftsman tree](#craftsman-tree)" />}}

```mermaid
graph TD
    Herbalism["Herbalism (1-5)"]
    Alchemy["Alchemy (1-10)"]
    Transmutation["Transmutation (1-10)"]
    AlchemyMastery["Alchemy Mastery (1-5)"]

    Herbalism -->|Lv.2| Alchemy
    Alchemy -->|Lv.5| Transmutation
    Alchemy -->|Lv.5| AlchemyMastery
```

<br>
{{< skill name="Herbalism" maxLevel="5"
    type="Passive"
    description="Teaches which roots, herbs and mana-touched growth are worth the harvest, and how to keep them potent until they reach the cauldron." >}}

| Lv. | Max Herb Level |
| --- | -------------- |
| 1   | 20             |
| 2   | 40             |
| 3   | 60             |
| 4   | 80             |
| 5   | 100+           |

The herb level is the herb's [item level](/docs/mechanics/items/#item-level). A herb above your max level cannot be
gathered.

{{< /skill >}}

{{< skill name="Alchemy" maxLevel="10" requires="Herbalism Lv. 2"
    type="Active" manaCost="24" castTime="10s" cooldown="0s" range="2" target="Alchemy Laboratory"
    description="The core craft of the Alchemist: brewing reagents down into potions, tonics and other consumables. Builds directly on what Herbalism teaches about picking the right ingredient." >}}

Lv. 1 allows you to place an Alchemy Laboratory. Higher levels let you reliably discover and craft stronger potions
and elixirs.

| Lv. | Success Chance | Reliable Item Level |
| --- | -------------- | ------------------- |
| 1   | +5%            | 10                  |
| 2   | +10%           | 20                  |
| 3   | +15%           | 30                  |
| 4   | +20%           | 40                  |
| 5   | +25%           | 50                  |
| 6   | +30%           | 60                  |
| 7   | +35%           | 70                  |
| 8   | +40%           | 80                  |
| 9   | +45%           | 90                  |
| 10  | +50%           | 100+                |

Same rule as [Forge Weapon](#skill-forge-weapon): no hard cap, but every item level above the reliable one costs another
`5%` success chance. The cast only places the laboratory or opens its recipes. The brew itself takes the
[craft duration](/docs/mechanics/items/#craft-duration) of the potion's item level.

{{< /skill >}}

{{< skill name="Transmutation" maxLevel="10" requires="Alchemy Lv. 5"
    type="Active" manaCost="34" castTime="10s" cooldown="0s" range="2" target="Transmutation Workbench"
    description="The Alchemist's capstone. Where Alchemy brews what nature already provides, Transmutation reshapes mundane matter itself into the rare magically-infused resources needed for strong artifact creation and weapon refinements." >}}

Lv. 1 allows you to place a Transmutation Workbench. Higher levels unlock transmuting higher-grade infused resources.

| Lv. | Success Chance | Reliable Item Level |
| --- | -------------- | ------------------- |
| 1   | +5%            | 10                  |
| 2   | +10%           | 20                  |
| 3   | +15%           | 30                  |
| 4   | +20%           | 40                  |
| 5   | +25%           | 50                  |
| 6   | +30%           | 60                  |
| 7   | +35%           | 70                  |
| 8   | +40%           | 80                  |
| 9   | +45%           | 90                  |
| 10  | +50%           | 100+                |

Same rule as [Alchemy](#skill-alchemy): no hard cap, but every item level above the reliable one costs another `5%`
success chance. The transmutation itself takes the [craft duration](/docs/mechanics/items/#craft-duration) of the
resource's item level.

{{< /skill >}}

{{< skill name="Alchemy Mastery" maxLevel="5" requires="Alchemy Lv. 5"
    type="Passive"
    description="A deeper feel for the cauldron - reagents stretch further and brews take hold more reliably under this Alchemist's hand." >}}

| Lv. | Success Chance | Crafting Speed |
| --- | -------------- | -------------- |
| 1   | +5%            | +10%           |
| 2   | +10%           | +20%           |
| 3   | +15%           | +30%           |
| 4   | +20%           | +40%           |
| 5   | +25%           | +50%           |

{{< /skill >}}

## Survival Tree

Skills which allow the player to keep exploring the world and stay active longer far away from settlements are placed in this skill tree. Foresters live off the land, Prospectors chart what nobody has mapped yet and found towns on it, and Miners dig for what the land is hiding.

```mermaid
graph TD
    ResourceSense["Resource Sense (1-5)"]
    QuickTravel["Quick Travel (1-5)"]
    MaximizeCarryCapacity["Maximize Carry Capacity (1-5)"]
    WeatherResistance["Weather Resistance (1-5)"]
    Fishing["Fishing (1-5)"]
    Gate["5+ pts in Survival Tree"]
    Forester["Forester"]
    Prospector["Prospector"]
    Miner["Miner"]

    ResourceSense -.-> Gate
    QuickTravel -.-> Gate
    MaximizeCarryCapacity -.-> Gate
    WeatherResistance -.-> Gate
    Fishing -.-> Gate
    Gate -.->|unlocks| Forester
    Gate -.->|unlocks| Prospector
    Gate -.->|unlocks| Miner
```

<br>
{{< skill name="Quick Travel" maxLevel="5"
    type="Passive"
    description="Years on the road teach a Master and their Bestia how to cross any terrain without losing a step." >}}

| Lv. | Movement Speed |
| --- | -------------- |
| 1   | +3%            |
| 2   | +6%            |
| 3   | +9%            |
| 4   | +12%           |
| 5   | +15%           |

{{< /skill >}}

{{< skill name="Maximize Carry Capacity" maxLevel="5"
    type="Passive"
    description="Smarter packing, better-fitted saddlebags and a stronger back. Everything a Master and their Bestia can shoulder gets easier to shoulder." >}}

Raises the [weight limit](/docs/mechanics/items/#weight-limit) of the Master and of every Bestia under their command by
the same amount. It sits in the trunk because every gathering profession - Forester, Prospector and Miner alike - lives
off what it can carry home.

| Lv. | Weight Limit (Master and Bestia) |
| --- | -------------------------------- |
| 1   | +15%                             |
| 2   | +30%                             |
| 3   | +45%                             |
| 4   | +60%                             |
| 5   | +75%                             |

{{< /skill >}}

{{< skill name="Weather Resistance" maxLevel="5"
    type="Passive"
    description="Nights in the snow and noons in the desert teach a Master and their Bestia to shrug off the weather. Widens the band of [temperatures](/docs/mechanics/environment/#temperature) they can bear, on the cold side and the hot side alike." >}}

| Lv. | Temperature Tolerance |
| --- | --------------------- |
| 1   | ±3 °C                 |
| 2   | ±6 °C                 |
| 3   | ±9 °C                 |
| 4   | ±12 °C                |
| 5   | ±15 °C                |

{{< /skill >}}

{{< skill name="Resource Sense" maxLevel="5"
    type="Active" manaCost="15" castTime="2s" cooldown="60s" target="Self"
    description="The physical counterpart to a Sage's Observation: an instinct for the direction and distance of nearby physical resources - ore veins, herb patches, timber stands and game trails - long before they come into view." >}}

Each cast points to the nearest resources of every kind within the detection distance. The accuracy decides how close
the shown direction and distance are to the truth.

| Lv. | Detection Distance | Detection Accuracy |
| --- | ------------------ | ------------------ |
| 1   | 1km                | +10%               |
| 2   | 2km                | +20%               |
| 3   | 3km                | +30%               |
| 4   | 4km                | +40%               |
| 5   | 5km                | +50%               |

{{< /skill >}}

{{< skill name="Fishing" maxLevel="5"
    type="Passive"
    description="A patient hand with rod and net that pulls fish from any water worth casting into - as good on the plate as it is at the trade post." >}}

Anyone with a [fishing rod](/docs/mechanics/items/#weapon-type) can fish, but an untrained angler only catches fish and
loot up to level 10. Each rank raises the level of what a master can pull out of seas and lakes.

| Lv. | Max Fish Level |
| --- | -------------- |
| 1   | 20             |
| 2   | 40             |
| 3   | 60             |
| 4   | 80             |
| 5   | 100+           |

{{< /skill >}}

### Forester

At home wherever the trees outnumber the people. Foresters live off the land - felling timber, landing the catch of the day, and striking up a bond with Bestia most masters would call unapproachable. The ones who stay at it long enough stop merely catching Bestia and start shaping the bloodlines they come from.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [survival tree](#survival-tree)" />}}

```mermaid
graph TD
    Lumberjack["Lumberjack (1-5)"]
    Trapping["Trapping (1-5)"]
    TrackReading["Track Reading (1-5)"]
    ExpertTaming["Expert Taming (1-5)"]
    Beastfriend["Beastfriend (1-5)"]
    BloodlineStudy["Bloodline Study (1-5)"]

    Trapping -->|Lv.3| TrackReading
    ExpertTaming -->|Lv.3| Beastfriend
    Beastfriend -->|Lv.3| BloodlineStudy
```

<br>
{{< skill name="Lumberjack" maxLevel="5"
    type="Passive"
    description="An axeman's read of the forest - which trunks fell clean, which grain splits true, and how to bring both down efficiently." >}}

Level 1 lets you build a Lumberjack Cabin from a kit. Bestias can work the cabin while you are away.

| Lv. | Gathering Time Reduction | Resource Drop Chance |
| --- | ------------------------ | -------------------- |
| 1   | 10%                      | +20%                 |
| 2   | 20%                      | +40%                 |
| 3   | 30%                      | +60%                 |
| 4   | 40%                      | +80%                 |
| 5   | 50%                      | +100%                |

{{< /skill >}}

{{< skill name="Trapping" maxLevel="5"
    type="Passive"
    description="Knowing where to set a trap, how to bait it and when to spring it. Mana dust and patience do the rest." >}}

Raises the catch chance of every [Bestia trap](/docs/mechanics/bestia/#catching-bestias) the master throws. Anyone can
throw a Bestia trap; this skill only makes it hold better. The traps themselves are made with
[Carpentry](#skill-carpentry).

| Lv. | Catch Chance |
| --- | ------------ |
| 1   | +6%          |
| 2   | +12%         |
| 3   | +18%         |
| 4   | +24%         |
| 5   | +30%         |

{{< /skill >}}

{{< skill name="Track Reading" maxLevel="5" requires="Trapping Lv. 3"
    type="Active" manaCost="8" castTime="Instant" cooldown="0s" range="4" target="Ground"
    description="An eye trained to the forest floor, reading the tracks a Bestia or player left behind long after they've moved on." >}}

Reads what has walked over a patch of ground: how many passed, and how fresh the trail is. Ground that takes no print -
rock, paving, ice - keeps no tracks at all, at any rank. Each rank searches a wider patch and tells more about the
trail.

| Lv. | Search Radius | Also Reads                  |
| --- | ------------- | --------------------------- |
| 1   | 3 tiles       | -                           |
| 2   | 6 tiles       | Which way the trail led     |
| 3   | 9 tiles       | What made it, and its level |
| 4   | 12 tiles      | The name of another master  |
| 5   | 15 tiles      | -                           |

{{< /skill >}}

{{< skill name="Expert Taming" maxLevel="5"
    type="Passive"
    description="A Forester's patient hand with wild Bestia rubs off on them, sharpening how fast they learn and how little they need to keep going out in the open." >}}

| Lv. | EXP Gain | Stamina Loss Reduction |
| --- | -------- | ---------------------- |
| 1   | +5%      | 2%                     |
| 2   | +10%     | 4%                     |
| 3   | +15%     | 6%                     |
| 4   | +20%     | 8%                     |
| 5   | +25%     | 10%                    |

{{< /skill >}}

{{< skill name="Beastfriend" maxLevel="5" requires="Expert Taming Lv. 3"
    type="Passive"
    description="A lifetime studying Bestia behavior down to the last twitch of an ear, making both the taming and the trapping of them that much easier." >}}

| Lv. | Tame Chance |
| --- | ----------- |
| 1   | +5%         |
| 2   | +10%        |
| 3   | +15%        |
| 4   | +20%        |
| 5   | +25%        |

{{< /skill >}}

{{< skill name="Bloodline Study" maxLevel="5" requires="Beastfriend Lv. 3"
    type="Passive"
    description="Knowing a Bestia well enough to tame it is one thing. Knowing which pair of them is worth putting in a Breeder, and why the last clutch came out the way it did, is another. The Forester's capstone." >}}

Applies to every [Breeder](/docs/mechanics/bestia/#breeding) the master owns.

The time reduction stacks with breeder upgrades, feed and buffs, and counts against the same **50% floor** - it lets a
modest setup reach the cap instead of raising it. The dominant-IV column is the part that cannot be bought: at Lv. 4 a
clutch draws a fourth dominant individual value, so a bloodline improves on four stats per generation rather than three.

| Lv. | Breeding and Hatch Time Reduction | Dominant IVs per Clutch |
| --- | --------------------------------- | ----------------------- |
| 1   | 5%                                | 3                       |
| 2   | 10%                               | 3                       |
| 3   | 15%                               | 3                       |
| 4   | 20%                               | 4                       |
| 5   | 25%                               | 4                       |

{{< /skill >}}

### Prospector

Half surveyor, half treasure hunter. Prospectors chart unclaimed land, found settlements on it, feel out resources long before anyone else arrives, and travel further than sense would recommend.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [survival tree](#survival-tree)" />}}

```mermaid
graph TD
    ResourceSense[/"Resource Sense (Survival Tree)"/]
    Cartography["Cartography (1-5)"]
    WeatherSense["Weather Sense (1-3)"]
    Founder["Founder (1)"]

    ResourceSense -->|Lv.1| Cartography
    Cartography -->|Lv.2| WeatherSense
    Cartography -->|Lv.3| Founder
```

<br>
{{< skill name="Cartography" maxLevel="5" requires="Resource Sense Lv. 1"
    type="Active" manaCost="50" castTime="30s" cooldown="None" range="0" target="Terrain"
    description="Enables the player to chart unexplored land, revealing terrain that can be shared, traded on, or built on. See [World Exploration](/docs/mechanics/world-exploration/#cartography) for how the surveying minigame plays out." >}}
Each level reduces the difficulty of surveying unexplored land by `10`. The minigame on that page is a draft; its details
are still to be decided.
{{< /skill >}}

{{< skill name="Weather Sense" maxLevel="3" requires="Cartography Lv. 2"
    type="Passive"
    description="Charting the same valley through a dozen seasons teaches a Prospector to read the sky above it. An instinct for what the wind is about to do, well before the storm arrives, and for where the mana runs thick or thin." >}}
Level 1 shows you the current wind direction and speed. See [Weather](/docs/mechanics/environment/#weather) for what each
front does to the world.

It also reads the [mana in the land](/docs/mechanics/environment/#mana-concentration). Level 1 shows the mana
concentration where you stand. Higher levels point to the nearest stronger and weaker mana fields.

{{< alert context="info" text="To do: give the weather types more effects of their own, so that seeing them coming matters more and this skill gains weight." />}}

| Lv. | Forecast Range | Mana Field Range |
| --- | -------------- | ---------------- |
| 1   | 5 min          | Where you stand  |
| 2   | 10 min         | 1km              |
| 3   | 15 min         | 2km              |

{{< /skill >}}

{{< skill name="Founder" maxLevel="1" requires="Cartography Lv. 3"
    type="Active" manaCost="100" castTime="60s" cooldown="24h" range="0" target="Ground"
    description="The founding rite that plants a city sign in the ground and calls a settlement into being around it." >}}

A Prospector charts the land first and then claims it. This skill only starts a settlement. It does not grow one - a
town grows because players keep building inside it, and no further skill gates that.

Only one settlement can be active at any time. You must destroy the settlement before you can place a new one. Only
inactive settlements can be destroyed, which means no functional building (post office, trade post, etc.) may be left
inside the settlement's sphere of influence.

{{< alert context="info" text="To do: player settlements need a design of their own. The [settlements](/docs/mechanics/settlements/) page only covers the towns the world generates." />}}

{{< /skill >}}

### Miner

If it's buried, a Miner will find a way to it. Equal parts pickaxe and stubbornness, this path turns raw earth - literally - into opportunity.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [survival tree](#survival-tree)" />}}

```mermaid
graph TD
    Mining["Mining (1-5)"]
    GemCutting["Gem Cutting (1-5)"]
    RichVeins["Rich Veins (1-5)"]
    ResourceSonar["Resource Sonar (1-3)"]

    Mining -->|Lv.3| GemCutting
    Mining -->|Lv.3| RichVeins
    RichVeins -->|Lv.3| ResourceSonar
```

<br>
{{< skill name="Mining" maxLevel="5"
    type="Passive"
    description="A pickaxe, a steady lamp, and the nose for where the rock is worth breaking." >}}

Anyone with a [pickaxe](/docs/mechanics/items/#weapon-type) can mine, but an untrained miner only gets resources up to
level 10. Level 1 lets you craft a pickaxe and build a Mining Shaft from a kit. Bestias can work the shaft while you are
away.

| Lv. | Mining Time Reduction | Max Resource Level |
| --- | --------------------- | ------------------ |
| 1   | 10%                   | 20                 |
| 2   | 20%                   | 40                 |
| 3   | 30%                   | 60                 |
| 4   | 40%                   | 80                 |
| 5   | 50%                   | 100+               |

{{< /skill >}}

{{< skill name="Gem Cutting" maxLevel="5" requires="Mining Lv. 3"
    type="Active" manaCost="20" castTime="10s" cooldown="0s" range="2" target="Gem Cut Station"
    description="Turns the rough gemstones a Miner digs up into cut stones fit for an Artificer's socket or a Trader's sale." >}}

Level 1 allows you to place a Gem Cut Station. The cast only places the station or opens its recipes. The cutting itself
takes the [craft duration](/docs/mechanics/items/#craft-duration) of the gem's item level. A failed cut shatters the gem.

| Lv. | Success Chance | Reliable Gem Level |
| --- | -------------- | ------------------ |
| 1   | +8%            | 20                 |
| 2   | +16%           | 40                 |
| 3   | +24%           | 60                 |
| 4   | +32%           | 80                 |
| 5   | +40%           | 100+               |

Same rule as [Forge Weapon](#skill-forge-weapon): no hard cap, but every gem level above the reliable one costs another
`5%` success chance.

{{< /skill >}}

{{< skill name="Rich Veins" maxLevel="5" requires="Mining Lv. 3"
    type="Passive"
    description="A Miner learns to follow a vein instead of hacking at it, and the rock gives up more for every swing." >}}

Each ore or gem block the master mines has a chance to drop a second piece.

| Lv. | Second Piece Chance |
| --- | ------------------- |
| 1   | 10%                 |
| 2   | 20%                 |
| 3   | 30%                 |
| 4   | 40%                 |
| 5   | 50%                 |

{{< /skill >}}

{{< skill name="Resource Sonar" maxLevel="3" requires="Rich Veins Lv. 3"
    type="Passive"
    description="The Miner's capstone: a feel for what's underfoot precise enough to map a shaft before the first swing of the pick." >}}
Can sense ore and gem deposits through solid rock.

| Lv. | Sense Range |
| --- | ----------- |
| 1   | 5m          |
| 2   | 10m         |
| 3   | 15m         |

{{< /skill >}}

## Scholar Tree

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
then where it is, and finally what it actually does. Local [mana concentration](/docs/mechanics/environment/#mana-concentration)
adds to the range in a mana-rich region and eats into it in a drained one. A target hidden under
[Suppress Aura](#skill-suppress-aura) stays silent.

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
    description="A pulse of second sight that peels back concealment - hidden traps, camouflaged Hunters and cloaked Assassins stand out for what they are. Useful to any Scholar, whether they're scrying old ruins or walking a party into an ambush." >}}

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

### Priest

Priests channel mana into blessings that keep a party alive - restoring health, lifting curses, and bolstering the vitality of Bestia out in the field.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [scholar tree](#scholar-tree)" />}}

```mermaid
graph TD
    MagicSense[/"Magic Sense (Scholar Tree)"/]

    Heal["Heal (1-10)"]

    Suffragium["Suffragium (1-3)"]
    Gloria["Gloria (1-3)"]

    AquaBenedicta["Aqua Benedicta (1)"]
    StatusRecovery["Status Recovery (1)"]
    Aspersio["Aspersio (1-3)"]

    Blessing["Blessing (1-10)"]
    IncreaseAGI["Increase AGI (1-5)"]
    DecreaseAGI["Decrease AGI (1-3)"]
    KyrieEleison["Kyrie Eleison (1-3)"]
    ImpositioManus["Impositio Manus (1-3)"]
    Pneuma["Pneuma (1)"]
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

    Heal -->|Lv.2| StatusRecovery
    Heal -->|Lv.3| Blessing

    StatusRecovery -->|Lv.1| AquaBenedicta
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
    description="A quiet benediction that lets a crafter's hands find the better cut. Every item the party starts crafting while it holds rolls its random stats with better odds." >}}

The bonus is added to the chance of every [random stat](/docs/mechanics/items/#forging-and-random-stats) slot and socket of the item.

| Lv. | Random Stat Chance | Duration |
| --- | ------------------ | -------- |
| 1   | +5%                | 30s      |
| 2   | +10%               | 60s      |
| 3   | +15%               | 90s      |

{{< /skill >}}

{{< skill name="Aqua Benedicta" maxLevel="1" requires="Status Recovery Lv. 1"
    type="Active" manaCost="12" castTime="3s" cooldown="5s" range="0" target="Self"
    description="The rite of blessing plain water into [Holy Water](/docs/mechanics/item-list/#holy-water). User must be standing in water, consuming an [Empty Bottle](/docs/mechanics/item-list/#empty-bottle) in the process. Holy Water is the reagent behind Aspersio and several higher rites." >}}
{{< /skill >}}

{{< skill name="Blessing" maxLevel="10" requires="Heal Lv. 3"
    type="Active" manaCost="28" castTime="2s" cooldown="None" duration="per Lv." range="9" target="Party"
    description="A benediction that steadies body and mind, raising a party's core stats for a short while." >}}

On an Undead or Demon target it turns into a curse: it halves DEX and INT instead.

| Lv. | STR/INT/DEX | HIT | Duration |
| --- | ----------- | --- | -------- |
| 1   | +1          | +2  | 60s      |
| 2   | +2          | +4  | 80s      |
| 3   | +3          | +6  | 100s     |
| 4   | +4          | +8  | 120s     |
| 5   | +5          | +10 | 140s     |
| 6   | +6          | +12 | 160s     |
| 7   | +7          | +14 | 180s     |
| 8   | +8          | +16 | 200s     |
| 9   | +9          | +18 | 220s     |
| 10  | +10         | +20 | 240s     |

{{< /skill >}}

{{< skill name="Increase AGI" maxLevel="5"
    type="Active" manaCost="20" castTime="Instant" cooldown="None" duration="per Lv." range="9" target="Ally"
    description="Lightens a target's limbs with borrowed haste, quickening step and swing alike." >}}
Grants a flat `+15%` Movement Speed at any level, plus the table below. The bonus only lasts while the buff holds, and
it **stacks** with the permanent [Quick Travel](#skill-quick-travel), so a well-buffed traveller adds both.

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

{{< skill name="Status Recovery" maxLevel="1" requires="Heal Lv. 2"
    type="Active" manaCost="20" castTime="Instant" cooldown="10s" range="9" target="Ally"
    description="Clears the fog from a target's mind - lifting [Blind, Confused and Feared](/docs/mechanics/statusvalues/#status-effects) in a single rite." >}}

{{< alert context="info" text="To do: effects on the body, such as Stun, Frozen, Stone and Poison, need a cure of their own." />}}

{{< /skill >}}

{{< skill name="Aspersio" maxLevel="3" requires="Aqua Benedicta Lv. 1"
    type="Active" manaCost="22" castTime="2s" cooldown="10s" duration="per Lv." range="2" target="Ally"
    description="Anoints a weapon with Holy Water, temporarily imbuing its strikes with the holy element. Consumes one [Holy Water](/docs/mechanics/item-list/#holy-water) per cast." >}}

| Lv. | Duration |
| --- | -------- |
| 1   | 60s      |
| 2   | 120s     |
| 3   | 180s     |

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

### Trader

Coin has its own kind of magic. Traders read markets instead of mana flows, linking auction houses together, minting the coin everyone else trades in, and looking out for goods that might otherwise walk off on their own.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [scholar tree](#scholar-tree)" />}}

```mermaid
graph TD
    Scavenger["Scavenger (1-10)"]
    TradePostOwner["Trade Post Owner (1-5)"]
    Minting["Minting (1-5)"]
    TradeAgreement["Trade Agreement (1-5)"]
    HonorableCitizen["Honorable Citizen (1-5)"]

    Scavenger -->|Lv.3| Minting
    TradePostOwner -->|Lv.3| TradeAgreement

    Minting -->|Lv.2| HonorableCitizen
    TradeAgreement -->|Lv.1| HonorableCitizen
```

<br>
{{< skill name="Scavenger" maxLevel="10"
    type="Passive"
    description="A scrapper's eye for what's still worth keeping - coaxes more usable components out of anything broken down for parts." >}}

| Lv. | Recycle Chance |
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

{{< skill name="Minting" maxLevel="5" requires="Scavenger Lv. 3"
    type="Active" manaCost="15" castTime="10s" cooldown="0s" range="2" target="Mint"
    description="The final step between a fistful of raw gold and coin that actually spends. Allows the master to mint gold bars into gold coins. See [Currency](/docs/mechanics/economy-trade/#currency) for how the world's money supply is minted from mined gold." >}}

Level 1 allows you to place a Mint. The cast only places the mint or opens its recipes. The minting itself takes the
[craft duration](/docs/mechanics/items/#craft-duration) of the bar.

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
[Building an Auction House](/docs/mechanics/economy-trade/#building-an-auction-house).

| Lv. | Auction Houses | Max Owner Fee |
| --- | -------------- | ------------- |
| 1   | 1              | 5%            |
| 2   | 2              | 10%           |
| 3   | 3              | 15%           |
| 4   | 4              | 20%           |
| 5   | 5              | 25%           |

{{< /skill >}}

{{< skill name="Trade Agreement" maxLevel="5" requires="Trade Post Owner Lv. 3"
    type="Active" manaCost="30" castTime="5s" cooldown="60s" range="10" target="Player"
    description="Weaves this Trader's auction house into those of other consenting players, merging their listings into a single, wider [marketplace](/docs/mechanics/economy-trade/#linking-auction-houses)." >}}
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

### Sage

Books, wards and long nights spent staring into scrying bowls. Sages study magic itself - discovering it, inscribing it, binding it, and eventually learning to fold distance in on itself with teleportation and portals.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [scholar tree](#scholar-tree)" />}}

```mermaid
graph TD
    MagicSense[/"Magic Sense (Scholar Tree)"/]
    Observation[/"Observation (Scholar Tree)"/]
    SpellTraining["Spell Training (1-10)"]
    FreeCast["Free Cast (1-5)"]
    Scry["Scry (1-5)"]
    Dispel["Dispel (1-5)"]
    SpellInscription["Spell Inscription (1-10)"]
    SpellBinding["Spell Binding (1-10)"]
    Teleport["Teleport (1-2)"]
    WarpPortal["Warp Portal (1-5)"]
    MagicRod["Magic Rod (1-3)"]
    ManaDrain["Mana Drain (1-3)"]
    ManaSwap["Mana Swap (1-3)"]
    LandProtector["Land Protector (1-3)"]
    EndowFire["Endow Fire (1-3)"]
    EndowIce["Endow Ice (1-3)"]
    EndowWind["Endow Wind (1-3)"]
    EndowEarth["Endow Earth (1-3)"]

    MagicSense -->|Lv.3| SpellTraining
    Observation -->|Lv.3| Scry
    SpellTraining -->|Lv.2| Dispel
    SpellTraining -->|Lv.3| SpellInscription
    SpellInscription -->|Lv.3| SpellBinding

    Scry -->|Lv.5| Teleport
    Teleport -->|Lv.2| WarpPortal

    Dispel -->|Lv.2| MagicRod
    MagicRod -->|Lv.1| ManaDrain
    ManaDrain -->|Lv.2| ManaSwap
    MagicRod -->|Lv.2| LandProtector

    FreeCast -->|Lv.2| EndowFire
    FreeCast -->|Lv.2| EndowIce
    FreeCast -->|Lv.2| EndowWind
    FreeCast -->|Lv.2| EndowEarth
```

<br>

{{< skill name="Spell Training" maxLevel="10" requires="Magic Sense Lv. 3"
    type="Active" manaCost="25" castTime="10s" cooldown="None" range="2" target="Bestia"
    description="Trains a spell from a scroll into a Bestia's memory, the first step of every Sage's education." >}}

Consumes the scroll, also when the training fails. The base chance depends on the level of the spell and uses the same
table as [Spell Inscription](#skill-spell-inscription). Each level adds to it.

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

Success chance is based on skill level and the target's SMDEF, with a base chance of `(50 + 10 * SkillLv)%`. Requires 1 [Yellow Mana Crystal](/docs/mechanics/item-list/#yellow-mana-crystal) per cast.

{{< alert context="info" text="To do: decide whether Dispel is how a [ward stone](/docs/mechanics/pvp/#protected-zones) can be countered. The honor table already lists dispelling one." />}}

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

{{< skill name="Mana Swap" maxLevel="3" requires="Mana Drain Lv. 2"
    type="Active" manaCost="45" castTime="3s" cooldown="60s" range="6" target="Enemy"
    description="A gamble of a rite that trades the caster's own pool of mana for the target's, wholesale. Higher skill makes the exchange more likely to take hold." >}}

| Lv. | Swap Success Chance |
| --- | ------------------- |
| 1   | 33%                 |
| 2   | 66%                 |
| 3   | 100%                |

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

{{< skill name="Spell Inscription" maxLevel="10" requires="Spell Training Lv. 3"
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

{{< skill name="Spell Binding" maxLevel="10" requires="Spell Inscription Lv. 3"
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

{{< skill name="Endow Fire" maxLevel="3" requires="Free Cast Lv. 2"
    type="Active" manaCost="28" castTime="2s" cooldown="5s" duration="per Lv." range="5" target="Ally"
    description="Temporarily infuses an ally's weapon with the fire element, so its strikes burn as well as bite. Consumes a [Blue Mana Crystal](/docs/mechanics/item-list/#blue-mana-crystal) to carry the charge." >}}

The weapon takes on the element, so the [element table](/docs/mechanics/bestia-design/#7-element-size-and-defences) applies. The bonus damage comes on top.

| Lv. | Duration | Bonus Fire Damage |
| --- | -------- | ----------------- |
| 1   | 60s      | +5%               |
| 2   | 120s     | +10%              |
| 3   | 180s     | +15%              |

{{< /skill >}}

{{< skill name="Endow Ice" maxLevel="3" requires="Free Cast Lv. 2"
    type="Active" manaCost="28" castTime="2s" cooldown="5s" duration="per Lv." range="5" target="Ally"
    description="Temporarily infuses an ally's weapon with the water element, wreathing each strike in biting cold. Consumes a [Blue Mana Crystal](/docs/mechanics/item-list/#blue-mana-crystal) to carry the charge." >}}

The weapon takes on the element, so the [element table](/docs/mechanics/bestia-design/#7-element-size-and-defences) applies. The bonus damage comes on top.

| Lv. | Duration | Bonus Water Damage |
| --- | -------- | ------------------ |
| 1   | 60s      | +5%                |
| 2   | 120s     | +10%               |
| 3   | 180s     | +15%               |

{{< /skill >}}

{{< skill name="Endow Wind" maxLevel="3" requires="Free Cast Lv. 2"
    type="Active" manaCost="28" castTime="2s" cooldown="5s" duration="per Lv." range="5" target="Ally"
    description="Temporarily infuses an ally's weapon with the wind element, so its strikes crack like lightning. Consumes a [Blue Mana Crystal](/docs/mechanics/item-list/#blue-mana-crystal) to carry the charge." >}}

The weapon takes on the element, so the [element table](/docs/mechanics/bestia-design/#7-element-size-and-defences) applies. The bonus damage comes on top.

| Lv. | Duration | Bonus Wind Damage |
| --- | -------- | ----------------- |
| 1   | 60s      | +5%               |
| 2   | 120s     | +10%              |
| 3   | 180s     | +15%              |

{{< /skill >}}

{{< skill name="Endow Earth" maxLevel="3" requires="Free Cast Lv. 2"
    type="Active" manaCost="28" castTime="2s" cooldown="5s" duration="per Lv." range="5" target="Ally"
    description="Temporarily infuses an ally's weapon with the earth element, so its strikes land with the weight of stone. Consumes a [Blue Mana Crystal](/docs/mechanics/item-list/#blue-mana-crystal) to carry the charge." >}}

The weapon takes on the element, so the [element table](/docs/mechanics/bestia-design/#7-element-size-and-defences) applies. The bonus damage comes on top.

| Lv. | Duration | Bonus Earth Damage |
| --- | -------- | ------------------ |
| 1   | 60s      | +5%                |
| 2   | 120s     | +10%               |
| 3   | 180s     | +15%               |

{{< /skill >}}

## Warrior Tree

Where the other trees build, gather and study, the Warrior tree is built to fight. Wizards burn the battlefield down with elemental and arcane fury, Assassins strike from hiding with poisoned blades, and Knights hold the front line in plate.

{{< alert context="warning" text="Wizard, Assassin and Knight ship with the initial release. Brawler, Hunter, Bard and Dancer are designed but parked - their skills are kept in this page as a comment so the work is not lost. No parked tree counts against any rank budget until it is unparked." />}}

```mermaid
graph TD
    Endure["Endure (1)"]
    IronSkin["Iron Skin (1-5)"]
    MagicArmor["Magic Armor (1-3)"]
    Meditation["Meditation (1-5)"]
    Gate["5+ pts in Warrior Tree"]
    Wizard["Wizard"]
    %% Brawler(("Brawler")) %% parked
    %% Hunter(("Hunter")) %% parked
    Assassin["Assassin"]
    Knight["Knight"]
    %% Bard(("Bard")) %% parked
    %% Dancer(("Dancer")) %% parked

    Endure -.-> Gate
    IronSkin -.-> Gate
    MagicArmor -.-> Gate
    Meditation -.-> Gate
    Gate -.->|unlocks| Wizard
    %% Gate -.->|unlocks| Brawler
    %% Gate -.->|unlocks| Hunter
    Gate -.->|unlocks| Assassin
    Gate -.->|unlocks| Knight
    %% Gate -.->|unlocks| Bard
    %% Gate -.->|unlocks| Dancer
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

When active, each hit costs 2% of the owner's current mana. When the mana drops below 20% the buff is cancelled.

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

### Wizard

Fire, water, wind, earth, and the deeper currents of holy and dark magic - Wizards bend all of it into a weapon, at the cost of the armor most masters would rather keep.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [warrior tree](#warrior-tree)" />}}

```mermaid
graph TD
    FireBolt["Fire Bolt (1-10)"]
    IceBolt["Ice Bolt (1-10)"]
    ThunderBolt["Thunder Bolt (1-10)"]
    EarthSpike["Earth Spike (1-10)"]
    SpiritualMastery["Spiritual Mastery (1-5)"]

    FireWall["Fire Wall (1-5)"]
    MeteorStorm["Meteor Storm (1-5)"]
    SturmGust["Storm Gust (1-5)"]
    WaterBall["Water Ball (1-5)"]
    FrostNova["Frost Nova (1-5)"]
    Quagmire["Quagmire (1-5)"]
    ThunderStorm["Thunder Storm (1-5)"]
    Earthquake["Earthquake (1-5)"]

    FrostOrb["Frost Orb (1-5)"]
    ThunderOfJupiter["Thunder of Jupiter (1-5)"]

    MagicArmor[/"Magic Armor (Warrior Tree)"/]
    SafetyWall["Safety Wall (1-5)"]
    StoneCurse["Stone Curse (1-5)"]
    SuppressMagic["Suppress Magic (1-5)"]
    SuppressAura["Suppress Aura (1-3)"]

    SoulBreak["Soul Break (1-5)"]
    Mindbreak["Mindbreak (1-5)"]

    FireBolt -->|Lv.3| FireWall
    FireBolt -->|Lv.10| MeteorStorm
    EarthSpike -->|Lv.3| Earthquake

    IceBolt -->|Lv.1| FrostNova
    IceBolt -->|Lv.8| WaterBall
    IceBolt -->|Lv.10| SturmGust
    FrostNova -->|Lv.2| FrostOrb

    ThunderBolt -->|Lv.2| Quagmire
    ThunderBolt -->|Lv.3| ThunderStorm
    ThunderStorm -->|Lv.3| ThunderOfJupiter

    MagicArmor -->|Lv.3| SafetyWall
    SafetyWall -->|Lv.3| StoneCurse
    StoneCurse -->|Lv.2| SuppressMagic
    SuppressMagic -->|Lv.2| SuppressAura

    SpiritualMastery -->|Lv.2| SoulBreak
    SoulBreak -->|Lv.3| Mindbreak

    %% Layout only: `~~~` renders as an invisible link and implies no requirement.
    %% It ranks the ward/spirit branch below the elemental chains so it forms its
    %% own row instead of widening the diagram by another two columns.
    FrostOrb ~~~ MagicArmor
    ThunderOfJupiter ~~~ SpiritualMastery
```

<br>

{{< skill name="Fire Bolt" maxLevel="10"
    type="Active" manaCost="18" castTime="2.0s" cooldown="None" range="9" target="Enemy"
    description="A quick bolt of flame hurled at a single target. The first spell most Wizards ever learn, and the one they cast the most often." >}}

| Lv. | MATK  | Cast Time Reduction |
| --- | ----- | ------------------- |
| 1   | +10%  | 0.1s                |
| 2   | +20%  | 0.2s                |
| 3   | +30%  | 0.3s                |
| 4   | +40%  | 0.4s                |
| 5   | +50%  | 0.5s                |
| 6   | +60%  | 0.6s                |
| 7   | +70%  | 0.7s                |
| 8   | +80%  | 0.8s                |
| 9   | +90%  | 0.9s                |
| 10  | +100% | 1.0s                |

{{< /skill >}}

{{< skill name="Ice Bolt" maxLevel="10"
    type="Active" manaCost="18" castTime="2.0s" cooldown="None" range="9" target="Enemy"
    description="A shard of hardened cold flung at a single target - the water-elemental counterpart to Fire Bolt." >}}

| Lv. | MATK  | Cast Time Reduction |
| --- | ----- | ------------------- |
| 1   | +10%  | 0.1s                |
| 2   | +20%  | 0.2s                |
| 3   | +30%  | 0.3s                |
| 4   | +40%  | 0.4s                |
| 5   | +50%  | 0.5s                |
| 6   | +60%  | 0.6s                |
| 7   | +70%  | 0.7s                |
| 8   | +80%  | 0.8s                |
| 9   | +90%  | 0.9s                |
| 10  | +100% | 1.0s                |

{{< /skill >}}

{{< skill name="Thunder Bolt" maxLevel="10"
    type="Active" manaCost="18" castTime="2.0s" cooldown="None" range="9" target="Enemy"
    description="A crack of lightning called down onto a single target - the wind-elemental counterpart to Fire Bolt." >}}

| Lv. | MATK  | Cast Time Reduction |
| --- | ----- | ------------------- |
| 1   | +10%  | 0.1s                |
| 2   | +20%  | 0.2s                |
| 3   | +30%  | 0.3s                |
| 4   | +40%  | 0.4s                |
| 5   | +50%  | 0.5s                |
| 6   | +60%  | 0.6s                |
| 7   | +70%  | 0.7s                |
| 8   | +80%  | 0.8s                |
| 9   | +90%  | 0.9s                |
| 10  | +100% | 1.0s                |

{{< /skill >}}

{{< skill name="Earth Spike" maxLevel="10"
    type="Active" manaCost="18" castTime="2.0s" cooldown="None" range="9" target="Enemy"
    description="A jagged spar of stone erupts beneath a single target - the earth-elemental counterpart to Fire Bolt." >}}

| Lv. | MATK  | Cast Time Reduction |
| --- | ----- | ------------------- |
| 1   | +10%  | 0.1s                |
| 2   | +20%  | 0.2s                |
| 3   | +30%  | 0.3s                |
| 4   | +40%  | 0.4s                |
| 5   | +50%  | 0.5s                |
| 6   | +60%  | 0.6s                |
| 7   | +70%  | 0.7s                |
| 8   | +80%  | 0.8s                |
| 9   | +90%  | 0.9s                |
| 10  | +100% | 1.0s                |

{{< /skill >}}

{{< skill name="Spiritual Mastery" maxLevel="5"
    type="Passive"
    description="A deeper communion with the currents beyond the elements, sharpening every spell drawn from Holy or Dark mana." >}}

| Lv. | Damage/Healing |
| --- | -------------- |
| 1   | +5%            |
| 2   | +10%           |
| 3   | +15%           |
| 4   | +20%           |
| 5   | +25%           |

{{< /skill >}}

{{< skill name="Safety Wall" maxLevel="5" requires="Magic Armor Lv. 3"
    type="Active" manaCost="30" castTime="1s" cooldown="10s" duration="per Lv." range="6" target="Ally"
    description="Conjures a shimmering barrier of solidified mana in front of a target. It blocks incoming physical projectiles and melee strikes until it has absorbed enough hits or its duration runs out." >}}

| Lv. | Hits Absorbed | Duration |
| --- | ------------- | -------- |
| 1   | 2             | 20s      |
| 2   | 4             | 28s      |
| 3   | 6             | 36s      |
| 4   | 8             | 44s      |
| 5   | 10            | 52s      |

{{< /skill >}}

{{< skill name="Stone Curse" maxLevel="5" requires="Safety Wall Lv. 3"
    type="Active" manaCost="25" castTime="1s" cooldown="15s" duration="per Lv." range="6" target="Enemy"
    description="Encases a target in solid stone, applying [Petrify](/docs/mechanics/statusvalues/#status-effects) where they stand. Requires 1 [Red Mana Crystal](/docs/mechanics/item-list/#red-mana-crystal) per cast." >}}

| Lv. | Petrify Chance | Duration |
| --- | -------------- | -------- |
| 1   | 20%            | 5s       |
| 2   | 30%            | 8s       |
| 3   | 40%            | 11s      |
| 4   | 50%            | 14s      |
| 5   | 60%            | 17s      |

{{< /skill >}}

{{< skill name="Suppress Magic" maxLevel="5" requires="Stone Curse Lv. 2"
    type="Active" manaCost="30" castTime="Instant" cooldown="20s" duration="per Lv." range="9" target="Enemy"
    description="A ward of counter-mana thrown over a target mid-incantation, interrupting whatever spell they were weaving and leaving them [Silenced](/docs/mechanics/statusvalues/#status-effects) for a short time after." >}}

| Lv. | Interrupt Chance | Silence Duration |
| --- | ---------------- | ---------------- |
| 1   | 20%              | 3s               |
| 2   | 30%              | 4s               |
| 3   | 40%              | 5s               |
| 4   | 50%              | 6s               |
| 5   | 60%              | 7s               |

{{< /skill >}}

{{< skill name="Suppress Aura" maxLevel="3" requires="Suppress Magic Lv. 2"
    type="Active" manaCost="35" castTime="3s" cooldown="30s" duration="5 min" range="2" target="Any"
    description="Cast on an object, Bestia or Master to mute the mana clinging to it, making it invisible towards magic detection - wards, Magic Sense, and similar scrying senses." >}}

| Lv. | Mana Suppression |
| --- | ---------------- |
| 1   | 40%              |
| 2   | 70%              |
| 3   | 100%             |

{{< /skill >}}

{{< skill name="Fire Wall" maxLevel="5" requires="Fire Bolt Lv. 3"
    type="Active" manaCost="35" castTime="2s" cooldown="10s" duration="20s" range="6" target="Ground"
    description="Conjures a wall of roaring flame across a line of tiles. Anything that tries to push through is burned and shoved back the way it came." >}}

| Lv. | MATK (per tick) | Knockback |
| --- | --------------- | --------- |
| 1   | +10%            | 1 tile    |
| 2   | +20%            | 1 tile    |
| 3   | +30%            | 2 tiles   |
| 4   | +40%            | 2 tiles   |
| 5   | +50%            | 3 tiles   |

{{< /skill >}}

{{< skill name="Meteor Storm" maxLevel="5" requires="Fire Bolt Lv. 10"
    type="Active" manaCost="70" castTime="6s" cooldown="30s" duration="10s" range="12" target="Ground"
    description="Calls down a rain of blazing meteors onto an area, scorching everything caught beneath it over and over as it falls." >}}

| Lv. | MATK (per meteor) | Meteor Count |
| --- | ----------------- | ------------ |
| 1   | +10%              | 3            |
| 2   | +20%              | 4            |
| 3   | +30%              | 5            |
| 4   | +40%              | 6            |
| 5   | +50%              | 7            |

{{< /skill >}}

{{< skill name="Storm Gust" maxLevel="5" requires="Ice Bolt Lv. 10"
    type="Active" manaCost="65" castTime="5s" cooldown="25s" duration="10s" range="12" target="Ground"
    description="A freezing gale that batters an area with repeated waves of ice, each one carrying a chance to freeze anything caught in the flurry solid." >}}

| Lv. | MATK (per tick) | Freeze Chance (per tick) |
| --- | --------------- | ------------------------ |
| 1   | +8%             | 5%                       |
| 2   | +16%            | 10%                      |
| 3   | +24%            | 15%                      |
| 4   | +32%            | 20%                      |
| 5   | +40%            | 25%                      |

{{< /skill >}}

{{< skill name="Water Ball" maxLevel="5" requires="Ice Bolt Lv. 8"
    type="Active" manaCost="45" castTime="3s" cooldown="15s" range="9" target="Enemy"
    description="Gathers the water in a 5x5 area around the caster into a single crashing orb hurled at a target. The caster must be standing in water for the spell to draw from, and it strikes once for every water tile it manages to pull from around them - up to 25 hits at once." >}}

| Lv. | Hits per Cast |
| --- | ------------- |
| 1   | 5             |
| 2   | 10            |
| 3   | 15            |
| 4   | 20            |
| 5   | 25            |

{{< /skill >}}

{{< skill name="Frost Nova" maxLevel="5" requires="Ice Bolt Lv. 1"
    type="Active" manaCost="40" castTime="2s" cooldown="15s" range="per Lv." target="Self"
    description="A burst of subzero cold erupts outward from the caster, freezing anything caught too close." >}}

| Lv. | Radius | Freeze Chance |
| --- | ------ | ------------- |
| 1   | 2m     | 15%           |
| 2   | 3m     | 25%           |
| 3   | 4m     | 35%           |
| 4   | 5m     | 45%           |
| 5   | 6m     | 55%           |

{{< /skill >}}

{{< skill name="Quagmire" maxLevel="5" requires="Thunder Bolt Lv. 2"
    type="Active" manaCost="30" castTime="2s" cooldown="20s" duration="30s" range="9" target="Ground"
    description="Turns the ground in an area into thick, clinging mud. Any AGI-increasing buff on someone caught in it is stripped away, and their own AGI and DEX are dragged down for as long as they remain inside." >}}
Regardless of level, the reduction is capped at `25%` against other Bestia Masters and `50%` against wild Bestia and monsters.

| Lv. | AGI/DEX Reduction (uncapped) |
| --- | ---------------------------- |
| 1   | 10%                          |
| 2   | 20%                          |
| 3   | 30%                          |
| 4   | 40%                          |
| 5   | 50%                          |

{{< /skill >}}

{{< skill name="Thunder Storm" maxLevel="5" requires="Thunder Bolt Lv. 3"
    type="Active" manaCost="60" castTime="4s" cooldown="20s" duration="8s" range="12" target="Ground"
    description="Wind churns into a raging storm overhead, calling down lightning bolts across the whole area at random." >}}

| Lv. | MATK (per strike) | Strike Count |
| --- | ----------------- | ------------ |
| 1   | +10%              | 3            |
| 2   | +20%              | 4            |
| 3   | +30%              | 5            |
| 4   | +40%              | 6            |
| 5   | +50%              | 7            |

{{< /skill >}}

{{< skill name="Earthquake" maxLevel="5" requires="Earth Spike Lv. 3"
    type="Active" manaCost="60" castTime="4s" cooldown="25s" duration="8s" range="per Lv." target="Self"
    description="Splits the ground in a wide radius around the caster, the shockwave dealing repeated damage to everything caught standing on it." >}}

| Lv. | MATK (per tick) | Radius |
| --- | --------------- | ------ |
| 1   | +10%            | 2m     |
| 2   | +20%            | 3m     |
| 3   | +30%            | 4m     |
| 4   | +40%            | 5m     |
| 5   | +50%            | 6m     |

{{< /skill >}}

{{< skill name="Frost Orb" maxLevel="5" requires="Frost Nova Lv. 2"
    type="Active" manaCost="40" castTime="3s" cooldown="12s" range="9" target="Enemy"
    description="A dense orb of packed ice hurled at a single target, hitting hard and near-guaranteed to leave them frozen solid." >}}

| Lv. | MATK | Freeze Chance |
| --- | ---- | ------------- |
| 1   | +15% | 30%           |
| 2   | +30% | 40%           |
| 3   | +45% | 50%           |
| 4   | +60% | 60%           |
| 5   | +75% | 70%           |

{{< /skill >}}

{{< skill name="Soul Break" maxLevel="5" requires="Spiritual Mastery Lv. 2"
    type="Active" manaCost="45" castTime="2s" cooldown="15s" range="9" target="Enemy"
    description="Tears into a target with raw, undirected mana that ignores elemental resistance, ripping away a portion of their own mana in the process." >}}

| Lv. | MATK  | Target Mana Drained |
| --- | ----- | ------------------- |
| 1   | +20%  | 5%                  |
| 2   | +40%  | 10%                 |
| 3   | +60%  | 15%                 |
| 4   | +80%  | 20%                 |
| 5   | +100% | 25%                 |

{{< /skill >}}

{{< skill name="Thunder of Jupiter" maxLevel="5" requires="Thunder Storm Lv. 3"
    type="Active" manaCost="55" castTime="4s" cooldown="20s" range="9" target="Enemy"
    description="The Wizard's answer to a single stubborn target: a column of lightning that strikes over and over, once for every level of mastery behind it." >}}

| Lv. | Hits per Cast | MATK (per hit) |
| --- | ------------- | -------------- |
| 1   | 1             | +20%           |
| 2   | 2             | +20%           |
| 3   | 3             | +20%           |
| 4   | 4             | +20%           |
| 5   | 5             | +20%           |

{{< /skill >}}

{{< skill name="Mindbreak" maxLevel="5" requires="Soul Break Lv. 3"
    type="Active" manaCost="50" castTime="3s" cooldown="60s" duration="60s" range="5" target="Bestia"
    description="The Wizard's capstone: a buff channeling so much raw magic through a Bestia at once that its armor is the first thing to give. Once applied it reduces the magic defense but increases magical attack of a Bestia. It cancels `Mindfocus`." >}}

| Lv. | MATK  | SMDEF Reduction |
| --- | ----- | --------------- |
| 1   | +20%  | 20%             |
| 2   | +40%  | 40%             |
| 3   | +60%  | 60%             |
| 4   | +80%  | 80%             |
| 5   | +100% | 100%            |

{{< /skill >}}

<!-- Parked
### Brawler

No fancy footwork, no elemental theatrics - just the kind of toughness that keeps going long after everyone else has called it quits.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [warrior tree](#warrior-tree)" />}}

{{< skill name="Tough Guy" maxLevel="5"
    type="Passive"
    description="A Brawler's conditioning - stamina holds out longer under strain and comes back quicker once it's spent." >}}

| Lv. | Stamina Cost Reduction | Stamina Regeneration |
| --- | ----------------- | -------------------- |
| 1   | 10%              | +10%                 |
| 2   | 20%              | +20%                 |
| 3   | 30%              | +30%                 |
| 4   | 40%              | +40%                 |
| 5   | 50%              | +50%                 |

{{< /skill >}}

{{< skill name="Second Wind" maxLevel="3" requires="Tough Guy Lv. 3"
    type="Active" manaCost="0" castTime="Instant" cooldown="180s" range="0" target="Self"
    description="A Brawler's answer to running on empty: dig deep once, and get back up." >}}
{{< skill-level level="1" >}}Once every few minutes, can trigger a burst that restores a portion of Stamina immediately.{{< /skill-level >}}
{{< skill-level level="2" >}}The burst also restores a small portion of HP.{{< /skill-level >}}
{{< skill-level level="3" >}}Cooldown between bursts is reduced.{{< /skill-level >}}
{{< /skill >}}

{{< skill name="Unbreakable" maxLevel="3" requires="Iron Skin Lv. 3 and Second Wind Lv. 2"
    type="Passive"
    description="The Brawler's capstone. Everyone else has a breaking point; this is the skill that argues otherwise." >}}
{{< skill-level level="1" >}}Once per cooldown, an otherwise lethal hit instead leaves the Bestia at 1 HP.{{< /skill-level >}}
{{< skill-level level="2" >}}Stagger and knockback effects are greatly reduced while above 50% HP.{{< /skill-level >}}
{{< skill-level level="3" >}}Cooldown of the lethal-hit save is reduced.{{< /skill-level >}}
{{< /skill >}}

### Hunter

Neither predator nor prey, exactly. Hunters move like the terrain isn't there and build the kind of bond with wild Bestia that makes taming look almost effortless.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [warrior tree](#warrior-tree)" />}}

{{< skill name="Camouflage" maxLevel="3"
    type="Passive"
    description="Teaches the Hunter to read the land well enough to disappear into it. Reduces the range at which wild Bestia and monsters notice the master, and grants a damage bonus on an opening attack from concealment." >}}

| Lv. | Detection Range Reduction (wild Bestia) | Ambush Damage |
| --- | ----------------------------- | ------------- |
| 1   | 10%                          | +8%           |
| 2   | 20%                          | +16%          |
| 3   | 30%                          | +24%          |

{{< /skill >}}

{{< skill name="Lightfooted" maxLevel="5"
    type="Passive"
    description="A Hunter's sure footing that shrugs off rough terrain most travelers have to slow down for." >}}

| Lv. | Movement Reduction Negated |
| --- | -------------------------- |
| 1   | 20%                       |
| 2   | 40%                       |
| 3   | 60%                       |
| 4   | 80%                       |
| 5   | 100%                      |

{{< /skill >}}

{{< skill name="Master Tracker" maxLevel="3" requires="Camouflage Lv. 2 and Lightfooted Lv. 3"
    type="Active" manaCost="20" castTime="3s" cooldown="30s" range="0" target="Self"
    description="The Hunter's capstone: a Bestia's trail stops being a trail and starts being a map." >}}
{{< skill-level level="1" >}}Can follow the trail of any Bestia across long distances, even hours after it passed.{{< /skill-level >}}
{{< skill-level level="2" >}}Gains a critical strike bonus against a tracked target.{{< /skill-level >}}
{{< skill-level level="3" >}}Trail-tracking range and duration are both doubled.{{< /skill-level >}}
{{< /skill >}}
-->

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

Breaks the moment the Assassin moves or attacks. Detection resistance works against eyes, not against
[Ruwach](#skill-ruwach), which always reveals.

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

Still breaks on attacking. [Ruwach](#skill-ruwach) strips it outright.

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

<!-- Parked
### Bard

Where a Sage studies magic to bend it, a Bard studies it to sing along with it. Every note carried on the wind can steady an ally's arm or unstring an enemy's nerve. A Bard alone can hearten a party; a Bard standing next to a [Dancer](#dancer) can do quite a lot more.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [warrior tree](#warrior-tree)" />}}

{{< skill name="Instrument Mastery" maxLevel="10"
    type="Passive"
    description="Training with stringed and wind instruments well enough to fight with them in a pinch and to make every song carry further and land harder." >}}

| Lv. | ATK (instrument equipped) | Song Range/Effect |
| --- | ------------------------- | ----------------- |
| 1   | +2                        | +3%               |
| 2   | +4                        | +6%               |
| 3   | +6                        | +9%               |
| 4   | +8                        | +12%              |
| 5   | +10                       | +15%              |
| 6   | +12                       | +18%              |
| 7   | +14                       | +21%              |
| 8   | +16                       | +24%              |
| 9   | +18                       | +27%              |
| 10  | +20                       | +30%              |

{{< /skill >}}

{{< skill name="Voice Training" maxLevel="5"
    type="Passive"
    description="A trained voice reaches further and holds a note longer than an untrained one ever could." >}}

| Lv. | Song AoE | Song Duration |
| --- | -------- | ------------- |
| 1   | +1 tile  | +10%          |
| 2   | +2 tiles | +20%          |
| 3   | +3 tiles | +30%          |
| 4   | +4 tiles | +40%          |
| 5   | +5 tiles | +50%          |

{{< /skill >}}

{{< skill name="Ballad of the Fallen" maxLevel="5" requires="Instrument Mastery Lv. 3"
    type="Active" manaCost="30" castTime="2s" cooldown="5s" duration="While playing" range="0" target="Area"
    description="A driving battle hymn that steels the resolve of everyone in earshot." >}}

| Lv. | ATK and MATK (party, while playing) |
| --- | ----------------------------------- |
| 1   | +2%                                 |
| 2   | +4%                                 |
| 3   | +6%                                 |
| 4   | +8%                                 |
| 5   | +10%                                |

{{< /skill >}}

{{< skill name="War March" maxLevel="5" requires="Instrument Mastery Lv. 3"
    type="Active" manaCost="30" castTime="2s" cooldown="5s" duration="While playing" range="0" target="Area"
    description="A quickstep tune that puts a spring in the step and a snap in the swing of everyone marching to it." >}}

| Lv. | Movement/Attack Speed (party, while playing) |
| --- | -------------------------------------------- |
| 1   | +2%                                          |
| 2   | +4%                                          |
| 3   | +6%                                          |
| 4   | +8%                                          |
| 5   | +10%                                         |

{{< /skill >}}

{{< skill name="Dissonant Chord" maxLevel="5" requires="Instrument Mastery Lv. 5"
    type="Active" manaCost="30" castTime="2s" cooldown="5s" duration="While playing" range="0" target="Area"
    description="Deliberately off-key and unpleasant to hear by design. Rattles nearby enemies badly enough to throw off their aim and their footing." >}}

| Lv. | HIT and ASPD Reduction (enemies, while playing) |
| --- | ------------------------------------- |
| 1   | 3%                                   |
| 2   | 6%                                   |
| 3   | 9%                                   |
| 4   | 12%                                  |
| 5   | 15%                                  |

{{< /skill >}}

{{< skill name="Poem of the Netherworld" maxLevel="5" requires="Dissonant Chord Lv. 2"
    type="Active" manaCost="34" castTime="2s" cooldown="5s" duration="While playing" range="0" target="Area"
    description="A mournful dirge that drags at the mana of anyone unlucky enough to hear it, siphoning it into the surrounding air." >}}

| Lv. | Mana Drain per Tick (enemies, while playing) |
| --- | -------------------------------------------- |
| 1   | +2%                                          |
| 2   | +4%                                          |
| 3   | +6%                                          |
| 4   | +8%                                          |
| 5   | +10%                                         |

{{< /skill >}}

{{< skill name="Siren's Lullaby" maxLevel="3" requires="Dissonant Chord Lv. 3"
    type="Active" manaCost="40" castTime="2s" cooldown="5s" duration="While playing" range="0" target="Area"
    description="Not every song is meant to be heard for long. A slow, heavy melody that can lull a listener clean off their feet." >}}
{{< skill-level level="1" >}}Small chance per tick to put an enemy in range to sleep.{{< /skill-level >}}
{{< skill-level level="2" >}}Sleep chance and range are increased.{{< /skill-level >}}
{{< skill-level level="3" >}}Sleep chance is increased further and the effect ignores a portion of the target's status resistance.{{< /skill-level >}}
{{< /skill >}}

{{< skill name="Mystic Melody" maxLevel="5" requires="Voice Training Lv. 3"
    type="Active" manaCost="30" castTime="2s" cooldown="5s" duration="While playing" range="0" target="Area"
    description="An old wandering tune said to carry a bit of luck with it. Occasionally shakes loose a minor beneficial effect for whoever is listening." >}}

| Lv. | Proc Chance per Tick |
| --- | -------------------- |
| 1   | +3%                  |
| 2   | +6%                  |
| 3   | +9%                  |
| 4   | +12%                 |
| 5   | +15%                 |

{{< /skill >}}

{{< skill name="Harmonic Duet" maxLevel="3" requires="Ballad of the Fallen Lv. 5 and War March Lv. 5"
    type="Active" manaCost="60" castTime="3s" cooldown="30s" duration="While playing" range="0" target="Area"
    description="The Bard's capstone. No song written for one voice sounds quite complete - performing alongside a master who has trained the [Dancer](#dancer) tree lets both of you play parts neither could carry alone." >}}
{{< skill-level level="1" >}}While performing near a master with Dancer skills active, active songs and dances gain `+15%` effect strength for both performers' parties.{{< /skill-level >}}
{{< skill-level level="2" >}}The bonus increases to `+25%` and the combined range is extended.{{< /skill-level >}}
{{< skill-level level="3" >}}The bonus increases to `+40%` and a single additional song or dance from each performer can be active at the same time.{{< /skill-level >}}
{{< /skill >}}

### Dancer

Where a Bard leans on breath and instrument, a Dancer leans on footwork and nerve - closing the distance, reading an enemy's weak step, and turning a whip into an argument nobody wins. A Dancer alone can unravel a fight from the inside; a Dancer standing next to a [Bard](#bard) can do quite a lot more.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [warrior tree](#warrior-tree)" />}}

{{< skill name="Whip Mastery" maxLevel="10"
    type="Passive"
    description="Training with whips and chain-weapons until the reach stops feeling awkward. Increases damage dealt with whip-type weapons and the range at which they can strike." >}}

| Lv. | ATK (whip equipped) | Effective Reach |
| --- | ------------------- | --------------- |
| 1   | +2                  | +3%             |
| 2   | +4                  | +6%             |
| 3   | +6                  | +9%             |
| 4   | +8                  | +12%            |
| 5   | +10                 | +15%            |
| 6   | +12                 | +18%            |
| 7   | +14                 | +21%            |
| 8   | +16                 | +24%            |
| 9   | +18                 | +27%            |
| 10  | +20                 | +30%            |

{{< /skill >}}

{{< skill name="Nimble Steps" maxLevel="5"
    type="Passive"
    description="A Dancer trusts footwork over plate. Rather than wearing heavy armor, they learn to simply not be where the hit lands." >}}

| Lv. | FLEE (light/no armor) |
| --- | --------------------- |
| 1   | +2%                   |
| 2   | +4%                   |
| 3   | +6%                   |
| 4   | +8%                   |
| 5   | +10%                  |

{{< /skill >}}

{{< skill name="Slow Grace" maxLevel="5" requires="Whip Mastery Lv. 3"
    type="Active" manaCost="20" castTime="Instant" cooldown="6s" duration="20s" range="4" target="Enemy"
    description="A whip-strike aimed less at the flesh than at the footing. Leaves a target's steps a beat slower for a while after." >}}

| Lv. | Movement/Attack Speed Reduction (target) |
| --- | ------------------------------ |
| 1   | 3%                            |
| 2   | 6%                            |
| 3   | 9%                            |
| 4   | 12%                           |
| 5   | 15%                           |

{{< /skill >}}

{{< skill name="Sultry Rhythm" maxLevel="5" requires="Slow Grace Lv. 2"
    type="Active" manaCost="24" castTime="1s" cooldown="10s" duration="20s" range="4" target="Enemy"
    description="A hypnotic sway that draws an enemy's guard down before they even notice it slipping." >}}

| Lv. | Hard DEF and SDEF Reduction (target) |
| --- | --------------------- |
| 1   | 3%                   |
| 2   | 6%                   |
| 3   | 9%                   |
| 4   | 12%                  |
| 5   | 15%                  |

{{< /skill >}}

{{< skill name="Venomous Flourish" maxLevel="5" requires="Slow Grace Lv. 2"
    type="Passive"
    description="A whip's tip can carry more than momentum. Coats each strike with a mild toxin that wears an enemy down over time." >}}

| Lv. | Poison Chance per Hit |
| --- | --------------------- |
| 1   | +2%                   |
| 2   | +4%                   |
| 3   | +6%                   |
| 4   | +8%                   |
| 5   | +10%                  |

{{< /skill >}}

{{< skill name="Mirage Step" maxLevel="5" requires="Nimble Steps Lv. 3"
    type="Active" manaCost="30" castTime="2s" cooldown="5s" duration="While dancing" range="0" target="Area"
    description="A dance performed in motion rather than in place, sharing the Dancer's own knack for not being where the hit lands with everyone nearby." >}}

| Lv. | FLEE (party, while dancing) |
| --- | --------------------------- |
| 1   | +2%                         |
| 2   | +4%                         |
| 3   | +6%                         |
| 4   | +8%                         |
| 5   | +10%                        |

{{< /skill >}}

{{< skill name="Guiding Steps" maxLevel="5" requires="Nimble Steps Lv. 3"
    type="Active" manaCost="30" castTime="2s" cooldown="5s" duration="While dancing" range="0" target="Area"
    description="A steady, ground-eating rhythm that keeps a traveling party's legs fresh long after they should have given out." >}}

| Lv. | Movement Speed (party, while dancing) | Stamina Drain Reduction (party, while dancing) |
| --- | ------------------------------------- | ------------------------------------ |
| 1   | +2%                                   | 2%                                  |
| 2   | +4%                                   | 4%                                  |
| 3   | +6%                                   | 6%                                  |
| 4   | +8%                                   | 8%                                  |
| 5   | +10%                                  | 10%                                 |

{{< /skill >}}

{{< skill name="Captivating Gaze" maxLevel="3" requires="Venomous Flourish Lv. 3"
    type="Active" manaCost="35" castTime="1s" cooldown="20s" duration="per Lv." range="6" target="Enemy"
    description="A held look and a held breath is sometimes all it takes. A single enemy loses track of who it was even fighting." >}}
{{< skill-level level="1" >}}Small chance to force the target to attack a random nearby enemy instead of the Dancer's party for a short duration.{{< /skill-level >}}
{{< skill-level level="2" >}}Chance and duration are increased.{{< /skill-level >}}
{{< skill-level level="3" >}}Chance is increased further and the effect ignores a portion of the target's status resistance.{{< /skill-level >}}
{{< /skill >}}

{{< skill name="Radiant Waltz" maxLevel="3" requires="Mirage Step Lv. 5 and Guiding Steps Lv. 5"
    type="Active" manaCost="60" castTime="3s" cooldown="30s" duration="While dancing" range="0" target="Area"
    description="The Dancer's capstone. No dance choreographed for one performer sounds quite complete - performing alongside a master who has trained the [Bard](#bard) tree lets both of you play parts neither could carry alone." >}}
{{< skill-level level="1" >}}While performing near a master with Bard skills active, active songs and dances gain `+15%` effect strength for both performers' parties.{{< /skill-level >}}
{{< skill-level level="2" >}}The bonus increases to `+25%` and the combined range is extended.{{< /skill-level >}}
{{< skill-level level="3" >}}The bonus increases to `+40%` and a single additional song or dance from each performer can be active at the same time.{{< /skill-level >}}
{{< /skill >}}
-->
