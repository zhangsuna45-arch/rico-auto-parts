'use client';

import { memo } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { CatalogueButton } from './CatalogueModal';

const modules = [
  { key: 'heroModuleProducts', icon: 'M5 13l4 4L19 7' },
  { key: 'heroModuleOEM', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
  { key: 'heroModuleMOQ', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { key: 'heroModuleShipping', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z' },
] as const;

export const HeroSection = memo(function HeroSection() {
  const t = useTranslations('home');

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        overflowX: 'hidden',
        background: '#F2F2F2',
        minHeight: 'clamp(560px, 46vw, 680px)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Right panel with diagonal cut — subtle car interior texture */}
      <div
        className="hero-right-panel"
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: 'clamp(48%, 55vw, 62%)',
          background: '#e9e9e9',
          clipPath: 'polygon(14% 0, 100% 0, 100% 100%, 0 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Product image on light grey platform — no card */}
        <Image
          src="/images/hero-products.png"
          alt=""
          width={700}
          height={467}
          priority
          sizes="(max-width: 768px) 100vw, 55vw"
          className="hero-right-img"
          style={{
            width: '85%',
            height: 'auto',
            display: 'block',
            objectFit: 'contain',
            zIndex: 1,
            position: 'relative',
          }}
        />
      </div>

      {/* Left content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1400px',
          width: '100%',
          margin: '0 auto',
          padding: 'clamp(48px, 6vw, 80px) 24px',
        }}
      >
        <div style={{ maxWidth: '520px' }}>
          {/* Subtitle */}
          <p
            style={{
              color: '#6b7280',
              fontWeight: 700,
              letterSpacing: '4px',
              fontSize: '12px',
              textTransform: 'uppercase',
              margin: '0 0 16px 0',
            }}
          >
            {t('heroSubtitle')}
          </p>

          {/* Title — "Automotive Accessories" in bright blue */}
          <h1
            style={{
              fontSize: 'clamp(32px, 3.6vw, 52px)',
              lineHeight: 1.15,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              margin: '0 0 16px 0',
              color: '#1a1a1a',
            }}
          >
            {t('heroTitle1')}
            <br />
            <span style={{ color: '#2563eb' }}>{t('heroTitle2')}</span>
            <br />
            {t('heroTitle3')} {t('heroTitle4')}
          </h1>

          {/* Description */}
          <p
            style={{
              color: '#6b7280',
              fontSize: '14px',
              lineHeight: 1.7,
              maxWidth: '420px',
              margin: '0 0 28px 0',
            }}
          >
            {t('heroDescription')}
          </p>

          {/* 4 service modules — 2x2 grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              marginBottom: '28px',
              maxWidth: '440px',
            }}
          >
            {modules.map(({ key, icon }) => (
              <div
                key={key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                {/* Blue circle icon */}
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    background: '#2563eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={icon} />
                  </svg>
                </div>
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: '13px',
                    color: '#374151',
                    lineHeight: 1.3,
                  }}
                >
                  {t(key)}
                </span>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {/* Blue — Explore Products */}
            <Link href="/products" style={{ textDecoration: 'none' }}>
              <button
                style={{
                  background: '#2563eb',
                  color: '#fff',
                  border: 'none',
                  padding: '14px 28px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {t('exploreProducts')}
              </button>
            </Link>

            {/* White — Contact Us */}
            <Link href="/contact" style={{ textDecoration: 'none' }}>
              <button
                style={{
                  background: '#fff',
                  border: '1px solid #d1d5db',
                  color: '#374151',
                  padding: '14px 28px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {t('contactUs')}
              </button>
            </Link>

            {/* Black — View Catalogue */}
            <CatalogueButton />
          </div>
        </div>
      </div>

      {/* Mobile: override right panel to be below text */}
      <style>{`
        @media (max-width: 768px) {
          .hero-right-panel {
            position: relative !important;
            width: 100% !important;
            clip-path: none !important;
            min-height: 320px;
            margin-top: 0;
          }
          .hero-right-img {
            width: 90% !important;
            max-width: 480px !important;
          }
        }
      `}</style>
    </section>
  );
});
