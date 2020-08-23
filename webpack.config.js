const path = require('path');
const nodeExternals =  require('webpack-node-externals');
const webpack = require('webpack');

const isProduction = typeof NODE_ENV !== 'undefined' && NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';
const devtool = isProduction ? false : 'inline-source-map';

module.exports = {
  entry: ["webpack/hot/poll?100", "./src/index.ts"],
  watch: true,
  target: "node",
  externals: [
    nodeExternals({
      allowlist: ["webpack/hot/poll?100"]
    })
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  mode,
  devtool,
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [new webpack.HotModuleReplacementPlugin],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index.js",
    publicPath: './dist',
  },
  node: {
    __dirname: false,
    __filename: false,
  }
};