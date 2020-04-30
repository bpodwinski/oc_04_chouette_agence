const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
let sourceMap = true;

if (process.env.NODE_ENV === 'production') {
  sourceMap = false;
}

module.exports = {
  mode: "development",
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
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
            },
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
              outputPath: "../",
            },
          },
        ],
      },
      {
        test: /\.(svg|eot|woff|woff2|ttf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
              outputPath: "../",
            },
          },
        ],
      },
    ],
  },
};
