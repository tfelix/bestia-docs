---
weight: 1400
title: Questing
description: "Bestia's player-driven questing: commissions posted at the city blackboards, the fee schedule, signing and hand-in, and rare faction-contested world events like mana rifts."
---

Questing in **Bestia** is primarily **player-driven**. Players post rewards for tasks they need done — gathering
resources, transporting goods from A to B, hunting a troublesome Bestia — and other players pick those tasks up.
Alongside those, NPCs hand out work of their own, and very rarely the world itself intervenes when the simulation
produces a genuine emergency such as a [mana rift](/docs/mechanics/world/environment/#mana-concentration) tearing open next to
a settlement.

Whether a quest is written by a player, offered by an NPC or born from the world, it is always the same underlying
thing: a **contract**. Nothing marks your objective on the map and nothing teleports you to it. A quest is an agreement
in the world, and you complete it by acting in the world. Your [quest log](/docs/mechanics/towns-trade/blackboard/#the-quest-log)
only remembers what you agreed to. This keeps questing aligned with the
[consistent fantasy simulation](/docs/mechanics/overview/#consistent-fantasy-simulation) principle.

{{< alert context="info" text="**Partly built.** Gather commissions at the [city blackboard](/docs/mechanics/towns-trade/blackboard/), the quest log and the tracker are being built on the bestia-behemoth branches `quest/01..07`. Not built yet: Transport, Bounty and Escort commissions, collateral, experience from commissions, NPC commissions and world events. Each section below says what is built. The server side is on the [Questing](/docs/server/quests/) server page." />}}

# Player Commissions

The vast majority of quests are **commissions** written by players. A player posts one at a
[city blackboard](/docs/mechanics/towns-trade/blackboard/), and other players sign it and do the work. Its life looks
like this:

```mermaid
graph LR
    A[Open] -->|"all N units handed in"| B[Completed]
    A -->|"deadline passes"| C[Expired]
    A -->|"issuer withdraws"| D[Closing]
    D -->|"all N units handed in"| B
    D -->|"1 h notice is over"| E[Withdrawn]
```

## Funding and Escrow

The issuer pays **everything up front**, at the moment of posting:

- the **pot**: the amount times the coins offered per unit, and
- the **posting fee**: a share of the pot that depends on how long the commission runs.

The board holds the pot until it is paid out for hand-ins or sent back. This single rule is the backbone of trust in
the system: **every commission a player sees on a board is already paid for.**

| Duration | Posting fee   |
| -------- | ------------- |
| 1 day    | `3%` of the pot |
| 3 days   | `5%` of the pot |
| 7 days   | `8%` of the pot |

The fee is paid in gold and rounded up to the next whole gold, like every fee on the
[economy page](/docs/mechanics/towns-trade/economy-trade/). It goes to the
[world reserve](/docs/server/money-supply/#nothing-is-burned), the same as
[auction listing fees](/docs/mechanics/towns-trade/economy-trade/#how-auctions-work). **The fee is never refunded**: not
when the issuer withdraws, not when the commission expires, and not when nobody delivers. The board did its work by
showing the commission.

A longer commission pays a higher fee because it holds its place on every board for longer. The fee is small for a
serious order, but papering the boards with dozens of trivial ones has a running cost.

{{< alert context="warning" text="The three durations and their fees are **server settings and first drafts for balancing**." />}}

The issuer chooses the coins per unit freely. The reward is **gold only**; items as a reward are not built. A
server-wide bound on rewards, watched by the [World Treasury Director](/docs/server/economy/), is not built either.

## Objective Types

Every objective is verifiable from **physical world state** — never from self-reporting. Gather commissions ask for
[natural resources](/docs/mechanics/items-crafting/natural-resources/) or crafted
[items](/docs/mechanics/items-crafting/items/).

| Type          | Description                                                                                         | Status    |
| ------------- | --------------------------------------------------------------------------------------------------- | --------- |
| **Gather**    | Hand in _N_ units of one item at any blackboard. Any copy of the item counts.                       | Built     |
| **Transport** | Move a sealed cargo item from A to B. Weight and the deadline make this a genuine logistics puzzle. | Not built |
| **Bounty**    | Deactivate a specific Bestia guardian or clear a named threat.                                      | Not built |
| **Escort**    | Accompany an NPC or player-Bestia safely to a destination.                                          | Not built |

For a Gather commission, **any copy of the item** counts. Its stats, its sockets and its
[level](/docs/mechanics/items-crafting/items/#item-level) are ignored. An issuer who wants a better copy buys it at the
[auction house](/docs/mechanics/towns-trade/economy-trade/#how-auctions-work) instead.

Transport commissions will be bounded by the carrier's
[weight limit](/docs/mechanics/items-crafting/items/#weight-limit).

## Difficulty and Level Range

Every commission shows a **suggested level**. The server works it out; the issuer cannot set it. It is **only a
suggestion**: a master of any level may sign any commission. A Gather commission asks for an item, not for a fight,
and buying the item at an auction house is fair play.

For a Gather commission the suggested level is:

1. the lowest **minimum level** of all Bestia species whose loot holds the item, or
2. the item's [base level](/docs/mechanics/items-crafting/items/#item-level), when no species drops it (ores, herbs).

The level is fixed when the commission is posted. The board and the quest log colour it against the reader's own level,
from grey (far below you) to red (far above you), as in other MMOs. The board shows a
["!" marker](/docs/mechanics/towns-trade/blackboard/#the-board-marker) when at least one open commission fits your level.

### Danger and effort for later types

{{< alert context="warning" text="**Not built.** This is the design for Transport, Bounty and Escort commissions." />}}

The later types derive their level from the world, along two separate axes:

- **Danger** is expressed as a **Contract Danger Level (CDL)**, on the same scale as player levels. It is the suggested
  level of the commission.
- **Effort** measures how much work the task is. It decides how large the experience may be.

Every region carries a **threat level** — the average level of the hostile Bestia the simulation currently sustains
there, which rises with the region's [mana concentration](/docs/mechanics/world/environment/#mana-concentration) because
that is what [Bestia spawn from](/docs/mechanics/bestias/bestia/):

```text
CDL(bounty)    = target_level + 5 (if boss) + 2 per elemental level of the target
CDL(gather)    = threat_level of the region holding the nearest viable deposit
CDL(transport) = highest threat_level along the shortest viable route
CDL(escort)    = highest threat_level along the route, +5 if the escortee is more
                 than 10 levels below that threat level
```

The `+5 / +2` terms on a bounty mirror the boss and elemental modifiers used in the
[experience calculation](/docs/mechanics/bestias/bestia/#killing-enemies), so a contract's danger and the experience the fight
actually yields cannot drift apart.

```text
effort(gather)    = N * resource_level
effort(transport) = distance_km * weight_kg   (the same term as the postal freight fee)
effort(escort)    = distance_km
effort(bounty)    = 4 * target_level + 5      (the base experience of the kill)
```

A commission never stops a master from signing. The post's
[route boards](/docs/mechanics/towns-trade/postal/#taking-a-sack) reuse the same danger level, and they do keep masters
below `CDL - 5` off a route.

## Open vs. Assigned

You **sign** a commission at a board before your work counts. A Gather commission is **open**:

- **Many players may sign it.** Each signer hands in units at any board and is **paid per unit at once**, from the pot,
  at the price the issuer set.
- You hand in what you carry, up to what is still missing. Five players who each haul a fifth of the order each earn a
  fifth of the pot. Nobody who did real work goes home with nothing because somebody else arrived first.
- When _N_ units are in, the commission is **completed for everybody** and leaves every board.
- A signer may **abandon** it at any time, from the quest log. Nothing is at stake, and what was already paid stays paid.

{{< alert context="warning" text="**Not built.** Assigned commissions and open bounties below are design." />}}

**Assigned commissions** (used for **Transport** and **Escort**) **lock to a single accepter** on signing, with a
deadline, and the accepter posts [collateral](#collateral). Sealed cargo and a named escortee cannot be split across
several couriers, and time-critical deliveries must not be blocked by someone who signs and then stalls.

**Bounty** commissions may be posted either way. An assigned bounty pays its single accepter. An **open bounty splits the
pot in proportion to damage dealt** to the target, exactly as [kill experience](/docs/mechanics/bestias/bestia/#killing-enemies)
is already distributed among damage dealers, and the kill itself is credited to whoever dealt the most damage. Because
both the experience and the gold follow the same proportional rule, there is nothing for a last-hit thief to steal.

## Collateral

{{< alert context="warning" text="**Not built.** Collateral belongs to assigned commissions, which do not exist yet. An open Gather commission needs none." />}}

An assigned contract is a promise to be somewhere with something. To make that promise cost something, the accepter
posts **collateral** in gold when they sign:

```text
collateral = max(20 * subject_level, 25% of the reward's value)
```

where `subject_level` is the [item level](/docs/mechanics/items-crafting/items/#item-level) of the cargo for a **Transport**, the level
of the escortee for an **Escort**, and the resource level for an assigned **Gather**. Hauling a Legendary crate is
therefore a serious financial commitment, and the stake is meant to be felt: walking away from the job must be the
expensive option, not the convenient one.

This does mean a fresh player cannot immediately take the high-value hauls, and that is intended. Those contracts are
trusted work, and the trust is bought with gold you already have.

On settlement:

- **Completed on time** — collateral is returned in full, on top of the reward.
- **Failed after a genuine attempt** (the courier was killed en route, the escortee died to something that outmatched
  the team) — **half** the collateral goes to the issuer as compensation, half returns to the accepter. This mirrors the
  [post's couriers](/docs/mechanics/towns-trade/postal/#the-deadline), where being killed on the road is a real outcome of the world
  rather than cheating.
- **Abandoned** — the accepter drops the contract, lets it expire without a serious attempt, or dumps the cargo — the
  **full** collateral goes to the issuer, **and the accepter loses honor**. Brokers keep a ledger and they talk: an
  abandoned contract costs `-5` global honor and `-20` local honor with the broker who held it, on the same scale as the
  other breaches of trust in the [honor system](/docs/mechanics/society/pvp/#negative-honor). Repeat offenders find the boards
  of a whole town closed to them long before their gold runs out.

## Withdrawing a Commission

The issuer withdraws a commission **at a board**, in the *My postings* tab. Escrow-as-trust would be worthless if the
issuer could pull a commission out from under people mid-haul, so a withdrawal gives notice:

- The commission is flagged as **closing** on every board for **1 real hour**.
- During that hour **hand-ins are still paid** from the pot. Work already in flight is always paid for.
- When the hour is over, the commission is **withdrawn**. The unspent pot is in the issuer's mailbox at once, like
  [auction mail](/docs/mechanics/towns-trade/postal/#auction-mail).
- The posting fee is **not** refunded.

A commission whose deadline passes **expires** the same way, without the notice hour: it leaves the boards, and the
unspent pot goes back to the issuer's mailbox the same way.

{{< alert context="warning" text="**Not built.** An **assigned** contract will only be cancelled with the accepter's agreement, or by paying out the reward in full. Somebody is already on the road." />}}

## Rewards, Experience and Settlement

You hand in a Gather commission at **any blackboard**. You do not report back to a magical quest-giver, and you do not
travel back to the board where it was posted.

- The **coins** for the units you hand in go straight into your bag.
- The **goods** are in the issuer's mailbox **at once**, like
  [auction mail](/docs/mechanics/towns-trade/postal/#auction-mail). They need no coach and no freight, the issuer
  collects them at any post office, and the issuer does not need to be online.

{{< alert context="warning" text="**Not built.** Commissions pay no experience yet. The rules below are the design for when they do." />}}

Experience deserves special care. Player commissions **do not let issuers mint experience**. The server decides the
whole experience reward from the derived difficulty of the task, and it is drawn from a **capped NPC/world pool**:

- The **accepter** earns experience scaled to the contract's CDL and effort, in the same order of magnitude as doing the
  equivalent work uncommissioned — a haul is worth roughly what
  [gathering that resource](/docs/mechanics/bestias/bestia/#environment-interaction) is worth, a bounty roughly what
  [the kill](/docs/mechanics/bestias/bestia/#killing-enemies) is worth.
- The **issuer** earns a flat `5` experience for posting a funded commission, plus `10%` of the experience paid to the
  accepter once the contract settles successfully. Writing good work into the world is worth rewarding — but a flat
  posting bonus is insignificant to anyone past the first few levels, and the completion share only ever arrives if a
  real player really did the job.

{{< alert context="info" text="Player commissions move gold and items between players and pay a bounded, system-granted XP reward — they can never manufacture experience on demand, which closes the door on funnelling XP from throwaway alt characters into a main." />}}

### Why Big Contracts Beat Many Small Ones

Gold and items only ever move between players, so trading favours back and forth costs both sides the posting fee and
gains nobody anything. Experience is the part worth protecting, because it comes from the world pool rather than from a
player's pocket. Three rules make a wall of tiny contracts strictly worse than one real one:

1. **Experience follows the objective, not the paperwork.** Splitting a 500-unit order into ten 50-unit orders yields
   the same total effort and therefore the same total experience, minus ten posting fees instead of one.
2. **Diminishing returns per role, per day.** For the `n`-th contract a player settles within a
   [Bestia day](/docs/mechanics/world/environment/#in-game-time), counted separately as issuer and as accepter, the world-pool
   experience is multiplied by `1 / (1 + 0.5 * n)`. The first contract of the day pays full, the third about half, the
   tenth barely registers. Gold and items are untouched — a dedicated hauler can run all day for pay, they simply cannot
   grind levels off the contract board.
3. **The same two names, again and again, stop paying.** Contracts between the same issuer–accepter pair decay much
   harder: `1 / (1 + n_pair)` over a rolling 7 Bestia days. A guild's regular courier is mildly affected. Two accounts
   cycling ten-metre escort contracts at each other are earning nothing within minutes.

On top of that, a contract whose CDL and effort both fall below the trivial floor pays **no** world experience at all —
only the gold its issuer chose to attach. Work has to be work.

{{< alert context="warning" text="The `1 / (1 + 0.5n)` and `1 / (1 + n_pair)` curves, and the trivial floor, are **first drafts for balancing**. The design goal they encode is fixed: one substantial contract must always be worth more experience than the same work chopped into pieces, and a closed loop of two players must trend to zero." />}}

## The Text of a Commission

The issuer writes **no text of their own**. The board builds the text from a template and the commission's data: the
item, the amount, the coins per unit and the deadline. So every commission reads the same way, in every language the
game is played in, and the boards carry no spam and no insults.

## Limits

| Limit                                  | Value |
| -------------------------------------- | ----- |
| Open commissions one master has posted | `10`  |
| Quests in one master's quest log       | `25`  |

An ended quest stays in the log, and counts, until the player clears it or 3 days pass. Both limits are server settings.

## Discovery

Commissions are found at the **[city blackboards](/docs/mechanics/towns-trade/blackboard/)**. All boards form **one
network**: every board shows every open commission in the world, and every board takes signatures and hand-ins for any
of them. A board in a small player town is as useful as the one in a start town.

Finding work still means going somewhere. You read the list only while you stand at a board; there is no
world-spanning quest finder in a menu. A ["!" marker](/docs/mechanics/towns-trade/blackboard/#the-board-marker) above a board
tells you from a distance that it holds work for your level.

{{< alert context="warning" text="**Not built.** Town-crier NPCs, tavern chatter and classic NPC conversations will announce local needs as well." />}}

# NPC Commissions

NPCs also generate work of their own: a farmer who cannot bring in a harvest before it spoils, a merchant who needs an
escort, a village that wants a guardian Bestia dealt with. These will be quest records like player commissions,
funded from the NPC side rather than from a player's purse, and they are the reason a quiet corner of the world still has
something to do in it.

{{< alert context="warning" text="**Concept pending.** How far NPC-generated quests go — how many there are, whether they chain into longer stories, how much of the [automatic generation](/docs/server/quests/#automatic-quest-generation) the world leans on — is deliberately still open. What is settled: they are contracts like any other, their difficulty is derived the same way, and their rewards are paid from the NPC gold pool under the [World Treasury Director](/docs/server/economy/) rather than minted." />}}

The world's history is meant to be one source of these quests: heirlooms that descendants want back, offerings and
deeds for the gods, and once-per-world quests such as returning a unique artifact to its temple. See
[Quests from History](/docs/mechanics/world/world-history/#quests-from-history) and
[Quests for the Gods](/docs/mechanics/world/pantheon/#quests-for-the-gods).

# World Events

Occasionally the world itself generates a quest. These are **rare and emergent** — never on a fixed timer. A lightweight
regional **Director** watches aggregate simulation state ([mana density](/docs/mechanics/world/environment/#mana-concentration),
threat level, unattended rift activity), and when a threshold is crossed it instantiates a **public contract** open to
everyone and scored by contribution.

{{< tabs tabTotal="2" >}}
{{< tab tabName="Close the Rift!" >}}
Mana in a region has built up past a safe limit and a rift tears open, pouring hostile Bestias toward a nearby
settlement. The whole area is called to close the rift — players are rewarded by their contribution (damage dealt,
seals placed, time held), paid from a settlement, faction or world treasury rather than any single issuer.
{{< /tab >}}
{{< tab tabName="Defend the City!" >}}
Sustained rift activity leaves the surroundings of a large city crawling with high-level Bestias. Players who help thin
them out rise in the city's favor and gain access to better trade, experience and gold.
{{< /tab >}}
{{< /tabs >}}

## Contribution Scoring

A world event is scored along **several independent axes**, not one summed number, and each axis pays from its own share
of the pot:

- **Damage dealt** to the event's Bestia and bosses
- **Objective work** — seals placed, wards raised, rituals performed, cargo brought to the front
- **Time held** — presence and survival inside the contested area while it mattered

Scoring each axis separately is what keeps a world event from being a high-level damage party. A Scholar who located
the rift with [Observation](/docs/mechanics/master/scholar-tree/#skill-observation), an Eternity player placing seals and a fighter
tanking the wave bosses all earn from the axis they actually contributed to, and none of them has to out-damage anyone
to be paid.

## Funding and Repeat Events

World-event rewards come from a **treasury pool** — a settlement's, a faction's or the world's — never from a single
issuer. That pool is real gold that NPCs earned, tracked by the [World Treasury Director](/docs/server/economy/), so a
world event **recirculates** money rather than minting it.

Which also means a treasury can be farmed, if opening rifts and then being paid to close them is profitable enough to
industrialise. So payouts in a region **decay with repetition**:

```text
payout_share = 1 / (1 + events_in_region_within_last_7_bestia_days)
```

A first rift in a quiet region pays in full. The fourth rift in the same valley inside a week pays a quarter. The
intended rhythm — mana builds slowly, the response is a genuine event — survives contact with organised players, and a
region that has just been through a crisis needs time before another one is worth the same effort.

## Faction-Contested by Design

World events are **not purely cooperative** — they hook directly into the [factions](/docs/mechanics/society/factions/) and their
[spheres of influence](/docs/mechanics/society/factions/#sphere-of-influence):

- **The Order of Chaos** _wants_ rifts open and may have caused the mana build-up in the first place; they can defend or
  even widen a rift.
- **The Order of Eternity** profits from sealing it.
- **The Order of the Circle** seeks to stabilize the region without suppressing the mana flow entirely, holding the rift
  in a controlled stasis instead of closing or feeding it.

So the same rift is a defend-quest for one Order and a sabotage opportunity for another, and how it ends shifts the
region's influence scores. This turns world events into emergent PvPvE flashpoints instead of scripted set-pieces.

Crucially, the **frequency of these events is itself player-driven**: because Chaos players opening rifts is what raises
the regional mana that trips the Director's threshold, world events stay rare _by design_ — gated behind accumulated
player behaviour rather than a hardcoded cooldown.

# How Completion Is Verified

Player commissions, NPC commissions and world events all run on the same machinery, which fits the event-based
[server architecture](/docs/server/architecture/):

1. A quest is a small **state machine**: `Open → Closing → Completed | Expired | Withdrawn`.
2. Its objectives come from a small set of kinds with parameters — "hand in _N_ of an item", "kill _N_ of a species in
   an area" — and each kind is checked against facts the world already reports: a hand-in at a board, a kill that pays
   experience. A player never reports their own progress.
3. A **shared** objective, such as an open Gather, keeps one counter on the quest, and the log of each signer shows what
   they delivered themselves. A **personal** objective keeps a counter per master. Pro-rata pay is bookkeeping over
   those counters, not a separate system.
4. World events will reuse the same records; only the **funding source** (a treasury pool) and the **many-contributor
   scoring** differ from a commission.

How the server stores and tracks quests, and how it tells the clients, is on the [Questing](/docs/server/quests/)
server page.
