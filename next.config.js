/** @type {import('next').NextConfig} */
<<<<<<< HEAD:next.config.js
module.exports = {
  reactStrictMode: true,
};
=======
//const withPlugins = require("next-compose-plugins");
const withOptimizedImages = require("next-optimized-images");

module.exports = withOptimizedImages({
  responsive: {
    adapter: require("responsive-loader/sharp"),
  },
  images: {
    disableStaticImages: true,
  },
});
>>>>>>> main:frontend-next/next.config.js
