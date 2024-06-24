import {
  EllipsisVectorLayer,
  EllipsisRasterLayer,
  AsyncEllipsisRasterLayer,
} from "../lib";

var map = L.map("map").setView([52, 5], 9);

var tiles = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
/*
new EllipsisVectorLayer({
  pathId: "312907b1-9bab-4776-b271-413e7596cf1a",
  onFeatureClick: (f, e) => {
    console.log(f, e);
  },
}).addTo(map);
*/

const createEllipsisRasterLayer = async () => {
  const someRaster = await AsyncEllipsisRasterLayer({
    pathId: "552c92e8-8422-46eb-bb55-1eb39e18eee9",
  });
  someRaster.addTo(map);

  map.on("mousemove", function (event) {
    var a = someRaster.getColor(event.latlng);
    console.log("A", a);
    if (a !== null) {
      var hex =
        "#" +
        (0x1000000 + (a[0] << 16) + (a[1] << 8) + a[2]).toString(16).substr(1);
      var tmpl = "<b style='background:@;color:black;'>@</b>";
      if (Math.min(a[0], a[1], a[2]) < 0x40)
        tmpl = tmpl.replace("black", "white");
      map.attributionControl.setPrefix(tmpl.replace(/@/g, hex));
    } else {
      map.attributionControl.setPrefix("unavailable");
    }
  });
};

createEllipsisRasterLayer();
