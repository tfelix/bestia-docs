---
weight: 300
title: Entity Sync
description: How server entities become Godot nodes, client-side movement prediction, Master vs. Bestia, and the data-driven Resource + DB pattern.
---

Every networked "thing" in the world — the player's own Master, other players' Masters, Bestia
(creatures/mobs), dropped items — is represented client-side as a generic `Entity` node with a
swappable `Visual` child that supplies the actual per-kind look and reactions.

# EntityManager — the entity registry

`src/Game/entity_manager.gd` is a scene-local node (found via
`get_first_node_in_group("entity_manager")`, not an autoload — it only makes sense while the
`Game` scene is loaded). It owns a `Dictionary[int, Entity]` keyed by the server's entity id,
lazily creating an `Entity` node the first time a message references an unseen id, and is the
single dispatch point that routes every incoming `EntitySMSG` subtype to the right `Entity`
method:

```gdscript
func _on_entity_message_received(msg: EntitySMSG) -> void:
    var entity = _get_or_create_entity(msg.EntityId)
    if msg is PositionComponent: entity.update_position(msg)
    elif msg is BestiaVisualComponent: entity.update_bestia_visual(msg)
    elif msg is CastingComponentSMSG:
        if msg.Removed: entity.clear_casting()
        else: entity.update_casting(msg)
    ...
```

This mirrors the server's ECS component model: each SMSG is effectively one component update, and
`Entity` acts as the reducer that folds it into local state. `EntityManager` also tracks
`_owned_master_entity_id` (populated from `SelfSMSG`) and exposes `get_owned_entity()` for
anything that needs "my own character" (HUD, camera, input).

{{< alert context="warning" text="Only one owned entity is tracked today. Pet/owned-Bestia ownership isn't wired up yet." />}}

# Entity — client-side movement prediction

`src/Game/Entity/entity.gd` (`class_name Entity extends Node3D`) doesn't just snap to server
positions — it predicts movement locally and reconciles against authoritative updates:

- A `PathComponentSMSG` gives a queue of tile waypoints and a speed; `Entity` walks that queue
  itself every frame instead of waiting for a position update per tile.
- An authoritative `PositionComponent` (a whole-tile correction) is folded in gradually by
  nudging speed over a short `_CORRECTION_TIME` window, rather than snapping instantly — this
  keeps movement visually smooth despite network jitter. Only when the discrepancy exceeds
  `_SNAP_STEPS` tiles does it snap outright (e.g. after a teleport).

`Entity` also caches the last-known buffs, skill points, equipment and status values it has seen,
so UI windows (Skills, Equipment, Status) can seed their display immediately when opened instead
of waiting on the next server push.

# Visual — per-kind appearance

`Visual` (`src/Game/Entity/Visual/visual.gd`) is a stub base class (`show_damage`,
`update_health`, `update_animation`, `set_selected`, `show_chat`, ...). `Entity` swaps in one of:

- `MasterVisual` (`Visual/MasterVisual/master_visual.gd`) — the player-controlled avatar.
- `BestiaVisual` (`Visual/BestiaVisual/bestia_visual.gd`) — creatures/mobs; owns a name tag,
  health bar and cast bar, and is the actual `Area3D` click/hover target (reports clicks to
  `MouseManager`, see [Interaction](/docs/client/interaction)).
- `ItemVisual` (`Visual/ItemVisual/item_visual.gd`) — dropped-item pickups.

as a child node named `"Visual"`, and delegates through `_get_visual_for_method` — so it's fine
for a given visual to only implement the subset of methods relevant to its kind.

# Master vs. Bestia

**Master** is the player's own controlled avatar. There is no `Master` script/class at all —
`src/Game/Master/` only holds static model assets (mesh, textures, idle animation) consumed by
`MasterVisual`. "Which entity is mine" is tracked entirely in `EntityManager`, not on the entity
itself.

**Bestia** is a creature/mob species, described by small, data-driven metadata the client needs
locally but doesn't want streamed on every spawn:

```gdscript
# bestia_resource.gd — regenerated from the server's mob YAML via `./gradlew syncBestiaDb`
class_name BestiaResource extends Resource

@export var bestia_id: int
@export var equip_slots: int  # bitmask — which equipment slots this species has
```

`BestiaDB` (`src/Game/Bestia/bestia_db.gd`) scans `Game/Bestia/DB/*.tres` once at startup and
looks species up by id — the same shape as `ItemDB` and `AttackDB` below.

# The recurring Resource + *DB pattern

Three separate systems reuse the same shape for static, per-id game data that's authored as
`.tres` files and looked up at runtime by an id that matches the server's data:

| Data | Resource class | DB singleton | Directory | Keyed by |
| --- | --- | --- | --- | --- |
| Items | `item_resource.gd` | `ItemDB` (`item_db.gd`) | `Game/Item/DB/` | `item_id` |
| Attacks/Skills | `attack_resource.gd` | `AttackDB` (`attack_db.gd`) | `Game/Attack/DB/` | `skill_id` |
| Bestia species | `bestia_resource.gd` | `BestiaDB` (`bestia_db.gd`) | `Game/Bestia/DB/` | `bestia_id` |

Each `*DB` singleton directory-scans its folder once, caches every `Resource` by id, and hands
back "unknown id" gracefully (logging, not crashing) when a server message references something
the client's `.tres` files haven't caught up with yet — since these files are hand-authored or
synced separately from the server's source of truth and can drift.

`ItemResource` additionally carries `name_key`/`description_key` — localization lookup keys
resolved via `tr(...)` against `Localization/items.csv`, not stored as literal text (the same
mechanism `AttackResource.description_key` uses against `Localization/skills.csv`). It also
supports an optional `item_script` (a custom `ItemUse` subclass, `item_use.gd`) for scripted item
behavior like a targeted potion, which routes through `MouseManager`'s item-targeting mode instead
of firing immediately — see [Interaction](/docs/client/interaction).

Live inventory *state* (what a player actually owns) is not part of this pattern — it's runtime
data owned by `Game/UI/Inventory/inventory.gd` (see [UI Overview](/docs/client/ui-overview)),
built from `InventoryComponentSMSG` and cross-referenced against `ItemDB` only for the static
parts (icon, name, description).
