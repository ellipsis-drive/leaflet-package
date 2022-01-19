const path = require('path');

module.exports = {
  entry: './src/lib/index.js',
  output: {
    publicPath: '',
    path: path.resolve(__dirname, 'build'),
    library: {
      name: 'leafletEllipsis',
      type: 'umd'
    },
    filename: 'leaflet-ellipsis.js',
  },
  mode: 'production',
  externals: {
    'ellipsis-js-util': 'ellipsis-js-util'
  }
};