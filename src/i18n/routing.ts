import { defineRouting } from 'next-intl/routing';

const allLocales = ['en', 'es', 'fr', 'de', 'ar', 'ru'] as const;
const devLocales = ['en'] as const;

export const routing = defineRouting({
  locales: (process.env.NODE_ENV === 'development' ? devLocales : allLocales) as readonly string[],
  defaultLocale: 'en',
  localePrefix: 'always',
});

export const locales = routing.locales;
export const defaultLocale = routing.defaultLocale;
