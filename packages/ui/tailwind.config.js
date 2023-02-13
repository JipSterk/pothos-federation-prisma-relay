const { fontFamily } = require("tailwindcss/defaultTheme");
const config = require("@example/tailwind-config");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...config,
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...fontFamily.sans],
      },
    },
  },
};
