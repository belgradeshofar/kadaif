/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.kwcdn.com',       // Temu (slike proizvoda)
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'brendly-prod.s3.eu-central-1.amazonaws.com',  // Brendly server
        pathname: '/**',
      }
    ]
  }
};

module.exports = nextConfig;
