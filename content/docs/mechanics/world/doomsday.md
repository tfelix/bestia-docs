---
title: Doomsday
weight: 1300
description: Explains the Doomsday mechanic — the doom clock and its stages, the Foreshadowing, the threat types, how a world ends or is saved, and what masters take into the next world.
---

{{< alert context="warning" text="**Designed, not built.** How the server will run it is on the [Doomsday](/docs/server/doomsday/) server page." />}}

Every world incarnation faces an inevitable existential threat. Both the _nature_ of that threat and the _point in the
world's life_ at which it begins are decided when the world is generated. This also fixes the world's **life span**,
the number the factions are ultimately scored against (see
[Earning Advantage Points](/docs/mechanics/society/factions/#earning-advantage-points)).

The threat sets in no sooner than **six months** of real time into a world's life. Then it grows stronger and
stronger over **six months to a year**, until the world is either lost or saved. Threats take many forms: a colossal
Bestia, chaotic magical phenomena, or natural disasters. If nobody acts, they push the world toward **total
annihilation**.

If the world is destroyed by neglect — with no Order having met its
[Seasonal Covenant](/docs/mechanics/society/factions/#seasonal-covenants) in the closing seasons — **none of the
Orders benefit**. Every Order has a reason to stay engaged through the endgame. See
[The Neglect Clause](/docs/mechanics/society/factions/#the-neglect-clause).

This cycle is what keeps the world fresh. Whether it is lost or saved, every world ends, and a new one is generated
with new biomes, new landscapes and a new history. A full cycle takes about one to two years of real time. For the
world generation itself, see the [server documentation](/docs/server/world-generation).

A threat does not have to be seen directly. A flood or a blight can change a region far away without most players
noticing, and still change the world for good. A subtle fear of what is creeping up should always haunt players.

# The Doom Clock

Every world has a hidden **doom clock**. It starts to run when the threat sets in. Left alone, it reaches its end
exactly on the world's predetermined day. Players cannot see the clock. They see what it does to the world.

Players change how fast it runs:

- **Feeding the threat** speeds it up: mana poured into its heart, rifts left open, towns lost.
- **Holding the threat** slows it down: land kept clean, rifts sealed, its servants killed.
- **Great deeds** turn it back by a step: a threat boss slain, a tear sealed, a Last Stand won.

The clock can slow to a quarter of its normal speed, and it can run up to three times as fast. It never stops.
Players can delay the end, but never cancel it.

## The Stages

No threat strikes all at once. It escalates through stages, so the players have time to notice it, organise and
decide whether to fight it or feed it:

1. **Omens.** Subtle, easily missed signs: strange weather, restless or fleeing Bestia, small shifts in local
   [mana concentration](/docs/mechanics/world/environment/#mana-concentration), rumours in the towns near the
   threat's origin. A Scholar's [Observation](/docs/mechanics/master/scholar-tree/#skill-observation) senses a
   doomsday from ten times its normal range.
2. **Onset.** The threat manifests in a bounded area and starts to affect nearby regions. Damage is still local.
3. **Escalation.** The threat spreads, region by region. This is the long middle phase where the outcome is truly in
   the players' hands.
4. **Cataclysm.** The threat reaches critical mass. The sky over the whole world turns, and the **Last Stand** draws
   near.

A threat that is pushed back can fall back to an earlier stage.

Each stage change is felt across the world, as a vague sense rather than a map marker: _the ground trembles far to
the east_, _a cold wind comes from the north_.

Each Order reads the stages differently. **The Order of Eternity** works to seal, delay or avert the threat. **The
Order of Chaos** works to feed and hasten it. **The Order of the Circle** wants it to arrive exactly on its
predetermined day. How a world meets its end feeds directly into each Order's
[Advantage Points](/docs/mechanics/society/factions/#earning-advantage-points).

## A World's Life

The timeline below shows a sample world. The exact months differ from world to world: the threat sets in between six
and nine months, and it unfolds over six to twelve months.

<div class="doomsday-timeline" style="margin:1rem 0"><svg viewBox="0 0 880 262" role="img" aria-label="Timeline of a sample world: foothold in month 1, the Foreshadowing around month 3, omens from month 7, onset, escalation, cataclysm and Last Stand around month 16, and the world saved around month 24 if held off" style="width:100%;height:auto;max-width:880px;color:inherit;font-family:inherit;font-size:13px"><line x1="190" y1="34" x2="190" y2="222" stroke="currentColor" stroke-opacity="0.15"/><text x="190" y="26" text-anchor="middle" fill="currentColor" fill-opacity="0.7">0</text><line x1="274" y1="34" x2="274" y2="222" stroke="currentColor" stroke-opacity="0.15"/><text x="274" y="26" text-anchor="middle" fill="currentColor" fill-opacity="0.7">3</text><line x1="358" y1="34" x2="358" y2="222" stroke="currentColor" stroke-opacity="0.15"/><text x="358" y="26" text-anchor="middle" fill="currentColor" fill-opacity="0.7">6</text><line x1="442" y1="34" x2="442" y2="222" stroke="currentColor" stroke-opacity="0.15"/><text x="442" y="26" text-anchor="middle" fill="currentColor" fill-opacity="0.7">9</text><line x1="526" y1="34" x2="526" y2="222" stroke="currentColor" stroke-opacity="0.15"/><text x="526" y="26" text-anchor="middle" fill="currentColor" fill-opacity="0.7">12</text><line x1="610" y1="34" x2="610" y2="222" stroke="currentColor" stroke-opacity="0.15"/><text x="610" y="26" text-anchor="middle" fill="currentColor" fill-opacity="0.7">15</text><line x1="694" y1="34" x2="694" y2="222" stroke="currentColor" stroke-opacity="0.15"/><text x="694" y="26" text-anchor="middle" fill="currentColor" fill-opacity="0.7">18</text><line x1="778" y1="34" x2="778" y2="222" stroke="currentColor" stroke-opacity="0.15"/><text x="778" y="26" text-anchor="middle" fill="currentColor" fill-opacity="0.7">21</text><line x1="862" y1="34" x2="862" y2="222" stroke="currentColor" stroke-opacity="0.15"/><text x="862" y="26" text-anchor="middle" fill="currentColor" fill-opacity="0.7">24</text><text x="862" y="246" text-anchor="end" fill="currentColor" fill-opacity="0.7">real months since the world was born</text><text x="178" y="75" text-anchor="end" fill="currentColor" font-weight="600">The world</text><text x="178" y="121" text-anchor="end" fill="currentColor" font-weight="600">Foreshadowing</text><text x="178" y="167" text-anchor="end" fill="currentColor" font-weight="600">The doomsday</text><text x="178" y="213" text-anchor="end" fill="currentColor" font-weight="600">If held off</text><rect x="190" y="58" width="28" height="26" rx="4" fill="#5b7fbf" fill-opacity="0.85"/><text x="224" y="52" fill="currentColor" font-size="12">Foothold</text><rect x="218" y="58" width="168" height="26" rx="4" fill="#5b7fbf" fill-opacity="0.45"/><text x="302.0" y="75" text-anchor="middle" fill="currentColor">Quiet life</text><rect x="274" y="104" width="14.0" height="26" rx="4" fill="#8a5bbf" fill-opacity="0.85"/><text x="296.0" y="121" fill="currentColor">a lesser threat, 1-2 weeks</text><rect x="358" y="146" width="84" height="34" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-opacity="0.25" stroke-dasharray="4 3"/><rect x="386" y="150" width="28" height="26" rx="4" fill="#c9a227" fill-opacity="0.85"/><rect x="414" y="150" width="56" height="26" rx="4" fill="#d9822b" fill-opacity="0.85"/><text x="442.0" y="167" text-anchor="middle" fill="#fff">Onset</text><rect x="470" y="150" width="140" height="26" rx="4" fill="#d4512a" fill-opacity="0.85"/><text x="540.0" y="167" text-anchor="middle" fill="#fff">Escalation</text><rect x="610" y="150" width="28" height="26" rx="4" fill="#a3201c" fill-opacity="0.85"/><text x="400.0" y="142" text-anchor="middle" fill="currentColor" font-size="12">Omens</text><text x="624.0" y="142" text-anchor="middle" fill="currentColor" font-size="12">Cataclysm</text><polygon points="638,152 649,163 638,174 627,163" fill="#ff3b30" stroke="currentColor" stroke-opacity="0.4"/><text x="638" y="144" text-anchor="middle" fill="currentColor" font-size="12"></text><text x="654" y="167" fill="currentColor" font-weight="600">Last Stand, 24 h</text><rect x="638" y="196" width="224" height="26" rx="4" fill="#3f9a5a" fill-opacity="0.6"/><text x="750.0" y="213" text-anchor="middle" fill="#fff">players hold the threat</text><polygon points="862,198 873,209 862,220 851,209" fill="#f2c94c" stroke="currentColor" stroke-opacity="0.4"/><text x="848" y="190" text-anchor="end" fill="currentColor" font-size="12">The Calling: saved</text><text x="358" y="236" fill="currentColor" fill-opacity="0.7" font-size="12">dashed: the threat sets in between month 6 and 9</text></svg></div>

- **Months 0 to 1:** the Orders establish themselves (the [Foothold](/docs/mechanics/society/factions/#the-foothold-season)).
- **Around months 3 to 4:** the Foreshadowing, a lesser threat somewhere in the world.
- **Months 6 to 9:** the omens of the real threat begin.
- **Around the world's predetermined day:** the Cataclysm and the Last Stand, unless players changed the pace.
- **At one and a half times the predetermined life span:** a world that is still standing is saved.

# The Foreshadowing

Some months before the real threat sets in, a **lesser threat** strikes one region. It is a taste of what a doomsday
is like, but it cannot end the world. It lasts one to two weeks and touches one province and its neighbours.

It has nothing to do with the real threat. A world fated to drown can first suffer a mana storm season, and a world
fated to wither can first meet a marching beast. Players should not take it as a hint.

Its outcome still matters:

- **Contained:** the real threat sets in about two weeks later.
- **Failed:** the real threat sets in about two weeks earlier, and the region keeps scars: omen stones, burnt or
  blighted land, and stories in the towns.

| Foreshadowing         | What happens                                                                                                |
| --------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Mana Storm Season** | One province fills with mana until storms break out by themselves. Drain it to end them                     |
| **Blight Bloom**      | A patch of land withers for two weeks, with crystals and corrupted Bestia                                   |
| **The Harbinger**     | A lesser world boss wakes and marches once on the nearest town                                              |
| _Later_               | A single eruption, a hard winter, a dry summer, a three-day eclipse, a migration gone wrong, a tremor swarm |

# How a World Ends

A world ends in one of two ways. Both lead to a new world.

## Lost: The Last Stand

When the doom clock runs out, the world does not fall at once. A **Last Stand** opens: one announced window of
**24 real hours**. The threat's **Avatar** — its strongest form — appears at the threat's heart, and the whole world
can fight it.

- **The Avatar falls:** the clock is pushed back from the brink to late in the Cataclysm. The world goes on, and the
  fight continues.
- **The window closes and the Avatar still stands:** the world is lost.

## Saved: The Calling

A world that is held long enough is **saved**. When it reaches one and a half times its predetermined life span, the
threat can no longer win. The world itself survives, but the mana that brought the masters here pulls back. Everything
born of mana — the Bestia, and the masters bound to them — is drawn away into the next world. This is **The Calling**.

It needs no fight. It is announced a day ahead and is a farewell.

## The Final Moments

Both endings are announced 24 hours, one hour and ten minutes before they happen. In the last minute every player sees
the end on their screen:

- **Lost.** Fire creeps in from the edges of the view and consumes it. The screen goes dark, and big red letters read
  **"The world has ended"**.
- **Saved.** Cheerful music plays and the view slowly turns white. Masters and their Bestia dissolve into white light,
  and white letters read **"The world is saved"**.

Then a short summary follows: the world's name, its threat, how long it lived, the towns it lost, the greatest deeds,
and which Order came out ahead. The last line says that **a new world is about to be born**.

## A New World Is Born

After the end, the server generates the next world. Nobody can play while it does, and the login screen says that a
new world is being born. This takes as long as the generation needs, and the server uses all its power to make it
quick.

The strongest deeds of the old world can live on: the next world's history may remember the old one as a mythic age,
with the heroes who opted in, the Order that won and how the world ended.

## What Masters Keep

Masters and their Bestia pass on to the next world "relatively unscathed", because they are bound to mana (see
[Basics](/docs/mechanics/master/basics/)). Their possessions mostly do not.

| Kept                                                 | Lost                                                               |
| ---------------------------------------------------- | ------------------------------------------------------------------ |
| The master: level, skills, known recipes, compendium | Everything in the inventory, coins included, except worn equipment |
| Global honor                                         | Local honor in towns that no longer exist                          |
| Every Bestia, stored ones included                   | Bestia inventories, except the equipment a Bestia wears            |
| Equipment worn by the master and by each Bestia      | All item storage: chests and guild storage                         |
| The guild: level, skills, members, ranks and emblem  | Every building: houses, workshops, settlements, strongholds        |
|                                                      | Mail, parcels, auction listings and stalls                         |
|                                                      | Quests, map marks, saved routes, warp marks                        |

This makes a new world a true fresh start for everyone, and it stops players from carrying a whole fortune over in
their pockets. The rules will be play-tested.

# Shapes of a Threat

Each threat is one of three shapes:

- **A thing that moves or grows from one point:** The Destroyer, The Void Tear, The Great Stampede. Players can fight
  it head-on, and the clock follows how strong it gets.
- **A front that spreads over the land:** The Withering, the Ice Age, the Great Drought, Mana Burn, the Mana Crystal
  Infestation and The Long Night. Players hold the land piece by piece. The more land they keep clean, the slower the
  clock runs.
- **Pulses that strike again and again, each one stronger:** Flooding, Volcanic Activity, The Sundering, Mana Storms.
  Players prepare between the pulses.

# Event Types

A world can be fated to suffer any of the following threats. Each one runs through the stages above and offers
players a clear — if difficult — way to intervene:

- Volcanic Activity (eruptions that bury regions in ash and lava, choking the air and farmland)
- Tsunami / Permanent Flooding (rising waters that swallow coastlines and drown low-lying settlements for good)
- Ice Age (a deepening freeze that locks the world under ice and starves the food chain)
- The Great Drought (a creeping desertification that dries up water and withers the land)
- Mana Burn (mana igniting out of control, scorching everything it saturates)
- The Destroyer (a huge Bestia targeting player cities)
- The Long Night (an unending eclipse that starves the land of sunlight)
- The Withering (a spreading corruption that kills the plants and twists the Bestia)
- The Great Stampede (enraged Bestia migrating en masse, trampling everything in their path)
- Mana Storms (raging arcane tempests that scour the surface)
- The Sundering (violent earthquakes that split the continents apart)
- The Void Tear (a dimensional rift disgorging hostile, otherworldly Bestia)
- {{< item "mana_crystal" >}} Infestation (mana crystals start to spread uncontrollably)

The first threats to be built are **The Void Tear**, **The Withering** and **The Destroyer**. **Flooding** is still
under study.

## Volcanic Activity

A dormant volcanic region stirs: tremors ripple outward and vents begin to cough ash long before the first eruption.
When it comes, the eruption buries the surrounding biome under ash and lava, destroying farmland and resource nodes,
damaging structures, and driving fire-aligned Bestia out of the newly-scorched land.

Left unchecked, eruptions spread along fault lines into neighbouring regions while drifting ash clouds choke sunlight
and crop yields far downwind. Players can hold it back by venting the building pressure through rituals, raising
barriers to channel lava away from settlements, and — where the volcanism is mana-fed — draining the mana that stokes
it. If the chain of eruptions is never broken, it grows into a continent-spanning firestorm.

## Tsunami / Permanent Flooding

{{< alert context="info" text="**Under study.** A flood must never drown every start town, and it must leave a real landmass. If that cannot be guaranteed, this threat is dropped." />}}

The sea begins to creep inland: tides retreat unnaturally far, and drowned Bestia wash up on the shore. Then a great
wave swallows the coastal settlements — and this time the water never recedes, leaving whole regions permanently
submerged.

With each surge the waterline climbs another band, claiming more of the map, severing land routes, and letting
aquatic Bestia colonise what used to be dry ground. The water can rise only up to a fixed height, so a large landmass
always stays dry, and at least one start town always stands above it. Temples and cult sanctuaries on the coast may
drown. Coastal communities can buy time by raising and reinforcing seawalls and dikes, draining flooded ground with
magic, and moving to higher ground.

## Ice Age

An unseasonable chill sets in — early frosts, thinning herds, water freezing at the margins. Then the cold deepens
everywhere. Lakes and rivers freeze over and become walkable, frost creeps across the ground, ice forms on every
surface, and snow stops melting. Crops fail, water sources solidify, and cold-aligned Bestia spread down from the
highlands while everything else starves.

The freeze creeps outward region by region, and as the food chain collapses the surviving Bestia grow desperate and
aggressive. Players resist it with fire magic and heat sources, keeping regions habitable around hearths and braziers,
and by stockpiling food and fuel before each region ices over. Left alone, the glaciation swallows the world whole.

## The Great Drought

Rivers shrink, wells run low, and hot dry winds strip the moisture from the air. A region begins to desertify: water
nodes dry up, farmland crumbles to dust, and plants and Bestia alike wither and die.

The dead zone widens outward, choked by sandstorms, until only desert-adapted Bestia remain. Players can fight back
with irrigation, [rain](/docs/mechanics/world/environment/#rain) and water magic, and by carefully protecting and
rationing what water is left. If nothing breaks the drought, the world is reduced to a lifeless desert.

## Mana Burn

In a region already thick with mana, the ambient energy begins to shimmer and smoulder — and then it ignites. Arcane
fire sweeps the saturated land, burning creatures, structures, and the ground itself with a flame that ordinary water
cannot quench.

The burn chases [mana density](/docs/mechanics/world/environment/#mana-concentration), leaping from one
high-concentration region to the next and leaving scorched dead zones — and worsening [Mana Storms](#mana-storms) —
in its wake. The only reliable defence is to starve it: **draining or banishing mana** deprives the fire of fuel, and
**Eternity**'s dampening rituals smother it, while **Chaos** may instead pour mana in to spread it faster. Left to
feed, it sets the entire mana-rich world alight.

## The Destroyer

It begins with old legends: restless Bestia, an ominous reading on a Scholar's
[Observation](/docs/mechanics/master/scholar-tree/#skill-observation), a sealed world boss whose seal grows thin. Then
the seal breaks. The boss inside wakes as **The Destroyer** and begins a slow, deliberate march toward the nearest
town.

The Destroyer is one of the world's sealed bosses, but changed: a power drawn from the doom makes it **far stronger
than any other boss**, with enormous health and strength. It is meant to be very, very hard to defeat, and it
**cannot be captured**.

Its path is predictable enough to plan around. It marches on the world's towns and on the towns players built, and
every town it reaches is razed. Every town it razes heals it fully and makes it stronger, so each town lost makes the
next harder to save. Only the start towns are spared, so new masters always have somewhere to begin. Players meet it with server-wide raids at
defensible chokepoints, environmental traps, and siege devices researched at an Order's
[citadel](/docs/mechanics/society/factions/#citadels-and-temples). **Chaos** may try to lure or empower it toward its
rivals.

When it falls, the world gains time, but the Destroyer is not gone. It returns after a few days, stronger than before.
Players who renew the seal at its lair with a ritual while it is down keep it there for two weeks instead. If The Destroyer levels the great towns,
the world collapses with them.

## The Long Night

The days grow shorter until an eclipse falls and simply refuses to lift. With sunlight gone, crops stop growing, the
world's [night](/docs/mechanics/world/environment/#night) effects become permanent, and nocturnal and shadow-aligned
Bestia grow bolder and stronger in the endless dark.

The longer the night holds, the more the food chain starves and the more dangerous the emboldened Bestia become, while
poor visibility hampers travel and detection. Players hold the dark at bay with light magic and beacons around their
settlements, and must ultimately complete a great ritual — or quest — to rekindle the sun. Fail, and the world freezes
into eternal, lightless death.

## The Withering

It begins with a few patches of greying vegetation and a handful of sickly Bestia. Then **strange crystals** push up
out of the ground, and the corruption spreads from them.

- **The ground dies.** Where the corruption is strong, grass withers away and only a grey, slimy ground remains. It
  seems to crawl and pulse, and it creeps forward day by day.
- **The plants die.** Trees, shrubs and herbs in the corrupted land die and do not grow back.
- **The Bestia are twisted.** Bestia born in the corruption are diseased, hostile variants. **A corrupted Bestia
  cannot be captured.**
- **It hurts to stand in it.** Masters in a strongly withered zone take steady damage and suffer debuffs.

The crystals are what spreads it. Each crystal corrupts the land around it, and new crystals sprout at the edge of the
corrupted land. Players fight back by **breaking the crystals**, which stops their growth and leaves corrupted crystal
shards behind. Cleansing rituals clean the land around them and keep it clean for a week. Culling the corrupted Bestia
slows the spread where they roam. Every piece of land kept clean slows the doom clock. Left to run its course, the
Withering rots the entire world.

## The Great Stampede

Something sends the wild Bestia into flight: herds gather and grow restless, then break into a full stampede that
tramples everything — settlements, farmland, and players — unlucky enough to lie in their path.

As the herds charge they sweep up still more Bestia, and successive waves batter one region after another along
shifting routes. Players can divert or calm the herds through taming and luring, throw up barriers to break their
charge, and thin them directly — but the lasting fix is to find and address whatever drove them to flee. Ignored, the
stampede flattens everything it reaches.

## Mana Storms

The skies over a mana-rich region begin to crackle and churn, and then break into violent arcane tempests that scour
the surface — dealing area magic damage, disrupting spellcasting, and battering structures.

The storms grow and roam with the [mana density](/docs/mechanics/world/environment/#mana-concentration), and where
they linger they can ignite [Mana Burn](#mana-burn) or feed nearby rifts. Players shelter behind wards, weaken the
storms by draining the mana that powers them, and can calm them outright with the right rituals. Left to rage, the
tempests scour the surface bare.

## The Sundering

The ground will not hold still: tremors escalate into violent earthquakes, and fissures begin to yawn open across the
land. Structures collapse and chasms tear regions apart at the seams.

As it worsens the continents themselves fracture — land routes sever, and whole regions slump into the depths or the
sea while aftershocks keep coming. Players can reinforce their buildings, use magic to stabilise the crust, and
evacuate regions before they collapse, but truly stopping it means sealing the deep fault feeding the quakes. If it
runs its course, the world is quite literally torn to pieces.

## The Void Tear

Mana rifts are a normal, ongoing feature of every world: **Chaos** opens and feeds them while **Eternity** seals them,
and their number is one of the ways the Orders bend a region's
[mana density](/docs/mechanics/world/environment/#mana-concentration). The Void Tear is the worst-case version of this
everyday mechanic. How a single rift forms, grows, is sealed or collapses is described under
[Rifts](/docs/mechanics/world/world-events/#rifts).

The Void Tear begins at the strongest Wound of the world:

- **Omens.** Rift knots form more often around the Wound, and Observation feels them from far away.
- **Onset.** A permanent **Tear** opens at the Wound. It pours mana into the land around it and seeds new rifts in a
  ring that grows with the stage. Every rift that merges into the Tear makes it stronger. The waves of its rifts march
  on the nearest towns.
- **Escalation.** A raid-scale world boss, the **Void Sovereign**, anchors the Tear again and again. Killing it turns
  the clock back a little and opens a short window to **seal the Tear** with a ritual. A sealed Tear shrinks and turns
  the clock back much further. But the Tear never closes for good. It tears open again, and only time can save the
  world.
- **Cataclysm.** The Tear floods whole provinces with mana. Mana storms rage around it, and it can seed a
  [Mana Crystal Infestation](#mana-crystal-infestation).

Players hold it back by sealing its rifts, killing its waves and the Sovereign, and draining mana from the region to
starve its growth. Chaos, of course, can do the opposite and feed it. Its Avatar for the Last Stand is the Void
Sovereign at full strength.

## Mana Crystal Infestation

In areas with a very high mana concentration, a Mana Infestation can manifest. It increases mana generation in the
area and, depending on the concentration, spawns crystal nodes around itself.

Each crystal is a **destructible object with its own health pool** that pulses damage into every creature or
structure in its vicinity, turning the ground around it into a no-go zone. Worse, the crystals **self-replicate**: at
intervals each node seeds child crystals nearby, so an ignored infestation grows geometrically, converting whole
regions into lethal dead zones and eventually consuming the entire planet.

The crystals themselves can be destroyed, and there is a strong incentive to do so: shattered nodes drop
[Blue, Yellow, and Red Mana Crystals](/docs/mechanics/items-crafting/natural-resources/#list-of-resources), the raw
material for [refining](/docs/mechanics/master/craftsman-tree/#skill-manaflow-expert) into powerful magic artifacts.
Raid groups therefore have to clear nodes faster than they can replicate. Anything that **drains or banishes mana**
slows the spread, and lowering a region's overall mana density removes the fuel the infestation feeds on. Left alone,
the crystals win by sheer arithmetic.

# Ideas for New Threats

These are ideas for later threats. None of them is designed in detail yet.

- **Starfall.** A meteor shower strikes the world. Each meteor leaves a crater, and the craters hold rare ore and
  crystals. The showers grow heavier with each stage, until whole regions are cratered. Players can shelter, but they
  also race each other to the fresh craters.
- **Climate Change.** The world grows hotter and hotter. Water shrinks, the heat becomes dangerous in more and more
  places, and wildfires start by themselves and sweep over the dry land. Players fight the fires, keep water, and find
  shade.
- **The Forgetting.** Names fade from signs and maps, charts blur, and skills misfire more often. Players must chart
  the world again and keep the archives safe. Cartographers become the defence.
- **The Swarm.** A locust plague of insect Bestia eats the crops, the herbs and the trees, and with them the food of
  the towns. Players burn the hives, guard the fields and bring bird Bestia to hunt the swarm.
- **Stone Plague.** Land and creatures turn to stone, spreading from one point. Miners break the stone, Priests cure
  the stricken.
- **The Unmaking Song.** A hum rises over the world and grows louder until buildings shake apart. It is heard long
  before it is seen. Bards answer it with counter-songs.
- **The Hollow Moon.** The moon sinks closer every night. The tides go wild, the nights grow long and the night Bestia
  rule them.
- **Bestia Plague.** A contagious sickness spreads between Bestia as a debuff: through Bestia that stand close
  together, share a bag, a storage or a farm, or breed. It weakens them and stops their regeneration. Masters must
  keep sick Bestia apart and find a cure. Here a social system becomes the threat.
- **The Echo.** Shadow copies of masters and their Bestia walk out of the rifts, with stolen names and stolen skills.
