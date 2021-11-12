### Installing the library
All releases of this package are listed in the release list on github [here](https://github.com/ellipsis-drive-internal/leaflet-package/releases). To install this library, simply find the latest `.js` file in there, and put it in the directory of your project.


### Import the ellipsis library in leaflet project

```html
<!-- Import leaflet -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
<!-- Import ellipsis library -->
<script src="path-to-library"></script>

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
    blockId,
    captureId,
    visualizationId, 
    { //options
        maxZoom: 21,
        token: yourToken
    }
).addTo(map)

// Vector layer
Ellipsis.VectorLayer(
    blockId,
    layerId, 
    { //options
        maxZoom: 21,
        token: yourToken
    }
).addTo(map)
```
#### RasterLayer parameters

| Name        | Description |
| ----------- | -----------|
| blockId        | id of the block|
| captureId     | id of the capture |
| visualizationId     | id of the layer |
| maxZoom        | maxZoomlevel of the layer. Default 21.|
| options | optional options object|

#### RasterLayer options
| Name | Description |
| -- | -- |
| token        | token of the user |

#### VectorLayer parameters

| Name        | Description | 
| ----------- | ----------- |
| blockId        | Id of the block |
| layerId     | Id of the layer |
| options | optional options object |

#### VectorLayer options

| Name        | Description | 
| ----------- | ----------- |
| selectFeature        | A function to run on feature click, with as argument the clicked feature |
| token        | Token of the user |
| styleId        | Id of the layer style|
| filter        | A property filter to use|
| maxZoom        | maxZoomlevel of the layer. Default 21. |
| centerPoints        | Boolean whether to render only center points. Default false. |
| pageSize | Size to retreive per step. Default 25, max 3000. |
| maxMbPerTile        | The maximum mb to load per tile. Default 16mb. |
| maxTilesInCache        | The number of tiles to keep in cache. Default 500. |
| maxFeaturesPerTile        | The maximum number of features to load per tile. Default 200. |
| radius | The radius of the points in the layer. Default 15. |
| lineWidth | The width/weight of the lines in the layer. Default 5. |
| useMarkers | If set to true, points will be displayed as markers. Default false. |

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
| blockId | The block or shape id of the project. |
| includeDeleted | (Optional) Boolean whether to also return deleted items. Default false. |
| user | (Optional) An user object which can contain a token like `user: {token: mytoken}` | 

**return value**

It returns JSON, which depends on the type of map.


