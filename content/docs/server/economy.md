---
weight: 550
title: Economy Simulation
description: "Design document for an NPC-side economy — the World Treasury Director, the NPC gold pool, and the conservation invariant. Not yet implemented in zone-server."
---

{{< alert context="warning" text="Partly implemented. The settlement side of this design runs today — settlement ledgers, treasuries, stock and price movement all exist, see [Townsfolk &amp; Settlement Simulation](/docs/server/townsfolk/). The world-level 'World Treasury Director' described below does not, and until it does there is one place in the running code where gold is created from nothing. Closing that is the work this page specifies." />}}

Bestia's economy is [entirely player-driven](/docs/mechanics/economy-trade/): players find the gold, mint the coins and
set the prices. That works right up to the point where **NPCs** start handing out money — quest rewards, purchases,
world-event payouts — because an NPC that pays out gold it never earned is an inflation faucet with no bottom.

The **World Treasury Director** is the server-side system that closes that hole. It is a single authority per world
incarnation that owns the NPC side of the money supply, and it exists to enforce one rule.

# The Conservation Invariant

> If an NPC pays out gold, some other NPC must have earned it first.

There is exactly **one** faucet in the world — a player turning raw gold into coins with the
[Minting](/docs/mechanics/master/#skill-minting) skill — and everything else is a transfer or a sink. NPCs are not a
faucet. They hold a share of the money supply, they move it around, and the Director makes sure the share only grows
because players sold them something, never because a payout was invented.

Concretely, the Director maintains a single **NPC gold pool** for the world — the _world reserve_ — and every NPC-side
payment is an entry against it. How large that pool is, and why, is derived from the world's own gold deposits on the
[Money Supply](/docs/server/money-supply/) page: **half the supply is minted into NPC hands when a world is created**,
and the rest is still in the ground waiting to be mined.

{{< table >}}

| Direction  | Flow                                                                                            |
| ---------- | ----------------------------------------------------------------------------------------------- |
| **Into**   | Players selling resources, items and services to NPCs                                           |
| **Into**   | Broker cuts on player [commissions](/docs/mechanics/questing/#funding-and-escrow)               |
| **Into**   | The NPC share of [auction owner fees](/docs/mechanics/economy-trade/#building-an-auction-house) |
| **Out of** | Rewards on NPC-issued commissions                                                               |
| **Out of** | World-event payouts from settlement, faction and world treasuries                               |
| **Out of** | NPCs paying players for goods and labour                                                        |

{{< /table >}}

Sinks return to the reserve rather than deleting money: the
[auction listing fees](/docs/mechanics/economy-trade/#how-auctions-work) and the commission
[posting tax](/docs/mechanics/questing/#funding-and-escrow) take coin **out of circulation** and put it back in the
world reserve, where it re-enters slowly through the settlements.

In the short run that is indistinguishable from burning — the coin is gone from player hands and stops pushing prices
up. Over a world's lifetime it is not. A burn makes the supply monotonically decreasing, and since minting is bounded by
the finite gold in the ground, a world that burns has an ending it was never designed to reach.

# Treasuries

A "treasury" is a named sub-account of the NPC gold pool, not a separate pot of magic money:

- **Settlement treasuries** collect the NPC share of local trade and fund local work — defending the town, clearing the
  roads, the [Defend the City!](/docs/mechanics/questing/#world-events) type of event. They are also what a settlement
  pays its imports and its rebuilding with; see
  [Townsfolk & Settlement Simulation](/docs/server/townsfolk/#the-settlement-ledger).
- **Faction treasuries** collect sacrifices and temple income and fund faction-aligned work.
- The **world treasury** is the remainder, and it is what backs rare large-scale events when no single settlement could
  pay for them.

A treasury can run **low**, and when it does the world reacts honestly: a poor village genuinely cannot afford a big
bounty. This is a feature. It gives regional wealth a visible consequence and it means players who have been trading
with a settlement have made that settlement better able to pay them later.

# Budgeting Payouts

The Director does not simply pay whatever a quest generator asks for. Each payout is checked against a budget derived
from the pool's health:

```text
pool_ratio      = npc_held_gold / configured_supply
payout_modifier = clamp(pool_ratio / 0.50, 0.25, 1.5)
```

`0.50` is the target share — the half the pool is seeded with. A pool that has drifted above target pays generously and
drains back toward it; a depleted pool tightens up until player trade refills it. The clamp keeps both ends survivable:
NPC work never dries up completely, and a flush treasury cannot triple wages.

**The modifier is a preference; the reserve is a constraint.** `payout_modifier` shades what NPCs are _willing_ to pay,
but nothing may pay out coin the reserve does not hold, whatever the modifier says. An empty reserve means settlements
stop being topped up and shops start refusing to buy — which is not a failure state, it is the pressure that makes
mining worth doing.

Two further throttles apply on top:

- **Daily redistribution.** The reserve pays out to settlement treasuries once a game-day, weighted by population, so a
  city receives more than a hamlet. This deliberately ignores real-world economics; it exists so coin keeps circulating
  into player hands instead of pooling wherever it happened to land. Weighting by population rather than splitting
  evenly is the one concession to realism: a city of twenty thousand does more trade in a day than a hamlet does in a
  season.
- **Regional repeat decay.** Repeated world events in the same region pay a
  [diminishing share](/docs/mechanics/questing/#funding-and-repeat-events), so a treasury cannot be farmed by players who
  manufacture the emergency they then get paid to resolve.

# Price and Wage Feedback

The same pool ratio feeds what NPCs are willing to pay and charge, which is the mechanism that keeps inflation in check
without an invisible hand:

- **What NPCs pay** for resources and items scales with `payout_modifier`. When money is abundant on the NPC side,
  selling to NPCs is attractive and gold flows back out of the pool.
- **What NPCs charge** scales inversely. When the pool is thin, NPC goods get expensive, players buy from each other
  instead, and NPC coin is conserved.
- Per-NPC [honor](/docs/mechanics/pvp/#negative-honor) modifiers are applied afterwards, so a player's reputation still
  moves their personal prices on top of the world-wide baseline.

The result is a soft, self-correcting band rather than fixed price tables — and, importantly, no scripted "gold sink
event" is ever needed to rescue the currency.

{{< alert context="warning" text="The `0.50` target, the `[0.25, 1.5]` clamp and the shape of the price feedback are **initial values for balancing**. What is not negotiable is the invariant: NPC payouts must be backed by NPC earnings, and minting must remain the only faucet." />}}

# Prior art

Almost every decision on this page has been tried by somebody, and two of them have been tried and failed. This section
records which games we borrowed from, and — more usefully — which failure we are deliberately walking back toward.

{{< table "table-sm" >}}

| Game                   | Currency model                   | What the NPC is for                                   | Item sink            | What Bestia takes, or rejects                                   |
| ---------------------- | -------------------------------- | ----------------------------------------------------- | -------------------- | --------------------------------------------------------------- |
| **Ultima Online**      | Closed loop, fixed supply        | Buys and sells speculatively, prices from local data  | Weak at launch       | Takes the closed loop. Rejects unbounded resale of player goods |
| **Wurm Online**        | Closed loop, kingdom coffers     | Finite purse, refilled from the coffers, earning cap  | Decay                | Takes the whole architecture — this is our model                |
| **RuneScape / OSRS**   | Open, faucet and sink            | Fixed base stock, price moves with it, slow restock   | Alchemy, consumables | Takes base-stock pricing; keeps per-player stock in reserve     |
| **EVE Online**         | Open, heavy sinks                | Seeds goods players cannot supply yet, then withdraws | Ship loss            | Takes seeding as a retractable bootstrap and a price floor      |
| **Albion Online**      | Open                             | Posts buy orders that rise until filled               | Full loot            | Takes the rising buy order as a safer posture than sell stock   |
| **Star Wars Galaxies** | Open                             | Almost nothing; players make everything               | Irreversible decay   | Takes decay as the reason player crafting stays alive           |
| **Path of Exile**      | No currency; consumable reagents | None                                                  | Currency is the sink | Rejected — elegant, but it rules out shopkeeping entirely       |
| **New World**          | Open, aggressive sinks           | Ordinary vendors                                      | Repairs              | Cautionary only — its sinks outscaled its faucets               |

{{< /table >}}

## The design we are repeating, and why it failed

Ultima Online's first economy was, almost line for line, the one described on this page: NPC shops that adjusted price
and stock from local market data, bought speculatively from players, and differed between towns so that hauling paid.
[Raph Koster's retrospective](https://www.raphkoster.com/games/snippets/the-evolution-of-uos-economy/) records what
happened to it. Skills advanced by repetition, so crafters mass-produced goods they did not want in order to level,
dumped them on shops, and shop buy prices collapsed to nothing. The fix was to periodically wipe the shops' market data
— which is to say, to give up on the simulation.

**The lesson is not that the price model was wrong.** It was that a progression system elsewhere in the game fed the
economy an input it was never designed to absorb. Our defence is in three parts, and all three are already built:
prices move per unit rather than per transaction, so a large dump moves the price against itself; a warehouse ceiling
caps what a town can physically hold; and a town refuses rather than paying with coin it does not have. What is still
missing is Wurm's per-player payout cap, and it should land with the first NPC that buys anything.

The same retrospective records the other failure mode, and it is the one that actually threatens a closed supply. UO's
currency _was_ closed and held its value for three years. What eventually broke it was not inflation but **hoarding** —
gold flowed to a small number of players and stopped moving, and the game needed an in-fiction campaign to shake it
loose. A fixed supply does not fail because there is too much money. It fails because the money stops circulating.

## What we took from Wurm Online

[Wurm Online](https://www.wurmonline.com/2013/09/20/money-distribution/) is the only MMO to have shipped a genuinely
closed currency at scale, and the three-tier purse on the [Money Supply](/docs/server/money-supply/) page is its design.
Two details are what make it survivable rather than merely closed: an NPC trader holds a **finite purse that refills
over time**, and a player can only earn so much from one **per hour**. The first makes "the shop is out of coin" an
ordinary event instead of a crisis; the second is what stops the whole reserve draining into whoever grinds hardest.

## The smaller borrowings

- **RuneScape** prices from a base stock: each item has a quantity the shop wants to hold, the price moves with the
  distance from it, and stock drifts back one unit at a time. Worth knowing that OSRS eventually made shop stock
  **per player** to kill queue contention and bot camping. We do not need that, but it is the escape hatch if
  [D6](#dangers-to-watch) ever fires.
- **EVE Online** seeds market orders for goods no player can supply yet, then stops refreshing them and lets them
  expire. Seeding is a _bootstrap with an exit_, not a permanent fixture, and a seeded price is deliberately a floor.
  That is exactly the posture our starter consumables should take.
- **Albion Online**'s Black Market posts buy orders that climb until somebody fills them. An NPC expressing _demand_ is
  much safer than one holding stock: it cannot be flooded, and it cannot be bought out.
- **Star Wars Galaxies** made gear decay irreversibly, so crafters had permanent demand. No other game copied it, and
  no other game's crafting economy lasted as long. A player-driven economy needs an item sink at least as strong as its
  gold sink, or every crafted good is made exactly once.

## What we turned down

**Path of Exile** deleted currency altogether: its money is a consumable crafting reagent, so the sink and the use are
the same act and inflation cannot happen. It is the most elegant solution to the problem this page exists to solve, and
we are not taking it, because a world without coin has no shopkeepers, no treasuries and no reason for a town to be
rich. The whole texture we want — a merchant who runs out of money, a wealthy city that pays better — depends on money
being a thing you can run out of rather than a thing you spend on crafting.

Further resources to read:

- [Gold sink](https://en.wikipedia.org/wiki/Gold_sink) — the vocabulary, and a survey of what other games drain with
- [AGC: MMO economies](https://www.raphkoster.com/2006/09/07/agc-mmo-economies/) — why faucets outrun fixed drains
- [Market Interventions in a Large-Scale Virtual Economy](https://arxiv.org/abs/2210.07970) — measured effects of a
  transaction tax and an item sink in Old School RuneScape

# Dangers to watch

Every entry below is a way this design is known to fail, taken from a game it actually failed in. Each names the
symptom, the number that would show it, and the lever we would pull.

**The measurement is the deliverable, not the lever.** The Old School RuneScape study cited above found that a
transaction tax barely moved trade volume, an item sink inflated luxury prices without reducing volume, and the illicit
gold market shrugged off both. Interventions in virtual economies do not behave the way the design intuition says they
will. So every row here is instrumented before anything is tuned.

{{< table "table-sm" >}}

| #       | Danger                 | Symptom                                                            | What we measure                                       | Lever if it fires                                                               |
| ------- | ---------------------- | ------------------------------------------------------------------ | ----------------------------------------------------- | ------------------------------------------------------------------------------- |
| **D1**  | NPC resale collapse    | Shops fill with player junk; buy prices pinned at the floor        | NPC stock by source; share of stock at the floor      | Per-player payout cap; per-source stock ceilings                                |
| **D2**  | Reserve exhaustion     | Every shop permanently out of coin; nothing can be sold            | Reserve balance; days of cover at current payout      | Raise supply; boost the mining faucet; lower treasury size                      |
| **D3**  | Hoarding               | Trade volume falls while the supply is unchanged                   | Gini of player-held gold; coin velocity               | Upkeep, fees, anything that forces circulation                                  |
| **D4**  | Deflation              | Prices fall, players stop spending, newcomers cannot afford basics | Price level against supply; time to first purchase    | Supply scales with world size — an explicit dial                                |
| **D5**  | Arbitrage printer      | A route or recipe returns more than it costs at the price bounds   | The boot check on crafting loops, extended to minting | Widen the spread; re-price; refuse the recipe at boot                           |
| **D6**  | Bot farming            | Minting concentrated in few accounts; bots parked at deposits      | Coins minted per account; mining concentration        | Per-player mint cap; per-player shop stock as OSRS did                          |
| **D7**  | Item saturation        | Crafted gear accumulates; player crafting stops paying             | Items per capita; decay rate against production       | Tune decay; weaken repair; loss on death                                        |
| **D8**  | Elder monopoly         | A few veterans corner a good and set its price                     | Concentration of listings per item                    | Quality caps; push veterans toward differentiated goods                         |
| **D9**  | Intervention backfires | A tax or sink produces the opposite of its intent                  | Everything above, recorded _before_ the change        | None — this is why the rest of the table exists                                 |
| **D10** | Terminal exhaustion    | The world is mined out; no new coin can ever enter                 | Unmined gold as a share of supply                     | Unresolved — see [Money Supply](/docs/server/money-supply/#the-end-of-the-gold) |

{{< /table >}}

Three of these deserve more weight than the others. **D1** is the failure that actually killed a shipped game. **D2** is
new — it is created by closing the loop, and no game we borrowed from has it in this form, because none of them ration
NPC income against a world-level pool. **D10** is not a bug at all but an unmade decision, and it has to be made before
mining ships.

# Observability

Because the whole economy hangs off one invariant, it has to be measurable at runtime. The Director exposes, per world:

- Total money supply, and the amount minted, still unmined, and held by NPCs
- Pool ratio and the current `payout_modifier`
- World reserve balance, and its days of cover at the current payout rate
- Flow rates per category (NPC purchases, broker cuts, quest payouts, world events, fees recovered)
- Per-region treasury balances and event-decay counters
- The metric named against each entry in [Dangers to watch](#dangers-to-watch)

A drift in the money supply that minting does not account for is a **bug**, and this is where it becomes visible.
