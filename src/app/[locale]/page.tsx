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
        margin: '0 0 16px 0',
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
        fontSize: 'clamp(36px, 5vw, 56px)',
        letterSpacing: '-0.02em',
        lineHeight: 1.05,
        fontWeight: 900,
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

      {/* 2. SHOP BY CATEGORY */}
      <section
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '80px 24px',
        }}
      >
        <div style={{ marginBottom: '48px' }}>
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
          padding: '80px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <SectionLabel text={t('whyLabel')} />
          <SectionHeading text={t('whyHeading')} />
          <p
            style={{
              fontSize: '17px',
              color: '#64748b',
              maxWidth: '640px',
              margin: '0 auto 56px auto',
              lineHeight: 1.7,
            }}
          >
            {t('whySubtitle')}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '32px',
              textAlign: 'left',
            }}
          >
            {[
              { icon: 'selection', title: t('whySelection'), desc: t('whySelectionDesc') },
              { icon: 'supply', title: t('whySupply'), desc: t('whySupplyDesc') },
              { icon: 'moq', title: t('whyMOQ'), desc: t('whyMOQDesc') },
              { icon: 'oem', title: t('whyOEM'), desc: t('whyOEMDesc') },
              { icon: 'quality', title: t('whyQuality'), desc: t('whyQualityDesc') },
              { icon: 'shipping', title: t('whyShipping'), desc: t('whyShippingDesc') },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  background: '#f7f9fc',
                  borderRadius: '20px',
                  padding: '36px 28px',
                  border: '1px solid rgba(15,23,42,0.05)',
                }}
              >
                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: 800,
                    color: '#0f172a',
                    margin: '0 0 10px 0',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: '15px',
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

      {/* 4. FEATURED PRODUCT COLLECTIONS */}
      <section
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '80px 24px',
        }}
      >
        <div style={{ marginBottom: '48px' }}>
          <SectionLabel text={t('collectionsLabel')} />
          <SectionHeading text={t('collectionsHeading')} />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {categoryItems.map((item) => (
            <Link
              key={item.slug}
              href={`/products/${item.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <div
                style={{
                  background: '#fff',
                  borderRadius: '20px',
                  padding: '32px',
                  border: '1px solid rgba(15,23,42,0.06)',
                  boxShadow: '0 8px 24px rgba(15,23,42,0.04)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
              >
                <h3
                  style={{
                    fontSize: '22px',
                    fontWeight: 800,
                    color: '#0f172a',
                    margin: '0 0 8px 0',
                  }}
                >
                  {item.name}
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    color: '#64748b',
                    lineHeight: 1.6,
                    margin: '0 0 16px 0',
                  }}
                >
                  {item.description}
                </p>
                <span
                  style={{
                    color: '#2563eb',
                    fontWeight: 700,
                    fontSize: '14px',
                  }}
                >
                  {t('viewCollection')}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. OEM & PRIVATE LABEL SOLUTIONS */}
      <section
        style={{
          background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
          color: '#fff',
          padding: '80px 24px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p
            style={{
              fontWeight: 700,
              letterSpacing: '4px',
              fontSize: '12px',
              textTransform: 'uppercase',
              margin: '0 0 16px 0',
              opacity: 0.8,
            }}
          >
            {t('oemLabel')}
          </p>
          <h2
            style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              margin: '0 0 24px 0',
            }}
          >
            {t('oemHeading')}
          </h2>
          <p
            style={{
              fontSize: '17px',
              opacity: 0.9,
              lineHeight: 1.7,
              margin: '0 0 40px 0',
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            {t('oemDescription')}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
              textAlign: 'left',
              marginBottom: '40px',
            }}
          >
            {[
              [t('oemItem1Title'), t('oemItem1Desc')],
              [t('oemItem2Title'), t('oemItem2Desc')],
              [t('oemItem3Title'), t('oemItem3Desc')],
              [t('oemItem4Title'), t('oemItem4Desc')],
              [t('oemItem5Title'), t('oemItem5Desc')],
              [t('oemItem6Title'), t('oemItem6Desc')],
            ].map(([title, desc]) => (
              <div
                key={title}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  padding: '28px 24px',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: 800,
                    margin: '0 0 8px 0',
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    opacity: 0.85,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>

          <Link href="/contact">
            <button
              style={{
                background: '#fff',
                color: '#2563eb',
                border: 'none',
                padding: '18px 40px',
                borderRadius: '14px',
                fontWeight: 800,
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              {t('oemCTA')}
            </button>
          </Link>
        </div>
      </section>

      {/* 6. SOURCING PROCESS */}
      <section
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '80px 24px',
          textAlign: 'center',
        }}
      >
        <SectionLabel text={t('processLabel')} />
        <SectionHeading text={t('processHeading')} />
        <p
          style={{
            fontSize: '17px',
            color: '#64748b',
            maxWidth: '600px',
            margin: '0 auto 56px auto',
            lineHeight: 1.7,
          }}
        >
          {t('processSubtitle')}
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0',
            flexWrap: 'wrap',
          }}
        >
          {[
            { step: '01', title: t('step1Title'), desc: t('step1Desc') },
            { step: '02', title: t('step2Title'), desc: t('step2Desc') },
            { step: '03', title: t('step3Title'), desc: t('step3Desc') },
            { step: '04', title: t('step4Title'), desc: t('step4Desc') },
            { step: '05', title: t('step5Title'), desc: t('step5Desc') },
          ].map((item, idx) => (
            <div
              key={item.step}
              style={{
                background: '#fff',
                borderRadius: '20px',
                padding: '40px 28px',
                border: '1px solid rgba(15,23,42,0.06)',
                boxShadow: '0 8px 24px rgba(15,23,42,0.04)',
                flex: '1 1 200px',
                maxWidth: '240px',
                position: 'relative',
                marginRight: idx < 4 ? '-1px' : '0',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: '#2563eb',
                  color: '#fff',
                  fontSize: '18px',
                  fontWeight: 900,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto',
                }}
              >
                {item.step}
              </div>
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 800,
                  color: '#0f172a',
                  margin: '0 0 8px 0',
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontSize: '14px',
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

      {/* 7. LATEST BLOG POSTS */}
      <section
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '80px 24px',
        }}
      >
        <div style={{ marginBottom: '32px' }}>
          <SectionLabel text={t('blogSectionLabel')} />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '40px',
          }}
        >
          <SectionHeading text={t('latestArticles')} />
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

      {/* 8. FAQ */}
      <section
        style={{
          background: '#fff',
          padding: '80px 24px',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <SectionLabel text={t('faqLabel')} />
            <SectionHeading text={t('faqHeading')} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              [t('faqQ1'), t('faqA1')],
              [t('faqQ2'), t('faqA2')],
              [t('faqQ3'), t('faqA3')],
              [t('faqQ4'), t('faqA4')],
              [t('faqQ5'), t('faqA5')],
            ].map(([q, a]) => (
              <details
                key={q}
                style={{
                  background: '#f7f9fc',
                  borderRadius: '16px',
                  padding: '24px 28px',
                  border: '1px solid rgba(15,23,42,0.05)',
                  cursor: 'pointer',
                }}
              >
                <summary
                  style={{
                    fontSize: '17px',
                    fontWeight: 700,
                    color: '#0f172a',
                    outline: 'none',
                  }}
                >
                  {q}
                </summary>
                <p
                  style={{
                    fontSize: '15px',
                    color: '#475569',
                    lineHeight: 1.7,
                    margin: '14px 0 0 0',
                  }}
                >
                  {a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '80px 24px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            background: '#fff',
            borderRadius: '32px',
            padding: '64px 48px',
            border: '1px solid rgba(15,23,42,0.06)',
            boxShadow: '0 24px 64px rgba(15,23,42,0.08)',
          }}
        >
          <SectionLabel text={t('ctaLabel')} />
          <h2
            style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              margin: '0 0 16px 0',
            }}
          >
            {t('ctaHeading')}
          </h2>
          <p
            style={{
              fontSize: '17px',
              color: '#64748b',
              maxWidth: '560px',
              margin: '0 auto 36px auto',
              lineHeight: 1.7,
            }}
          >
            {t('ctaDescription')}
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <Link href="/products">
              <button
                style={{
                  background: '#2563eb',
                  color: '#fff',
                  border: 'none',
                  padding: '18px 36px',
                  borderRadius: '14px',
                  fontWeight: 800,
                  fontSize: '16px',
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
                  border: '1px solid rgba(15,23,42,0.1)',
                  color: '#0f172a',
                  padding: '18px 36px',
                  borderRadius: '14px',
                  fontWeight: 700,
                  fontSize: '16px',
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
