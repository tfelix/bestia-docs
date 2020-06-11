# Server Architecture

Bestia uses a entity actor system for management and active control of its entities. Each entity is registered via an in memory actor. When entity interact they communicate via the Akka messaging system. Components are child actors of an entity actor and they can send messages to other entities or components.

## Entity Component Services

Entities are described by dynamically attaching components to them. [ECS system](https://en.wikipedia.org/wiki/Entity_component_system) have been proven as a de facto industry standard for recent game development. The components only contain the data are attached to entities which merely are an ID in the system. The so called systems act upon this data and alter the entities usually this is the case in a fixed tick amount for game logic updates. Since the Bestia system is event based and not tick based we use a little different approach. We define services which work on entities and their components. These services are triggered by Akka Actors in case a event message arrives. This architecture allows a better usage of computing resources in a clustered server environment.

A entity factory will create a entity, save it into the memdb and also start a sharded entity into the cluster. The factory will also create and setup components which might have also active actors. If a component is created, altered or deleted these calls are intercepted via a configurable callback. Usually the component instances are cached for some amount of time to lessen the strain on the garbage collector. Upon creation of the component a message might get sent into the actorsystem to start up a component based actor which will then in turn control some execution specific operation like periodic health regeneration ticks.

## Create Entities

The first step into an usable entity are entity creators. They take alle domain data input or simple argument input
and server as a helper function or a builder for usable a complete entities which are outfitted with components. They
create the blueprints this is a building plan for the real entity factory for entity creation. The blueprints can
either be created programmatically but they might also get statically described via JSON files which in turn then can
be loaded by the software to create static entities (the created entities can of course later then be adjusted via
scripts at runtime).

# Entity Resource Cleanup

The inner world representation relies on entities with associated component data. The problem is in order to manage this
entities in a message based way there must be also an active actor present to receive these messages and react
accordingly. This actor capsules the logic of the entity but might also have child actors if certain components require
them (like for example a script callback trigger actor which will trigger script callbacks in certain intervals). If
components or entities are deleted not only should the object instance be reused, these resources must also be reliably
cleaned up.

## Internal Messaging

Akka messages should only be send from actors to actors. This keeps the messaging system away from the service
structures thus allowing a clean separation of concerns.
The main entry point of message digestion is the DigestExActor. Connection and authentication Client performs
Authentication → Server accepts authentication → Webserver established connection → notifies client and
server → server spawns client entities and updates client.
Client Connection Actors hold the connection to the client and are used as a sharded actor. Updates to this
certain client are sent to the sharded actor.

## Component Synchronization

### Interest Management

To optimize performance clients are divided into certain areas called area of interest (AOI). Only clients having a
receive enabled entity (usually bestias) inside an AOI are receiving updates of what is happening around them. These
receivable entities are realized via a component attached to a entity. All such entities enable players to receive
updates. The update packets are marked with a flag from which entity the observation was done.
The server needs to keep track which entities are within a certain interest zone. This is done directly via the x and y
coordinates of an entity.

As soon as a transmittable Component changes the system automatically searchs for entities which needs an updated. The
updated component is then transmitted to these entities or connected players.

## Client Server Communication

### Datatypes

All locations and entities are represented via fixed point numbers to avoid incorrectness with floating points over a bigger distance [(see The perils of floating point](http://www.stat.cmu.edu/~brian/711/week03/perils-of-floating-point.pdf)).

The basic datastructures for positioning and collisions are found in `net.bestia.model.geometry`. Most notable the `Vector3` datatype.

It uses long as datatypes for the coordinates and thus has a range between `-9.223.372.036.854.775.808` to
`9.223.372.036.854.775.807` which means if we can represent at the best a position resolution of 1mm. So our
maximum world size is:

| Size                    | Unit |
| :---------------------- | ---: |
| +-9.223.372.036.854.775 |    m |
| +-9.223.372.036.854     |   km |

which is more then enough.

### Binary Protocol

Bestia uses [ProtoBuf](https://developers.google.com/protocol-buffers) descrition file in order to communicate with its connected clients. The description files can be found in the [bestia-protobuf](https://github.com/tfelix/bestia-behemoth/tree/master/bestia-proto-messages) module in the main repository.

## Literature

[Save States of Actors](https://medium.com/@takezoe/save-state-of-actor-using-akka-persistence-a9111ff2c42b)
[Testing persisting actors](http://tudorzgureanu.com/akka-persistence-testing-persistent-actors/)
[Load Balancing Akka Clusters](http://blog.kamkor.me/Akka-Cluster-Load-Balancing/)