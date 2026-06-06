'use client';

import Image from 'next/image';
import { useState, memo } from 'react';

interface ProductShowcaseProps {
  src: string;
  alt: string;
  aspectRatio?: '1/1' | '4/3' | '3/2' | '16/9';
  priority?: boolean;
  sizes?: string;
  className?: string;
  style?: React.CSSProperties;
  interactive?: boolean;
}

const ASPECT_MAP = {
  '1/1': 100,
  '4/3': 75,
  '3/2': 66.67,
  '16/9': 56.25,
};

export const ProductShowcase = memo(function ProductShowcase({
  src,
  alt,
  aspectRatio = '4/3',
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
  className,
  style,
  interactive = true,
}: ProductShowcaseProps) {
  const [loaded, setLoaded] = useState(false);

  const padPct = ASPECT_MAP[aspectRatio];

  return (
    <div className={className} style={{ position: 'relative', ...style }}>
      <div
        style={{
          position: 'relative',
          borderRadius: '20px',
          overflow: 'hidden',
          background: '#f8fafc',
          transition: interactive ? 'transform 0.4s ease' : 'none',
        }}
      >
        {/* Light grid pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Blue glow ellipse behind product */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '82%',
            height: '72%',
            borderRadius: '50%',
            background:
              'radial-gradient(ellipse, rgba(37,99,235,0.06) 0%, rgba(37,99,235,0.01) 45%, transparent 70%)',
          }}
        />

        {/* Product image */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            paddingBottom: `${padPct}%`,
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: '5% 4%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                transition: 'filter 0.4s ease',
              }}
            >
              {!loaded && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '12px',
                    background:
                      'linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.5s infinite',
                  }}
                />
              )}
              <Image
                src={src}
                alt={alt}
                fill
                sizes={sizes}
                priority={priority}
                style={{
                  objectFit: 'contain',
                  borderRadius: '12px',
                  opacity: loaded ? 1 : 0,
                  transition: 'opacity 0.5s ease',
                }}
                onLoad={() => setLoaded(true)}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    '/placeholder-2.svg';
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `,
        }}
      />
    </div>
  );
});
