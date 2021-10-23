class EllipsisVectorLayer extends L.LayerGroup {
    //map is stored in this._map
    //maybe use featuregroup

    constructor() {
        super([L.marker([0.505, -0.09])]);
        this.on('add', (x) => {

            const marker = L.marker([50.505, -0.09]);
            this.addLayer(marker);


            // setInterval(() => {
            //     console.log('interval');
            //     this.addLayer(L.marker([40.505, -0.09]));
            //     this.removeLayer(marker);
            //     // const mapRef = this._map;
            //     // this._map.removeLayer(this);
            // }, 5000)

            // this._map.invalidateSize();
            
            // this.map = x.target._map
            // console.log(this._map.getBounds());
            // console.log(x);
            // console.log(x.target._map.getBounds());
    
            this._map.on('update', (x) => {
                console.log(x);
            })
    
            this._map.on('risize', (x) => {
                console.log('resize');
            })
    
            this._map.on('zoomlevelschange', (x) => {
                console.log('zoomlevelchange');
            })
    
            this._map.on('moveend', (x) => {
                console.log('move end');
            })
    
            this._map.on('move', (x) => {
                console.log('move');
            })
    
            this._map.on('movestart', (x) => {
                console.log('move start');
            })
    
            this._map.on('zoom', (x) => {
                console.log('zoom');
            })
    
            this._map.on('zoomstart', (x) => {
                console.log('zoom start');
            })
    
            this._map.on('viewreset', (x) => {
                console.log('view reset');
            })
    
            this._map.on('remove', (x) => {
                console.log('remove');
            })
        })

        
    }
};
  
  
  
//   EllipsisVectorLayer.defaultProps = {
//     pageSize: 25,
//     maxZoom: 21,
//     lineWidth: 5,
//     radius: 15,
//     maxFeaturesPerTile: 200,
//     maxMbPerTile: 16000000,
//     maxTilesInCache: 500
//   }