---
weight: 305
title: Bestia Orders
description: "How you tell your Bestias what to do while you are away: a job, the places it needs, how careful they are and how they look after themselves."
---

{{< alert context="warning" text="This page is a design document. Today a Bestia only has a **stance** (hold, patrol, forage or defend) and an **aggression** value. Everything else on this page is planned." />}}

# Orders

Your Bestias stay in the world when you log out. **Orders** say what they do there.

A beginner picks a job and two places on the map, and is done. An expert can open **Fine-tune** and change the numbers
behind every choice, or add a few rules. Both edit the same orders, from the game or from the
[Companion App](/docs/mechanics/companion-app/#standing-orders).

Orders have five parts:

| Part        | What you choose                                                    |
| ----------- | ------------------------------------------------------------------ |
| **Job**     | What the Bestia does: guard, gather, craft, mine, follow or rest   |
| **Places**  | Where it does it: an area, a chest, a station, its home            |
| **Courage** | One slider from careful to brave: when it retreats, what it fights |
| **Care**    | When it eats or heals, and which items it may use                  |
| **Rules**   | Optional, for experts: a short list of "when … then …" lines       |

Orders **narrow, they never widen.** A job can only use what the species can already do. A rule can make a Bestia eat
earlier or haul sooner, but it cannot teach it a new trick.

# Jobs

| Job        | What it does                                                        | Places it needs       |
| ---------- | ------------------------------------------------------------------- | --------------------- |
| **Guard**  | Stays in an area and drives off intruders                           | Area                  |
| **Gather** | Collects resources in an area and brings them to a chest            | Area, chest           |
| **Craft**  | Works the queue of a station                                        | One station, or "any" |
| **Mine**   | Works a [Mining Shaft](/docs/mechanics/master/survival-tree/#miner) | Mining Shaft, chest   |
| **Follow** | Stays close to you while you play                                   | None                  |
| **Rest**   | Stays at home, eats and recovers stamina                            | Home                  |

## Main Job and Fallback

Every Bestia has a **main job** and may have one **fallback job**. The fallback runs when the main job has nothing to do:
the area is picked clean, the station queue is empty, or you are offline and the main job is Follow.

A common pair is _Gather, else Craft_: the Bestia gathers until the field is bare, then helps at the workbench. Without a
fallback, a Bestia with nothing to do goes home and rests.

Rules never switch jobs. Only the fallback does, so it is always clear what a Bestia is doing and why.

## Which Species Can Do What

A species can only take the jobs its body allows. A bird can gather herbs but cannot carry stone or swing a pick. A
grazer without attacks can guard only by raising the alarm. The job picker greys out what a species cannot do and says
why.

# Places

Places are pins you set on the map. They belong to the master, not to one Bestia, and have names: _North field_,
_Camp chest_, _Mine camp_. Many Bestias can use the same place, and moving a pin moves it for all of them.

| Place       | What it is                                                               |
| ----------- | ------------------------------------------------------------------------ |
| **Home**    | Where a Bestia rests. By default, where it stood when it got its orders  |
| **Area**    | A circle on the map. Gatherers and guards stay inside it                 |
| **Chest**   | A [camp chest](#the-camp-chest) you own. Gatherers bring their haul here |
| **Station** | A crafting station or a Mining Shaft you own                             |

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

## Retreat and Shelter

A Bestia that retreats, or hides from a storm, looks for a roof in this order:

1. A roofed structure **you own**.
2. If none is near, any **public** roof, for example a town building.
3. If there is no roof at all, its **home**.

It avoids buildings of other players. Once it is safe and its HP is back above the retreat line, it goes back to work.

# Care

Working costs [stamina](/docs/mechanics/combat/statusvalues/#stamina---sta). Stamina is the only need a Bestia has. There
is no separate hunger bar.

When stamina or HP drops below the care line, a Bestia looks after itself:

1. It uses an allowed item from **its own bag**, for example bread or a bandage.
2. If it has none, it walks to its job's **chest** and takes some.
3. A grazing species can also **graze** for a little stamina, as wild creatures do.
4. If nothing is left, it **rests** at home and you get a notice.

By default a Bestia eats below 40% stamina and heals below 50% HP. It may use common food and bandages, never potions.
You can change both lists in Fine-tune.

# Fine-Tune

Fine-tune is for experts. It has two parts.

**Overrides.** It shows every number the slider and the job chose: retreat line, care lines, allowed items, how far the
Bestia may stray from its area, when a gatherer hauls. You can change each one inside fixed limits. A changed number is
marked, and resetting it brings back the slider's value.

**Rules.** A short list of up to eight lines, read from the top. The first line that fits wins.

| When …                        | … then                        |
| ----------------------------- | ----------------------------- |
| stamina below _x_%            | eat, or rest at home          |
| HP below _x_%                 | heal, or retreat              |
| bag fuller than _x_%          | haul to the chest now         |
| it is night, or it is day     | rest at home, or keep working |
| a storm or a mana storm comes | take shelter, or keep working |
| a stronger foe is in sight    | retreat, or hold the ground   |
| the station fire is low       | add wood from the chest       |

Rules choose between things the job, Care and Courage already allow. "Keep working" can override storm shelter, but no
rule can make a gatherer fight or a guard craft.

# Presets

You can save a Bestia's orders as a **preset** with a name, for example _Camp gatherer_, and give it to other Bestias.
A preset stays linked: change it once, and every Bestia that uses it changes too. A Bestia can still override single
values. Those values stay its own when the preset changes.

# The Jobs in Detail

## Guard

A guard stays inside its area and attacks intruders:

- **Wild aggressive creatures**, always.
- **Other masters and their Bestias**, only where they could be attacked anyway. Never inside a
  [ward stone's field](/docs/mechanics/society/pvp/#protected-zones).
- **Never** members of your party or guild.

A guard does not leave its area to chase. When a fight ends, it walks back to the middle of the area.

## Gather

A gatherer walks its area and collects what you ticked:

- **Loose things**: sticks, resin, loose stones, reeds.
- **Plants**: herbs and shrubs.
- **Trees**: it fells trees for logs and resin. Felled trees regrow over weeks, see
  [Natural Resources](/docs/mechanics/items-crafting/natural-resources/).
- **Mana crystals**: mana and aetherite crystals.

When its bag is 80% full, it carries everything to its chest. If the chest is full too, it stops, rests, and you get a
notice.

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

A miner works a Mining Shaft built over a deposit. It works like a station: every few seconds of labour gives ore, which
goes into the Bestia's bag and then into the chest. The terrain does not change. Digging real ore in the ground is
planned for later.

## Follow and Rest

**Follow** keeps a Bestia close to you while you play. It fights what attacks you, within its Courage. When you log out,
it switches to its fallback job, or to Rest.

**Rest** keeps a Bestia at home. It eats, sleeps and recovers stamina twice as fast. A Bestia whose job has nothing to do
and has no fallback rests too.

# The Camp Chest

A camp chest is a new structure that holds items. Gatherers and miners fill it, and crafters' stations pay from it.

- It has a fixed number of slots.
- Only the owner may open it. You can give other players access.
- Taking from a chest that is not yours is [stealing](/docs/mechanics/society/pvp/#negative-honor) and costs honor.
- When it is destroyed, it drops what it holds on the ground as loot.

# While You Are Away

**Bestias work at the same pace whether you are there or not.** There is no daily cap. Materials, regrowth, craft times
and stamina are the limits.

They work until something stops them: a full chest, no food, an empty queue, or a fight they lose.

**A Bestia that falls while you are away stays down until you log in.** Its bag drops as loot where it fell, unless
something protects it, for example a seal spell. A guard that falls leaves its area unguarded.

# In the Companion App

The app's **Bestia** tab has these screens:

- **Pack**: every Bestia with its job and a live status line, for example _Crafting planks 4/20 at Workbench_ or
  _Paused: bag full_.
- **Orders**: preset, main job, fallback job and the Courage slider. Tap a job to set its places and resources.
- **Fine-tune**: overrides and rules.
- **Workshop**: your stations, their queues and workers, and an **Add to queue** button for recipes the chest next to it
  can pay for.
- **Diary**: what each Bestia did while you were away and why it stopped.

Four events can send a notification, within the app's [limit of six per hour](/docs/mechanics/companion-app/#limits):

- a Bestia fell,
- a Bestia stopped working (bag or chest full, no food, no fuel, no ingredients),
- a Bestia is under attack or had to retreat,
- a station finished its queue.

# Open Questions

- How many slots a camp chest has, and whether bigger storage buildings come later.
- Whether the Diary keeps every craft and every gathered stick, or one line per hour.
- How Follow decides between staying close to you and fighting.
- Whether a guard that cannot fight, such as a grazer, should call other guards or only alert the master.
