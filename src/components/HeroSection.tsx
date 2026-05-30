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
        minHeight: 'clamp(520px, 48vw, 680px)',
        background: 'linear-gradient(150deg, #111827 0%, #1a1f2e 50%, #1e2433 100%)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Right side: product image bleeding to right edge */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: 'clamp(600px, 60vw, 900px)',
        }}
      >
        <Image
          src="/images/hero-banner.webp"
          alt=""
          fill
          sizes="60vw"
          priority
          style={{ objectFit: 'cover', objectPosition: 'center left' }}
        />
        {/* Gradient overlay: fades image left edge into background */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '230px',
            background: 'linear-gradient(to right, #1a1f2e 0%, transparent 100%)',
          }}
        />
      </div>

      {/* Left content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1280px',
          width: '100%',
          margin: '0 auto',
          padding: '60px 24px',
        }}
      >
        <div style={{ maxWidth: '540px' }}>
          <p
            style={{
              color: '#3b82f6',
              fontWeight: 700,
              letterSpacing: '4px',
              fontSize: '13px',
              margin: '0 0 20px 0',
            }}
          >
            {t('heroSubtitle')}
          </p>

          <h1
            style={{
              fontSize: 'clamp(40px, 4.5vw, 62px)',
              lineHeight: 1.08,
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
          </h1>

          <p
            style={{
              color: 'rgba(255,255,255,0.65)',
              fontSize: '16px',
              lineHeight: 1.7,
              maxWidth: '440px',
              margin: '0 0 32px 0',
            }}
          >
            {t('heroDescription')}
          </p>

          <div
            style={{
              display: 'flex',
              gap: '16px',
            }}
          >
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
        }}
      />
    </section>
  );
});
