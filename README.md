### Import the ellipsis library in leaflet project

```html
<!-- Import leaflet -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
<!-- Import ellipsis library -->
<script src="adress of library"></script>
```

### Add an ellipsis-drive map to leaflet map
#### Example
```js
const map = L.map('map', {
    center: [51.505, -0.09],
    zoom: 13
});

// Raster layer
Ellipsis.RasterLayer(
    mapId,
    captureId,
    visualizationId,
    maxZoom,
    token
).addTo(map)

// Vector layer
Ellipsis.VectorLayer(
    mapId,
    layerId,
    maxZoom,
    token
).addTo(map)
```
#### RasterLayer parameters

| Name        | Description |
| ----------- | -----------|
| mapId        | id of the map|
| captureId     | id of the timestamp |
| visualizationId     | id of the layer |
| maxZoom        | maxZoomlevel of the layer|
| token        | token of the user (optional)|


#### VectorLayer parameters

| Name        | Description | 
| ----------- | ----------- |
| mapId        | Id of the map |
| layerId     | Id of the layer |
| maxZoom        | maxZoomlevel of the layer |
| mapRef | A reference* to the MapContainer |
| selectFeature        | A function to run on feature click, with as argument the clicked feature |
| token        | (Optional) Token of the user |
| styleId        | (Optional) Id of the layer style|
| filter        | (Optional) A property filter to use|
| centerPoints        | Boolean whether to render only center points. Default false. |
| pageSize | Size to retreive per step. Default 25, max 3000. |
| maxMbPerTile        | The maximum mb to load per tile. Default 16mb. |
| maxTilesInCache        | The number of tiles to keep in cache. Default 500. |
| maxVectorsPerTile        | The maximum number of vectors to load per tile. Default 200. |
| radius | The radius of the points in the layer. Default 15. |
| lineWidth | The width/weight of the lines in the layer. Default 5. |

### EllipsisApi functions

#### EllipsisApi.login description
**parameters**
| name | description | 
| -- | -- |
| username | The username of your ellipsis-drive account |
| password | The password of your ellipsis-drive account |
| validFor | (Optional) The number of second the access token will be valid for. Default 86400 (24 hours). |

**return value**
```ts
token: string //token to use in other api calls
expires: number //expiration time in milliseconds
```

#### EllipsisApi.getMetadata description
**parameters**
| name | description | 
| -- | -- |
| mapId | The map or shape id of the project. |
| includeDeleted | (Optional) Boolean whether to also return deleted items. Default false. |

**return value**

It returns JSON, which depends on the type of map.


