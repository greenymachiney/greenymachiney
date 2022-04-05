const path = require('path');
const SRC_DIR = path.resolve(__dirname, 'client');
const DIST_DIR = path.resolve(__dirname, 'dist');
<<<<<<< HEAD
const HtmlWebpackPlugin = require("html-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
=======
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
>>>>>>> 8fe51723b3be524aeb6879575ac3a0f2f961b3d5

module.exports = {
  mode: 'development',
  watch: true,
  devtool: 'eval-source-map',
  stats: {
    excludeModules: /node_modules/,
  },
  entry: {
    app: path.resolve(SRC_DIR, 'index.jsx'),
  },
  output: {
    path: DIST_DIR,
    publicPath: '/',
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
<<<<<<< HEAD
      template: path.resolve(SRC_DIR, "index.html"),
      inject: "body",
    }),
    new NodePolyfillPlugin()
=======
      template: path.resolve(SRC_DIR, 'index.html'),
      inject: 'body',
    }),
    new NodePolyfillPlugin(),
>>>>>>> 8fe51723b3be524aeb6879575ac3a0f2f961b3d5
  ],
  devServer: {
    historyApiFallback: true,
  },
};
