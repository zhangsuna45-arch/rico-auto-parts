import { getProductBySlug, getProducts, getProductsByCategory } from '@/sanity/lib/data';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { ProductDetailGallery } from './ProductDetailGallery';
import { ProductFeatures } from './ProductFeatures';
import { ProductSpecsTable } from './ProductSpecsTable';
import { ProductInquiryForm } from './ProductInquiryForm';
import { StickyInquiry } from './StickyInquiry';
import { RelatedProducts } from './RelatedProducts';
import { ProductSchema, BreadcrumbSchema } from '@/components/StructuredData';
import type { Metadata } from 'next';

interface ProductDetailProps {
  params: Promise<{ category: string; slug: string; locale: string }>;
}

export async function generateStaticParams() {
  const allProducts = await getProducts();
  const params: { category: string; slug: string; locale: string }[] = [];
  for (const locale of routing.locales) {
    for (const product of allProducts) {
      params.push({
        locale,
        category: product.categorySlug,
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

  const canonical = `https://www.ricoautoparts.com/${locale}/products/${product.categorySlug}/${product.slug}`;

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
          `https://www.ricoautoparts.com/${l}/products/${product.categorySlug}/${product.slug}`,
        ]),
      ),
    },
    openGraph: {
      title: `${product.name} | Rico Car Accessories`,
      description: product.longDescription || product.description,
      url: canonical,
      images: product.gallery.length > 0
        ? product.gallery.slice(0, 4).map((url) => ({
            url,
            width: 1200,
            height: 630,
            alt: product.name,
          }))
        : [
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
      images: product.gallery.length > 0 ? [product.gallery[0]] : [product.image],
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
    .slice(0, 3);

  const productUrl = `/${locale}/products/${product.categorySlug}/${product.slug}`;

  const sectionStyle: React.CSSProperties = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '72px 24px',
  };

  return (
    <div style={{ background: '#f7f9fc', minHeight: '100vh' }}>
      <ProductSchema product={product} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `/${locale}` },
          { name: 'Products', url: `/${locale}/products` },
          { name: product.category, url: `/${locale}/products/${product.categorySlug}` },
          { name: product.name, url: productUrl },
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
            href="/products"
            style={{ color: '#2563eb', textDecoration: 'none' }}
          >
            Products
          </Link>
          <span> / </span>
          <Link
            href={`/products/${category}`}
            style={{ color: '#2563eb', textDecoration: 'none' }}
          >
            {product.category}
          </Link>
          <span> / </span>
          <span>{product.name}</span>
        </div>
      </div>

      {/* ── Product Hero ── */}
      <section
        style={{
          ...sectionStyle,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'start',
        }}
      >
        <ProductDetailGallery gallery={product.gallery} name={product.name} />

        <div>
          <p
            style={{
              color: '#2563eb',
              fontWeight: 700,
              letterSpacing: '2px',
              fontSize: '12px',
              margin: '0 0 12px 0',
            }}
          >
            {product.category}
          </p>
          <h1
            style={{
              fontSize: '48px',
              fontWeight: 900,
              margin: '0 0 16px 0',
              color: '#0f172a',
              lineHeight: 1.1,
            }}
          >
            {product.name}
          </h1>

          {/* B2B Inquiry Indicator */}
          <p
            style={{
              display: 'inline-block',
              fontSize: '13px',
              fontWeight: 700,
              color: '#2563eb',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              background: 'rgba(37,99,235,0.06)',
              padding: '8px 16px',
              borderRadius: '8px',
              margin: '0 0 24px 0',
            }}
          >
            {t('wholesaleInquiry')}
          </p>

          <p
            style={{
              fontSize: '17px',
              color: '#64748b',
              lineHeight: 1.85,
              margin: '0 0 32px 0',
            }}
          >
            {product.longDescription}
          </p>

          {/* Product Features */}
          <div style={{ marginBottom: '32px' }}>
            <ProductFeatures features={product.features} />
          </div>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '14px', alignItems: 'stretch' }}>
            <a
              href={`https://wa.me/8619854054842?text=${encodeURIComponent(`Hi, I am interested in ${product.name}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '14px 28px',
                background: '#25D366',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '15px',
                whiteSpace: 'nowrap',
              }}
            >
              {t('chatWhatsApp')}
            </a>
            <Link
              href="#mobile-inquiry"
              style={{
                flex: 1,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '14px 28px',
                border: '2px solid #2563eb',
                color: '#2563eb',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '15px',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                background: 'transparent',
              }}
            >
              {t('requestQuote')}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Enterprise Specifications ── */}
      <section style={{ ...sectionStyle, paddingTop: 0 }}>
        <ProductSpecsTable enterprise={product.enterprise} />
      </section>

      {/* ── Technical Specifications ── */}
      <section style={{ ...sectionStyle, paddingTop: 0 }}>
        <h2
          style={{
            fontSize: '48px',
            fontWeight: 900,
            margin: '0 0 60px 0',
            color: '#0f172a',
          }}
        >
          {t('technicalSpecifications')}
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))',
            gap: '30px',
          }}
        >
          {Object.entries(product.specs).map(([key, value]) => (
            <div
              key={key}
              style={{
                background: '#fff',
                padding: '30px',
                borderRadius: '16px',
                border: '1px solid rgba(15,23,42,0.06)',
              }}
            >
              <p
                style={{
                  fontSize: '12px',
                  color: '#2563eb',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  margin: '0 0 8px 0',
                }}
              >
                {key}
              </p>
              <p
                style={{
                  fontSize: '18px',
                  fontWeight: 800,
                  color: '#0f172a',
                  margin: 0,
                }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Mobile Inquiry Section (hidden on desktop) ── */}
      <section
        id="mobile-inquiry"
        style={{
          ...sectionStyle,
          paddingTop: 0,
          background: '#fff',
          marginTop: '40px',
        }}
      >
        <div
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            padding: '40px',
            background: '#f8fafc',
            borderRadius: '24px',
            border: '1px solid rgba(15,23,42,0.06)',
          }}
        >
          <h3
            style={{
              fontSize: '20px',
              fontWeight: 800,
              color: '#0f172a',
              textAlign: 'center',
              margin: '0 0 8px 0',
              letterSpacing: '1px',
            }}
          >
            {t('quickInquiry')}
          </h3>
          <p
            style={{
              fontSize: '14px',
              color: '#94a3b8',
              textAlign: 'center',
              margin: '0 0 24px 0',
            }}
          >
            {t('inquirySubtitle')}
          </p>
          <ProductInquiryForm
            productName={product.name}
            productUrl={productUrl}
            sku={product.enterprise.oem}
            category={product.category}
          />
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
              @media (min-width: 1280px) {
                #mobile-inquiry {
                  display: none;
                }
              }
            `,
          }}
        />
      </section>

      {/* ── Related Products ── */}
      {relatedProducts.length > 0 && (
        <section style={sectionStyle}>
          <h2
            style={{
              fontSize: '48px',
              fontWeight: 900,
              margin: '0 0 60px 0',
              color: '#0f172a',
            }}
          >
            {t('relatedProducts')}
          </h2>
          <RelatedProducts products={relatedProducts} />
        </section>
      )}

      {/* ── Desktop Sticky Inquiry Sidebar ── */}
      <StickyInquiry
        productName={product.name}
        productUrl={productUrl}
        sku={product.enterprise.oem}
        category={product.category}
      />
    </div>
  );
}
