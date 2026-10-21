---
weight: 750
title: Parties & Guilds
description: "How masters band together: parties for hunting side by side and sharing what a fight earns, and guilds - founded with a Founder's Seal - with ranks, an experience tax and a level of their own."
---

Masters band together in two ways. A **party** is a handful of players hunting side by side, and lasts as long as
its owner keeps it. A **guild** is a lasting community with a name, ranks and a level of its own, founded with a rare
item. A master can be in one party and one guild at the same time.

Both belong to the **master**, not to the account: a player who switches to another of their masters leaves that
master's party and guild behind until they switch back.

# Parties

Founding a party, and inviting players into it, needs [Basic Skill](/docs/mechanics/master/#skill-basic-skill)
Lv. 5. Joining one needs nothing. Whoever founds a party **owns** it:

| Rule               | Value                                                                                    |
| :----------------- | :--------------------------------------------------------------------------------------- |
| Seats              | `12`, the owner's included. An invitation waiting for an answer holds a seat too.        |
| Party name         | Unique, up to `20` plain letters, digits and single spaces.                              |
| Invitations        | By master name, to a master that is being played. Unanswered, one lapses after `60` s.  |
| Inviting, kicking  | The owner only.                                                                          |
| Leaving            | Anyone. There is no new owner: when the owner leaves, the party ends for everyone.       |

The party window (`Alt+P`) lists every member with their master's health and mana, and beneath it the Bestia they
are playing, if they play one. These bars are live wherever the members stand.

Party members talk with `/p`; only the party hears it.

## Sharing Experience

The owner picks how the party shares what a kill is worth. Each attacker's part of a kill's experience - see
[Killing Enemies](/docs/mechanics/bestia/#killing-enemies) - then goes:

| Mode           | Where an attacker's part goes                                                                                      |
| :------------- | :----------------------------------------------------------------------------------------------------------------- |
| **Each take**  | To the attacker, as outside a party.                                                                               |
| **Even share** | `+30%`, then split evenly between every member **within 100 m of the kill**. Each share goes to the member's master. |

A member counts as near the kill when their master or the Bestia they play stands within `100 m` of it, measured flat
on the map. The attacker's own master always shares, wherever it stands - its damage earned the experience.

The `+30%` is for sharing, not for being in a party: with nobody else near the kill the attacker keeps its part with
no bonus. It also comes on top of the bonus several players already earn by fighting together.

{{< alert context="info" text="**Example.** A party of three in Even share, two of them within 100 m. One of them deals all the damage to a Bestia worth `100` experience. The pool is `130`, so the two near the kill get `65` each and the third gets nothing." />}}

## Loot

Loot is not shared yet: the account that dealt the most damage gets a few seconds' claim on every drop, and then
anybody may pick it up. Options under consideration:

1. **Party pickup** - the claim belongs to the whole party, so any member may pick up during it.
2. **Round robin** - each drop is claimed for the next member near the kill, in turn.
3. **Random** - each drop is claimed for a random member near the kill.
4. **Need or greed** - members roll for drops above a rarity, the rest go by one of the above.

# Guilds

A guild is founded with a **Founder's Seal**, a rare item of the level 40 to 50 range, spent in the founding. The
master who uses it names the guild and leads it. A guild name is unique, up to `24` plain letters, digits and single
spaces; a name that is taken is refused and the seal is kept.

| Rule        | Value                                                                                            |
| :---------- | :----------------------------------------------------------------------------------------------- |
| Seats       | `32`, plus `2` for each level of Guild Extension, up to `52`.                                    |
| Invitations | By master name, as for parties. Each one waiting for an answer holds a seat.                     |
| Leader      | Can never be kicked, cannot leave, and cannot be handed over yet. Ends the guild by disbanding it. |
| Disbanding  | The leader only, confirmed by typing the guild's name. The seal is not given back.              |

A master leading a guild cannot be deleted; the guild has to be disbanded first.

Guild members talk with `/g`. The guild window (`Alt+G`) is only offered inside a guild.

## Ranks and Permissions

A guild has up to `10` ranks. Founding makes two: **Guild Master**, the leader's, and **Member**, which newcomers
join. Each rank has a name, a tax and three permissions:

| Permission        | Allows                                                    |
| :---------------- | :-------------------------------------------------------- |
| **Invite**        | Inviting players into the guild.                          |
| **Kick**          | Removing members of a lower rank.                         |
| **Manage ranks**  | Adding, editing and deleting the ranks below one's own, and moving members of lower ranks onto them. |

The leader's rank holds every permission and only the leader may rename it or change its tax; nobody else can be put
on it. Everyone else acts only **below their own rank**, so no rank can grant itself more or remove those above it.
A rank that still has members cannot be deleted, and neither can the last rank below the leader's.

## Tax and Guild Experience

Every rank pays a tax of `1%` to `80%` - `5%` for both founding ranks. That share of the kill experience each member
receives goes to the guild instead, after any party sharing, rounded down. It is taken from what a member's master
and Bestia earn alike.

A guild levels like a master does, on the curve of Ragnarok Online's guilds scaled down to Bestia's experience: the
step to the next level grows by `2,000` each level.

<!-- prettier-ignore -->
{{< katex display >}}
exp_{guild}(L) = 2000 \cdot \left(\frac{L (L + 1)}{2} + 1\right)
{{< /katex >}}

| Guild Lv. | EXP to the next level | EXP from founding |
| --------: | --------------------: | ----------------: |
|         1 |                 4,000 |                 0 |
|         2 |                 8,000 |             4,000 |
|         3 |                14,000 |            12,000 |
|         5 |                32,000 |            48,000 |
|        10 |               112,000 |           348,000 |
|        20 |               422,000 |         2,698,000 |
|        30 |               932,000 |         9,048,000 |
|        50 |                     - |        41,748,000 |

Level `50` is the highest. The guild window shows how much each member has paid in.

## Guild Skills

A guild gains one **skill point** per level, the founding level included, and the leader spends them. There is one
guild skill so far:

{{< skill name="Guild Extension" maxLevel="10"
    type="Passive"
    description="Each level seats two more members in the guild." >}}
{{< /skill >}}

Guild Extension Lv. 10 therefore needs guild Lv. 10: `348,000` guild experience, which at a `5%` tax is about seven
million experience earned by its members.
