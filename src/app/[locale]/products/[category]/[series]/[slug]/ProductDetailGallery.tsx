'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
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
  const t = useTranslations('productDetail');

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

  useEffect(() => {
    setSelected(0);
    setZoom(false);
  }, [activeVariantIndex]);

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

  useEffect(() => {
    images.forEach((src, i) => {
      if (i === selected || i === selected + 1 || i === selected - 1) {
        const img = new window.Image();
        img.src = src;
      }
    });
  }, [selected, images]);

  const handleThumbClick = useCallback((i: number) => {
    setSelected(i);
    setZoom(false);
  }, []);

  return (
    <div>
      {/* Main image container */}
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
          background: '#f8fafc',
          borderRadius: '16px',
          aspectRatio: '4/3',
          overflow: 'hidden',
          cursor: zoom ? 'zoom-out' : 'zoom-in',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          border: '1px solid rgba(0,0,0,0.04)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: '4%',
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
              transition: zoom ? 'none' : 'transform 0.15s ease',
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = FALLBACK;
            }}
          />
        </div>

        {/* Image counter */}
        {images.length > 1 && (
          <div
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(8px)',
              color: '#64748b',
              padding: '3px 8px',
              borderRadius: '100px',
              fontSize: '11px',
              fontWeight: 600,
              border: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            {selected + 1} / {images.length}
          </div>
        )}

        {!zoom && (
          <div
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(8px)',
              color: '#94a3b8',
              padding: '3px 8px',
              borderRadius: '100px',
              fontSize: '10px',
              fontWeight: 500,
              border: '1px solid rgba(0,0,0,0.06)',
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
            gridTemplateColumns: `repeat(${Math.min(images.length, 6)}, 1fr)`,
            gap: '6px',
            marginTop: '8px',
          }}
        >
          {images.map((src, i) => (
            <button
              key={`${src}-${i}`}
              onClick={() => handleThumbClick(i)}
              style={{
                aspectRatio: '1/1',
                borderRadius: '6px',
                overflow: 'hidden',
                border:
                  selected === i
                    ? '2px solid #2563eb'
                    : '2px solid transparent',
                cursor: 'pointer',
                padding: 0,
                background: '#f1f5f9',
                outline: 'none',
                opacity: selected === i ? 1 : 0.7,
                transition: 'opacity 0.15s ease, border-color 0.15s ease',
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
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
