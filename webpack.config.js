const path = require("path");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  // context: __dirname,

  entry: "./src/app.js",

  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].[hash].bundle.js"
  },

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]",
              outputPath: "images/",    // where the fonts will go
              //publicPath: "../"      // override the default path
            }  
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          }, {
            loader: "css-loader" // translates CSS into CommonJS
          }, {
            loader: "less-loader" // compiles Less to CSS
          }
        ]
      },
      {
        test: /\.css$/,
        /*use: [
          { loader: "style-loader/url" },
          { loader: "css-loader" }
        ],*/
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [{
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "fonts/",    // where the fonts will go
            //publicPath: "../"      // override the default path
          }
        }]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new ExtractTextPlugin("[name].[hash].bundle.css"),
    new CopyWebpackPlugin([{ from: "./src/static/images", to: "./static/images", toType: "dir" }])
  ]
};
