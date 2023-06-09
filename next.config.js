/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'i.scdn.co'
    ],
    formats: [
      'image/webp'
    ]
  }
}

module.exports = nextConfig
