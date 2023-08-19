const { withPlausibleProxy } = require("next-plausible");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
};

module.exports = withPlausibleProxy()(nextConfig);
