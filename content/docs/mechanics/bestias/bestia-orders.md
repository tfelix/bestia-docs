---
weight: 305
title: Bestia Orders
description: "How you tell your Bestias what to do while you are away: a job, the places it needs, how careful they are and how they look after themselves."
---

{{< alert context="warning" text="Built: Guard, Gather, Craft, Mine and Rest, Courage, Care from the bag and the chest, Fine-tune, presets, places, the Diary and the notifications. Still planned: the Build, Transport and Follow jobs, which jobs a species may take, the care item lists, the gather filter, helping in fights, storm shelter, and the report when you come back." />}}

# Orders

Your Bestias stay in the world when you log out. **Orders** say what they do there.

A beginner picks a job and two places on the map, and is done. An expert can open **Fine-tune** and change the numbers
behind every choice, or add a few rules. Both edit the same orders, from the game or from the
[Companion App](/docs/mechanics/companion-app/#standing-orders).

Orders have five parts:

| Part        | What you choose                                                                    |
| ----------- | ---------------------------------------------------------------------------------- |
| **Job**     | What the Bestia does: guard, gather, craft, mine, build, transport, follow or rest |
| **Places**  | Where it does it: an area, a chest, a station, its home, a route                   |
| **Courage** | One slider from careful to brave: when it retreats, what it fights, if it helps    |
| **Care**    | When it eats or heals, and which items it may use                                  |
| **Rules**   | Optional, for experts: a short list of "when … then …" lines                       |

Orders **narrow, they never widen.** A job can only use what the species can already do. A rule can make a Bestia eat
earlier or haul sooner, but it cannot teach it a new trick.

# Jobs

| Job           | What it does                                                        | Places it needs       |
| ------------- | ------------------------------------------------------------------- | --------------------- |
| **Guard**     | Stays in an area and drives off intruders                           | Area                  |
| **Gather**    | Collects resources in an area and brings them to a chest            | Area, chest           |
| **Craft**     | Works the queue of a station                                        | One station, or "any" |
| **Mine**      | Works a [Mining Shaft](/docs/mechanics/master/survival-tree/#miner) | Mining Shaft, chest   |
| **Build**     | Builds your construction sites and repairs your structures          | Area, chest           |
| **Transport** | Carries goods from one chest to another and brings food back        | Route: two chests     |
| **Follow**    | Stays close to you while you play                                   | Home                  |
| **Rest**      | Stays at home, eats and recovers stamina                            | Home                  |

## Main Job and Fallback

Every Bestia has a **main job** and may have one **fallback job**. The fallback runs when the main job has nothing to do:
the area is picked clean and the bag is hauled, no station, site or Mining Shaft waits for it, no load waits at the
start of its route, or you are offline and the main job is Follow. As soon as the main job has work again, the Bestia
puts the fallback work down and goes back to it.

Only jobs that can run out of work take a fallback: Gather, Craft, Mine, Build, Transport and Follow. A guard is never
out of work, and Rest is what a Bestia does anyway, so neither takes one, and Rest is never a fallback.

A common pair is _Gather, else Craft_: the Bestia gathers until the field is bare, then helps at the workbench. Without a
fallback, a Bestia with nothing to do goes home and rests.

Rules never switch jobs. Only the fallback does, so it is always clear what a Bestia is doing and why.

## Which Species Can Do What

Every species has a fixed list of jobs it can take. A bird can gather herbs but cannot carry stone, swing a pick or
build. A small creature cannot carry goods along a route. Only creatures with hands craft and build. Every species
can follow and rest.

The job picker greys out what a species cannot do and says why. Orders with a job the species cannot take are refused,
in the game and in the app.

# Places

Places are pins you set on the map. They belong to the master, not to one Bestia, and have names: _North field_,
_Camp chest_, _Mine camp_. Many Bestias can use the same place, and moving a pin moves it for all of them.

| Place       | What it is                                                                                    |
| ----------- | --------------------------------------------------------------------------------------------- |
| **Home**    | Where a Bestia rests: where it stood when it got its orders, or the middle of its named area  |
| **Area**    | A named circle on the map, 4 to 64 tiles across the middle. Workers and guards stay inside it |
| **Chest**   | A name for a [camp chest](#the-camp-chest) you own. Workers bring their haul here             |
| **Station** | A crafting station or a Mining Shaft you own, picked in the Workshop                          |
| **Route**   | Two chests: where a carrier loads and where it unloads. The second can be your guild storage  |

Orders without a named area use the area around the Bestia's home, as wide as its species roams. Orders without a
named chest use your nearest chest. A master can have up to 30 places. Deleting one sends every Bestia that used it back
to its home area and the nearest chest.

# Courage

Courage is one slider with five steps. It sets how a Bestia reacts to danger.

| Step    | Retreats below | Takes on stronger foes | Shelters from storms |
| ------- | -------------- | ---------------------- | -------------------- |
| Timid   | 70% HP         | Never, flees on sight  | Yes                  |
| Careful | 50% HP         | No                     | Yes                  |
| Steady  | 35% HP         | Only if attacked       | Yes                  |
| Bold    | 20% HP         | Yes                    | No                   |
| Brave   | Never          | Yes                    | No                   |

"Stronger" compares levels: a foe 5 or more levels above the Bestia is stronger. The default is _Careful_ for workers and
_Steady_ for guards.

## Helping in a Fight

When one of your Bestias, or you, is attacked, every Bestia of yours that sees it comes to help, whatever its job. Its
Courage decides as for its own fights: a timid Bestia never comes, and a careful one does not take on a stronger foe.
When the fight is over, each goes back to its work.

A Bestia that should keep out of harm, for example a soft crafter, can be set to **Stays out of others' fights**. It
still defends itself.

A Bestia that cannot fight at all, such as a grazer, raises the alarm instead: you get the _under attack_ notice, and
the others come.

## Retreat and Shelter

A storm is a thunderstorm, heavy rain, a blizzard, a sandstorm or a tornado. In a storm, a Bestia whose Courage says so
stops work and takes shelter. It counts as sheltered under a roof or a rock no higher than 4 m above it, or inside a
[Base Camp](/docs/mechanics/master/survival-tree/#skill-base-camp) of level 2 or more.

A Bestia that retreats, or hides from a storm, looks for a roof in this order:

1. A roofed structure **you own**.
2. If none is near, any **public** roof, for example a town building.
3. If there is no roof at all, its **home**.

It avoids buildings of other players. Once it is safe, the storm is over and its HP is back above the retreat line, it
goes back to work.

A roof also protects you: under a roof, the cold and heat of the weather reach you more weakly.

# Care

Working costs [stamina](/docs/mechanics/combat/statusvalues/#work). Every unit of work costs a little: an item picked
up, a tree felled, an item crafted, a piece of ore dug, a second of building. A night of steady work (8 hours) eats
about eight common meals. Work also leaves a Bestia _Worn out_ for 30 minutes, and then rest brings back nothing.
Rest alone never brings stamina above 30%. Food is what keeps your Bestias working while you are away.

Stamina is the only need a Bestia has. There is no separate hunger bar.

When stamina or HP drops below the care line, a Bestia looks after itself:

1. It uses an allowed item from **its own bag**, for example bread or a bandage.
2. If it has none, it walks to its job's **chest** and takes some.
3. A grazing species can also **graze** for a little stamina, as wild creatures do.
4. If nothing is left, it **rests** at home and you get a notice: _out of food_. Rest alone does not bring it back
   above its eat line, so it waits there until somebody brings food.

About two hours before the food runs out, the Diary warns you: _food for about two hours left_.

By default a Bestia eats below 40% stamina and heals below 50% HP. It may use common food and bandages, never potions.
Two lists in Fine-tune change that:

- **Never use**: items it must leave alone, for example the stew you keep for yourself.
- **May also use**: items it may use on top of common food and bandages, for example a healing potion.

Each list holds up to 8 items.

# Fine-Tune

Fine-tune is for experts. It has three parts.

**Overrides.** Five numbers the slider and the job choose can be set by hand. Each stays inside fixed limits. An empty
field keeps the slider's or the job's value.

| Number      | Default                     | Limits                     |
| ----------- | --------------------------- | -------------------------- |
| Retreat     | From Courage (70% to never) | 0-90% HP, 0 never retreats |
| Eat below   | 40% stamina                 | 10-90%                     |
| Heal below  | 50% HP                      | 10-90%                     |
| Haul at     | 80% of what it can carry    | 30-100%                    |
| Area radius | The species' roaming range  | 4-64 tiles                 |

**Care items.** The _Never use_ and _May also use_ lists from [Care](#care).

**Rules.** A short list of up to eight lines, read from the top. The first line that fits wins.

| When …                     | … then                        |
| -------------------------- | ----------------------------- |
| stamina below _x_%         | eat, or rest at home          |
| HP below _x_%              | heal, or retreat              |
| bag fuller than _x_%       | haul to the chest now         |
| it is night, or it is day  | rest at home, or keep working |
| a stronger foe is in sight | retreat, or hold the ground   |
| a storm is here            | take shelter, or keep working |

Rules choose between things the job, Care and Courage already allow. "Rest at home" puts down a station or shaft and
holds all work until the line no longer fits. "Keep working" skips sleep, or stays out in the storm. "Hold the ground"
keeps even a timid Bestia from fleeing; it still fights only what its job and Courage allow. No rule can make a gatherer
fight or a guard craft.

A station's fire needs no rule: a crafter keeps it burning from the chest.

# Presets

You can save a Bestia's orders as a **preset** with a name, for example _Camp gatherer_, and give it to other Bestias.
A master has up to 20 presets, with names of up to 32 letters.

A preset stays linked: change it once, and every Bestia that uses it changes too. A Bestia can still keep its own value
for single Fine-tune numbers; those stay its own when the preset changes. Job, Courage, fallback and rules always come
from the preset.

Deleting a preset leaves its Bestias with the orders they had, as their own. Giving a linked Bestia orders of its own,
in the game or in the app, takes it off the preset.

# The Jobs in Detail

## Guard

A guard stays inside its area and attacks intruders:

- **Wild aggressive creatures**, always.
- **Other masters and their Bestias**, only where they could be attacked anyway. Never inside a
  [ward stone's field](/docs/mechanics/society/pvp/#protected-zones).
- **Never** members of your party or guild.

A guard picks no fight outside its area. Whoever hits it from outside is chased, so an archer cannot shoot it from a
safe spot. When a fight ends, it walks back to the middle of the area.

## Gather

A gatherer walks its area and collects what you ticked:

- **Loose things**: sticks, resin, loose stones, reeds.
- **Plants**: herbs and shrubs.
- **Trees**: it fells trees for logs and resin. Felled trees regrow over weeks, see
  [Natural Resources](/docs/mechanics/items-crafting/natural-resources/).
- **Mana crystals**: mana and aetherite crystals.

All four are ticked by default. You can also name up to 8 items, and it then takes only those, for example only
reeds and resin.

When its bag is 80% full, it carries everything to its chest. If the chest is full too, it stops, rests, and you get a
notice. When the area is picked clean, it says so in the Diary and turns to its fallback job.

## Craft

A crafter works a [station's queue](/docs/mechanics/items-crafting/crafting-stations/#the-queue). Its place is either one
station, or **any of your stations** in an area. In the second case it walks to a station that has work and no worker.

A station's worker can be a Bestia you pick, **any free crafter**, or nobody. With _any free crafter_, the first idle
Bestia whose job is Craft takes it over.

A station can take its ingredients from a **camp chest next to it**. That is how you queue work from the Companion App:
the app shows only recipes the chest can pay for, and the ingredients move from the chest into the station. Nothing ever
comes from your own bag while you are away.

A crafter at a campfire also keeps the fire going with wood from the chest, so the queue does not stop when the fire burns
down.

## Mine

A miner works a Mining Shaft of yours that nobody else works. You need Mining Lv. 1 to build a shaft. It works like a
station, but it digs real ore out of the ground below it, so the ore is gone for anyone who digs there later.

- **Reach**: 8 m around the shaft, and 40 m down per level of your Mining. The 4 m right under the shaft stay, so it does
  not undermine itself. Deep gems need a trained miner.
- **Pace**: 5 minutes of labour per ore voxel (about two lumps), 10% less per level of Mining.
- **Order**: it digs from the top down, like a miner following a vein.
- **Haul**: the ore goes into the Bestia's bag. Before the bag is too full for the next dig, it carries the ore to your
  nearest chest and comes back.
- **Dug out**: a shaft with no ore left in reach lets its miner go. The miner looks for another shaft or rests at home.

You can build a shaft anywhere. Where no ore is in reach, it digs nothing. Ore that is not an item yet (copper, tin,
silver) stays in the ground.

## Build

A builder works on your [construction sites](/docs/mechanics/towns-trade/where-to-build/) in its area, the nearest
first. You pay a site's kit when you place it, as always, so a builder needs nothing but time. Two builders raise a site
in half the time, as two players do.

When no site is left, it repairs your damaged structures in the area, where repairs are allowed: in a town, or on a
stronghold's grounds. It pays the repair from its bag, and fills its bag from its chest first. When a site is finished,
you get the _construction done_ notice.

## Transport

A carrier moves goods along a **route** from one chest to another. A route is set up in four lines:

| Line           | What you choose                                                                          |
| -------------- | ---------------------------------------------------------------------------------------- |
| **From**, **To** | Two of your chests. _To_ can also be your guild's storage                              |
| **Carry**      | Everything except food, or only the items you name (up to 8)                             |
| **Bring back** | Food for itself from _To_, and, if you like, enough of one item to keep _N_ of it at _From_ |
| **Leave when** | A full load waits at _From_, or anything waits there                                     |

A typical route runs from the mine to the base camp. The carrier waits at the mine chest until a full load of ore is
there, carries it to the base camp, takes some bread for the way back, and returns. With _keep 10 Bread at From_, it
also brings bread for the miner, so the miner never runs out.

A route can be up to 512 tiles long. On long routes the carrier travels the roads like a traveller. The map shows each
route as a line between its two chests.

A carrier can only put goods into guild storage, never take them out, and only if your guild rank lets you deposit.
If _To_ is full, or the guild storage refuses it, the carrier stops and you get a notice.

A loaded carrier is worth robbing. If it falls on the way, its bag drops as loot like any other Bestia's.

## Follow and Rest

**Follow** keeps a Bestia close to you while you play, within about 6 tiles. If you travel far ahead, it follows you
along the roads. It helps when you or your Bestias are attacked, within its Courage.

When you log out, a following Bestia walks to its home place, its named area or its home, and runs its fallback job
there, or rests. If it has no named place, it stays where you left it, and the report when you come back warns you.

**Rest** keeps a Bestia at home. It eats, sleeps and recovers stamina as far as rest allows. A Bestia whose job has
nothing to do and has no fallback rests too.

# The Camp Chest

A camp chest is a new structure that holds items. Gatherers and miners fill it, and crafters' stations pay from it.

- It has a fixed number of slots.
- Only the owner may open it. You can give other players access.
- Taking from a chest that is not yours is [stealing](/docs/mechanics/society/pvp/#negative-honor) and costs honor.
- When it is destroyed, it drops what it holds on the ground as loot.

<figure class="figure d-block my-4">
  <a href="/images/artwork/bestia-camp.jpg"><img class="figure-img img-fluid rounded" src="/images/artwork/bestia-camp.jpg" alt="Concept art: bestias at work around the camp chest" loading="lazy"></a>
  <figcaption class="figure-caption">Bestias at work around the camp chest</figcaption>
</figure>

# While You Are Away

**Bestias work at the same pace whether you are there or not.** There is no daily cap. Materials, regrowth, craft times
and stamina are the limits.

They work until something stops them: a full chest, no food, an empty queue, or a fight they lose.

**A Bestia that falls while you are away stays down until you log in.** Its bag drops as loot where it fell, unless
a [Keepsake Ward](/docs/mechanics/bestias/bestia/#the-bestias-bag) sends it home. A guard that falls leaves its area unguarded.

# Coming Back

When you log in, a short **report** tells you what each Bestia did since you logged out, in a few plain sentences:

> _Pip worked the North field all night. It brought 214 Log and 36 Resin to the Camp chest, drove off two wolves just
> after midnight, and ran out of bread at 5 am. It has rested at home since. **To go on:** put food in the Camp chest._

The report sums up the work (goods brought, items made, ore dug, sites built, loads carried), says how the time was
spent (working, resting, sheltering, fighting), names what happened (fights, retreats, storms, a fall), and ends with
what the Bestia does now. If it is stuck, the last line says what would get it going again.

The game shows the report once, at login. The app shows it on the Master's page until you next log in.

# In the Game

## While You Play

Under each Bestia's HP bar in the party list is a **status line**, for example _Gathering · North field_ or
_Paused: chest full_. A Bestia that needs you gets a **!** next to its name.

The chat window has a second tab, **Bestias**. It lists each Bestia with its status, and below that the news, newest
first: hauls, finished queues, fights, storms, and work that stopped. None of this goes into the normal chat.

When something needs you (a Bestia stopped, is attacked, ran out of food or fell), a short notice also shows at the top
of the screen.

## The Orders Window

Each Bestia in the party list has a flag icon. It opens the Bestia's **orders window**, with the same orders as the
app: preset, job, the fallback job (_When idle_), Courage, work area and chest, or the route for a carrier.
**Fine-tune** folds out below them, with the numbers, the care items and the rules. A number you do not tick says
_auto_: the job and Courage choose it.

A Bestia on a preset shows the preset's choices greyed out, and only the numbers you tick are its own. From the window
you can:

- **Save as preset**: name the orders shown; the new preset is then picked, and _Give orders_ links the Bestia to it,
- **Edit preset**: change the preset itself; saving changes it for every Bestia that follows it,
- **Delete preset**, with a second click to confirm,
- name a **work area** with the _+_ next to the area: a circle around where the Bestia stands now.

Chests are named in the app. The window stays current: orders given in the app, or a changed preset, show at once.

# In the Companion App

The app's **Bestia** page shows every Bestia with a live status line, for example _Crafting Plank 4/20 at Workbench_ or
_Paused: bag full_. Below it are the orders: preset, job, Courage, and **Fine-tune** with the fallback job, the named
area and chest, the numbers, the care items and the rules. The page also lists your places and presets.

Work areas are made on the **Map**: tap the ground, then _Make a work area here_. The map draws them as circles, and
routes as lines between two chests.

The **Workshop** lists your crafting stations, their queues and workers. You can add recipes the chest next to a
station can pay for, cancel and reorder entries, and pick the worker: a Bestia, any free crafter, or yourself. A
cancelled entry's unused ingredients go into the chest next to the station, as far as it has room; nothing comes from or
goes into your own bag while you are away.

The **Diary** tells what each Bestia did, one line per event: new orders, a haul (its goods summed per hour), work that
stopped, a finished queue, a fight, a retreat, a storm, low food, a death. Lines are kept for 7 days, at most 200 per
Bestia.

Four events can send a notification while you are away, within the app's
[limit of six per hour](/docs/mechanics/companion-app/#limits):

- a Bestia fell,
- a Bestia stopped working and will not go on by itself: its fire went out, it cannot make the next item, the chest is
  full, its shaft is dug out, the end of its route takes nothing more, or it ran out of food,
- a Bestia is attacked after ten quiet minutes, or had to retreat,
- a station finished its queue.

Each has a setting, so you can turn it off. Nothing is pushed while you play.

# Open Questions

- Whether bigger storage buildings come after the camp chest.
