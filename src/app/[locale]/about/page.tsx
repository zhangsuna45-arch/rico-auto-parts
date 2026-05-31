import { BreadcrumbSchema } from '@/components/StructuredData';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

interface AboutProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: AboutProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: 'About Rico | Professional Automotive Accessories Supplier',
    description:
      'Rico Car Accessories is your trusted sourcing partner in China for automotive accessories. We provide product sourcing, quality control, OEM support, and export logistics.',
    keywords: [
      'about Rico',
      'automotive accessories supplier',
      'car accessories sourcing',
      'China auto parts supplier',
      'car accessories exporter',
      'OEM car accessories',
    ],
    alternates: {
      canonical: `https://www.ricocaraccessories.com/${locale}/about`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `https://www.ricocaraccessories.com/${l}/about`]),
      ),
    },
    openGraph: {
      title: 'About Rico | Professional Automotive Accessories Supplier',
      description:
        'Your trusted sourcing partner in China for automotive accessories. Product sourcing, quality control, OEM, and export logistics.',
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

export default async function About({ params }: AboutProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  const tHome = await getTranslations({ locale, namespace: 'home' });

  return (
    <div style={{ background: '#f7f9fc', minHeight: '100vh', color: '#0f172a' }}>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `/${locale}` },
          { name: 'About', url: `/${locale}/about` },
        ]}
      />

      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
          color: '#fff',
          padding: 'clamp(64px, 8vw, 100px) 24px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            color: 'rgba(255,255,255,0.9)',
            fontWeight: 700,
            letterSpacing: '4px',
            fontSize: '12px',
            textTransform: 'uppercase',
            margin: '0 0 16px 0',
          }}
        >
          {t('aboutUs')}
        </p>
        <h1
          style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 900,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            margin: '0 0 16px 0',
          }}
        >
          {t('ricoCarAccessories')}
        </h1>
        <p
          style={{
            fontSize: '17px',
            opacity: 0.9,
            margin: 0,
            maxWidth: '560px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: 1.6,
          }}
        >
          {t('aboutSubtitle')}
        </p>
      </div>

      {/* 1. COMPANY INTRODUCTION — Your Trusted Sourcing Partner */}
      <section
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: 'clamp(56px, 8vw, 88px) 24px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(40px, 6vw, 70px)',
          alignItems: 'center',
        }}
      >
        <div>
          <SectionLabel text={t('whoWeAre')} />
          <SectionHeading text={t('aboutHeading')} />
          <p
            style={{
              fontSize: '16px',
              color: '#64748b',
              lineHeight: 1.7,
              margin: '0 0 16px 0',
            }}
          >
            {t('aboutDescription1')}
          </p>
          <p
            style={{
              fontSize: '16px',
              color: '#64748b',
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {t('aboutDescription2')}
          </p>
        </div>
        <div
          style={{
            background: 'linear-gradient(160deg, #f0f4ff 0%, #e8f0fe 50%, #f5f7fa 100%)',
            borderRadius: '24px',
            minHeight: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '72px', marginBottom: '16px' }}>🤝</div>
            <p style={{ color: '#64748b', fontWeight: 600, margin: 0, fontSize: '15px' }}>
              {t('sourcingPartner')}
            </p>
          </div>
        </div>
      </section>

      {/* 2. END-TO-END SOURCING SERVICES */}
      <section
        style={{
          background: '#fff',
          padding: 'clamp(56px, 8vw, 88px) 24px',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <SectionLabel text={t('whatWeDoLabel')} />
          <SectionHeading text={t('whatWeDoHeading')} />
          <p
            style={{
              fontSize: '16px',
              color: '#64748b',
              maxWidth: '600px',
              margin: '0 0 40px 0',
              lineHeight: 1.7,
            }}
          >
            {t('aboutDescription1')}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
            }}
          >
            {[
              { icon: '🔍', title: t('whatWeDoSourcing'), desc: t('whatWeDoSourcingDesc') },
              { icon: '🔗', title: t('whatWeDoSupplyChain'), desc: t('whatWeDoSupplyChainDesc') },
              { icon: '✅', title: t('whatWeDoQC'), desc: t('whatWeDoQCDesc') },
              { icon: '🚢', title: t('whatWeDoExport'), desc: t('whatWeDoExportDesc') },
              { icon: '🏷️', title: t('whatWeDoOEM'), desc: t('whatWeDoOEMDesc') },
              { icon: '💬', title: t('whatWeDoSupport'), desc: t('whatWeDoSupportDesc') },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  background: '#f7f9fc',
                  borderRadius: '16px',
                  padding: '32px 26px',
                  border: '1px solid rgba(15,23,42,0.05)',
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '14px' }}>{item.icon}</div>
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

      {/* 3. FAQ */}
      <section
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: 'clamp(56px, 8vw, 88px) 24px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <SectionLabel text={tHome('faqLabel')} />
          <SectionHeading text={tHome('faqHeading')} />
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { q: tHome('faqQ1'), a: tHome('faqA1') },
            { q: tHome('faqQ2'), a: tHome('faqA2') },
            { q: tHome('faqQ3'), a: tHome('faqA3') },
            { q: tHome('faqQ4'), a: tHome('faqA4') },
            { q: tHome('faqQ5'), a: tHome('faqA5') },
          ].map((item) => (
            <details
              key={item.q}
              style={{
                background: '#fff',
                borderRadius: '12px',
                border: '1px solid rgba(15,23,42,0.06)',
                overflow: 'hidden',
              }}
            >
              <summary
                style={{
                  padding: '20px 24px',
                  fontWeight: 700,
                  fontSize: '15px',
                  color: '#0f172a',
                  cursor: 'pointer',
                  listStyle: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {item.q}
                <span style={{ fontSize: '12px', color: '#94a3b8', marginLeft: '16px', flexShrink: 0 }}>▼</span>
              </summary>
              <p
                style={{
                  padding: '0 24px 20px 24px',
                  fontSize: '14px',
                  color: '#64748b',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* 4. FINAL CTA */}
      <section
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: 'clamp(56px, 8vw, 88px) 24px',
          textAlign: 'center',
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
              margin: '0 auto 32px auto',
              lineHeight: 1.7,
            }}
          >
            {t('ctaDescription')}
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '14px',
              flexWrap: 'wrap',
            }}
          >
            <Link href="/contact">
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
                {t('ctaContact')}
              </button>
            </Link>
            <Link href="/products">
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
                {t('ctaExplore')}
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
