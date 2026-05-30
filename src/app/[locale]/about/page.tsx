import { BreadcrumbSchema } from '@/components/StructuredData';
import { Link } from '@/i18n/navigation';
import { getCategories } from '@/lib/data';
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

export default async function About({ params }: AboutProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  const categoryItems = await getCategories();

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
          padding: '80px 60px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            color: 'rgba(255,255,255,0.9)',
            fontWeight: 700,
            letterSpacing: '4px',
            margin: '0 0 20px 0',
          }}
        >
          {t('aboutUs')}
        </p>
        <h1
          style={{
            fontSize: '64px',
            fontWeight: 900,
            lineHeight: 1.1,
            margin: '0 0 16px 0',
          }}
        >
          {t('ricoCarAccessories')}
        </h1>
        <p
          style={{
            fontSize: '18px',
            opacity: 0.9,
            margin: 0,
            maxWidth: '620px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          {t('aboutSubtitle')}
        </p>
      </div>

      {/* 1. COMPANY INTRODUCTION */}
      <section
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '80px 24px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '70px',
          alignItems: 'center',
        }}
      >
        <div>
          <SectionLabel text={t('whoWeAre')} />
          <SectionHeading text={t('aboutHeading')} />
          <p
            style={{
              fontSize: '17px',
              color: '#64748b',
              lineHeight: 1.8,
              margin: '0 0 20px 0',
            }}
          >
            {t('aboutDescription1')}
          </p>
          <p
            style={{
              fontSize: '17px',
              color: '#64748b',
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            {t('aboutDescription2')}
          </p>
        </div>
        <div
          style={{
            background: 'linear-gradient(160deg, #f0f4ff 0%, #e8f0fe 50%, #f5f7fa 100%)',
            borderRadius: '32px',
            height: '460px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '80px', marginBottom: '16px' }}>🤝</div>
            <p style={{ color: '#64748b', fontWeight: 600, margin: 0, fontSize: '16px' }}>
              {t('sourcingPartner')}
            </p>
          </div>
        </div>
      </section>

      {/* 2. WHAT WE DO */}
      <section
        style={{
          background: '#fff',
          padding: '80px 24px',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <SectionLabel text={t('whatWeDoLabel')} />
            <SectionHeading text={t('whatWeDoHeading')} />
          </div>

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
                  borderRadius: '20px',
                  padding: '36px 28px',
                  border: '1px solid rgba(15,23,42,0.05)',
                }}
              >
                <div style={{ fontSize: '36px', marginBottom: '16px' }}>{item.icon}</div>
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

      {/* 3. PRODUCT CATEGORIES */}
      <section
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '80px 24px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <SectionLabel text={t('ourCategories')} />
          <SectionHeading text={t('ourCategoriesHeading')} />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}
        >
          {categoryItems.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products/${cat.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <div
                style={{
                  background: '#fff',
                  borderRadius: '20px',
                  padding: '36px 28px',
                  border: '1px solid rgba(15,23,42,0.06)',
                  boxShadow: '0 8px 24px rgba(15,23,42,0.04)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                }}
              >
                <h3
                  style={{
                    fontSize: '22px',
                    fontWeight: 800,
                    color: '#0f172a',
                    margin: '0 0 10px 0',
                  }}
                >
                  {cat.name}
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    color: '#64748b',
                    lineHeight: 1.6,
                    margin: '0 0 12px 0',
                  }}
                >
                  {cat.description}
                </p>
                <span
                  style={{
                    color: '#2563eb',
                    fontWeight: 700,
                    fontSize: '14px',
                  }}
                >
                  {t('viewProducts')} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. WHY WORK WITH US */}
      <section
        style={{
          background: '#fff',
          padding: '80px 24px',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <SectionLabel text={t('whyWorkWithUsLabel')} />
            <SectionHeading text={t('whyWorkWithUsHeading')} />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
            }}
          >
            {[
              { icon: '🇨🇳', title: t('whyChina'), desc: t('whyChinaDesc') },
              { icon: '🏭', title: t('whyPartners'), desc: t('whyPartnersDesc') },
              { icon: '🎯', title: t('whyService'), desc: t('whyServiceDesc') },
              { icon: '🤝', title: t('whyFlexible'), desc: t('whyFlexibleDesc') },
              { icon: '🔒', title: t('whyQuality'), desc: t('whyQualityDesc') },
              { icon: '🌍', title: t('whyExport'), desc: t('whyExportDesc') },
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
                <div style={{ fontSize: '36px', marginBottom: '16px' }}>{item.icon}</div>
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

      {/* 5. OUR SOURCING PROCESS */}
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
            { step: '01', title: t('processStep1Title'), desc: t('processStep1Desc') },
            { step: '02', title: t('processStep2Title'), desc: t('processStep2Desc') },
            { step: '03', title: t('processStep3Title'), desc: t('processStep3Desc') },
            { step: '04', title: t('processStep4Title'), desc: t('processStep4Desc') },
            { step: '05', title: t('processStep5Title'), desc: t('processStep5Desc') },
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

      {/* 6. OEM & PRIVATE LABEL SERVICES */}
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
              gridTemplateColumns: 'repeat(2, 1fr)',
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

      {/* 7. FINAL CTA */}
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
            <Link href="/contact">
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
                {t('ctaContact')}
              </button>
            </Link>
            <Link href="/products">
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
                {t('ctaExplore')}
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
