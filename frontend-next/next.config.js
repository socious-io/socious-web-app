/** @type {import('next').NextConfig} */
//const withPlugins = require("next-compose-plugins");
const withOptimizedImages = require('next-optimized-images');

module.exports = withOptimizedImages({
  responsive: {
    adapter: require('responsive-loader/sharp'),
  },
  images: {
    disableStaticImages: true,
  },
});
