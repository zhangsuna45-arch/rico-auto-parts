'use client';

import { memo } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { CatalogueButton } from './CatalogueModal';

export const HeroSection = memo(function HeroSection() {
  const t = useTranslations('home');

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        overflowX: 'hidden',
        minHeight: 'clamp(520px, 48vw, 680px)',
        background: 'linear-gradient(150deg, #111827 0%, #1a1f2e 50%, #1e2433 100%)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Left content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1400px',
          width: '100%',
          margin: '0 auto',
          padding: 'clamp(48px, 6vw, 96px) 24px',
        }}
      >
        <div style={{ maxWidth: '520px' }}>
          <p
            style={{
              color: '#3b82f6',
              fontWeight: 700,
              letterSpacing: '4px',
              fontSize: '13px',
              textTransform: 'uppercase',
              margin: '0 0 20px 0',
            }}
          >
            {t('heroSubtitle')}
          </p>

          <h1
            style={{
              fontSize: 'clamp(34px, 3.8vw, 52px)',
              lineHeight: 1.12,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              margin: '0 0 20px 0',
              color: '#fff',
            }}
          >
            {t('heroTitle1')}
            <br />
            <span style={{ color: '#3b82f6' }}>{t('heroTitle2')}</span>
            <br />
            {t('heroTitle3')}
            <br />
            {t('heroTitle4')}
          </h1>

          <p
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '16px',
              lineHeight: 1.7,
              maxWidth: '440px',
              margin: '0 0 32px 0',
            }}
          >
            {t('heroDescription')}
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/products">
              <button
                style={{
                  background: '#3b82f6',
                  color: '#fff',
                  border: 'none',
                  padding: '16px 32px',
                  borderRadius: '14px',
                  fontWeight: 800,
                  fontSize: '15px',
                  cursor: 'pointer',
                }}
              >
                {t('exploreProducts')}
              </button>
            </Link>

            <Link href="/contact">
              <button
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.25)',
                  color: '#fff',
                  padding: '16px 32px',
                  borderRadius: '14px',
                  fontWeight: 700,
                  fontSize: '15px',
                  cursor: 'pointer',
                }}
              >
                {t('contactUs')}
              </button>
            </Link>

            <CatalogueButton />
          </div>
        </div>
      </div>

      {/* Hero product image — transparent PNG, no card/container */}
      <Image
        src="/images/hero-products.png"
        alt=""
        width={1000}
        height={700}
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
        className="hero-img"
        style={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 'clamp(700px, 50vw, 1000px)',
          height: 'auto',
          zIndex: 1,
        }}
      />

      {/* Bottom gradient: fades into the light page background */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '80px',
          background: 'linear-gradient(to bottom, transparent 0%, #f7f9fc 100%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Mobile: image moves below text, not absolute */}
      <style>{`
        @media (max-width: 768px) {
          .hero-img {
            position: relative !important;
            right: auto !important;
            top: auto !important;
            transform: none !important;
            width: 100% !important;
            max-width: 500px !important;
            margin: 0 auto !important;
            display: block !important;
          }
        }
      `}</style>
    </section>
  );
});
