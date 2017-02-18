'use strict';
let path = require('path');
let defaultSettings = require('./defaults');

// Additional npm or bower modules to include in builds
// Add all foreign plugins you may need into this array
// @example:
// let npmBase = path.join(__dirname, '../node_modules');
// let additionalPaths = [ path.join(npmBase, 'react-bootstrap') ];
let additionalPaths = [];

module.exports = {
  additionalPaths: additionalPaths,
  port: defaultSettings.port,
  debug: true,
  devtool: 'eval',
  output: {
    path: path.join(__dirname, '/../dist/assets'),
    filename: 'app.js',
    publicPath: defaultSettings.publicPath
  },
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    hot: true,
    port: defaultSettings.port,
    publicPath: defaultSettings.publicPath,
    noInfo: false,
    proxy: {
      '/api': {
        // target: 'http://36.110.49.108:8000',
        // target: 'http://127.0.0.1:8081',// local debug,
        target: 'http://121.41.99.209:8081',// local debug,
        secure: false, changeOrigin: true, debug: true
      }
    }
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      act: `${defaultSettings.srcPath}/actions/`,
      cpn: `${defaultSettings.srcPath}/components/`,
      stores: `${defaultSettings.srcPath}/stores/`,
      data: `${defaultSettings.srcPath}/data/`,
      utils: `${defaultSettings.srcPath}/utils/`,
      config: `${defaultSettings.srcPath}/config/` + process.env.REACT_WEBPACK_ENV,
    }
  },
  module: {}
};
