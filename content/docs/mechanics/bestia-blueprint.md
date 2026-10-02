---
title: Bestia Blueprint Calculator
description: "The calculator section of Designing a Bestia, kept in its own file."
build:
  render: never
  list: never
  publishResources: false
---

This calculator runs the method above. Pick a level, a tier and a role. It fits the attributes, attack power and HP so
that a master of the same level gets the target fight, then prices the fight in EXP and loot.

Change anything and the numbers follow. A badge says when a result leaves its target band, and a warning says why.
Under **By hand** you can set the stats yourself and see what they do to the balance and the EXP.

Attacks and loot come from the [Attack List](/docs/mechanics/attack-list/) and the [Items List](/docs/mechanics/item-list/).
A drop only needs an item and a chance; its value comes from the list.

When the bestia is done, **Copy LLM prompt** gives a prompt with the blueprint as JSON. Paste it into a coding
assistant in `bestia-behemoth` to create the mob file, AI profile, attacks and translations. **Load JSON** takes an
exported blueprint back into the form.

{{< bestia-blueprint >}}
