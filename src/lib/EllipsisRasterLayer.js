import { RasterLayerUtil } from "ellipsis-js-util";

class EllipsisRasterLayer extends L.tileLayer {

    getLeafletLayer = () => this;

    constructor(options) {
        super(RasterLayerUtil.getSlippyMapUrl(options), {
            maxZoom: options.maxZoom,
            id: `${options.blockId}_${options.captureId}_${options.visualizationId}`,
            tileSize: 256,
        });
    }
}

export default EllipsisRasterLayer;