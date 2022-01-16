import { RasterLayerUtil } from "ellipsis-js-util";

class EllipsisRasterLayer extends L.tileLayer {

    getLeafletLayer = () => this;

    constructor(options) {
        super(RasterLayerUtil.getSlippyMapUrl(options), {
            maxZoom: options.maxZoom,
            tileSize: 256
        });
    }
}

export default EllipsisRasterLayer;