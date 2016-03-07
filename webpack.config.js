'use strict';

const webpack = require('webpack');

var path = require('path');
var fs = require('fs');

function listDirectories(dir) {
  var dirs = [path.resolve(dir)]
  fs.readdirSync(dir).map(function(item) {
    var subDir = path.resolve(dir + '/' + item)
    if (fs.lstatSync(subDir).isDirectory()) {
      dirs.push(subDir)
      dirs = dirs.concat(listDirectories(subDir))
    }
  })

  return dirs
}

module.exports = {

  entry: path.join(__dirname, 'src/index.js'),

  resolve: {
    extensions: ['', '.js', '.jsx', '.react'],
    root: listDirectories('./src')
  },

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'app.js'
  },

  devServer: {
    contentBase: path.join(__dirname, 'build'),
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    stats: 'errors-only',
    host: process.env.HOST,
    port: process.env.PORT
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: path.join(__dirname, 'src')
      },

      {
        test: /\.(js|jsx|react)$/,
        loaders: ['babel?cacheDirectory'],
        include: path.join(__dirname, 'src')
      },

      {
        test: /\.json$/,
        loaders: ['json']
      }
    ]
  }
};