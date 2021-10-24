function init() {
    let map = L.map('mapid').setView([51.505, -0.09], 13);
    const tileLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiZHV0Y2hqZWxseSIsImEiOiJja3Y0MXhsajc0ZHE3Mm5zNzhucTJiZXhmIn0.7UQPvzDakKqhRAUrUEQmxg'
    });
    
    tileLayer.addTo(map);

    // Raster layer
    // Ellipsis.RasterLayer(
    //     '01104b4f-85a7-482c-9ada-11dbce171982',
    //     0,
    //     '01f63a0d-3f92-42d3-925d-b3bfaf6dd6a1',
    //     13
    // ).addTo(map)
    
    Ellipsis.VectorLayer(
        '1a24a1ee-7f39-4d21-b149-88df5a3b633a',
        '45c47c8a-035e-429a-9ace-2dff1956e8d9'
    ).addTo(map);

    // Vector layer
    // Ellipsis.VectorLayer(
    //     blockId,
    //     layerId,
    //     maxZoom,
    //     token
    // ).addTo(map)
}