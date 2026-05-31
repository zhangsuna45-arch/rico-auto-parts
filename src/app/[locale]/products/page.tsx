import { getCategories, getSeriesByCategorySlug } from '@/lib/data';
import { BreadcrumbSchema } from '@/components/StructuredData';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

interface ProductsPageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: ProductsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products' });

  return {
    title: t('productCategoriesHeading'),
    description: t('browseCatalog'),
    alternates: {
      canonical: `https://www.ricocaraccessories.com/${locale}/products`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `https://www.ricocaraccessories.com/${l}/products`]),
      ),
    },
    openGraph: {
      title: t('productCategoriesHeading'),
      description: t('browseCatalog'),
    },
  };
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products' });
  const categories = await getCategories();

  // Get series counts per category
  const seriesCounts = await Promise.all(
    categories.map(async (cat) => {
      const series = await getSeriesByCategorySlug(cat.slug);
      return { slug: cat.slug, count: series.length };
    }),
  );

  function getSeriesCount(slug: string): number {
    return seriesCounts.find((s) => s.slug === slug)?.count ?? 0;
  }

  return (
    <div style={{ background: '#f7f9fc', minHeight: '100vh' }}>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `/${locale}` },
          { name: 'Products', url: `/${locale}/products` },
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
          <span>Products</span>
        </div>
      </div>

      {/* Header */}
      <div
        style={{
          background: '#fff',
          padding: '80px 24px',
          textAlign: 'center',
          borderBottom: '1px solid rgba(15,23,42,0.04)',
        }}
      >
        <p
          style={{
            color: '#2563eb',
            fontWeight: 700,
            letterSpacing: '4px',
            fontSize: '13px',
            textTransform: 'uppercase',
            margin: '0 0 16px 0',
          }}
        >
          {t('ourProducts')}
        </p>
        <h1
          style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            lineHeight: 1.08,
            color: '#0f172a',
            margin: '0 0 16px 0',
          }}
        >
          {t('productCategoriesHeading')}
        </h1>
        <p
          style={{
            fontSize: '17px',
            color: '#64748b',
            maxWidth: '560px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}
        >
          {t('browseCatalog')}
        </p>
      </div>

      {/* Category cards grid */}
      <section
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '72px 24px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
            gap: '28px',
          }}
        >
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products/${cat.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <div
                style={{
                  background: '#fff',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1px solid rgba(15,23,42,0.06)',
                  boxShadow: '0 4px 20px rgba(15,23,42,0.04)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
              >
                {/* Category image area */}
                <div
                  style={{
                    background: 'linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 50%, #f5f7fa 100%)',
                    height: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Dot grid pattern */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage:
                        'radial-gradient(circle, rgba(37,99,235,0.06) 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }}
                  />
                  {/* Category initial */}
                  <div
                    style={{
                      fontSize: '80px',
                      fontWeight: 900,
                      color: 'rgba(37,99,235,0.1)',
                      letterSpacing: '-4px',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    {cat.name.charAt(0)}
                  </div>
                </div>

                <div style={{ padding: '28px 32px 32px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '10px',
                    }}
                  >
                    <h2
                      style={{
                        fontSize: '22px',
                        fontWeight: 800,
                        color: '#0f172a',
                        margin: 0,
                        lineHeight: 1.3,
                      }}
                    >
                      {cat.name}
                    </h2>
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
                      {getSeriesCount(cat.slug)} {getSeriesCount(cat.slug) === 1 ? t('series') : t('series_plural')}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: '14px',
                      color: '#64748b',
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {cat.description}
                  </p>

                  <div
                    style={{
                      marginTop: '16px',
                      color: '#2563eb',
                      fontWeight: 700,
                      fontSize: '14px',
                    }}
                  >
                    {t('browseCategory')} →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
