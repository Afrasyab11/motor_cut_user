/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   domains: ["via.placeholder.com"],
  // },
  images: {
    remotePatterns: [
      {
        //192.168.18.106:8080 
        protocol: 'http',
        hostname: '16.171.148.251',
      },
    ],
  },
};

export default nextConfig;
