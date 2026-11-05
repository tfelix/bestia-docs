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

To give a fresh world something to trade with, **half of all the coin the world's gold can ever make is already minted
and in NPC hands** the day it opens. The other half is still in the ground, and the only way it becomes money is a
player digging it up. How that number is worked out — from the gold the world generator actually places, and from how
many players the world is meant to hold — is on the [Money Supply](/docs/server/money-supply/) page.

Every day that NPC wealth is **redistributed across the settlements, weighted by population**, so a city receives a
larger share than a hamlet. This one mechanic deliberately ignores real-world economic logic; it exists so that coin
keeps circulating into player hands through NPC purchases and quest brokers instead of pooling wherever it happened to
land.

What a settlement does with its share of that gold — stocking its shops, paying for imports along the roads, and
rebuilding what a player knocks down — is covered under [Settlements & Townsfolk](/docs/mechanics/settlements/).

That NPC gold is a **closed pool**, not a second faucet: whenever an NPC pays a player — a quest reward, a purchase, a
world-event payout — the gold must have been earned by some other NPC first. The server-side
[World Treasury Director](/docs/server/economy/) owns that pool, budgets every NPC payout against it, and adjusts what
NPCs pay and charge as the pool drifts from its 10% target. It is the reason no NPC in the world can conjure money, and
the reason prices need no manual intervention to stay sane.

# Postal System

Letters, gold and parcels travel between players by post. A pigeon carries letters and gold notes at once. Parcels go
by road, on an NPC coach or with a player who takes the job, and every parcel is sealed so that it arrives by the time
the post office promised. The [Postal System](/docs/mechanics/postal/) page has the rules and the fees.

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

{{< alert context="info" text="Until the [postal system](/docs/mechanics/postal/) exists, unsold goods and sale proceeds wait in the auction house's **Collect** tab. A fixed-price listing runs for **5 days**." />}}

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

**If a listing runs out its duration without finding a buyer**, the auction house simply **posts the item back to you**
through the [postal system](/docs/mechanics/postal/) to your home post office — it is never lost, and you do not have to be online for it to find its way
home.

The fees, however, are **not refunded**. You paid for the marketplace's time and the owner's floor space, and you got both. That is the honest cost of a listing that asked for too much.

## Linking Auction Houses

Auction houses belonging to different players can be **linked** using the
[Trade Agreement](/docs/mechanics/master/#skill-trade-agreement) master skill, provided every owner involved agrees.
Linked houses share their listings, turning a handful of local shops into one broad marketplace and making goods far easier to find - for buyers and sellers alike.

Winning an auction at a linked house leaves the buyer a choice: **pay a delivery fee** and have the item posted over by
the [postal system](/docs/mechanics/postal/), or travel and fetch it. Unclaimed items are held for **up to 10 days**. After that
the item goes back to the original seller, who **keeps the payment** — so it is worth remembering where you bought
something.
