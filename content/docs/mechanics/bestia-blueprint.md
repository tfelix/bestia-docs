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

Work through the steps from top to bottom. Each step has the fields you fill in, then a grey **Result** panel that
shows what they do. The bar at the top keeps HP, EXP and threat in view while you scroll. A badge says when a result
leaves its target band, and a warning in the **Balance** step says why. There you can also set the stats by hand and
see what they do to the balance and the EXP.

Attacks and loot come from the [Attack List](/docs/mechanics/attack-list/) and the [Items List](/docs/mechanics/item-list/).
A drop only needs an item and a chance; its value comes from the list.

When the bestia is done, **Copy LLM prompt** gives a prompt with the blueprint as JSON. Paste it into a coding
assistant in `bestia-behemoth` to create the mob file, AI profile, attacks and translations. **Load JSON** takes an
exported blueprint back into the form.

{{< bestia-blueprint >}}
