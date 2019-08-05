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

let entry = 'resources/js/app.js';
const tag = process.env.npm_config_tag;

switch (tag) {
  case 'main':
    entry = 'resources/js/main.js';
  case 'app':
  default:
    break;
}

mix
  .react(entry, '')
  .setPublicPath('public/js/app')
  .webpackConfig({
    output: {
      publicPath: '/app/',
      chunkFilename: 'chunk/[name].js',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      alias: {
        '@': path.resolve(__dirname, 'resources/js/'),
      },
    },
  });
