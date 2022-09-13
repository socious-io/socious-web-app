/** @type {import('next').NextConfig} */
//const withPlugins = require("next-compose-plugins");
const withImages = require('next-images');

module.exports = withImages({
  images: {
    disableStaticImages: true,
    unoptimized: true,
    domains: ['soscious.s3-ap-northeast-1.amazonaws.com'],
  },
});
