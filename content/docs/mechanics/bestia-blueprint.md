---
weight: 9300
title: Bestia Blueprint Calculator
description: "Turns a level, tier and role into a balanced bestia blueprint: attributes, HP, attacks, EXP and loot. Exports JSON and a prompt to create the bestia in the game."
---

This calculator runs the method from [Designing a Bestia](/docs/mechanics/bestia-design/). Pick a level, a tier and a
role. It fits the attributes, attack power and HP so that a master of the same level gets the target fight, then
prices the fight in EXP and loot.

Change anything and the numbers follow. A badge says when a result leaves its target band, and a warning says why.
Under **By hand** you can set the stats yourself and see what they do to the balance and the EXP.

When the bestia is done, **Copy LLM prompt** gives a prompt with the blueprint as JSON. Paste it into a coding
assistant in `bestia-behemoth` to create the mob file, AI profile, attacks and name key. **Load JSON** takes an exported
blueprint back into the form.

{{< bestia-blueprint >}}
