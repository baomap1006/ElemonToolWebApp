/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['statics.elemon.io','app.elemon.io'],
    unoptimized: true,
  },
}

module.exports = nextConfig
