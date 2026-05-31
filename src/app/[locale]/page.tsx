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

function SectionLabel({ text }: { text: string }) {
  return (
    <p
      style={{
        color: '#2563eb',
        fontWeight: 700,
        letterSpacing: '4px',
        fontSize: '12px',
        textTransform: 'uppercase',
        margin: '0 0 12px 0',
      }}
    >
      {text}
    </p>
  );
}

function SectionHeading({ text }: { text: string }) {
  return (
    <h2
      style={{
        fontSize: 'clamp(30px, 4vw, 44px)',
        letterSpacing: '-0.02em',
        lineHeight: 1.1,
        fontWeight: 800,
        margin: '0 0 16px 0',
      }}
    >
      {text}
    </h2>
  );
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
        width: '100%',
        overflowX: 'hidden',
      }}
    >
      <OrganizationSchema />
      <BreadcrumbSchema items={[{ name: 'Home', url: `/${locale}` }]} />

      {/* 1. HERO */}
      <HeroSection />

      {/* 2. PRODUCT CATEGORIES */}
      <section
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '100px 24px',
        }}
      >
        <div style={{ marginBottom: '40px' }}>
          <SectionLabel text={t('shopByCategory')} />
          <SectionHeading text={t('shopByCategoryHeading')} />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}
        >
          {categoryItems.map((item) => (
            <CategoryCard key={item.slug} name={item.name} slug={item.slug} image={item.image} description={item.description} />
          ))}
        </div>
      </section>

      {/* 3. WHY CHOOSE US */}
      <section
        style={{
          background: '#fff',
          padding: '100px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
          }}
        >
          <SectionLabel text={t('whyLabel')} />
          <SectionHeading text={t('whyHeading')} />
          <p
            style={{
              fontSize: '16px',
              color: '#64748b',
              maxWidth: '600px',
              margin: '0 0 48px 0',
              lineHeight: 1.7,
            }}
          >
            {t('whySubtitle')}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
            }}
          >
            {[
              { title: t('whySelection'), desc: t('whySelectionDesc') },
              { title: t('whyOEM'), desc: t('whyOEMDesc') },
              { title: t('whySupply'), desc: t('whySupplyDesc') },
              { title: t('whyQuality'), desc: t('whyQualityDesc') },
              { title: t('whyMOQ'), desc: t('whyMOQDesc') },
              { title: t('whyShipping'), desc: t('whyShippingDesc') },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  background: '#f7f9fc',
                  borderRadius: '16px',
                  padding: '32px 26px',
                  border: '1px solid rgba(15,23,42,0.05)',
                  boxShadow: '0 4px 16px rgba(15,23,42,0.03)',
                }}
              >
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: 800,
                    color: '#0f172a',
                    margin: '0 0 10px 0',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    color: '#64748b',
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SIMPLE 5-STEP SOURCING PROCESS */}
      <section
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '100px 24px',
        }}
      >
        <SectionLabel text={t('processLabel')} />
        <SectionHeading text={t('processHeading')} />
        <p
          style={{
            fontSize: '16px',
            color: '#64748b',
            maxWidth: '560px',
            margin: '0 0 48px 0',
            lineHeight: 1.7,
          }}
        >
          {t('processSubtitle')}
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            gap: '24px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { step: '01', title: t('step1Title'), desc: t('step1Desc') },
            { step: '02', title: t('step2Title'), desc: t('step2Desc') },
            { step: '03', title: t('step3Title'), desc: t('step3Desc') },
            { step: '04', title: t('step4Title'), desc: t('step4Desc') },
            { step: '05', title: t('step5Title'), desc: t('step5Desc') },
          ].map((item) => (
            <div
              key={item.step}
              style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '36px 28px',
                border: '1px solid rgba(15,23,42,0.06)',
                boxShadow: '0 4px 16px rgba(15,23,42,0.03)',
                flex: '1 1 180px',
                maxWidth: '240px',
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '12px',
                  background: '#2563eb',
                  color: '#fff',
                  fontSize: '16px',
                  fontWeight: 900,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 0 14px 0',
                }}
              >
                {item.step}
              </div>
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: 800,
                  color: '#0f172a',
                  margin: '0 0 8px 0',
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontSize: '13px',
                  color: '#64748b',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. LATEST ARTICLES */}
      <section
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '100px 24px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '36px',
          }}
        >
          <div>
            <SectionLabel text={t('blogSectionLabel')} />
            <SectionHeading text={t('latestArticles')} />
          </div>
          <Link
            href="/blog"
            style={{
              color: '#2563eb',
              fontWeight: 700,
              fontSize: '15px',
              textDecoration: 'none',
              marginBottom: '4px',
            }}
          >
            {t('viewAllArticles')} →
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '24px',
          }}
        >
          {blogPreview.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '100px 24px',
        }}
      >
        <div
          style={{
            background: '#fff',
            borderRadius: '24px',
            padding: 'clamp(48px, 6vw, 72px) 32px',
            border: '1px solid rgba(15,23,42,0.06)',
            boxShadow: '0 16px 48px rgba(15,23,42,0.06)',
          }}
        >
          <SectionLabel text={t('ctaLabel')} />
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              margin: '0 0 14px 0',
            }}
          >
            {t('ctaHeading')}
          </h2>
          <p
            style={{
              fontSize: '16px',
              color: '#64748b',
              maxWidth: '520px',
              margin: '0 0 32px 0',
              lineHeight: 1.7,
            }}
          >
            {t('ctaDescription')}
          </p>
          <div
            style={{
              display: 'flex',
              gap: '14px',
              flexWrap: 'wrap',
            }}
          >
            <Link href="/">
              <button
                style={{
                  background: '#2563eb',
                  color: '#fff',
                  border: 'none',
                  padding: '16px 34px',
                  borderRadius: '12px',
                  fontWeight: 800,
                  fontSize: '15px',
                  cursor: 'pointer',
                }}
              >
                {t('ctaExplore')}
              </button>
            </Link>
            <Link href="/contact">
              <button
                style={{
                  background: '#fff',
                  border: '1px solid rgba(15,23,42,0.12)',
                  color: '#0f172a',
                  padding: '16px 34px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '15px',
                  cursor: 'pointer',
                }}
              >
                {t('ctaContact')}
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
