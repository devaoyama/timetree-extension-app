const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

/** @type {import('next').NextConfig} */
config = {
  reactStrictMode: true,
  pwa: {
    dest: "public",
    runtimeCaching,
  },
};

module.exports = withPWA(config);
