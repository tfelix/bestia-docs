---
weight: 700
title: Economy & Trade
description: "Overview of Bestia's player-driven economy, covering gold and minting, the postal system for sending goods and coin, and the auction houses where trading happens."
---

Every coin in **Bestia** was dug out of the ground by somebody. The economy is entirely player-driven: players find the
gold, mint the money, haul the freight and run the marketplaces, and the world's prices are whatever they collectively
decide those things are worth. This page covers the three systems that carry all of it — the **currency**, the **postal
system** that moves goods and coin across the map, and the **auction houses** where most trading actually happens.

{{< alert context="info" text="**Conventions used on this page.** Unless stated otherwise, every amount and fee is expressed in **gold**, and every duration in hours or days refers to **real time**, not in-game [Bestia time](/docs/mechanics/environment/#in-game-time)." />}}

# Currency

All currency in the world originates from gold deposits that players discover and mine themselves. Raw gold becomes
money only once a master turns it into **gold coins** with the [Minting](/docs/mechanics/master/#skill-minting) skill —
there is no other tap. Gold coins are the single currency for every trade and transaction, and there are no smaller
denominations: everything in the game is priced in whole **gold**.

Because coins cannot be split, every calculated fee on this page is **rounded up to the next whole gold**, and a fee
that works out below `1` still costs `1`.

To give a fresh world something to trade with, **NPCs start out holding 10% of the world's total wealth in gold**. Every
night this NPC wealth is **redistributed equally** among all of them. This one mechanic deliberately ignores real-world
economic logic; it exists so that coin keeps circulating into player hands through NPC purchases and quest brokers
instead of pooling wherever it happened to land.

That NPC gold is a **closed pool**, not a second faucet: whenever an NPC pays a player — a quest reward, a purchase, a
world-event payout — the gold must have been earned by some other NPC first. The server-side
[World Treasury Director](/docs/server/economy/) owns that pool, budgets every NPC payout against it, and adjusts what
NPCs pay and charge as the pool drifts from its 10% target. It is the reason no NPC in the world can conjure money, and
the reason prices need no manual intervention to stay sane.

# Postal System

Inspired by [World of Warcraft](https://en.wikipedia.org/wiki/World_of_Warcraft), **Bestia** has a proper **postal
system** for sending letters, items and gold between players and places. It is also the backbone of the
[quest system](/docs/mechanics/questing/) — commission rewards arrive by mail rather than from a quest giver standing
around waiting for you.

Unlike the mailbox in most games, this one **lives in the world**. NPC couriers handle deliveries by default, but players
can train and assign their **Bestias** to run routes instead, and a delivery can be a commission in its own right. If
nobody picks up a delivery within its time frame, an NPC courier finishes the job — the parcel still arrives, but the
courier's cut of the delivery fees is lost to whoever might have earned it.

The system is meant to be used constantly, and it is built to be generous rather than punishing: it is how players
gather their equipment and move their money without spending an evening walking.

## Sending and Receiving

To send a parcel, interact with a **postbox**, write your message and pay the listed fee. You then choose a destination
postbox. By default only postboxes **within 10km** are listed — to send further, you need to own a **map**, which grants
access to the game map and reveals the postboxes on it. Maps are drawn with the
[Cartography](/docs/mechanics/master/#skill-cartography) master skill and are traded as items like anything else.

Once a parcel has arrived, you can collect it at the destination postbox **or at any postbox within 10km of it**. Nobody
has to stand and wait at one specific box for a package to land.

## Postal Fees and Delivery Time

Cost and travel time follow these formulas:

```text
freight_fee   = 10 * distance_km * freight_weight_kg
currency_fee  = send_amount * 0.015
delivery_time = 0.1 + distance_km / 30
```

`currency_fee` is a flat `1.5%` of any gold you send. `delivery_time` is given in hours, which works out to a courier
pace of roughly `30 km/h` plus about six minutes of handling at each end. Parcels containing **only gold or only text**
skip the wait entirely and arrive instantly.

## Insurance

Deliveries can be **insured** for an extra fee. If an insured parcel is lost — usually because the courier was killed
before finishing the route — a **teleportation spell** triggers and sends the goods on to their destination by itself.
That safety net is deliberately slow: the parcel takes a further **0.5 to 1 days** (randomised) to surface in the
recipient's postbox, so insurance can never be abused as a shortcut past normal delivery times.

{{< alert context="warning" text="The insurance fee itself is still **TBD** and needs a formula. It should scale with the declared value of the goods, and it must stay cheap enough to be the obvious choice on a dangerous long haul while never being cheaper than eating the loss on a trivial one." />}}

# Auction House

Trading is where the player-driven economy actually becomes visible. Players **build and run their own auction houses**,
which means they can keep selling while logged off — and it means a well-placed marketplace is a genuine source of
income for its owner.

## Building an Auction House

Building an auction house requires the [Trade Post Owner](/docs/mechanics/master/#skill-trade-post-owner) master skill,
which also caps how many a single master may operate (one at Lv. 1, up to five at Lv. 5). It is an expensive building,
so the materials are usually pooled by a group of players or a whole guild. These special rules apply:

- Once an auction house stands, **no other auction house may be placed within a 5km radius**, and no settlement may hold
  more than one.
- The owner sets an **owner fee** of at least **1%** on every new listing. The ceiling is granted by their Trade Post
  Owner level, rising from **5% at Lv. 1 to 25% at Lv. 5**.
- The owner fee is charged on top of the listing fees below, and the seller pays it up front. It **accumulates inside
  the auction house** and has to be collected in person every so often — an unattended marketplace does not bank its
  own profits.
- **Half of every owner fee collected is passed on to NPCs**, the game's stand-in for taxation. In practice an owner
  keeps half of the rate they advertise.

## How Auctions Work

Items can be listed either at a **fixed price** for a direct sale, or as a timed **auction**:

| Listing type        | Listing fee |
| ------------------- | ----------- |
| Fixed price         | 10%         |
| Auction, **1 day**  | 6%          |
| Auction, **2 days** | 10%         |
| Auction, **5 days** | 20%         |

Both fees are calculated from the **price you ask for** — the fixed price, or the minimum starting bid of an auction —
and **never from what the item eventually sells for**. Both are also **paid up front**, out of your own pocket, at the
moment you create the listing. Whatever the item then fetches above your asking price is yours to keep in full.

**Listing fees are separate from the owner fee**, and the two stack. Unlike the owner fee, listing fees are **burned** -
removed from the economy by the server - which is the game's main brake on inflation.

Worked example: the owner has set a **5%** owner fee, and a player lists an item as a **5-day auction** (**20%**) with a
minimum starting bid of `1000`. Creating that listing costs **25% of 1000 = 250 gold**, payable immediately: `200` is
burned, `25` goes to the owner's till and `25` to the NPC pool. If the auction closes at `1800`, the seller walks away
with the whole `1800`.

Charging up front on the asking price is what keeps the marketplace honest. Nobody can paper the boards with hopeful
junk priced at a million gold, because the fee for asking is real and it is due before anyone has even looked at the
item. Setting a sane starting bid is the cheap move; greed costs gold whether it pays off or not.

**If a listing runs out its duration without finding a buyer**, the auction house simply **posts the item back to you**
through the [postal system](#postal-system) — it is never lost, and you do not have to be online for it to find its way
home.

The fees, however, are **not refunded**. You paid for the marketplace's time and the owner's floor space, and you got both. That is the honest cost of a listing that asked for too much.

## Linking Auction Houses

Auction houses belonging to different players can be **linked** using the
[Trade Agreement](/docs/mechanics/master/#skill-trade-agreement) master skill, provided every owner involved agrees.
Linked houses share their listings, turning a handful of local shops into one broad marketplace and making goods far easier to find - for buyers and sellers alike.

Winning an auction at a linked house leaves the buyer a choice: **pay a delivery fee** and have the item posted over by
the [postal system](#postal-system), or travel and fetch it. Unclaimed items are held for **up to 10 days**. After that
the item goes back to the original seller, who **keeps the payment** — so it is worth remembering where you bought
something.
