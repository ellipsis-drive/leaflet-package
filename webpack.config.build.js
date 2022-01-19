const path = require('path');

module.exports = {
  entry: './src/lib/index.js',
  output: {
    publicPath: '',
    path: path.resolve(__dirname, 'build'),
    library: {
      name: 'arcgisjsEllipsis',
      type: 'umd'
    },
    filename: 'arcgisjs-ellipsis.js',
  },
  mode: 'production',
  externals: {
    'ellipsis-js-util': 'ellipsis-js-util'
  }
};