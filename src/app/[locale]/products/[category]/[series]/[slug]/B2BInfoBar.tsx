'use client';

import { useTranslations } from 'next-intl';

interface SupplyInfo {
  oem: string;
  material: string;
  size: string;
  moq: string;
  packaging: string;
  certification: string;
}

const INFO_ITEMS: { key: keyof SupplyInfo; labelKey: string }[] = [
  { key: 'moq', labelKey: 'moq' },
  { key: 'oem', labelKey: 'sku' },
  { key: 'material', labelKey: 'material' },
  { key: 'packaging', labelKey: 'packaging' },
];

export function B2BInfoBar({ enterprise }: { enterprise: SupplyInfo }) {
  const t = useTranslations('productDetail');

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1px',
        background: '#e2e8f0',
        borderRadius: '14px',
        overflow: 'hidden',
        marginTop: '24px',
      }}
    >
      {INFO_ITEMS.map(({ key, labelKey }) => (
        <div
          key={key}
          style={{
            background: '#f8fafc',
            padding: '16px 20px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: '10px',
              fontWeight: 600,
              color: '#94a3b8',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              margin: '0 0 4px 0',
            }}
          >
            {t(labelKey as 'sku')}
          </p>
          <p
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#0f172a',
              margin: 0,
            }}
          >
            {enterprise[key] || '—'}
          </p>
        </div>
      ))}
    </div>
  );
}
