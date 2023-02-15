const { name } = require("./package.json");
const config = require("@example/jest-config");

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  displayName: name,
  testEnvironment: "jsdom",
  ...config,
};
