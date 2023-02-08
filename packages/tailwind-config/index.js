const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

const brandColor = colors.purple;

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        gray: colors.gray,
        brand: brandColor,
      },
      ringColor: {
        DEFAULT: brandColor["500"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
  ],
};
