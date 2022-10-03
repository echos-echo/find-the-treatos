const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
    ],
  },
  performance: {
    maxEntrypointSize: 9000000,
    maxAssetSize: 9000000
  },
  mode: 'production'
};