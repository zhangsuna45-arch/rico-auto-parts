'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import type { ProductVariant } from '@/data/products';

const FALLBACK = '/placeholder-2.svg';

export function ProductDetailGallery({
  gallery,
  name,
  variants,
  activeVariantIndex,
}: {
  gallery: string[];
  name: string;
  variants?: ProductVariant[];
  activeVariantIndex?: number;
}) {
  const [selected, setSelected] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const imageRef = useRef<HTMLDivElement>(null);
  const thumbRowRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('productDetail');

  // Determine which images to show
  const hasVariants = variants && variants.length > 0;
  const activeVariant =
    hasVariants && activeVariantIndex !== undefined
      ? variants[activeVariantIndex]
      : null;
  const images =
    activeVariant && activeVariant.gallery.length > 0
      ? activeVariant.gallery
      : gallery.length > 0
        ? gallery
        : [FALLBACK];

  // Reset selected when variant changes
  useEffect(() => {
    setSelected(0);
    setZoom(false);
  }, [activeVariantIndex]);

  // Scroll active thumbnail into view
  useEffect(() => {
    if (thumbRowRef.current) {
      const thumb = thumbRowRef.current.children[selected] as HTMLElement | undefined;
      if (thumb) {
        thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [selected]);

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

  return (
    <div>
      {/* Main image — blue-tech showcase with zoom */}
      <div
        ref={imageRef}
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => {
          setZoom(false);
          setZoomPos({ x: 50, y: 50 });
        }}
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
            alt={`${name} ${selected + 1}`}
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

        {/* Image counter */}
        {images.length > 1 && (
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              background: 'rgba(15,23,42,0.6)',
              color: '#fff',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              backdropFilter: 'blur(4px)',
            }}
          >
            {selected + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails — horizontal scrollable row */}
      {images.length > 1 && (
        <div
          ref={thumbRowRef}
          style={{
            display: 'flex',
            gap: '10px',
            marginTop: '16px',
            overflowX: 'auto',
            paddingBottom: '4px',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(15,23,42,0.12) transparent',
          }}
        >
          {images.map((src, i) => (
            <button
              key={`${src}-${i}`}
              onClick={() => {
                setSelected(i);
                setZoom(false);
              }}
              style={{
                flexShrink: 0,
                width: '80px',
                height: '80px',
                borderRadius: '10px',
                overflow: 'hidden',
                border:
                  selected === i
                    ? '2px solid #2563eb'
                    : '2px solid rgba(15,23,42,0.08)',
                cursor: 'pointer',
                padding: 0,
                background: '#f1f5f9',
                transition: 'border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
                transform: selected === i ? 'scale(1.05)' : 'scale(1)',
                boxShadow:
                  selected === i
                    ? '0 4px 12px rgba(37,99,235,0.2)'
                    : '0 1px 3px rgba(15,23,42,0.06)',
                outline: 'none',
              }}
            >
              <Image
                src={src}
                alt={`${name} thumbnail ${i + 1}`}
                width={80}
                height={80}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
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
