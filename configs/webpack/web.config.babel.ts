require('dotenv').config();
import path from 'path';
import LoadablePlugin from '@loadable/webpack-plugin';
import webpack from 'webpack';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import merge from 'webpack-merge';
import CopyPlugin from 'copy-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

import proxy from '../../src/server/middlewares/proxy';

const rules = require('./common/rules');
const optimization = require('./common/optimization');
const resolve = require('./common/resolve');
const resolveLoader = require('./common/resolveLoader');

const target = 'web';
const entry = 'web';

const isProduction = process.env.NODE_ENV === 'production';
const config = merge([
  {
    name: entry,
    mode: isProduction ? 'production' : 'development',
    entry: ['regenerator-runtime/runtime', 'core-js/stable', `./src/main-${entry}.tsx`],
    target,
    performance: {
      hints: false,
    },
    devtool: 'source-map',
    plugins: [
      new ESLintPlugin({ extensions: ['ts', 'tsx'] }),
      new StylelintPlugin({ files: '**/*.(ts|tsx)' }),
      new webpack.EnvironmentPlugin(Object.keys(process.env)),
      new LoadablePlugin(),
      new CircularDependencyPlugin({
        exclude: /node_modules/,
        failOnError: true,
        allowAsyncCycles: false,
        cwd: process.cwd(),
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(path.join('.', 'src', 'index.ejs')),
        templateParameters: {
          ssrData: null,
        },
      }),
      new CopyPlugin({
        patterns: [
          { from: path.resolve(path.join('.', 'src', 'public')), to: path.resolve(path.join('.', 'dist', 'web')) },
        ],
      }),
      new CleanWebpackPlugin(),
    ],
    output: {
      path: path.resolve(path.join('.', 'dist', 'web')),
      filename: '[name].[hash:6].js',
      publicPath: '/web/',
    },
    devServer: {
      port: 9000,
      host: '0.0.0.0',
      hotOnly: true,
      historyApiFallback: {
        index: '/web/',
      },
      before: (app): void => {
        app.use(['/api/rectangles/', '/api/rectangle/'], proxy(process.env.API_URL));
      },
    },
  },
  rules,
  optimization,
  resolve,
  resolveLoader,
]);

export default config;
