import EllipsisVectorLayer from "./EllipsisVectorLayer";
import EllipsisRasterLayer from "./EllipsisRasterLayer";
import EllipsisApi from "./EllipsisApi";

export default {
    EllipsisApi,
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
            options.lineWidth ? options.lineWidth : 2,
            options.useMarkers ? true : false,
            options.loadAll ? true : false
        );
    }
}