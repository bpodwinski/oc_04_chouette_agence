const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
let sourceMap = true;
let outputStyle = "expanded";

if (process.env.NODE_ENV === "production") {
  sourceMap = false;
  outputStyle = "compressed";
}

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: {
    main: [
      "./assets/js/app.js",
      "./assets/js/blocs.js",
      "./assets/js/jquery.touchSwipe.js",
      "./assets/scss/main.scss",
    ],
  },
  output: {
    path: path.resolve(__dirname, "./"),
    filename: "assets/js/main.js",
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].css",
      chunkFilename: "assets/css/[id].css",
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      Popper: ["popper.js", "default"],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(svg|eot|woff|woff2|ttf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "./assets/fonts/",
              publicPath: "../fonts/",
              name: "[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "./assets/img/",
              publicPath: "../img/",
              name: "[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: sourceMap,
              url: true,
            },
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: sourceMap,
              sassOptions: {
                outputStyle: outputStyle,
              },
            },
          },
        ],
      },
    ],
  },
};
