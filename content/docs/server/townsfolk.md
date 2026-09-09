---
weight: 560
title: Townsfolk & Settlement Simulation
description: "Design document for inhabited settlements — the three simulation tiers, the deviation-based economy ledger and its stability invariants, and the GOAP domain that gives townsfolk occupations and daily schedules."
---

{{< alert context="warning" text="This page is a design document, not a description of running code. There are no NPCs, no shops and no currency in `zone-server` today — the only 'market' code in the repository is a GOAP planner test scenario. The design below is what is being built, and the [Known blockers](#known-blockers) section is honest about what has to be fixed first." />}}

Settlements are generated in full — streets, districts, buildings with door bearings, a roster of
thirty-one trades per town derived from population and terrain — and then stand completely empty.
The generator also produces a household graph and a population summary explicitly designed to be
re-inflated into agents at runtime, and nothing has ever called it.

This page describes filling them in: people with occupations and daily schedules, and behind those
people an economy in which goods are genuinely produced, moved, sold and consumed.

The whole effort is measured against one sentence:

> A player walks into a village, buys bread, burns the field outside it, comes back a Bestia day
> later, and the bread is more expensive.

That is deliberate. This codebase has a habit of shipping subsystems that are complete, tested and
never reached — the settlement lore service ("nothing calls this yet and nothing speaks"), the
household expander, the whole offline economy tier. Anything that does not move that sentence closer
to demonstrable is deferred.

# Three tiers, not two

The obvious split is "agents when a player is near, an aggregate ledger when not". That misses the
tier this codebase already leans on everywhere: **derived, stateless `f(seed, t)`**. Weather has no
stored state at all. Scorch regrowth "costs no writes" because the visible mask is recomputed on
read from accumulated rainfall.

So the economy stores **only the deviation from a derived reference path, and that deviation
mean-reverts to zero**.

{{< table >}}

| Tier        | Holds                                                                  | Cost                                    |
| ----------- | ---------------------------------------------------------------------- | --------------------------------------- |
| **Derived** | Reference stock and price paths, roster, population, catchments        | Nothing — recomputed from the world     |
| **Ledger**  | Δ stock, δ log-price, treasury, last-stepped day                       | One row per settlement a player touched |
| **Agents**  | Visible townsfolk with a full GOAP brain                               | Capped per player, see [LOD](#level-of-detail) |

{{< /table >}}

This is the decision the rest hangs off. An untouched settlement has **no database row at all**, its
step is exactly a no-op, and "tick the whole world" versus "persist only what players touched" stops
being a trade-off.

# The settlement ledger

## State

Per settlement: `Δ` stock deviation per commodity, `δ` log-price deviation per commodity, a treasury
`M`, and the game day it was last stepped. Keyed on the dense settlement index, with the world's
shape and pipeline versions carried alongside so a regenerated world discards stale books — the
pattern the prop-divergence and scorch registries already implement.

Rows are created lazily on the first non-zero deviation and **deleted again** once everything decays
back inside a tolerance.

## The step

```text
visibleStock = clamp(S_ref · season(t) + Δ, 0, warehouseCap)
price        = p_ref · siteMul · seasonPrice(t) · exp(δ)

cap    = capRef · health(s,t) · hunger(s)
run(t) = cap · util · min over inputs of (stock / need)
eat    = P · perCapita · (p_ref / price)^ε
Δ'     = Δ · exp(−(spoil + κ) · d) + flow · d
δ'     = δ + (clamp(γ · ln(coverTarget / cover), −ln 2, +ln 4) − δ) · (1 − exp(−d/τ))
```

`run` is a Leontief production function: a trade runs at the smallest ratio its inputs allow. That
one line is where *burn the field → no grain → no flour → no bread* falls out, with no special case
anywhere.

Three numbers carry the design:

**`util = 0.8`.** A settlement in equilibrium runs its trades at four-fifths and holds a fifth in
reserve, so a shock is absorbed by *raising utilisation* rather than by starving. Without it, every
negative shock is permanent.

**`κ` is inter-settlement trade, expressed as a decay rate** rather than as caravans. It is scaled by
the road traffic the generator already records on each settlement, so a crossroads town refills a
shortage in about two and a half game-days and an isolated hamlet takes ten. Imports are charged to
the treasury, so a bankrupt town degrades instead of being invisibly rescued. No bilateral matching,
no _O(n²)_ pass, and a clean upgrade path: make κ pull toward a road-weighted regional mean instead
of toward zero, of which the first version is the special case.

**Production rates are derived, not tuned.** For a chain ending in a household staple:

```text
rate(baker) = perCapita(bread) · residentsEach(baker) / employeesPerBusiness
              · (1 + spoil(bread) · coverTarget) / util
```

which comes out at about seventy loaves per baker per game-day. It follows from the trade
catalogue's own service ratio, so the generator and the runtime cannot drift apart.

## Why it does not drift

At `Δ = 0` the net flow is zero by construction, because the reference production and reference
demand *are* the settlement's own steady flows. At `δ = 0` stock cover equals its target, so the
price target is `ln(1)`. Both are exact fixed points, to floating point.

Seasonality does not break that, and this is the point of expressing everything as a deviation: the
seasonal multiplier moves the *visible* stock and price through the year while Δ and δ stay at zero.
A town's grain swings with the harvest and its database row still does not exist.

Three independent reasons it cannot run away, any one of which suffices:

1. **δ is confined by construction.** It relaxes convexly toward a target that is explicitly
   clamped, so the clamp interval is an invariant set whatever the stock model does.
2. **Δ is contracting.** More stock means more consumption and more spoilage and never more
   production of the same good, so the derivative of the update with respect to Δ is below one.
3. **No positive feedback loop can exist**, because production of a good depends only on its
   *inputs*. That requires the commodity graph to be acyclic, which is checked at boot — with a
   cycle, zero becomes an absorbing state and the town dies permanently.

# Commodities and trades

A commodity is a real item from the item catalogue. `economy.yml` binds each trade to inputs and
outputs per game-day, a reference price, spoilage, seasonality, and the building function it works
from. Three first-class kinds:

- **`trades:`** produce something.
- **`retail:`** hold stock and sell it without producing — the general store, the market trader.
- **`unbound:`** produce nothing tradeable at all — temple, healer, banker. A real case, not a fudge;
  inventing an abstract "service" commodity for them costs a week and buys an item nobody can hold.

**Every trade in the catalogue must appear under one of the three with a reason, or the server does
not boot.** A trade with no entry is a shop in every town in the world with nobody in it, and that
should be found by a build rather than by a player.

## Relationship to player recipes

Where a player recipe exists for the same transformation, the economy entry **names it and the boot
runner asserts the inputs and output match**. It does not reuse the recipe type, for three reasons:

1. A recipe requires a skill, and there is no BAKING skill. Inventing one would pollute the master
   skill tree and the client's attack database, which are a three-way sync obligation.
2. A farmer growing grain has no material inputs. Its binding constraint is land and season, which a
   recipe has no field for.
3. A recipe's success chance and cast time are per-attempt *player* mechanics. Folding them into NPC
   throughput would mean a balance change to the player's forge silently changing the town's iron
   output.

A checked correspondence, not a shared type. What matters is that a player crafting an ingot and a
town smelting one use the same materials in the same proportion.

## What can be bound today

Of the thirty-one trades: five can produce an item that already exists, three are retail, eight are
pure services, and **fifteen are blocked on a missing item**.

The first three items to add are `grain`, `flour` and `bread`, because they build
farm → mill → bakery → household and that chain exercises every mechanism at once: multiple stages,
capacity damage at the farm end, a consumption sink at the household end, and spoilage on the
perishable. Bread is a usable item, so it is worth a player buying.

In value order after that: `log`, `charcoal` — which closes the one complete recipe chain the game
already has, whose `coal` input nothing currently produces — then `raw_fish`, `wool`/`cloth`,
`hide`/`leather`, `ale`, `cut_stone`. Twelve new items bind roughly fourteen more trades.

## Currency

A `gold_coin` item, stackable, **weightless**. Weightless because the design forbids smaller
denominations and a fresh master's entire carrying capacity is about twenty-five kilos — at any
non-zero coin weight, ordinary shopping becomes a logistics puzzle. The [postal
system](/docs/mechanics/economy-trade/#postal-fees-and-delivery-time) already prices gold as a
percentage fee rather than as freight, which is the reading consistent with the rest of the design.

[Minting](/docs/mechanics/master/#skill-minting) stays out of scope here. Coin enters the world only
through settlement treasuries seeded from the NPC pool, so the [conservation
invariant](/docs/server/economy/#the-conservation-invariant) is trivially satisfied until the faucet
exists.

# Player destruction

Three radii answer three different questions, and conflating them is the bug waiting to happen:

{{< table >}}

| Radius              | Scale                      | Question                       |
| ------------------- | -------------------------- | ------------------------------ |
| Settlement footprint | 1310 / 610 / 280 / 130 m  | Was the **mill** burnt down?   |
| Economic catchment  | 20 / 12 / 7 / 4 km         | Was the **field** burnt?       |
| Resource range      | 14 km                      | Was the **deposit** mined out? |

{{< /table >}}

## Count the damage, not the world

Counting resident entities is not merely inaccurate, it is catastrophic: static props exist only
while a client holds the terrain column they stand on, so on an empty server every settlement would
read zero production. Enumerating generated props is impossible in a different way — a 128 km world
holds on the order of a million tree props, and materialising a 14 km catchment means hundreds of
thousands of column evaluations.

So **invert it**: iterate the damage, which is tiny, and test each damaged thing against the
settlements.

- **Burnt ground.** The scorch registry's scarred columns are "a handful in ordinary play, zero most
  of the time", and each scar's visible mask already has regrowth applied. Arable area is derivable
  from the food capacity and cereal share the generator wrote onto the settlement.
- **Felled and collected props.** The finding that makes this affordable: a prop's durable identity
  **already encodes its position**. The identity packs a lattice cell, and the cell size is known per
  kind, so the divergence table is a sparse, positioned damage set with no schema change at all.
- **Destroyed workplaces.** Same decode, tested against the footprint, matched to trades by building
  function. Deliberately coarse — losing one of five craft buildings takes a fifth off every craft
  trade, because working out *which* one was the mill would mean a second copy of the generator's
  business placement in another module.

Catchments overlap, and the generator shares contested land out by a distance-falloff weight. That
weight must be reproduced, or burning a contested field hurts one village for free and the two
settlements' books stop adding up.

## Two traps

**A regrown prop lingers in the divergence map** until somebody walks past its column, because
eviction only runs on materialised columns. The damage sweep must therefore apply the regrowth
deadline itself, read-only — and must *not* evict, which would make the economy a third writer of a
map whose contract names exactly two.

**Ore deposits cannot be exhausted and this will not be half-built.** Ore is voxels: no prop, no
durable identity, no persisted terrain-edit channel. The later mechanism is a mine-head prop at the
deposit, which slots into the felled-prop channel unchanged.

# Stability invariants

Each is a boot check, a constructor requirement, or a test — never a comment. They are numbered so
the tests can cite them.

## Price

{{< table "table-sm" >}}

| #   | Invariant                                                                             |
| --- | ------------------------------------------------------------------------------------- |
| I1  | `0.5 · p_ref ≤ price ≤ 4 · p_ref`, by clamping δ every step rather than by hoping      |
| I2  | Price moves continuously; no step changes a player can be surprised by                 |
| I10 | `bid ≤ ask · (1 − 2·spread)` — round-tripping in one settlement is strictly loss-making |
| I11 | The same holds for *n* units at once, once price impact is included                    |

{{< /table >}}

## Stock

{{< table "table-sm" >}}

| #   | Invariant                                                                              |
| --- | ---------------------------------------------------------------------------------------- |
| I3  | Visible stock is never negative                                                          |
| I4  | Stock is capped by warehouse capacity; the excess spoils at the ceiling                  |
| I5  | Every commodity has `spoil + κ > 0`, or boot fails — otherwise it is an unbounded accumulator |
| I12 | **Locals eat first**: only `stock − population · perCapita · reserveDays` is offerable   |

{{< /table >}}

## Money

{{< table "table-sm" >}}

| #  | Invariant                                                                    |
| -- | ------------------------------------------------------------------------------ |
| I6 | Every unit a player buys leaves the ledger; every unit sold enters it          |
| I7 | Coins paid out equal coins removed from the treasury, exactly                  |
| I8 | The treasury never goes negative — a shop that cannot pay refuses              |
| I9 | The treasury is capped — a town that cannot absorb more refuses to buy         |

{{< /table >}}

NPC-to-NPC trade is internal to the ledger and moves no money: simulating per-NPC purses buys
nothing and costs exactly the state this design refuses to keep. But a treasury that *only* moves on
player trades is a one-way ratchet, because players are net sellers early and net buyers late. So
the treasury mean-reverts to what a settlement of that size and wealth ought to hold, over about
twenty game-days.

That is not a second faucet. A player who dumps ten thousand apples drives the treasury below its
reference, it refills slowly, and their *second* load sells into a thinner purse. The fiction is
taxes and trade with the un-simulated world beyond the map — which is what a 128 km world is
embedded in.

## Structure and time

{{< table "table-sm" >}}

| #   | Invariant                                                                                          |
| --- | ---------------------------------------------------------------------------------------------------- |
| I13 | The commodity input→output graph is acyclic. A cycle makes zero an absorbing state                   |
| I21 | **Every buy-craft-sell loop is loss-making at the price-bound extremes** — output at 4×, inputs at 0.5×, divided by the recipe's success chance |
| I22 | Every trade in the catalogue is staffed or explicitly unstaffed with a reason                        |
| I14 | `step(step(x, a), b) == step(x, a + b)` — what makes lazy catch-up and the global tick the same thing |
| I15 | A single step is clamped to thirty game-days                                                         |

{{< /table >}}

**I21 is the one to write first.** It is the single check that stops the crafting tree being a gold
printer, and the game already ships a live example: an ingot recipe at a 40% success chance whose
inputs an NPC would sell and whose output an NPC would buy.

## Behaviour

{{< table "table-sm" >}}

| #   | Invariant                                                                                    |
| --- | ---------------------------------------------------------------------------------------------- |
| I16 | A thousand undisturbed game-days leave a settlement at its reference                           |
| I17 | **A settlement driven empty and then left alone returns to within 5% in sixty game-days**      |
| I18 | A player standing in a town, not trading, changes nothing                                      |
| I19 | Damage is monotone — more destruction never raises a capacity                                  |
| I20 | Per-channel loss ceilings: burnt ground may take at most 60% of capacity, destroyed workplaces 80% |

{{< /table >}}

I17 is the no-dead-world proof. I20 is better than a floor on overall health because it is
per-channel and explicable to a player: a perfect siege leaves a town wretched, not dead.

## Degradation, and why recovery is unconditional

**Runtime never edits population, the trade roster or the building count.** Those belong to the
generator, and the moment the runtime writes them there are two disagreeing world models. Instead,
in order: price rises to its ceiling; imports surge if the roads and the money exist; a hunger
factor throttles *non-food* capacity only, so workers are hungry and workshops idle while bread is
still baked; and a distress flag makes the state legible to GM tooling and future dialogue.

There is no absorbing state, because every damage channel recovers on something a player cannot
suppress:

- Scorched ground heals on **rain**, not on a timer.
- Props regrow on their own deadline.
- Buildings are rebuilt out of the treasury.

So health returns to full in bounded time from any state, and by I17 the ledger follows.

## What an adversary does

{{< table >}}

| Attack                          | What stops it                                                                                                  |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Buy out every shop              | I12 — only the surplus above the local reserve is on offer. This is also just what a caravan does                |
| Dump ten thousand apples        | I4 and I9, by **refusal** rather than a bad price. A bad price still transfers money                             |
| Camp a farm and burn it forever | It should work — a siege should work. Bounded by I20's ceiling, by the fire system's own limits, and by the camper having to physically spread out over a 7–20 km catchment |
| Arbitrage two towns             | Spread at both ends, plus **settling unit by unit against the live price function, never a snapshot**, so the marginal prices converge and the arbitrage extinguishes itself |
| Craft money out of NPC goods    | I21                                                                                                              |

{{< /table >}}

Arbitrage is intended gameplay, not an exploit: the player *is* the caravan, and closing a price gap
is what a merchant is for. Two supporting rules make it work rather than dominate. Carrying capacity
bounds the volume per trip. And **there is no global price oracle** — a client only ever learns the
prices of the settlement it is standing in, because a world where every price is visible at once
turns the merchant profession into a spreadsheet.

One hole worth stating rather than papering over: **the economy is only as bounded as the item
faucets feeding it**, and monster loot is currently unbounded. A per-commodity daily absorption
budget fixes it, but that is a separate decision.

# Consistency between the tiers

**The ledger is the only producer, always. The visible baker never produces anything** — a baking
animation renders production the ledger has already accounted for.

This is the only design that satisfies "a watched town produces the same as an unwatched one"
without heroics. The alternative requires a continuous model and a sequence of interruptible
animations to agree numerically, and they never will, because the animation gets cut off when the
player walks away mid-loaf.

**A shop is a transient projection, not a container.** It is derived on spawn as
`min(offerable, displayCap)` and nothing is written back — so there is no despawn path, no
reconciliation, and no "shop vanished holding items" bug.

**Purchases go through an intent component resolved by a system**, mirroring how prop collection
already resolves a race between two players reaching for the same herb. Two players buying the last
loaf are visited by a single pass; the first decrements the in-memory ledger synchronously and the
second is refused. Entity operations defer to the end of the tick and would grant twice.

**If the server dies mid-purchase, fail in the player's favour**, and write that down. The item is
granted through the durable path; the ledger side rides the periodic snapshot, so the worst case is
under a minute of one settlement's trades replayed as though they had not happened — invisible, and
self-correcting because prices reconverge. The *coin* side must not ride the snapshot: coin is the
scarce thing, and duplicating it is the one duplication that matters.

# The townsfolk AI domain

Townsfolk run on the same [GOAP planner and behaviour trees](/docs/server/ai) that drive creatures.
What they need is a second **domain** — a catalogue of state keys, goals and action templates — beside
the existing bestia one.

## Shared keys

Some keys are genuinely common: position, health, the perception keys, hunger, tiredness, home, and
the sleep and safety latches. They move into a shared object, with the bestia domain re-exporting
them so nothing downstream churns.

State-key equality is by name, so two domains declaring `"position"` already alias to the same slot —
interop does not need the shared object, but **safety does**. A world-state read is an unchecked
cast, so an `Int` key and a `Float` key with the same name compile, alias, and fail at whichever
reader is unluckiest. Worse, the *flags* can diverge silently: a townsfolk key declared without the
observed flag would let the planner persist a merely *planned* nightfall into live memory.

Two new shared keys: **hour of day** and **day index**, both observations, both free because
perception already reads the clock. Night alone is too coarse — full night runs 22:00 to 04:00, but a
baker's shift is 05:00 to 15:00.

## Drives on a day timescale

Creature drives are tuned in real seconds: peckish in about three real minutes. A villager's day is
eight real hours, so hunger needs to run roughly fifty times slower.

Rather than a second drive system, drives are authored **per in-game hour** and converted using the
world clock's speed factor. "Hungry in eight in-game hours" then survives a retune of the speed
factor; "0.0104 per real second" does not. Existing creature rates convert exactly, so nothing about
mob behaviour changes.

## The daily latch

The planner skips a goal whose desired state already holds, which is why the bestia domain carries a
`RESTED` belief rather than a bare tiredness ceiling. For *daily* activities there is a better latch:
**a day stamp**. `WORK_DONE_ON` compared against the day index needs no clearing writer at all —
midnight clears it — and an absent value reads correctly as "not done today".

Sleep keeps the old latch, because the resting phase straddles midnight: a day stamp would flip at
00:00 and send a townsfolk who had just got up straight back to bed.

## Goals

Calibrated against the existing creature goal scale, so the two domains could coexist in one head.

{{< table "table-sm" >}}

| Goal          | Base | Available when                                     |
| ------------- | ---- | ---------------------------------------------------- |
| Flee          | 200  | Enemy in sight, and not a combatant (or wounded)     |
| Sleep         | 90   | Tired, or it is the resting phase                    |
| Eat           | 85   | Hunger over threshold                                |
| Restock shop  | 82   | It is my shop, the shelves are thin, and I am on shift |
| Work shift    | 70   | On shift, not yet done today, workplace known        |
| Socialise     | 45   | Dusk, not yet done today, an inn is known            |
| Go home       | 40   | Off shift and away from home                         |
| Loiter        | 20   | Restless                                             |

{{< /table >}}

The crossovers are chosen against each other rather than for feel. At 23:00 sleep beats a starving
NPC's urge to shop, so nobody buys bread at eleven at night. At noon work beats moderate tiredness.
Eating becomes *eligible* well before it becomes *preferable*, which reads as getting peckish,
carrying on, and eventually giving up and going for lunch — emergent from two numbers rather than
authored as a lunch break.

Loiter is not decoration. Without a floor goal, an NPC between activities selects nothing, has its
plan cleared, and freezes.

## What is authored and what is not

The framing "the schedule emerges rather than being scripted" is only half true, and pretending
otherwise makes this harder to reason about later.

**Authored:** shift hours, per occupation. The assigned home, workplace and usual vendor. The inn's
opening hours. These *should* be authored — the value of "the baker opens at five" is precisely that
a player can learn it, and an NPC that re-picked its house nightly reads as broken rather than as
alive.

**Emergent:** whether it goes to work today at all. When it eats. Whether it goes to the inn. How it
copes with a blocked route. And what happens when the mill burns — the withdrawal returns less than
asked, production fails, the shift ends with nothing made, and nothing anywhere scripts that.

The eligibility windows are authored; the contest inside them is not. That is the difference from a
state machine, and it is worth being precise about rather than claiming emergence where there is
none.

## Three execution rules

1. **Production accumulates inside the behaviour leaf, not in the action's effect.** A higher-priority
   goal preempts a plan outright, so a baker who leaves for lunch must keep the loaves already baked.
   The effect is a *prediction*; the leaf is the mechanism.
2. **Shift leaves read the absolute clock.** Adopting a plan builds a fresh behaviour tree, so a
   re-adopted relative timer restarts and the baker works past midnight.
3. **Withdrawing from the ledger and writing to inventory is one leaf.** A failed plan step clears
   the whole plan, so splitting them across two actions leaks bread on every failure.

## Reading the ledger

Through a **sense** — the existing pluggable perception point, which costs no new scheduler wave.
Reading the ledger on one cadence also means the planner sees a consistent snapshot, rather than a
value that changed between grounding an action and executing it.

# Occupations, sites and residency

## Occupations as data

One `occupations.yml` binding a trade id to an AI profile, a building-function preference order,
shift hours, and what it produces and sells. Validated in two places, for a reason: a registry checks
what it can see at construction time, and a separate application-ready validator does the
cross-catalogue checks — those cannot run earlier, because the item, recipe and mob importers are
boot runners.

The cross-check runs **both directions**, and the reverse direction is the one that matters.

**Every settlement is inhabited, hamlets included**, and that costs nothing extra: population floors
gate most trades, so a hamlet of forty gets an inn and otherwise farmers and labourers — all of which
are in the first, economy-free set of occupations.

Ships first, needing no economy binding at all: **guard** (the only genuine night shift, and so the
best early test of the shift model), **priest**, **child**, **beggar**, **labourer**, **farmer** (the
single occupation that makes a village read as alive) and **innkeeper**. Adding **baker**,
**general store**, **blacksmith**, **weaver**, **carpenter** and **miller** fills a village of four
hundred completely — thirteen occupations for a whole village.

## Homes, workplaces and doors

**A building's door channel is a *bearing*, not a position**, and it never reaches the prop stream —
so doors come from the vector features, which conveniently means no pipeline version bump. The
derivation differs by building: a dwelling stands gable-to-street while a temple or market is
broad-front, so naively projecting the bearing along the long axis puts a priest inside the temple
wall. Use an orientation-free projection against both half-extents.

An NPC's durable identity is `(settlement, household, member)` packed into a long — the analogue of a
prop's identity, and for the same reason: a re-materialised entity gets a fresh entity id, so nothing
durable may be keyed on one. Occupation comes from the household expander; workplace and home are
assigned by stable index into the settlement's buildings in feature order.

One join failure must be handled rather than asserted away: business placement stops at a ceiling, so
a household can be assigned a trade with no building placed for it. That household's head becomes a
labourer. Left unhandled it is a crash on roughly one seed in ten, found by a player.

## Going inside

Buildings have doors and no interiors. A townsfolk that reaches a door **despawns**, and
re-materialises at the door when it is due out.

That is chosen over standing them asleep in the street — which reads as a plague rather than as
bedtime — and over faking an inside. It is the only option that becomes *correct* once interiors
exist, rather than being replaced: the despawn point becomes a zone transition. It is also one
mechanism for both "the baker is inside between customers" and "everyone is indoors at night", and it
makes the night nearly free, which is when a player is most likely to be standing in a city with
nothing else drawing.

## Level of detail

Residency follows the creature-den pattern — broad phase, narrow phase, diff, hysteresis on unload —
rather than the prop-residency pattern, which refcounts by terrain subscription and is wrong for
somebody whose home and workplace are in different columns.

Two constraints pull against each other. The activation ring must exceed the client's area of
interest, or people pop into view. But a commute can be the diameter of the town.

**Resolved by activating against the townsfolk's scheduled anchor rather than its home.** Where a
person would be right now is a pure function of occupation, shift and clock; activate against that,
and an NPC materialises at the right end of its commute and only ever walks a short way. When a
player is near the destination end at a shift change, materialise at the point along the route
matching the scheduled progress — the difference between a living town and a town of teleporters.

Budget, derived rather than asserted: Genesis, the 128 km default world, has about 28 standing
settlements. A city of
eight thousand is roughly 1700 households, of which an activation disc covers a few hundred. So: one
agent per household head, then a hard nearest-first cap per player and globally. Planning is already
staggered across ticks, and a townsfolk plan is one to four steps over a handful of grounded actions.
A third tier of positional-only walkers for the ring beyond the cap is **named and deferred**, gated
on measuring the real planning cost first.

The ledger itself is negligible at any world size — a few hundred deviation pairs, tens of thousands
of floating-point operations per world step, at a one-minute cadence.

## Persistence

**Townsfolk are re-derived, not persisted.** Millions of people world-wide would be a table the size
of the world, written for entities nobody will ever meet, and there is no mutable state worth
keeping: position follows the schedule, and hunger and tiredness follow the hour.

What *is* durable is **death** — the departure from what the generator implies — in a small table
shaped exactly like the prop-divergence table, with a **replacement clock** rather than permanence.
A killed baker's shop shuts, and an apprentice takes over in a few days, so one griefer cannot
permanently depopulate a city. A death event tells the ledger the bakery has stopped.

# Where it plugs into the engine

{{< table >}}

| System                     | Cadence          | Notes                                                                 |
| -------------------------- | ---------------- | ----------------------------------------------------------------------- |
| Shop trade intent          | Every tick       | Immediately before prop collection, which it mirrors                    |
| Settlement economy         | Every 60 s       | After the divergence writers, so damage from this tick is already visible |
| Townsfolk residency        | Every second     | Declares no AI-agent write; entity creation defers to end of tick       |

{{< /table >}}

The economy system declares **empty read and write sets**, and that has to be earned rather than
asserted: it touches only non-ECS services and must never mutate a component. The scorch regrowth
system carries the warning to repeat here — an earlier version declared a write it did not make,
purely to force an ordering, and "that worked and cost far too much: an always-present system
conflicting with a large part of the engine flattens the wave scheduling for everything".

Because the step takes elapsed *game days* rather than a frame delta, a global tick and lazy
catch-up on read are the same computation, guaranteed by I14. The global tick is still worth having:
it is what makes distant towns move, so a player arriving somewhere new finds a world that has been
living.

# Known blockers

Two of these are live bugs in shipped code and must be fixed before any of this works.

1. **A destroyed building never comes back — on any future boot.** No building kind has a regrowth
   time, so destruction writes a permanent divergence and the world quietly loses a mill for good. The
   fix is not a regrow timer: the economy step *pays* for a rebuild out of the treasury, so a rich
   city rebuilds in a day, a poor hamlet takes a season, and a hamlet whose treasury a player keeps
   draining stays a ruin. A building should come back because the town can afford it, not because a
   clock ran out.
2. **Every AI belief silently expires after ten real minutes** — thirty in-game minutes. The drive
   system dodges this by marking each write permanent by hand, but an action's *effect* has no such
   call site, so any day-scale belief evaporates and the NPC goes back to work. State keys need to
   carry their own retention.
3. **There is no humanoid NPC visual.** The wire's visual kinds are creature, item and effect, so a
   townsfolk is a creature-visual entry until there is a reason it cannot be.
4. **Building the townsfolk through the creature spawner would persist them.** It marks entities
   persistent unconditionally, and the mob persister matches anything with a creature visual and no
   account — so a city's worth of townsfolk would be written to the database and rehydrated at boot
   as ownerless mobs, growing every restart. A separate spawner, sharing the component set.
5. **Fifteen of the thirty-one trades cannot produce anything** until their output item exists.
6. **Ore deposits cannot be exhausted** — no prop, no identity, no persisted terrain-edit channel.
7. **Monster loot is an unbounded item faucet**, and the economy is only as bounded as its faucets.
