/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    ppr: true,
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
};

export default nextConfig;
