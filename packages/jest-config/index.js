const path = require("path");
const fs = require("fs");
const { defaults } = require("jest-config");

const { exclude, ...config } = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, `../../.swcrc`), "utf-8")
);

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  transform: {
    "^.+\\.tsx?$": ["@swc/jest", { ...config }],
  },
  testRegex: "/__tests__/.*\\.test\\.tsx?$",
  testPathIgnorePatterns: ["/node_modules/"],
  moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
};
