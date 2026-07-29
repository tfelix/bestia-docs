---
weight: 550
title: Economy Simulation
description: "Design document for an NPC-side economy — the World Treasury Director, the NPC gold pool, and the conservation invariant. Not yet implemented in zone-server."
---

{{< alert context="warning" text="This page is a design document, not a description of running code. There is no shop, trade, currency or 'World Treasury Director' implementation anywhere in zone-server today — search the codebase and the only 'market'/'gold' code you'll find is an unrelated GOAP-planner test scenario. It's kept because the design below is sound and should guide a future implementation." />}}

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

Concretely, the Director maintains a single **NPC gold pool** for the world (seeded at
[10% of the world's total wealth](/docs/mechanics/economy-trade/#currency)) and every NPC-side payment is an entry
against it:

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

Sinks sit outside the pool entirely: the [auction listing fees](/docs/mechanics/economy-trade/#how-auctions-work) and the
commission [posting tax](/docs/mechanics/questing/#funding-and-escrow) are **burned**, deleted from the world rather than
returned to anybody. They are the counterweight to minting.

# Treasuries

A "treasury" is a named sub-account of the NPC gold pool, not a separate pot of magic money:

- **Settlement treasuries** collect the NPC share of local trade and fund local work — defending the town, clearing the
  roads, the [Defend the City!](/docs/mechanics/questing/#world-events) type of event.
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
pool_ratio     = npc_gold_pool / total_world_wealth
payout_modifier = clamp(pool_ratio / 0.10, 0.25, 1.5)
```

`0.10` is the target share — the 10% the pool starts at. A pool that has drifted above target pays generously and drains
back toward it; a depleted pool tightens up until player trade refills it. The clamp keeps both ends survivable: NPC work
never dries up completely, and a flush treasury cannot triple wages.

Two further throttles apply on top:

- **Nightly redistribution.** NPC wealth is [levelled out among all NPCs every night](/docs/mechanics/economy-trade/#currency).
  This deliberately ignores real-world economics; it exists so coin keeps circulating into player hands instead of
  pooling wherever it happened to land.
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

{{< alert context="warning" text="The `0.10` target, the `[0.25, 1.5]` clamp and the shape of the price feedback are **initial values for balancing**. What is not negotiable is the invariant: NPC payouts must be backed by NPC earnings, and minting must remain the only faucet." />}}

# Observability

Because the whole economy hangs off one invariant, it has to be measurable at runtime. The Director exposes, per world:

- Total money supply, and the amount minted, burned and held by NPCs
- Pool ratio and the current `payout_modifier`
- Flow rates per category (NPC purchases, broker cuts, quest payouts, world events, burns)
- Per-region treasury balances and event-decay counters

A drift in the money supply that minting does not account for is a **bug**, and this is where it becomes visible.
