'use strict'

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  // sets webpack mode
  mode: process.env.NODE_ENV == 'development'
    ? 'development'
    : 'production',

  // start point for the application scripts
  entry: {
    "bundle": './src/index.js'
  },

  // built bundle options
  output: {
    filename: process.env.NODE_ENV == 'development'
      ? '[name]-[hash].js'
      : '[name]-[hash].min.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/'
  },

  // creates map file for simplifying debugging
  devtool: process.env.NODE_ENV == 'development'
    ? 'source-map'
    : false,

  // plugins are connected on some steps of the compilation process and can do
  // something
  plugins: [
    // copies built bundles into the page
    new HtmlWebpackPlugin({template: 'index.html', favicon: 'favicon.ico'}),
    //removes dist folder before build
    new CleanWebpackPlugin(['dist']),
    //copies static files
    new CopyWebpackPlugin([
      {
        from: './src/static/images',
        to: './images'
      }
    ])
  ],

  module: {
    // for files match with the test pattern the loader is used
    rules: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            // rules for files convertation for syntax support
            presets: [
              '@babel/preset-env', '@babel/preset-react'
            ],
            // prevent code duplication
            plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties']
          }
        }
      }, {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          }, {
            loader: "css-loader"
          }
        ]
      }
    ]
  },

  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src', 'components'),
      constants: path.resolve(__dirname, 'common', 'constants'),
      localization: path.resolve(__dirname, 'src', 'localization'),
      services: path.resolve(__dirname, 'src', 'services'),
      static: path.resolve(__dirname, 'src', 'static'),
      stores: path.resolve(__dirname, 'src', 'stores')
    }
  }
}

if (process.env.NODE_ENV == 'production') {
  if (!module.exports.optimization) {
    module.exports.optimization = {};
  }

  if (!module.exports.optimization.minimizer) {
    module.exports.optimization.minimizer = [];
  }

  module.exports.optimization.minimizer.push(new UglifyJsPlugin({
    test: /\.min\.js$/,
    uglifyOptions: {
      ie8: false,
      mangle: true,
      output: {
        comments: false,
        beautify: false
      },
      compress: {
        warnings: false, // Suppress uglification warnings
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true
      },
      warnings: false
    }
  }));

  module.exports.plugins.push(
    new CompressionPlugin({test: /\.min\.jsx?$/, filename: "[path].gz[query]", algorithm: "gzip", deleteOriginalAssets: true})
  );
}
