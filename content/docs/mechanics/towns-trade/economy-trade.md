---
weight: 700
title: Economy & Trade
description: "Overview of Bestia's player-driven economy, covering gold and minting, the postal system for sending goods and coin, and the auction houses where trading happens."
---

Every coin in **Bestia** was dug out of the ground by somebody. The economy is entirely player-driven: players find the
gold, mint the money, haul the freight and run the marketplaces, and the world's prices are whatever they collectively
decide those things are worth. This page covers the three systems that carry all of it — the **currency**, the **postal
system** that moves goods and coin across the map, and the **auction houses** where most trading actually happens.

{{< alert context="info" text="**Conventions used on this page.** Unless stated otherwise, every amount and fee is expressed in **gold**, and every duration in hours or days refers to **real time**, not in-game [Bestia time](/docs/mechanics/world/environment/#in-game-time)." />}}

# Currency

All currency in the world originates from gold deposits that players discover and mine themselves. Raw gold becomes
money only once a master turns it into **gold coins** with the [Minting](/docs/mechanics/master/scholar-tree/#skill-minting) skill —
there is no other tap. Gold coins are the single currency for every trade and transaction, and there are no smaller
denominations: everything in the game is priced in whole **gold**.

Because coins cannot be split, every calculated fee on this page is **rounded up to the next whole gold**, and a fee
that works out below `1` still costs `1`.

To give a fresh world something to trade with, **half of all the coin the world's gold can ever make is already minted
and in NPC hands** the day it opens. The other half is still in the ground, and the only way it becomes money is a
player digging it up. How that number is worked out — from the gold the world generator actually places, and from how
many players the world is meant to hold — is on the [Money Supply](/docs/server/money-supply/) page.

Every day that NPC wealth is **redistributed across the settlements, weighted by population**, so a city receives a
larger share than a hamlet. This one mechanic deliberately ignores real-world economic logic; it exists so that coin
keeps circulating into player hands through NPC purchases and quest brokers instead of pooling wherever it happened to
land.

What a settlement does with its share of that gold — stocking its shops, paying for imports along the roads, and
rebuilding what a player knocks down — is covered under [Settlements & Townsfolk](/docs/mechanics/towns-trade/settlements/).

That NPC gold is a **closed pool**, not a second faucet: whenever an NPC pays a player — a quest reward, a purchase, a
world-event payout — the gold must have been earned by some other NPC first. The server-side
[World Treasury Director](/docs/server/economy/) owns that pool, budgets every NPC payout against it, and adjusts what
NPCs pay and charge as the pool drifts from its 10% target. It is the reason no NPC in the world can conjure money, and
the reason prices need no manual intervention to stay sane.

# Postal System

Letters, gold and parcels travel between players by post. A pigeon carries letters and gold notes at once. Parcels go
by road, on an NPC coach or with a player who takes the job, and every parcel is sealed so that it arrives by the time
the post office promised. The [Postal System](/docs/mechanics/towns-trade/postal/) page has the rules and the fees.

# Auction House

Trading is where the player-driven economy actually becomes visible. Players **build and run their own auction houses**,
which means they can keep selling while logged off — and it means a well-placed marketplace is a genuine source of
income for its owner.

## The Start Towns' Auction Houses

The world provides the first auction houses: the **market hall of each start town** is one. New masters arrive in
these towns, so they find a market from their first day. Every other town gets an auction house only when a player
builds one.

- The start towns' houses have **no owner**, so they charge **no owner fee**. Listing fees apply as below.
- The three are **linked**: a listing put up in one shows in all of them, as if by a
  [Trade Agreement](#linking-auction-houses).
- **Click the building** to open its window. No clerk stands behind a counter; the hall itself is the way in.

{{< alert context="info" text="Until the [postal system](/docs/mechanics/towns-trade/postal/) exists, unsold goods and sale proceeds wait in the auction house's **Collect** tab. A fixed-price listing runs for **5 days**." />}}

## Building an Auction House

Building an auction house requires the [Trade Post Owner](/docs/mechanics/master/scholar-tree/#skill-trade-post-owner) master skill,
which also caps how many a single master may operate (one at Lv. 1, up to five at Lv. 5). The skill uses up an
**auction house kit**, a [Carpentry](/docs/mechanics/master/craftsman-tree/#skill-carpentry) Lv. 5 recipe that is
expensive enough that a group or a whole guild usually pools the materials. Anybody can help with the build. These
special rules apply:

- It can only stand in a [player settlement](/docs/mechanics/towns-trade/player-settlements/), and no settlement may hold
  more than one. **No other auction house may be placed within a 5km radius.**
- The settlement needs a working [post office](/docs/mechanics/towns-trade/postal/#in-player-cities) first, because unsold
  goods and coin travel by post.
- The owner sets an **owner fee** at the house, from **1%** up to the ceiling of their Trade Post Owner level: **5% at
  Lv. 1 to 25% at Lv. 5**. A new rate applies to new listings only, and the owner can change it once per 24 h.
- The owner fee is charged on top of the listing fees below, and the seller pays it up front. **Half of it is passed on
  to NPCs**, the game's stand-in for taxation. In practice an owner keeps half of the rate they advertise.
- The owner's half **accumulates in the house's till** and has to be collected in person. The till has no limit, but an
  unattended marketplace does not bank its own profits.
- An auction house belongs to the master who built it. It cannot be handed over. The owner can tear it down while it
  holds no listings.

An auction house is a building and can be attacked. **When it is destroyed**, every listing goes back to its seller by
post, every bid goes back to its bidder, and the coin in the till spills on the ground as loot. When its
[settlement falls](/docs/mechanics/towns-trade/player-settlements/#when-the-sign-falls), it closes the same way, but the
till is posted to the owner.

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

**Listing fees are separate from the owner fee**, and the two stack. Unlike the owner fee, listing fees are **taken out
of circulation** - the server returns them to the world's reserve rather than to anybody's pocket - which is the game's
main brake on inflation. They are not destroyed: there is only so much gold in the world, and a fee that deleted some of
it would shrink the money supply a little further every day.

Worked example: the owner has set a **5%** owner fee, and a player lists an item as a **5-day auction** (**20%**) with a
minimum starting bid of `1000`. Creating that listing costs **25% of 1000 = 250 gold**, payable immediately: `200`
returns to the world's reserve, `25` goes to the owner's till and `25` to the NPC pool. If the auction closes at `1800`, the seller walks away
with the whole `1800`.

Charging up front on the asking price is what keeps the marketplace honest. Nobody can paper the boards with hopeful
junk priced at a million gold, because the fee for asking is real and it is due before anyone has even looked at the
item. Setting a sane starting bid is the cheap move; greed costs gold whether it pays off or not.

## Bidding

An auction runs for its full time and goes to the highest bid:

- **A bid takes the coin from your bag at once.** It is held by the auction house.
- The first bid must be at least the starting bid.
- **The next bid must be at least 5% higher** than the current one, and at least `1` gold higher.
- **An outbid player gets the coin back** by [pigeon](/docs/mechanics/towns-trade/postal/#gold-by-pigeon).
- The seller can set a **buyout price**. A bid of that price ends the auction at once.
- The end time does not move. A bid in the last second wins like any other.
- An auction with a bid on it cannot be cancelled.

When it ends, the goods wait for the winner like any other purchase (see [Collecting](#collecting)), and the seller gets
the coin as auction mail.

## Unsold Listings

**If a listing runs out its duration without finding a buyer**, the auction house simply **posts the item back to you**
as [auction mail](/docs/mechanics/towns-trade/postal/#auction-mail) — it is never lost, and you do not have to be online for it to
find its way home. The coin of a sale reaches you the same way.

The fees, however, are **not refunded**. You paid for the marketplace's time and the owner's floor space, and you got both. That is the honest cost of a listing that asked for too much.

## Linking Auction Houses

Auction houses belonging to different players can be **linked** using the
[Trade Agreement](/docs/mechanics/master/scholar-tree/#skill-trade-agreement) master skill, provided both owners agree.
Linked houses share their listings, turning a handful of local shops into one broad marketplace and making goods far
easier to find - for buyers and sellers alike.

- A link joins two **owners**: every house of one shows the listings of every house of the other.
- Links are **direct**. If A is linked to B and B to C, A's houses do not show C's listings.
- The houses of one owner always share their listings.
- Either owner can cut a link at one of their houses. Goods already sold still wait where they are.
- The start towns' houses have no owner and cannot be linked.

A seller can cancel a listing at any house that shows it. The goods then come home as free auction mail.

## Collecting

Goods you buy or win in the house you stand in are handed over at once. Goods from a linked house **wait at that
house**. The **Won & Bought** window shows everything waiting for you: what it is, where it waits and how many days are
left. From there you can:

- **Send it by post.** You pay the normal [parcel fee](/docs/mechanics/towns-trade/postal/#fees) from that house's post
  office to your home office, and the goods come as auction mail.
- **Collect it in person.** Your master, or one of your Bestias, stands at that house and takes it.

Goods not collected or posted within **10 days** go back to the seller, who **keeps the payment** - so it is worth
remembering where you bought something.
