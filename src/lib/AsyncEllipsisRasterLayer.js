import getEllipsisUtilObject from "./getEllipsisUtilObject";
import { addColorPicker } from "./ColorPicker";

addColorPicker();
const RasterLayerUtil = getEllipsisUtilObject("RasterLayerUtil");

const AsyncEllipsisRasterLayer = async (options) => {
  const result = await RasterLayerUtil.getSlippyMapUrlWithDefaults(options);

  class layer extends L.tileLayer.colorPicker {
    getLeafletLayer = () => this;

    constructor() {
      super(result.url, {
        zoom: result.zoom,
        tileSize: 256,
      });
    }
  }
  const newLayer = new layer();
  return newLayer;
};

export default AsyncEllipsisRasterLayer;
