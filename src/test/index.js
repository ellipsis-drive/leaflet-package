import {
  EllipsisVectorLayer,
  EllipsisRasterLayer,
  AsyncEllipsisRasterLayer,
} from "../lib";

let map = L.map("map").setView([52.373527706597514, 4.633205849096186], 17);

const createEllipsisRasterLayer = async () => {
  const someRaster = await AsyncEllipsisRasterLayer({
    pathId: "28fb0f5f-e367-4265-b84b-1b8f1a8a6409",
  });
  someRaster.addTo(map);
};

createEllipsisRasterLayer();

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const someVector = new EllipsisVectorLayer({
  pathId: "2109c37a-d549-45dd-858e-7eddf1bd7c22",
  timestampId: "1e8061f0-6c22-4803-8f2c-1b60fa7f7ae6",
  style: "3a438c2e-b3ea-4d23-ae18-45541d105bf2",
  zoom: 15,
});
someVector.addTo(map);
