const Ellipsis = {
    RasterLayer: (blockId, captureId, visualizationId, maxZoom, token) => {
        return new EllipsisRasterLayer(blockId, captureId, visualizationId, maxZoom, token);
    },

    VectorLayer: () => {
        return new EllipsisVectorLayer();
    }
}