---
weight: 230
title: Survival Tree
description: "Forester, Prospector and Miner: living off the land, charting the unknown and digging for what it hides."
---

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

Raises the [weight limit](/docs/mechanics/items-crafting/items/#weight-limit) of the Master and of every Bestia under their command by
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
    description="Nights in the snow and noons in the desert teach a Master and their Bestia to shrug off the weather. Widens the band of [temperatures](/docs/mechanics/world/environment/#temperature) they can bear, on the cold side and the hot side alike." >}}

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

Each cast points to the nearest thing of each kind within the detection distance: an ore deposit, ground where rare
[herbs](/docs/mechanics/items-crafting/natural-resources/#herbs) grow, a forest, and a wild bestia. The marks show on
the compass for 60 seconds, with a line in the chat. Nothing is put on the map.

Without accuracy a shown spot can be off by up to 40% of its distance. The accuracy takes that share away: at level 5
a spot 1 km away is off by at most 200 m.

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

Anyone with a [fishing rod](/docs/mechanics/items-crafting/fishing/#fishing-rods) can fish, but an untrained angler
mostly catches fish and loot up to level 10. Each rank raises that catch level cap. Above the cap, a catch gets rarer
the further over it is: its odds halve for every 5 levels. See [Fishing](/docs/mechanics/items-crafting/fishing/).

| Lv. | Catch Level Cap |
| --- | --------------- |
| 1   | 20              |
| 2   | 40              |
| 3   | 60              |
| 4   | 80              |
| 5   | 100             |

{{< /skill >}}

# Forester

At home wherever the trees outnumber the people. Foresters live off the land - felling timber, landing the catch of the day, and striking up a bond with Bestia most masters would call unapproachable. The ones who stay at it long enough stop merely catching Bestia and start shaping the bloodlines they come from.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [survival tree](/docs/mechanics/master/survival-tree/)" />}}

The Forester has two routes. The **Woodsman** fells and replants the forest, sets traps and reads tracks. The **Beastmaster** tames Bestia and breeds better bloodlines.

```mermaid
graph TD
    Lumberjack["Lumberjack (1-5)"]
    Replanting["Replanting (1-3)"]
    Trapping["Trapping (1-5)"]
    TrackReading["Track Reading (1-5)"]
    ExpertTaming["Expert Taming (1-5)"]
    Beastfriend["Beastfriend (1-5)"]
    BloodlineStudy["Bloodline Study (1-5)"]

    Lumberjack -->|Lv.2| Replanting
    Trapping -->|Lv.3| TrackReading
    ExpertTaming -->|Lv.3| Beastfriend
    Beastfriend -->|Lv.3| BloodlineStudy
```

<br>
{{< skill name="Lumberjack" maxLevel="5"
    type="Passive"
    description="An axeman's read of the forest - which trunks fell clean, which grain splits true, and how to bring both down efficiently." >}}

A tree falls only to an axe, a greataxe or a felling tool such as a hatchet. Lumberjack makes each blow count for more
of the trunk, and every stack of logs a felled tree drops may come twice.

Level 1 lets you build a Lumberjack Cabin from a kit. Bestias can work the cabin while you are away.

| Lv. | Gathering Time Reduction | Resource Drop Chance |
| --- | ------------------------ | -------------------- |
| 1   | 10%                      | +20%                 |
| 2   | 20%                      | +40%                 |
| 3   | 30%                      | +60%                 |
| 4   | 40%                      | +80%                 |
| 5   | 50%                      | +100%                |

{{< /skill >}}

{{< skill name="Replanting" maxLevel="3" requires="Lumberjack Lv. 2"
    type="Active" manaCost="5" castTime="3s" cooldown="0s" range="2" target="Tree Stump"
    description="A Forester takes from the forest and gives back." >}}

Plants a sapling in a tree stump and consumes a log. The new tree grows back faster than one left to nature, and it
does not wait for a grown tree nearby the way a stump left alone does.

| Lv. | Regrowth Time | Extra                             |
| --- | ------------- | --------------------------------- |
| 1   | -25%          |                                   |
| 2   | -50%          |                                   |
| 3   | -75%          | The grown tree gives one more log |

{{< /skill >}}

{{< skill name="Trapping" maxLevel="5"
    type="Passive"
    description="Knowing where to set a trap, how to bait it and when to spring it. Mana dust and patience do the rest." >}}

Raises the catch chance of every [Bestia trap](/docs/mechanics/bestias/bestia/#catching-bestias) the master throws. Anyone can
throw a Bestia trap; this skill only makes it hold better. The traps themselves are made with
[Carpentry](/docs/mechanics/master/craftsman-tree/#skill-carpentry).

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

Counts for the master's Bestias only: they learn faster, and lose less stamina both to the weather and to their own
skills.


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
    description="Knowing a Bestia well enough to tame it is one thing. Knowing which pair of them is worth putting in a Breeding Farm, and why the last clutch came out the way it did, is another. The Forester's capstone." >}}

Applies to every [Breeding Farm and Incubator](/docs/mechanics/bestias/bestia/#breeding) the master owns.

The time reduction stacks with planned upgrades, feed and buffs, and counts against the same **50% floor** - it lets a
modest setup reach the cap instead of raising it. The dominant-IV column is the part that cannot be bought: at Lv. 4 a
clutch draws a fourth dominant individual value, so a bloodline improves on four stats per generation rather than three.

From Lv. 1 the master reads a Bestia's or an egg's [individual values](/docs/mechanics/bestias/bestia/#individual-values)
as exact numbers instead of grades.

| Lv. | Breeding and Hatch Time Reduction | Dominant IVs per Clutch |
| --- | --------------------------------- | ----------------------- |
| 1   | 5%                                | 3                       |
| 2   | 10%                               | 3                       |
| 3   | 15%                               | 3                       |
| 4   | 20%                               | 4                       |
| 5   | 25%                               | 4                       |

{{< /skill >}}

# Prospector

Half surveyor, half treasure hunter. Prospectors chart unclaimed land, found settlements on it, feel out resources long before anyone else arrives, and travel further than sense would recommend.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [survival tree](/docs/mechanics/master/survival-tree/)" />}}

The Prospector has two routes. The **Cartographer** charts the land, reads the weather, founds settlements and keeps a party alive in the wild. The **Treasure Hunter** finds what is buried and hollow, and digs it up or sells the map.

```mermaid
graph TD
    ResourceSense[/"Resource Sense (Survival Tree)"/]
    Cartography["Cartography (1-5)"]
    WeatherSense["Weather Sense (1-3)"]
    Founder["Founder (1)"]
    BaseCamp["Base Camp (1-3)"]
    TreasureSense["Treasure Sense (1-5)"]
    EchoSounding["Echo Sounding (1-5)"]
    TreasureMap["Treasure Map (1-3)"]
    Excavation["Excavation (1-3)"]

    ResourceSense -->|Lv.1| Cartography
    Cartography -->|Lv.2| WeatherSense
    Cartography -->|Lv.3| Founder
    WeatherSense -->|Lv.1| BaseCamp

    ResourceSense -->|Lv.2| TreasureSense
    TreasureSense -->|Lv.2| EchoSounding
    TreasureSense -->|Lv.3| TreasureMap
    Cartography -->|Lv.1| TreasureMap
    TreasureSense -->|Lv.1| Excavation
```

<br>
{{< skill name="Cartography" maxLevel="5" requires="Resource Sense Lv. 1"
    type="Active" manaCost="50" castTime="3s" cooldown="None" range="0" target="Self"
    description="Enables the player to chart unexplored land, revealing terrain that can be shared, traded on, or built on. Used at your own theodolite; see [World Exploration](/docs/mechanics/world/world-exploration/#cartography) for the survey and its needle game." >}}
Each try spends one Empty Paper and one Ink. Each level reduces the difficulty of a survey by `10`. Level 3 opens the
3 km survey and level 5 the 5 km survey.
{{< /skill >}}

{{< skill name="Weather Sense" maxLevel="3" requires="Cartography Lv. 2"
    type="Passive"
    description="Charting the same valley through a dozen seasons teaches a Prospector to read the sky above it. An instinct for what the wind is about to do, well before the storm arrives, and for where the mana runs thick or thin." >}}
Everyone sees the wind on the compass. Weather Sense shows the next change of weather before it arrives, 5 minutes
ahead per level. See [Weather](/docs/mechanics/world/environment/#weather) for what each front does to the world.

It also reads the [mana in the land](/docs/mechanics/world/environment/#mana-concentration). Level 1 shows the mana
concentration where you stand. Levels 2 and 3 put two marks on the compass: towards the nearest place where the mana
is at least 10% stronger, and towards the nearest place where it is at least 10% weaker, each with its distance.

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

The cast plants a sign site under a name chosen before casting. Anyone can help build it, and the town exists once the
sign is finished. The spot must be at least `5 km` from every other settlement and outside every ward field.

Only one settlement can be active at any time. You must tear down or hand over the settlement before you can place a new
one. Only inactive settlements can be torn down, which means no post office or auction house may be left inside the
settlement's sphere of influence.

See [Player Settlements](/docs/mechanics/towns-trade/player-settlements/) for the sphere, the sign and what happens when
it falls.

{{< /skill >}}

{{< skill name="Base Camp" maxLevel="3" requires="Weather Sense Lv. 1"
    type="Active" manaCost="30" castTime="5s" cooldown="5 min" duration="per Lv." range="2" target="Campfire"
    description="Out where the roads end, a good camp is the difference between an expedition and a rescue." >}}

Turns a campfire, such as the one [Cooking](/docs/mechanics/master/novice-tree/#skill-cooking) places, into a camp. Party members and their Bestias within
`5m` bear the weather better: `±5 °C` [temperature tolerance](/docs/mechanics/world/environment/#temperature), in both
directions. Only one camp per master can stand.

| Lv. | Duration | Extra                                                                                                                       |
| --- | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| 1   | 30 min   |                                                                                                                             |
| 2   | 60 min   | +50% HP and stamina regeneration. Storms and [mana storms](/docs/mechanics/world/doomsday/#mana-storms) do not reach inside |
| 3   | 90 min   | As Lv. 2. Party members who die respawn at the camp                                                                         |


The campfire must be burning and must be the master's own or a party member's. "Storms do not reach inside" means
the weather does no harm inside a camp of Lv. 2 or higher. At Lv. 3 a party master who dies anywhere respawns at the
camp while it stands.

{{< /skill >}}

{{< skill name="Treasure Sense" maxLevel="5" requires="Resource Sense Lv. 2"
    type="Active" manaCost="15" castTime="2s" cooldown="30s" range="per Lv." target="Self"
    description="A Prospector's nose for what someone buried and never came back for." >}}

Senses [treasure caches](/docs/mechanics/world/treasure-caches/) nearby. For 60 s you see a faint shimmer on the
ground above each cache in range. A chat line says how many there are and the direction and distance to the nearest.
Caches already dug up are not sensed.

| Lv. | Radius | Also Reveals            |
| --- | ------ | ----------------------- |
| 1   | 20m    |                         |
| 2   | 40m    |                         |
| 3   | 60m    | How deep the cache lies |
| 4   | 80m    | How deep the cache lies |
| 5   | 100m   | How deep and how rich   |

{{< /skill >}}

{{< skill name="Echo Sounding" maxLevel="5" requires="Treasure Sense Lv. 2"
    type="Active" manaCost="20" castTime="2s" cooldown="20s" range="per Lv." target="Self"
    description="Knock on the world and listen to where it sounds hollow." >}}

A sound pulse that marks hollow spaces nearby on the compass, for 20 seconds and with a line in the chat: caves,
hollows and buried chambers. A hollow is a pocket of air under the ground; the open sky is not one. Where
[Resource Sonar](#skill-resource-sonar) finds ore in the rock, Echo Sounding finds the empty space in it. It becomes more
useful as the world generator digs more caves.

| Lv. | Radius | Also Reveals                       |
| --- | ------ | ---------------------------------- |
| 1   | 10m    |                                    |
| 2   | 15m    |                                    |
| 3   | 20m    | How deep and how large a hollow is |
| 4   | 25m    | How deep and how large             |
| 5   | 30m    | How deep and how large             |

{{< /skill >}}

{{< skill name="Treasure Map" maxLevel="3" requires="Treasure Sense Lv. 3 and Cartography Lv. 1"
    type="Active" manaCost="20" castTime="5s" cooldown="0s" range="0" target="Self"
    description="Not every Prospector wants to dig. Some would rather sell the map." >}}

Charts the nearest treasure cache you sensed in the last 10 minutes onto a sheet of empty paper. You can cast it
anywhere, so you do not need to walk back to the spot. The map is an item that can be traded or sold. Its holder sees
a circle on their map, and the cache lies somewhere inside it. The circle is rolled once when the map is drawn.

When anyone digs the cache up, the map crumbles into a crumbled treasure map.

| Lv. | Circle Radius |
| --- | ------------- |
| 1   | 50m           |
| 2   | 25m           |
| 3   | Exact spot    |

{{< /skill >}}

{{< skill name="Excavation" maxLevel="3" requires="Treasure Sense Lv. 1"
    type="Passive"
    description="Knowing where to dig and how not to break what lies below." >}}

Digs [treasure caches](/docs/mechanics/world/treasure-caches/#digging) faster, and raises the chance for the cache's
[top item](/docs/mechanics/world/treasure-caches/#the-top-item) above its base 25%.

| Lv. | Dig Time | Chance for the Best Item |
| --- | -------- | ------------------------ |
| 1   | -20%     | +5%                      |
| 2   | -40%     | +10%                     |
| 3   | -60%     | +15%                     |

{{< /skill >}}

# Miner

If it's buried, a Miner will find a way to it. Equal parts pickaxe and stubbornness, this path turns raw earth - literally - into opportunity.

{{< alert context="info" text="This tree is enabled as soon as you have 5 Lv. or more into [survival tree](/docs/mechanics/master/survival-tree/)" />}}

The Miner has two routes. The **Digger** gets more ore out of the rock, faster. The **Gem Cutter** turns rough stones into cut gems.

```mermaid
graph TD
    Mining["Mining (1-5)"]
    GemCutting["Gem Cutting (1-5)"]
    RichVeins["Rich Veins (1-5)"]
    ResourceSonar["Resource Sonar (1-3)"]
    Blasting["Blasting (1-5)"]
    GemLore["Gem Lore (1-3)"]

    Mining -->|Lv.3| GemCutting
    Mining -->|Lv.3| RichVeins
    RichVeins -->|Lv.3| ResourceSonar
    Mining -->|Lv.3| Blasting
    GemCutting -->|Lv.1| GemLore
```

<br>
{{< skill name="Mining" maxLevel="5"
    type="Passive"
    description="A pickaxe, a steady lamp, and the nose for where the rock is worth breaking." >}}

Anyone with a [pickaxe](/docs/mechanics/items-crafting/items/#weapon-type) can mine, but an untrained miner only gets resources up to
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
    description="Turns the rough gemstones a Miner digs up into cut gems, the vessels an Artificer binds Bestia essences into." >}}

Level 1 allows you to place a Gem Cut Station. The cast only places the station or opens its recipes. The cutting itself
takes the [craft duration](/docs/mechanics/items-crafting/crafting/#craft-duration) of the gem's item level. A failed cut shatters the gem.
The five gems and what they hold are listed under [Sockets and Essences](/docs/mechanics/items-crafting/crafting/#sockets-and-essences).

| Lv. | Success Chance | Reliable Gem Level |
| --- | -------------- | ------------------ |
| 1   | +8%            | 20                 |
| 2   | +16%           | 40                 |
| 3   | +24%           | 60                 |
| 4   | +32%           | 80                 |
| 5   | +40%           | 100+               |

Same rule as [Forge Weapon](/docs/mechanics/master/craftsman-tree/#skill-forge-weapon): no hard cap, but every gem level above the reliable one costs another
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

{{< skill name="Blasting" maxLevel="5" requires="Mining Lv. 3"
    type="Active" manaCost="10" castTime="2s" cooldown="10s" range="3" target="Ground"
    description="When the pick is too slow, a Miner reaches for something louder." >}}

Sets a blasting charge that breaks every block around it `3s` later, and hurts whoever stands too close. Consumes a
Blasting Charge, brewed with [Alchemy](/docs/mechanics/master/craftsman-tree/#skill-alchemy).

| Lv. | Radius |
| --- | ------ |
| 1   | 1m     |
| 2   | 2m     |
| 3   | 3m     |
| 4   | 4m     |
| 5   | 5m     |

{{< /skill >}}

{{< skill name="Gem Lore" maxLevel="3" requires="Gem Cutting Lv. 1"
    type="Passive"
    description="A Miner who has cut enough stones sees what a rough gem holds before the first cut." >}}

Shows which gem an unknown [Rough Gemstone](/docs/mechanics/items-crafting/item-list/#rough-gemstone) is, before the cut.

| Lv. | Gem Cutting Success |
| --- | ------------------- |
| 1   | +5%                 |
| 2   | +10%                |
| 3   | +15%                |

{{< /skill >}}
