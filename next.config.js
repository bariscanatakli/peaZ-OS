/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Static export için gerekli
    basePath: '/peaZ-OS', // GitHub Pages repo adıyla aynı olmalı!
    assetPrefix: '/peaZ-OS/', // Statik dosyaların doğru yüklenmesi için
    trailingSlash: true, // Sayfa yollarında sonuna "/" ekler
};

export default nextConfig;