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

// new leafletEllipsis.EllipsisRasterLayer({
// 	pathId: '2cdef8fa-0b50-40a6-a7be-6649c761a2e0',
// 	timestampId: '43ba34a9-f1ab-47bd-adaf-f4ba9d283bda',
// 	style: '3d881ff4-c0d7-48cc-ba8d-39eb92bc3a5c',
// 	// zoom: 20,
// 	token: ''
// }).addTo(map);

// Vector layer

//8a11c27b-74c3-4570-bcd0-64829f7cd311
//"6d8772b8-a399-4a4f-8744-bd3769cef1ed"
new EllipsisVectorLayer({
  pathId: "6d8772b8-a399-4a4f-8744-bd3769cef1ed",
  maxFeaturesPerTile: 200,
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiOTExM2FmMmItOTQzZi00Njg5LWI1ZjQtZTU3NTE2N2Q1YTM4Iiwic291cmNlIjoiZ29vZ2xlX29wZW5faWQiLCJpYXQiOjE2OTk1MjIwNTMsImV4cCI6MTcwMjIwMDQ1M30.p4fAbY1-NH9L2kQX86NrHvrmD02laY4f7NhEHXB-MYU",
}).addTo(map);
