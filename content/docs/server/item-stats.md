---
weight: 410
title: Item Stats
description: How the zone server stores, rolls and applies item stats and item levels.
---

# Item Stats

The rules are on the [Forging](/docs/mechanics/forging/) page. This page says where they live in `zone-server`.

| Part                       | Where                                                                                       |
| -------------------------- | ------------------------------------------------------------------------------------------- |
| Stats and their price      | `ItemStat`: one entry per stat, with its units per point and what it does to the wearer     |
| Pools                      | `StatPool`                                                                                  |
| Item level formula         | `ItemLevel`                                                                                 |
| Static stats and templates | `ItemStatCatalog`, filled from `items.yml` by `ItemImporterBootRunner`                      |
| Rolling                    | `ItemStatRoller`, called by `CraftingService` when a forge succeeds                         |
| Forge cap                  | `MasterCraftBonusService.rollCap`                                                           |
| Applying to the wearer     | `EquipmentStatusContributor` and `StatBonusEquipmentScript`, during the status value recalc |

# Static Data

Base properties, fixed stats and templates are static data in `items.yml`. They are not stored in the database:
only the tick reads them, and the YAML is the source either way. `level` was renamed to `base-level`, because it is
only where the item level starts. The database column is still `item.level`.

```yaml
- id: 20
  item-db-name: iron_cuirass
  base-level: 25
  script: IronCuirassScript
  stats:
    VIT: 5
    AGI: -2
  random-stats:
    affixes:
      - pool: DEFENSE
      - pool: RESIST
        chance: 30
    sockets: [15, 5]
```

| Key                                                  | Meaning                                                               |
| ---------------------------------------------------- | --------------------------------------------------------------------- |
| `attack`, `magic-attack`, `defense`, `magic-defense` | Base properties. They do not raise the item level.                    |
| `stats`                                              | Fixed stats, as `STAT: value`. They raise the item level.             |
| `random-stats.affixes`                               | Slots: `pool` or `stat`, `chance` (default 100), optional `min`/`max` |
| `random-stats.sockets`                               | One chance in percent per socket, at most four                        |

The importer checks the templates at boot: a slot names a pool or a stat, never both, and only `EQUIP` items roll.

An item without a `script` gets `StatBonusEquipmentScript`, which applies the base properties and all stats. A script
with special behaviour extends it and calls `super.apply`. Iron sword and iron cuirass do this to add a bonus per
upgrade level.

# Database

Each forged copy is an `item_instance` row. The roll adds:

| Table                | Column                 | Meaning                                                                          |
| -------------------- | ---------------------- | -------------------------------------------------------------------------------- |
| `item_instance`      | `item_level`           | The rolled level. Null on copies made before item levels: the template's level.  |
| `item_instance`      | `slots`                | Open sockets, from the forge or Item Customization. This column already existed. |
| `item_instance`      | `crafted_by_master_id` | The smith. The column existed but was never written before.                      |
| `item_instance_stat` | `item_instance_id`     | The copy. The rows are deleted with it.                                          |
| `item_instance_stat` | `ordinal`              | Place in the roll. A copy can roll the same stat twice.                          |
| `item_instance_stat` | `stat`                 | The `ItemStat` name, stored as VARCHAR so a new stat needs no schema change.     |
| `item_instance_stat` | `stat_value`           | The rolled value in the stat's own unit. `value` is a reserved word in H2.       |

There are no migrations: `ddl-auto: update` adds the column and the table. Old rows keep a null `item_level`, and
the server works it out from the template, the rolled stats and the sockets when it needs it.

When essences can be put into sockets, a table `item_instance_socket` will follow, with `item_instance_id`,
`ordinal` and the essence. The `slots` count is enough as long as nothing can fill a socket.

# Network

`InventoryItem`, `EquippedItem` and `TradeOfferItem` carry `item_level` and `repeated ItemStatValue rolled_stats`.
An `ItemStatValue` names its stat as a string, so a new stat reaches an older client as an unknown label instead of
breaking the message. Fixed stats are static data and are not sent. The client shows the stats in the item tooltip,
with labels from `general.csv` (`ITEM_STAT_<NAME>`).

# Open Points

- **Loot drops do not roll yet.** A dropped item has no instance until someone picks it up, so the bestia's level is
  lost by then. The same is true for a forged copy that does not fit into the smith's inventory: it lands on the
  ground and loses its roll. Both need the roll to travel on the ground item.
- **The client does not know an item's fixed stats.** `syncItemDb` does not copy `stats` into the client's item
  database yet, so the tooltip only lists rolled stats.
- **Base attack of forged weapons.** The iron sword has no `attack` yet, while the reference master assumes weapon
  ATK `9 + level`.
