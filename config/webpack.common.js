// @ts-check
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const rootPath = path.join(__dirname, '..');
const publicPath = path.join(rootPath, 'public');
const appPath = path.join(rootPath, 'src');
const buildPath = path.join(rootPath, 'build');

module.exports = /** @type { import('webpack').Configuration } */ ({
  entry: path.join(appPath, 'index.tsx'),
  output: {
    path: path.join(buildPath, '/'),
    publicPath: '/',
    filename: '[name].[contenthash].js',
    clean: true,
  },
  cache: true,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
        include: appPath,
        exclude: [/[\\/]node_modules[\\/]/, /[\\/]config[\\/]/, /[\\/]mocks[\\/]/],
      },
      {
        test: /\.(ico|svg|png)$/,
        type: 'asset/resource',
        exclude: /[\\/]node_modules[\\/]/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      process: 'process/browser',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(publicPath, 'index.html'),
      favicon: path.join(publicPath, 'favicon.ico'),
      manifest: path.join(publicPath, 'manifest.json'),
    }),
    new Dotenv({
      path: path.join(rootPath, '.env'),
    }),
  ],
});
