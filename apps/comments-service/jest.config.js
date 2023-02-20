const { name } = require("./package.json");
const { testPathIgnorePatterns, ...config } = require("@acme/jest-config");

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  displayName: name,
  testEnvironment: "node",
  testPathIgnorePatterns: [...testPathIgnorePatterns, "/__generated__/"],
  ...config,
};
