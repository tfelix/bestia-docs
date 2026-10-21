---
weight: 710
title: Overview
description: Documentation about using the public REST API. This can be acessed to fetch live ingame data for analytics.
draft: false
---

The Bestia game will get an extensive and public API to allow external developer to interface with the gameworld and create their own solutions, apps and extension. But for now we need to get the game started.

A first consumer for that API is already designed: the [Companion App](/docs/mechanics/companion-app/)
page sets out what a mobile client would read and write, and the rules it has to obey.

It does not run inside the zone-server. A separate service serves it, under `/v1/companion/`, and pushes live
events over a WebSocket. See [API Service](/docs/server/api-service/). The service describes itself as an OpenAPI
document at `/v1/companion/openapi.json`, which the companion app generates its types from.

{{< alert context="warning" text="The REST API will get fully designed and documented when the game is live." />}}
