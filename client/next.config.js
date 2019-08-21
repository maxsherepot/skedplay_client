const path = require("path");
const withCSS = require("@zeit/next-css");

module.exports = withCSS({
  cssLoaderOptions: {
    url: false
  },
  webpack(config, options) {
    config.resolve.alias["components"] = path.join(__dirname, "components");
    config.resolve.alias["lib"] = path.join(__dirname, "lib");
    config.resolve.alias["queries"] = path.join(__dirname, "queries");
    config.resolve.alias["utils"] = path.join(__dirname, "utils");
    config.resolve.alias["static"] = path.join(__dirname, "static");
    return config;
  }
});
