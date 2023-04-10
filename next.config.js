/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
  // reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

module.exports = nextConfig

