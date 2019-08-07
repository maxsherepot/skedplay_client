const app = process.env.npm_config_app || 'main';

module.exports = {
  output: {
    publicPath: `/js/apps/${app}/`,
    filename: '[name].js',
    chunkFilename: `chunks/[name].app.js`,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, `resources/js/apps/${app}`),
    },
  },
};
