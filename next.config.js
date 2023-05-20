/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: [
      'media-3.api-sports.io',
      'media-2.api-sports.io',
      'media-1.api-sports.io',
      'avatars.githubusercontent.com',
    ],
  },
}

module.exports = nextConfig
