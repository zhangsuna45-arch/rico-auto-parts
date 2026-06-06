'use client';

export function ProductFeatures({ features }: { features: string[] }) {
  const items = features.slice(0, 4);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {items.map((feature, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <div
            style={{
              flexShrink: 0,
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: i === 0 ? '#2563eb' : '#cbd5e1',
            }}
          />
          <span
            style={{
              fontSize: '15px',
              fontWeight: 500,
              color: '#475569',
              lineHeight: 1.6,
            }}
          >
            {feature}
          </span>
        </div>
      ))}
    </div>
  );
}
