---
title: Improvement Proposals
---
# Improvement Proposals

BIPs are used to describe some technical details about subsystems which are in use to improve the Bestia game. If they
are in a draft state they are not included into this document but as soon as they are worked out they are included and
are awaiting implementation.

Implementation of a BIP is done in a own branch named after the pattern: feat-bip-N where N is the number of the BIP.

## BIP 1 - ClientVars

> Implemented

The user client should be able to save variable data to the server in order to persist certain client settings. This
data should be retrieved via a KEY-VALUE association. The data is piped through the ClientVarService which checks and
loosely validates the data. This is important to prevent DDOS attacks from the client by spamming the server with
unusually large data. The service should be used if the server does not need to have a clue about the incoming data
and acts only as a dumb storage device.

In the first implementation this ClientVars should be used to save the client shortcuts. But it can also be used to
declare some kind of public vars to be shared between multiple clients for example, like configuration. Please note
that this kind of storage is for data which must be persisted between client logouts or between different machines of
the same user. The system is NOT intended to be used as a real time messaging solution between the clients.

### Technical Details

The client sends a `Signal.CLIENT_VAR_REQUEST` with a key and a callback (and error callback) function. The
`ClientVarManager` will look if there is already a request running for this key and if so it will queue up the callback
function towards this key and invoke it along with the other function upon server response.

After a configurable delay and if no server response is given or the server signals the missing of this key the callback
error function is called otherwise the data is transformed to a JSON object and handed to the callback function.

### Message format

#### Request

```json
{
  key: STRING // The requested key.
}
```

#### Reponse

```json
{
  key: STRING // Same key from the request.
  data: STRING // Serialized JSON
}
```

## BIP 2 - Latency estimation

> Partly implemented

Um dem Spieler ein möglichst synchrones Spielerlebnis zu gewährleisten ist es wichtig die Latenz der Spieler untereinander zu kennen um so zum Beispiel Laufwege zu realisieren die zum gleichen Zeitpunkt enden. Dafür ist es wichtig die aktuelle Latenz des Spielers zum Server zu kennen. Zu diesem Zweck sendet der Server in regelmäßigen Zeitabständen einen PingRequest, mit einer ID und einem Timestamp, an den Client. Dieser antwortet darauf mit einem PingAnswer und dieser ID. Der Server kann dann zusammen mit der Ankunftszeit dieses Paketes die Latenz zu diesem Client abschätzen.

Diese Pakete werden alle 10 Sekunden gesendet und es wird ein Sliding Average der Ping Werte über 5 Messungen gebildet. Dabei wird der Median gebildet. Das Ergebnis nutzt man um alle Events zu korrigieren die eine gewisse Dauer in Anspruch nehmen. Dies sind vor allem Laufevents und Animationen über eine bestimmte Dauer (Zauber).

Zur Korrektur wird die ursprüngliche Animationsdauer um die Latenzzeit subtrahiert. All messages denoting a duration should also contain the latency estimation value.

Siehe: [http://www.dynetisgames.com/2017/03/19/latency-estimation-phaser-quest/](http://www.dynetisgames.com/2017/03/19/latency-estimation-phaser-quest/)

## BIP 3 - Debug mode

> Not implemented

The PhaserJS Client should have a debug mode in which the programmer can alter some enviromental data independently of the server state.
In order to ease up the development visual helpers should be used to visualize some effects like the collision map or other data like the brightness or weather effects.
The mode should be controlled via chat commands. Instead of going to the server these commands should be routed towards the global config object inside the engine. Clients in production should have this feature removed.

### Technical Details

To implement this features two components are needed one is the chat command module which will register itself and send the commands to the engine.

The second one is the engine module which will alter the engine (adding sprites, filter etc.) to display the otherwise invisible information. Most likely there will be an engine module for each debug command. They are all managed by a DebugCommandManager who can be easily be removed during a production build and orchestrates the calls for the different phaser states onConstruct, onUpdate and onRender.

### Commands

Is the command called without parameter the current state of the engine is requested and displayed. The commands shown in this document are not final. If new debug commands are added later the list here should be extended.

#### /debug 1|0

Schaltet das komplette Debugging aus oder ein. Dabei werden einige standard Befehle umgesetzt wie zum Beispiel die Anzeige der FPS aktiviert. /debug engine 0 deaktiviert alle Debugging Protokolle der Engine und bringt sie wieder in einen normalen Ausgangszustand zurück.

#### /debug fps 1|0

Enables or disables FPS counter.

#### /debug daytime [0-23]

Switches the daytime of the engine to the given hour.

#### /debug weather [sunny, cloudy, foggy, rain, thunderstorm]

Changes the weather system into one of the presets.

#### /debug environment light 1|0

Switches environmental lighting on and off.

## BIP 4 - Dynamic Client UI

> Not implemented

This module enables scripts to completely control the user interface on the clients. This can be used to easily enable new scripts who needs a good control over user interaction. The module needs three important functionalities:

1. It must be able to push GUI elements to the client engine which are then displayed.
2. It must have the ability to later control these elements with data updates.
3. It must provide a back channel so the user can click buttons or enter text input.
4. Optionally: It should be able to translate the UI into all the supported languages by the Bestia game.

### Technical Details

The UI components should be implemented as HTML snippets similar to the GUI elements. The engine can load and display them on demand by specifying an ID. KnockoutJS can be used to bind the data model to the UI.

By creating such a user UI a script should generate a UUID since we must uniquely identify the UI element the user is interacting with.

Before the data is sent to the user a scriptRemoteUId is generated. This is basically a UID which maps to a script component id and entity id. This is important so the script IDs are hidden from the client and the data send back from him has no way to guess a script id and send spoofed data towards it.

#### Data Updates

In order for the script to update the data to the user it just sends a gui request message again with a updates data section (as seen in the examples). The client will only update the data model if the GUI with the associated uuid is already active.

#### User Control

If the user interacts with the model, changes the data the GUI should either send the data on every change or via some kind of user triggered event (e.g. like closing the UI, clicking a "send" button). How to trigger the data transfer is up to the UI code. The whole data model is then transferred back to the server. Since this data comes from the client the script is not directly fed with the data. The script remote uid is translated back towards a component and script id and then the JSON data should be sanitized and send back to the script into a callback. See: [https://stackoverflow.com/questions/9676423/how-to-pass-json-object-from-java-to-javascript](https://stackoverflow.com/questions/9676423/how-to-pass-json-object-from-java-to-javascript)

The script callback is determined by the script if the data is sent to the user and must be saved on the server side.

There should also be an easy API call to clean up all resources on the server the script-client communication did consume. If there is no interaction with the client for some time (maybe some minutes) the server resources should be freed automatically.

#### Translation

For the alpha status of the game no translation is performed. The implementation is done in english. Translation facilities have to discussed for a later time.

### Dataformat

### GUI Request Message

```json
{
"uuid": “XXXXXXXX”, // String
"scriptRemoteUid": “XXXXXXX”, // String, ID of the script instance responsible.
"guiElement": “myGUI”, // String, ID which GUI element to load.
"data": {...} // Arbitrary data depending on the script.
}
```
