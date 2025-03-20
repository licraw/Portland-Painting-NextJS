/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['paintpdx.com'],
  },
  experimental:{
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/',
        permanent: true,
      },
      {
        source: '/green-and-safe',
        destination: '/about-us/green-and-safe',
        permanent: true,
      },
      {
        source: '/employment',
        destination: '/about-us/employment',
        permanent: true,
      },
      {
        source: '/portland-interior-residential-painting',
        destination: '/painting/interior',
        permanent: true,
      },
      {
        source: '/portland-exterior-residential-painting',
        destination: '/painting/exterior',
        permanent: true,
      },
      {
        source: '/portland-residential-painting',
        destination: '/painting/interior',
        permanent: true,
      },
      {
        source: '/interior-painting-photo-gallery',
        destination: '/painting/interior',
        permanent: true,
      },
      {
        source: '/reviews',
        destination: '/about-us/reviews',
        permanent: true,
      },
      {
        source: '/portland-siding-deck-restoration',
        destination: '/restoration',
        permanent: true,
      },
    ]
  },
}
