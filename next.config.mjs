/** @type {import('next').NextConfig} */

const nextConfig = {
  // basePath: process.env.BASE_ROUTE,
  // trailingSlash: true,
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "admin-sugarelite.tec-sense.co.in", port: "", pathname: "/**/**/**/**" },
      { protocol: "https", hostname: "admin.sugarmake.dk", port: "", pathname: "/**/**/**/**" }
    ]
  }
};

export default nextConfig;
