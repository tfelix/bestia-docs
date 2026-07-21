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

{{< skill name="Cooking" maxLevel="3" requires="Basic Skill Lv. 7" description="The Master and his Bestia can start to cook meals on fire places. These meals apply certain buff effects when they are eaten.<br>Cooking Time -10% / Lv<br>Success Chance +10% / Lv" >}}
{{< /skill >}}

{{< skill name="Play Dead" maxLevel="1"
    description="Feigns death to avoid menace of nearby enemies. This skill can be switched on and off. After performing the ritual to become a Bestia Master this skill can not be used anymore." >}}
{{< /skill >}}

{{< skill name="First Aid" maxLevel="1"
    description="Apply bandages to a Bestia and channel a healing effect of up to 50% of their total health or 100 HP, whichever comes first, over a duration of 20s. The cooldown is 5 minutes. A Bestia can only receive a single First Aid every 60 secs." >}}
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

{{< skill name="Blacksmith" maxLevel="10" requires="Ore Refinement Lv. 3 and Item Customization Lv. 5"
    description="Able to forge weaponry from raw ingredients. Higher skill level unlocks forging higher-level weapon blueprints." >}}
{{< /skill >}}

{{< skill name="Armorsmith" maxLevel="10" requires="Ore Refinement Lv. 3 and Item Customization Lv. 5"
    description="The counterpart to Blacksmith: forges plate, mail and shields from smelted ingots. Higher skill level unlocks forging higher-level armor blueprints." >}}
{{< /skill >}}

{{< skill name="Weaponry Research" maxLevel="10" requires="Blacksmith Lv. 3 and Armorsmith Lv. 3"
    description="Deeper knowledge of weapons and armor that raises the odds of successfully [refining](/docs/mechanics/items/#weapon-refinement) either one further after forging. If an upgrade fails the equipment can be destroyed." >}}
`+4%/lv` success chance when upgrading a weapon or armor
{{< /skill >}}

{{< skill name="Weapon Repair" maxLevel="5" requires="Ore Refinement Lv. 2"
    description="You can repair damaged or broken equipment to refurbish and make it usable again. Higher levels unlock repairing equipment of a higher [item level](/docs/mechanics/items/#item-level)." >}}
{{< skill-level level="1" >}}Can repair equipment up to item level 20.{{< /skill-level >}}
{{< skill-level level="2" >}}Can repair equipment up to item level 40.{{< /skill-level >}}
{{< skill-level level="3" >}}Can repair equipment up to item level 60.{{< /skill-level >}}
{{< skill-level level="4" >}}Can repair equipment up to item level 80.{{< /skill-level >}}
{{< skill-level level="5" >}}Can repair equipment of any item level, no cap.{{< /skill-level >}}
{{< /skill >}}

{{< skill name="Master Smith" maxLevel="5" requires="Blacksmith Lv. 5 and Armorsmith Lv. 5"
    description="The capstone of the forge. Makes a Blacksmith's hands steady enough to trust with the rarest ore." >}}
{{< skill-level level="1" >}}`+5%` Weapon/Armor forging and `+5%` upgrade chance{{< /skill-level >}}
{{< skill-level level="2" >}}`+10%` Weapon/Armor forging and `+10%` upgrade chance{{< /skill-level >}}
{{< skill-level level="3" >}}`+15%` Weapon/Armor forging and `+15%` upgrade chance{{< /skill-level >}}
{{< skill-level level="4" >}}`+20%` Weapon/Armor forging and `+20%` upgrade chance{{< /skill-level >}}
{{< skill-level level="5" >}}`+25%` Weapon/Armor forging and `+25%` upgrade chance{{< /skill-level >}}
{{< /skill >}}

### Artificer

Where Blacksmiths hammer steel, Artificers coax it into remembering spells. This path enscribes magic onto items, binds it to triggers, and crystalizes raw mana into shards other professions can build on.

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

{{< skill name="Magic Artisan" maxLevel="10" requires="Runic Etching Lv. 2"
    description="Can create magic artefacts by binding sustained enchantments to an item, going well beyond what a single etched rune can hold." >}}
`+4%/lv` enchantment chance<br>
`-7%/lv` chance to destroy the item if the binding fails
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
    description="The Alchemist's capstone. Where Alchemy brews what nature already provides, Transmutation reshapes mundane matter itself into the rare magically-infused resources needed for strong artifact creation and weapon refinements." >}}
> Higher levels unlock transmuting higher-grade infused resources
{{< /skill >}}

{{< skill name="Alchemy Mastery" maxLevel="5" requires="Alchemy Lv. 5"
    description="Placeholder - an advanced alchemical specialization to be designed." >}}
{{< /skill >}}

## Survival Tree

Skills which allow the player to keep exploring the world and stay active longer far away from settlements are placed in this skill tree. Foresters live off the land, Prospectors chart what nobody has mapped yet, and Miners dig for what the land is hiding.

_The following skill is parked here for now - its final placement is still to be decided._

{{< skill name="Inner Peace" maxLevel="10"
    description="Your Bestia and Master gain an increased HP and Mana regeneration rate." >}}
> `+3% effect/lv`
{{< /skill >}}

{{< skill name="Weather Resistance (placeholder)" maxLevel="5"
    description="Your Bestia and Master gain an increased tolerance against high and low environment temperatures." >}}
`+3%` higher tolerance/lv
{{< /skill >}}

* Quick Travel - higher travel speed for your Bestia _(placeholder)_

### Forester

At home wherever the trees outnumber the people. Foresters live off the land - felling timber, landing the catch of the day, and striking up a bond with Bestia most masters would call unapproachable.

{{< skill name="Fishing" maxLevel="5"
    description="With this skill you are able to catch fish. Fish can be cooked and are used for food and trading." >}}
> Higher levels make it easier to catch higher-level fish.
{{< /skill >}}

{{< skill name="Lumberjack" maxLevel="5"
    description="The player is able to gather wood resources faster." >}}
> `-3%/lv` wood gathering time<br>
> `+2%/lv` resource drop chance
{{< /skill >}}

{{< skill name="Trapping" maxLevel="5"
    description="Sets snares and deadfalls that keep working for the master even while they're off doing something else, passively catching small game over time for meat and pelts on a later check-in." >}}
> `+4%/lv` chance a snare yields a catch<br>
> Higher levels unlock snares for larger game
{{< /skill >}}

{{< skill name="Expert Taming" maxLevel="5"
    description="Bestia under your control gain faster experience and require less food to maintain their stamina out in the open." >}}
`+5%/lv` EXP gain<br>
`-2%/lv` stamina loss
{{< /skill >}}

{{< skill name="Beastfriend" maxLevel="5" requires="Expert Taming Lv. 3"
    description="Detailed knowledge of the Bestia and their behavior makes it easier for you to tame and catch them." >}}
`+5%/lv` chance to tame
{{< /skill >}}

### Prospector

Half surveyor, half treasure hunter. Prospectors chart unclaimed land, feel out resources long before anyone else arrives, and travel heavier and further than sense would recommend.

{{< skill name="Power Maximize" maxLevel="5"
    description="Raises the carrying capacity of your own Master." >}}
{{< /skill >}}

{{< skill name="Enlarge Weight Limit" maxLevel="5"
    description="Raises the carrying capacity of every Bestia under your control." >}}
{{< /skill >}}

{{< skill name="Cartography" maxLevel="5"
    description="Enables the player to chart unexplored land, revealing terrain that can be shared, traded on, or built on. See [World Exploration](/docs/mechanics/world-exploration/#cartography) for how the surveying minigame plays out." >}}
> Each level reduces the difficulty of surveying unexplored land.
{{< /skill >}}

{{< skill name="Wilderness Survival" maxLevel="5"
    description="Hardens the master and their Bestia against travel through hostile terrain, far from the comfort of a settlement. Reduces the stamina and HP drain caused by hostile terrain and environmental hazards while exploring unsettled land." >}}
> `-4%/lv` stamina drain in hostile terrain<br>
> `-4%/lv` environmental hazard damage
{{< /skill >}}

{{< skill name="Weather-Beaten" maxLevel="3" requires="Wilderness Survival Lv. 3"
    description="For those who've been rained, snowed and sandstormed on so often that the sky has nothing left to teach them." >}}
{{< skill-level level="1" >}}Movement is no longer slowed by rain, snow or sandstorms.{{< /skill-level >}}
{{< skill-level level="2" >}}Visibility reduction from fog or storms is halved.{{< /skill-level >}}
{{< skill-level level="3" >}}Gains minor resistance to weather-inflicted status effects (frostbite, heatstroke).{{< /skill-level >}}
{{< /skill >}}

### Miner

If it's buried, a Miner will find a way to it. Equal parts pickaxe and stubbornness, this path turns raw earth - literally - into opportunity.

{{< skill name="Mining" maxLevel="5"
    description="Specialized in digging mine shafts and gathering mineral resources." >}}
> Level 1 enables you to place a mining shaft<br>
> `-5%/lv` mining time<br>
> `+2%/lv` resource drop chance
{{< /skill >}}

{{< skill name="Gem Cutting" maxLevel="5" requires="Mining Lv. 3"
    description="Turns the rough gemstones a Miner digs up into cut stones fit for an Artificer's socket or a Trader's scale. Can cut raw gems recovered from mining into faceted gemstones, increasing their value and unlocking their use in socketed equipment." >}}
> Higher levels unlock cutting higher-grade gems<br>
> `-3%/lv` chance to shatter a gem while cutting
{{< /skill >}}

{{< skill name="Deep Delver" maxLevel="5" requires="Mining Lv. 3"
    description="Lets a Miner push shafts deeper than good sense would recommend, into ground that pays off precisely because nobody else risks it. Grants access to deeper, more dangerous mine shafts holding rarer ore veins and the odd buried structure." >}}
> `-5%/lv` chance of a cave-in<br>
> Higher levels unlock access to deeper shaft tiers
{{< /skill >}}

{{< skill name="Tremor Sense" maxLevel="3" requires="Gem Cutting Lv. 3 and Deep Delver Lv. 3"
    description="The Miner's capstone: a feel for what's underfoot precise enough to map a shaft before the first swing of the pick." >}}
{{< skill-level level="1" >}}Can sense ore and gem deposits through solid rock within a short range.{{< /skill-level >}}
{{< skill-level level="2" >}}Range is doubled and buried structures are revealed alongside deposits.{{< /skill-level >}}
{{< skill-level level="3" >}}Can also sense structural weaknesses, warning of a cave-in before it happens.{{< /skill-level >}}
{{< /skill >}}

## Scholar Tree

The Scholar tree contains skills which help with sensing the world's events and performing rituals to shape the face of the Bestia world itself. Traders keep the gears of commerce turning while Sages chase magic to its source - enscribing, discovering, and eventually bending distance itself.

{{< skill name="Magic Sense" maxLevel="5"
    description="User can detect the presence of magic nearby. It can also identify a magical spell which might be bound to an entity." >}}
{{< /skill >}}

* rift discovery (boss spawns, world events) _(placeholder)_

### Priest

Priests channel mana into blessings that keep a party alive - restoring health, lifting curses, and bolstering the vitality of Bestia out in the field.

{{< skill name="Improved Healing" maxLevel="10" requires="First Aid Lv. 1"
    description="Increases effects of healing done and duration of buff spells when used by the owner of this spell. Builds on the fundamentals every Novice picks up during [First Aid](#skill-first-aid) training." >}}
> `+3% effect/lv`
{{< /skill >}}

{{< skill name="Vitality" maxLevel="10" requires="Improved Healing Lv. 2"
    description="An active buff that raises the maximum HP and Mana of a target Bestia for a duration." >}}
> `+2%/lv` max HP and Mana while active
{{< /skill >}}

Further Priest skills (placeholders, to be designed):

* Heal
* remove curses and poison
* blessing
* lex aeterna
* pneuma
* kyrie eleison
* devine protection
* increase agi
* decrease agi
* cure
* aqua benedicta
* ruwach
* holy light
* demon bane
* signum crusis
* mace mastery
* status recovery
* ressurection
* turn undead
* magnus exorcismus
* magnificat
* gloria
* impositio manus
* suffragium
* aspersio
* sanctuary

### Trader

Coin has its own kind of magic. Traders read markets instead of mana flows, linking auction houses together, minting the coin everyone else trades in, and looking out for goods that might otherwise walk off on their own.

* Discount 10 _(placeholder)_
* Overcharge 10 / Discount 3 _(placeholder)_
* Mammonite 10 _(placeholder)_

{{< skill name="Appraisal" maxLevel="5"
    description="Trains an eye for what goods are actually worth, cutting through both a merchant's markup and a forger's polish. Reveals an item's true condition and quality before it's bought or sold, and can flag counterfeit or mislabeled goods." >}}
> `+3%/lv` better prices when buying or selling based on assessed value
{{< /skill >}}

{{< skill name="Scavenger" maxLevel="10"
    description="When breaking up and recycling items the probability to recycle a higher amount of components is increased." >}}
> `-5%/lv` price reduction at NPCs<br>
> `+3%/lv` higher price when selling at NPC
{{< /skill >}}

{{< skill name="Minting" maxLevel="5" requires="Appraisal Lv. 2"
    description="The final step between a fistful of raw gold and coin that actually spends. Allows the master to mint raw gold directly into gold coins, and coins down into silver or copper, in bulk and without an NPC mint's cut. See [Currency](/docs/mechanics/economy-trade/#currency) for how the world's money supply is minted from mined gold." >}}
> `-3%/lv` minting fee<br>
> `+10%/lv` amount minted per batch
{{< /skill >}}

{{< skill name="Founder" maxLevel="5"
    description="Allows you to create a settlement by placing a city sign." >}}
{{< /skill >}}

{{< skill name="Trade Post Owner" maxLevel="5"
    description="Allows you to build trading posts which can be used by other citizen to buy and sell items. Only a single trading post can be located inside a settlement." >}}
{{< skill-level level="1" >}}Create up to 1 trading posts. Set fees between 0-5%.{{< /skill-level >}}
{{< skill-level level="2" >}}Create up to 2 trading posts. Set fees between 0-10%.{{< /skill-level >}}
{{< skill-level level="3" >}}Create up to 3 trading posts. Set fees between 0-15%.{{< /skill-level >}}
{{< skill-level level="4" >}}Create up to 4 trading posts. Set fees between 0-20%.{{< /skill-level >}}
{{< skill-level level="5" >}}Create up to 5 trading posts. Set fees between 0-25%.{{< /skill-level >}}
{{< /skill >}}

{{< skill name="Trade Agreement" maxLevel="5" requires="Trade Post Owner Lv. 1"
    description="Allows the master to link his auction house with those of other consenting players, merging their listings into a single, wider [marketplace](/docs/mechanics/economy-trade/#linking-auction-houses)." >}}
{{< skill-level level="1" >}}Link with up to 1 players.{{< /skill-level >}}
{{< skill-level level="2" >}}Link with up to 2 players.{{< /skill-level >}}
{{< skill-level level="3" >}}Link with up to 3 players.{{< /skill-level >}}
{{< skill-level level="4" >}}Link with up to 4 players.{{< /skill-level >}}
{{< skill-level level="5" >}}Link with up to 5 players.{{< /skill-level >}}
{{< /skill >}}

{{< skill name="Honorable Citizen" maxLevel="5" requires="Minting Lv. 2 and Trade Agreement Lv. 1"
    description="A quiet ledger of who's been caught with sticky fingers. Anyone caught stealing from this Trader's stock, mint or linked auction listings suffers a steeper honor penalty than they otherwise would." >}}
{{< /skill >}}

### Sage

Books, wards and long nights spent staring into scrying bowls. Sages study magic itself - discovering it, enscribing it, binding it, and eventually learning to fold distance in on itself with teleportation and portals.

* Elemental Fields _(placeholder)_
* Free Cast - move while casting _(placeholder)_
* Endow Weapons elemental (3 level) _(placeholder)_
* Read Enemy _(placeholder)_
* Mana Drain _(placeholder)_
* Mana Transfer _(placeholder)_
* Weather Control _(placeholder)_

{{< skill name="Spell Training" maxLevel="10"
    description="Train a spell from a scroll to a Bestia. The scroll will be consumed in this process. The success chance depends on the level of the scroll." >}}
{{< /skill >}}

{{< skill name="Scry" maxLevel="5" requires="Spell Training Lv. 2"
    description="The caster can gather information about areas located far away from his position. This is also a helpful spell to detect possible resources in areas which might be worth exploring." >}}
{{< /skill >}}

{{< skill name="Spell Enscription" maxLevel="10" requires="Spell Training Lv. 3"
    description="Enables you to extract a spell from the memory of a Bestia onto a spell scroll which can be used to either trigger the spell once or to learn it to another bestia. However there is a chance that the mind of a Bestia is destroyed during the extraction, killing the Bestia in the process." >}}
{{< /skill >}}

{{< skill name="Spell Binding" maxLevel="10" requires="Spell Enscription Lv. 3"
    description="Allows the user to bind certain spells to entities and create trigger for them. This can be used to permanently bind spells to artifacts or setup alarms or traps for example." >}}
{{< /skill >}}

{{< skill name="Teleport" maxLevel="5" requires="Spell Binding Lv. 3"
    description="Can teleport own bestias over a distance. To teleport somewhere one needs to setup Teleport Runes which form some kind of magical anchor - the same kind of anchor a Spell Binder learns to set for alarms and traps. They can be used as targets when trying to teleport. The teleportation gets harder and more error prone the longer distances are tried to travel. The teleported entity also gets a debuff which will prevent it from teleporting again for some time." >}}
{{< /skill >}}

{{< skill name="Warp Portal" maxLevel="10" requires="Teleport Lv. 5"
    description="The Sage's capstone. Where Teleport moves one anchor's worth of travelers once, a Portal tears a standing hole between two anchors that anyone can walk through. To teleport somewhere one needs to setup Portal Runes which form some kind of magical anchor. As soon as a portal has opened it can be used in both directions for some time." >}}
> 1 person/lv can use the portal
{{< /skill >}}

## Warrior Tree

Where the other trees build, gather and study, the Warrior tree is built to fight. Wizards burn the battlefield down with elemental and arcane fury, Brawlers shrug off punishment nobody should be able to shrug off, Hunters strike up a bond with wild Bestia most people just run from, Assassins vanish before the first drop of blood even hits the ground, Knights plant themselves between danger and everyone else, and Bards and Dancers turn a battlefield into something worth listening to.

{{< skill name="Endure" maxLevel="1"
    description="HP and Mana regeneration is not stopped during combat." >}}
{{< /skill >}}

{{< skill name="Iron Skin" maxLevel="5"
    description="The physical counterpart to a Wizard's Magic Armor: hide toughened by nothing more than sheer stubbornness. Reduces incoming physical damage. Unlike Magic Armor this costs no mana, but the reduction is more modest." >}}
> `-2%/lv` reduced physical damage
{{< /skill >}}

{{< skill name="Magic Armor" maxLevel="5"
    description="Reduces damage of magical effects but each hit costs 0.2% percent of the max mana of the owner. When the mana drops below 10% the buff is cancelled." >}}
> `-2%/level` reduced damage
{{< /skill >}}

### Wizard

Fire, water, wind, earth, and the deeper currents of holy and dark magic - Wizards bend all of it into a weapon, at the cost of the armor most masters would rather keep.

* Dispell _(placeholder)_
* Spell Breaker _(placeholder)_

{{< skill name="Elemental Mastery" maxLevel="5"
    description="Increases damage or healing of spells with elemental (earth, wind, water, fire) domain." >}}
> `+3% damage/lv`
{{< /skill >}}

{{< skill name="Spiritual Mastery" maxLevel="5"
    description="Increases damage or healing of spells with the Holy or Dark domain." >}}
> `+5% damage/lv`
{{< /skill >}}

{{< skill name="Master of Fire" maxLevel="5" requires="Elemental Mastery Lv. 2"
    description="Increases the damage of fire attacks." >}}
> `+3% damage/lv`
{{< /skill >}}

{{< skill name="Master of Water" maxLevel="5" requires="Elemental Mastery Lv. 2"
    description="Increases damage of water spells." >}}
> `+3% damage/lv`
{{< /skill >}}

{{< skill name="Master of Wind" maxLevel="5" requires="Elemental Mastery Lv. 2"
    description="Increases damage of wind spells." >}}
> `+3% damage/lv`
{{< /skill >}}

{{< skill name="Master of Earth" maxLevel="5" requires="Elemental Mastery Lv. 2"
    description="Increases damage of earth spells." >}}
> `+3% damage/lv`
{{< /skill >}}

{{< skill name="Mindbreak" maxLevel="5" requires="Elemental Mastery Lv. 3 or Spiritual Mastery Lv. 3"
    description="The Wizard's capstone: a buff channeling so much raw magic through a Bestia at once that its armor is the first thing to give. Once applied it reduces the armor but increases magical attack of a Bestia. It cancels `Mindfocus`." >}}
> `+20% MATK/level`<br>
> `-20% MDEF/level`
{{< /skill >}}

### Brawler

No fancy footwork, no elemental theatrics - just the kind of toughness that keeps going long after everyone else has called it quits.

{{< skill name="Tough Guy" maxLevel="5"
    description="Stamina is faster regenerated and drops slower in high demanding environments and while doing activities which would otherwise deplete your stamina." >}}
> `-10%/lv` reduced stamina reduction<br>
> `+10%/lv` increased stamina regeneration
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
    description="Teaches the Hunter to read the land well enough to disappear into it. Reduces the range at which wild Bestia and monsters notice the master, and grants a damage bonus on an opening attack from concealment." >}}
> `-10%/lv` detection range of wild Bestia<br>
> `+8%/lv` damage on an ambushing first strike
{{< /skill >}}

{{< skill name="Lightfooted" maxLevel="5"
    description="Hard terrain does not reduce the Bestia movement speed anymore. On Level 5 the terrain does not reduce movement speed at all." >}}
> `-20%/level` reduced movement reduction
{{< /skill >}}

{{< skill name="Master Tracker" maxLevel="3" requires="Camouflage Lv. 2 and Lightfooted Lv. 3"
    description="The Hunter's capstone: a Bestia's trail stops being a trail and starts being a map." >}}
{{< skill-level level="1" >}}Can follow the trail of any Bestia across long distances, even hours after it passed.{{< /skill-level >}}
{{< skill-level level="2" >}}Gains a critical strike bonus against a tracked target.{{< /skill-level >}}
{{< skill-level level="3" >}}Trail-tracking range and duration are both doubled.{{< /skill-level >}}
{{< /skill >}}

### Assassin

Masters of hidden infiltration. They can deal high amount of single target damage and know a lot about poisons to coat their weapons.

* Strip Weapons _(placeholder)_
* Dual Wield _(placeholder)_
* Hide _(placeholder)_
* Cloak _(placeholder)_
* Poison Research _(placeholder)_
* Enchant Poison _(placeholder)_

{{< skill name="Weapon Coating" maxLevel="5"
    description="Coat weapons and armor to protect them against damage and strip effects." >}}
{{< /skill >}}

### Knight

Where a Brawler trusts bare knuckles and a Wizard trusts raw mana, a Knight trusts steel - a lot of it, worn on the body and swung in the hand. This is the tree for masters who would rather stand at the front of a fight than avoid it.

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
> `+10%/lv` chance-to-target bonus against the Knight<br>
> Higher levels extend the duration and the range at which enemies can be provoked
{{< /skill >}}

{{< skill name="Shield Wall" maxLevel="5" requires="Heavy Armor Mastery Lv. 2"
    description="Plants the Knight's feet and raises their shield into a proper wall. While active, incoming physical damage is reduced but movement speed drops sharply." >}}
{{< skill-level level="1" >}}`-15%` incoming physical damage, `-50%` movement speed while active.{{< /skill-level >}}
{{< skill-level level="3" >}}Damage reduction improves to `-25%` and the movement penalty eases to `-30%`.{{< /skill-level >}}
{{< skill-level level="5" >}}Damage reduction improves to `-35%` and a portion of blocked damage is returned to the attacker.{{< /skill-level >}}
{{< /skill >}}

{{< skill name="Bash" maxLevel="5" requires="Heavy Weapon Mastery Lv. 3"
    description="A single committed swing that trades finesse for raw impact, with a chance to stagger whatever it lands on." >}}
> `+20%/lv` damage compared to a normal attack<br>
> `+5%/lv` chance to stagger the target on hit
{{< /skill >}}

{{< skill name="Auto Guard" maxLevel="5" requires="Shield Wall Lv. 2"
    description="A trained reflex that raises the shield on its own the instant a blow lands, sometimes fast enough to stop it cold." >}}
> `+4%/lv` chance to fully block a physical hit while a shield is equipped
{{< /skill >}}

{{< skill name="Charge" maxLevel="5" requires="Bash Lv. 3"
    description="Closes the distance to a target in an instant, weapon first. The impact deals damage and briefly forces the target to focus the Knight, folding a gap closer and a taunt into a single swing." >}}
> `-0.5s/lv` cooldown<br>
> Deals damage and applies a short [Provoke](#skill-provoke) effect on impact
{{< /skill >}}

{{< skill name="Juggernaut" maxLevel="3" requires="Heavy Armor Mastery Lv. 5 and Charge Lv. 3 and Auto Guard Lv. 3"
    description="The Knight's capstone. For a short time the line between wall and weapon stops meaning anything." >}}
{{< skill-level level="1" >}}Once activated, gains `+20%` DEF and `+20%` ATK for a short duration.{{< /skill-level >}}
{{< skill-level level="2" >}}Duration is extended and the Knight becomes immune to stagger and knockback while active.{{< /skill-level >}}
{{< skill-level level="3" >}}Cooldown is reduced and a fully blocked hit (via [Auto Guard](#skill-auto-guard)) refreshes the remaining duration.{{< /skill-level >}}
{{< /skill >}}

### Bard

Where a Sage studies magic to bend it, a Bard studies it to sing along with it. Every note carried on the wind can steady an ally's arm or unstring an enemy's nerve. A Bard alone can hearten a party; a Bard standing next to a [Dancer](#dancer) can do quite a lot more.

{{< skill name="Instrument Mastery" maxLevel="10"
    description="Training with stringed and wind instruments well enough to fight with them in a pinch and to make every song carry further and land harder." >}}
`+2 ATK/lv` while an instrument is equipped<br>
`+3%/lv` range and effect strength of songs
{{< /skill >}}

{{< skill name="Voice Training" maxLevel="5"
    description="A trained voice reaches further and holds a note longer than an untrained one ever could." >}}
> `+1 tile/lv` area of effect for songs<br>
> `+10%/lv` duration of song effects
{{< /skill >}}

{{< skill name="Ballad of the Fallen" maxLevel="5" requires="Instrument Mastery Lv. 3"
    description="A driving battle hymn that steels the resolve of everyone in earshot." >}}
> `+2%/lv` ATK and MATK to party members within range while the song plays
{{< /skill >}}

{{< skill name="War March" maxLevel="5" requires="Instrument Mastery Lv. 3"
    description="A quickstep tune that puts a spring in the step and a snap in the swing of everyone marching to it." >}}
> `+2%/lv` movement and attack speed to party members within range while the song plays
{{< /skill >}}

{{< skill name="Dissonant Chord" maxLevel="5" requires="Instrument Mastery Lv. 5"
    description="Deliberately off-key and unpleasant to hear by design. Rattles nearby enemies badly enough to throw off their aim and their footing." >}}
> `-3%/lv` HIT and ASPD to enemies within range while the song plays
{{< /skill >}}

{{< skill name="Poem of the Netherworld" maxLevel="5" requires="Dissonant Chord Lv. 2"
    description="A mournful dirge that drags at the mana of anyone unlucky enough to hear it, siphoning it into the surrounding air." >}}
> `+2%/lv` mana drain per tick to enemies within range while the song plays
{{< /skill >}}

{{< skill name="Siren's Lullaby" maxLevel="3" requires="Dissonant Chord Lv. 3"
    description="Not every song is meant to be heard for long. A slow, heavy melody that can lull a listener clean off their feet." >}}
{{< skill-level level="1" >}}Small chance per tick to put an enemy in range to sleep.{{< /skill-level >}}
{{< skill-level level="2" >}}Sleep chance and range are increased.{{< /skill-level >}}
{{< skill-level level="3" >}}Sleep chance is increased further and the effect ignores a portion of the target's status resistance.{{< /skill-level >}}
{{< /skill >}}

{{< skill name="Mystic Melody" maxLevel="5" requires="Voice Training Lv. 3"
    description="An old wandering tune said to carry a bit of luck with it. Occasionally shakes loose a minor beneficial effect for whoever is listening." >}}
> `+3%/lv` chance per tick to grant a party member within range a small heal or cleanse a negative status
{{< /skill >}}

{{< skill name="Harmonic Duet" maxLevel="3" requires="Ballad of the Fallen Lv. 5 and War March Lv. 5"
    description="The Bard's capstone. No song written for one voice sounds quite complete - performing alongside a master who has trained the [Dancer](#dancer) tree lets both of you play parts neither could carry alone." >}}
{{< skill-level level="1" >}}While performing near a master with Dancer skills active, active songs and dances gain `+15%` effect strength for both performers' parties.{{< /skill-level >}}
{{< skill-level level="2" >}}The bonus increases to `+25%` and the combined range is extended.{{< /skill-level >}}
{{< skill-level level="3" >}}The bonus increases to `+40%` and a single additional song or dance from each performer can be active at the same time.{{< /skill-level >}}
{{< /skill >}}

### Dancer

Where a Bard leans on breath and instrument, a Dancer leans on footwork and nerve - closing the distance, reading an enemy's weak step, and turning a whip into an argument nobody wins. A Dancer alone can unravel a fight from the inside; a Dancer standing next to a [Bard](#bard) can do quite a lot more.

{{< skill name="Whip Mastery" maxLevel="10"
    description="Training with whips and chain-weapons until the reach stops feeling awkward. Increases damage dealt with whip-type weapons and the range at which they can strike." >}}
`+2 ATK/lv` while a whip is equipped<br>
`+3%/lv` effective reach
{{< /skill >}}

{{< skill name="Nimble Steps" maxLevel="5"
    description="A Dancer trusts footwork over plate. Rather than wearing heavy armor, they learn to simply not be where the hit lands." >}}
> `+2%/lv` FLEE while wearing light armor or no armor
{{< /skill >}}

{{< skill name="Slow Grace" maxLevel="5" requires="Whip Mastery Lv. 3"
    description="A whip-strike aimed less at the flesh than at the footing. Leaves a target's steps a beat slower for a while after." >}}
> `-3%/lv` movement and attack speed to the struck target for a short duration
{{< /skill >}}

{{< skill name="Sultry Rhythm" maxLevel="5" requires="Slow Grace Lv. 2"
    description="A hypnotic sway that draws an enemy's guard down before they even notice it slipping." >}}
> `-3%/lv` DEF and SDEF to the struck target for a short duration
{{< /skill >}}

{{< skill name="Venomous Flourish" maxLevel="5" requires="Slow Grace Lv. 2"
    description="A whip's tip can carry more than momentum. Coats each strike with a mild toxin that wears an enemy down over time." >}}
> `+2%/lv` chance per hit to apply a poison dealing damage over time
{{< /skill >}}

{{< skill name="Mirage Step" maxLevel="5" requires="Nimble Steps Lv. 3"
    description="A dance performed in motion rather than in place, sharing the Dancer's own knack for not being where the hit lands with everyone nearby." >}}
> `+2%/lv` FLEE to party members within range while the dance plays
{{< /skill >}}

{{< skill name="Guiding Steps" maxLevel="5" requires="Nimble Steps Lv. 3"
    description="A steady, ground-eating rhythm that keeps a traveling party's legs fresh long after they should have given out." >}}
> `+2%/lv` movement speed and `-2%/lv` stamina drain to party members within range while the dance plays
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
