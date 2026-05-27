import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  productionBrowserSourceMaps: false,
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  turbopack: {
    root: process.cwd(),
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'ricocaraccessories.com',
          },
        ],
        destination: 'https://www.ricocaraccessories.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
