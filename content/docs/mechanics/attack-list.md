---
title: Attack List
weight: 900
description: Those who master the tools of survival will thrive in a dangerous world. A list of all available attacks.
---

Here find an overview of the available attacks Bestias can learn. A Bestia will only learn a certain subset of those attacks. Finding out which Bestia will learn which attack is part of the fun for the players to explore.

For a better overview the attack list is on a sperate page. If you are interested in general information checkout the dedicated section about [attacks and skill](/docs/mechanics/attacks).

{{< alert context="info" text="The list here might not be always up to date, but feel free to add any missing attacks." />}}

# Attack List

{{< attacklist >}}
  {{< attack name="Minor Heal" icon="minor-heal.png" level="10" mana="10" school="White" >}}
    Recovers the health of a friendly a little bit. A essential spell for every adventurer.
  {{< /attack >}}

  {{< attack name="Heal" icon="heal.png" level="45" mana="25" school="White" >}}
    Recovers the health of a friendly for a fairly amount. Used to treat wounds.
  {{< /attack >}}

  {{< attack name="Greater Heal" level="80" mana="49" school="White" >}}
    Recovers a great amount of health of a friendly unit. It can almost bring bad even the dead.
  {{< /attack >}}

  {{< attack name="Tackle" icon="tackle.png" level="1" mana="2" school="White" >}}
    Quick attack which uses the body weight in a short range melee attack. It does only little damage but is quick and cheap.
  {{< /attack >}}

  {{< attack name="Ember" level="3" mana="6" school="White" >}}
    A weak fire attack which leaves a patch of burning coals on the ground which can hurt if someone steps in. It is said this is often a source of forrest fires. Lasts for `10s`.
  {{< /attack >}}

  {{< attack name="Banished From The Citadel" icon="banished-from-the-citadel.png" level="75" mana="150" school="White" >}}
    A powerful ritual which will undoe your ties to your faction and will redeem you from your skill. Can only be cast on a Bestia Master who wears a [Sigil of Redemption](/docs/mechanics/equip-list/#sigil-of-redemption). Gives a debuff which reduces your stats by `50%` for `Master Lv` days.
  {{< /attack >}}

  <!-- Add more attackcard shortcodes here -->
{{< /attacklist >}}

# Contributing

If you want to generate attack icons try to mimic the current style. Please use the following prompt for [ChatGPT](https://chatgpt.com/):

> Can you generate a 128x128 pixel icon to be used in a game. It is a MMORPG and the art style should be clean and pixel art like, primary with a bright, easy to recognize color scheme.
> The icon should fit nicely in this 128x128 space, so don't leave whitespace at the corners. The perspective is directly looking on to it. It should be a flat 2D icon. Leave the background white.
> The icon is an illustration of an attack skill. No text! But as inspiration for you the description of the attack reads:
>
> [NAME OF THE ATTACK]
>
> [DESCRIPTION OF THE ATTACK]
>
> Only the icon, dont write text.

{{< alert context="info" text="The AI will most likely not stick to the 128x128px limitation. But this is okay as long as the resulting icon is square we can manually resize it. A higher resolution might not be that bad in the end." />}}
