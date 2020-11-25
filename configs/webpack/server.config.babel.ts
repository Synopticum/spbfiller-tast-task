require('dotenv').config();
import path from 'path';
import nodeExternals from 'webpack-node-externals';
import NodemonPlugin from 'nodemon-webpack-plugin';

import webpack from 'webpack';
import merge from 'webpack-merge';

const rules = require('./common/rules');
const optimization = require('./common/optimization');
const resolve = require('./common/resolve');
const resolveLoader = require('./common/resolveLoader');

const target = 'node';
const entry = 'server';

const config = merge([
  {
    name: entry,
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: './src/server/index.ts',
    target,
    performance: {
      hints: false,
    },
    devtool: 'source-map',
    plugins: [
      new NodemonPlugin(),
      new webpack.EnvironmentPlugin(Object.keys(process.env).filter(x => x !== 'API_URL')),
    ],
    externals: nodeExternals(),
    output: {
      path: path.resolve(path.join('.', 'dist', 'server')),
      filename: 'index.js',
      libraryTarget: 'commonjs2',
      publicPath: '/',
    },
  },
  rules,
  optimization,
  resolve,
  resolveLoader,
]);

export default config;
