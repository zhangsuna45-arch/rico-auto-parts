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
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '32px 24px 80px',
        display: 'grid',
        gridTemplateColumns: '45fr 55fr',
        gap: '48px',
        alignItems: 'center',
      }}
    >
      <div>
        <p
          style={{
            color: '#2563eb',
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
            fontSize: 'clamp(42px, 4.5vw, 64px)',
            lineHeight: 1.08,
            fontWeight: 800,
            letterSpacing: '-0.02em',
            margin: '0 0 20px 0',
            maxWidth: '520px',
          }}
        >
          {t('heroTitle1')}
          <br />
          <span style={{ color: '#2563eb' }}>{t('heroTitle2')}</span>
          <br />
          {t('heroTitle3')}
        </h1>

        <p
          style={{
            color: '#64748b',
            fontSize: '16px',
            lineHeight: 1.7,
            maxWidth: '460px',
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
                background: '#2563eb',
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
                background: '#fff',
                border: '1px solid rgba(15,23,42,0.1)',
                color: '#0f172a',
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

      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(400px, 42vw, 620px)',
          marginRight: '-48px',
        }}
      >
        <Image
          src="/images/hero-homepage.png"
          alt="Rico Car Accessories - Automotive accessories supplier from China"
          fill
          sizes="55vw"
          priority
          style={{ objectFit: 'contain', objectPosition: 'center right' }}
        />
      </div>
    </section>
  );
});
