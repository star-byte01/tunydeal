import createNextIntlPlugin from 'next-intl/plugin';
 
// The path now points to the new i18n.ts inside the src directory.
const withNextIntl = createNextIntlPlugin('./src/i18n.ts');
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "api.lorem.space" },
      { protocol: "https", hostname: "placeimg.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};
 
export default withNextIntl(nextConfig);