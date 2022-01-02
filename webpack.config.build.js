const path = require('path');

module.exports = {
    entry: './src/lib/index.js',
    output: {
      publicPath: '',
      path: path.resolve(__dirname, 'build'),
      library: {
        name: 'ellipsis',
        type: 'umd'
      },
      filename: 'arcgisjs-ellipsis.js',
    },
    mode: 'production'
};