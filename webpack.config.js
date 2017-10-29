var path = require('path');

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "assets/app.js",
    path: path.resolve(__dirname, "app")
  },
  devServer: {
    contentBase: path.join(__dirname, "app")
  }
};
