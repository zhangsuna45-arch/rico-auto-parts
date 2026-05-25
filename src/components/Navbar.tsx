'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { LangSwitcher } from './LangSwitcher';

export function Navbar() {
  const t = useTranslations('nav');

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(15,23,42,0.06)',
      }}
    >
      <div
        style={{
          maxWidth: '1500px',
          margin: '0 auto',
          padding: '24px 60px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link href="/">
          <div style={{ cursor: 'pointer' }}>
            <h1
              style={{
                fontSize: '38px',
                fontWeight: 900,
                color: '#2563eb',
                lineHeight: 1,
                margin: 0,
              }}
            >
              RICO
            </h1>
            <p
              style={{
                fontSize: '11px',
                letterSpacing: '5px',
                color: '#64748b',
                marginTop: '6px',
                margin: '6px 0 0 0',
              }}
            >
              CAR ACCESSORIES
            </p>
          </div>
        </Link>

        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '28px',
            color: '#0f172a',
            fontWeight: 600,
          }}
        >
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            {t('home')}
          </Link>
          <Link href="/products" style={{ textDecoration: 'none', color: 'inherit' }}>
            {t('products')}
          </Link>
          <Link href="/about" style={{ textDecoration: 'none', color: 'inherit' }}>
            {t('about')}
          </Link>
          <Link href="/blog" style={{ textDecoration: 'none', color: 'inherit' }}>
            {t('blog')}
          </Link>
          <Link href="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>
            {t('contact')}
          </Link>

          <LangSwitcher />

          <a
            href="https://wa.me/8619854054842?text=Hello%20I%20am%20interested%20in%20your%20products"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#2563eb',
              color: '#fff',
              padding: '14px 24px',
              borderRadius: '999px',
              fontWeight: 800,
              textDecoration: 'none',
            }}
          >
            {t('whatsapp')}
          </a>
        </nav>
      </div>
    </header>
  );
}
