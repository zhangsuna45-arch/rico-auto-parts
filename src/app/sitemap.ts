import { getProducts, getBlogPosts } from '@/lib/data';
import { categories } from '@/data/categories';
import { seriesList } from '@/data/series';
import { locales } from '@/i18n/routing';
import type { MetadataRoute } from 'next';

const SITE_URL = 'https://www.ricocaraccessories.com';

function localize(url: string, locale: string) {
  return `${SITE_URL}/${locale}${url}`;
}

function forAllLocales(
  path: string,
  overrides: Partial<MetadataRoute.Sitemap[number]> = {},
): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: localize(path, locale),
    ...overrides,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const today = new Date().toISOString().split('T')[0];

  const staticPaths: { path: string; priority: number; changeFreq: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '', priority: 1, changeFreq: 'weekly' },
    { path: '/products', priority: 0.9, changeFreq: 'weekly' },
    { path: '/blog', priority: 0.8, changeFreq: 'weekly' },
    { path: '/about', priority: 0.7, changeFreq: 'monthly' },
    { path: '/contact', priority: 0.7, changeFreq: 'monthly' },
  ];

  const staticRoutes = staticPaths.flatMap((s) =>
    forAllLocales(s.path, {
      lastModified: today,
      changeFrequency: s.changeFreq,
      priority: s.priority,
    }),
  );

  const [products, blogPosts] = await Promise.all([
    getProducts(),
    getBlogPosts(),
  ]);

  const categoryRoutes = categories.flatMap((c) =>
    forAllLocales(`/products/${c.slug}`, {
      lastModified: today,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    }),
  );

  const seriesRoutes = seriesList.flatMap((s) =>
    forAllLocales(`/products/${s.categorySlug}/${s.slug}`, {
      lastModified: today,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }),
  );

  const productRoutes = products.flatMap((p) =>
    forAllLocales(`/products/${p.categorySlug}/${p.seriesSlug}/${p.slug}`, {
      lastModified: today,
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    }),
  );

  const blogRoutes = blogPosts.flatMap((b) =>
    forAllLocales(`/blog/${b.slug}`, {
      lastModified: b.date,
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    }),
  );

  return [...staticRoutes, ...categoryRoutes, ...seriesRoutes, ...productRoutes, ...blogRoutes];
}
