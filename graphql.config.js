require("dotenv/config");

const { NEXT_PUBLIC_ACME_BACKEND_URL } = process.env;

module.exports = {
  schema: NEXT_PUBLIC_ACME_BACKEND_URL,
  documents: "apps/web/src/**/*.{ts,tsx}",
};
