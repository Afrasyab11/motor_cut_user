/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'backend.motor-cut.com',
      },
    ],
  },
};

export default nextConfig;
