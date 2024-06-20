import {
  EllipsisVectorLayer,
  EllipsisRasterLayer,
  AsyncEllipsisRasterLayer,
} from "../lib";

var map = L.map("map").setView([-27.3416, 153.074], 13);

var tiles = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

new EllipsisVectorLayer({
  pathId: "312907b1-9bab-4776-b271-413e7596cf1a",
  onFeatureClick: (f, e) => {
    console.log(f, e);
  },
}).addTo(map);
