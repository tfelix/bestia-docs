---
weight: 755
title: Guild Strongholds
description: "How a recognised guild finds an Empyrite Seed, plants a golden Empyrite on it and holds a Stronghold: grounds nobody may dig, investment, a daily treasury, the steward and the guild storage, Guardian watchers, and capture by other guilds."
---

A **Guild Stronghold** is a guild's own place in the open world. Its heart is the **Empyrite**, a golden crystal.
Whoever breaks the Empyrite takes the Stronghold.

<figure class="figure d-block my-4">
  <a href="/images/artwork/crystal-courtyard.jpg"><img class="figure-img img-fluid rounded" src="/images/artwork/crystal-courtyard.jpg" alt="Concept art: the Empyrium in the middle of a stronghold" loading="lazy"></a>
  <figcaption class="figure-caption">The Empyrium in the middle of a stronghold</figcaption>
</figure>

Strongholds stand only on **Empyrite Seeds**, a few fixed spots in every world. Each lies near rich ore, so a
Stronghold is a home base worth holding and worth taking. Only a guild with
[Official Guild Approval](/docs/mechanics/society/party-guild/#skill-official-guild-approval) can find a seed,
plant an Empyrite, or attack another guild's Stronghold.

The guild skills under [Recognition and the Stronghold](/docs/mechanics/society/party-guild/#recognition-and-the-stronghold)
work here: the steward, the guild storage, the watchers and Permanent Development.
[Emergency Recall](/docs/mechanics/society/party-guild/#skill-emergency-recall) works only on the guild's own
grounds.

{{< alert context="info" text="**Conventions used on this page.** Durations are in **real time**, distances in metres on the ground." />}}

{{< alert context="info" text="**Built**, except the Orders and cults layer at the end. The numbers are first values; the server can change them. The Empyrite, its sprout and site, and the watchers still look like simple shapes until they have models." />}}

# Empyrite Seeds

## Where Seeds Lie

When a world is made, it picks a **pool** of seed spots:

- Each spot lies next to valuable natural resources: ore deposits, gold lodes, rich veins. The deposits lie
  **outside** the spot's grounds, `0.5` to `2 km` away, so the guild that holds it can mine them.
- At least **5 km** from every generated settlement and from every other seed.
- Outside every [ward stone](/docs/mechanics/society/pvp/#protected-zones) field.

The pool holds more spots than a world ever needs. They are ranked by the worth of the resources around them.

## Awake Seeds

Most seeds sleep. Only **awake** seeds can be found and settled. The number of awake seeds follows the number of
guilds with Official Guild Approval:

```text
awake seeds = max(4, approved guilds / 25, rounded up)
```

When that number rises, the best sleeping seed of the pool **sprouts**. Awake seeds never go back to sleep, even if
guilds lose their Approval or disband.

A sleeping seed is ordinary ground. Anybody may dig or build there. When it sprouts:

- It **rises to the current surface** of its spot, however deep it was dug, as a small golden sprout that anybody
  nearby can see.
- If a player structure stands on its core, it moves to the nearest free ground within `30 m`.
- It is **skipped**, and the next seed of the pool sprouts instead, if a
  [player settlement](/docs/mechanics/towns-trade/player-settlements/) or a sign site stands within `1 km`, or if no
  free ground is left within `30 m`.

## Names

Every seed has a name of its own, as Ragnarok Online's castles do. The world's
[name generator](/docs/server/name-generation/) makes it in the language of the people who live nearest. A
Stronghold keeps its seed's name, whoever holds it.

## The Legend of the Golden Stone

The townsfolk near a seed tell a [legend](/docs/mechanics/world/world-history/#hearsay-and-legends) about it. The
legend names the seed and says whose stone it is:

1. the god or the [cult](/docs/mechanics/world/pantheon/#cults) whose sanctuary lies closest to it,
2. else the god of a nearby town's temple,
3. else the god of the people who named the seed.

Like every legend, it points the way from the nearest standing town, and each town tells it its own way: most
tell it true, some get the direction a little wrong, and some tell a myth. Every seed of the pool has a legend,
asleep or awake, so a guild that follows one may find a seed that has not woken yet.

## Discovering a Seed

An awake seed is **discovered** in one of two ways:

- A master walks onto its core.
- A [Cartography](/docs/mechanics/world/world-exploration/#cartography) survey covers it.

From then on the seed is on every [map](/docs/mechanics/world/world-exploration/#explored-world-map) that charts its
spot, with its name and whether a guild holds it. A seed nobody has discovered is on no map.

# Terrain at a Seed

## The Core

An awake seed has a **core**: a column of `5 m` around its centre, from the sky down to the bottom of the world.
The ground of the core holds. Pickaxes, blasts and shovels do not break it, and nobody can build on it. Water may
still fill the air above it.

## The Grounds

Once an Empyrite is planted, the circle of **500 m** around it is the Stronghold's **grounds**:

- **Nobody digs** on the grounds, not even the guild that holds them. Nobody can undermine a wall or a building.
- Only members of the holding guild may **build** on the grounds. Walls, gates, towers and stations stand here as
  anywhere else, and its members can [repair](/docs/mechanics/towns-trade/player-settlements/#repairing) them as in
  a player settlement.
- Every building on the grounds is a [guild structure](#who-may-attack) of the holding guild, also one that stood
  there before the Empyrite was planted.
- Anybody may **walk** onto the grounds. What the watchers do to them is under [Watchers](#watchers).

The grounds of two Strongholds never touch, because seeds lie at least 5 km apart. A player settlement can never be
founded within `1 km` of an awake seed.

# Founding

## Finding a Seed

[Official Guild Approval](/docs/mechanics/society/party-guild/#skill-official-guild-approval) is an active skill. A
member whose rank may use guild skills casts it to sense the awake seeds that no guild holds:

- It shows up to `3` seeds within `30 km` as faint marks on the compass, each with a direction and a distance.
- A mark is off by up to a third of its distance. Cast again closer, and it is sharper.
- A discovered seed shows its name.

## Planting the Empyrite

A guild may found a Stronghold only while it holds none. Every further Stronghold it holds, it has
[captured](#capture).

1. A member whose rank may use guild skills stands on the core of a discovered, awake seed that no guild holds and
   clicks the sprout.
2. They confirm, and plant an **Empyrite site**. They pay `10,000` coins from their own purse, which go back to the
   [world reserve](/docs/server/money-supply/). The server sets the price; it may rise later.
3. Members work on the site for **30 min** in total. Anybody of the guild may help.
4. When the work is done, the Empyrite stands. The grounds are the guild's.

While it grows, the site is a guild structure like the Empyrite: guilds with Approval may attack it. A site that is
destroyed, or that nobody works on for **24 h**, is gone, and its seed is free again. The coins are not returned.

# Attack and Capture

## Who May Attack

Only members of **guilds with Official Guild Approval**, and their Bestia, can damage **guild structures**. Guild
structures are:

- the Empyrite and the Empyrite site,
- the watchers and the steward,
- every building on a Stronghold's grounds,
- the guild's [War Banner](/docs/mechanics/society/party-guild/#skill-rally-to-the-banner), wherever it stands.

The guild's own members never can, and nobody else can either: a master with no guild, or with a guild without
Approval, deals no damage to them. Damaging or destroying a guild structure costs **no honor**.

## Attack Windows

The server sets the **attack windows**: a list of weekly time spans, for example _Saturday 18:00 - 22:00_. Outside a
window, nothing on a Stronghold's grounds can be damaged. A War Banner outside the grounds can always be cut down.

An empty list means a Stronghold can be attacked at any time. That is the default. The windows will be talked through
with the community.

## The Empyrite

The Empyrite heals **1% of its HP per minute** once nobody has hit it for **5 min**. Its HP and DEF grow with
[Defense](#investment):

| Value | Base     | Per Defense level | At Defense 10 |
| ----- | -------- | ----------------- | ------------- |
| HP    | `50,000` | `+10,000`         | `150,000`     |
| DEF   | `20`     | `+4`              | `60`          |

## Capture

The guild whose member strikes the **breaking blow** takes the Stronghold:

- The Empyrite forms again at once with its **full HP**, in the new guild's colours. For **10 min** nothing can
  damage it, and whoever strikes it is told so.
- Buildings, stations and walls stay, and now belong to the new guild.
- Every investment track loses **one level**.
- The new guild takes every uncollected [treasure drop](#treasury).
- The steward and the watchers leave. The new guild hires and calls its own.

A guild may hold any number of Strongholds. The seeds limit how many there are, and a guild that holds many has to
defend them all.

# Investment

Any member can invest **coins** at the Empyrite. Invested coins go back to the
[world reserve](/docs/server/money-supply/). The Stronghold has three **tracks**, and each has levels `0` to `10`:

| Track       | Each level gives                                                          |
| ----------- | ------------------------------------------------------------------------- |
| **Defense** | More HP and DEF for the Empyrite, one more watcher, and stronger watchers |
| **Storage** | `50` more slots in the [guild storage](#guild-storage)                    |
| **Economy** | A bigger [treasure drop](#treasury)                                       |

A level needs **5 steps**. One step costs `20,000 × (the next level)` coins: a step towards level 1 costs `20,000`,
a step towards level 10 costs `200,000`. One track from `0` to `10` costs `5,500,000` coins.

With [Permanent Development](/docs/mechanics/society/party-guild/#skill-permanent-development), every step has a `50%`
chance to count twice.

# Treasury

Every **24 h** after the Empyrite was planted, the Stronghold makes a **treasure drop**. The size grows with Economy:

| Economy |     Coins | Ore, per nearby kind | Crafting items |
| ------: | --------: | -------------------: | -------------: |
|       0 |  `10,000` |                    – |              – |
|       5 |  `60,000` |                 `10` |            `2` |
|      10 | `110,000` |                 `20` |            `5` |

- **Coins** come from the world reserve, not from nowhere. They leave it when the drop is collected; an empty reserve
  pays less.
- **Ore** is that of the `3` nearest deposit kinds within `3 km` of the seed: `2` pieces per Economy level of each.
  Gold is never in a drop, since gold ore sizes the world's coin supply.
- **Crafting items** are rare materials for high-level crafting: one per `2` Economy levels. Higher Economy levels
  unlock rarer ones, from Shadow Shards and Drake Hide at Economy `2` to Adamantium Ingots at `10`.

The drops are listed in the guild window's Stronghold tab. The **leader** collects them into the guild storage from
anywhere, all at once; when the storage lacks room for all of them, nothing is collected. Up to `3` uncollected drops
wait; a fourth replaces the oldest. A guild that [captures](#capture) the Stronghold takes the drops still waiting.

# The Steward

[Steward Contract](/docs/mechanics/society/party-guild/#skill-steward-contract) lets the guild **hire a steward**.
Any member may hire one at the Empyrite for `200,000` coins, which go back to the world reserve, whenever the
Stronghold has none.

- A strong protection spell lies on the steward and negates all damage.
- At the steward, members open the [guild storage](#guild-storage).
- A member's master who falls anywhere is reborn at the guild's nearest Stronghold that has a steward. A party's
  [Base Camp](/docs/mechanics/master/survival-tree/#skill-base-camp) of Lv. 3 comes first.
- When the Stronghold is captured, the steward leaves with the old guild's contract.

# Guild Storage

[Guild Storage](/docs/mechanics/society/party-guild/#skill-guild-storage) gives the guild **one** storage, shared by
all its Strongholds. Any steward of the guild opens it. Only one member can have it open at a time; the others see
who.

| Source                                        | Slots |
| --------------------------------------------- | ----- |
| Guild Storage, per skill level                | `100` |
| Storage track, per level, per Stronghold held | `50`  |

A guild that holds more Strongholds has more room. When it loses one, its room shrinks. Items over the limit stay,
but nobody can put anything in until there is room again.

Two rank permissions decide who may use it:

- **Deposit**: put items in.
- **Take**: take items out.

A new rank may deposit but not take. The leader may always do both. Every take is written in the guild [log](/docs/mechanics/society/party-guild/#members-the-map-and-the-log).

## Losing the Last Stronghold

When a guild holds **no Stronghold** any more, its storage is **sealed**. Nothing is lost, but nobody can open it.
The leader can:

- **wait**: the seal lifts when the guild holds a Stronghold with a steward again, or
- **send it away** in the guild window's Stronghold tab: pay `1,000` coins per used slot, and the contents go as one
  parcel to the leader's
  [home post office](/docs/mechanics/towns-trade/postal/#your-home-post-office). They follow the rules for
  [uncollected parcels](/docs/mechanics/towns-trade/postal/#uncollected-parcels).

# Watchers

[Watcher Research](/docs/mechanics/society/party-guild/#skill-watcher-research) lets the guild call **watchers**:
Bestia of brass and clockwork that guard the grounds. They are not in the
[compendium](/docs/mechanics/bestias/bestia/#bestia-compendium), cannot be captured and drop nothing.

| Watcher             | Fights                                                   |
| ------------------- | -------------------------------------------------------- |
| **Melee Guardian**  | Up close. Very tough, moderate damage.                   |
| **Archer Guardian** | From range, with arrows that never run out. High damage. |

- A Stronghold has `2` watchers, plus `1` per Defense level, at most `12`. The leader picks how many of each kind.
- A watcher's level is `50 + 5 × Defense`.
- [Strengthen Watchers](/docs/mechanics/society/party-guild/#skill-strengthen-watchers) gives `+10%` damage and
  `+10%` attack speed per level.
- Calling a watcher is free. A fallen watcher comes back after **30 min**, or at once when any member pays `50,000`
  coins.

Watchers fight only those who may fight them: members of other guilds with Approval and their Bestia, and only inside
an [attack window](#attack-windows). They leave everybody else in peace. They roam and fight within `120 m` of the
Empyrite.

# Orders and Cults

{{< alert context="info" text="The [Orders](/docs/mechanics/society/factions/) are not part of the game yet, and the first world does not know them. A Stronghold works fully without them. This section is a layer for later." />}}

## Shrines

Every member stays sworn to their own Order. On the grounds, each member can raise a **shrine** of their Order and
strengthen it with their own deeds. A shrine raises the influence of its own Order in the region, like a
[temple](/docs/mechanics/society/factions/#citadels-and-temples). A guild of mixed Orders simply has several shrines.

## Attunement

A guild may **attune** its Empyrite to one Order. The Stronghold then counts as a temple of that Order and gives it
more influence in its region than any shrine. The leader attunes it for coins; changing it again takes a long time.

A member of another Order thinks twice before serving in a guild whose Empyrite is attuned against them.

Guild members never harm each other, in a [war zone](/docs/mechanics/society/pvp/#war-zone) or not. Each member's
deeds count for their own Order's [Covenant](/docs/mechanics/society/factions/#seasonal-covenants), never for the
guild's.

## Cults and Towns

The towns nearby care who holds it. A town whose [patron god](/docs/mechanics/world/pantheon/#what-worship-leaves-behind)
leans toward the Order the Empyrite is attuned to likes the guild; a town whose god leans the other way does not.
This shows in the [local honor](/docs/mechanics/society/pvp/#reputation-system) of the guild's members there.

# Open Questions

- Whether a member of another Order gets a debuff on the grounds of an Empyrite attuned against them.
- Player structures outside settlements need rules of their own.
- Whether the steward's protection can be countered, as a [ward stone's](/docs/mechanics/society/pvp/#countering-the-ward-stone) can.
- What happens to a guild's Strongholds and storage when the guild disbands.
- The default attack windows.
