const path = require("path");

module.exports = {
  mode: "none",
  entry: "./src/webpack_entry.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "community_search.js",
    library: "CommunitySearch",
    libraryTarget: "umd",
  },
  target: "node",
  externals: [
    "axios",
    "bignumber.js",
    "bottleneck",
    "esm",
    "geolib",
    "ioredis",
    "lodash",
    "pg",
    "pg-hstore",
    "sequelize",
  ],
  cache: false,
  watch: false,
};
