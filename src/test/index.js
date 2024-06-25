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
const layer = new EllipsisRasterLayer({
  pathId: "552c92e8-8422-46eb-bb55-1eb39e18eee9",
  timestampId: "a19ef596-c48b-479e-87f5-b808cf6fb4d3",
  style: "5b2deacd-a1e3-4b3f-b53a-ae05a0c7fd8d",
  opacity: 0.8,
  zoom: 14,
});

map.on("mousemove", function (event) {
  var a = layer.getColor(event.latlng);
  console.log("A", a);
});

layer.addTo(map);

map.removeLayer(layer);
