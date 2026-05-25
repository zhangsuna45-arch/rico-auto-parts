import { ContactForm } from '@/components/ContactForm';
import { BreadcrumbSchema } from '@/components/StructuredData';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

interface ContactProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: ContactProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: 'Contact Rico Car Accessories | Wholesale Inquiries',
    description:
      'Get in touch for wholesale car accessories inquiries, custom solutions, and bulk pricing. Contact us via email, phone, or WhatsApp.',
    keywords: [
      'contact car accessories supplier',
      'wholesale quote request',
      'automotive accessories inquiry',
      'contact Rico Car Accessories',
    ],
    alternates: {
      canonical: `https://www.ricocaraccessories.com/${locale}/contact`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `https://www.ricocaraccessories.com/${l}/contact`]),
      ),
    },
    openGraph: {
      title: 'Contact Rico Car Accessories | Wholesale Inquiries',
      description: 'Get in touch for wholesale car accessories inquiries and custom solutions.',
    },
  };
}

export default async function Contact({ params }: ContactProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return (
    <div style={{ background: '#f7f9fc', minHeight: '100vh' }}>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `/${locale}` },
          { name: 'Contact', url: `/${locale}/contact` },
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
          {t('getInTouch')}
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
          {t('contactUs')}
        </h1>
        <p style={{ fontSize: '18px', opacity: 0.9, margin: 0 }}>
          {t('contactDescription')}
        </p>
      </div>

      {/* Contact Section */}
      <section
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '72px 24px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'stretch',
        }}
      >
        {/* Contact Info */}
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2
            style={{
              fontSize: 'clamp(48px, 7vw, 72px)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              fontWeight: 900,
              marginBottom: '48px',
              color: '#0f172a',
              margin: '0 0 48px 0',
            }}
          >
            {t('contactInformation')}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <p
                style={{
                  color: '#2563eb',
                  fontWeight: 700,
                  fontSize: '13px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                  margin: '0 0 8px 0',
                }}
              >
                {t('email')}
              </p>
              <a
                href="mailto:suwenz0716@gmail.com"
                style={{
                  fontSize: '18px',
                  color: '#0f172a',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                suwenz0716@gmail.com
              </a>
            </div>

            <div>
              <p
                style={{
                  color: '#2563eb',
                  fontWeight: 700,
                  fontSize: '13px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                  margin: '0 0 8px 0',
                }}
              >
                {t('phone')}
              </p>
              <a
                href="tel:+8619854054842"
                style={{
                  fontSize: '18px',
                  color: '#0f172a',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                +86 19854054842
              </a>
            </div>

            <div>
              <p
                style={{
                  color: '#2563eb',
                  fontWeight: 700,
                  fontSize: '13px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                  margin: '0 0 8px 0',
                }}
              >
                {t('address')}
              </p>
              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.8, margin: 0 }}>
                {t('addressLine1')}
                <br />
                {t('addressLine2')}
                <br />
                {t('addressLine3')}
              </p>
            </div>

            <div>
              <p
                style={{
                  color: '#2563eb',
                  fontWeight: 700,
                  fontSize: '13px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                  margin: '0 0 8px 0',
                }}
              >
                {t('whatsapp')}
              </p>
              <a
                href="https://wa.me/8619854054842"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: '#25D366',
                  color: '#fff',
                  padding: '14px 24px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '14px',
                }}
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-9.746 9.798c0 2.734.732 5.41 2.124 7.738L1.623 23.73l8.239-2.722c2.261 1.236 4.8 1.888 7.384 1.889h.004c5.43 0 9.868-4.438 9.868-9.868 0-2.633-.636-5.12-1.84-7.347z" />
                </svg>
                {t('chatWhatsApp')}
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div
          style={{
            background: '#fff',
            padding: '40px',
            borderRadius: '32px',
            boxShadow: '0 10px 40px rgba(15,23,42,0.08)',
          }}
        >
          <h3
            style={{
              fontSize: '32px',
              fontWeight: 900,
              marginBottom: '30px',
              color: '#0f172a',
              margin: '0 0 30px 0',
            }}
          >
            {t('sendMessage')}
          </h3>
          <ContactForm />
        </div>
      </section>

      {/* Map Section */}
      <section
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '72px 24px',
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(48px, 7vw, 72px)',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            fontWeight: 900,
            textAlign: 'center',
            margin: '0 0 40px 0',
            color: '#0f172a',
          }}
        >
          {t('ourLocation')}
        </h2>
        <div
          style={{
            background: '#e2e8f0',
            borderRadius: '32px',
            height: '500px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>📍</div>
            <p style={{ fontSize: '18px', color: '#64748b', fontWeight: 600, margin: 0 }}>
              {t('mapComingSoon')}
            </p>
            <p style={{ fontSize: '14px', color: '#94a3b8', margin: '8px 0 0 0' }}>
              {t('mapReplace')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
