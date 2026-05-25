import { HeroSection } from '@/components/HeroSection';
import { CategoryCard } from '@/components/CategoryCard';
import { BlogCard } from '@/components/BlogCard';
import { categories } from '@/data/categories';
import { getBlogPosts } from '@/sanity/lib/data';
import { OrganizationSchema, BreadcrumbSchema } from '@/components/StructuredData';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Image from 'next/image';
import type { Metadata } from 'next';

interface HomeProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomeProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });

  return {
    title: t('defaultTitle'),
    description: t('defaultDescription'),
    keywords: [
      'car accessories',
      'automotive accessories supplier',
      'wholesale car accessories',
      'car interior accessories',
      'car electronics',
      'LED car lighting',
      'exterior accessories',
      'Rico Car Accessories',
    ],
    alternates: {
      canonical: `https://www.ricocaraccessories.com/${locale}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `https://www.ricocaraccessories.com/${l}`]),
      ),
    },
    openGraph: {
      title: t('defaultTitle'),
      description: t('defaultDescription'),
      images: [
        {
          url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
          width: 1200,
          height: 630,
          alt: 'Rico Car Accessories',
        },
      ],
    },
  };
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  const blogPostsData = await getBlogPosts();
  const blogPreview = blogPostsData.slice(0, 3);

  return (
    <main
      style={{
        background: '#f7f9fc',
        minHeight: '100vh',
        color: '#0f172a',
      }}
    >
      <OrganizationSchema />
      <BreadcrumbSchema items={[{ name: 'Home', url: `/${locale}` }]} />

      {/* 1. HERO */}
      <HeroSection />

      {/* 2. PRODUCT CATEGORIES */}
      <section
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '72px 24px',
        }}
      >
        <div style={{ marginBottom: '40px' }}>
          <p
            style={{
              color: '#2563eb',
              fontWeight: 700,
              letterSpacing: '3.9px',
              fontSize: '13px',
              textTransform: 'uppercase',
              margin: '0 0 12px 0',
            }}
          >
            {t('productCategories')}
          </p>

          <h2
            style={{
              fontSize: 'clamp(48px, 7vw, 72px)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              fontWeight: 900,
              margin: 0,
            }}
          >
            {t('productCategoriesHeading')}
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            maxWidth: '1280px',
            margin: '0 auto',
          }}
        >
          {categories.map((item) => (
            <CategoryCard key={item.slug} name={item.name} slug={item.slug} image={item.image} description={item.description} />
          ))}
        </div>
      </section>

      {/* 3. BLOG PREVIEW */}
      <section
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '72px 24px',
        }}
      >
        <p
          style={{
            color: '#2563eb',
            fontWeight: 700,
            letterSpacing: '3.9px',
            fontSize: '13px',
            textTransform: 'uppercase',
            margin: '0 0 12px 0',
          }}
        >
          {t('blogSectionLabel')}
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '32px',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(48px, 7vw, 72px)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              fontWeight: 900,
              margin: 0,
            }}
          >
            {t('latestArticles')}
          </h2>
          <Link
            href="/blog"
            style={{
              color: '#2563eb',
              fontWeight: 700,
              fontSize: '16px',
              textDecoration: 'none',
              marginBottom: '8px',
            }}
          >
            {t('viewAllArticles')}
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '32px',
          }}
        >
          {blogPreview.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* 4. ABOUT RICO */}
      <section
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '72px 24px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 600,
            borderRadius: '40px',
            overflow: 'hidden',
          }}
        >
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e"
            alt="Rico Car Accessories"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div>
          <p
            style={{
              color: '#2563eb',
              fontWeight: 700,
              letterSpacing: '3.9px',
              fontSize: '13px',
              textTransform: 'uppercase',
              marginBottom: '16px',
              margin: '0 0 16px 0',
            }}
          >
            {t('aboutSectionLabel')}
          </p>

          <h2
            style={{
              fontSize: 'clamp(48px, 7vw, 72px)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              fontWeight: 900,
              marginBottom: '30px',
              margin: '0 0 30px 0',
            }}
          >
            {t('aboutTitle1')}
            <br />
            {t('aboutTitle2')}
          </h2>

          <p
            style={{
              color: '#64748b',
              fontSize: '18px',
              lineHeight: 1.9,
              marginBottom: '30px',
              margin: '0 0 30px 0',
            }}
          >
            {t('aboutDescription')}
          </p>

          <Link href="/about">
            <button
              style={{
                background: '#2563eb',
                color: '#fff',
                border: 'none',
                padding: '20px 36px',
                borderRadius: '18px',
                fontWeight: 800,
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              {t('learnMore')}
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
