const path = require('path')
const webpack = require('webpack')

// Plugins being used in the webpack build process.
const CleanPlugin = require('clean-webpack-plugin')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const config = {
  devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-source-map',
  entry: [
    './src/embed.js',
    'normalize.css/normalize.css',
    './src/embed.scss',
    'video.js/dist/video-js.css'
  ],
  output: {
    path: path.resolve(__dirname, './public'),
    publicPath: '/',
    filename: 'app.js'
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.s?(c|a)ss$/, loader: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'] },
      { test: /\.svg$/, loader: 'svg-sprite-loader' },
      {
        test: /\.(png|jpe?g|gif|woff|woff2|eot|ttf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'img/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `"${process.env.NODE_ENV}"`
      }
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  config.plugins = config.plugins.concat([
    new CleanPlugin(['dist'], { exclude: ['index.html'] }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: {
        warnings: false
      }
    })
  ])
}

module.exports = config
