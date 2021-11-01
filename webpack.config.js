const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const app_config = {
  devtool: 'none',
  mode: 'development',
  entry: './client/index.js',
  plugins: [
    new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin({
    //   title: 'Mundungus',
    //   // template: path.join(__dirname, './public/index.html')
    // }),
  ],
  output: {
    path: path.join(__dirname, './build'),
    // filename: 'bundle.js',
  },
  devServer: {
    // contentBase: path.join(__dirname, './public/dist'),
    compress: true,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['cache-loader', 'babel-loader'],
        exclude: [/node_modules/],
      },
    ],
  },
}

module.exports = [app_config]
