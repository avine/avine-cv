
const path = require("path");

const CleanPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");

const extractCss = new ExtractTextPlugin("app.bundle.[hash].css");

module.exports = {
  entry: "./src/app.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.bundle.[hash].js"
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: {
            attrs: [":src", "link:href"]
          }
        }
      },
      {
        test: /\.(png|jpg|gif|ico)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images/",
              name: "[name].[hash].[ext]"
            }  
          }
        ]
      },
      {
        test: /\.less$/,
        use: extractCss.extract({
          fallback: "style-loader",
          use: [
            { loader: "css-loader", options: { sourceMap: true } },
            { loader: "less-loader", options: { sourceMap: true } }
          ]
        })
      },
      {
        test: /\.css$/,
        use: extractCss.extract({
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
            outputPath: "fonts/"
          }
        }]
      }
    ]
  },

  plugins: [
    new CleanPlugin("./dist"),
    extractCss,
    new HtmlPlugin({ template: "./src/index.html" })
  ],

  devtool: "source-map",

  devServer: {
    open: true,
    host: "127.0.0.1",
    port: 3000
  }
};
