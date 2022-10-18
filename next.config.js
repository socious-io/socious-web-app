/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
});
const path = require('path');
//const withPlugins = require("next-compose-plugins");
const withImages = require('next-images');

module.exports = withPWA(
  withImages({
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
  }),
);
