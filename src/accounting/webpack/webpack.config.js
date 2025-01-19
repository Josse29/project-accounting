const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = {
  entry: {
    jquery: "./src/vendor/jquery.js",
    bootstrap: "./src/vendor/bootstrap.js",
    swal: "./src/vendor/swal.js",
    main: "./src/main.js",
  },
  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: "all",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      Swal: "sweetalert2",
    }),
  ],
  module: {
    rules: [
      {
        // test: /\.s[ac]ss$/i, scss
        // use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
};
