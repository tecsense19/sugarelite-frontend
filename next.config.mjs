/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASE_ROUTE,
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true
  }
  // trailingSlash: true,
};

export default nextConfig;
