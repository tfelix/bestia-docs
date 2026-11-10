---
weight: 415
title: Item Enchantments
description: How zone-server could store and run enchantments bound to an item - endows and postal seals first.
---

{{< alert context="warning" text="Design proposal. Nothing on this page is built yet. Today an endow is a status effect on the wielder (`Endowed`), and no item carries any effect of its own." />}}

# Item Enchantments

The rules are on the [Items](/docs/mechanics/items-crafting/items/#enchantments) page. This page proposes how `zone-server` runs
them.

A status effect lives in the ECS: it is a component on an entity, and a system counts it down every tick. An
enchantment cannot work that way. Most of the time its item is not an entity at all. It is a row in a bag, a chest or a
parcel, and nothing ticks there.

| Part           | Where                                                                                                   |
| -------------- | ------------------------------------------------------------------------------------------------------- |
| Definitions    | `item_enchantments.yml`, read at boot like `status_effects.yml`: id, identifier, dispellable, script    |
| Stored copy    | `ItemInstanceEnchantment`: one row per enchantment on an `ItemInstance`                                 |
| Behaviour      | `ItemEnchantmentScript` beans, one per enchantment, found by the `script` key                           |
| On the wielder | `EquipmentStatusContributor`, during the status value recalc                                            |
| On the ground  | `ItemEnchantments` component on the ground item entity, next to `GroundItemStack`                       |
| Dispel         | The skill may target a ground item. `StatusEffectService.dispel` stays as it is: it never touches items |

# Storage

An enchantment belongs to an `ItemInstance`, because the instance is the one thing that keeps its identity while the
item moves between owners. A new table in `V1__*.sql`:

```text
item_instance_enchantment
  item_instance_id   the item
  enchantment_id     which one, from item_enchantments.yml
  strength           against Dispel
  value              what the instance carries beyond its kind, like an endow's element
  ends_at            wall-clock time; null for a permanent enchantment
```

**`ends_at` is a time, not a countdown.** A countdown needs somebody to count, and nothing walks every bag every tick.
An ended row is simply ignored when the item is read: at equip, at recalc, when a parcel is opened. A slow sweep job
deletes ended rows now and then.

Endows last seconds, so going to the database for them would be slow and pointless. The `Equipment` component
already mirrors in memory what every entity wears. It holds the worn items' enchantments too, and the row is written
when the item leaves it: unequipped, traded, dropped, or at logout.

# Scripts

```kotlin
interface ItemEnchantmentScript {
  /** While the item is worn or wielded. An endow sets the weapon's element here. */
  fun onWielderRecalc(context: StatusValueRecalcContext, enchantment: ActiveItemEnchantment) {}

  /** The item has just fallen to the ground as its own entity. A postal seal starts its return here. */
  fun onDropped(world: World, groundEntity: EntityId, enchantment: ActiveItemEnchantment) {}
}
```

`Endowed` keeps its status-effect form for creatures without a weapon. A master with a weapon gets an `EndowedWeapon`
enchantment on the weapon's instance instead. The two never apply at once, because the cast picks one target: the
weapon if there is one, otherwise the body.

# The Ground and Dispel

When an enchanted item drops, the ground item entity gets an `ItemEnchantments` component, filled from the rows. That
makes it a normal entity for the rest of the server:

- **Dispel can target it.** `Dispel.isCastPossible` asks for an entity battle context today. A ground item with
  enchantments must count as a valid target. The chance is `Dispel base chance × min(1, P dispel / strength)`, and the
  target's SMDEF does not apply.
- **The postal seal counts down on it.** `PostalSealScript.onDropped` adds a `SealReturn(remainingSeconds = 30)`
  component. A `SealReturnSystem` counts it down. At zero it removes the ground entity and gives the parcel back to the
  post. A successful dispel removes the seal first, so the system finds nothing to return, and the parcel opens into
  plain ground items.
- **Picking up a sealed sack is a hand-over.** The pickup path asks the post whether the finder may carry it, under the
  route board's rules, and then makes them the courier. Picking it up removes the ground entity, and its `SealReturn`
  with it. The seal itself stays on the parcels.
- **The client shows it.** The ground item message gains the enchantments with their time left, so the client can
  draw the seal's glow and the countdown ring.

# Order of Work

1. Definitions, the table, the scripts interface, and the tooltip line that lists an item's enchantments.
2. Endow on the weapon, through `Equipment` and the recalc. This is the smallest real use and tests the path.
3. Enchantments on ground items, Dispel on a ground target, and `SealReturn`. This waits for the
   [postal system](/docs/mechanics/towns-trade/postal/).
