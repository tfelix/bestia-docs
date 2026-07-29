---
weight: 600
title: UI Overview
description: A map of the in-game UI screens and HUD widgets under Game/UI.
---

All in-game screens live under `src/Game/UI/`. The hotbar/shortcut system has its own dedicated
page — see [Shortcuts System](/docs/client/ui-shortcuts) — everything else is summarized here.

| Screen | Key file(s) | Purpose |
| --- | --- | --- |
| Chat | `Chat/chat.gd` | Chat log + input. Mode switching via `/s`, `/p`, `/g` prefixes or a dropdown; command history (Up/Down); local-only `/clear`. Sends via `ConnectionManager.send_chat(text, mode)`. |
| Inventory | `Inventory/inventory.gd`, `InventoryItem/`, `DropAmountDialog/` | Live per-entity item list built from `InventoryComponentSMSG`, split into usable/equip grids. Supports drag-to-equip and drag-to-ground-drop (amount-confirm dialog for stacks > 1). |
| Equipment | `Equipment/equipment.gd`, `EquipSlot/` | One `EquipSlot` per `EquipmentSlot.Slot`. Greys out slots the viewed entity's species doesn't have (Master = all slots, Bestia = `BestiaDB.get_equip_slots`, see [Entity Sync](/docs/client/entity-sync)). Equip/unequip round-trips through `ConnectionManager`. |
| HUD (Master Profile) | `MasterProfile/master_profile.gd`, `ProfileBar/`, `ProfilePortrait/` | Top HUD: name, level, position, HP/mana/stamina/exp bars, carry weight. Also hosts the toggle buttons for Inventory/Skills/Equipment/Status — polls `Input.is_action_just_pressed` rather than `_unhandled_input`, since sibling `Window`s can steal input focus. |
| Skills | `Skills/skills.gd`, `SkillRow/` | Renders a `SkillListSMSG` as rows; buffers point spends locally per row until Confirm (`ConnectionManager.invest_skill_points`). Hides the point-spend UI when viewing a Bestia's skill tree (server-authoritative, no client investment). Skill data itself comes from `AttackDB` (see [Entity Sync](/docs/client/entity-sync)). |
| Status Points | `StatusPoints/status_points.gd`, `StatusRow/`, `status_attribute.gd` | Same buffered confirm/cancel pattern as Skills, for base attributes (STR/AGI/VIT/INT/DEX/WIL). Values are pushed proactively by dirtyable server components — no explicit refresh request needed. |
| Buff List | `BuffList/buff_list.gd`, `BuffIcon/` | Top-right HUD row of buff/debuff icons for the owned Master only, rebuilt from `BuffListSMSG`. |
| Context Menu | `ContextMenu/context_menu.gd` | Minimal right-click `PopupMenu`. Currently a stub with no actions wired up yet — a placeholder for future Attack/Trade/Inspect entries. |
| Ground Drop Zone | `GroundDropZone/ground_drop_zone.gd` | Full-screen fallback drag-drop target: anything dropped off a real slot lands "on the ground" (`ConnectionManager.drop_item`). |
| Widget Window | `WidgetWindow/widget_window.gd` | Generic draggable/closable chrome (`content: PackedScene`) used to host Inventory, Skills, Equipment and Status Points as independent floating panels. Auto-sizes to its content and clamps its position to the viewport. |
| Options (ESC menu) | `Options/options.gd` | Despite the name, this is the in-game **ESC/pause menu**, not a settings screen — Continue / Master Select / Disconnect / Exit, all funneled through a cancellable, server-confirmed logout countdown (see [Scenes & Menus](/docs/client/scenes-and-menus)). |
| `ui.gd` (root) | `Game/UI/ui.gd` | Wires the `WidgetWindow`s together at runtime (their content only exists after `_ready()`), toggles their visibility from `MasterProfile`'s buttons, and connects Inventory ↔ Equipment for drag-to-equip and worn-item filtering. |

# Related VFX

A few small, self-contained effects under `src/Game/VFX/`, driven directly by server messages rather than gameplay code:

- **`HealthBar/health_bar.gd`** — a billboarded `Sprite3D` progress bar above an entity;
  `update_health(HealthComponentSMSG)` shows it and restarts a fade-out timer after a few seconds
  of no further damage.
- **`CastBar/cast_bar.gd`** — shown while an entity channels a skill. `CastingComponentSMSG`
  carries total/remaining seconds; between server re-syncs the bar ticks down locally for
  smoothness. `Removed = true` on the same message type hides it (a normal cast completion looks
  identical to a cancelled one at this layer).
- **`AOECastIndicator/aoe_cast_indicator.gd`** — a rotating ground decal resized to an attack's
  `aoe_radius` while in skill-targeting mode (see [Interaction](/docs/client/interaction)).
- **`EntitySnapIndicator/`** — a scene-only marker shown over whichever entity a skill-target snap
  has currently picked.

# The WidgetWindow pattern

Inventory, Equipment, Skills and Status Points are all plain scenes wrapped in the same
`WidgetWindow` chrome rather than being bespoke floating panels each — one drag/close/resize
implementation serves all four, and `Game/UI/ui.gd` just plugs a different `content` scene into
each instance. If you're adding a new floating panel, follow this shape instead of building window
chrome from scratch.
