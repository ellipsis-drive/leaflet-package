### Installing the library

All releases of this package are listed in the release list on github [here](https://github.com/ellipsis-drive-internal/leaflet-package/releases). To install this library, simply find the latest `.js` file in there, and put it in the directory of your project.

### Import the ellipsis library in leaflet project

**with script tags**

```html
<!-- Import leaflet -->
<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
/>
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
<!-- Import ellipsis library -->
<script src="https://github.com/ellipsis-drive/ellipsis-js-util/releases/download/1.1.0/ellipsis-js-util-1.1.0.js"></script>
<script src="https://github.com/ellipsis-drive/leaflet-package/releases/download/3.1.0/leaflet-ellipsis-3.1.0.js"></script>
```

**with npm**
`npm install leaflet-ellipsis`

### Add an ellipsis-drive map to leaflet map

#### Example

```js
const map = L.map("map", {
  center: [51.505, -0.09],
  zoom: 13,
});

// Raster layer
new leafletEllipsis.EllipsisRasterLayer({
  pathId: pathId, timestampId:timestampId, style:styleId, zoom:zoom  token: yourToken,
}).addTo(map);

// Vector layer
new leafletEllipsis.EllipsisVectorLayer({
  pathId: pathId,
  token: yourToken,
}).addTo(map);
```

The timestampId and style are required for raster layers, you can use AsyncEllipsisRasterLayer in order to make use of defaults suggested by the server.

```js
const createEllipsisRasterLayer = async () => {
  const someRaster = await leafletEllipsis.AsyncEllipsisRasterLayer({
    pathId: pathId,
  });
  someRaster.addTo(map);
};

createEllipsisRasterLayer();
```
In this case only the pathId is required.

#### Obtaining tokens
To use layers that are not set to public or link sharing you need to pass a token as a parameter. See [here](https://docs.ellipsis-drive.com/developers/authentication-options) for how to obtain such a token.

#### RasterLayer options

| Name        | Description                              |
| ----------- | ---------------------------------------- |
| pathId      | id of the path                           |
| timestampId | id of the timestamp                      |
| style       | id of a style or an object describing it |
| zoom     | max native zoomlevel of the layer.   |
| token       | token of the user                        |

_note_ for the style object, refer to [this documentation about it](https://docs.ellipsis-drive.com/developers/api-v3/path-raster/styles/add-style).

#### VectorLayer options

| Name               | Description                                                              |
| ------------------ | ------------------------------------------------------------------------ |
| pathId            | Id of the path                                                          |
| timestampId            | Id of the timestamp                                                          |
| style       | id of a style or an object describing it |
| onFeatureClick     | A function to run on feature click, with as argument the clicked feature |
| onFeatureHover     | A function to run on feature hover, with as argument the clicked feature and the event              |
| token              | Token of the user                                                        |
| filter             | A property filter to use                                                 |
| zoom            | max native zoomlevel of the layer, if not given uses the zoom as specified in the layer metadata.                                   |
| pageSize           | Size to retreive per step. Default 25, max 3000.                         |
| maxMbPerTile       | The maximum mb to load per tile. Default 16mb.                           |
| maxRenderTiles    | The number of tiles to render in the view. Default 100.                       |
| maxFeaturesPerTile | The maximum number of features to load per tile. Default 200.            |
| useMarkers         | If set to true, points will be displayed as markers. Default false.      |
| loadAll      | Boolean whehter to keep loading features indefinitely. Default false.   |

_note_ for the style object, refer to [this documentation about it](https://docs.ellipsis-drive.com/developers/api-v3/path-vector/styles/add-style).


### EllipsisApi functions


#### EllipsisApi.getPath description

**parameters**
| name | description |
| -- | -- |
| pathId | The id of the path. |
| user | (Optional) An user object which can contain a token like `user: {token: mytoken}` |

**return value**
It returns JSON, which contains metadata of the the specified path in your drive.
