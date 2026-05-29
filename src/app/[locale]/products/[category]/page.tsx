import { getProductsByCategory, getCategories, getSeriesByCategorySlug } from '@/lib/data';
import { BreadcrumbSchema } from '@/components/StructuredData';
import { Link } from '@/i18n/navigation';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

interface CategoryPageProps {
  params: Promise<{ category: string; locale: string }>;
}

export function generateStaticParams() {
  const params: { category: string; locale: string }[] = [];
  for (const locale of routing.locales) {
    for (const c of [
      { slug: 'interior-accessories' },
      { slug: 'electronics-charging' },
      { slug: 'car-lighting' },
      { slug: 'exterior-accessories' },
      { slug: 'functional-accessories' },
    ]) {
      params.push({ locale, category: c.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category, locale } = await params;
  const allCategories = await getCategories();
  const categoryData = allCategories.find((c) => c.slug === category);

  if (!categoryData) {
    return { title: 'Category Not Found' };
  }

  return {
    title: `${categoryData.name} | Car Accessories`,
    description: categoryData.description,
    alternates: {
      canonical: `https://www.ricocaraccessories.com/${locale}/products/${category}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `https://www.ricocaraccessories.com/${l}/products/${category}`]),
      ),
    },
    openGraph: {
      title: `${categoryData.name} | Rico Car Accessories`,
      description: categoryData.description,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products' });

  const allCategories = await getCategories();
  const categoryData = allCategories.find((c) => c.slug === category);
  if (!categoryData) {
    notFound();
  }

  const categorySeries = await getSeriesByCategorySlug(category);
  const categoryProducts = await getProductsByCategory(category);

  // Count products per series
  function getProductCount(seriesSlug: string): number {
    return categoryProducts.filter((p) => p.seriesSlug === seriesSlug).length;
  }

  return (
    <div style={{ background: '#f7f9fc', minHeight: '100vh' }}>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `/${locale}` },
          { name: 'Products', url: `/${locale}/products` },
          { name: categoryData.name, url: `/${locale}/products/${categoryData.slug}` },
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
          <Link href="/products" style={{ color: '#2563eb', textDecoration: 'none' }}>
            Products
          </Link>
          <span> / </span>
          <span>{categoryData.name}</span>
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
            color: 'rgba(255,255,255,0.9)',
            fontWeight: 700,
            letterSpacing: '4px',
            margin: '0 0 20px 0',
          }}
        >
          {t('productCategory')}
        </p>
        <h1
          style={{
            fontSize: '64px',
            fontWeight: 900,
            lineHeight: 1.1,
            margin: '0 0 20px 0',
          }}
        >
          {categoryData.name}
        </h1>
        <p style={{ fontSize: '18px', opacity: 0.9, margin: 0 }}>
          {categoryData.description}
        </p>
      </div>

      {/* Series Cards Grid */}
      <section
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '72px 24px',
        }}
      >
        {categorySeries.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
              gap: '32px',
            }}
          >
            {categorySeries.map((s) => {
              const count = getProductCount(s.slug);
              return (
                <Link
                  key={s.id}
                  href={`/products/${category}/${s.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    style={{
                      background: '#fff',
                      borderRadius: '24px',
                      overflow: 'hidden',
                      border: '1px solid rgba(15,23,42,0.06)',
                      boxShadow: '0 10px 30px rgba(15,23,42,0.04)',
                      cursor: 'pointer',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      height: '100%',
                    }}
                  >
                    {/* Series image */}
                    <div
                      style={{
                        background: s.image ? '#f8fafc' : 'linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 50%, #f5f7fa 100%)',
                        height: '220px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      {s.image ? (
                        <img
                          src={s.image}
                          alt={s.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      ) : (
                        <>
                          {/* Dot grid pattern */}
                          <div
                            style={{
                              position: 'absolute',
                              inset: 0,
                              backgroundImage:
                                'radial-gradient(circle, rgba(37,99,235,0.08) 1px, transparent 1px)',
                              backgroundSize: '20px 20px',
                            }}
                          />
                          {/* Series name monogram */}
                          <div
                            style={{
                              fontSize: '72px',
                              fontWeight: 900,
                              color: 'rgba(37,99,235,0.12)',
                              letterSpacing: '-4px',
                              position: 'relative',
                              zIndex: 1,
                            }}
                          >
                            {s.name.charAt(0)}
                          </div>
                        </>
                      )}
                    </div>

                    <div style={{ padding: '32px' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                        }}
                      >
                        <h3
                          style={{
                            fontSize: '28px',
                            fontWeight: 900,
                            color: '#0f172a',
                            margin: 0,
                            lineHeight: 1.2,
                          }}
                        >
                          {s.name}
                        </h3>
                        <span
                          style={{
                            background: 'rgba(37,99,235,0.08)',
                            color: '#2563eb',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '13px',
                            fontWeight: 700,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {count} {count === 1 ? t('product') : t('products')}
                        </span>
                      </div>
                      <p
                        style={{
                          fontSize: '15px',
                          color: '#64748b',
                          lineHeight: 1.6,
                          margin: 0,
                        }}
                      >
                        {s.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: '18px', color: '#64748b', marginBottom: '20px' }}>
              {t('noProductsInCategory')}
            </p>
            <Link
              href="/products"
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
