---
weight: 700
title: Scripting
description: "Overview of Bestia's scripting approach, current limitations, and internal APIs for customizing items, attacks, and effects."
---

The game currently does not have a dedicated script system. Every item, status or attack effect are hardcoded as a class into the source code. There might be an addition of a dedicated script API in the futre. But because of performance reasons and simplicity the support for it was droppt. However it still make sense to give you an overview of the internal APIs which are there and can be used to change the effects of items, attacks and so forth.

{{< alert context="warning" text="The scripting API will get fully designed and documented when the game is live." />}}