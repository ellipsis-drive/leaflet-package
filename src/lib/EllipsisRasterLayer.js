import getEllipsisUtilObject from "./getEllipsisUtilObject";
const RasterLayerUtil = getEllipsisUtilObject('RasterLayerUtil');

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