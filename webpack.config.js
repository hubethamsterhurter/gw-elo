const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const clientSourcePath = `${__dirname}/src/client`;
const clientDistPath = `${__dirname}/dist/client`;

// /g DOES in-fact replace all in String.prototype.replaceAll
const appVersionSuffix = require(`${__dirname}/package.json`).version.replace(/\./g, '-');

const config = {
  entry: `${clientSourcePath}/index.tsx`,
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
    path: clientDistPath,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        // doh!
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: { configFile: `${__dirname}/tsconfig.json` },
      },
      // All output '.js' files will have any sourcemaps re-processed by source-map-loader
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'css-hot-loader',
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          }
        ]
      },
    ],
  },
  plugins: [
    // TODO: hot module replacement?
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: `${clientSourcePath}/index.html`,
      filename: `${clientDistPath}/index.html`,
      hash: true,
      templateParameters: {
        appVersionSuffix,
      }
    }),
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin([{
      from: `${clientSourcePath}/public`,
      to: `${clientDistPath}/public`,
      toType: 'dir',
    }]),
  ]
}


module.exports = config;
