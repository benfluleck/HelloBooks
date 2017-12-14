const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
let config = {};

if (isProd) {
  const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production'),
    GOOGLE_CLIENT_ID: JSON.stringify('701806023399-vgqondt26qh10vcuei77r7' +
    'nsbcd8oa8k.apps.googleusercontent.com')
  };
  config = {
    devtool: 'source-map',
    entry: path.resolve(__dirname, 'client/src/app/index.jsx'),
    resolve: {
      extensions: ['.js', '.jsx']
    },
    target: 'web',
    output: {
      path: `${__dirname}/client/dist/app/`,
      publicPath: '/',
      filename: 'bundle.js'
    },
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.DefinePlugin(GLOBALS),
      new ExtractTextPlugin('styles.css'),
      new webpack.optimize.UglifyJsPlugin({ minimize: true }),
      new HtmlPlugin({ template: './client/src/index.html', filename: './index.html', inject: 'body' })
    ],
    module: {
      loaders: [
        {
          test: /(\.css)$/,
          use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            use: ['css-loader', 'sass-loader']
          })
        },
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['react', 'es2015', 'stage-2']
          }
        },
        {
          test: /\.(woff|png|jpg|gif)$/,
          loader: 'url?prefix=font/&limit=5000'
        },
        {
          test: /\.(jpg|png)$/,
          exclude: /node-modules/,
          loader: 'file-loader',
          options: {
            outputPath: 'img/'
          }
        }
      ]
    },
    node: {
      dns: 'empty',
      net: 'empty',
      fs: 'empty'
    }
  };
} else {
  const DIST_DIR = path.resolve(__dirname, './client/dist');
  const SRC_DIR = path.resolve(__dirname, './client/src');
  const extractscss = new ExtractTextPlugin({ filename: 'style.css' });
  config = {
    entry: `${SRC_DIR}/app/index.jsx`,
    output: {
      path: `${DIST_DIR}/app`,
      filename: 'bundle.js',
      publicPath: ''
    },
    devtool: 'sourcemap',

    devServer: {
      historyApiFallback: true,
      proxy: {
        '/api/**': {
          target: 'http://localhost:5000/',
          secure: false,
          changeOrigin: true
        }
      }
    },

    stats: {
      errors: true,
      errorDetails: true
    },

    module: {
      loaders: [
        {
          test: /\.jsx?/,
          exclude: /node_modules/,
          include: SRC_DIR,
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015', 'stage-2']
          }
          // rules:[
        },
        {
          test: /(\.css)$/,
          use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
        },
        {
          test: /\.(scss|sass)$/,
          exclude: /node-modules/,
          use: extractscss.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader']
          })
        },
        {
          test: /\.html$/,
          exclude: /node-modules/,
          // options:{ sourceMap: true},
          use: ['html-loader']
        },
        {
          test: /\.(jpg|png)$/,
          exclude: /node-modules/,
          loader: 'file-loader',
          options: {
            outputPath: 'img/'
          }
        }
      ]
    },
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      extractscss,
      new HtmlPlugin({ template: './client/src/index.html', filename: './index.html', inject: 'body' }),
      new webpack.DefinePlugin({
        
        GOOGLE_CLIENT_ID: JSON.stringify('701806023399-vgqondt26qh10vcuei77r7' +
        'nsbcd8oa8k.apps.googleusercontent.com')
      })
    ]
  };
}
module.exports = config;
