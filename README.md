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
<script src="https://github.com/ellipsis-drive/ellipsis-js-util/releases/download/1.0.1/ellipsis-js-util-1.0.1.js"></script>
<script src="https://github.com/ellipsis-drive/leaflet-package/releases/download/3.0.0/leaflet-ellipsis-3.0.0.js"></script>
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
  blockId: blockId,
  captureId: captureId,
  visualizationId: visualizationId,
  maxZoom: 21,
  token: yourToken,
}).addTo(map);

// Vector layer
new leafletEllipsis.EllipsisVectorLayer({
  blockId: blockId,
  layerId: layerId,
  maxZoom: 21,
  token: yourToken,
}).addTo(map);
```

#### RasterLayer options

| Name            | Description                            |
| --------------- | -------------------------------------- |
| blockId         | id of the block                        |
| captureId       | id of the capture                      |
| visualizationId | id of the visualization                |
| maxZoom         | maxZoomlevel of the layer. Default 21. |
| token           | token of the user                      |

#### VectorLayer options

| Name               | Description                                                              |
| ------------------ | ------------------------------------------------------------------------ |
| blockId            | Id of the block                                                          |
| layerId            | Id of the layer                                                          |
| onFeatureClick     | A function to run on feature click, with as argument the clicked feature |
| token              | Token of the user                                                        |
| styleId            | Id of the layer style                                                    |
| style              | (Optional) Object with style properties\*                                |
| filter             | A property filter to use                                                 |
| maxZoom            | maxZoomlevel of the layer. Default 21.                                   |
| centerPoints       | Boolean whether to render only center points. Default false.             |
| pageSize           | Size to retreive per step. Default 25, max 3000.                         |
| maxMbPerTile       | The maximum mb to load per tile. Default 16mb.                           |
| maxTilesInCache    | The number of tiles to keep in cache. Default 500.                       |
| maxFeaturesPerTile | The maximum number of features to load per tile. Default 200.            |
| radius             | The radius of the points in the layer. Default 15.                       |
| lineWidth          | The width/weight of the lines in the layer. Default 5.                   |
| useMarkers         | If set to true, points will be displayed as markers. Default false.      |

_note_ for the style object, refer to this documentation about it: https://app.ellipsis-drive.com/developer/javascript/documentation#POST%20geometryLayers%2FaddStyle.

<details>
<summary>Or this copied info</summary>
○ 'rules': Parameters contains the property 'rules' being an array of objects with required properties 'property', 'value' and 'color' and optional properties 'operator' and 'alpha'. 'property' should be the name of the property to style by and should be of type string, 'value' should be the cutoff point of the style and must be the same type as the property, 'color' is the color of the style and must be a rgb hex code, 'operator'determines whether the styling should occur at, under or over the cutoff point and must be one of '=', '<', '>', '<=', '>=' or '!=' with default '=' and 'alpha' should be the transparency of the color on a 0 to 1 scale with default 0.5.

○ 'rangeToColor': Parameters contains the required property 'rangeToColor' and optional property 'periodic', where 'rangeToColor' should be an array of objects with required properties 'property', 'fromValue', 'toValue' and 'color' and optional property 'alpha', where 'property' should be the name of the property to style by and should be of type string, 'fromValue' and 'toValue' should be the minimum and maximum value of the range respectively, 'color' is the color to use if the property falls inclusively between the fromValue and toValue and should be a rgb hex code color and 'alpha' should be the transparency of the color on a 0 to 1 scale with default 0.5. 'periodic' should be a positive float used when the remainder from dividing the value of the property by the periodic should be used to evaluate the ranges instead.

○ 'transitionPoints': Parameters contains the required properties 'property' and 'transitionPoints' and optional property 'periodic', where 'property' should be the name of the property to style by and should be of type string, 'transitionPoints' should be an array of objects with required properties 'value' and 'color' and optional property 'alpha', where 'value' should be the value at which the next transition starts, 'color' is the color to use if the property falls in the interval before or after the transition point and should be a rgb hex code color and 'alpha' should be the transparency of the color on a 0 to 1 scale with 0.5 as default. 'periodic' should be a positive float used when the remainder from dividing the value of the property by the periodic should be used to evaluate the ranges instead.

○ 'random': Parameters contains the required property 'property' and optional property 'alpha', where 'property' should be the name of the property by which to randomly assign colors and should be of type string and 'alpha' should be the transparency of the color on a 0 to 1 scale with default 0.5.

</details>

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
token: string; //token to use in other api calls
expires: number; //expiration time in milliseconds
```

#### EllipsisApi.getInfo description

**parameters**
| name | description |
| -- | -- |
| pathId | The id of the block, folder or layer. |
| user | (Optional) An user object which can contain a token like `user: {token: mytoken}` |

**return value**
It returns JSON, which depends on the type of the specified object.
