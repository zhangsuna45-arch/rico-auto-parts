'use client';

import { memo } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const HeroSection = memo(function HeroSection() {
  const t = useTranslations('home');

  return (
    <section
      style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '40px 24px 120px',
        display: 'grid',
        gridTemplateColumns: '40fr 60fr',
        gap: '60px',
        alignItems: 'center',
      }}
    >
      <div>
        <p
          style={{
            color: '#2563eb',
            fontWeight: 700,
            letterSpacing: '4px',
            marginBottom: '24px',
            margin: '0 0 24px 0',
          }}
        >
          {t('heroSubtitle')}
        </p>

        <h1
          style={{
            fontSize: 'clamp(58px, 6.5vw, 95px)',
            lineHeight: 1.0,
            fontWeight: 800,
            letterSpacing: '-0.02em',
            marginBottom: '28px',
            margin: '0 0 28px 0',
            maxWidth: '600px',
          }}
        >
          {t('heroTitle1')}
          <br />
          {t('heroTitle2')}
          <br />
          {t('heroTitle3')}
        </h1>

        <p
          style={{
            color: '#64748b',
            fontSize: '20px',
            lineHeight: 1.8,
            marginBottom: '36px',
            maxWidth: '520px',
            margin: '0 0 40px 0',
          }}
        >
          {t('heroDescription')}
        </p>

        <div
          style={{
            display: 'flex',
            gap: '20px',
          }}
        >
          <Link href="/products">
            <button
              style={{
                background: '#2563eb',
                color: '#fff',
                border: 'none',
                padding: '20px 36px',
                borderRadius: '18px',
                fontWeight: 800,
                fontSize: '16px',
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
                border: '1px solid rgba(15,23,42,0.08)',
                color: '#0f172a',
                padding: '20px 36px',
                borderRadius: '18px',
                fontWeight: 700,
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              {t('contactUs')}
            </button>
          </Link>
        </div>
      </div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'relative',
          width: '100%',
          height: 720,
          borderRadius: '36px',
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(15,23,42,0.18)',
          transform: 'translateX(40px)',
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
          alt="Premium automotive components"
          fill
          sizes="(max-width: 768px) 100vw, 52vw"
          priority
          style={{ objectFit: 'cover' }}
        />
      </motion.div>
    </section>
  );
});
