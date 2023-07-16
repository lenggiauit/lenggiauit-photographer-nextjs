/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    images: {
      allowFutureImage: true,
    },
    appDir: true,
  },
}

module.exports = nextConfig
