/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // protocol: "https",
        hostname: "backend.motor-cut.com",
        // hostname: "192.168.18.30",
        // hostname: "13.51.162.210",
      },
    ],
  },
};
export default nextConfig;
