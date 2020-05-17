# Client Architecture

## Entities

The Bestia server entities are synced to the client also represented there also under the name `Entities`. An entity is described by a set of components which is attached to it and by a certain kind of logic synched between the client and the server. Not every component is synched though. This can depend on various factors for example party membership (ConditionComponent is only synched between members of the same party), or ownership or view distance (mostly only entities in view distance are synched).

## Interaction Behavior

When the player wants to interact with an entity we must provide a way to fast and easy detect the default interaction between the player and the entity. There are several problems here:

* Interaction options can vary on dynamics like equipment and need to be checked by a server side script
* Interactions must be saved for a group of entites so the player does not check every enemy he wants to attack
* There should be sensible defaults. Items should be picked by default, enemies attacked

### List of Interactions

* Attack<sup>1</sup>
* Talk
* Read
* Use
* Trade
* Pickup
* Construct
* Gather Resources

<sup>1</sup>: Attack is always possible for entites as each entity should be attackable in the game.

### Grouping of Entities

The grouping is hard to determine as the engine has no real clue which type an entity belongs to. For the player the most distinctive visual clue would be the entity model  which is used for display.

The `BehaviorService` is responsible for checking the possible interactions and presenting the player the usable options, the algorithm is as follows:

{{< mermaid >}}
graph TD
  s1[Request Interaction list from server]-->s2[Is saved default interaction present?]
  s2-- Yes -->s3[Is default interaction present in list?]
  s3-- Yes -->s4[Did user request manual selection?]
  s4-- Yes -->s6((Open Interaction Menu))
  s4-- No -->s5((Perform interaction))
  s2-- No -->s7[Fetch default interaction for entity]
  s7-- Found -->s5
  s7-- Not Found-->s6
{{< /mermaid >}}
