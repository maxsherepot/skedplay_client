// const webpack = require('webpack');

require("dotenv").config();

const path = require("path");
const withSass = require("@zeit/next-sass");
const withCss = require("@zeit/next-css");
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const MomentTimezoneDataPlugin = require('moment-timezone-data-webpack-plugin');

const Dotenv = require("dotenv-webpack");

module.exports = withBundleAnalyzer(withSass(withCss({
  cssLoaderOptions: {
    url: false
  },
  webpack(config, {webpack}) {
    config.resolve.alias["components"] = path.join(__dirname, "components");
    config.resolve.alias["UI"] = path.join(__dirname, "components/Ui");
    config.resolve.alias["lib"] = path.join(__dirname, "lib");
    config.resolve.alias["queries"] = path.join(__dirname, "queries");
    config.resolve.alias["utils"] = path.join(__dirname, "utils");
    config.resolve.alias["rules"] = path.join(__dirname, "rules");
    config.resolve.alias["static"] = path.join(__dirname, "static");
    config.resolve.alias["styles"] = path.join(__dirname, "styles");
    config.resolve.alias["hooks"] = path.join(__dirname, "hooks");
    config.resolve.alias["icons"] = path.join(__dirname, "components/icons");
    config.resolve.alias["layouts"] = path.join(__dirname, "layouts");
    config.resolve.alias["locales"] = path.join(__dirname, "locales");
    config.resolve.alias["services"] = path.join(__dirname, "services");
    config.resolve.alias["pages"] = path.join(__dirname, "pages");
    config.resolve.alias["hoc"] = path.join(__dirname, "hoc");

    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, ".env"),
        systemvars: true
      })
    ];

    config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
    config.plugins.push(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|de|fr/));
    config.plugins.push(new MomentTimezoneDataPlugin({
      matchCountries: 'CH',
    }));

    return config;
  }
})));
