const { fontFamily } = require("tailwindcss/defaultTheme");
const config = require("@acme/tailwind-config");

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
