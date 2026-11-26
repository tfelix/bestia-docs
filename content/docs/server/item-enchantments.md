---
weight: 415
title: Item Enchantments
description: How zone-server stores and runs enchantments bound to an item, and how the holder sees them.
---

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
| On the wielder | `EquipmentStatusContributor`, during the status value recalc, for the weapon in the right hand          |
| On the ground  | `ItemEnchantments` component on the ground item entity, next to `GroundItemStack`                       |
| Dispel         | The skill may target a ground item. `StatusEffectService.dispel` stays as it is: it never touches items |

# Storage

An enchantment belongs to an `ItemInstance`, because the instance is the one thing that keeps its identity while the
item moves between owners:

```text
item_instance_enchantment
  item_instance_id    the item
  enchantment_id      which one, from item_enchantments.yml
  strength            against Dispel
  enchantment_value   what the instance carries beyond its kind, like an endow's element
  ends_at             wall-clock time; null for a permanent enchantment
  enchantment_level   the level of the skill that bound it, like an endow's; 0 otherwise
```

**`ends_at` is a time, not a countdown.** A countdown needs somebody to count, and nothing walks every bag every tick.
An ended row is simply ignored when the item is read: at equip, at recalc, when a parcel is opened. A slow sweep job
deletes ended rows now and then.

**An endow is written when it lands.** It lasts minutes, and one row per cast is cheap. Because the row is already
there, unequipping, trading, dropping and logging out need no path of their own, and a crash loses nothing.

**Worn gear is checked once a second.** Nothing ticks an item, but worn gear changes what its wearer does.
`WornEnchantmentExpirySystem` takes ended enchantments off worn gear and its bag copy, and marks the stats for a
recalc. A copy lying in a bag keeps an ended one in memory until the bag is sent again, and the client says it wore
off.

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

  /** The item is in the weapon hand while the wielder's stats are rebuilt. An endow sets the element here. */
  fun onWielderRecalc(context: StatusValueRecalcContext, enchantment: ActiveItemEnchantment) {}
}
```

# Endow on the Weapon

`MasterEndowed` keeps its status-effect form for a creature without a weapon. A wielder of a weapon gets an
`ENDOWED_WEAPON` enchantment on the weapon's instance instead. The two never apply at once, because the cast picks
one target: the weapon if there is one, otherwise the body.

- **Only the right hand counts.** The endow is on the blade that strikes, not on a shield or a second blade.
- **The strength is the endower's Potency.** `value` holds the element, `level` the skill level for the attack bonus.
- **`WeaponEndowment` binds and lifts it.** It changes the worn copy and its bag copy on the tick, marks the stats
  for a recalc, and writes the row in the background.
- **Aspersio and an endow replace each other.** Endow removes Aspersio and an endow on the body. Aspersio lifts the
  endow off the weapon.

# The Ground and Dispel

When an enchanted item drops, the ground item entity gets an `ItemEnchantments` component, filled from the rows. That
makes it a normal entity for the rest of the server:

- **Dispel can target it.** A ground item with enchantments counts as a target. The chance is
  `Dispel base chance × min(1, P dispel / strength)`, and the target's SMDEF does not apply. A `dispelThreshold` in
  `item_enchantments.yml` refuses a weaker cast outright, like the Keepsake Ward's 60.
- **A dropped weapon keeps its endow.** The drop copies the live enchantments onto the ground item, so a Sage can
  lift a dropped endow, against the endower's Potency.
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

All three steps are built:

1. Definitions, the table, the scripts interface, and the tooltip line that lists an item's enchantments.
2. Endow on the weapon, through `Equipment` and the recalc.
3. Enchantments on ground items, Dispel on a ground target, and `SealReturn` for the
   [postal system](/docs/mechanics/towns-trade/postal/).

The Artificer's permanent enchantments wait with the parked Magic Artisan skill.
