import { getProductsByCategory } from '@/sanity/lib/data';
import { categories as allCategories } from '@/data/categories';
import { ProductCard } from '@/components/ProductCard';
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
    for (const c of allCategories) {
      params.push({ locale, category: c.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category, locale } = await params;
  const categoryData = allCategories.find((c) => c.slug === category);

  if (!categoryData) {
    return { title: 'Category Not Found' };
  }

  return {
    title: `${categoryData.name} | Car Accessories`,
    description: categoryData.description,
    alternates: {
      canonical: `https://www.ricoautoparts.com/${locale}/products/${category}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `https://www.ricoautoparts.com/${l}/products/${category}`]),
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

  const categoryData = allCategories.find((c) => c.slug === category);
  if (!categoryData) {
    notFound();
  }

  const categoryProducts = await getProductsByCategory(category);

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
            marginBottom: '20px',
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
            marginBottom: '20px',
            margin: '0 0 20px 0',
          }}
        >
          {categoryData.name}
        </h1>
        <p style={{ fontSize: '18px', opacity: 0.9, margin: 0 }}>
          {categoryData.description}
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
        {categoryProducts.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '32px',
            }}
          >
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
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
              marginBottom: '16px',
              color: '#0f172a',
              margin: '0 0 16px 0',
            }}
          >
            {t('needCustom')}
          </h2>
          <p
            style={{
              fontSize: '18px',
              color: '#64748b',
              marginBottom: '30px',
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
