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
        width: '100%',
        overflowX: 'hidden',
        background: 'linear-gradient(150deg, #111827 0%, #1a1f2e 50%, #1e2433 100%)',
        position: 'relative',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: 'clamp(48px, 6vw, 96px) 24px',
        }}
      >
        <div
          className="hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '45% 55%',
            alignItems: 'center',
            gap: '40px',
          }}
        >
          {/* Left content */}
          <div>
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

          {/* Right image — normal document flow, no absolute positioning */}
          <div>
            <Image
              src="/images/hero-banner.webp"
              alt=""
              width={800}
              height={600}
              priority
              sizes="(max-width: 768px) 100vw, 55vw"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'contain',
              }}
            />
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

      {/* Responsive: single column on mobile */}
      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  );
});
