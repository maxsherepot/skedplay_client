require("dotenv").config();

const path = require("path");
const withSass = require("@zeit/next-sass");

const Dotenv = require("dotenv-webpack");

module.exports = withSass({
  cssLoaderOptions: {
    url: false
  },
  webpack(config, options) {
    config.resolve.alias["components"] = path.join(__dirname, "components");
    config.resolve.alias["UI"] = path.join(__dirname, "components/Ui");
    config.resolve.alias["lib"] = path.join(__dirname, "lib");
    config.resolve.alias["queries"] = path.join(__dirname, "queries");
    config.resolve.alias["utils"] = path.join(__dirname, "utils");
    config.resolve.alias["static"] = path.join(__dirname, "static");
    config.resolve.alias["styles"] = path.join(__dirname, "styles");
    config.resolve.alias["hooks"] = path.join(__dirname, "hooks");

    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, ".env"),
        systemvars: true
      })
    ];

    return config;
  }
});
