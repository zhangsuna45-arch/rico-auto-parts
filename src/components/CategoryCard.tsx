'use client';

import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { useState, memo } from 'react';

interface CategoryCardProps {
  name: string;
  slug: string;
  image: string;
  description?: string;
}

export const CategoryCard = memo(function CategoryCard({ name, slug, image, description }: CategoryCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/products/${slug}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div
        style={{
          background: '#fff',
          borderRadius: '32px',
          overflow: 'hidden',
          border: '1px solid rgba(15,23,42,0.06)',
          boxShadow: isHovered
            ? '0 25px 60px rgba(15,23,42,0.12)'
            : '0 10px 30px rgba(15,23,42,0.04)',
          cursor: 'pointer',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={{ position: 'relative', width: '100%', height: 280, overflow: 'hidden' }}>
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 380px"
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h3
            style={{
              fontSize: '42px',
              lineHeight: 1.1,
              fontWeight: 900,
              margin: '0 0 8px 0',
              color: '#0f172a',
            }}
          >
            {name}
          </h3>
          {description && (
            <p
              style={{
                fontSize: '14px',
                color: '#64748b',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
});
