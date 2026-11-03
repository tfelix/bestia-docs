---
weight: 420
title: Honor
description: "How zone-server keeps a Master's honor: the offence catalog, three layers of local honor, lazy decay, the Aggressor flag, and how a grudge travels from a witness to a town and on to its neighbours."
---

{{< alert context="warning" text="Design, being implemented. The player-facing rules are in [PvP & Honor](/docs/mechanics/pvp/). This page is about how the server keeps them." />}}

# Three layers

Honor belongs to a Master. The server keeps it in three places:

{{< table >}}

| Layer               | Key                          | Changes                                        |
| ------------------- | ---------------------------- | ---------------------------------------------- |
| **Global**          | Master                       | At once, from the global column of the catalog |
| **Settlement**      | Master, settlement           | Later, when a grudge or a rumour reaches it    |
| **Personal grudge** | Master, townsperson identity | At once, on the witness who saw the offence    |

{{< /table >}}

Each table is sparse. A Master who never did anything wrong has one global row and nothing else. A
settlement row exists only once a grudge or rumour reached it.

## Why not one list per NPC

The first design gave every NPC its own reputation list. That does not fit how townsfolk work.
They are [re-derived, not persisted](/docs/server/townsfolk/#persistence): a person exists as an
entity only while a player is near, and there are millions of them. A list per person is a table
the size of the world, written for people nobody meets twice.

Most questions are also asked of a **town**, not a person: shops are priced per settlement, and
brokers "talk to each other". So the grudge is personal only for a short time, and the settlement
holds the lasting part.

A grudge is keyed by `TownsfolkIdentity` (settlement, household, member). The entity id changes each
time a person re-materialises; the identity does not.

# The catalog

Every offence and every good deed is a row in `honor.yml`, with its global and local amount. The
numbers come from the [offence table](/docs/mechanics/pvp/#negative-honor). Zone multipliers,
thresholds, decay and the cap live there too, so balancing never touches code.

The catalog holds offences that nothing can commit yet: stealing, dispelling a ward stone,
abandoning a commission. Each has one entry point that its future feature calls. Until then a GM
reaches them with `/honor act <ACT>`. That is deliberate: the numbers are tested now, and each
feature only has to call one method.

# Recording an offence

`HonorService.record` takes the offence, the offender, the position and the witnesses.

1. Find the witnesses: materialised townsfolk and players within perception range of the offender.
2. Inside a ward field the protected-zone rule applies: the offence counts without a witness and the
   loss is doubled.
3. Apply the global amount if anybody saw it (or the ward did).
4. Apply the local amount as a personal grudge on each townsperson who saw it. An offence inside a
   settlement footprint with no townsperson in range goes straight to the settlement.

## The Aggressor flag

Self-defense must never cost honor. The first player to harm a player who is not an Aggressor gets
the `Aggressor` effect for 180 seconds. It is a status effect, so everybody in range sees it.

Damage between players is where the flag is set, in the damage system, before the death phase. The
kill handler then only has to ask one question: did the victim carry `Aggressor` at the moment of
death? If so, nothing is recorded.

# Gossip

A grudge travels on a slow cadence, like rumour expiry. Every few minutes `HonorGossipSystem`:

- moves half of each grudge older than one Bestia day into the settlement's honor, and marks it moved;
- when a settlement's honor falls below **-100**, marks it permanent and posts a rumour through the
  [rumour ledger](/docs/server/dialog/#recent-events-the-rumour-ledger).

The rumour reaches nearby settlements by the ledger's own distance rule. Each town that hears it
loses honor scaled by the rumour's strength at that distance. Because it is a normal rumour, the
townsfolk there also mention the Master by name in conversation, with no extra dialog code.

A witness also shouts once at the moment of the offence, in public chat. Players nearby see who did
it before any rumour has time to travel.

# Decay

Decay is computed on read, from the last time the value changed. Nothing ticks per Master, and
offline time counts without any work. This is the same `f(t)` approach the
[settlement ledger](/docs/server/townsfolk/#three-tiers-not-two) uses.

Each layer keeps what was earned and what is owed apart. Only what is owed heals:

- A loss of global honor heals by 1 point per real-time day, once a full day passed without a new loss.
- Settlement honor and grudges heal the same way, unless they fell below -100 and became permanent.
- Gains stop at each layer's cap (+100 for global honor) and are not banked beyond it.

# Where honor is read

- **Shop prices.** The combined value (global + settlement + the merchant's grudge) scales the buy
  price up and the sell price down. It never closes the shop's spread. Below -60 the shop refuses.
- **Conversation.** Below 0 townsfolk are unfriendly and offer fewer topics.
- **Behaviour.** Below -60 townsfolk flee from the Master or turn hostile.
- **The Master's own profile.** Global honor is sent to its owner only.
- **Everybody nearby.** A Master below zero carries a visible Dishonored mark, a thief a Thief mark for six
  hours, and an aggressor an Aggressor mark for 180 seconds. A bounty for an outlaw or a thief is paid once a
  day per victim and killer.
