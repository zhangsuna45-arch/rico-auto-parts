'use client';

import { useState, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const FALLBACK = 'https://images.unsplash.com/photo-1489824904134-891ab64532f1';

export function ProductDetailGallery({
  gallery,
  name,
}: {
  gallery: string[];
  name: string;
}) {
  const [selected, setSelected] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const imageRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('productDetail');

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!imageRef.current || !zoom) return;
      const rect = imageRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setZoomPos({ x, y });
    },
    [zoom],
  );

  const images = gallery.length > 0 ? gallery : [FALLBACK];

  return (
    <div>
      {/* Main image — blue-tech showcase with zoom */}
      <div
        ref={imageRef}
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={handleMouseMove}
        style={{
          position: 'relative',
          background:
            'linear-gradient(160deg, #f0f4ff 0%, #e8f0fe 25%, #f5f7fa 50%, #eef3ff 100%)',
          borderRadius: '24px',
          height: '520px',
          overflow: 'hidden',
          cursor: zoom ? 'zoom-out' : 'zoom-in',
          boxShadow:
            '0 20px 60px rgba(15,23,42,0.08), 0 4px 12px rgba(15,23,42,0.03), inset 0 0 0 1px rgba(255,255,255,0.5)',
        }}
      >
        {/* Dot grid pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle, rgba(37,99,235,0.06) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            pointerEvents: 'none',
          }}
        />

        {/* Blue glow behind product */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '70%',
            height: '55%',
            borderRadius: '50%',
            background:
              'radial-gradient(ellipse, rgba(37,99,235,0.14) 0%, rgba(37,99,235,0.04) 45%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Corner accents */}
        {['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].map((pos) => {
          const isTop = pos.includes('top');
          const isLeft = pos.includes('Left');
          return (
            <div
              key={pos}
              style={{
                position: 'absolute',
                [isTop ? 'top' : 'bottom']: '6%',
                [isLeft ? 'left' : 'right']: '6%',
                width: '28px',
                height: '28px',
                borderTop: isTop ? '2px solid rgba(37,99,235,0.15)' : 'none',
                borderBottom: !isTop ? '2px solid rgba(37,99,235,0.15)' : 'none',
                borderLeft: isLeft ? '2px solid rgba(37,99,235,0.15)' : 'none',
                borderRight: !isLeft ? '2px solid rgba(37,99,235,0.15)' : 'none',
                pointerEvents: 'none',
              }}
            />
          );
        })}

        <div
          style={{
            position: 'absolute',
            inset: '8% 6%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            src={images[selected] || FALLBACK}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            style={{
              objectFit: 'contain',
              objectPosition: zoom ? `${zoomPos.x}% ${zoomPos.y}%` : 'center',
              transform: zoom ? 'scale(1.8)' : 'scale(1)',
              transition: zoom ? 'none' : 'transform 0.4s ease',
              filter:
                'drop-shadow(0 16px 32px rgba(15,23,42,0.18)) drop-shadow(0 4px 8px rgba(37,99,235,0.08))',
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = FALLBACK;
            }}
          />
        </div>

        {/* Bottom reflection line */}
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

        {!zoom && (
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              right: '16px',
              background: 'rgba(15,23,42,0.7)',
              color: '#fff',
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 600,
              backdropFilter: 'blur(4px)',
            }}
          >
            {t('hoverToZoom')}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${images.length}, 1fr)`,
            gap: '12px',
            marginTop: '16px',
          }}
        >
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => {
                setSelected(i);
                setZoom(false);
              }}
              style={{
                position: 'relative',
                aspectRatio: '1',
                borderRadius: '12px',
                overflow: 'hidden',
                border:
                  selected === i
                    ? '3px solid #2563eb'
                    : '3px solid transparent',
                cursor: 'pointer',
                padding: 0,
                background: '#e2e8f0',
                transition: 'border-color 0.2s ease, transform 0.2s ease',
                transform: selected === i ? 'scale(1.02)' : 'scale(1)',
                outline: 'none',
              }}
            >
              <Image
                src={src}
                alt={`${name} ${i + 1}`}
                fill
                sizes="80px"
                style={{ objectFit: 'cover' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK;
                }}
              />
              {selected === i && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(37,99,235,0.08)',
                  }}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
