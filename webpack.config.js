const path = require('path')
const globals = require('./globals')
const webpack = require('webpack')
require('dotenv').config()

let isProduction

module.exports = (env = {}) => {

  isProduction = env.production === true

  return {
    entry: {
      app: ["core-js/stable", "regenerator-runtime/runtime", 'lodash.throttle', 'lodash.debounce', 'dompurify', 'picturefill', './src/js/index.js'],
    },
    output: {
      filename: isProduction ? '[name].[contenthash].js' : '[name].js',
      chunkFilename: isProduction ? '[name].[contenthash].js' : '[name].js',
      path: path.resolve(__dirname, 'dist', 'js'),
      publicPath: `${globals.PP}/js/`,
      clean: false // Don't clean the dist folder to preserve copied files
    },
    module: {
      rules: [{
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                modules: false,
                targets: {
                  browsers: ['last 2 versions', '> 1%']
                }
              }],
            ],
            plugins: [
              '@babel/plugin-syntax-dynamic-import'
            ]
          }
        }],
      }, {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      }]
    },
    plugins: [
      new webpack.DefinePlugin({
        PP: JSON.stringify(''),
        SITE_TITLE: JSON.stringify(globals.SITE_TITLE),
        DESCRIPTION: JSON.stringify(globals.DESCRIPTION),
        SITE_URL: JSON.stringify(globals.SITE_URL),
        DEVELOPER_NAME: JSON.stringify(globals.DEVELOPER_NAME),
        DEVELOPER_URL: JSON.stringify(globals.DEVELOPER_URL),
        GOOGLE_ANALYTICS_ID: JSON.stringify(globals.GOOGLE_ANALYTICS_ID),
        'process.env.REOWN_PROJECT_ID': JSON.stringify(process.env.REOWN_PROJECT_ID),
        'process.env.ETHEREUM_NODE_URL': JSON.stringify(process.env.ETHEREUM_NODE_URL)
      }),
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        process: 'process/browser'
      })
    ],
    resolve: {
      alias: {
        dist: globals.Dir.dist,
        src: globals.Dir.src,
        css: globals.Dir.css,
        js: globals.Dir.js,
        utils: globals.Dir.utils,
        static: globals.Dir.static,
        images: globals.Dir.images,
        videos: globals.Dir.images,
        vendor: globals.Dir.vendor,
        views: globals.Dir.views,
        pages: globals.Dir.pages,
        partials: globals.Dir.partials,
        "process/browser": require.resolve("process/browser"),
      },
      fallback: {
        "buffer": require.resolve("buffer"),
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "os": require.resolve("os-browserify"),
        "url": require.resolve("url"),
        "zlib": require.resolve("browserify-zlib"),
        "path": require.resolve("path-browserify"),
        "process": require.resolve("process/browser"),
        "fs": false,
        "net": false,
        "tls": false
      },
      extensions: ['.js', '.mjs', '.json'],
      symlinks: false
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all'
          }
        }
      }
    },
    experiments: {
      topLevelAwait: true
    },
    devtool: isProduction ? false : 'eval-source-map',
    mode: isProduction ? 'production' : 'development'
  }
}
