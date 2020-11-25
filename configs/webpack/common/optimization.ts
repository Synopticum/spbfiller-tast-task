module.exports = {
  optimization: {
    runtimeChunk: false,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        common: {
          minChunks: 2,
          name: 'common',
          chunks: 'all',
        },
        material: {
          test: /\/node_modules\/@material-ui/,
          name: 'material-ui',
          chunks: 'all',
        },
      },
    },
  },
};
