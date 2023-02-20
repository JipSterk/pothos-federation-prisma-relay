const { fontFamily } = require("tailwindcss/defaultTheme");
const config = require("@acme/tailwind-config");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...config,
  content: [...config.content, "../../packages/ui/lib/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
      },
    },
  },
};
