const Ellipsis = {
    RasterLayer: (blockId, captureId, visualizationId, maxZoom, token) => {
        return new EllipsisRasterLayer(blockId, captureId, visualizationId, maxZoom, token);
    },

    VectorLayer: (blockId, layerId, selectFeature, token, 
        styleId, filter, centerPoints = false, maxZoom = 21, pageSize = 25, maxMbPerTile = 16, 
        maxTilesInCache = 500, maxFeaturesPerTile = 200, radius = 15, lineWidth = 5) => {
        return new EllipsisVectorLayer(blockId, layerId, selectFeature, token, styleId, filter, centerPoints, maxZoom, pageSize, maxMbPerTile, maxTilesInCache, maxFeaturesPerTile, radius, lineWidth);
    }
}