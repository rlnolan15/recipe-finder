var path = require("path");
var SRC_DIR = path.join(__dirname, "/client/src");
var DIST_DIR = path.join(__dirname, "/client/dist");
require("babel-polyfill");

module.exports = {
  entry: ["babel-polyfill", `${SRC_DIR}/index.js`],
  output: {
    path: DIST_DIR,
    filename: "bundle.js"
  },
  node: {
    fs: "empty",
    net: "empty",
    tls: "empty"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"]
          }
        }
      }
    ]
  }
};
