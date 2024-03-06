/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath: process.env.BASE_ROUTE,
  // trailingSlash: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "admin-sugarelite.tec-sense.co.in", port: "", pathname: "/**/**/**/**" }
    ]
  }
};

export default nextConfig;
