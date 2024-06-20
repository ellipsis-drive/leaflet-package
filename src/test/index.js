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
/*
new EllipsisVectorLayer({
  pathId: "312907b1-9bab-4776-b271-413e7596cf1a",
  onFeatureClick: (f, e) => {
    console.log(f, e);
  },
}).addTo(map);
*/
new EllipsisRasterLayer({
  pathId: "69b0a2d0-b66e-439a-b1f5-e447e6be8f93",
  timestampId: "254c4536-c21c-4e73-bed1-45a9b7b9f900",
  style: "0bc0580d-0455-4e43-87d7-0490ba2b5a56",
  zoom: 9,
}).addTo(map);
