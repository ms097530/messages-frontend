/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'maple-seemly-visage.glitch.me']
  }
}

module.exports = nextConfig
