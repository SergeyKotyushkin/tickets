'use strict'

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // start point for the application scripts
  entry: './src/index.js',

  // built bundle options
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/'
  },

  // creates map file for simplifying debugging
  devtool: process.env.NODE_ENV == 'development'
    ? 'source-map'
    : false,

  // plugins are connected on some steps of the compilation process
  // and can do something
  plugins: [// copies built bundles into the page
    new HtmlWebpackPlugin({template: 'index.html'})],

  module: {
    // for files match with the test pattern the loader is used
    rules: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            // rules for files convertation
            // for syntax support
            presets: ['@babel/preset-env', '@babel/preset-react'],
            // prevent code duplication
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  }
}
