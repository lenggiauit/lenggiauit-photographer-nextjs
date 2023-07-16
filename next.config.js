/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    images: {
      allowFutureImage: false,
    },
    appDir: true,
  },
}

module.exports = nextConfig
