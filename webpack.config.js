const webpack = require('webpack');
const path = require('path');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');


const DIST_DIR = path.resolve(__dirname, "./client/dist");
const SRC_DIR = path.resolve(__dirname, "./client/src");

const config = {
 entry: SRC_DIR + "/app/index.js",
 output: {
  path: DIST_DIR + "/app",
  filename: "bundle.js",
  publicPath: "/app/"
 },
 module: {
  loaders: [{
   test: /\.js?/,
   include: SRC_DIR,
   loader: "babel-loader",
   query: {
    presets: ["react", "es2015", "stage-2"]
   }
  }]
 }
};

module.exports = config;

// const config = {
//  context: __dirname,
//  entry: './src/index.js',
//  output: {
//   path: __dirname,
//   filename: 'bundle.js'
//  },
//  module: {
//   loaders: [{
//     exclude: /node_modules/,
//     test: /\.(js|jsx)$/,
//     loader: 'babel'
//    },
//    {
//     test: /\.scss$/,
//     loader: ExtractTextPlugin.extract('css!sass')
//    }
//   ]
//  },
//  devServer: {
//   historyApiFallback: true,
//   contentBase: './'
//  },
//  plugins: [
//   new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('production') } }),
//   new webpack.optimize.DedupePlugin(),
//   new webpack.optimize.OccurenceOrderPlugin(),
//   new webpack.optimize.UglifyJsPlugin({
//    compress: { warnings: false },
//    output: { comments: false },
//    mangle: false,
//    sourcemap: false,
//    minimize: true,
//    mangle: { except: ['$super', '$', 'exports', 'require', '$q', '$ocLazyLoad'] }
//   }),
//   new ExtractTextPlugin('src/public/stylesheets/app.css', {
//    allChunks: true
//   })
//  ]
// };

// module.exports = config;