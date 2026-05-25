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
      'Rico Car Accessories focuses on supplying quality automotive accessories for wholesalers, retailers, e-commerce sellers, and global distributors.',
    keywords: [
      'about Rico',
      'automotive accessories supplier',
      'car accessories wholesaler',
      'auto parts supplier',
      'car accessories exporter',
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
        'Quality automotive accessories for wholesalers, retailers, and global distributors.',
    },
  };
}

export default async function About({ params }: AboutProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return (
    <div style={{ background: '#f7f9fc', minHeight: '100vh' }}>
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
            marginBottom: '20px',
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
            margin: 0,
          }}
        >
          {t('ricoCarAccessories')}
        </h1>
      </div>

      {/* Mission Section */}
      <section
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '72px 24px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '70px',
          alignItems: 'center',
        }}
      >
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
            {t('ourMission')}
          </p>
          <h2
            style={{
              fontSize: 'clamp(48px, 7vw, 72px)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              fontWeight: 900,
              marginBottom: '30px',
              color: '#0f172a',
              margin: '0 0 30px 0',
            }}
          >
            {t('professionalSupplier')}
          </h2>
          <p
            style={{
              fontSize: '18px',
              color: '#64748b',
              lineHeight: 1.9,
              marginBottom: '20px',
              margin: '0 0 20px 0',
            }}
          >
            {t('description1')}
          </p>
          <p
            style={{
              fontSize: '18px',
              color: '#64748b',
              lineHeight: 1.9,
            }}
          >
            {t('description2')}
          </p>
        </div>
        <div
          style={{
            background: 'linear-gradient(160deg, #f0f4ff 0%, #e8f0fe 50%, #f5f7fa 100%)',
            borderRadius: '32px',
            height: '500px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '80px', marginBottom: '16px' }}>📦</div>
            <p style={{ color: '#64748b', fontWeight: 600, margin: 0, fontSize: '16px' }}>
              {t('productSupplyCenter')}
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '72px 24px',
          background: '#fff',
          borderRadius: '32px',
          marginBottom: '60px',
          marginTop: '60px',
        }}
      >
        <p
          style={{
            color: '#2563eb',
            fontWeight: 700,
            letterSpacing: '3.9px',
            fontSize: '13px',
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: '16px',
            margin: '0 0 16px 0',
          }}
        >
          {t('ourValues')}
        </p>
        <h2
          style={{
            fontSize: 'clamp(48px, 7vw, 72px)',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            fontWeight: 900,
            textAlign: 'center',
            marginBottom: '60px',
            color: '#0f172a',
            margin: '0 0 40px 0',
          }}
        >
          {t('whatDrivesUs')}
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px',
          }}
        >
          {[
            {
              icon: '✓',
              title: t('qualityExcellence'),
              description: t('qualityExcellenceDesc'),
            },
            {
              icon: '🚀',
              title: t('fastDelivery'),
              description: t('fastDeliveryDesc'),
            },
            {
              icon: '🌍',
              title: t('globalReach'),
              description: t('globalReachDesc'),
            },
            {
              icon: '🤝',
              title: t('partnership'),
              description: t('partnershipDesc'),
            },
          ].map((value, i) => (
            <div
              key={i}
              style={{
                background: '#fff',
                borderRadius: '24px',
                border: '1px solid rgba(15,23,42,0.06)',
                boxShadow: '0 4px 20px rgba(15,23,42,0.04)',
                padding: '40px',
                height: '100%',
              }}
            >
              <div style={{ fontSize: '36px', marginBottom: '16px' }}>{value.icon}</div>
              <h3
                style={{
                  fontSize: '22px',
                  fontWeight: 900,
                  marginBottom: '12px',
                  color: '#0f172a',
                  margin: '0 0 12px 0',
                }}
              >
                {value.title}
              </h3>
              <p style={{ color: '#64748b', lineHeight: 1.8, margin: 0 }}>
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '72px 24px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
            gap: '40px',
            textAlign: 'center',
          }}
        >
          {[
            { number: '1,000+', label: t('productItems') },
            { number: '30+', label: t('countriesServed') },
            { number: '2,000+', label: t('activeClients') },
            { number: '7 Days', label: t('fastShipping') },
            { number: '99%', label: t('clientSatisfaction') },
            { number: '24H', label: t('responseTime') },
          ].map((stat, i) => (
            <div key={i}>
              <div
                style={{
                  fontSize: '48px',
                  fontWeight: 900,
                  color: '#2563eb',
                  marginBottom: '12px',
                  margin: '0 0 12px 0',
                }}
              >
                {stat.number}
              </div>
              <p style={{ fontSize: '16px', color: '#64748b', fontWeight: 600, margin: 0 }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
