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

interface ProductFloat {
  src: string;
  alt: string;
  width: number;
  height: number;
  top: string;
  left: string;
  w: string;
  z: number;
  rotate: string;
}

const products: ProductFloat[] = [
  // Large
  { src: '/images/phone-holder.png',       alt: '', width: 500, height: 500, top: '12%',  left: '5%',   w: '52%', z: 4, rotate: '-3deg' },
  { src: '/images/air-freshener.png',      alt: '', width: 500, height: 500, top: '2%',   left: '35%',  w: '48%', z: 3, rotate: '4deg' },
  // Medium
  { src: '/images/organizer.png',          alt: '', width: 500, height: 500, top: '40%',  left: '10%',  w: '38%', z: 5, rotate: '-2deg' },
  { src: '/images/tissue-box.png',         alt: '', width: 500, height: 500, top: '38%',  left: '42%',  w: '34%', z: 2, rotate: '5deg' },
  { src: '/images/headrest.png',           alt: '', width: 500, height: 500, top: '50%',  left: '28%',  w: '36%', z: 3, rotate: '-4deg' },
  // Small
  { src: '/images/led-bulb.png',           alt: '', width: 500, height: 500, top: '5%',   left: '22%',  w: '24%', z: 2, rotate: '8deg' },
  { src: '/images/led-strip.png',          alt: '', width: 500, height: 500, top: '58%',  left: '55%',  w: '26%', z: 4, rotate: '-6deg' },
  { src: '/images/car-charger.png',        alt: '', width: 500, height: 500, top: '65%',  left: '2%',   w: '22%', z: 2, rotate: '3deg' },
];

export const HeroSection = memo(function HeroSection() {
  const t = useTranslations('home');

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        overflowX: 'hidden',
        background: 'linear-gradient(170deg, #f4f5f7 0%, #eaecf0 40%, #f0f2f5 100%)',
        minHeight: 'clamp(560px, 46vw, 700px)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1400px',
          width: '100%',
          margin: '0 auto',
          padding: 'clamp(48px, 6vw, 80px) 24px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Left content — 55% */}
        <div style={{ flex: '0 0 55%', maxWidth: '600px' }}>
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

          <p
            style={{
              color: '#6b7280',
              fontSize: '14px',
              lineHeight: 1.7,
              maxWidth: '440px',
              margin: '0 0 28px 0',
            }}
          >
            {t('heroDescription')}
          </p>

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
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d={icon} />
                  </svg>
                </div>
                <span style={{ fontWeight: 600, fontSize: '13px', color: '#374151', lineHeight: 1.3 }}>
                  {t(key)}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
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
            <CatalogueButton />
          </div>
        </div>

        {/* Right: floating product composition — 45% */}
        <div
          className="hero-products"
          style={{
            flex: '0 0 45%',
            position: 'relative',
            minHeight: 'clamp(400px, 40vw, 560px)',
          }}
        >
          {products.map((p, i) => (
            <Image
              key={i}
              src={p.src}
              alt={p.alt}
              width={p.width}
              height={p.height}
              sizes="(max-width: 768px) 60vw, 22vw"
              style={{
                position: 'absolute',
                top: p.top,
                left: p.left,
                width: p.w,
                height: 'auto',
                zIndex: p.z,
                transform: `rotate(${p.rotate})`,
                filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.08))',
                objectFit: 'contain',
              }}
            />
          ))}
        </div>
      </div>

      {/* Responsive: stack vertically on mobile */}
      <style>{`
        @media (max-width: 768px) {
          .hero-products {
            flex: 0 0 100% !important;
            min-height: 300px !important;
            margin-top: 24px;
          }
        }
      `}</style>
    </section>
  );
});
