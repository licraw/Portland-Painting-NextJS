module.exports = {
    images: {
      domains: ['paintpdx.com'],
    },
    serverActions: {
      bodySizeLimit: '10mb', // Increase the limit to 10 MB or another suitable value
    },
    eslint: {
      // Ignore ESLint errors during builds
      ignoreDuringBuilds: true,
    },
    compiler: {
      styledComponents: true,
    },
  };