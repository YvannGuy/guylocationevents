const withNextIntl = require("next-intl/plugin")();

const nextConfig = {
  transpilePackages: ["mui-one-time-password-input"],
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
  images: {
    domains: ["localhost", "127.0.0.1"],
  },
};

// Merge the Next.js configuration with the next-intl plugin
module.exports = withNextIntl(nextConfig);
