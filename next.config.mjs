/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASE_ROUTE,
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true
  },
  async rewrites() {
    return [
      { source: '/admin/:path*', destination: '/admin/:path*' },
    ];
  },
  // trailingSlash: true,
};

export default nextConfig;
