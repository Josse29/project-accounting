const path = require("path");
const { merge } = require("webpack-merge");
const config = require("./webpack.config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

// const PATHS = {
//   src: path.join(__dirname, "src"),
// };
// const glob = require("glob");
// const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");

module.exports = merge(config, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist-nosplit"),
    filename: "[name]-[contenthash].js",
    assetModuleFilename: "img/[hash][ext]",
    clean: true,
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]-[contenthash].css",
    }),
    // new PurgeCSSPlugin({
    //   paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
    // }),
  ],
});
