/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'export', // Static export için gerekli
    assetPrefix: './', // Statik dosyaların relative yüklenmesini sağlar
    trailingSlash: true, // Sayfa yönlendirme sorunlarını önlemek için
    basePath: process.env.NODE_ENV === 'production' ? '/peaZ-OS' : '',
};

export default nextConfig;