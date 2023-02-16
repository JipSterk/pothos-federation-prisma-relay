const nextJest = require("next/jest");
const { name } = require("./package.json");
const config = require("@example/jest-config");

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = createJestConfig({
  displayName: name,
  moduleNameMapper: {
    "^@/src/(.*)$": "<rootDir>/src/$1",
  },
  testEnvironment: "jsdom",
  ...config,
});
