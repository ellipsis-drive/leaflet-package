import { EllipsisVectorLayer, EllipsisRasterLayer } from '../lib'
import token from './token'

let map = L.map('map').setView([52.373527706597514, 4.633205849096186], 17);
const tileLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: token
});

tileLayer.addTo(map);

// Raster layer
// Ellipsis.RasterLayer(
//     '01104b4f-85a7-482c-9ada-11dbce171982',
//     0,
//     '01f63a0d-3f92-42d3-925d-b3bfaf6dd6a1',
//     21
// ).addTo(map)

// Ellipsis.VectorLayer(
//     '9649385a-70e5-455a-8013-eb3c052525f4',
//     '564b79df-6839-4efd-a219-e08883e65f95',
//     {
//         maxMbPerTile: 32,
//         maxFeaturesPerTile: 1000
//     }
// ).addTo(map);

// Ellipsis.VectorLayer(
//     '1a24a1ee-7f39-4d21-b149-88df5a3b633a',
//     '45c47c8a-035e-429a-9ace-2dff1956e8d9'
// ).addTo(map);

// Vector layer
// Ellipsis.VectorLayer(
//     blockId,
//     layerId,
//     maxZoom,
//     token
// ).addTo(map)

// Ellipsis.RasterLayer(
//     "01104b4f-85a7-482c-9ada-11dbce171982",
//     0,
//     "01f63a0d-3f92-42d3-925d-b3bfaf6dd6a1"
// ).addTo(map);
// Ellipsis.VectorLayer(
//     '9649385a-70e5-455a-8013-eb3c052525f4',
//     '564b79df-6839-4efd-a219-e08883e65f95'
// ).addTo(map);

const borders = new EllipsisVectorLayer({
    blockId: '1a24a1ee-7f39-4d21-b149-88df5a3b633a',
    layerId: '45c47c8a-035e-429a-9ace-2dff1956e8d9',
    loadAll: true,
    styleId: 'a30d5d0e-26a3-43a7-9d23-638cef7600c4'
});
borders.addTo(map);


const someRaster = new EllipsisRasterLayer({
    blockId: '16bb1dc3-0e0c-49a8-80fb-7a77740abe1e',
    captureId: '385040ca-2e92-4d38-b286-e2f325255edf',
    visualizationId: '962aee0e-39c7-49f2-9176-52a11b87bee2'
});
someRaster.addTo(map);

// Ellipsis.RasterLayer(
//     '16bb1dc3-0e0c-49a8-80fb-7a77740abe1e', //blockID
//     '385040ca-2e92-4d38-b286-e2f325255edf', //captureID
//     '962aee0e-39c7-49f2-9176-52a11b87bee2', //visualizationID
//     {
//         //options
//         maxZoom: 21,
//     }
// ).addTo(map);
// Ellipsis.VectorLayer(
//     'b8c7ac72-be8d-4183-8138-f83e54506be6', //blockId
//     'b071cd2f-064f-457d-8e9d-fe8ae212337a', //layerId
//     { //options
//         maxZoom: 21,
//         maxFeaturesPerTile: 400,
//     }
// ).addTo(map);


    // Ellipsis.VectorLayer(
    //     'b8468235-31b5-4959-91a4-0e52a1d4feb6',
    //     '44be2542-d20d-457b-b003-698d048d2c6c',
    //     {
    //         useMarkers: true,
    //         onFeatureClick: (e) => console.log(e),
    //         radius: 3,
    //     }
    // ).addTo(map);