'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { LangSwitcher } from './LangSwitcher';

interface NavProduct {
  id: string;
  name: string;
  slug: string;
  categorySlug: string;
  seriesSlug: string;
  categoryName: string;
}

export function Navbar() {
  const t = useTranslations('nav');
  const [menuOpen, setMenuOpen] = useState(false);
  const [products, setProducts] = useState<NavProduct[]>([]);

  useEffect(() => {
    fetch('/api/products-with-images')
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch(() => setProducts([]));
  }, []);

  const grouped = products.reduce<Record<string, NavProduct[]>>((acc, p) => {
    (acc[p.categoryName] ||= []).push(p);
    return acc;
  }, {});

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
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '20px 60px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link href="/">
          <div style={{ cursor: 'pointer' }}>
            <h1
              style={{
                fontSize: '32px',
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
                fontSize: '10px',
                letterSpacing: '5px',
                color: '#64748b',
                marginTop: '4px',
                margin: '4px 0 0 0',
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

          {/* Products — dropdown with product images */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setMenuOpen(true)}
          >
            <span
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                userSelect: 'none',
              }}
              onClick={() => setMenuOpen(!menuOpen)}
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
            </span>

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
                  padding: '24px 28px',
                  minWidth: '480px',
                  maxHeight: '70vh',
                  overflowY: 'auto',
                  zIndex: 200,
                }}
              >
                {Object.entries(grouped).map(([catName, items]) => (
                  <div key={catName} style={{ marginBottom: '16px' }}>
                    <h4
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#94a3b8',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        marginBottom: '8px',
                        paddingBottom: '6px',
                        borderBottom: '1px solid #f1f5f9',
                      }}
                    >
                      {catName}
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 2px' }}>
                      {items.map((p) => (
                        <Link
                          key={p.id}
                          href={`/products/${p.categorySlug}/${p.seriesSlug}/${p.slug}`}
                          onClick={() => setMenuOpen(false)}
                          style={{
                            textDecoration: 'none',
                            color: '#475569',
                            fontSize: '12px',
                            fontWeight: 500,
                            padding: '3px 10px',
                            borderRadius: '6px',
                            whiteSpace: 'nowrap',
                            transition: 'background 0.15s, color 0.15s',
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.background = '#eff6ff';
                            (e.currentTarget as HTMLElement).style.color = '#2563eb';
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.background = 'transparent';
                            (e.currentTarget as HTMLElement).style.color = '#475569';
                          }}
                        >
                          {p.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                {products.length === 0 && (
                  <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '13px', padding: '20px 0' }}>
                    Loading products...
                  </p>
                )}
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
              padding: '12px 22px',
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
