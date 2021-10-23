class EllipsisRasterLayer extends L.tileLayer {
    constructor(blockId, captureId, visualizationId, maxZoom = 18, token) {
        let url = `${EllipsisApi.apiUrl}/tileService/${blockId}/${captureId}/${visualizationId}/{z}/{x}/{y}`;
        if (token) {
            url = url + '?token=' + token;
        }

        super(url, {
            maxZoom,
            id: `${blockId}_${captureId}_${visualizationId}`,
            tileSize: 256,
        });
    }
}