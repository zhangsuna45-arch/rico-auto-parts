import { getProductsByCategory, getCategories, getSeries } from '@/lib/data';
import { ProductCard } from '@/components/ProductCard';
import { BreadcrumbSchema } from '@/components/StructuredData';
import { Link } from '@/i18n/navigation';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

interface SeriesPageProps {
  params: Promise<{ category: string; series: string; locale: string }>;
}

export async function generateStaticParams() {
  const allSeries = await getSeries();
  const params: { category: string; series: string; locale: string }[] = [];
  for (const locale of routing.locales) {
    for (const s of allSeries) {
      params.push({ locale, category: s.categorySlug, series: s.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: SeriesPageProps): Promise<Metadata> {
  const { category, series, locale } = await params;
  const allCategories = await getCategories();
  const allSeries = await getSeries();
  const seriesData = allSeries.find((s) => s.categorySlug === category && s.slug === series);

  if (!seriesData) {
    return { title: 'Series Not Found' };
  }

  const canonical = `https://www.ricocaraccessories.com/${locale}/products/${category}/${series}`;

  return {
    title: `${seriesData.name} | ${allCategories.find((c) => c.slug === category)?.name || 'Products'}`,
    description: seriesData.description,
    alternates: {
      canonical,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `https://www.ricocaraccessories.com/${l}/products/${category}/${series}`]),
      ),
    },
    openGraph: {
      title: `${seriesData.name} | Rico Car Accessories`,
      description: seriesData.description,
    },
  };
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  const { category, series, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products' });

  const allCategories = await getCategories();
  const allSeries = await getSeries();
  const categoryData = allCategories.find((c) => c.slug === category);
  const seriesData = allSeries.find((s) => s.categorySlug === category && s.slug === series);

  if (!categoryData || !seriesData) {
    notFound();
  }

  // Get products in this category, then filter by series
  const categoryProducts = await getProductsByCategory(category);
  const seriesProducts = categoryProducts.filter((p) => p.seriesSlug === series);

  return (
    <div style={{ background: '#f7f9fc', minHeight: '100vh' }}>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `/${locale}` },
          { name: categoryData.name, url: `/${locale}/products/${categoryData.slug}` },
          { name: seriesData.name, url: `/${locale}/products/${categoryData.slug}/${seriesData.slug}` },
        ]}
      />

      {/* Breadcrumb */}
      <div
        style={{
          background: '#fff',
          borderBottom: '1px solid rgba(15,23,42,0.06)',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '14px 24px',
            fontSize: '14px',
            color: '#64748b',
          }}
        >
          <Link href="/" style={{ color: '#2563eb', textDecoration: 'none' }}>
            Home
          </Link>
          <span> / </span>
          <Link
            href={`/products/${category}`}
            style={{ color: '#2563eb', textDecoration: 'none' }}
          >
            {categoryData.name}
          </Link>
          <span> / </span>
          <span>{seriesData.name}</span>
        </div>
      </div>

      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
          color: '#fff',
          padding: '80px 60px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            color: 'rgba(255,255,255,0.85)',
            fontWeight: 700,
            letterSpacing: '4px',
            margin: '0 0 20px 0',
          }}
        >
          {categoryData.name}
        </p>
        <h1
          style={{
            fontSize: '64px',
            fontWeight: 900,
            lineHeight: 1.1,
            margin: '0 0 20px 0',
          }}
        >
          {seriesData.name}
        </h1>
        <p style={{ fontSize: '18px', opacity: 0.9, margin: '0 0 12px 0' }}>
          {seriesData.description}
        </p>
        <p
          style={{
            fontSize: '14px',
            opacity: 0.7,
            margin: 0,
            fontWeight: 600,
          }}
        >
          {seriesProducts.length} {seriesProducts.length === 1 ? t('product') : t('products')}
        </p>
      </div>

      {/* Products Grid */}
      <section
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '72px 24px',
        }}
      >
        {seriesProducts.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '32px',
            }}
          >
            {seriesProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: '18px', color: '#64748b', marginBottom: '20px' }}>
              {t('noProductsInCategory')}
            </p>
            <Link
              href={`/products/${category}`}
              style={{
                color: '#2563eb',
                fontWeight: 600,
                textDecoration: 'none',
                fontSize: '16px',
              }}
            >
              {t('browseAll')}
            </Link>
          </div>
        )}
      </section>

      {/* CTA */}
      <section
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '72px 24px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            background: '#fff',
            borderRadius: '32px',
            padding: '60px',
            border: '1px solid rgba(15,23,42,0.06)',
          }}
        >
          <h2
            style={{
              fontSize: '36px',
              fontWeight: 900,
              margin: '0 0 16px 0',
              color: '#0f172a',
            }}
          >
            {t('needCustom')}
          </h2>
          <p
            style={{
              fontSize: '18px',
              color: '#64748b',
              margin: '0 0 30px 0',
            }}
          >
            {t('customDescription')}
          </p>
          <Link href="/contact">
            <button
              style={{
                background: '#2563eb',
                color: '#fff',
                border: 'none',
                padding: '16px 40px',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              {t('requestQuote')}
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
