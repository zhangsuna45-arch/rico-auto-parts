'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { ProductInquiryForm } from './ProductInquiryForm';

interface StickyInquiryProps {
  productName: string;
  productUrl?: string;
  sku?: string;
  category?: string;
}

export function StickyInquiry({
  productName,
  productUrl,
  sku,
  category,
}: StickyInquiryProps) {
  const [visible, setVisible] = useState(false);
  const t = useTranslations('productDetail');

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <aside
        style={{
          position: 'fixed',
          top: '140px',
          right: visible ? '24px' : '-420px',
          width: '380px',
          maxHeight: 'calc(100vh - 180px)',
          overflowY: 'auto',
          background: '#fff',
          borderRadius: '20px',
          padding: '32px',
          boxShadow: '0 25px 80px rgba(0,0,0,0.12)',
          border: '1px solid #e2e8f0',
          zIndex: 50,
          transition: 'right 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'none',
        }}
        id="sticky-inquiry"
      >
        <h4
          style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#0f172a',
            letterSpacing: '1px',
            marginBottom: '8px',
            margin: '0 0 8px 0',
          }}
        >
          {t('quickInquiry')}
        </h4>
        <p
          style={{
            fontSize: '13px',
            color: '#94a3b8',
            marginBottom: '24px',
            margin: '0 0 24px 0',
          }}
        >
          {t('inquirySubtitle')}
        </p>
        <ProductInquiryForm
          productName={productName}
          productUrl={productUrl}
          sku={sku}
          category={category}
        />

        <style
          dangerouslySetInnerHTML={{
            __html: `
              @media (min-width: 1280px) {
                #sticky-inquiry {
                  display: block !important;
                }
              }
            `,
          }}
        />
      </aside>
    </>
  );
}
