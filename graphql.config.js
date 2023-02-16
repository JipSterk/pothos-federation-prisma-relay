require("dotenv/config");

const { NEXT_PUBLIC_BACKEND_URL } = process.env;

module.exports = {
  schema: NEXT_PUBLIC_BACKEND_URL,
  documents: "packages/web/src/**/*.{ts,tsx}",
};
