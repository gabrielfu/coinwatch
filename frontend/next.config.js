/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.coingecko.com',
      }
    ]
  },
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination: 
          process.env.NODE_ENV === 'development'
          ? 'http://127.0.0.1:8080/api/:path*'
          : '/api/',
      },
    ]
  },
}

module.exports = nextConfig
