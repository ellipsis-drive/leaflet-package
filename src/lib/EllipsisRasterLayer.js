import getEllipsisUtilObject from "./getEllipsisUtilObject";
const RasterLayerUtil = getEllipsisUtilObject("RasterLayerUtil");

class EllipsisRasterLayer extends L.tileLayer {
  getLeafletLayer = () => this;

  constructor(options) {
    if (!options.style) {
      throw "Parameter style is required and must be an id or object";
    }
    if (!options.timestampId) {
      throw "timestampId is required and must be the id of an active timestamp";
    }
    if (!options.pathId) {
      throw "pathId is required and must be a id";
    }

    super(RasterLayerUtil.getSlippyMapUrl(options), {
      zoom: options.zoom,
      tileSize: 256,
    });
  }
}

export default EllipsisRasterLayer;
