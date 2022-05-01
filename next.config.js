/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')

const nextConfig = {
  reactStrictMode: true,
  pwa: {
    dest: 'public'
  },
  images: {
    domains: ['localhost', 'res.cloudinary.com', 'teslo-shop.jonathanleivag.cl']
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (dev) {
      config.module.rules.push({
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      })
    }
    return config
  }
}

module.exports = withPWA(nextConfig)
