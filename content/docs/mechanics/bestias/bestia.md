---
title: Bestias
description: Details on catching, breeding, and leveling Bestias through combat and environmental interactions
weight: 300
aliases: ["/docs/mechanics/bestia-compendium/"]
---

In areas of high mana concentration, so-called **mini rift events** form. At these neuralgic points Bestia materialise and enter the respective world. Bestia therefore spawn on the map on their own, and they do so more often where the [mana concentration](/docs/mechanics/world/environment/#mana-concentration) is higher.

Which species spawns is decided by the surrounding environment: every Bestia has an affinity for certain biomes and spawns with the corresponding probability in each of them.

A wild Bestia is not born at one fixed level. Each species has a **level range**, and every individual is rolled somewhere inside it: a low-level critter might range from Lv 1 to 3, a high-level Bestia from Lv 50 to 58. The range is narrow at the bottom, where a level is a large share of a Bestia, and a little wider higher up. A higher roll has more health and mana, higher attributes, knows more of its learnset and gives more EXP; a lower roll has less of each. A caught Bestia keeps the level it had. Bosses always have one fixed level.

## Boss dens

A boss lives alone in a **boss den**. Boss dens appear only in wild country, where the ordinary dens are above level 40, and never near the home towns. They are rare in the open wilds (about one den in a hundred) and more common on corrupted land (about one in forty). A boss den covers the level of the country around it plus up to 20 levels more, so a boss is always harder than the packs nearby. The wilds hold the softer bosses (from about level 42), and only the deepest corruption holds bosses up to level 120. Which boss a den holds is decided by its biome, like any other Bestia; a boss that needs corruption never appears in clean wilds.

# Catching Bestias

To catch a Bestia you need a **Magic {{< item "bestia_trap" >}}**. These are manufactured with the Craftsman's [Carpentry](/docs/mechanics/master/craftsman-tree/#skill-carpentry) skill and empowered with {{< item "mana_dust" >}}. Four tiers exist, each one better than the last at holding a high-level Bestia.

The base catch chance depends only on the trap tier and the target's level:

| Trap                                                                 | Lv. 1 - 20 | Lv. 21 - 40 | Lv. 41 - 60 | Lv. 61 - 100 |     Lv. 101+     |
| :------------------------------------------------------------------- | :--------: | :---------: | :---------: | :----------: | :--------------: |
| {{< item "bestia_trap" >}} |    +60%    |    +20%     |    -20%     |     -60%     | -60% - 3(LV-100) |
| {{< item "super_trap" >}}   |   +100%    |    +60%     |    +20%     |     -20%     | -20% - 3(LV-100) |
| {{< item "mega_trap" >}}     |   +140%    |    +100%    |    +60%     |     +20%     | +20% - 3(LV-100) |
| {{< item "master_trap" >}} |   +180%    |    +140%    |    +100%    |     +60%     | +60% - 3(LV-100) |

The `Lv. 101+` column continues the `Lv. 61 - 100` column without a jump: at exactly Lv. 100 the penalty term is zero.

On top of the base chance, every bonus below contributes **percentage points**:

| Source                                                                            | Bonus        |
| :-------------------------------------------------------------------------------- | :----------- |
| Reducing the target's HP before throwing the trap                                 | up to `+30`  |
| The trap user's [Willpower](/docs/mechanics/combat/statusvalues/#willpower---wil) | `+ WIL / 50` |
| [Trapping](/docs/mechanics/master/survival-tree/#skill-trapping) Lv. 1 - 5        | `+6` … `+30` |
| [Beastfriend](/docs/mechanics/master/survival-tree/#skill-beastfriend) Lv. 1 - 5  | `+5` … `+25` |
| Buffs on the trap user, debuffs on the target                                     | varies       |

The HP bonus scales linearly with how far the target has been worn down, reaching its full `+30` when the Bestia is at 1% HP:

<!-- prettier-ignore -->
{{< katex display >}}
bonus_{HP} = 30 \cdot \left(1 - \frac{HP_{current}}{HP_{max}}\right)
{{< /katex >}}

Everything is then summed and clamped once:

<!-- prettier-ignore -->
{{< katex display >}}
P_{catch} = \mathrm{clamp}\big(0\%,\ 95\%,\ base_{trap} + \textstyle\sum bonus\big)
{{< /katex >}}

A result of `0%` means the Bestia cannot be caught with that setup at all — the player has to bring a better trap, better skills or better buffs. The `95%` ceiling means even a perfect setup can always fail.

{{< alert context="info" text="**Why additive and not multiplicative?** Because percentage points are legible and scale sanely. A multiplicative bonus (say `base × 4`) does almost nothing where the player needs it most - four times a `0.8%` base is still a hopeless `3.2%` - and is instantly wasted where they do not, since four times a `60%` base clamps immediately. Additive bonuses make every point of investment worth exactly the same, let a tooltip state a number that is true everywhere, and turn a negative base into a readable budget the player has to out-equip." />}}

Because the Lv. 101+ penalty is steep, the level at which catching becomes hopeless is set by how much bonus a player can assemble. Both rows below assume the target has been worn down to 1% HP:

| Setup                                                | Lv. 100 | Lv. 110 | Lv. 120 | Lv. 140 | Lv. 150 |
| :--------------------------------------------------- | :-----: | :-----: | :-----: | :-----: | :-----: |
| {{< item "mega_trap" >}}, no Forester skills, WIL 100 (`+32` total) |  `52%`  |  `22%`  |  `0%`   |  `0%`   |  `0%`   |
| {{< item "master_trap" >}}, maxed Forester, WIL 150 (`+88` total)   |  `95%`  |  `95%`  |  `88%`  |  `28%`  |  `0%`   |

Bestia above Lv. 100 are meant to be rare and Bestia above Lv. 120 close to legendary — but they always stay reachable for a master who has actually specialised in catching them.

## Catching a Boss

A boss or world boss holds the rarest essence in the game, so it is much harder to catch. Its chance is the chance
above, multiplied by `0.03`:

<!-- prettier-ignore -->
{{< katex display >}}
P_{boss} = 0.03 \cdot P_{catch}
{{< /katex >}}

So even the best setup ends at `0.03 × 95% ≈ 2.9%`. A Lv. 110 boss at 1% HP in a {{< item "master_trap" >}} with no
other bonus gives `0.03 × 60% = 1.8%`. Every bonus still counts, because the factor scales the whole sum.

A caught world boss is gone from its lair for the rest of the world, as if it was slain, see
[World Bosses](/docs/mechanics/world/world-history/#world-bosses).

## Breaking Free

A Bestia that breaks out of a trap is **Wary** for 30 seconds. While it is wary, it steps over every trap, so no
trap springs on it. The next try comes after the 30 seconds. Three traps in a row therefore do not give three rolls
at once.

# Attacks

In Bestia, there are two main types of magical actions:

1. **Skills** – Learned by a Bestia Master. Skills have levels and can be upgraded in a skill tree as the Master levels up. These are controlled by the player using skill points. See [Bestia Master](/docs/mechanics/master/basics/) for the full skill tree.
2. **Attacks** – Learned by a Bestia as it levels up, at fixed, predefined levels. These can be battle-related or utility magic.

Each skill or attack is characterized by its **level** and **elemental aspect**.

Some magical actions are **both** at once. Many offensive spells—the elemental bolts, for example—exist as a Master skill _and_ as a Bestia attack. A Master learns such a spell in their skill tree and raises its power by investing skill points, while a Bestia learns the very same spell as an attack at a fixed level and is locked to the strength of that level. In short: the Master keeps levelling the spell up, whereas a Bestia's version never grows beyond the level it was learned at.

Bestias can learn attacks in two ways:

1. **Level Up** – Each Bestia has an internal list of attacks it will learn as it gains levels. The same attack may be learned at different levels by different Bestias.
2. **Spell Scrolls** – Players can inscribe attacks onto spell scrolls with the Sage's [Spell Inscription](/docs/mechanics/master/scholar-tree/#skill-spell-inscription) skill (or find them as loot). These spells can be used directly from the scroll or taught to a Bestia.

General guidelines when Bestia are learning attacks from level ups:

- **From Lv. 1–100**, a Bestia should learn **about 20** attacks.
- Around **15 attacks** are learned between **Lv. 1–70**, and the last 5 (the most powerful ones) **between Lv. 71–100**.

An overview of the attacks themselves lives on the [Attack List](/docs/mechanics/combat/attack-list) page.

# Breeding

Bestia can be bred in order to improve their [individual values](#individual-values) and to pass powerful attacks
down a bloodline. Breeding takes two buildings, and each does one job at a time:

1. A **{{< item "breeding_farm_kit" "Breeding Farm" >}}** pairs two Bestia and lays an
   **egg**.
2. An **{{< item "incubator_kit" "Incubator" >}}** hatches the egg into a new Bestia.

Both are put down from a kit, like a [crafting station](/docs/mechanics/items-crafting/crafting-stations/#kits-place-stations).
The kits are made at a Workbench with [Carpentry](/docs/mechanics/master/craftsman-tree/#skill-carpentry):

| Kit           | Carpentry | Materials                          |
| :------------ | :-------: | :--------------------------------- |
| {{< item "breeding_farm_kit" >}} |   Lv. 2   | 12 plank, 6 reed stalk, 4 soft fur |
| {{< item "incubator_kit" >}} |   Lv. 3   | 6 plank, 4 brick, 4 warm stone    |

Any master can breed. A Forester's [Bloodline Study](/docs/mechanics/master/survival-tree/#skill-bloodline-study) makes it
faster and better, but it is not needed.

## The Pair

Every Bestia is **male** or **female**, half and half. The sex is rolled when the Bestia is caught or hatched and never
changes. To breed a pair:

- One is male and one is female.
- Both are of the same kind (humanoid, formless, etc.).
- Both are at least **Lv. 10**.
- Both belong to the owner of the farm.

## Laying an Egg

The owner opens the farm, picks the two parents and puts in one
**{{< item "nesting_bundle" >}}**. The bundle is made at a Workbench with
Carpentry Lv. 1 from a reed stalk, a soft fur and a feather.

1. **Travel.** The parents walk to the farm on their own, from wherever they are, like a Bestia
   [sent somewhere](/docs/server/long-distance-travel/). Nothing is used up yet.
2. **Breeding.** When both have arrived, the bundle is used up and the timer starts. The parents stay near the farm. They
   can still be attacked.
3. **Egg.** When the timer ends, the farm holds an egg. It holds it until the owner takes it out. While an egg waits, no
   new clutch can start.

If a parent is called away, sent off or dies before the egg is laid, the clutch fails. The timer is lost and so is the
bundle.

After the egg is taken, the pair stays at the farm. One more bundle starts the next clutch with the same pair. There is
**no cooldown**: the breeding time and the bundles are the only limits on how fast a bloodline can be pushed forward.

The breeding time depends on both parents' levels:

<!-- prettier-ignore -->
{{< katex display >}}
t_{breed} = 25 \cdot (lv_1 \cdot lv_2)^{1.3}\ [s_{real}]
{{< /katex >}}

This is the same as \\(25 \cdot \bar{L}^{2.6}\\) with \\(\bar{L} = \sqrt{lv_1 \cdot lv_2}\\), the geometric mean of the
two parents' levels. An unevenly matched pair breeds at the pace of its average.

## Hatching the Egg

An egg is an item. It can be carried, stored, sold and traded. It knows its species, its sex and its individual values
already, and the [IV grades](#individual-values) show on it.

An egg only hatches inside an Incubator. The owner of the incubator puts it in, and the hatch timer runs:

<!-- prettier-ignore -->
{{< katex display >}}
t_{hatch} = rand(0.9,\ 1.0) \cdot 18 \cdot lv_1 \cdot lv_2\ [s_{real}]
{{< /katex >}}

The random factor is rolled when the egg is laid, so the time does not change when it moves. An egg that is taken out
early **keeps its progress**. Another incubator continues where the first one stopped, so a half-hatched egg can be
traded.

When the timer ends, the Bestia hatches next to the incubator at **Lv. 1** and belongs to the incubator's owner. If the
owner has no free active slot, the Bestia goes into the [storage](/docs/mechanics/bestias/bestia-storage/). If that is
full too, the egg waits in the incubator, ready, until a slot is free.

The offspring is always of the **female's** species, so every generation has to be raised to Lv. 10 again before it can
breed in turn.

## Timers

Both timers are given in **real time**, not [Bestia time](/docs/mechanics/world/environment/#in-game-time). They run
while the owner is logged out.

| Parent levels | Breeding time      | Hatch time |
| :------------ | :----------------- | :--------- |
| 10 & 10       | ~2 h 45 min        | ~30 min    |
| 20 & 20       | ~17 h              | ~2 h       |
| 30 & 30       | ~2 days            | ~4.5 h     |
| 50 & 50       | ~7.5 days          | ~12.5 h    |
| 75 & 75       | ~21.5 days         | ~28 h      |
| 100 & 100     | ~46 days (~1.5 mo) | ~2 days    |
| 120 & 120     | ~73 days (~2.4 mo) | ~3 days    |

The owner's [Bloodline Study](/docs/mechanics/master/survival-tree/#skill-bloodline-study) shortens both timers: the
farm owner's for breeding, the incubator owner's for hatching. Upgrades, feed and buffs are planned to shorten them
too. All of it counts against one cap: a timer is never shorter than **50%** of its base.

{{< alert context="info" text="Note the deliberate tension in the timers: because individual values do not depend on level, the cheapest way to ladder IVs is to keep a dedicated breeding line at exactly Lv. 10 and accept the ~3 hour timer. High-level parents only become worth their far longer timer when the goal is inheriting a powerful attack, since a father can only pass on an attack he has actually learned himself." />}}

## Individual Values

A Bestia has nine individual values: one for each of the six [status values](/docs/mechanics/combat/statusvalues/#status-values)
(INT, WIL, STR, VIT, DEX, AGI) and one each for HP, Mana and Stamina — the `ivHp`, `ivMana` and `ivSta` terms in the
[status based value](/docs/mechanics/combat/statusvalues/#status-based-values) formulas. Each one ranges from `0` to
`100`. A caught Bestia rolls each of its nine IVs evenly between `0` and `100`.

Players see a **grade** for each IV. A master with [Bloodline Study](/docs/mechanics/master/survival-tree/#skill-bloodline-study)
Lv. 1 or more sees the exact numbers instead.

| IV       | Grade     |
| :------- | :-------- |
| 0 - 19   | Poor      |
| 20 - 39  | Fair      |
| 40 - 59  | Good      |
| 60 - 79  | Great     |
| 80 - 94  | Excellent |
| 95 - 100 | Perfect   |

## Individual Value Evolution

The offspring's IVs are rolled per IV, independently:

1. **Seed** — three of the nine IVs are drawn at random as _dominant_. For a dominant IV the seed is the **higher** of the two parents' values; for the remaining six the seed is taken from one randomly chosen parent.
2. **Variance** — roll once per IV: with `70%` the seed is raised by 10%, with `20%` it stays as it is, and with `10%` it is lowered by 10%.
3. **Clamp** — round to the nearest integer and clamp into `[0, 100]`.

A dominant IV therefore drifts upward by about `6%` per generation on average (`0.7 · 1.1 + 0.2 · 1.0 + 0.1 · 0.9 = 1.06`), so a line seeded around IV 50 needs roughly a dozen generations to approach the cap of 100. Because only three IVs are dominant per clutch, the player has to decide which stats a bloodline is being bred for rather than improving everything at once. A Forester with [Bloodline Study](/docs/mechanics/master/survival-tree/#skill-bloodline-study) Lv. 4 draws a fourth dominant IV, which is the only way to widen that choice. The farm owner's skill counts.

**How much is an IV actually worth?** The answer is defined once, on the [Status Values](/docs/mechanics/combat/statusvalues/#individual-values) page, and follows directly from the status value formula:

```text
statusValue = (baseValue + individualValue) * level / 100 + effortValue
```

The IV is scaled by level, so it is nearly irrelevant on a fresh Lv. 1 hatchling and worth its full value at Lv. 100. A perfect IV of 100 instead of 0 is worth `+50` to that status value at Lv. 50 and `+100` at Lv. 100. This is what makes breeding a long-term investment: the payoff only materialises once the offspring has been levelled.

{{< alert context="info" text="Bestia Masters are never bred and always have an IV of 50 in every stat, so none of this applies to them." />}}

## Learnable Attacks

Breeding can give the offspring up to **three inherited attacks** on top of the ~20 attacks its species learns naturally. Only the **father** passes attacks on; the mother decides the species.

The player influences the outcome on three levels.

### 1. Season — which attacks are eligible

Only attacks whose learn level falls inside the current [Bestia season's](/docs/mechanics/world/environment/#in-game-time) band are eligible. The season is the one at the farm when the egg is laid:

| Attack Lv. Range | Season Of Breeding |
| :--------------- | -----------------: |
| 1 - 25           |             Spring |
| 26 - 50          |             Summer |
| 51 - 75          |               Fall |
| 76 - 100         |             Winter |

A season lasts one real-time month, and a Bestia knows about 20 attacks spread over Lv. 1 - 100, so a band typically leaves about **five** of the father's attacks eligible. Waiting for the right season is the coarse, free control.

### 2. Priming — which eligible attacks are attempted

Up to three eligible attacks are drawn at random. These are the candidates.

{{< alert context="warning" text="**Planned.** The player will be able to load up to three spell scrolls of eligible father attacks into the farm. Those become the candidates instead, and the scrolls are used up when breeding begins. Spell scrolls come from the Sage's [Spell Inscription](/docs/mechanics/master/scholar-tree/#skill-spell-inscription) skill, which does not exist in the game yet." />}}

### 3. Investment — how likely each candidate is to land

Each candidate rolls independently. All terms are percentage points:

<!-- prettier-ignore -->
{{< katex display >}}
P_{transfer} = 30\% + \min\big(30,\ lv_{father} - lv_{attack}\big) + 2 \cdot Beastfriend_{Lv}
{{< /katex >}}

A father can only pass on an attack he has learned, so the middle term is never negative. It rewards levelling a stud well past the attack you actually want from him: the chance runs from `30%` for a father who has only just learned the attack up to `70%` for one who is 30 levels past it and backed by [Beastfriend](/docs/mechanics/master/survival-tree/#skill-beastfriend) Lv. 5.

A successful roll resolves like this:

- The offspring's species **cannot** learn the attack naturally → it is added as an **inherited attack**, learnable at the level the father learned it. This is the valuable case, and the only way to get an attack onto a species with no natural access to it.
- The offspring **can** learn it naturally, but later than the father did → its learn level is pulled down to the father's.
- The offspring already learns it at the same level or earlier → no effect.

On top of that, each transferred attack has a `30%` chance to be learned one further level earlier.

# Bestia Compendium

{{< alert context="info" text="Implemented in bestia-behemoth on the `compendium/01..06` branches: recording on the zone, the window in the client, the habitat overlay on the map and a Compendium tab in the companion app." />}}

Every master keeps a **Bestia Compendium**, a book of every bestia species. It fills up as the master and their
bestias explore the world. It is the place to look up what a species is, where it lives and whether you have caught
one yet.

## What the book lists

The compendium lists **every species number**, from the first to the last. The game is open source, so hiding which
numbers exist would protect nothing. What a master has not seen yet stays blacked out:

| State  | What the entry shows                                                                                                                                   |
| :----- | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unseen | The number, a black silhouette and `???`                                                                                                               |
| Seen   | Portrait, live model, name, kind, habitat, drops, the [description](/docs/mechanics/bestias/bestia-design/#9-the-compendium-entry) and when it was first seen |
| Caught | Everything a seen entry shows, plus a caught mark                                                                                                      |

Townsfolk and creatures made for game masters are not bestias a master would study. A mob YAML with
`compendium: false` keeps a species out of the book entirely.

## Seeing a species

A species counts as **seen** when a wild bestia of it comes within **24 m** of the master or of any bestia the master
owns. A bestia left standing somewhere else keeps watching for its master. This makes it worth sending bestias ahead
into new ground.

24 m is about what is clearly visible on screen. The terrain a client loads reaches much further, and loading a
creature is not the same as seeing it.

Only living, wild bestias count. A body on the ground or somebody else's bestia does not.

## Catching a species

A species counts as **caught** the first time a [trap](#catching-bestias) catches one. It stays
caught when the master has no free slot, not even in the
[storage](/docs/mechanics/bestias/bestia-storage/), and the creature is released again, or when the bestia is later given away.

A master who owned bestias before the compendium existed finds those species already marked as caught.

## The entry

- **Portrait.** A hand-drawn picture of the species. Species without art yet show a placeholder.
- **Live model.** The species' 3D model on neutral ground, seen at an angle from above. It turns slowly and can be
  dragged to turn it. Only the game client shows it; the companion app shows the portrait alone.
- **Name, kind and description.** The translated text from the mob YAML, see
  [Where the text lives](/docs/mechanics/bestias/bestia-design/#where-the-text-lives).
- **Habitat.** The [biomes](/docs/server/world-generation/#biomes) the species spawns in. An empty habitat means
  anywhere on land.
- **Drops.** The items the species can drop, each with its chance per kill. Only a seen
  species shows them.

The list can be searched by name and number, and filtered to all, seen or caught species.

The drop list also works the other way round. A [quest](/docs/mechanics/towns-trade/blackboard/#dropped-by) that asks
for an item lists the seen species that drop it. The drops are built on the bestia-behemoth branch
`quest/01-compendium-drops`, in the game client only.

## Habitat on the map

A seen species can be shown on the [map](/docs/mechanics/world/world-exploration/#explored-world-map), to help hunt it. The
overlay only covers ground the master's charts show: it never reveals uncharted land.

It has two layers:

1. **Biome tint.** A light wash over every charted pixel whose biome is in the species' habitat. It says where the
   species _may_ live.
2. **Heat haze.** A stronger, blurred glow around each den of the species. A large biome may hold only a few dens,
   and the tint alone would send a player across half a continent.

The haze must narrow the search without marking the den. Each den's glow is a soft blob about 800 m across, and its
centre is moved 100 to 250 m away from the den. The den is inside the warm area, but never at its hottest point.
Where many dens sit close together, their blobs merge into one warm area. The haze stays off water. The offset is
fixed per den, so asking for the same tile again gives the same picture: there is nothing to average away.

Creature dens are otherwise never shown on the map. The haze is the one deliberate exception, and it is blurred on
purpose.

## Companion app

The [companion app](/docs/mechanics/companion-app/) has a **Compendium** tab with the same list, search and filters.
Its map can show the same habitat overlay. Both only show what the master already knows, so the app stays a report of
the player's own knowledge and not a lookup of the world.

# Experience

The primary way to gain experience is fighting enemy Bestia. More pacifistic players can earn experience through skill use and interaction with the world instead. To keep combat the fastest route without making the alternatives pointless, skill-based experience is deliberately pegged at **75 %** of what a fighter earns in the same time at the very best, and it is additionally rate-limited by an effort bank, materials, resource node respawns and crafting times. See [Work Experience](#work-experience).

## The Level Curve

Every level is designed around **how long it takes**, not around an EXP number. The time one level takes a player who does nothing but earn experience grows with the level and is anchored at **24 hours of constant play at Lv. 97**:

<!-- prettier-ignore -->
{{< katex display >}}
t(lv) = \max\left(60\,\text{s},\; 24\,\text{h} \cdot \left(\frac{lv}{97}\right)^{2.5}\right)
{{< /katex >}}

The experience a level costs is that time at the rate an on-level fighter earns it. A kill of an enemy of the same level takes about `25` seconds, walking and recovering included, and is worth `4 * lv + 5` (see [Killing Enemies](#killing-enemies)):

<!-- prettier-ignore -->
{{< katex display >}}
exp_{req}(lv) = t(lv) \cdot \frac{4 \cdot lv + 5}{25\,\text{s}}
{{< /katex >}}

| Bestia Lv. | EXP for next level | Time per level | ≈ same-level kills |
| ---------: | -----------------: | -------------: | -----------------: |
|          1 |                 22 |          1 min |                  2 |
|         10 |                531 |          5 min |                 12 |
|         25 |             12,237 |         49 min |                117 |
|         50 |            135,152 |          4.6 h |                659 |
|         75 |            554,112 |         12.6 h |              1,817 |
|         97 |          1,358,208 |           24 h |              3,456 |
|        100 |          1,510,426 |         25.9 h |              3,730 |

The exponent is above `2` on purpose: gear takes `1.2 * lv^2` seconds to craft, so a craftsman needs ever more crafts per level, never fewer. About `650` hours of constant play lead to Lv. 97. The kill counts are before any of the modifiers below, which in practice cut them down considerably. The table applies to Masters and Bestias alike, and a Master gains one skill point per level, so skill points arrive on the same curve.

## Killing Enemies

When an enemy is defeated the base experience of the kill is:

<!-- prettier-ignore -->
{{< katex display >}}
exp_{gain} = 4 \cdot lv + 5
{{< /katex >}}

where `lv` is the level of the defeated entity. The following modifiers are then summed and applied once to that base:

| Modifier                                                        | Effect                  |
| :-------------------------------------------------------------- | :---------------------- |
| Each player involved in the attack beyond the first             | `+15%`, at most `+150%` |
| The target was flagged as a boss                                | `+200%`                 |
| Each elemental level of the target (e.g. `FIRE_2` gives `+20%`) | `+10%`                  |
| The target was a player-controlled Bestia                       | `+80%`                  |
| The target was a structure                                      | `-80%`                  |
| Buffs and equipment                                             | varies                  |

Players are counted by account, so a master and its own Bestia fighting together are one player. The `+15%` per additional player grows the pool _before_ it is split, so bringing more players into a fight is not a straight loss for each of them — but it is still less per head than soloing the same enemy.

After the killing blow is delivered, the resulting pool is distributed among the damage dealers in proportion to the damage each of them contributed. Where each portion then goes:

1. **Party.** In a party set to _Even share_, a portion gets `+30%` and is split evenly between the members near the kill; see [Parties](/docs/mechanics/society/party-guild/#sharing-experience). This bonus is separate from, and on top of, the one for several players above. In a party set to _Each take_, or outside a party, the attacker keeps its portion.
2. **Guild.** A guild member pays its rank's tax on what it receives; see [Guild Tax](/docs/mechanics/society/party-guild/#tax-and-guild-experience).
3. What is left is credited to whoever received it - the attacker itself, or a member's master when the portion was shared.

## Environment Interaction

Experience is also earned by working with the world rather than fighting it:

| Activity                                                         | EXP gained                                                          |
| :--------------------------------------------------------------- | :------------------------------------------------------------------ |
| Travelling                                                       | `3` per km travelled                                                |
| Gathering a resource (mining, lumberjacking, herbalism, fishing) | `2 * resource_level + 5`                                            |
| Crafting an item (forging, brewing, transmuting, …)              | by the time the craft took, see [Work Experience](#work-experience) |
| Constructing a structure                                         | `3 * item_level + 10`                                               |
| Destroying another master's structure                            | by a quarter of its build time, see [Where to Build](/docs/mechanics/towns-trade/where-to-build/#clearing-away-structures) |

Gathering sits at about half of `4 * lv + 5`, the base experience for defeating a Bestia of the same level.

Travel experience is deliberately tiny: at Lv. 50 a single level would take about 45,000 km on foot. It is a top-up for players who are out exploring anyway, never a progression route of its own.

### Work Experience

A Master who crafts earns experience for **successful** crafts, so a job-focused playstyle levels without fighting. What pays is not the cast of a skill but the _time the work took_, counted in effort seconds. The cast of a crafting skill only opens the crafting window, and a skill with no cooldown could be cast endlessly, so neither mana, nor skill rank, nor the number of casts count.

An effort second is paid like a second of fighting, times a `pace` of `0.75`:

<!-- prettier-ignore -->
{{< katex display >}}
exp_{work} = 0.75 \cdot effort \cdot \frac{4 \cdot lv + 5}{25\,\text{s}}
{{< /katex >}}

Equivalently, an action pays `0.75 * effort / t(lv)` of the level (see [The Level Curve](#the-level-curve)), so the **share of a level one action pays falls as the level rises**. Gear takes `1.2 * item_level^2` seconds to craft. Crafting an item of your own level pays:

| Master Lv. | Craft time |     EXP | Share of the level | Crafts per level |
| ---------: | ---------: | ------: | -----------------: | ---------------: |
|         10 |      2 min |     162 |               31 % |                3 |
|         40 |     32 min |   9,504 |               15 % |                7 |
|         60 |     72 min |  31,752 |               12 % |                8 |
|         80 |      2.1 h |  74,880 |               11 % |                9 |
|         97 |      3.1 h | 133,119 |               10 % |               10 |

Four rules keep it honest:

- **Only the work counts.** A craft pays for its own time, capped at what an item five levels above the Master takes, so reaching far above your level does not pay as if it had been worked. A trivial craft at a high level is worth next to nothing. A single payout is never more than `35 %` of a level.
- **Only success pays.** A failed craft has already cost its materials and pays nothing.
- **One effort second per second.** Every Master has an _effort bank_ that fills one second per real second, up to one hour, online or off. Every payout draws from it, so no number of stations or skills can beat the curve, and logging out and in does not refill it. Even a Master who does nothing but work reaches `75 %` of a fighter at the very best; walking, gathering materials and trading make it less.
- **The Master plays.** The work of a Bestia at a station counts for its Master, and only while that Master is in the world. Work finished while the Master is offline pays nothing.

The guild tax applies to work experience as it does to kills; a party does not share it.

{{< alert context="info" text="Crafting and [clearing away other masters' structures](/docs/mechanics/towns-trade/where-to-build/#clearing-away-structures) are the only sources of work experience today. Support skills that land on a player who needed them (healing or curing someone else, buffing someone who lacked it) and Master gathering are meant to follow, on the same curve. Fighting skills, self-only buffs, movement and detection skills and the like never pay: they have no work product and are too cheap to repeat." />}}

## Death Penalty

A defeated Master or Bestia falls and lies where it fell. A Priest's
[Resurrection](/docs/mechanics/master/scholar-tree/#skill-resurrection) can raise it there. Otherwise its player sends
it back to its [save point](#where-you-get-up).

Every defeat costs the same:

- **Experience.** It loses `1%` of the experience it holds in its current level. It never loses a level.
- **Durability.** Every piece of worn gear loses `10%` of its maximum durability.
  [Equipment Coating](/docs/mechanics/master/warrior-tree/#skill-equipment-coating) reduces the loss. A piece that
  breaks comes off into the bag. A torch keeps its burn time. A [repair kit](/docs/mechanics/items-crafting/items/#repair-kits)
  fixes gear far from a forge.
- **The bag.** A Master keeps its bag. A Bestia drops its bag, see [below](#the-bestias-bag).

There is no status malus. Getting up costs nothing more.

### Where You Get Up

A fallen Master gets up at the first of these that applies:

1. The [Base Camp](/docs/mechanics/master/survival-tree/#skill-base-camp) of its party, at Lv. 3, while the camp stands.
2. The nearest [Stronghold](/docs/mechanics/society/guild-strongholds/) of its guild that has a steward.
3. Its **save point**.

Every Master has a save point. At creation it is the start town the player picked. Any
[inn](/docs/mechanics/towns-trade/settlements/#the-inn) can make itself the save point, in a generated town or in a
[player town](/docs/mechanics/towns-trade/player-settlements/). When the save point is lost, for example because its
inn was torn down, the nearest start town becomes the save point again.

A Bestia gets up at its own save point: the place where it was caught or hatched. A Bestia without one uses its
Master's. An inn can also tend all your Bestias at once, for a fee.

### The Bestia's Bag

A defeated Bestia drops everything in its bag where it fell. Worn gear stays on its body. The drop is kill loot: the
killer may take it alone for the first `6 s`, then anybody may.

The Bestia attack **Keepsake Ward** protects the bag. A few wild species learn it. A Master copies it onto a
[spell scroll](/docs/mechanics/master/scholar-tree/#skill-spell-inscription) and uses the scroll on its own Bestia.

- The ward stays on the Bestia until the Bestia falls. It has no end time and cannot be dispelled from the living Bestia.
- When the Bestia falls, the ward is used up. The bag drops as one bundle that carries the ward as an
  [enchantment](/docs/mechanics/items-crafting/items/#enchantments).
- For `60 s`, only the Bestia's Master can pick the bundle up.
- After `60 s`, the bundle sends itself to the Master's home post office as a parcel.
- A [Dispel](/docs/mechanics/items-crafting/items/#dispelling-an-enchantment) cast at the bundle can break the ward in
  time. The ward has a fixed Potency of `400` and a threshold of `60`. A strong Sage at Dispel Lv. 5 (`P 80`) breaks
  it in `20%` of tries. A weaker Dispel cannot touch it. A broken ward leaves a plain bundle that anybody can loot.

### Permanent Death

Bestia, unlike their Master, can be lost for good. A killing blow is fatal in the permanent sense when its **overkill damage** — the damage dealt in excess of the Bestia's remaining HP — is at least equal to the Bestia's maximum HP.

This keeps the risk legible: a Bestia is only ever permanently lost to something that could have killed it twice over. Being badly outmatched by a boss, or ambushed at full HP by something far stronger, is genuinely dangerous, while ordinary attrition in a fair fight is not.

- A Bestia that lives through the blow, for example by the last stand of the Ember Phoenix's essence, is not lost.
- A lost Bestia leaves the world at once and cannot be raised.
- Its bag drops as above. Its worn gear goes to its Master by post.
- The [Bestia Diary](/docs/mechanics/bestias/bestia-orders/) records the loss. The companion app tells an offline Master.

{{< alert context="warning" text="The overkill threshold is **temporary** and still subject to balancing. It should stay high enough that permanent loss reads as a consequence of being outmatched rather than as bad luck." />}}
