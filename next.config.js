/** @type {import('next').NextConfig} */
const path = require('path');
//const withPlugins = require("next-compose-plugins");
const withImages = require('next-images');

module.exports = withImages({
  output: 'standalone',
  images: {
    disableStaticImages: true,
    unoptimized: true,
    domains: [
      'soscious.s3-ap-northeast-1.amazonaws.com',
      'process.filestackapi.com',
    ],
  },
  webpack: (
    config,
    {buildId, dev, isServer, defaultLoaders, nextRuntime, webpack},
  ) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        // ignore the cut down browser distribution that
        // joi's package.json steers webpack to
        joi: path.resolve(__dirname, 'node_modules/joi/lib/index.js'),
      },
    };
    // Important: return the modified config
    return config;
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        headers: [
          {key: 'Access-Control-Allow-Credentials', value: 'true'},
          {key: 'Access-Control-Allow-Origin', value: '*'},
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
});
