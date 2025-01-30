/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Add other Next.js config options here
    assetPrefix: process.env.NODE_ENV === 'production' ? '/peaZ-OS/' : '',
    basePath: process.env.NODE_ENV === 'production' ? '/peaZ-OS' : '',
    output: 'export',
};

export default nextConfig;