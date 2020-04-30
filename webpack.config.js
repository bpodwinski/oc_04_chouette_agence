const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
let sourceMap = true;
let outputStyle = "expanded";

if (process.env.NODE_ENV === 'production') {
  sourceMap = false;
  outputStyle = "compressed";
}
 
module.exports = {
  mode: "development",
  devtool: 'source-map',
  entry: {
    main: ["./assets/scss/main.scss"],
  },
  output: {
    path: path.resolve(__dirname, "./"),
    filename: "webpack.log",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./assets/css/[name].css",
      chunkFilename: "./assets/css/[id].css",
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
