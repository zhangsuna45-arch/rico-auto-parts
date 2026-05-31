'use client';

import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { LangSwitcher } from './LangSwitcher';
import { categories } from '@/data/categories';
import { seriesList } from '@/data/series';

export function Navbar() {
  const t = useTranslations('nav');
  const [menuOpen, setMenuOpen] = useState(false);

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
      onMouseLeave={() => setMenuOpen(false)}
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

          {/* Products dropdown */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setMenuOpen(true)}
          >
            <Link
              href="/products"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              {t('products')}
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path
                  d="M1 1l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            {/* Mega menu dropdown */}
            {menuOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 16px)',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#fff',
                  borderRadius: '16px',
                  boxShadow: '0 20px 60px rgba(15,23,42,0.12), 0 2px 8px rgba(15,23,42,0.06)',
                  border: '1px solid rgba(15,23,42,0.08)',
                  padding: '32px',
                  minWidth: '720px',
                  zIndex: 200,
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '32px',
                  }}
                >
                  {categories.map((cat) => {
                    const catSeries = seriesList.filter((s) => s.categorySlug === cat.slug);
                    return (
                      <div key={cat.slug}>
                        <Link
                          href={`/products/${cat.slug}`}
                          style={{
                            textDecoration: 'none',
                            color: '#0f172a',
                            fontWeight: 800,
                            fontSize: '14px',
                            paddingBottom: '8px',
                            marginBottom: '8px',
                            borderBottom: '2px solid #2563eb',
                            display: 'inline-block',
                          }}
                          onClick={() => setMenuOpen(false)}
                        >
                          {cat.name}
                        </Link>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '8px' }}>
                          {catSeries.map((s) => (
                            <Link
                              key={s.id}
                              href={`/products/${cat.slug}/${s.slug}`}
                              style={{
                                textDecoration: 'none',
                                color: '#64748b',
                                fontSize: '13px',
                                fontWeight: 500,
                                padding: '3px 0',
                                display: 'block',
                                transition: 'color 0.15s',
                              }}
                              onClick={() => setMenuOpen(false)}
                            >
                              {s.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

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
              whiteSpace: 'nowrap',
            }}
          >
            {t('whatsapp')}
          </a>
        </nav>
      </div>
    </header>
  );
}
