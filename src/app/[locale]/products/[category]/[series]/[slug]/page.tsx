import { getProductBySlug, getProducts, getProductsByCategory } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { ProductDetailGallery } from './ProductDetailGallery';
import { StickyInquiry } from './StickyInquiry';
import { RelatedProducts } from './RelatedProducts';
import { ProductSchema, BreadcrumbSchema } from '@/components/StructuredData';
import type { Metadata } from 'next';

interface ProductDetailProps {
  params: Promise<{ category: string; series: string; slug: string; locale: string }>;
}

export async function generateStaticParams() {
  const allProducts = await getProducts();
  const params: { category: string; series: string; slug: string; locale: string }[] = [];
  for (const locale of routing.locales) {
    for (const product of allProducts) {
      params.push({
        locale,
        category: product.categorySlug,
        series: product.seriesSlug,
        slug: product.slug,
      });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: ProductDetailProps): Promise<Metadata> {
  const { category, slug, locale } = await params;
  const product = await getProductBySlug(slug, category);

  if (!product) {
    return { title: 'Product Not Found' };
  }

  const canonical = `https://www.ricocaraccessories.com/${locale}/products/${product.categorySlug}/${product.seriesSlug}/${product.slug}`;

  return {
    title: `${product.name} | Car Accessories Supplier`,
    description: product.longDescription || product.description,
    keywords: [
      product.name,
      product.category,
      'car accessories',
      'automotive accessories supplier',
      product.enterprise.oem,
      'auto accessories exporter',
      'wholesale car accessories',
    ],
    alternates: {
      canonical,
      languages: Object.fromEntries(
        routing.locales.map((l) => [
          l,
          `https://www.ricocaraccessories.com/${l}/products/${product.categorySlug}/${product.seriesSlug}/${product.slug}`,
        ]),
      ),
    },
    openGraph: {
      title: `${product.name} | Rico Car Accessories`,
      description: product.longDescription || product.description,
      url: canonical,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | Rico Car Accessories`,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductDetail({ params }: ProductDetailProps) {
  const { category, slug, locale } = await params;
  const product = await getProductBySlug(slug, category);

  if (!product) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'productDetail' });

  const categoryProducts = await getProductsByCategory(category);
  const relatedProducts = categoryProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const productUrl = `/${locale}/products/${product.categorySlug}/${product.seriesSlug}/${product.slug}`;

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <ProductSchema product={product} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `/${locale}` },
          { name: 'Products', url: `/${locale}/products` },
          { name: product.category, url: `/${locale}/products/${product.categorySlug}` },
          { name: product.series, url: `/${locale}/products/${product.categorySlug}/${product.seriesSlug}` },
          { name: product.name, url: productUrl },
        ]}
      />

      {/* Breadcrumb */}
      <div style={{ borderBottom: '1px solid #e2e8f0' }}>
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '12px 32px',
            fontSize: '13px',
            color: '#94a3b8',
          }}
        >
          <Link href="/" style={{ color: '#64748b', textDecoration: 'none' }}>
            Home
          </Link>
          <span style={{ margin: '0 8px', color: '#cbd5e1' }}>/</span>
          <Link href="/products" style={{ color: '#64748b', textDecoration: 'none' }}>
            Products
          </Link>
          <span style={{ margin: '0 8px', color: '#cbd5e1' }}>/</span>
          <Link
            href={`/products/${category}`}
            style={{ color: '#64748b', textDecoration: 'none' }}
          >
            {product.category}
          </Link>
          <span style={{ margin: '0 8px', color: '#cbd5e1' }}>/</span>
          <Link
            href={`/products/${category}/${product.seriesSlug}`}
            style={{ color: '#64748b', textDecoration: 'none' }}
          >
            {product.series}
          </Link>
          <span style={{ margin: '0 8px', color: '#cbd5e1' }}>/</span>
          <span style={{ color: '#0f172a', fontWeight: 500 }}>{product.name}</span>
        </div>
      </div>

      {/* HERO — Compact balanced layout */}
      <section
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '40px 32px 48px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px',
          alignItems: 'start',
        }}
      >
        {/* Left: Gallery */}
        <ProductDetailGallery
          gallery={product.gallery}
          name={product.name}
          variants={product.variants}
        />

        {/* Right: Product Info */}
        <div>
          {/* Category / Series badge */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: '#64748b',
                border: '1px solid #e2e8f0',
                padding: '3px 8px',
                borderRadius: '100px',
                background: '#f8fafc',
              }}
            >
              {product.category}
            </span>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: '#64748b',
                border: '1px solid #e2e8f0',
                padding: '3px 8px',
                borderRadius: '100px',
                background: '#f8fafc',
              }}
            >
              {product.series}
            </span>
          </div>

          {/* Product name */}
          <h1
            style={{
              fontSize: 'clamp(28px, 3vw, 40px)',
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: '#0f172a',
              margin: '0 0 10px 0',
            }}
          >
            {product.name}
          </h1>

          {/* Divider */}
          <div
            style={{
              height: '1px',
              background: '#e2e8f0',
              marginBottom: '16px',
            }}
          />

          {/* Description */}
          <p
            style={{
              fontSize: '14px',
              lineHeight: 1.7,
              color: '#475569',
              margin: '0 0 20px 0',
            }}
          >
            {product.description}
          </p>

          {/* Product Specifications */}
          {Object.keys(product.specs).length > 0 && (
            <>
              <p className="text-[10px] font-semibold text-[#94a3b8] tracking-[2.5px] uppercase mb-3">
                {t('technicalSpecifications')}
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1px',
                  background: '#e2e8f0',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  marginBottom: '24px',
                }}
              >
                {Object.entries(product.specs).map(([key, value]) => (
                  <div
                    key={key}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      padding: '12px 16px',
                      background: '#fff',
                    }}
                  >
                    <span style={{ fontSize: '10px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      {key}
                    </span>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* CTA Buttons */}
          <div
            style={{
              display: 'flex',
              gap: '10px',
              marginTop: '24px',
            }}
          >
            <a
              href={`https://wa.me/8619854054842?text=${encodeURIComponent(`Hi, I am interested in ${product.name}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '13px 20px',
                background: '#25D366',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '13px',
                letterSpacing: '-0.01em',
              }}
            >
              {t('chatWhatsApp')}
            </a>
            <a
              href="#inquiry"
              style={{
                flex: 1,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '13px 20px',
                background: '#0f172a',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '13px',
                textDecoration: 'none',
                letterSpacing: '-0.01em',
              }}
            >
              {t('requestQuote')}
            </a>
          </div>
        </div>
      </section>

      {/* HOT SELLING PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section
          style={{
            background: '#f8fafc',
            borderTop: '1px solid #e2e8f0',
            padding: '64px 32px',
          }}
        >
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: '36px',
              }}
            >
              <h2
                style={{
                  fontSize: 'clamp(24px, 2.5vw, 34px)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: '#0f172a',
                  margin: 0,
                }}
              >
                {t('hotSellingProducts')}
              </h2>
              <Link
                href={`/products/${category}`}
                style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#64748b',
                  textDecoration: 'none',
                  borderBottom: '1px solid #cbd5e1',
                  paddingBottom: '2px',
                }}
              >
                {t('viewAll')} {product.category} →
              </Link>
            </div>
            <RelatedProducts products={relatedProducts} />
          </div>
        </section>
      )}

      {/* Desktop Sticky Inquiry */}
      <StickyInquiry
        productName={product.name}
        productUrl={productUrl}
        sku={product.enterprise.oem}
        category={product.category}
      />
    </div>
  );
}
