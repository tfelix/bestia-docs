---
title: Bestia Master
---

The small intro game tells players how they became a Bestia Master: They came into direct contact with an ephemeral mana crystal that changed their nature through magic and connected them to the mana flows of the universe. They are therefore receptive to the influence of mana and are able to communicate with the beings that emerge from this mythical energy: **the Bestia**.

The attachment to mana also explains why Bestia masters were able to survive the destruction of their world relatively unscathed and to pass on to the next incarnation of the world.

# Master Skills

The bestia master can learn a set of skills. These skills are freely chosen by the player and determine the job or profession of the master.

Some of this account skills can be used by every Bestia in posession of the master (or at least have an passive effect on them) others can only be used actively by the master itself.

{{< alert context="info" text="Don't confuse this skill system with the regular attacks a Bestia is learning by item usage or just by level up. Those are simply called attacks." />}}

- The number of total skil ranks inside a tree should **be between 70-80**
- The possible rank counts of a skill should be: **1, 3, 5 and 10**
- There should be some meaningful dependency of the skills forming a tree
- In each profession tree there should form 2-3 sub-trees which create a meaningful hierarchy
- There should be some kind of three tiers inside a tree to lead from low and basic skill to the much powerfull skills

{{< alert context="warning" text="Most important: **No hardcoded skill effects!**" />}}

Especially crafting skills should be, when possible, require some sort of minigame or meaningful player interaction. Their outcome should also be dependent on the status values of a player, on the skill level but also on environmental aspects. An example teleport could go as follows:

After the master Saferu has selected a few of his and friendly Bestia he prepares to teleport to a fairly distant location. While he is very skilled and has a maxed teleport skill, on the target location there is a manastorm causing some interference. Upon teleportation the group is set of course and spawns almost a kilometer off from their target in a very hostile environment.

Ultimately, it remains important to leave the outcome of skills open in some way. However, the result should remain understandable and influenceable by the player.

# Skill Progression

Every master starts as novice to get into the game. Here he can only learn a certain sets of skills from the Novice skill tree. After he became level 10 he can start to prepare a small ritual to become a full **Bestia Master** which will unlock the full skill tree. After he becomes a Bestia Master the player **can not** choose anymore novice skills anymore. However every novice skill he has learned so far he can take with him. It depends on the player how long he wants to stay a novice before progressing into a full blown master.

On each level up the master gains 1 skillpoint to put into the skills rank. This is permanent and means a player can spend about 100 points for improving the ranks of his skills.

{{< alert context="info" text="Since max level is not capped actually he might be able to spend more points but a progressions gets continously harder it is safe to assume every player has about 100 points." />}}

The skilltrees are designed as such that to reach the highest professions in each tree the player needs to spend about **60 points**.

The player can decide to have mediocre profession in each tree or to max out one and have maybe half of the
meaningful professions of another tree. The skilltree is a hierarchical dependency of skills.

# Tree Mastery

Skillpoints spent within a subtree (e.g. Blacksmith, Priest, Wizard, ...) do more than unlock its skills - they also declare a profession to the world.

- As soon as **5 or more skillpoints** are invested into a single subtree, the master becomes a **Master** of that tree.
- Being a Master of a tree determines which of its associated items and weapons the master is able to use and equip.
- A Bestia Master can be a Master of **at most 3 trees**.
- Which trees count is decided by order of achievement: the first 3 subtrees in which a master reaches 5 or more skillpoints become their masteries. Reaching 5 or more skillpoints in any further subtree afterwards does **not** grant an additional mastery.

{{< alert context="info" text="This is independent of the 5 Lv. requirement that unlocks access to a subtree in the first place - that threshold is reached by investing in the parent tree, while Mastery requires 5 points spent inside the subtree itself." />}}

# Skill Trees

The following trees exist, they are organized in subtrees.

{{< alert context="info" text="Each tree and sub-tree below is illustrated with a dependency diagram. Rounded nodes are entry skills with no prerequisite, hexagon nodes are the sub-tree's capstone(s), a slanted node is a skill from another tree, and dashed arrows show the tree-mastery gate that unlocks a sub-tree once 5+ points are invested in its parent tree. Solid arrows are labeled with the required level in the source skill." />}}

## Novice Tree

In order to learn how to interact with other player you need to invest your first skill points in this skill tree.

{{< alert context="info" text="It is not implicitly stated but Lv. 7 in the Novice tree is mandatory for every other skill from other trees. If you take at least one skill point in any other tree the novice tree stays locked for you." />}}

```mermaid
graph TD
    BasicSkill(["Basic Skill (1-10)"])
    PlayDead["Play Dead (1)"]
    FirstAid["First Aid (1-3)"]
    Cooking["Cooking (1-3)"]
    MasterRitual{{"Master Ritual (1)"}}

    BasicSkill -->|Lv.2| PlayDead
    BasicSkill -->|Lv.3| FirstAid
    BasicSkill -->|Lv.4| Cooking
    BasicSkill -->|Lv.7| MasterRitual
```

<br>
{{< skill name="Basic Skill" maxLevel="10"
    description="Enables the use of the basic user interface." >}}
{{< skill-level level="1" >}}Allows to trade with other players.{{< /skill-level >}}
{{< skill-level level="2" >}}Allows to chat with other players via public and whisper chat.{{< /skill-level >}}
{{< skill-level level="3" >}}Allows to express emotes.{{< /skill-level >}}
{{< skill-level level="4" >}}Allows sitting to double HP & Mana recovery.{{< /skill-level >}}
{{< skill-level level="5" >}}Allows to join and create parties.{{< /skill-level >}}
{{< skill-level level="6" >}}Allows to use trade posts.{{< /skill-level >}}
{{< skill-level level="7" >}}Allows the user to perform the "Master Ritual".{{< /skill-level >}}
{{< /skill >}}

{{< skill name="Cooking" maxLevel="3" requires="Basic Skill Lv. 4" description="The Master and his Bestia can start to cook meals on fire places. These meals apply certain buff effects when they are eaten.<br>Cooking Time -10% / Lv<br>Success Chance +10% / Lv" >}}
{{< /skill >}}

{{< skill name="Play Dead" maxLevel="1" requires="Basic Skill Lv. 2"
    description="Feigns death to avoid menace of nearby enemies. This skill can be switched on and off. After performing the ritual to become a Bestia Master this skill can not be used anymore." >}}
{{< /skill >}}

{{< skill name="First Aid" maxLevel="3" requires="Basic Skill Lv. 3"
    description="Apply bandages to a Bestia and channel a healing effect over 10s. The cooldown of this skill is 5 minutes. A Bestia can only receive a single First Aid every 60 secs." >}}
`+20%/lv` HP healed or `+100 HP/lv` healed
{{< /skill >}}

{{< skill name="Master Ritual" maxLevel="1" requires="Basic Skill Lv. 7">}}
Automatically enabled once Lv. 7 in Basic Skill is reached. Can only be used as long as you are a Novice. Converts 25 [Void Essence](item-list/#void-essence), 5 [Mana Dust](item-list/#mana-dust) and 3 [Clay](item-list#clay) into a [Seal of Mastery](item-list#seal-of-mastery).
{{< /skill >}}

## Craftsman Tree

The workbenches, forges and cauldrons of the tradesfolk turn raw ambition into things a player can actually use. Every blade, trinket and bottled miracle a master ever relies on started out as somebody's Craftsman skill paying off.

```mermaid
graph TD
    Carpentry["Carpentry (1-10)"]
    Tinkerer["Tinkerer (1-5)"]
    ItemCustomization["Item Customization (1-10)"]
    Gate{{"5+ pts in Craftsman Tree"}}
    Blacksmith(("Blacksmith"))
    Artificer(("Artificer"))
    Alchemist(("Alchemist"))

    Carpentry -->|Lv.3| Tinkerer
    Carpentry -->|Lv.3| ItemCustomization
    Carpentry -.-> Gate
    Tinkerer -.-> Gate
    ItemCustomization -.-> Gate
    Gate -.->|unlocks| Blacksmith
    Gate -.->|unlocks| Artificer
    Gate -.->|unlocks| Alchemist
```

<br>
{{< skill name="Carpentry" maxLevel="10" description="Allows you to construct useful items of daily use and structures which can be placed in the world." >}}
`+5%/lv` success chance<br>
`+10 item lv/lv` of items that can be produced, up to item level 100+ at max rank
{{< /skill >}}

{{< skill name="Tinkerer" maxLevel="5" requires="Carpentry Lv. 3">}}
You are very skilled in working with tools and raw material. Building structures in the world is very quick for you and the Bestia under your command.<br>
`Reduce construction time of structures by -10% / Lv`
{{< /skill >}}

{{< skill name="Item Customization" requires="Carpentry Lv. 3" maxLevel="10" >}}
You are able to rework items to put slots in them in which runes can be slottet.<br>Requires an [Engraving Set](item-list/#engraving-set) which will be consumed in the process.
{{< /skill >}}

### Blacksmith

Steel remembers who beat it into shape. Blacksmiths turn raw ore into finest weaponry and armor which protects its carrier even in the mid of of a manastorm.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [craftsman tree](#craftsman-tree)" />}}

```mermaid
graph TD
    ItemCustomization[/"Item Customization (Craftsman Tree)"/]
    OreRefinement["Ore Refinement (1-3)"]
    ForgeWeapon["Forge Weapon (1-10)"]
    ForgeArmor["Forge Armor (1-10)"]
    WeaponRepair["Weapon Repair (1-5)"]
    WeaponryResearch["Weaponry Research (1-10)"]
    MasterSmith["Master Smith (1-5)"]

    ItemCustomization -->|Lv.5| ForgeWeapon
    ItemCustomization -->|Lv.5| ForgeArmor
    OreRefinement -->|Lv.1| ForgeWeapon
    OreRefinement -->|Lv.1| ForgeArmor
    OreRefinement -->|Lv.3| WeaponRepair
    WeaponRepair -->|Lv.3| WeaponryResearch
    ForgeWeapon -->|Lv.8| MasterSmith
    ForgeArmor -->|Lv.8| MasterSmith
```

<br>
{{< skill name="Ore Refinement" maxLevel="3"
    description="Enables the smith to refines the finest ores. A must have to produce the raw materials for weapon or armor forging." >}}
`+30 ore lv/lv` that can be refined, up to ore level 90+ at max rank
{{< /skill >}}

{{< skill name="Forge Weapon" maxLevel="10" requires="Ore Refinement Lv. 1 and Item Customization Lv. 5"
    description="Able to forge weaponry from raw ingredients. Higher skill level unlocks forging higher-level weapons." >}}
{{< /skill >}}

{{< skill name="Forge Armor" maxLevel="10" requires="Ore Refinement Lv. 1 and Item Customization Lv. 5"
    description="The counterpart to Blacksmith: forges plate, mail and shields from smelted ingots. Higher skill level unlocks forging higher-level armor." >}}
{{< /skill >}}

{{< skill name="Weaponry Research" maxLevel="10" requires="Weapon Repair Lv. 3"
    description="Deeper knowledge of weapons and armor that raises the odds of successfully [refining](/docs/mechanics/items/#weapon-refinement) either one further after forging. If an upgrade fails the equipment can be destroyed." >}}
`+4%/lv` success chance when upgrading a weapon or armor<br>
`+1%/lv` success chance when forging<br>
`+2 ATK/lv` and `+2%/lv` accuracy while any forged weapon is wielded
{{< /skill >}}

{{< skill name="Weapon Repair" maxLevel="5" requires="Ore Refinement Lv. 3"
    description="You can repair damaged or broken equipment to refurbish and make it usable again. Higher levels unlock repairing equipment of a higher [item level](/docs/mechanics/items/#item-level)." >}}
`+20 item lv/lv` of equipment that can be repaired, up to item level 100+ at max rank
{{< /skill >}}

{{< skill name="Master Smith" maxLevel="5" requires="Forge Weapon Lv. 8 and Forge Armor Lv. 8"
    description="The capstone of the forge. Makes a Blacksmith's hands steady enough to trust with the rarest ore." >}}
`+5%/lv` Weapon/Armor forging chance<br>
`+5%/lv` upgrade chance
{{< /skill >}}

### Artificer

Where Blacksmiths hammer steel, Artificers coax it into remembering spells. This path enscribes magic onto items, binds it to triggers, and crystalizes raw mana into shards other professions can build on.

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
    description="Build and operate Mana Harvesters which channel mana from the environment into raw crystals - the source of magic for many use cases." >}}
Level 1 enables you to place a Mana Harvester<br>
`-5%/lv` harvesting time<br>
`+3%/lv` crystal yield
{{< /skill >}}

{{< skill name="Manaflow Expert" maxLevel="5" requires="Mana Harvester Lv. 3"
    description="Refine the raw and unstable mana crystals harvested by a Mana Harvester into the finest arcane raw materials used to build powerful magic artifacts." >}}
`-4%/lv` chance a crystal shatters during refinement<br>
Higher levels unlock refining higher-grade crystals
{{< /skill >}}

{{< skill name="Runic Etching" maxLevel="10" requires="Item Customization Lv. 3"
    description="Create runes from Bestia essences. These runes are imbued with the power of the Bestia and can be slotted into a weapon or piece of equipment that has been prepared with Item Customization. An attempt to convert a Bestia into an essence destroys the Bestia." >}}
`+5%/lv` chance of success<br>
{{< /skill >}}

{{< skill name="Magic Artisan" maxLevel="10" requires="Runic Etching Lv. 5"
    description="Can create magic artefacts by binding sustained enchantments to an item, going well beyond what a single etched rune can hold." >}}
`+4%/lv` enchantment chance<br>
`-7%/lv` chance to destroy the item if the binding fails
{{< /skill >}}

### Alchemist

Equal parts kitchen and laboratory. Alchemists turn raw ingredients - mundane or mana-soaked - into food, tonics and reagents nobody else can replicate twice. Some carry the first bandages they ever learned to wrap as a Novice all the way into a healer's toolkit.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [craftsman tree](#craftsman-tree)" />}}

```mermaid
graph TD
    Herbalism["Herbalism (1-5)"]
    Alchemy["Alchemy (1-10)"]
    Transmutation["Transmutation (1-10)"]
    AlchemyMastery["Alchemy Mastery (1-5) - placeholder"]

    Herbalism -->|Lv.2| Alchemy
    Alchemy -->|Lv.5| Transmutation
    Alchemy -->|Lv.5| AlchemyMastery
```

<br>
{{< skill name="Herbalism" maxLevel="5"
    description="Teaches which roots, herbs and mana-touched growth are worth the harvest, and how to keep them potent until they reach the cauldron." >}}
{{< skill-level level="1" >}}Can collect herbs up to level 20{{< /skill-level >}}
{{< skill-level level="2" >}}Can collect herbs up to level 40{{< /skill-level >}}
{{< skill-level level="3" >}}Can collect herbs up to level 60{{< /skill-level >}}
{{< skill-level level="4" >}}Can collect herbs up to level 80{{< /skill-level >}}
{{< skill-level level="5" >}}Can collect herbs up to level 100+{{< /skill-level >}}
{{< /skill >}}

{{< skill name="Alchemy" maxLevel="10" requires="Herbalism Lv. 2"
    description="The core craft of the Alchemist: brewing reagents down into potions, tonics and other consumables. Builds directly on what Herbalism teaches about picking the right ingredient." >}}
{{< skill-level level="1" >}}Can craft basic potions and elixirs up to level 10. Allows you to install Alchemist Workbenches.{{< /skill-level >}}
{{< skill-level level="2" >}}Can craft potions and elixirs up to level 20.{{< /skill-level >}}
{{< skill-level level="3" >}}Can craft potions and elixirs up to level 30.{{< /skill-level >}}
{{< skill-level level="4" >}}Can craft potions and elixirs up to level 40.{{< /skill-level >}}
{{< skill-level level="5" >}}Can craft potions and elixirs up to level 50.{{< /skill-level >}}
{{< skill-level level="6" >}}Can craft potions and elixirs up to level 60.{{< /skill-level >}}
{{< skill-level level="7" >}}Can craft potions and elixirs up to level 70.{{< /skill-level >}}
{{< skill-level level="8" >}}Can craft potions and elixirs up to level 80.{{< /skill-level >}}
{{< skill-level level="9" >}}Can craft potions and elixirs up to level 90.{{< /skill-level >}}
{{< skill-level level="10" >}}Can craft potions and elixirs up to level 100+.{{< /skill-level >}}
{{< /skill >}}

{{< skill name="Transmutation" maxLevel="10" requires="Alchemy Lv. 5"
    description="The Alchemist's capstone. Where Alchemy brews what nature already provides, Transmutation reshapes mundane matter itself into the rare magically-infused resources needed for strong artifact creation and weapon refinements." >}}
Higher levels unlock transmuting higher-grade infused resources.

{{< skill-level level="1" >}}Can transmute items up to Lv. 20. Allows you to install Transmutation Workbenches.{{< /skill-level >}}
{{< skill-level level="2" >}}Can transmute items up to Lv. 40.{{< /skill-level >}}
{{< skill-level level="3" >}}Can transmute items up to Lv. 60.{{< /skill-level >}}
{{< skill-level level="4" >}}Can transmute items up to Lv. 80.{{< /skill-level >}}
{{< skill-level level="5" >}}Can transmute items up to Lv. 100+.{{< /skill-level >}}
{{< /skill >}}

{{< skill name="Alchemy Mastery" maxLevel="5" requires="Alchemy Lv. 5"
    description="Increased yield and success chance for Alchemy." >}}
`+10% / Lv` and `+5% yield / Lv`
{{< /skill >}}

{{< skill name="Speedy Brewer" maxLevel="5" requires="Alchemy Lv. 3"
    description="Increased brewing speed for all your alchemist tasks performed by you and your Bestia." >}}
`+10% / Speed`
{{< /skill >}}

## Survival Tree

Skills which allow the player to keep exploring the world and stay active longer far away from settlements are placed in this skill tree. Foresters live off the land, Prospectors chart what nobody has mapped yet, and Miners dig for what the land is hiding.

```mermaid
graph TD
    InnerPeace["Inner Peace (1-10)"]
    WeatherResistance["Weather Resistance (1-5)"]
    QuickTravel["Quick Travel (1-5)"]
    Fishing["Fishing (1-5)"]
    Gate{{"5+ pts in Survival Tree"}}
    Forester(("Forester"))
    Prospector(("Prospector"))
    Miner(("Miner"))

    InnerPeace -.-> Gate
    WeatherResistance -.-> Gate
    QuickTravel -.-> Gate
    Fishing -.-> Gate
    Gate -.->|unlocks| Forester
    Gate -.->|unlocks| Prospector
    Gate -.->|unlocks| Miner
```

<br>
{{< skill name="Weather Resistance" maxLevel="5"
    description="Your Bestia and Master gain an increased tolerance against high and low environment temperatures." >}}
`+3%` higher tolerance/lv
{{< /skill >}}

{{< skill name="Quick Travel" maxLevel="5"
    description="You and your Bestia know every kind of terrain." >}}
`+3%` higher movement speed/lv
{{< /skill >}}

{{< skill name="Meditation" requires="Weather Resistance Lv. 2, Quick Travel Lv. 2" maxLevel="10"
    description="Your Bestia and Master gain an increased HP and Mana regeneration rate." >}}
`+3% effect/lv`
{{< /skill >}}

{{< skill name="Fishing" maxLevel="5"
    description="With this skill you are able to catch fish. Fish can be cooked and are used for food and trading." >}}
`+20 fish lv/lv` that can be caught, up to fish level 100+ at max rank
{{< /skill >}}

### Forester

At home wherever the trees outnumber the people. Foresters live off the land - felling timber, landing the catch of the day, and striking up a bond with Bestia most masters would call unapproachable.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [survival tree](#survival-tree)" />}}

```mermaid
graph TD
    Lumberjack(["Lumberjack (1-5)"])
    Trapping(["Trapping (1-5)"])
    ExpertTaming(["Expert Taming (1-5)"])
    Beastfriend{{"Beastfriend (1-5)"}}

    ExpertTaming -->|Lv.3| Beastfriend
```

<br>
{{< skill name="Lumberjack" maxLevel="5"
    description="The player is able to gather wood resources." >}}
Level 1 allows you to install a woodworker cabin.<br>
`-10% / Lv.` wood gathering time<br>
`+20% / Lv.` resource drop chance
{{< /skill >}}

{{< skill name="Trapping" maxLevel="5"
    description="Sets snares and deadfalls that keep working for the master even while they're off doing something else, passively catching small game over time for meat and pelts on a later check-in." >}}
Level 1 allows you to place a trap.<br>
`+6% / Lv` chance a snare yields a catch<br>
{{< /skill >}}

{{< skill name="Bestia Trapping" requires="Trapping Lv. 3" maxLevel="5"
    description="Special traps and lures empowered with mana dust to catch Bestia." >}}
Level 1 allows you to place a special Bestia trap.<br>
`+6% / Lv` chance a snare yields a catch<br>
{{< /skill >}}

{{< skill name="Expert Taming" maxLevel="5"
    description="Bestia under your control gain faster experience and require less food to maintain their stamina out in the open." >}}
`+5%/lv` EXP gain<br>
`-2%/lv` stamina loss
{{< /skill >}}

{{< skill name="Beastfriend" maxLevel="5" requires="Expert Taming Lv. 3"
    description="Detailed knowledge of the Bestia and their behavior makes it easier for you to tame and catch them. Also increases the success chance for Bestia Trapping." >}}
`+5%/lv` chance to tame
{{< /skill >}}

### Prospector

Half surveyor, half treasure hunter. Prospectors chart unclaimed land, feel out resources long before anyone else arrives, and travel heavier and further than sense would recommend.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [survival tree](#survival-tree)" />}}

```mermaid
graph TD
    MaximizeCarryCapacity["Maximize Carry Capacity (1-5)"]
    EnlargeWeightLimit["Enlarge Weight Limit (1-5)"]
    Cartography["Cartography (1-5)"]
    WildernessSurvival["Wilderness Survival (1-5)"]
    WeatherSense["Weather Sense (1-3)"]

    MaximizeCarryCapacity -->|Lv.3| EnlargeWeightLimit
    EnlargeWeightLimit -->|Lv.3| WildernessSurvival
```

<br>
{{< skill name="Maximize Carry Capacity" maxLevel="5"
    description="Raises the carrying capacity of your own Master." >}}
`+10%/lv` weight limit
{{< /skill >}}

{{< skill name="Enlarge Weight Limit" requires="Maximize Carry Capacity Lv. 3" maxLevel="5"
    description="Raises the carrying capacity of every Bestia under your control." >}}
`+10%/lv` weight limit
{{< /skill >}}

{{< skill name="Wilderness Survival" requires="Enlarge Weight Limit Lv. 3" maxLevel="5"
    description="Hardens the master and their Bestia against travel through hostile terrain, far from the comfort of a settlement. Reduces the stamina and HP drain caused by hostile terrain and environmental hazards." >}}
`-10%/lv` stamina drain in hostile terrain<br>
`-10%/lv` environmental hazard damage
{{< /skill >}}

{{< skill name="Weather Sense" maxLevel="3"
    description="An instinct for reading the sky and wind well before a storm ever arrives, letting the Prospector plan a route or a dig around what's coming." >}}
`+5min/lv` how far ahead upcoming weather changes can be sensed. Level 1 shows you the current wind direction and speed.
{{< /skill >}}

{{< skill name="Cartography" requires="Weather Sense Lv. 1" maxLevel="5"
    description="Enables the player to chart unexplored land, revealing terrain that can be shared, traded on, or built on. See [World Exploration](/docs/mechanics/world-exploration/#cartography) for how the surveying minigame plays out." >}}
Each level reduces the difficulty of surveying unexplored land.
{{< /skill >}}

### Miner

If it's buried, a Miner will find a way to it. Equal parts pickaxe and stubbornness, this path turns raw earth - literally - into opportunity.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [survival tree](#survival-tree)" />}}

```mermaid
graph TD
    Mining(["Mining (1-5)"])
    GemCutting["Gem Cutting (1-5)"]
    DeepDelver["Deep Delver (1-5)"]
    ResourceSonar{{"Resource Sonar (1-3)"}}

    Mining -->|Lv.3| GemCutting
    Mining -->|Lv.3| DeepDelver
    GemCutting -->|Lv.3| ResourceSonar
    DeepDelver -->|Lv.3| ResourceSonar
```

<br>
{{< skill name="Mining" maxLevel="5"
    description="Specialized in digging mine shafts and gathering mineral resources." >}}
Level 1 enables you to place a mining shaft<br>
`-10%/lv` mining time<br>
`+20 resource lv/lv` that can be mined, up to resource level 100+ at max rank
{{< /skill >}}

{{< skill name="Gem Cutting" maxLevel="5" requires="Mining Lv. 3"
    description="Turns the rough gemstones a Miner digs up into cut stones fit for an Artificer's socket or a Trader's scale. Can cut raw gems recovered from mining into faceted gemstones, increasing their value and unlocking their use in socketed equipment." >}}
Higher levels unlock cutting higher-grade gems<br>
`-8%/lv` chance to shatter a gem while cutting
{{< /skill >}}

{{< skill name="Cave Explorer" maxLevel="5" requires="Mining Lv. 3"
    description="Lets a Miner push shafts deeper than good sense would recommend, into ground that pays off precisely because nobody else risks it. Grants access to deeper, more dangerous mine shafts holding rarer ore veins and the odd buried structure." >}}
`+10% more resources/lv`
{{< /skill >}}

{{< skill name="Resource Sonar" maxLevel="3" requires="Cave Explorer Lv. 3"
    description="The Miner's capstone: a feel for what's underfoot precise enough to map a shaft before the first swing of the pick." >}}
Can sense ore and gem deposits through solid rock within 5m / Lv.
{{< /skill >}}

## Scholar Tree

The Scholar tree contains skills which help with sensing the world's events and performing rituals to shape the face of the Bestia world itself. Traders keep the gears of commerce turning while Sages chase magic to its source - enscribing, discovering, and eventually bending distance itself.

```mermaid
graph TD
    MagicSense(["Magic Sense (1-5)"])
    Observation(["Observation (1-5)"])
    Founder(["Founder (1)"])
    Ruwach["Ruwach (1-3)"]
    Gate{{"5+ pts in Scholar Tree"}}
    Priest(("Priest"))
    Trader(("Trader"))
    Sage(("Sage"))

    MagicSense -->|Lv.2| Ruwach
    MagicSense -.-> Gate
    Observation -.-> Gate
    Founder -.-> Gate
    Ruwach -.-> Gate
    Gate -.->|unlocks| Priest
    Gate -.->|unlocks| Trader
    Gate -.->|unlocks| Sage
```

<br>
{{< skill name="Magic Sense" maxLevel="5"
    description="User can detect the presence of magic nearby. It can also identify a magical spell which might be bound to an entity." >}}
{{< /skill >}}

{{< skill name="Observation" maxLevel="5" >}}
You can detect the direction and distance of nearby world events like mana rifts which open, spawned bosses or other world changing events.
Level 1 let you place an observatory. `1km/Lv detection distance`.
{{< /skill >}}

{{< skill name="Founder" maxLevel="1"
    description="Allows you to create a settlement by placing a city sign." >}}
{{< /skill >}}

{{< skill name="Ruwach" maxLevel="3" requires="Magic Sense Lv. 2"
    description="A pulse of second sight that peels back concealment - hidden traps, camouflaged Hunters and cloaked Assassins stand out for what they are, and counterfeit goods stop passing as genuine. Useful to any Scholar, whether they're scrying old ruins, appraising a shady deal, or walking a party into an ambush." >}}
`+3m/lv` detection range<br>
Higher levels shorten how long a concealed target needs to hold still before being revealed
{{< /skill >}}

### Priest

Priests channel mana into blessings that keep a party alive - restoring health, lifting curses, and bolstering the vitality of Bestia out in the field.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [scholar tree](#scholar-tree)" />}}

```mermaid
graph TD
    MagicSense[/"Magic Sense (Scholar Tree)"/]

    subgraph Foundations
        Heal(["Heal (1-10)"])
        MaceMastery(["Mace Mastery (1-5)"])
    end

    subgraph "Utility Rites"
        Suffragium["Suffragium (1-3)"]
        Gloria["Gloria (1-3)"]
    end

    subgraph "Cleansing & Wards"
        Cure["Cure (1)"]
        Absolution["Absolution (1)"]
        AquaBenedicta["Aqua Benedicta (1)"]
        StatusRecovery["Status Recovery (1)"]
        Aspersio["Aspersio (1-3)"]
    end

    subgraph Blessings
        Blessing["Blessing (1-10)"]
        IncreaseAGI["Increase AGI (1-5)"]
        DecreaseAGI["Decrease AGI (1-3)"]
        KyrieEleison["Kyrie Eleison (1-5)"]
        ImpositioManus["Impositio Manus (1-3)"]
        Pneuma["Pneuma (1-3)"]
        Magnificat["Magnificat (1-3)"]
    end

    subgraph "Holy Offense"
        SignumCrucis["Signum Crucis (1-3)"]
        HolyLight["Holy Light (1-5)"]
        DemonBane["Demon Bane (1-3)"]
        DivineProtection["Divine Protection (1-3)"]
        TurnUndead["Turn Undead (1-5)"]
        LexAeterna["Lex Aeterna (1)"]
        MagnusExorcismus{{"Magnus Exorcismus (1-3)"}}
    end

    subgraph Ultimate
        Sanctuary{{"Sanctuary (1-3)"}}
        Resurrection{{"Resurrection (1)"}}
    end

    MagicSense -->|Lv.2| Gloria
    MagicSense -->|Lv.3| Suffragium

    Heal -->|Lv.2| Cure
    Heal -->|Lv.2| Absolution
    Heal -->|Lv.3| Blessing
    Heal -->|Lv.3| IncreaseAGI
    Heal -->|Lv.8| Resurrection

    Cure -->|Lv.1| AquaBenedicta
    Cure -->|Lv.1| StatusRecovery
    StatusRecovery -->|Lv.2| Resurrection
    AquaBenedicta -->|Lv.2| Aspersio
    MaceMastery -->|Lv.2| Aspersio

    Absolution -->|Lv.2| SignumCrucis

    IncreaseAGI -->|Lv.2| DecreaseAGI

    Blessing -->|Lv.2| KyrieEleison
    Blessing -->|Lv.3| ImpositioManus
    Blessing -->|Lv.3| Magnificat
    KyrieEleison -->|Lv.2| Pneuma
    KyrieEleison -->|Lv.3| Magnificat

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
    description="Channels mana directly into a target's wounds, restoring HP in an instant. The Priest's bread and butter - simple, reliable, and the first rite every Priest learns." >}}
`+8%/lv` HP healed<br>
`-0.2s/lv` cast time
{{< /skill >}}

{{< skill name="Suffragium" maxLevel="3" requires="Magic Sense Lv. 3"
    description="A murmured rite that lightens the burden of spellcasting for a short while - a Sage burning through scrolls, a Priest chaining blessings and a Trader rushing a linking ritual all feel the difference equally." >}}
`-10% / Lv` cast time to a target ally for the next spell in `30s`
{{< /skill >}}

{{< skill name="Gloria" maxLevel="3" requires="Magic Sense Lv. 2"
    description="A quiet benediction that nudges fortune to smile a little wider on the caster and their party for a short while - stalls turn up better goods, dice favor the bold, and the elusive becomes that much easier to spot." >}}
`+5 WILL / Lv` to party members within range for `30s / Lv`
{{< /skill >}}

{{< skill name="Cure" maxLevel="1" requires="Heal Lv. 2"
    description="Lifts the fog of Silence, Blindness and Confusion from a target's mind with a touch." >}}
{{< /skill >}}

{{< skill name="Absolution" maxLevel="1" requires="Heal Lv. 2"
    description="Where Cure clears the mind, Absolution clears the flesh - burning a Curse or Poison out of a target in a single rite." >}}
{{< /skill >}}

{{< skill name="Mace Mastery" maxLevel="5"
    description="Priests are taught to trust a blunt weapon over an edge - a mace punishes the undead and demonic without the ritual impurity a blade would carry." >}}
`+2 ATK/lv` while a mace or similar blunt weapon is equipped
{{< /skill >}}

{{< skill name="Aqua Benedicta" maxLevel="1" requires="Cure Lv. 1"
    description="The rite of blessing plain water into [Holy Water](item-list/#holy-water). User must be standing in water, consuming an [Empty Bottle]('item-list/#empty-bottle) in the process. Holy Water is the reagent behind Aspersio and several higher rites." >}}
{{< /skill >}}

{{< skill name="Blessing" maxLevel="10" requires="Heal Lv. 3"
    description="A benediction that steadies body and mind, raising a party's core stats for a short while." >}}
`+1 STR/INT/DEX per Lv` for `60s + 20s / Lv`
{{< /skill >}}

{{< skill name="Increase AGI" maxLevel="5" requires="Heal Lv. 3"
    description="Lightens a target's limbs with borrowed haste, quickening step and swing alike." >}}
`3 + 1 / Lv AGI`, `15% Movement Speed`, `+1% ASPD / Lv`, Duration `60s + 20s / Lv`
{{< /skill >}}

{{< skill name="Decrease AGI" maxLevel="3" requires="Increase AGI Lv. 2"
    description="The same rite turned inward out - a mote of leaden mana that slows an enemy's step and swing instead of quickening it." >}}
`-4%/lv` movement and attack speed to the target for a short duration
{{< /skill >}}

{{< skill name="Kyrie Eleison" maxLevel="5" requires="Blessing Lv. 2"
    description="A shimmering ward of mana that stands between a target and harm, soaking up a number of hits before it gives out." >}}
`+1 hit absorbed/lv`<br>
`+5%/lv` damage absorbed per hit
{{< /skill >}}

{{< skill name="Signum Crucis" maxLevel="3" requires="Absolution Lv. 2"
    description="A sign traced in the air that unsettles anything unholy nearby, cracking the natural defenses of the undead and demonic." >}}
`-5%/lv` DEF to undead and demon-type enemies within range for a short duration
{{< /skill >}}

{{< skill name="Pneuma" maxLevel="3" requires="Kyrie Eleison Lv. 2"
    description="Lays a veil of still air over a patch of ground; anything standing in it becomes untouchable by arrows, bolts and thrown weapons, though a blade still finds its mark." >}}
`+1m radius/lv`<br>
Higher levels extend how long the veil holds
{{< /skill >}}

{{< skill name="Holy Light" maxLevel="5" requires="Signum Crucis Lv. 2"
    description="Condenses raw holy mana into a single searing beam - the Priest's answer to needing to deal damage rather than mend it." >}}
`+10%/lv` MATK
{{< /skill >}}

{{< skill name="Demon Bane" maxLevel="3" requires="Signum Crucis Lv. 2"
    description="Years spent studying the weak points of the unholy pay off passively - every strike against a demon or undead lands that much harder." >}}
`+4%/lv` damage against demon and undead-type enemies
{{< /skill >}}

{{< skill name="Divine Protection" maxLevel="3" requires="Signum Crucis Lv. 2"
    description="The defensive twin of Demon Bane - a standing ward that dulls what comes back the other way from anything unholy." >}}
`-5%/lv` damage taken from demon and undead-type enemies
{{< /skill >}}

{{< skill name="Impositio Manus" maxLevel="3" requires="Blessing Lv. 3"
    description="The laying on of hands, channeling raw striking power into a single ally rather than the whole party." >}}
`+5 ATK and MATK/lv` to the target for a short duration
{{< /skill >}}

{{< skill name="Status Recovery" maxLevel="1" requires="Cure Lv. 1"
    description="Where Cure lifts the fog from a mind, Status Recovery breaks the ice, stone and cramp from a body - lifting Stun, Freeze and Stone Curse in a single rite." >}}
{{< /skill >}}

{{< skill name="Aspersio" maxLevel="3" requires="Aqua Benedicta Lv. 2 and Mace Mastery Lv. 2"
    description="Anoints a weapon with Holy Water, temporarily imbuing its strikes with the holy element. Consumes a unit of [Holy Water](item-list/#holy-water) per cast." >}}
Higher levels extend the duration and allow higher-grade Holy Water to be used for a stronger imbue
{{< /skill >}}

{{< skill name="Turn Undead" maxLevel="5" requires="Demon Bane Lv. 3 and Holy Light Lv. 3"
    description="A focused holy strike aimed squarely at what should not be moving. Deals heavy damage to undead-type enemies, with a chance to unmake weaker ones outright." >}}
`+8%/lv` damage against undead-type enemies<br>
Higher levels raise the chance of an instant kill against sufficiently weak undead
{{< /skill >}}

{{< skill name="Lex Aeterna" maxLevel="1" requires="Holy Light Lv. 3"
    description="Marks a single target so that the very next hit it takes lands twice as hard. The mark breaks the instant it's used, on friend or foe alike." >}}
{{< /skill >}}

{{< skill name="Magnificat" maxLevel="3" requires="Kyrie Eleison Lv. 3 and Blessing Lv. 3"
    description="A hymn of thanksgiving that quickens the natural recovery of everyone within earshot." >}}
`+10%/lv` HP and Mana regeneration to party members within range for a short duration
{{< /skill >}}

{{< skill name="Magnus Exorcismus" maxLevel="3" requires="Turn Undead Lv. 3 and Holy Light Lv. 5"
    description="The Priest's offensive capstone: a pillar of holy mana erupts around the caster, searing everything caught in it and the undead and demonic worst of all." >}}
`+15%/lv` MATK<br>
`+10%/lv` additional damage against demon and undead-type enemies
{{< /skill >}}

{{< skill name="Sanctuary" maxLevel="3" requires="Magnificat Lv. 3 and Pneuma Lv. 2"
    description="Consecrates a patch of ground into holy ground: allies standing in it are steadily mended, while any undead or demon caught inside burns instead." >}}
`+5%/lv` max HP healed per tick to allies standing within<br>
Deals equivalent holy damage per tick to undead and demon-type enemies standing within
{{< /skill >}}

{{< skill name="Resurrection" maxLevel="1" requires="Heal Lv. 8 and Status Recovery Lv. 2"
    description="The rite few Priests ever get to cast and fewer still get to cast twice in a row on the same ally - channels enough mana to call a fallen Bestia or Master back over the threshold, returning them to the world with a portion of their HP restored. Long cooldown; can not be used on the caster." >}}
{{< /skill >}}

### Trader

Coin has its own kind of magic. Traders read markets instead of mana flows, linking auction houses together, minting the coin everyone else trades in, and looking out for goods that might otherwise walk off on their own.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [scholar tree](#scholar-tree)" />}}

{{< skill name="Appraisal" maxLevel="5"
    description="Trains an eye for what goods are actually worth, cutting through both a merchant's markup and a forger's polish. Reveals an item's true condition and quality before it's bought or sold, and can flag counterfeit or mislabeled goods." >}}
You can identify an item.<br>
+20 Item Lv / Lv
{{< /skill >}}

{{< skill name="Scavenger" maxLevel="10"
    description="When breaking up and recycling items the probability to recycle a higher amount of components is increased." >}}
`+5%/lv` chance of recycling items<br>
{{< /skill >}}

{{< skill name="Minting" maxLevel="5" requires="Appraisal Lv. 5, Scavenger Lv. 3"
    description="The final step between a fistful of raw gold and coin that actually spends. Allows the master to mint raw gold directly into gold coins. See [Currency](/docs/mechanics/economy-trade/#currency) for how the world's money supply is minted from mined gold." >}}
`+10% yield/ Lv` amount minted per batch
{{< /skill >}}

{{< skill name="Trade Post Owner" maxLevel="5"
    description="Allows you to build trading posts which can be used by other citizen to buy and sell items. Only a single trading post can be located inside a settlement." >}}
`+1 / Lv.` total trading posts that can be created by this Master<br>
`+5% / Lv.` maximum fee that can be set
{{< /skill >}}

{{< skill name="Trade Agreement" maxLevel="5" requires="Trade Post Owner Lv. 3"
    description="Allows the master to link his auction house with those of other consenting players, merging their listings into a single, wider [marketplace](/docs/mechanics/economy-trade/#linking-auction-houses)." >}}
`+1 / Lv` players that can be linked. To get linked from other players at least level 1 in this skill is required.
{{< /skill >}}

{{< skill name="Honorable Citizen" maxLevel="5" requires="Minting Lv. 2 and Trade Agreement Lv. 1"
    description="A quiet ledger of who's been caught with sticky fingers. Anyone caught stealing from this Trader's stock, mint or linked auction listings suffers a steeper honor penalty than they otherwise would." >}}
`+20% / Lv` honor penalty for robbers
{{< /skill >}}

### Sage

Books, wards and long nights spent staring into scrying bowls. Sages study magic itself - discovering it, enscribing it, binding it, and eventually learning to fold distance in on itself with teleportation and portals.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [scholar tree](#scholar-tree)" />}}

- Elemental Fields _(placeholder)_
- Free Cast - move while casting _(placeholder)_
- Endow Weapons elemental (3 level) _(placeholder)_
- Read Enemy _(placeholder)_
- Mana Drain _(placeholder)_
- Mana Transfer _(placeholder)_
- Weather Control _(placeholder)_

{{< skill name="Spell Training" maxLevel="10"
    description="Train a spell from a scroll to a Bestia. The scroll will be consumed in this process. The success chance depends on the level of the scroll." >}}
{{< /skill >}}

{{< skill name="Scry" maxLevel="5" requires="Spell Training Lv. 2"
    description="The caster can gather information about areas located far away from his position. This is also a helpful spell to detect possible resources in areas which might be worth exploring." >}}
{{< /skill >}}

{{< skill name="Spell Enscription" maxLevel="10" requires="Spell Training Lv. 3"
    description="Enables you to extract a spell from the memory of a Bestia onto a spell scroll, which can then either trigger the spell once or teach it to another Bestia. However, there is a chance that the mind of a Bestia is destroyed during the extraction, killing the Bestia in the process." >}}
The base success chance depends on the level of the attack being enscribed and is further modified by skill level, equipment and intelligence (`INT / 2 + WIL / 4`):

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

{{< skill name="Spell Binding" maxLevel="10" requires="Spell Enscription Lv. 3"
    description="Allows the user to bind certain spells to entities and create trigger for them. This can be used to permanently bind spells to artifacts or setup alarms or traps for example." >}}
{{< /skill >}}

{{< skill name="Teleport" maxLevel="5" requires="Spell Binding Lv. 3"
    description="Can teleport own bestias over a distance. To teleport somewhere one needs to setup Teleport Runes which form some kind of magical anchor - the same kind of anchor a Spell Binder learns to set for alarms and traps. They can be used as targets when trying to teleport. The teleportation gets harder and more error prone the longer distances are tried to travel. The teleported entity also gets a debuff which will prevent it from teleporting again for some time." >}}
{{< /skill >}}

{{< skill name="Warp Portal" maxLevel="10" requires="Teleport Lv. 5"
    description="The Sage's capstone. Where Teleport moves one anchor's worth of travelers once, a Portal tears a standing hole between two anchors that anyone can walk through. To teleport somewhere one needs to setup Portal Runes which form some kind of magical anchor. As soon as a portal has opened it can be used in both directions for some time." >}}
1 person/lv can use the portal
{{< /skill >}}

## Warrior Tree

Where the other trees build, gather and study, the Warrior tree is built to fight. Wizards burn the battlefield down with elemental and arcane fury, Brawlers shrug off punishment nobody should be able to shrug off, Hunters strike up a bond with wild Bestia most people just run from, Assassins vanish before the first drop of blood even hits the ground, Knights plant themselves between danger and everyone else, and Bards and Dancers turn a battlefield into something worth listening to.

{{< skill name="Endure" maxLevel="1"
    description="HP and Mana regeneration is not stopped during combat." >}}
{{< /skill >}}

{{< skill name="Iron Skin" maxLevel="5"
    description="The physical counterpart to a Wizard's Magic Armor: hide toughened by nothing more than sheer stubbornness. Reduces incoming physical damage. Unlike Magic Armor this costs no mana, but the reduction is more modest." >}}
`-2%/lv` reduced physical damage
{{< /skill >}}

{{< skill name="Magic Armor" maxLevel="5"
    description="Reduces damage of magical effects but each hit costs 0.2% percent of the max mana of the owner. When the mana drops below 10% the buff is cancelled." >}}
`-2%/level` reduced damage
{{< /skill >}}

### Wizard

Fire, water, wind, earth, and the deeper currents of holy and dark magic - Wizards bend all of it into a weapon, at the cost of the armor most masters would rather keep.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [warrior tree](#warrior-tree)" />}}

- Spell Breaker _(placeholder)_

{{< skill name="Dispell" maxLevel="3"
    description="Strips all beneficial buffs from a single target. Consumes a [Yellow Mana Crystal](/docs/mechanics/item-list/#yellow-mana-crystal) per cast." >}}
{{< skill-level level="1" >}}60% chance to remove all buffs.{{< /skill-level >}}
{{< skill-level level="2" >}}80% chance to remove all buffs.{{< /skill-level >}}
{{< skill-level level="3" >}}100% chance to remove all buffs.{{< /skill-level >}}
{{< /skill >}}

{{< skill name="Elemental Mastery" maxLevel="5"
    description="Increases damage or healing of spells with elemental (earth, wind, water, fire) domain." >}}
`+3% damage/lv`
{{< /skill >}}

{{< skill name="Spiritual Mastery" maxLevel="5"
    description="Increases damage or healing of spells with the Holy or Dark domain." >}}
`+5% damage/lv`
{{< /skill >}}

{{< skill name="Master of Fire" maxLevel="5" requires="Elemental Mastery Lv. 2"
    description="Increases the damage of fire attacks." >}}
`+3% damage/lv`
{{< /skill >}}

{{< skill name="Master of Water" maxLevel="5" requires="Elemental Mastery Lv. 2"
    description="Increases damage of water spells." >}}
`+3% damage/lv`
{{< /skill >}}

{{< skill name="Master of Wind" maxLevel="5" requires="Elemental Mastery Lv. 2"
    description="Increases damage of wind spells." >}}
`+3% damage/lv`
{{< /skill >}}

{{< skill name="Master of Earth" maxLevel="5" requires="Elemental Mastery Lv. 2"
    description="Increases damage of earth spells." >}}
`+3% damage/lv`
{{< /skill >}}

{{< skill name="Mindbreak" maxLevel="5" requires="Elemental Mastery Lv. 3 or Spiritual Mastery Lv. 3"
    description="The Wizard's capstone: a buff channeling so much raw magic through a Bestia at once that its armor is the first thing to give. Once applied it reduces the armor but increases magical attack of a Bestia. It cancels `Mindfocus`." >}}
`+20% MATK/level`<br>
`-20% MDEF/level`
{{< /skill >}}

### Brawler

No fancy footwork, no elemental theatrics - just the kind of toughness that keeps going long after everyone else has called it quits.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [warrior tree](#warrior-tree)" />}}

{{< skill name="Tough Guy" maxLevel="5"
    description="Stamina is faster regenerated and drops slower in high demanding environments and while doing activities which would otherwise deplete your stamina." >}}
`-10%/lv` reduced stamina reduction<br>
`+10%/lv` increased stamina regeneration
{{< /skill >}}

{{< skill name="Second Wind" maxLevel="3" requires="Tough Guy Lv. 3"
    description="A Brawler's answer to running on empty: dig deep once, and get back up." >}}
{{< skill-level level="1" >}}Once every few minutes, can trigger a burst that restores a portion of Stamina immediately.{{< /skill-level >}}
{{< skill-level level="2" >}}The burst also restores a small portion of HP.{{< /skill-level >}}
{{< skill-level level="3" >}}Cooldown between bursts is reduced.{{< /skill-level >}}
{{< /skill >}}

{{< skill name="Unbreakable" maxLevel="3" requires="Iron Skin Lv. 3 and Second Wind Lv. 2"
    description="The Brawler's capstone. Everyone else has a breaking point; this is the skill that argues otherwise." >}}
{{< skill-level level="1" >}}Once per cooldown, an otherwise lethal hit instead leaves the Bestia at 1 HP.{{< /skill-level >}}
{{< skill-level level="2" >}}Stagger and knockback effects are greatly reduced while above 50% HP.{{< /skill-level >}}
{{< skill-level level="3" >}}Cooldown of the lethal-hit save is reduced.{{< /skill-level >}}
{{< /skill >}}

### Hunter

Neither predator nor prey, exactly. Hunters move like the terrain isn't there and build the kind of bond with wild Bestia that makes taming look almost effortless.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [warrior tree](#warrior-tree)" />}}

{{< skill name="Camouflage" maxLevel="3"
    description="Teaches the Hunter to read the land well enough to disappear into it. Reduces the range at which wild Bestia and monsters notice the master, and grants a damage bonus on an opening attack from concealment." >}}
`-10%/lv` detection range of wild Bestia<br>
`+8%/lv` damage on an ambushing first strike
{{< /skill >}}

{{< skill name="Lightfooted" maxLevel="5"
    description="Hard terrain does not reduce the Bestia movement speed anymore. On Level 5 the terrain does not reduce movement speed at all." >}}
`-20%/level` reduced movement reduction
{{< /skill >}}

{{< skill name="Master Tracker" maxLevel="3" requires="Camouflage Lv. 2 and Lightfooted Lv. 3"
    description="The Hunter's capstone: a Bestia's trail stops being a trail and starts being a map." >}}
{{< skill-level level="1" >}}Can follow the trail of any Bestia across long distances, even hours after it passed.{{< /skill-level >}}
{{< skill-level level="2" >}}Gains a critical strike bonus against a tracked target.{{< /skill-level >}}
{{< skill-level level="3" >}}Trail-tracking range and duration are both doubled.{{< /skill-level >}}
{{< /skill >}}

### Assassin

Masters of hidden infiltration. They can deal high amount of single target damage and know a lot about poisons to coat their weapons.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [warrior tree](#warrior-tree)" />}}

- Strip Weapons _(placeholder)_
- Dual Wield _(placeholder)_
- Hide _(placeholder)_
- Cloak _(placeholder)_
- Poison Research _(placeholder)_
- Enchant Poison _(placeholder)_

{{< skill name="Weapon Coating" maxLevel="5"
    description="Coat weapons and armor to protect them against damage and strip effects." >}}
{{< /skill >}}

### Knight

Where a Brawler trusts bare knuckles and a Wizard trusts raw mana, a Knight trusts steel - a lot of it, worn on the body and swung in the hand. This is the tree for masters who would rather stand at the front of a fight than avoid it.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [warrior tree](#warrior-tree)" />}}

{{< skill name="Heavy Weapon Mastery" maxLevel="10"
    description="Years spent drilling with sword, axe, mace and spear until the weight stops mattering. Increases damage dealt with heavy one- and two-handed melee weapons and reduces the accuracy penalty from wielding oversized ones." >}}
`+3 ATK/lv` with heavy melee weapons<br>
`-10%/lv` weapon size accuracy penalty
{{< /skill >}}

{{< skill name="Heavy Armor Mastery" maxLevel="10"
    description="Plate and mail punish anyone who hasn't trained to move in them. This skill teaches the body to carry the weight without giving up speed, complementing the protection of Iron Skin with the ability to actually wear it." >}}
`+2 DEF/lv` while wearing heavy armor<br>
`-5%/lv` movement and attack speed penalty from heavy armor weight
{{< /skill >}}

{{< skill name="Provoke" maxLevel="5"
    description="A shout, a slammed shield, whatever gets the job done - forces nearby enemies to focus their attacks on the Knight instead of their allies for a short duration." >}}
`+10%/lv` chance-to-target bonus against the Knight<br>
Higher levels extend the duration and the range at which enemies can be provoked
{{< /skill >}}

{{< skill name="Shield Wall" maxLevel="5" requires="Heavy Armor Mastery Lv. 2"
    description="Plants the Knight's feet and raises their shield into a proper wall. While active, incoming physical damage is reduced but movement speed drops sharply." >}}
{{< skill-level level="1" >}}`-15%` incoming physical damage, `-50%` movement speed while active.{{< /skill-level >}}
{{< skill-level level="3" >}}Damage reduction improves to `-25%` and the movement penalty eases to `-30%`.{{< /skill-level >}}
{{< skill-level level="5" >}}Damage reduction improves to `-35%` and a portion of blocked damage is returned to the attacker.{{< /skill-level >}}
{{< /skill >}}

{{< skill name="Bash" maxLevel="5" requires="Heavy Weapon Mastery Lv. 3"
    description="A single committed swing that trades finesse for raw impact, with a chance to stagger whatever it lands on." >}}
`+20%/lv` damage compared to a normal attack<br>
`+5%/lv` chance to stagger the target on hit
{{< /skill >}}

{{< skill name="Auto Guard" maxLevel="5" requires="Shield Wall Lv. 2"
    description="A trained reflex that raises the shield on its own the instant a blow lands, sometimes fast enough to stop it cold." >}}
`+4%/lv` chance to fully block a physical hit while a shield is equipped
{{< /skill >}}

{{< skill name="Charge" maxLevel="5" requires="Bash Lv. 3"
    description="Closes the distance to a target in an instant, weapon first. The impact deals damage and briefly forces the target to focus the Knight, folding a gap closer and a taunt into a single swing." >}}
`-0.5s/lv` cooldown<br>
Deals damage and applies a short [Provoke](#skill-provoke) effect on impact
{{< /skill >}}

{{< skill name="Juggernaut" maxLevel="3" requires="Heavy Armor Mastery Lv. 5 and Charge Lv. 3 and Auto Guard Lv. 3"
    description="The Knight's capstone. For a short time the line between wall and weapon stops meaning anything." >}}
{{< skill-level level="1" >}}Once activated, gains `+20%` DEF and `+20%` ATK for a short duration.{{< /skill-level >}}
{{< skill-level level="2" >}}Duration is extended and the Knight becomes immune to stagger and knockback while active.{{< /skill-level >}}
{{< skill-level level="3" >}}Cooldown is reduced and a fully blocked hit (via [Auto Guard](#skill-auto-guard)) refreshes the remaining duration.{{< /skill-level >}}
{{< /skill >}}

### Bard

Where a Sage studies magic to bend it, a Bard studies it to sing along with it. Every note carried on the wind can steady an ally's arm or unstring an enemy's nerve. A Bard alone can hearten a party; a Bard standing next to a [Dancer](#dancer) can do quite a lot more.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [warrior tree](#warrior-tree)" />}}

{{< skill name="Instrument Mastery" maxLevel="10"
    description="Training with stringed and wind instruments well enough to fight with them in a pinch and to make every song carry further and land harder." >}}
`+2 ATK/lv` while an instrument is equipped<br>
`+3%/lv` range and effect strength of songs
{{< /skill >}}

{{< skill name="Voice Training" maxLevel="5"
    description="A trained voice reaches further and holds a note longer than an untrained one ever could." >}}
`+1 tile/lv` area of effect for songs<br>
`+10%/lv` duration of song effects
{{< /skill >}}

{{< skill name="Ballad of the Fallen" maxLevel="5" requires="Instrument Mastery Lv. 3"
    description="A driving battle hymn that steels the resolve of everyone in earshot." >}}
`+2%/lv` ATK and MATK to party members within range while the song plays
{{< /skill >}}

{{< skill name="War March" maxLevel="5" requires="Instrument Mastery Lv. 3"
    description="A quickstep tune that puts a spring in the step and a snap in the swing of everyone marching to it." >}}
`+2%/lv` movement and attack speed to party members within range while the song plays
{{< /skill >}}

{{< skill name="Dissonant Chord" maxLevel="5" requires="Instrument Mastery Lv. 5"
    description="Deliberately off-key and unpleasant to hear by design. Rattles nearby enemies badly enough to throw off their aim and their footing." >}}
`-3%/lv` HIT and ASPD to enemies within range while the song plays
{{< /skill >}}

{{< skill name="Poem of the Netherworld" maxLevel="5" requires="Dissonant Chord Lv. 2"
    description="A mournful dirge that drags at the mana of anyone unlucky enough to hear it, siphoning it into the surrounding air." >}}
`+2%/lv` mana drain per tick to enemies within range while the song plays
{{< /skill >}}

{{< skill name="Siren's Lullaby" maxLevel="3" requires="Dissonant Chord Lv. 3"
    description="Not every song is meant to be heard for long. A slow, heavy melody that can lull a listener clean off their feet." >}}
{{< skill-level level="1" >}}Small chance per tick to put an enemy in range to sleep.{{< /skill-level >}}
{{< skill-level level="2" >}}Sleep chance and range are increased.{{< /skill-level >}}
{{< skill-level level="3" >}}Sleep chance is increased further and the effect ignores a portion of the target's status resistance.{{< /skill-level >}}
{{< /skill >}}

{{< skill name="Mystic Melody" maxLevel="5" requires="Voice Training Lv. 3"
    description="An old wandering tune said to carry a bit of luck with it. Occasionally shakes loose a minor beneficial effect for whoever is listening." >}}
`+3%/lv` chance per tick to grant a party member within range a small heal or cleanse a negative status
{{< /skill >}}

{{< skill name="Harmonic Duet" maxLevel="3" requires="Ballad of the Fallen Lv. 5 and War March Lv. 5"
    description="The Bard's capstone. No song written for one voice sounds quite complete - performing alongside a master who has trained the [Dancer](#dancer) tree lets both of you play parts neither could carry alone." >}}
{{< skill-level level="1" >}}While performing near a master with Dancer skills active, active songs and dances gain `+15%` effect strength for both performers' parties.{{< /skill-level >}}
{{< skill-level level="2" >}}The bonus increases to `+25%` and the combined range is extended.{{< /skill-level >}}
{{< skill-level level="3" >}}The bonus increases to `+40%` and a single additional song or dance from each performer can be active at the same time.{{< /skill-level >}}
{{< /skill >}}

### Dancer

Where a Bard leans on breath and instrument, a Dancer leans on footwork and nerve - closing the distance, reading an enemy's weak step, and turning a whip into an argument nobody wins. A Dancer alone can unravel a fight from the inside; a Dancer standing next to a [Bard](#bard) can do quite a lot more.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [warrior tree](#warrior-tree)" />}}

{{< skill name="Whip Mastery" maxLevel="10"
    description="Training with whips and chain-weapons until the reach stops feeling awkward. Increases damage dealt with whip-type weapons and the range at which they can strike." >}}
`+2 ATK/lv` while a whip is equipped<br>
`+3%/lv` effective reach
{{< /skill >}}

{{< skill name="Nimble Steps" maxLevel="5"
    description="A Dancer trusts footwork over plate. Rather than wearing heavy armor, they learn to simply not be where the hit lands." >}}
`+2%/lv` FLEE while wearing light armor or no armor
{{< /skill >}}

{{< skill name="Slow Grace" maxLevel="5" requires="Whip Mastery Lv. 3"
    description="A whip-strike aimed less at the flesh than at the footing. Leaves a target's steps a beat slower for a while after." >}}
`-3%/lv` movement and attack speed to the struck target for a short duration
{{< /skill >}}

{{< skill name="Sultry Rhythm" maxLevel="5" requires="Slow Grace Lv. 2"
    description="A hypnotic sway that draws an enemy's guard down before they even notice it slipping." >}}
`-3%/lv` DEF and SDEF to the struck target for a short duration
{{< /skill >}}

{{< skill name="Venomous Flourish" maxLevel="5" requires="Slow Grace Lv. 2"
    description="A whip's tip can carry more than momentum. Coats each strike with a mild toxin that wears an enemy down over time." >}}
`+2%/lv` chance per hit to apply a poison dealing damage over time
{{< /skill >}}

{{< skill name="Mirage Step" maxLevel="5" requires="Nimble Steps Lv. 3"
    description="A dance performed in motion rather than in place, sharing the Dancer's own knack for not being where the hit lands with everyone nearby." >}}
`+2%/lv` FLEE to party members within range while the dance plays
{{< /skill >}}

{{< skill name="Guiding Steps" maxLevel="5" requires="Nimble Steps Lv. 3"
    description="A steady, ground-eating rhythm that keeps a traveling party's legs fresh long after they should have given out." >}}
`+2%/lv` movement speed and `-2%/lv` stamina drain to party members within range while the dance plays
{{< /skill >}}

{{< skill name="Captivating Gaze" maxLevel="3" requires="Venomous Flourish Lv. 3"
    description="A held look and a held breath is sometimes all it takes. A single enemy loses track of who it was even fighting." >}}
{{< skill-level level="1" >}}Small chance to force the target to attack a random nearby enemy instead of the Dancer's party for a short duration.{{< /skill-level >}}
{{< skill-level level="2" >}}Chance and duration are increased.{{< /skill-level >}}
{{< skill-level level="3" >}}Chance is increased further and the effect ignores a portion of the target's status resistance.{{< /skill-level >}}
{{< /skill >}}

{{< skill name="Radiant Waltz" maxLevel="3" requires="Mirage Step Lv. 5 and Guiding Steps Lv. 5"
    description="The Dancer's capstone. No dance choreographed for one performer sounds quite complete - performing alongside a master who has trained the [Bard](#bard) tree lets both of you play parts neither could carry alone." >}}
{{< skill-level level="1" >}}While performing near a master with Bard skills active, active songs and dances gain `+15%` effect strength for both performers' parties.{{< /skill-level >}}
{{< skill-level level="2" >}}The bonus increases to `+25%` and the combined range is extended.{{< /skill-level >}}
{{< skill-level level="3" >}}The bonus increases to `+40%` and a single additional song or dance from each performer can be active at the same time.{{< /skill-level >}}
{{< /skill >}}
