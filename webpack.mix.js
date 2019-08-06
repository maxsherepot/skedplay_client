const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

const app = process.env.npm_config_app || 'main';

mix
  .react(`resources/js/apps/${app}/app.js`, '')
  .setPublicPath(`public/js/apps/${app}`)
  .webpackConfig({
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
  });

if (mix.inProduction()) {
  mix.version();
} else {
  mix.sourceMaps();
}
