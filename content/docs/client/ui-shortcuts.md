---
weight: 100
title: Shortcuts System
description: Overview and usage of the shortcut system for quick item and action access.
---

The Shortcuts system allows players to quickly access items and actions by assigning them to configurable hotkeys. It features drag-and-drop assignment, automatic persistence, real-time inventory synchronization, and support for custom behavior through scripts.

## Overview

Players assign items or actions from the inventory to shortcut slots using drag-and-drop. When a shortcut key is pressed, the corresponding action executes. The system automatically:

- Saves shortcuts to disk and restores them on game start
- Updates shortcut item counts when inventory changes
- Executes custom scripts or default item/action behavior
- Integrates seamlessly with the inventory system

## How It Works

Connect the Shortcuts node to the Inventory node via the editor.

### Assigning a Shortcut

1. Player drags an item or skill icon from inventory or attack list
2. Player drops it on a shortcut slot
3. Shortcut updates with the item's icon and count
4. Shortcut is automatically saved to disk

### Using a Shortcut

1. Player presses the assigned key
2. If a custom script is set, it runs custom logic
3. Otherwise, the default action executes (use item or trigger action)
4. Server receives the command

### Input Map

Define shortcut actions in `Project Settings > Input Map` following this pattern:

- `shortcut_0_0` → Key Q
- `shortcut_0_1` → Key W
- `shortcut_1_0` → Key E

Pattern: `shortcut_[row]_[number]`

## Data Format

Shortcuts are stored as JSON in `user://shortcuts_config.json`:

```json
[
  {
    "row": 0,
    "number": 0,
    "data": {
      "type": "ITEM",
      "reference_id": 100,
      "custom_script": ""
    }
  }
]
```

## Common Tasks

```gdscript
# Get item count
var count = inventory.get_item_count(item_id)

# Clear all shortcuts
shortcuts.clear_all_shortcuts()

# Save/load manually
shortcuts.save_shortcuts()
shortcuts.load_shortcuts()

# Check if empty
var data = container.get_shortcut_data()
if data.is_empty():
    print("Empty")
```

## Custom Scripts

Create custom shortcut behavior by extending `ShortcutScript`. This script must be registered in the skill or item resource which describes either entity.

```gdscript
extends ShortcutScript

func execute(shortcut_data: ShortcutData) -> void:
    var item = get_item(shortcut_data.reference_id)
    print("Using: ", item.name)
```

## Extending the System

### Add a New Shortcut Type

1. Add to `ShortcutType` enum in `shortcut_data.gd`
2. Add handler in `ShortcutContainer.trigger_shortcut()`
3. Update drag data check in `_can_drop_data()`
4. Add display logic in `_update_display()`

### Add UI Features

Extend `ShortcutContainer` to add cooldown displays, labels, or other visual feedback.

## File Locations

- Config file: `user://shortcuts_config.json`
- Windows path: `C:\Users\[User]\AppData\Roaming\Godot\app_userdata\[ProjectName]\shortcuts_config.json`
