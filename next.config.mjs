/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '192.168.18.106',
      },
    ],
  },
};

export default nextConfig;
