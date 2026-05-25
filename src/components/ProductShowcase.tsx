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
      {/* Outer card — white with subtle shadow */}
      <div
        style={{
          position: 'relative',
          borderRadius: '28px',
          overflow: 'hidden',
          background: '#ffffff',
          boxShadow:
            '0 20px 60px rgba(15,23,42,0.08), 0 4px 12px rgba(15,23,42,0.03), inset 0 0 0 1px rgba(255,255,255,0.5)',
          transition: interactive ? 'transform 0.4s ease' : 'none',
        }}
      >
        {/* Blue-tech gradient background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(160deg, #f0f4ff 0%, #e8f0fe 25%, #f5f7fa 50%, #eef3ff 100%)',
          }}
        />

        {/* Subtle grid pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle, rgba(37,99,235,0.06) 1px, transparent 1px)',
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
            width: '75%',
            height: '65%',
            borderRadius: '50%',
            background:
              'radial-gradient(ellipse, rgba(37,99,235,0.12) 0%, rgba(37,99,235,0.03) 45%, transparent 70%)',
            filter: 'blur(2px)',
          }}
        />

        {/* Second larger glow ring */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            height: '80%',
            borderRadius: '50%',
            background:
              'radial-gradient(ellipse, rgba(37,99,235,0.04) 0%, transparent 60%)',
          }}
        />

        {/* Decorative corner accents — tech/industrial */}
        <div
          style={{
            position: 'absolute',
            top: '6%',
            left: '6%',
            width: '28px',
            height: '28px',
            borderTop: '2px solid rgba(37,99,235,0.15)',
            borderLeft: '2px solid rgba(37,99,235,0.15)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '6%',
            right: '6%',
            width: '28px',
            height: '28px',
            borderTop: '2px solid rgba(37,99,235,0.15)',
            borderRight: '2px solid rgba(37,99,235,0.15)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '6%',
            left: '6%',
            width: '28px',
            height: '28px',
            borderBottom: '2px solid rgba(37,99,235,0.15)',
            borderLeft: '2px solid rgba(37,99,235,0.15)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '6%',
            right: '6%',
            width: '28px',
            height: '28px',
            borderBottom: '2px solid rgba(37,99,235,0.15)',
            borderRight: '2px solid rgba(37,99,235,0.15)',
            pointerEvents: 'none',
          }}
        />

        {/* Product image — floating with shadow */}
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
              inset: '10% 8%',
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
                filter:
                  'drop-shadow(0 16px 32px rgba(15,23,42,0.18)) drop-shadow(0 4px 8px rgba(37,99,235,0.08))',
                transition: 'filter 0.4s ease',
              }}
            >
              {/* Loading shimmer */}
              {!loaded && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '16px',
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
                  borderRadius: '16px',
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

        {/* Bottom reflection bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '8%',
            left: '15%',
            right: '15%',
            height: '2px',
            background:
              'linear-gradient(90deg, transparent, rgba(37,99,235,0.2), rgba(37,99,235,0.35), rgba(37,99,235,0.2), transparent)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Add shimmer keyframes via style tag */}
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
