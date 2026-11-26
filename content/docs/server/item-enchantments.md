---
weight: 415
title: Item Enchantments
description: How zone-server stores and runs enchantments bound to an item, and how the holder sees them.
---

{{< alert context="info" text="**Partly built.** The definitions, the table, the scripts, ground items, the postal seal, the keepsake ward and the item detail are built. Endow on the weapon is not: an endow is still a status effect on the wielder (`MASTER_ENDOWED`). Dispel against a ground item still rolls `base − strength`, not the Potency rule below." />}}

# Item Enchantments

The rules are on the [Items](/docs/mechanics/items-crafting/items/#enchantments) page. This page says how `zone-server` runs
them.

A status effect lives in the ECS: it is a component on an entity, and a system counts it down every tick. An
enchantment cannot work that way. Most of the time its item is not an entity at all. It is a row in a bag, a chest or a
parcel, and nothing ticks there.

| Part           | Where                                                                                                   |
| -------------- | ------------------------------------------------------------------------------------------------------- |
| Definitions    | `item_enchantments.yml`, read at boot like `status_effects.yml`: id, identifier, dispellable, script    |
| Stored copy    | `ItemInstanceEnchantment`: one row per enchantment on an `ItemInstance`                                 |
| Behaviour      | `ItemEnchantmentScript` beans, one per enchantment, found by the `script` key                           |
| In a bag       | `Inventory.Item` and `Equipment.EquippedItem` keep a copy for the holder's item detail                  |
| On the wielder | `EquipmentStatusContributor`, during the status value recalc. Not built                                 |
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

# In a Bag or a Slot

The live bag (`Inventory.Item`) and the worn slots (`Equipment.EquippedItem`) keep a copy of the enchantments, next to
the essences. They are read from the rows when the bag loads, and every path that moves a copy carries them along:
a grant, a handover, putting gear on. A courier's new mail sack carries its seal into the bag at once.

The bag and the equipment message send each enchantment with the seconds it has left, as a `HeldItemEnchantment`. An
ended one is left out: nothing ticks a held item, so the copy in memory may still hold it. The strength is not sent.

**A copy picked back up reads its rows again.** The ground keeps its own copy, and a seal's copy there runs the
30 s return timer. That timer does not belong to the sack in a bag, so the pickup asks the rows.

**The client keeps the time left as a deadline.** The tooltip and the inventory's detail column name each
enchantment and the time left, like "Keepsake Ward · 2 min left". A tooltip is written when its row is built but
read later, so it carries the deadline and turns it into the time left when it opens.

# Scripts

```kotlin
interface ItemEnchantmentScript {
  /** The item has just fallen to the ground as its own entity. A postal seal starts its return here. */
  fun onDropped(world: World, groundEntity: EntityId, enchantment: ActiveItemEnchantment) {}

  /** A Dispel broke the enchantment on a ground item. A broken seal spills the parcel here. */
  fun onDispelled(world: World, groundEntity: EntityId, enchantment: ActiveItemEnchantment) {}
}
```

Endow on the weapon adds `onWielderRecalc(context, enchantment)`, called while the item is worn or wielded. An endow
sets the weapon's element there.

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

1. **Built.** Definitions, the table, the scripts interface, and the tooltip line that lists an item's enchantments.
2. Endow on the weapon, through `Equipment` and the recalc. This is the smallest real use and tests the path.
3. **Built.** Enchantments on ground items, Dispel on a ground target, and `SealReturn` for the
   [postal system](/docs/mechanics/towns-trade/postal/). Dispel still rolls `base − strength`.
