/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '16.171.148.251',
      },
    ],
  },
};

export default nextConfig;
