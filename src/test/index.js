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

const layer = new EllipsisVectorLayer({
  pathId: "487fd1e1-7ed2-4b3d-b648-12579b08454e",
  loadAll: true,
}).addTo(map);
