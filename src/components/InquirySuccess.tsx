'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface InquirySuccessProps {
  referenceId: string;
  onClose: () => void;
}

export function InquirySuccess({ referenceId, onClose }: InquirySuccessProps) {
  const t = useTranslations('forms');

  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(15,23,42,0.5)',
        backdropFilter: 'blur(4px)',
        padding: '24px',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '24px',
          padding: '48px',
          maxWidth: '480px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 30px 80px rgba(15,23,42,0.2)',
        }}
      >
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: '#dcfce7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px auto',
            fontSize: '36px',
          }}
        >
          ✓
        </div>
        <h3
          style={{
            fontSize: '24px',
            fontWeight: 800,
            color: '#0f172a',
            margin: '0 0 8px 0',
          }}
        >
          {t('inquirySent')}
        </h3>
        <p
          style={{
            fontSize: '14px',
            color: '#64748b',
            margin: '0 0 24px 0',
            lineHeight: 1.6,
          }}
        >
          {t('thankYou')}
          <br />
          {t('reference')}: <span style={{ fontWeight: 700, color: '#0f172a' }}>{referenceId}</span>
        </p>
        <button
          onClick={onClose}
          style={{
            background: '#2563eb',
            color: '#fff',
            border: 'none',
            padding: '12px 32px',
            borderRadius: '12px',
            fontWeight: 700,
            fontSize: '15px',
            cursor: 'pointer',
          }}
        >
          {t('close')}
        </button>
      </div>
    </div>
  );
}
