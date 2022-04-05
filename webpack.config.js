const path = require('path');
const SRC_DIR = path.resolve(__dirname, 'client');
const DIST_DIR = path.resolve(__dirname, 'dist');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

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
      template: path.resolve(SRC_DIR, "index.html"),
      inject: "body",
    }),
    new NodePolyfillPlugin()
  ],
  devServer: {
    historyApiFallback: true,
  },
};