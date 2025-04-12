/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: process.env.BACKEND_URL ?? 'https://aiaudioapi.techrafter.com/:path*', // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
