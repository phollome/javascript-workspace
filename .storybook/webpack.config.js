const webpack = require("webpack");
const path = require("path");

module.exports = ({ config }) => {
  config.resolve.alias = {
    ...config.resolve.alias,
    '@phollome/hooks': path.resolve(__dirname, '../packages/hooks/src/index.js'),
  };
  return config;
}
