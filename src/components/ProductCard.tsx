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
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid #e2e8f0',
          cursor: 'pointer',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
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
            padding: '20px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h3
            style={{
              fontSize: '18px',
              lineHeight: 1.2,
              fontWeight: 600,
              margin: '0 0 8px 0',
              color: '#0f172a',
            }}
          >
            {product.name}
          </h3>
          <p
            style={{
              fontSize: '13px',
              color: '#64748b',
              lineHeight: 1.5,
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
