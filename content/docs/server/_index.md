---
bookCollapseSection: true
weight: 20
---
# Bestia Server

<a class="github-button" href="https://github.com/tfelix/bestia-behemoth" data-icon="octicon-star" data-size="large"
data-show-count="true" aria-label="Star tfelix/bestia-behemoth on GitHub">Star</a>
<a class="github-button" href="https://github.com/tfelix/bestia-behemoth/subscription" data-icon="octicon-eye"
data-size="large" data-show-count="true" aria-label="Watch tfelix/bestia-behemoth on GitHub">Watch</a>

The server is responsible for generating the whole game logic. It sends out the game state to the connected clients and performs AI calculations and world simulation.

The server tech stack consists out of a MariaDB instance, Cassandra and Neo4J. These are containerized by Docker. Additionally there is also the API server which enables a REST API for clients to log into the game.

The basic server design relies on using Akka as the framework to form a so called cluster from multiple nodes. As soon as the cluster is formed the basic Bestia entities which represents all in game elements (player, things the player can interact with, buildings, enemies etc). The entities are distributed between the cluster nodes and so are the incoming player controls for these entities. If the system needs to scale up its easily possible to just spawn more cluster nodes to distribute the load.

<script async defer src="https://buttons.github.io/buttons.js"></script>
