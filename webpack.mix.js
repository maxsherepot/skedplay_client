const mix = require('laravel-mix');
const config = require('./webpack.config.js');

const app = process.env.npm_config_app || 'main';

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

mix
  .react(`resources/js/apps/${app}/app.js`, '')
  .setPublicPath(`public/js/apps/${app}`)
  .webpackConfig(config);

if (mix.inProduction()) {
  mix.version();
} else {
  mix.sourceMaps();
}
