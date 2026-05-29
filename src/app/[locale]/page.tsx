import { HeroSection } from '@/components/HeroSection';
import { CategoryCard } from '@/components/CategoryCard';
import { BlogCard } from '@/components/BlogCard';
import { getCategories, getBlogPosts } from '@/lib/data';
import { OrganizationSchema, BreadcrumbSchema } from '@/components/StructuredData';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
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
          url: '/placeholder-3.svg',
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
  const categoryItems = await getCategories();
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
          {categoryItems.map((item) => (
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
      <section className="max-w-[1280px] mx-auto px-6 py-16 md:py-24">
        <div className="max-w-[600px]">
          <div>
            <p className="text-[11px] font-bold text-[#2563eb] tracking-[3px] uppercase mb-4">
              {t('aboutSectionLabel')}
            </p>

            <h2 className="text-[clamp(34px,5vw,54px)] leading-[1.05] font-extrabold tracking-[-0.02em] text-[#0f172a] mb-3">
              Professional Automotive
              <br />
              Accessories Supplier
            </h2>

            <p className="text-sm text-[#94a3b8] tracking-wide mb-6">
              专业汽车配件供应商 · 服务全球 30+ 国家
            </p>

            <p className="text-[15px] leading-[1.8] text-[#475569] mb-8 max-w-[520px]">
              {t('aboutDescription')}
            </p>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-7 py-3 border border-[#d1d5db] rounded-xl text-sm font-semibold text-[#0f172a] no-underline hover:border-[#0f172a] hover:bg-[#f8fafc] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              {t('learnMore')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
