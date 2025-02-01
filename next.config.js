/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  basePath: '',
  assetPrefix: '/',
  images: {
    unoptimized: true
  },
  trailingSlash: true, // Tüm sayfa URL’lerinin sonunda / ekler
  reactStrictMode: true,
  // images: {
  //   domains: ['your-domain.com'],
  // },
  async redirects() {
    return [
      {
        source: '/projects',
        destination: '/',
        permanent: true,
      },
    ];
  }
};

export default nextConfig;