/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: process.env.BACKEND_URL + '/:path*', // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
