const path = require("path");

module.exports = {
  webpack(config, options) {
    config.resolve.alias["components"] = path.join(__dirname, "components");
    config.resolve.alias["lib"] = path.join(__dirname, "lib");
    config.resolve.alias["queries"] = path.join(__dirname, "queries");
    config.resolve.alias["utils"] = path.join(__dirname, "utils");
    return config;
  }
};
