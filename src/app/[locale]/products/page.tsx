import { ProductCard } from '@/components/ProductCard';
import { categories } from '@/data/categories';
import { getProducts } from '@/lib/data';
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
    title: t('ourProducts') + ' | ' + t('productCategoriesHeading'),
    description: t('browseCatalog'),
    alternates: {
      canonical: `https://www.ricocaraccessories.com/${locale}/products`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `https://www.ricocaraccessories.com/${l}/products`]),
      ),
    },
    openGraph: {
      title: t('ourProducts') + ' | ' + t('productCategoriesHeading'),
      description: t('browseCatalog'),
    },
  };
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products' });
  const products = await getProducts();

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
            marginBottom: '20px',
            margin: '0 0 20px 0',
          }}
        >
          {t('ourProducts')}
        </p>
        <h1
          style={{
            fontSize: '64px',
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: '20px',
            margin: '0 0 20px 0',
          }}
        >
          {t('productCategoriesHeading')}
        </h1>
        <p style={{ fontSize: '18px', opacity: 0.9, margin: 0 }}>
          {t('browseCatalog')}
        </p>
      </div>

      {/* Products grouped by category */}
      <section
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '72px 24px',
        }}
      >
        {products.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: '18px', color: '#64748b' }}>
              {t('noProducts')}
            </p>
          </div>
        )}

        {categories.map((cat) => {
          const catProducts = products.filter((p) => p.categorySlug === cat.slug);
          if (catProducts.length === 0) return null;

          return (
            <div key={cat.slug} style={{ marginBottom: '48px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  marginBottom: '24px',
                }}
              >
                <h3
                  style={{
                    fontSize: '28px',
                    fontWeight: 900,
                    color: '#0f172a',
                    margin: 0,
                  }}
                >
                  {cat.name}
                </h3>
                <Link
                  href={`/products/${cat.slug}`}
                  style={{
                    color: '#2563eb',
                    fontWeight: 600,
                    fontSize: '14px',
                    textDecoration: 'none',
                  }}
                >
                  View All →
                </Link>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                  gap: '32px',
                }}
              >
                {catProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
