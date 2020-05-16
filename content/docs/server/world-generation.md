# World Generation

Bestia integrates a specialized library called **WorldGen** for world creation. It is a clusterable generator which is cabable of dividing the world creation workload onto multiple, different machines. With this framework it should be possible to create million of square kilometers without hitting any memory limit on the servers during the creation process.

In general it works by creating piplines which are then used to create and transform noise maps. After the noise was modified and generated the map data is created and saved to the Bestia database in chunks via the **Voxel** module.

## World Generation Algorithm

There is basically a pipeline in order to generate the Bestia map, these steps are listed here and described below:

1. Setup of Base Parameters
2. Creating of noise maps based on base parameters
   1. Height Map
   2. Humidity Map
   3. Temperature Map
   4. Mana Map
   5. Population Map
3. Sealevel
4. Erosion Simulation
5. Creating Rivers and Lakes
6. Biome Setup
7. Terrain Features
8. Settlement Creation
9. Resource Distribution
10. Navigation Map Creation

## Base Parameter

The following base parameters are used to generate the map:

* Total Population {{< katex >}}P{{< /katex >}}
* World Size {{< katex >}}W{{< /katex >}} (Depends on expected player count)
* Count of Settlements {{< katex >}}C{{< /katex >}}
* Seed Value {{< katex >}}S{{< /katex >}}
* Maximum Terrain Height {{< katex >}}h{{< /katex >}}
* Seelevel (Normalnull) {{< katex >}}N{{< /katex >}}

The base parameter are generated randomly based on the expected active player count. They are persisted in the database together with some additional map parameters like creation date or name of the world (to keep some kind of history record).

## Noise Maps

The following noise maps are created by the help of [OpenSimplexNoise](https://de.wikipedia.org/wiki/Simplex_Noise) and saved in a shared data storage temporarly until world map generation is finished. In order to save memory its advisable to delete this maps as soon as possible.

Depending on the case the resolution of the heightmaps might be differnt in order to be as memory efficient as possible.

### Height Map

The heightmap {{< katex >}}M_h{{< /katex >}} consists of multiple high and low resolution maps which are added and then normalized to a value between 0-1. The lower resolution should have a frequency of about 2-5m. The highest resolution should have a frequency of roughly 4-5km, to give a sense of a "big" world. Consider maybe 2-3 resolutions in between which a decrease in amplitude.

After the heightmap is created we redistribute the noise values by:

{{< katex display >}}
height_1 = M_{h}^{2.1}
{{< /katex >}}

This will push valleys further down and increase the hill heights. After this we will renormalize the values again between 0-1.

To calculate the final hight multiply this hight with the maximum map height.

{{< katex display >}}
height = norm(height) \cdot h
{{< /katex >}}

> Heightmap resolution is 1m.

In general the map should make the illusion to "wrap" arround, this can possibly archived by pushing everything on the sides under water, or to use a coordinate transform so the the map is actually wrapping around the borders. Which possibility is used for Bestia is not yet decided. As a hint, good shaping function can be done by:

```
e = lower(d) + e * (upper(d) - lower(d))
```

Where `d` is the distance to the center of the map.

#### Ridged Noise

For better initial mountains a special function can be sued which is described as:

```
function ridgenoise(nx, ny) {
  return 2 * (0.5 - abs(0.5 - noise(nx, ny)));
}
```

We can vary the amplitudes of the higher frequencies so that only the mountains get the added noise:

```
e0 =    1 * ridgenoise(1 * nx, 1 * ny);
e1 =  0.5 * ridgenoise(2 * nx, 2 * ny) * e0;
e2 = 0.25 * ridgenoise(4 * nx, 4 * ny) * (e0+e1);
e = e0 + e1 + e2;
elevation[y][x] = Math.pow(e, exponent);
```

### Humidity Map

The humidity map {{< katex >}}M_{hum}{{< /katex >}} represents the total annual rainfall between 0-1. The more the humidity is the more snow or rain fall is to be expected (depending on the temperature).

The humidity map is saved in a reduced resolution for later reference for the dynamic environment simulation.

It slightly reduces the humidity based on the height of the terrain like so:

{{< katex display >}}
hum = M_{hum} - 0.4 \cdot M_h
{{< /katex >}}

> Humidity resolution 100m.

### Temperature Map

The temperature map {{< katex >}}M_t{< /katex >}} represents the annual average temperature between 0-1.
We assume a desired temperature range of -40 to 40 degree. This is shifted of about +/- 10 degrees randomly upon world creation.

As our temperature map initially holds values between 0-1 the conversion is done like:

{{< katex display >}}
t = M_t \cdot 80 - 40
{{< /katex >}}

The temperature is just created as the other maps but then a gradient is added which will increase the temperature towards the middle (equator) of the map by 130% and drop down to top and bottom to 30% of the original value. An example gradient is shown below:

![Example temperature gradient](gradient.png)

It reduces the temperature the higher the hightmap value is down to a value of 10% by the formula:

{{< katex display >}}
t = M_t - 0.9 \cdot M_h
{{< /katex >}}

> Temperature resolution 100m.

### Mana Map

The mana distribution {{< katex >}}M_m{< /katex >}} is a normal noise map without any changes. Its done in two passes, a high frequency and also a low frequency pass. This allows us a rapid alteration in a smaller area while we still have big areas with just a higher mana concentration then others.

> Mana resolution 10m.

### Population Map

The population distribution {{< katex >}}M_p{< /katex >}} is a normal noise map without any changes. But is later heavily modified by influence maps.

> Population resolution 100m.

## Sealevel

The sealevel should chosen that oceans vs landmass ratio is about 20:80. This could be calculated but for now we just assume a fixed height value. Every terrain below is covered by water, the rest is landmass.

## Erosion Simulation

Its loosly based on the [SIGGRAPH 2017](https://www.youtube.com/watch?v=9NXL48-Fbb8&t=1009s) talk. In short random events a placed on the map like a water droplet. This droplet follows the slope downwards a hill and is able to pickup material. If it has reached its maximum carry capacity it starts to deposit a certain material amount again. A good explanation is found in [Coding Adventures: Hydraulic Erosion](https://www.youtube.com/watch?v=eaXk97ujbPQ).

## Creating Rivers and Lakes

Water always flows downhill. In order to simulate the water flow random sources of water are placed at elevated points in the map and then the water flow is simulated down the slope of the terrain.

The creation algorithm works as follows:

1. Decide if a chunk has a spring
2. Detect the spring source

The base probability if a chunk has a spring is given by:

| Avg. Height [m] | P          |
| --------------- | ---------- |
| h < 100         | impossible |
| 100 < h < 1000  | 0.2        |
| 1000 < h < 1500 | 0.3        |
| 1500 < h < 2000 | 0.1        |
| 2000 < h        | impossible |

The average humidity on the map influences the probability P like:

{{< katex display >}}
P_{total} = (0.6 * m_{hum} - 1.5) + P_{base}
{{< /katex >}}

In order to find the coordiante of a water sources on a map and their probability distribution, the map is sampled at a resolution of 10m and theprobability P of a coordiante is given by:

* P increases at heights above NN max is 0.6 and then decreases above
* P increases with humidity above 0.5 - 1.0 from 1.0 to 3.0

{{< katex display >}}
P_h &= height(x, y) / 0.6 \cdot
P_h &= height(x, y) / 0.6 \cdot
P_{droplet} = M_t - 0.9 \cdot M_h
{{< /katex >}}

After these are placed a water stream is simulated flowing from the source down the slopes. In this is an iterative process. The source will spill out a certain amount of water to the tile. In every step a bit water evaporates depending on the surrounding temperature. The simulation is repeated until there is no significant change in waterlevel and it reaches an equilibrium. If the water floats out at the border it is buffered and in a next run it is exchanged with the border tiles. This is again done until there is no significant change anymore and equilibriunm reached.

## Biome Setup

> Note: For the biome calculation you need to calculate the ranges from the given absolute value in the noise map space.

| Biome        | Height [m]     | Temp. [°C]   | Hum.        | Special |
| ------------ | -------------- | ------------ | ----------- | ------- |
| ICE_DESERT   | 0 - &infin;    | -&infin; - 0 | 0 - &infin; |         |
| DESERT       | 0 - &infin;    | 30 - &infin; | 0 - 0.1     |         |
| DRY_FOREST   | 50 - 1200      | 10 - 30      | 0.3 - 0.5   |         |
| MOIST_FOREST | 50 - 1200      | 10 - 30      | 0.5 - 0.8   |         |
| RAIN_FOREST  | 50 - 1200      | 20 - 40      | 0.8 - 1.0   |         |
| MOUNTAIN     | 1500 - &infin; | -            | -           |         |

## Terrain Features

After the Biomes are placed and the heightmap is finalized by erosion simulation there are predefined features placed on the maps. This can be old temples, caves or other quest relevant artifacts for player interaction.

Usually these kind of features are depending on the kind of biome. For example a forrest biome would then run through the tree entity creation. This entities are stored in a database right when they are created via a entity blueprint.

| Biome        | Possible Features                               | Influence               |
| ------------ | ----------------------------------------------- | ----------------------- |
| ICE_DESERT   | Caverns, Ruins                                  | +40% mineral resources  |
| MOUNTAIN     | Caverns, Artefacts                              | +100% mineral resources |
| DRY_FORREST  | Caverns, Ruins, Artefacts, Deserted Settlements |                         |
| MOIST_FOREST | Caverns, Ruins, Artefacts, Deserted Settlements |                         |
| RAIN_FOREST  | Caverns, Ruins, Artefacts, Deserted Settlements |                         |


##  Settlement Creation

Cities usually form around natural resources like shores, rivers or rich farmland. The algorithm as described below will find suitable city position candidates and then distribute the cities in 2 to n clusters around the world map. This clustering will make sure there is enough unexplored land for the players left. It should also help with the idea of different civilization which could lead to ingame player conflicts. A possible distribution is shown in here. *TODO: Include figure*

The algorithm searches the world map and creates matrix with a mesh length of 1km.

* Rohstoffvorkommen (Farmland, Minerals, Fishing Grounds)
* Nähe zu einem Gewässer (Fluss oder Meer)


Folgende Voraussetzungen müssen gegeben sein:

* Karte mit Biom-Zuordnung muss generiert worden sein.

Aufbauen auf der Weltkarte wird eine Influence Map erstellt. Wasserwege geben einen abfallenden Wert vor. Die Auflösung der Influence Map kann geringer sein als die eigentliche Karte. Auflösungen zwischen 100m und 1km erscheinen praktikabel. Folgende Punkte werden auf der Influence Map vergeben und summiert:

* Ist das Biom praktisch um Lebensmittel anzubauen?
* Sind natürliche Ressourcen in diesem Biom vorhanden?
* Wasser Biom in der Nähe gibt Punkte.

Von der Influence Map müssen nun die Punkte entfernt werden die eindeutig keine Besiedlung ermöglichen. Folgende Punkte müssen auf 0 reduziert werden:

* Liegen im Wasser/Lava
* Liegen auf Gebirge
* Liegen im Wald
* Liegen in Gebieten mit sehr hoher Magie

Bei allen verbleibenden Punkten muss überprüft werden ob es sich um ein lokales Maximum handelt. Diese Punkte werden zusammen mit ihrer Gewichtung in eine sortierte Liste aufgenommen. Dabei kann ein wandernder Durchschnitt berechnet werden und Werte unterhalb eines gewissen Schwellwertes verworfen werden.

Koordinaten die dann zu nahe beieinander liegen (< 3-6km) werden aus der Liste entfernt.

Anhand der Punkte auf der Liste werden die Siedlungen berechnet. Zu 70% wird eine Stadt aus der oberen Hälfte der Liste der Reihe nach entnommen. Zu 30% wird eine Siedlung zufällig aus einem Kandidaten der unteren Listenhälfte entnommen bis die Anzahl der gewünschten Siedlungen erreicht ist oder die Liste erschöpft ist. Sollte ein Listenteil erschöpft sein, so wird jeweils vom anderen Listenteil mit dem gleichen Muster vorgegangen.

Erzeugung von Städten

1. Bestimmung der Anzahl der Gebäude anhand der Populationsmenge.
2. Verteilen der Gebäude um den Stadtkern nach einer Gaußkurvenverteilung.
3. Erzeugung der Gebäude-Innenräume nach: https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_division_method

## Resource Distribution

TBD.

## Navigation Map Creation

The navigation map is created for NPC to fast calculate travel paths other long distances. It creates a connected graph network and the output is put into a [Neo4J database](https://neo4j.com/).

* Add nodes for each city, artefact and places of interest (POI's)
* Add a grid of 10 * 10 points and connect them to every next neighbour node (diagonal connections are allowed)
* Weights of these connections is calculated

The guidline for weight is 1 for a normal, easy to walk road. It gets higher for e.g. steeper terrain and if there is a slope between the points is more then its marked as climable.

In order to detect climable terrain we follow the connection between the nodes and if the slope over a distance of 5m is higher than 45° it is marked as 'climb'. The weight for sloped terrain is:

{{< katex display >}}
weight_{total} = weight_{base} \cdot min(1.0, (slope - 15) \cdot \frac{4}{30})
{{< /katex >}}

For waterways the weight 1 for a calm and normal flowing river and increased based an water speed or obstructions.

Example weights:

* Normal road: 1
* Grassland: 1.5
* Rough Terrain: 2
* Terrain with lots bushes/thorns: 4
* Swamps: 8

Additional data labels for the connections, to later help filter them for different use cases:

* **Walk**: Connection can be traveled by food
* **Drive**: Weagons can drive on this connection (e.g. roads)
* **Swim**: Waterways connections are marked like this
* **Climb**: Conneections with slopes higher then 45 degrees are marked like this

### Node Connection Weights

> Its possible that downscaled graphs with pre-calculated connections must be made in order to speed up NPC navigation later on.

## World Data Cleanup

Before a new world is created the old world data is deleted. The following procedure is made after all player entities are persisted and active entity simulation has stopped:

1. Delete all voxel data
2. Delete all navigation waypoint data
3. Delete all non-player entity data

## Literatur

* [www.redblobgames.com - Making maps with noise functions](https://www.redblobgames.com/maps/terrain-from-noise/) - Very detailed overview of heightmap generation techniques with sample code