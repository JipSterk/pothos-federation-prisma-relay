const { name } = require("./package.json");
const { testPathIgnorePatterns, ...config } = require("@acme/jest-config");

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  displayName: name,
  testEnvironment: "jsdom",
  testPathIgnorePatterns: [...testPathIgnorePatterns, "/lib/"],
  ...config,
};
