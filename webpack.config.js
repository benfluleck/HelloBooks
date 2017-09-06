const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');

//for production
// const CleanWebpackPlugin = require('clean-webpack-plugin')


const DIST_DIR = path.resolve(__dirname, "./client/dist");
const SRC_DIR = path.resolve(__dirname, "./client/src");


const extractscss = new ExtractTextPlugin(
{
    filename: 'style.css'
});

const config = {
 entry: SRC_DIR + "/app/index.js",
 output: {
  path: DIST_DIR + "/app",
  filename: "bundle.js",
  publicPath: ""
 },

devServer:{
    port:8080
},


 module: {
  loaders: [{
   test: /\.js?/,
   exclude: /node_modules/,
   include: SRC_DIR,
   loader: "babel-loader",
   query: {
    presets: ["react", "es2015", "stage-2"]
   },
  // rules:[
 },{ 
        test: /\.(scss|sass)$/, 
        use: extractscss.extract({ 
                fallback: 'style-loader', 
        use: [ 'css-loader','sass-loader' ]
       })
       },
  {
      test:/\.html$/,
      //options:{ sourceMap: true},
      use:['html-loader']
  },
  {

         test: /\.(jpg|png)$/, loader: "file-loader",
            options:{
            //     sourceMap: true ,
            //     name:'[name].[ext]',
                outputPath:'img/'
            //     publicPath:'./client/src/app/img/'
            }

  }
   // ]

]

 },
 plugins: [
     new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        output: {comments: false },
        mangle: false,
        sourcemap: false,
        minimize: true,
     }),

    extractscss,
    new HtmlPlugin({
        template:'./client/src/index.html',
        filename:'./index.html',
        inject: 'body'
    }),
    new PurifyCSSPlugin({
        // Give paths to parse for rules. These should be absolute!
        paths: glob.sync(path.join(__dirname, './client/src/*.html')),
      }),
      //for production
      // new CleanWebpackPlugin(['./client/dist'])

    ]

};

module.exports = config;