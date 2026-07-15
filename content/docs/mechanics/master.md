---
title: Bestia Master
---

The small intro game tells players how they became a Bestia Master: They came into direct contact with an ephemeral mana crystal that changed their nature through magic and connected them to the mana flows of the universe. They are therefore receptive to the influence of mana and are able to communicate with the beings that emerge from this mythical energy: **the Bestia**.

The attachment to mana also explains why Bestia masters were able to survive the destruction of their world relatively unscathed and to pass on to the next incarnation of the world.

# Master Skills

The bestia master can learn a set of skills. These skills are freely chosen by the player and determine the job or profession of the master.

Some of this account skills can be used by every Bestia in posession of the master (or at least have an passive effect on them) others can only be used actively by the master itself.

{{< alert context="info" text="Don't confuse this skill system with the regular attacks a Bestia is learning by item usage or just by level up. Those are simply called attacks." />}}

* The number of total skil ranks inside a tree should **be between 70-80**
* The possible rank counts of a skill should be: **1, 3, 5 and 10**
* There should be some meaningful dependency of the skills forming a tree
* In each profession tree there should form 2-3 sub-trees which create a meaningful hierarchy
* There should be some kind of three tiers inside a tree to lead from low and basic skill to the much powerfull skills

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

# Skill Trees

The following trees exist, they are organized in subtrees.

## Novice Tree

In order to learn how to interact with other player you need to invest your first skill points in this skill tree.

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

{{< skill name="Cooking" maxLevel="3" requires="Basic Skill 7" description="The Master and his Bestia can start to cook meals on fire places. This meals apply certain buff effects when they are eaten.<br>Cooking Time -10% / Lv<br>Success Chance +10% / Lv">}}
{{< /skill >}}

{{< skill name="Play Dead" maxLevel="1"
    description="Feigns death to avoid menace of nearby enemies. This skill can be switched on and off. After performing the ritual to become a Bestia Master this skill can not be used anymore." >}}
{{< /skill >}}

{{< skill name="First Aid" maxLevel="1" >}}
{{< columns >}}
Apply bandages to Bestia and channel a healing effect of up to 50% of their total health or 100 HP whatever comes first, over a duration of 20s. The cooldown is 5 minutes. A Bestia can only receive a single First Aid every 60 secs.
{{< /columns >}}
{{< /skill >}}

## Craftsman Tree

The workbenches, forges and cauldrons of Bestia's tradesfolk turn raw ambition into things a player can actually use. Every blade, trinket and bottled miracle a master ever relies on started out as somebody's Craftsman skill paying off.

{{< skill name="Handyman" maxLevel="5" description="You are very skilled in working with tools and raw material. Building structures in the world is very quick for you and your Bestia.<br>Reduces construction time of structures by -10% / Lv" >}}
{{< /skill >}}

{{< skill name="Item Customization" maxLevel="10" description="You are able to rework items to put slots in them in which runes can be slottet.<br>Requires an 'Engraving Set' which will be consumed in the process." >}}
{{< /skill >}}

{{< skill name="Carpentry" maxLevel="10" description="Allows you to construct useful items of daily use which can be placed in the world." >}}
{{< /skill >}}

### Blacksmith

Steel remembers who beat it into shape. Blacksmiths turn ore into weaponry and armor worth carrying into a manastorm, and are the only ones who can [refine](/docs/mechanics/items/#weapon-refinement) either further afterwards.

{{< skill name="Ore Refinement" maxLevel="5"
    description="Trains the eye to read raw ore before it ever sees a forge - a foundational skill for both weapon and armor smithing." >}}
{{< skill-level level="1" >}}Can tell common ore apart from uncommon ore before smelting.{{< /skill-level >}}
{{< skill-level level="2" >}}Reveals rare ore veins within a short radius, complementing a [Miner's](#miner) eye.{{< /skill-level >}}
{{< skill-level level="3" >}}Smelting waste is reduced, yielding more ingots per unit of ore.{{< /skill-level >}}
{{< /skill >}}

{{< skill name="Blacksmith" maxLevel="10" requires="Ore Refinemnt Lv. 3 and Item Customization Lv. 5" >}}
{{< columns >}}
Able to forge weaponry from smelted ingots and [refine weapons](/docs/mechanics/items/#weapon-refinement) further afterward. Higher skill level raises the odds of both a successful refine and of forging a higher-level weapon blueprint.
<--->
> `+4%/lv` success chance when upgrading a weapon<br>
> Higher levels unlock forging higher-level weapon blueprints
{{< /columns >}}
{{< /skill >}}

{{< skill name="Armorsmith" maxLevel="10" requires="Ore Refinemnt Lv. 3 and Item Customization Lv. 5" >}}
{{< columns >}}
The counterpart to Blacksmith: forges plate, mail and shields from smelted ingots and [refines armor](/docs/mechanics/items/#armor-refinement) further afterward.
<--->
> Higher levels unlock forging higher-level armor blueprints
{{< /columns >}}
{{< /skill >}}

{{< skill name="Weaponry Research" maxLevel="10" requires="???" >}}
Deeper knowledge of weapons and armor allows you to upgrade existing equipment. If an upgrade fails the equipment can be destroyed.

> `+4%/lv` success chance when upgrading armor or weapons<br>
{{< /skill >}}

{{< skill name="Weapon Repair" maxLevel="5" description="You can repair damaged or broken equipments to refurbish and make them usable again." >}}
{{< /skill >}}

{{< skill name="Master Smith" maxLevel="5" requires="Blacksmith Lv. 5 and Armorsmith Lv. 3"
    description="The capstone of the forge. Unlocks the highest tier of weapon and armor blueprints and makes a Blacksmith's hands steady enough to trust with the rarest ore." >}}
{{< skill-level level="1" >}}Unlocks forging and refining of the highest-level weapon and armor blueprints.{{< /skill-level >}}
{{< skill-level level="3" >}}`-2%/lv` chance for equipment to be destroyed on a failed refine.{{< /skill-level >}}
{{< skill-level level="5" >}}A failed refine on a legendary-tier item downgrades it by one refine step instead of destroying it, once per day.{{< /skill-level >}}
{{< /skill >}}

### Artificer

Where Blacksmiths hammer steel, Artificers coax it into remembering spells. This path enscribes magic onto items, binds it to triggers, and crystalizes raw mana into shards other professions can build on.

{{< skill name="Mana Harvester" maxLevel="5" requires="???"
    description="Build and operate Mana harverster which channel mana from the environment into raw christals. The source of magic for many use cases." >}}
{{< /skill >}}

{{< skill name="Runic Etching" maxLevel="10"
    description="Create runes from Bestia essences. Those runes are embued with the power of the Bestia and be used to be slotted into a weapon or equipment which was slotted." >}}
{{< skill-level level="1" >}}TBD.{{< /skill-level >}}
{{< /skill >}}

{{< skill name="Magic Artisan" maxLevel="10" requires="Runic Etching Lv. 2" >}}
{{< columns >}}
Can create magic artefacts by binding sustained enchantments to an item, going well beyond what a single etched rune can hold.
{{< /columns >}}
{{< /skill >}}

{{< skill name="Manaflow Expert" maxLevel="5" requires="???" >}}
{{< columns >}}
Turn raw and instable manacrystals into the finest raw materials to build powerful magic artifacts.
{{< /columns >}}
{{< /skill >}}

### Alchemist

Equal parts kitchen and laboratory. Alchemists turn raw ingredients - mundane or mana-soaked - into food, tonics and reagents nobody else can replicate twice. Some carry the first bandages they ever learned to wrap as a Novice all the way into a healer's toolkit.

{{< skill name="Herbalism" maxLevel="5"
    description="Teaches which roots, herbs and mana-touched growth are worth the harvest, and how to keep them potent until they reach the cauldron." >}}
{{< skill-level level="1" >}}Can identify the quality grade of a reagent before harvesting it.{{< /skill-level >}}
{{< skill-level level="2" >}}Harvested reagents keep their full potency for longer before spoiling.{{< /skill-level >}}
{{< skill-level level="3" >}}Small chance to harvest a bonus reagent from the same node.{{< /skill-level >}}
{{< /skill >}}

{{< skill name="Alchemy" maxLevel="10" requires="Herbalism Lv. 2"
    description="The core craft of the Alchemist: brewing reagents down into potions, tonics and other consumables. Builds directly on what Herbalism teaches about picking the right ingredient." >}}
{{< skill-level level="1" >}}Can brew basic potions and usables at a workbench cauldron.{{< /skill-level >}}
{{< skill-level level="5" >}}Failed brews return half of the raw reagents used instead of losing them entirely.{{< /skill-level >}}
{{< skill-level level="10" >}}Unlocks brewing the highest-level potion and usable blueprints.{{< /skill-level >}}
{{< /skill >}}

{{< skill name="Transmutation" maxLevel="10" requires="Alchemy Lv. 5"
    description="The Alchemist's capstone. Where Alchemy brews what nature already provides, Transmutation reshapes matter itself." >}}
{{< columns >}}
The user can transform resources into magical infused resources. These are very rare resources needed for strong artifect creation or weapon refinements.
<--->
Higher levels unlock transmuting higher-grade infused resources
{{< /columns >}}
{{< /skill >}}

{{< skill name="Weapon Coating" maxLevel="5" >}}
Protects weapons and armor against damage and strip effects.
{{< /skill >}}

{{< skill name="Alchemy Mastery" maxLevel="5" requires="???"
    description="The Alchemist's capstone. Where Alchemy brews what nature already provides, Transmutation reshapes matter itself." >}}
{{< columns >}}
???
{{< /columns >}}
{{< /skill >}}

## Survival Tree

Skills which allow the player to keep exploring the world and stay active longer far away from settlements are placed in this skill tree. Foresters live off the land, Prospectors chart what nobody has mapped yet, and Miners dig for what the land is hiding.

* Quick Travel
* Enlarge Weight Limit

{{< skill name="Fishing" maxLevel="5" >}}
{{< columns >}}
With this skill you are able to catch fish. Fish can be cooked are used for food and trading.
<--->
> Level increas makes it easier to catch higher level fish.
{{< /columns >}}
{{< /skill >}}

### Forester

At home wherever the trees outnumber the people. Foresters live off the land - felling timber, landing the catch of the day, and striking up a bond with Bestia most masters would call unapproachable.

{{< skill name="Lumberjack" maxLevel="5" >}}
{{< columns >}}
The player is able to gather wood resources faster.
<--->
> -3%/lv wood gathering time
> +2%/lvl resource drop chance
{{< /columns >}}
{{< /skill >}}

{{< skill name="Trapping" maxLevel="5"
    description="Sets snares and deadfalls that keep working for the master even while they're off doing something else." >}}
{{< columns >}}
Lets the master place snares in the wild that passively catch small game over time, yielding meat and pelts on a later check-in.
<--->
> `+4%/lv` chance a snare yields a catch<br>
> Higher levels unlock snares for larger game
{{< /columns >}}
{{< /skill >}}

{{< skill name="Expert Taming" maxLevel="5" >}}
{{< columns >}}
Bestia under your control gain faster experience and require less food to maintain their stamina out in the open.

* `+5%/lv` EXP gain
* `-2%/lv` Stamina loss
{{< /columns >}}
{{< /skill >}}

{{< skill name="Beastfriend" maxLevel="5" requires="Expert Taming Lv. 3" >}}
{{< columns >}}
    Detail knowledge of the Bestia and their behavior makes it easier for you to tame and catch them.
`+5%/lv` chance to tame
{{< /columns >}}
{{< /skill >}}

### Prospector

Half surveyor, half treasure hunter. Prospectors chart unclaimed land, feel out resources long before anyone else arrives, and travel heavier and further than sense would recommend.

{{< skill name="Power Maximize" maxLevel="5" >}}
Weight limit increase for all other Bestia under your control.
{{< /skill >}}

{{< skill name="Cartography" maxLevel="5" >}}
{{< columns >}}
Enables the player to chart unexplored land, revealing terrain that can be shared, traded on, or built on. See [World Exploration](/docs/mechanics/world-exploration/#cartography) for how the surveying minigame plays out.
<--->
> Each level reduces the difficulty of surveying unexplored land.
{{< /columns >}}
{{< /skill >}}

{{< skill name="Wilderness Survival" maxLevel="5"
    description="Hardens the master and their Bestia against travel through hostile terrain, far from the comfort of a settlement." >}}
{{< columns >}}
Reduces the stamina and HP drain caused by hostile terrain and environmental hazards while exploring unsettled land.
<--->
> `-4%/lv` stamina drain in hostile terrain<br>
> `-4%/lv` environmental hazard damage
{{< /columns >}}
{{< /skill >}}

{{< skill name="Weather-Beaten" maxLevel="3" requires="Wilderness Survival Lv. 3"
    description="For those who've been rained, snowed and sandstormed on so often that the sky has nothing left to teach them." >}}
{{< skill-level level="1" >}}Movement is no longer slowed by rain, snow or sandstorms.{{< /skill-level >}}
{{< skill-level level="2" >}}Visibility reduction from fog or storms is halved.{{< /skill-level >}}
{{< skill-level level="3" >}}Gains minor resistance to weather-inflicted status effects (frostbite, heatstroke).{{< /skill-level >}}
{{< /skill >}}

### Miner

If it's buried, a Miner will find a way to it. Equal parts pickaxe and stubbornness, this path turns raw earth - literally - into opportunity.

{{< skill name="Mining" maxLevel="5" >}}
{{< columns >}}
Specialized in digging mine shafts and gather mineral resources.

* Level 1 enables you to place a mining shaft
* -5%/lv mining time
* +2%/lv resource drop chance
{{< /columns >}}
{{< /skill >}}

{{< skill name="Gem Cutting" maxLevel="5" requires="Mining Lv. 3"
    description="Turns the rough gemstones a Miner digs up into cut stones fit for an Artificer's socket or a Trader's scale." >}}
{{< columns >}}
Can cut raw gems recovered from mining into faceted gemstones, increasing their value and unlocking their use in socketed equipment.
<--->
> Higher levels unlock cutting higher-grade gems<br>
> `-3%/lv` chance to shatter a gem while cutting
{{< /columns >}}
{{< /skill >}}

{{< skill name="Deep Delver" maxLevel="5" requires="Mining Lv. 3"
    description="Lets a Miner push shafts deeper than good sense would recommend, into ground that pays off precisely because nobody else risks it." >}}
{{< columns >}}
Grants access to deeper, more dangerous mine shafts holding rarer ore veins and the odd buried structure.
<--->
> `-5%/lv` chance of a cave-in<br>
> Higher levels unlock access to deeper shaft tiers
{{< /columns >}}
{{< /skill >}}

{{< skill name="Tremor Sense" maxLevel="3" requires="Gem Cutting Lv. 3 and Deep Delver Lv. 3"
    description="The Miner's capstone: a feel for what's underfoot precise enough to map a shaft before the first swing of the pick." >}}
{{< skill-level level="1" >}}Can sense ore and gem deposits through solid rock within a short range.{{< /skill-level >}}
{{< skill-level level="2" >}}Range is doubled and buried structures are revealed alongside deposits.{{< /skill-level >}}
{{< skill-level level="3" >}}Can also sense structural weaknesses, warning of a cave-in before it happens.{{< /skill-level >}}
{{< /skill >}}

## Scholar Tree

The Scholar tree contains skills which help with sensing the world's events and performing rituals to shape the face of the Bestia world itself. Traders keep the gears of commerce turning while Sages chase magic to its source - enscribing, discovering, and eventually bending distance itself.

{{< skill name="Improved Healing" maxLevel="10" requires="First Aid Lv. 1" >}}
{{< columns >}}
Increases effects of healing done and duration of buff spells when used by the owner of this spell. Builds on the fundamentals every Novice picks up during [First Aid](#skill-first-aid) training.
> `+3% effect/level`<br>
{{< /columns >}}
{{< /skill >}}

{{< skill name="Magic Sense" maxLevel="5" >}}
{{< columns >}}
User can detect the presense of magic nearby. It can also identify a magical spell which might be bound to an entity.
{{< /columns >}}
{{< /skill >}}

* teleport
* rift discovery (boss spawns, world events)

### Priest

* Heal
* remove curses and poison
* mana regen
* blessing
* lex aeterna
* pneuma
* safety wall
* magic shield
* kyrie eleison
* devine protection
* increase agi
* decrease agi
* cure
* aqua benedicta lv 1
* ruwach 5
* teleport
* warp portal
* pneuma
* holy light
* demon bane
* signum crusis
* mace mastery
* status recovry
* ressurection
* increase mana recovery
* lex diving
* turn undead
* Lex Aeterna
* magnus exorcismus
* magnificat
* gloria
* impositiio manus
* suffragium
* aspersio
* B S Sacramenti
* santuary (heal lv 1)

### Trader

Coin has its own kind of magic. Traders read markets instead of mana flows, linking auction houses together, minting the coin everyone else trades in, and looking out for goods that might otherwise walk off on their own.

* Discount 10
* Overcharge 10 (Discount 3)
* Mammonite (10)

{{< skill name="Appraisal" maxLevel="5"
    description="Trains an eye for what goods are actually worth, cutting through both a merchant's markup and a forger's polish." >}}
{{< columns >}}
Reveals an item's true condition and quality before it's bought or sold, and can flag counterfeit or mislabeled goods.
<--->
> `+3%/lv` better prices when buying or selling based on assessed value
{{< /columns >}}
{{< /skill >}}

{{< skill name="Scavenger" maxLevel="10" >}}
{{< columns >}}
When breaking up and recycling items the probability to recycle a higher amount of components is increased.
<--->
> `-5%/lv` price reduction at NPCs<br>
> `+3%/lv` higher price when selling at NPC
{{< /columns >}}
{{< /skill >}}

{{< skill name="Minting" maxLevel="5" requires="Appraisal Lv. 2"
    description="The final step between a fistful of raw gold and coin that actually spends. See [Currency](/docs/mechanics/economy-trade/#currency) for how the world's money supply is minted from mined gold." >}}
{{< columns >}}
Allows the master to mint raw gold directly into gold coins, and coins down into silver or copper, in bulk and without an NPC mint's cut.
<--->
> `-3%/lv` minting fee<br>
> `+10%/lv` amount minted per batch
{{< /columns >}}
{{< /skill >}}

{{< skill name="Trade Post Owner" maxLevel="5" >}}
Allows you to build trading posts which can be used by other citizen to buy and sell items. Only a single trading post can be located inside a settlement.

{{< skill-level level="1" >}}Create up to 1 trading posts. Set fees between 0-5%.{{< /skill-level >}}
{{< skill-level level="2" >}}Create up to 2 trading posts. Set fees between 0-10%.{{< /skill-level >}}
{{< skill-level level="3" >}}Create up to 3 trading posts. Set fees between 0-15%.{{< /skill-level >}}
{{< skill-level level="4" >}}Create up to 4 trading posts. Set fees between 0-20%.{{< /skill-level >}}
{{< skill-level level="5" >}}Create up to 5 trading posts. Set fees between 0-25%.{{< /skill-level >}}
{{< /skill >}}

{{< skill name="Trade Agreement" maxLevel="5" >}}
Allows the master to link his auction house with those of other consenting players, merging their listings into a single, wider [marketplace](/docs/mechanics/economy-trade/#linking-auction-houses).

{{< skill-level level="1" >}}Link with up to 1 players.{{< /skill-level >}}
{{< skill-level level="2" >}}Link with up to 2 players.{{< /skill-level >}}
{{< skill-level level="3" >}}Link with up to 3 players.{{< /skill-level >}}
{{< skill-level level="4" >}}Link with up to 4 players.{{< /skill-level >}}
{{< skill-level level="5" >}}Link with up to 5 players.{{< /skill-level >}}
{{< /skill >}}

{{< skill name="Founder" maxLevel="5" >}}
{{< columns >}}
Allows you to create a settlement by placing a city sign.
{{< /columns >}}
{{< /skill >}}

{{< skill name="Honorable Citizen" maxLevel="5" requires="Minting Lv. 2 and Trade Agreement Lv. 1"
    description="A quiet ledger of who's been caught with sticky fingers." >}}
{{< columns >}}
Anyone caught stealing from this Trader's stock, mint or linked auction listings suffers a steeper honor penalty than they otherwise would.
{{< /columns >}}
{{< /skill >}}

### Sage

Books, wards and long nights spent staring into scrying bowls. Sages study magic itself - discovering it, enscribing it, binding it, and eventually learning to fold distance in on itself with teleportation and portals.

* Elemental Fields
* Magic Protection
* Magic Break (Half Mdef, Double Matk)
* Free Cast (move while casting)
* Endow Weapons elemental
* Read Enemy
* Mana Drain
* Mana Transfer
* Weather Control

{{< skill name="Spell Training" maxLevel="10" >}}
{{< columns >}}
Train a spell from a scroll to a Bestia. The scroll will be consumed in this process. The success chance depends on the level of the scroll.
{{< /columns >}}
{{< /skill >}}

{{< skill name="Spell Enscription" maxLevel="10" requires="Spell Discovery Lv. 3" >}}
{{< columns >}}
Enables you to extract a spell from the memory of a Bestia onto a spell scroll which can be used to either trigger the spell once or to learn it to another bestia. However there is a chance that the mind of a Bestia is destroyed during the extraction, killing the Bestia in the process
{{< /columns >}}
{{< /skill >}}

{{< skill name="Scry" maxLevel="5" requires="Arcane Studies Lv. 2" >}}
{{< columns >}}
The caster can gather information about areas located far away from his position. This is also a helpful spell to detect possible resources in areas which might be worth exploring.
{{< /columns >}}
{{< /skill >}}

{{< skill name="Spell Binding" maxLevel="10" requires="Spell Enscription Lv. 3" >}}
{{< columns >}}
Allows the user to bind certain spells to entities and create trigger for them. This can be used to permanently bind spells to artifacts or setup alarms or traps for example.
{{< /columns >}}
{{< /skill >}}

{{< skill name="Teleport" maxLevel="5" requires="Spell Binding Lv. 3" >}}
{{< columns >}}
Can teleport own bestias over a distance. To teleport somewhere one needs to setup Teleport Runes which form some kind of magical anchor - the same kind of anchor a Spell Binder learns to set for alarms and traps.
They can be used as targets then trying to teleport. The teleportation gets harder and more error prone the longer distances are tried to travel.
The teleported entity also gets a debuff which will prevent it from teleporting again for some time.
{{< /columns >}}
{{< /skill >}}

{{< skill name="Warp Portal" maxLevel="10" requires="Teleport Lv. 5"
    description="The Sage's capstone. Where Teleport moves one anchor's worth of travelers once, a Portal tears a standing hole between two anchors that anyone can walk through." >}}
{{< columns >}}
Can teleport any entity over a distance. To teleport somewhere one needs to setup Portal Runes which form some kind of magical anchor. As soon as a portal has opened it can be used in both directions for some time.
<--->
> 1 person/lv can use the portal
{{< /columns >}}
{{< /skill >}}

## Warrior Tree

Where the other trees build, gather and study, the Warrior tree is built to fight. Wizards burn the battlefield down with elemental and arcane fury, Brawlers shrug off punishment nobody should be able to shrug off, and Hunters strike up a bond with wild Bestia most people just run from.

### Wizard

Fire, water, wind, earth, and the deeper currents of holy and dark magic - Wizards bend all of it into a weapon, at the cost of the armor most masters would rather keep.

* Dispell
* Spell Breaker

{{< skill name="Elemental Mastery" maxLevel="5" >}}
{{< columns >}}
Increases damage or healing of spells with elemental (earth, wind, water, fire) domain.
<--->
> `+3% damage/lv`
{{< /columns >}}
{{< /skill >}}

{{< skill name="Spiritual Mastery" maxLevel="5" >}}
{{< columns >}}
Increases damage or healing of spells with the Holy or Dark domain.
<--->
> `+5% damage/lv`
{{< /columns >}}
{{< /skill >}}

{{< skill name="Master of Fire" maxLevel="5" requires="Elemental Mastery Lv. 2" >}}
{{< columns >}}
Increases the damage of fire attacks.
<--->
> `+3% damage/lv`
{{< /columns >}}
{{< /skill >}}

{{< skill name="Master of Water" maxLevel="5" requires="Elemental Mastery Lv. 2" >}}
{{< columns >}}
Increases damage of water spells.
<--->
> `+3% damage/lv`
{{< /columns >}}
{{< /skill >}}

{{< skill name="Master of Wind" maxLevel="5" requires="Elemental Mastery Lv. 2" >}}
{{< columns >}}
Increases damage of wind spells.
<--->
> `+3% damage/lv`
{{< /columns >}}
{{< /skill >}}

{{< skill name="Master of Earth" maxLevel="5" requires="Elemental Mastery Lv. 2" >}}
{{< columns >}}
Increases damage of earth spells.
<--->
> `+3% damage/lv`
{{< /columns >}}
{{< /skill >}}

{{< skill name="Mindbreak" maxLevel="5" requires="Elemental Mastery Lv. 3 or Spiritual Mastery Lv. 3"
    description="The Wizard's capstone: a buff channeling so much raw magic through a Bestia at once that its armor is the first thing to give." >}}
{{< columns >}}
This is a buff which once it gets applied reduces the armor but increases magical attack of a Bestia. It cancels `Mindfocus`.
<--->
> `+20% MATK/level`<br>
> `-20% MDEF/level`<br>
{{< /columns >}}
{{< /skill >}}

### Brawler

No fancy footwork, no elemental theatrics - just the kind of toughness that keeps going long after everyone else has called it quits.

{{< skill name="Tough Guy" maxLevel="5" >}}
{{< columns >}}
Stamina is faster regenerated and drops slower in high demanding environments and while doing activities which would otherwise deplete your stamina.
<--->
> -10%/level reduced stamina reduction<br>
> +10%/level increased stamina regeneration
{{< /columns >}}
{{< /skill >}}

{{< skill name="Iron Skin" maxLevel="5"
    description="The physical counterpart to a Wizard's Magic Armor: hide toughened by nothing more than sheer stubbornness." >}}
{{< columns >}}
Reduces incoming physical damage. Unlike Magic Armor this costs no mana, but the reduction is more modest.
<--->
> `-2%/lv` reduced physical damage
{{< /columns >}}
{{< /skill >}}

{{< skill name="Magic Armor" maxLevel="5" >}}
{{< columns >}}
Reduces damage of magical effects but each hit costs 0.2% percent of the max mana of the owner. When the mana drops below 10% the buff is cancelled.
<--->
> `-2%/level` reduced damage
{{< /columns >}}
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

{{< skill name="Camouflage" maxLevel="3"
    description="Teaches the Hunter to read the land well enough to disappear into it." >}}
{{< columns >}}
Reduces the range at which wild Bestia and monsters notice the master, and grants a damage bonus on an opening attack from concealment.
<--->
> `-10%/lv` detection range of wild Bestia<br>
> `+8%/lv` damage on an ambushing first strike
{{< /columns >}}
{{< /skill >}}

{{< skill name="Lightfooted" maxLevel="5" >}}
{{< columns >}}
Hard terrain does not reduce the Bestia movement speed anymore. On Level 5 the terrain does not reduce movement speed anymore at all.
<--->
> `-20%/level reduced movement reduction`<br>
{{< /columns >}}
{{< /skill >}}

{{< skill name="Inner Peace" maxLevel="10" >}}
{{< columns >}}
Your Bestias and Masters HP, Mana and Stamina will have an increased regeneration rate.
<--->
> `+3% effect/level`<br>
{{< /columns >}}
{{< /skill >}}

{{< skill name="Master Tracker" maxLevel="3" requires="Camouflage Lv. 2 and Lightfooted Lv. 3"
    description="The Hunter's capstone: a Bestia's trail stops being a trail and starts being a map." >}}
{{< skill-level level="1" >}}Can follow the trail of any Bestia across long distances, even hours after it passed.{{< /skill-level >}}
{{< skill-level level="2" >}}Gains a critical strike bonus against a tracked target.{{< /skill-level >}}
{{< skill-level level="3" >}}Trail-tracking range and duration are both doubled.{{< /skill-level >}}
{{< /skill >}}

### Assassin

Masters of hidden infiltration. They can deal high amount of single target damage and know a lot about poisons to coat their weapons.

* Strip Weapons
* Dual Wield
* Hide
* Cloak
* Poison Research
* Enchant Poison

### Knight

### Bard

### Dancer
