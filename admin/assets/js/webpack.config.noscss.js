var path = require("path");
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
  entry: {
    app: "./src/index.jsx"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "adminscript.js"
  },
  module: {
    rules: [
      {
        test: /\.scss$|\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use:[
          {
            loader: 'babel-loader',
            options: {
              presets: ["@babel/env", "@babel/react"],
              plugins: ["@babel/plugin-proposal-class-properties"],
            }
          }
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff2?|ttf|eot)$/i,
        use: [{ loader: 'url-loader', options: { limit: 1000000 } }]
      }
    ]
  },
  resolve: {
    extensions: [".css", ".js", ".jsx"]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new UglifyJsPlugin({
      sourceMap: false,
      cache: true,
      parallel: true,
      uglifyOptions: {
        warnings: false,
        mangle: { reserved: ['__'] },
      }
    })
  ]
};
