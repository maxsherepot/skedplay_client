const path = require("path");
const withSass = require('@zeit/next-sass');

module.exports = withSass({
    cssModules: true,
    cssLoaderOptions: {
        url: false
    },
    sassLoaderOptions: {
    },
    webpack(config, options) {
        config.resolve.alias["components"] = path.join(__dirname, "components");
        config.resolve.alias["lib"] = path.join(__dirname, "lib");
        config.resolve.alias["queries"] = path.join(__dirname, "queries");
        config.resolve.alias["utils"] = path.join(__dirname, "utils");
        config.resolve.alias["static"] = path.join(__dirname, "static");
        config.resolve.alias["styles"] = path.join(__dirname, "styles");
        return config;
    }
});
