/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const git = require("./plugins/webpack/git");
const pkg = require("./plugins/webpack/package");
const stats = require("./plugins/webpack/stats");
const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const config = {
  entry: "./src/app/index.tsx",
  mode: "development",
  devtool: false,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  optimization: {
    usedExports: false,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: 2020,
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.svg$/,
        use: "file-loader",
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: "url-loader",
            options: {
              mimetype: "image/png",
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
      {
        test: /\.mdx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: ["@babel/plugin-transform-react-jsx"],
            },
          },
          {
            loader: "@mdx-js/loader",
            /** @type {import('@mdx-js/loader').Options} */
            options: {},
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new CompressionPlugin({
      test: /bundle\.js$/,
      filename: "[path][base].gz",
    }),
    new webpack.DefinePlugin({
      _GIT_SHORT_COMMIT: JSON.stringify(git.commitHash.short),
      _GIT_LONG_COMMIT: JSON.stringify(git.commitHash.long),
      _GIT_BRANCH: JSON.stringify(git.branch),
      _GIT_REPO: JSON.stringify(git.repo),
    }),
    new webpack.DefinePlugin({
      _VERSION: JSON.stringify(pkg.version),
    }),
    new webpack.DefinePlugin({
      _FILE_COUNT: JSON.stringify(stats.getFileCount()),
      _LINE_COUNT: JSON.stringify(stats.getLines()),
      _CHAR_COUNT: JSON.stringify(stats.getChars()),
      _WORD_COUNT: JSON.stringify(stats.getWords()),
    }),
    new HtmlWebpackPlugin({
      appMountId: "app",
      filename: "index.html",
      template: "./src/app/index.html",
      title: "InCode Editor",

      meta: {
        viewport: {
          name: "viewport",
          content: "width=device-width, initial-scale=1.0",
        },
        robots: {
          name: "robots",
          content: "INDEX,FOLLOW",
        },
        description:
          "Der offizielle Editor für die InCode Programmiersprache von Ben Siebert und Lukas Birke.",
        keywords: "InCode, Editor, IDE, Ben Siebert, Lukas Birke",
        author: "The InCode Developers",
        publisher: "The InCode Developers",
        copyright: "Copyright © 2021 The InCode Developers.",
        expires: "",
        "revisit-after": "2 days",
      },
    }),
    new CopyPlugin({
      patterns: [{ from: "./src/public", to: "." }],
    }),
  ],
};

module.exports = config;
