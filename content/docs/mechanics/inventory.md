---
title: Inventory
menu_icon: fas fa-box
---
# <i class="fas fa-box"></i> Inventory

The inventory is an important system for interaction between the player and the game mechanics. It must be easy to access
and logical build. Each Bestia has its own inventory. So the player must be careful to exchange items between the
Bestias in time. Trading must be fast to do to reduce the annoyance.

If a Bestia/Entity is killed and has had some items inside its inventory usually the items are dropped and can be looted.
In case a player killed a mob the loot will be protected for a few seconds so he can loot it.

## Weight Limit

Items weight is given by units of about 1kg per unit. The smallest division is 0.1 units which aproximates to 100gr.
The maximum amount a Bestia can carry is dependent on its strength and its vitality. The
[Packhorse skill](/mechanics/skills/#packhorse) can  increase the carriable weight limit. The formula is given as:

```kotlin
limit = STR / 2 + VIT / 5 + 15 + LEVEL / 10
```

Please not that depending of your used up weight limit regeneration of certain [status values](/mechanics/statusvalues)
might be affected.
