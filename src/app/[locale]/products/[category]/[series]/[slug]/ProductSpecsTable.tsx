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

const SPEC_KEYS: { key: keyof SupplyInfo; labelKey: string; icon: string }[] = [
  { key: 'oem', labelKey: 'sku', icon: '#' },
  { key: 'material', labelKey: 'material', icon: 'M' },
  { key: 'size', labelKey: 'dimensions', icon: 'D' },
  { key: 'moq', labelKey: 'moq', icon: 'Q' },
  { key: 'packaging', labelKey: 'packaging', icon: 'P' },
  { key: 'certification', labelKey: 'certification', icon: 'C' },
];

export function ProductSpecsTable({ enterprise }: { enterprise: SupplyInfo }) {
  const t = useTranslations('productDetail');

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '24px',
        border: '1px solid rgba(15,23,42,0.06)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          padding: '24px 32px',
        }}
      >
        <h3
          style={{
            color: '#fff',
            fontSize: '18px',
            fontWeight: 800,
            letterSpacing: '2px',
            margin: 0,
          }}
        >
          {t('supplyInformation')}
        </h3>
      </div>

      <div>
        {SPEC_KEYS.map(({ key, labelKey, icon }, i) => (
          <div
            key={key}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '20px 32px',
              borderBottom:
                i < SPEC_KEYS.length - 1
                  ? '1px solid rgba(15,23,42,0.05)'
                  : 'none',
              background: i % 2 === 0 ? '#fff' : '#f8fafc',
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: '#eff6ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                fontWeight: 900,
                color: '#2563eb',
                flexShrink: 0,
                marginRight: '20px',
              }}
            >
              {icon}
            </div>

            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#94a3b8',
                  letterSpacing: '1.5px',
                  marginBottom: '4px',
                  margin: '0 0 4px 0',
                }}
              >
                {t(labelKey as 'sku')}
              </p>
              <p
                style={{
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#0f172a',
                  margin: 0,
                }}
              >
                {enterprise[key]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
