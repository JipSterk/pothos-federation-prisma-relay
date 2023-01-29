/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  extends: ["turbo", "prettier"],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
  },
};
