/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // protocol: "https",
        hostname: "backend.motor-cut.com",
        // hostname: "192.168.18.30",
      },
    ],
  },
};
export default nextConfig;
