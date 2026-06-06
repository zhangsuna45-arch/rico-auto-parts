'use client';

import { memo } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { CatalogueButton } from './CatalogueModal';

const features = [
  { key: 'heroModuleMOQ' as const },
  { key: 'heroModuleOEM' as const },
  { key: 'heroModuleProducts' as const },
  { key: 'heroModuleShipping' as const },
];

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="12" fill="#2563eb" />
      <path d="M7 13l3 3 7-7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const HeroSection = memo(function HeroSection() {
  const t = useTranslations('home');

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        overflowX: 'hidden',
        background: 'linear-gradient(180deg, #ebedf1 0%, #e2e4e9 100%)',
        minHeight: 900,
        display: 'flex',
        alignItems: 'center',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      <div
        className="hero-inner"
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 1400,
          width: '100%',
          margin: '0 auto',
          padding: '80px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 0,
        }}
      >
        {/* ── Left 45% ── */}
        <div
          className="hero-left"
          style={{
            flex: '0 0 45%',
            maxWidth: 700,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* Eyebrow */}
          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: '#6b7280',
              margin: '0 0 20px 0',
            }}
          >
            {t('heroSubtitle')}
          </p>

          {/* Heading */}
          <h1
            style={{
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: '#111827',
              margin: '0 0 32px 0',
            }}
          >
            {t('heroTitle1')}
            <br />
            <span style={{ color: '#2563eb' }}>{t('heroTitle2')}</span>
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: 20,
              lineHeight: 1.8,
              color: '#6b7280',
              maxWidth: 620,
              margin: '0 0 40px 0',
            }}
          >
            {t('heroDescription')}
          </p>

          {/* Feature grid 2×2 */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '14px 24px',
              marginBottom: 48,
              maxWidth: 520,
            }}
          >
            {features.map(({ key }) => (
              <div
                key={key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <CheckIcon />
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: '#374151',
                    lineHeight: 1.3,
                  }}
                >
                  {t(key)}
                </span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div
            className="hero-buttons"
            style={{
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            <Link href="/" style={{ textDecoration: 'none' }}>
              <button
                style={{
                  height: 56,
                  padding: '0 32px',
                  background: '#2563eb',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  fontFamily: 'Inter, system-ui, sans-serif',
                }}
              >
                {t('exploreProducts')}
              </button>
            </Link>
            <Link href="/contact" style={{ textDecoration: 'none' }}>
              <button
                style={{
                  height: 56,
                  padding: '0 32px',
                  background: '#fff',
                  border: '1.5px solid #d1d5db',
                  color: '#374151',
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  fontFamily: 'Inter, system-ui, sans-serif',
                }}
              >
                {t('contactUs')}
              </button>
            </Link>
            <CatalogueButton />
          </div>
        </div>

        {/* ── Right 55%: seamless product image ── */}
        <div
          className="hero-right"
          style={{
            flex: '0 0 55%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            src="/images/背景.png"
            alt=""
            width={964}
            height={931}
            priority
            sizes="(max-width: 768px) 90vw, 55vw"
            style={{
              width: '100%',
              height: 'auto',
              maxWidth: 700,
              objectFit: 'contain',
            }}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .hero-left h1 {
            font-size: 56px !important;
          }
        }
        @media (max-width: 768px) {
          .hero-inner {
            flex-direction: column !important;
            padding: 48px 24px !important;
            gap: 48px;
          }
          .hero-left {
            flex: 0 0 auto !important;
            max-width: 100% !important;
            width: 100%;
          }
          .hero-left h1 {
            font-size: 42px !important;
          }
          .hero-right {
            flex: 0 0 auto !important;
            width: 100%;
            order: 1;
          }
          .hero-buttons {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .hero-buttons button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
});
