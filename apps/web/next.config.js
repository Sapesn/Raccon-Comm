/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@raccoon-kb/db', '@raccoon-kb/shared'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

export default nextConfig
