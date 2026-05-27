'use client';

import { memo } from 'react';
import { Link } from '@/i18n/navigation';
import { ProductShowcase } from '@/components/ProductShowcase';
import type { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.categorySlug}/${product.seriesSlug}/${product.slug}`}
      style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '32px',
          overflow: 'hidden',
          border: '1px solid rgba(15,23,42,0.06)',
          boxShadow: '0 10px 30px rgba(15,23,42,0.04)',
          cursor: 'pointer',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.3s ease',
        }}
      >
        <ProductShowcase
          src={product.image}
          alt={product.name}
          aspectRatio="4/3"
          sizes="(max-width: 768px) 100vw, 360px"
          interactive={false}
          style={{ borderRadius: 0 }}
        />

        <div
          style={{
            padding: '34px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h3
            style={{
              fontSize: '34px',
              lineHeight: 1.2,
              fontWeight: 900,
              margin: '0 0 16px 0',
              color: '#0f172a',
            }}
          >
            {product.name}
          </h3>
          <p
            style={{
              fontSize: '16px',
              color: '#64748b',
              lineHeight: 1.6,
              marginTop: 'auto',
            }}
          >
            {product.description}
          </p>
        </div>
      </div>
    </Link>
  );
});
