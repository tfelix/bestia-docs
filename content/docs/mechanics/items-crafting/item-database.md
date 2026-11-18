---
weight: 9100
title: Item Database
description: Every item of the game, from herbs and ores to weapons and armor, with filters by category, slot and type.
aliases:
  - /docs/mechanics/items-crafting/item-list/
  - /docs/mechanics/items-crafting/equip-list/
---

Every item of the game, equipment included. Narrow the list down by category, equipment slot, weapon or armor type and
material. The filters stay in the address bar, so a filtered view can be shared as a link. For how items and gear work in
general, read [Items](/docs/mechanics/items-crafting/items/) and [Crafting](/docs/mechanics/items-crafting/crafting/).

Items marked **Not in game yet** are designed but not built.

{{< itemdatabase >}}

# Contributing

The items live in `data/items.yaml`. The game is the source of truth: `tools/sync_items.py` rebuilds the file from the
game's item catalogue. Here you only set what the game does not know: a reference `value` for the
[Bestia Blueprint Calculator](/docs/mechanics/bestias/bestia-design/#bestia-blueprint-calculator), an `icon`, a
`description` that replaces the game's text, and items with `planned: true`.

To link one item from another page, write `{{</* item "furnace_kit" */>}}` (shows the item's name) or
`{{</* item "furnace_kit" "a furnace" */>}}` (shows your text). The id is the item's id in `data/items.yaml`, and an
unknown id fails the build. Inside another shortcode's parameter, write a plain link to
`/docs/mechanics/items-crafting/item-database/?id=furnace_kit` instead.

If you want to generate item icons, try to mimic the current style. Please use the following prompt for
[ChatGPT](https://chatgpt.com/):

> Can you generate a 128x128 pixel icon to be used in a game. It is a MMORPG and the art style should be manga like drawn, primary pastel colortone with a watercolor coloration.
> The icon should fit nicely in this 128x128 space, so dont leave much whitespace in the corner if possible. Leave the background plain white (#FFFFFF). The perspective is from the front, slightly diagonally left above the object.
> The icon is an illustration of an item. What it should show:
>
> [YOUR ITEM DESCRIPTION]

{{< alert context="info" text="The AI will most likely not stick to the 128x128px limitation. But this is okay as long as the resulting icon is square we can manually resize it. A higher resolution might not be that bad in the end." />}}
