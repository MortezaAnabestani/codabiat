/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
  },
  // برای بهینه‌سازی فونت فارسی
  optimizeFonts: true,
  // برای SEO
  i18n: {
    locales: ['fa'],
    defaultLocale: 'fa',
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
