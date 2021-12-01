// Build date: Wed Dec  1 17:04:18 CET 2021

"use strict"
const apiUrl = 'https://api.ellipsis-drive.com/v1';

function CustomError(status, message) {
    var error = Error.call(this, message);
    this.name = 'API Error';
    this.message = error.message;
    this.stack = error.stack;
    this.status = status;
}

async function ellipsisApiManagerFetch(method, url, body, user) {
    let headers = {};
    let urlAddition = '';

    headers['Content-Type'] = 'application/json';

    if (user) {
        headers['Authorization'] = `Bearer ${user.token}`;
        if (user.mapId) {
            urlAddition = `?mapId=${user.mapId}`;
        }
    }

    url = `${apiUrl}${url}${urlAddition}`;
    let gottenResponse = null;
    let isText = false;
    let isJson = false;

    let options = {
        method: method,
        headers: headers,
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    return await fetch(url, options)
        .then((response) => {
            if (!response.ok) {
                if (response.status === 429) {
                    alert(
                        `You made too many calls to this map and won't be able to use it for another minute. Contact the owner of this map to give you more bandwidth.`
                    );
                }
            }

            gottenResponse = response;

            let contentType = response.headers.get('Content-Type');

            if (contentType) {
                isText = contentType.includes('text');
                isJson = contentType.includes('application/json');
            } else {
                isText = true;
            }

            if (isJson) {
                return response.json();
            } else if (isText) {
                return response.text();
            } else {
                return response.blob();
            }
        })
        .then((result) => {
            if (gottenResponse.status === 200) {
                return result;
            } else {
                if (!isText) {
                    throw new CustomError(gottenResponse.status, result.message);
                } else {
                    throw new CustomError(gottenResponse.status, result);
                }
            }
        });
}


window.EllipsisApi = {
    apiUrl: apiUrl,
    post: (url, body, user) => {
        return ellipsisApiManagerFetch('POST', url, body, user);
    },
    login: (username, password) => {
        return ellipsisApiManagerFetch('POST', '/account/login', { username, password });
    },
    getMetadata: (blockId, includeDeleted) => {
        let body;
        if (includeDeleted) body = { mapId: blockId, includeDeleted };
        else body = { mapId: blockId };

        return ellipsisApiManagerFetch('POST', '/metadata', body);
    }
}
class EllipsisVectorLayer extends L.geoJSON {

    constructor(blockId, layerId, onFeatureClick, token,
        styleId, style, filter, centerPoints, maxZoom, pageSize, maxMbPerTile,
        maxTilesInCache, maxFeaturesPerTile, radius, lineWidth, useMarkers, loadAll) {
        super([], {
            style: (feature) => {
                return {
                    //TODO Look if we are we missing any styling options
                    color: feature.properties.color,
                    fillColor: feature.properties.color,
                    fillOpacity: feature.properties.fillOpacity,
                    weight: feature.properties.weight
                }
            },
            pointToLayer: useMarkers ? (feature, latlng) => {
                const icon = new L.Icon.Default();
                icon.options.shadowSize = [0, 0];
                //Unfortunately color support isn't directly possible without
                //custom elements, css or a library.
                return new L.marker(latlng, { icon });
            } : (feature, latlng) => {
                return L.circleMarker(latlng, {
                    radius: feature.properties.radius,
                    color: feature.properties.color,
                    fillColor: feature.properties.color,
                    fillOpacity: feature.properties.fillOpacity,
                    opacity: 1,
                    weight: feature.properties.weight,
                    interactive: onFeatureClick ? true : false
                });
            },
            interactive: onFeatureClick ? true : false,
            onEachFeature: onFeatureClick ? (feature, layer) => {
                layer.on('click', (e) => onFeatureClick(feature, layer));
            } : undefined,
            markersInheritOptions: true
        });
        this.id = `${blockId}_${layerId}`;

        this.blockId = blockId;
        this.layerId = layerId;
        this.maxZoom = maxZoom;
        this.onFeatureClick = onFeatureClick;
        this.token = token;
        this.styleId = styleId;
        this.style = style;
        this.filter = filter;
        this.centerPoints = centerPoints;
        this.pageSize = Math.min(pageSize, 3000);
        this.maxMbPerTile = maxMbPerTile;
        this.maxTilesInCache = maxTilesInCache;
        this.maxFeaturesPerTile = maxFeaturesPerTile;
        this.radius = radius;
        this.lineWidth = lineWidth;
        this.useMarkers = useMarkers;
        this.loadAll = loadAll;

        this.tiles = [];
        this.cache = [];
        //keeps track of which features are printed
        this.printedFeatureIds = [];
        this.zoom = 1;
        this.changed = false;

        this.on("add", async (x) => {

            this.handleViewportUpdate();

            if (this.loadAll) return;

            this._map.on("zoom", (x) => {
                this.handleViewportUpdate();
            });

            this._map.on("moveend", (x) => {
                this.handleViewportUpdate();
            });

            this._map.on("remove", (x) => {
                clearInterval(this.gettingVectorsInterval);
            });
        });
    }

    handleViewportUpdate = () => {
        const viewport = this.getMapBounds();
        if (!viewport) return;
        this.zoom = Math.max(Math.min(this.maxZoom, viewport.zoom - 2), 0);
        this.tiles = this.boundsToTiles(viewport.bounds, this.zoom);
        this.printedFeatureIds = [];
        if (this.gettingVectorsInterval) return;

        this.gettingVectorsInterval = setInterval(async () => {
            if (this.isLoading) return;

            const loadedSomething = await this.loadStep();
            if (!loadedSomething) {
                clearInterval(this.gettingVectorsInterval);
                this.gettingVectorsInterval = undefined;
                return;
            }
            this.updateView();
        }, 100);
    };

    updateView = () => {
        if (!this.tiles || this.tiles.length === 0) return;

        let features;
        if (this.loadAll) {
            features = this.cache;
        } else {
            features = this.tiles.flatMap((t) => {
                const geoTile = this.cache[this.getTileId(t)];
                return geoTile ? geoTile.elements : [];
            });
        }
        if (!this.printedFeatureIds.length)
            this.clearLayers();
        this.addData(features.filter(x => !this.printedFeatureIds.includes(x.properties.id)));
        features.forEach(x => this.printedFeatureIds.push(x.properties.id));
    };

    loadStep = async () => {
        this.isLoading = true;
        if (this.loadAll) {
            const cachedSomething = await this.getAndCacheAllGeoJsons();
            this.isLoading = false;
            return cachedSomething;
        }

        this.ensureMaxCacheSize();
        const cachedSomething = await this.getAndCacheGeoJsons();
        this.isLoading = false;
        return cachedSomething;
    };

    ensureMaxCacheSize = () => {
        const keys = Object.keys(this.cache);
        if (keys.length > this.maxTilesInCache) {
            const dates = keys.map((k) => this.cache[k].date).sort();
            const clipValue = dates[9];
            keys.forEach((key) => {
                if (this.cache[key].date <= clipValue) {
                    delete this.cache[key];
                }
            });
        }
    };

    getAndCacheAllGeoJsons = async () => {
        if (this.nextPageStart === 4)
            return false;

        const body = {
            pageStart: this.nextPageStart,
            mapId: this.blockId,
            returnType: this.centerPoints ? "center" : "geometry",
            layerId: this.layerId,
            zip: true,
            pageSize: Math.min(3000, this.pageSize),
            styleId: this.styleId,
            style: this.style
        };

        try {
            const res = await EllipsisApi.post("/geometry/get", body, { token: this.token });
            this.nextPageStart = res.nextPageStart;
            if (!res.nextPageStart)
                this.nextPageStart = 4; //EOT (end of transmission)
            if (res.result && res.result.features) {
                res.result.features.forEach(x => {
                    this.styleGeoJson(x, this.lineWidth, this.radius);
                    this.cache.push(x);
                });
            }
        } catch {
            return false;
        }
        return true;
    }

    getAndCacheGeoJsons = async () => {
        const date = Date.now();
        //create tiles parameter which contains tiles that need to load more features
        const tiles = this.tiles.map((t) => {
            const tileId = this.getTileId(t);

            //If not cached, always try to load features.
            if (!this.cache[tileId])
                return { tileId: t }

            const pageStart = this.cache[tileId].nextPageStart;

            //TODO in other packages we use < instead of <=
            //Check if tile is not already fully loaded, and if more features may be loaded
            if (pageStart && this.cache[tileId].amount <= this.maxFeaturesPerTile && this.cache[tileId].size <= this.maxMbPerTile)
                return { tileId: t, pageStart }

            return null;
        }).filter(x => x);


        if (tiles.length === 0) return false;

        const body = {
            mapId: this.blockId,
            returnType: this.centerPoints ? "center" : "geometry",
            layerId: this.layerId,
            zip: true,
            pageSize: Math.min(3000, this.pageSize),
            styleId: this.styleId,
            style: this.style,
            propertyFilter: (this.filter && this.filter > 0) ? this.filter : null,
        };


        //Get new geometry for the tiles
        let result = [];
        const chunkSize = 10;
        for (let k = 0; k < tiles.length; k += chunkSize) {
            body.tiles = tiles.slice(k, k + chunkSize);
            try {
                const res = await EllipsisApi.post("/geometry/tile", body, { token: this.token });
                result = result.concat(res);
            } catch {
                return false;
            }
        }

        //Add newly loaded data to cache
        for (let j = 0; j < tiles.length; j++) {
            const tileId = this.getTileId(tiles[j].tileId);

            if (!this.cache[tileId]) {
                this.cache[tileId] = {
                    size: 0,
                    amount: 0,
                    elements: [],
                    nextPageStart: null,
                };
            }

            //set tile info for tile in this.
            const tileData = this.cache[tileId];
            tileData.date = date;
            tileData.size = tileData.size + result[j].size;
            tileData.amount = tileData.amount + result[j].result.features.length;
            tileData.nextPageStart = result[j].nextPageStart;
            result[j].result.features.forEach(x => this.styleGeoJson(x, this.lineWidth, this.radius));
            tileData.elements = tileData.elements.concat(result[j].result.features);

        }
        return true;
    };

    getTileId = (tile) => `${tile.zoom}_${tile.tileX}_${tile.tileY}`;

    styleGeoJson = (geoJson, weight, radius) => {
        if (!geoJson || !geoJson.geometry || !geoJson.geometry.type || !geoJson.properties) return;

        const type = geoJson.geometry.type;
        const properties = geoJson.properties;
        const color = properties.color;
        const isHexColorFormat = /^#?([A-Fa-f0-9]{2}){3,4}$/.test(color);

        //Parse color and opacity
        if (isHexColorFormat && color.length === 9) {
            properties.fillOpacity = parseInt(color.substring(8, 10), 16) / 25.5;
            properties.color = color.substring(0, 7);
        }
        else {
            properties.fillOpacity = 0.6;
            properties.color = color;
        }

        //Parse line width
        if (type.endsWith('Point')) {
            properties.radius = radius;
            properties.weight = 2;
        }
        else properties.weight = weight;
    }

    boundsToTiles = (bounds, zoom) => {
        const xMin = Math.max(bounds.xMin, -180);
        const xMax = Math.min(bounds.xMax, 180);
        const yMin = Math.max(bounds.yMin, -85);
        const yMax = Math.min(bounds.yMax, 85);

        const zoomComp = Math.pow(2, zoom);
        const comp1 = zoomComp / 360;
        const pi = Math.PI;
        const comp2 = 2 * pi;
        const comp3 = pi / 4;

        const tileXMin = Math.floor((xMin + 180) * comp1);
        const tileXMax = Math.floor((xMax + 180) * comp1);
        const tileYMin = Math.floor(
            (zoomComp / comp2) *
            (pi - Math.log(Math.tan(comp3 + (yMax / 360) * pi)))
        );
        const tileYMax = Math.floor(
            (zoomComp / comp2) *
            (pi - Math.log(Math.tan(comp3 + (yMin / 360) * pi)))
        );

        let tiles = [];
        for (
            let x = Math.max(0, tileXMin - 1);
            x <= Math.min(2 ** zoom - 1, tileXMax + 1);
            x++
        ) {
            for (
                let y = Math.max(0, tileYMin - 1);
                y <= Math.min(2 ** zoom - 1, tileYMax + 1);
                y++
            ) {
                tiles.push({ zoom, tileX: x, tileY: y });
            }
        }
        return tiles;
    };

    getMapBounds = () => {
        const leafletMap = this._map;
        if (!leafletMap || !leafletMap._zoom) return;

        const screenBounds = leafletMap.getBounds();

        let bounds = {
            xMin: screenBounds.getWest(),
            xMax: screenBounds.getEast(),
            yMin: screenBounds.getSouth(),
            yMax: screenBounds.getNorth(),
        };

        return { bounds: bounds, zoom: leafletMap._zoom };
    };

    // updateView = (loading) => {
    //     if(!this.tiles || this.tiles.length === 0) return;

    //     if(!this.viewPortRefreshed && !loading) {
    //         console.log('no need to refresh view');
    //         return;
    //     }

    //     const layerElements = this.tiles.flatMap(t => {
    //         const geoTile = this.cache[t.zoom + "_" + t.tileX + "_" + t.tileY];
    //         return geoTile ? geoTile.elements : [];
    //     });

    //     if(this.viewPortRefreshed) {
    //         //if still loading, only display new features when there are more
    //         //than already in the view.
    //         console.log(`loading: ${loading} -- ${layerElements.length}/${this.getLayers().length}`);

    //         //## 2 different options:
    //         //1) load double elements when certain percentage is not loaded
    //         //2) wait with showing newly loaded elements until certain percentage is loaded

    //         // ## option 1
    //         // if(!loading || this.getLayers().length/2 <= layerElements.length) {
    //         //     console.log('refreshing tiles');
    //         //     this.viewPortRefreshed = false;
    //         //     this.clearLayers();
    //         // }

    //         // ## option 2
    //         if(loading && this.getLayers().length/2 > layerElements.length)
    //             return;
    //         console.log('refreshing tiles');
    //         this.viewPortRefreshed = false;
    //         this.clearLayers();
    //     }
    //     layerElements.forEach(x => {
    //         if(!this.hasLayer(x))
    //             this.addLayer(x);
    //     })
    // };

    // selectFeature = async (feature) => {
    //     let body = {
    //         mapId: this.blockId,
    //         layerId: this.layerId,
    //         geometryIds: [feature.properties.id],
    //         returnType: "all",
    //     };
    //     try {
    //         let result = await EllipsisApi.post(
    //             "/geometry/ids",
    //             body,
    //             this.token
    //         );
    //         this.selectFeature({
    //             size: result.size,
    //             feature: result.result.features[0],
    //         });
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };
}

window.EllipsisVectorLayer = EllipsisRasterLayer;
class EllipsisRasterLayer extends L.tileLayer {
    constructor(blockId, captureId, visualizationId, maxZoom = 18, token) {
        let url = `${EllipsisApi.apiUrl}/tileService/${blockId}/${captureId}/${visualizationId}/{z}/{x}/{y}`;
        if (token) {
            url = url + '?token=' + token;
        }

        super(url, {
            maxZoom,
            id: `${blockId}_${captureId}_${visualizationId}`,
            tileSize: 256,
        });
    }
}

window.EllipsisRasterLayer = EllipsisRasterLayer;
window.Ellipsis = {
    RasterLayer: (blockId, captureId, visualizationId, maxZoom = 21, options = {}) => {
        return new EllipsisRasterLayer(
            blockId,
            captureId,
            visualizationId,
            maxZoom,
            options.token
        );
    },

    VectorLayer: (blockId, layerId, options = {}) => {
        return new EllipsisVectorLayer(
            blockId, layerId,
            options.onFeatureClick,
            options.token,
            options.styleId,
            options.style,
            options.filter,
            options.centerPoints ? true : false,
            options.maxZoom ? options.maxZoom : 21,
            options.pageSize ? Math.max(3000, options.pageSize) : 25,
            options.maxMbPerTile ? options.maxMbPerTile * 1000000 : 16000000,
            options.maxTilesInCache ? options.maxTilesInCache : 500,
            options.maxFeaturesPerTile ? options.maxFeaturesPerTile : 200,
            options.radius ? options.radius : 15,
            options.lineWidth ? options.lineWidth : 5,
            options.useMarkers ? true : false,
            options.loadAll ? true : false
        );
    }
}