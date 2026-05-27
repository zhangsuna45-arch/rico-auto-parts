'use client';

import { useTranslations } from 'next-intl';

const FEATURE_ICONS = [
  { icon: '◈', color: '#2563eb' },
  { icon: '◆', color: '#3b82f6' },
  { icon: '◇', color: '#60a5fa' },
  { icon: '▣', color: '#2563eb' },
  { icon: '▷', color: '#3b82f6' },
  { icon: '○', color: '#60a5fa' },
  { icon: '□', color: '#2563eb' },
  { icon: '△', color: '#3b82f6' },
];

export function ProductFeatures({ features }: { features: string[] }) {
  const t = useTranslations('productDetail');

  return (
    <div>
      <h3
        style={{
          fontSize: '13px',
          fontWeight: 800,
          letterSpacing: '3px',
          color: '#2563eb',
          marginBottom: '24px',
          margin: '0 0 24px 0',
        }}
      >
        {t('keyFeatures')}
      </h3>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))',
          gap: '12px',
        }}
      >
        {features.map((feature, i) => {
          const iconData = FEATURE_ICONS[i % FEATURE_ICONS.length];
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                padding: '20px 24px',
                background: '#f8fafc',
                borderRadius: '16px',
                border: '1px solid rgba(15,23,42,0.04)',
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: '#eff6ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  color: iconData.color,
                }}
              >
                {iconData.icon}
              </div>
              <div>
                <p
                  style={{
                    fontSize: '15px',
                    fontWeight: 700,
                    color: '#0f172a',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {feature}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
