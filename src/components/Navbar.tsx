'use client';

import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { LangSwitcher } from './LangSwitcher';
import { categories } from '@/data/categories';
import { seriesList } from '@/data/series';

const interiorSeries = seriesList.filter((s) => s.categorySlug === 'interior-accessories');
const airFreshenerSeries = seriesList.filter((s) => s.categorySlug === 'air-fresheners');
const electronicsSeries = seriesList.filter((s) => s.categorySlug === 'electronics');
const lightingSeries = seriesList.filter((s) => s.categorySlug === 'lighting');
const exteriorSeries = seriesList.filter((s) => s.categorySlug === 'exterior-accessories');

const utilitySeries = seriesList.filter((s) => {
  const slugs = ['phone-holders', 'car-trays', 'luggage-holders', 'car-refrigerators', 'air-inflators', 'air-vents'];
  return s.categorySlug === 'utility-safety-products' && slugs.includes(s.slug);
});
const safetySeries = seriesList.filter((s) => {
  const slugs = ['baby-seats', 'safety-belts', 'buckles', 'car-locks', 'snow-chains'];
  return s.categorySlug === 'utility-safety-products' && slugs.includes(s.slug);
});
const maintenanceSeries = seriesList.filter((s) => {
  const slugs = ['air-filters', 'batteries', 'cigarette-lighters'];
  return s.categorySlug === 'utility-safety-products' && slugs.includes(s.slug);
});

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

          {/* Products — menu trigger only (no page navigation) */}
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

            {/* Mega menu — 3 columns */}
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
                  minWidth: '780px',
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
                  {/* Column 1: Interior Accessories + Air Fresheners */}
                  <div>
                    <MenuCategory
                      name={categories.find((c) => c.slug === 'interior-accessories')?.name || 'Interior Accessories'}
                      slug="interior-accessories"
                      series={interiorSeries}
                      onClose={() => setMenuOpen(false)}
                    />
                    <div style={{ height: '24px' }} />
                    <MenuCategory
                      name={categories.find((c) => c.slug === 'air-fresheners')?.name || 'Air Fresheners'}
                      slug="air-fresheners"
                      series={airFreshenerSeries}
                      onClose={() => setMenuOpen(false)}
                    />
                  </div>

                  {/* Column 2: Electronics + Lighting */}
                  <div>
                    <MenuCategory
                      name={categories.find((c) => c.slug === 'electronics')?.name || 'Electronics'}
                      slug="electronics"
                      series={electronicsSeries}
                      onClose={() => setMenuOpen(false)}
                    />
                    <div style={{ height: '24px' }} />
                    <MenuCategory
                      name={categories.find((c) => c.slug === 'lighting')?.name || 'Lighting'}
                      slug="lighting"
                      series={lightingSeries}
                      onClose={() => setMenuOpen(false)}
                    />
                  </div>

                  {/* Column 3: Exterior + Utility + Safety + Maintenance */}
                  <div>
                    <MenuCategory
                      name={categories.find((c) => c.slug === 'exterior-accessories')?.name || 'Exterior Accessories'}
                      slug="exterior-accessories"
                      series={exteriorSeries}
                      onClose={() => setMenuOpen(false)}
                    />
                    <div style={{ height: '24px' }} />
                    <MenuGroup
                      label="Utility Products"
                      series={utilitySeries}
                      categorySlug="utility-safety-products"
                      onClose={() => setMenuOpen(false)}
                    />
                    <div style={{ height: '20px' }} />
                    <MenuGroup
                      label="Safety Products"
                      series={safetySeries}
                      categorySlug="utility-safety-products"
                      onClose={() => setMenuOpen(false)}
                    />
                    <div style={{ height: '20px' }} />
                    <MenuGroup
                      label="Maintenance & Accessories"
                      series={maintenanceSeries}
                      categorySlug="utility-safety-products"
                      onClose={() => setMenuOpen(false)}
                    />
                  </div>
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

function MenuCategory({
  name,
  slug,
  series,
  onClose,
}: {
  name: string;
  slug: string;
  series: { name: string; slug: string; categorySlug: string }[];
  onClose: () => void;
}) {
  return (
    <div>
      <Link
        href={`/products/${slug}`}
        style={{
          textDecoration: 'none',
          color: '#0f172a',
          fontWeight: 800,
          fontSize: '13px',
          paddingBottom: '6px',
          marginBottom: '6px',
          borderBottom: '2px solid #2563eb',
          display: 'inline-block',
        }}
        onClick={onClose}
      >
        {name}
      </Link>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', marginTop: '6px' }}>
        {series.map((s) => (
          <Link
            key={s.slug}
            href={`/products/${s.categorySlug}/${s.slug}`}
            style={{
              textDecoration: 'none',
              color: '#64748b',
              fontSize: '12px',
              fontWeight: 500,
              padding: '2px 0',
              display: 'block',
            }}
            onClick={onClose}
          >
            {s.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

function MenuGroup({
  label,
  series,
  categorySlug,
  onClose,
}: {
  label: string;
  series: { name: string; slug: string; categorySlug: string }[];
  categorySlug: string;
  onClose: () => void;
}) {
  return (
    <div>
      <span
        style={{
          color: '#94a3b8',
          fontWeight: 700,
          fontSize: '10px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          paddingBottom: '4px',
          display: 'inline-block',
          marginBottom: '4px',
        }}
      >
        {label}
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', marginTop: '2px' }}>
        {series.map((s) => (
          <Link
            key={s.slug}
            href={`/products/${categorySlug}/${s.slug}`}
            style={{
              textDecoration: 'none',
              color: '#64748b',
              fontSize: '12px',
              fontWeight: 500,
              padding: '2px 0',
              display: 'block',
            }}
            onClick={onClose}
          >
            {s.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
