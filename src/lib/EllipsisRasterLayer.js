import getEllipsisUtilObject from "./getEllipsisUtilObject";
import { addColorPicker } from "./ColorPicker";
const RasterLayerUtil = getEllipsisUtilObject("RasterLayerUtil");

addColorPicker();

class EllipsisRasterLayer extends L.tileLayer.colorPicker {
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
      ...options,
      tileSize: 256,
    });
  }
}

export default EllipsisRasterLayer;
