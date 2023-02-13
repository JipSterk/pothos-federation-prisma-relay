const { fontFamily } = require("tailwindcss/defaultTheme");
const config = require("@example/tailwind-config");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...config,
  content: [...config.content, "../../packages/ui/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
      },
    },
  },
};
