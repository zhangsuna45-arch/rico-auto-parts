'use client';

import type { VariantGroup, ProductVariant } from '@/data/products';

interface Props {
  groups: VariantGroup[];
  variants: ProductVariant[];
  activeVariantIndex: number;
  onSelect: (index: number) => void;
}

export function ProductVariantSelector({
  groups,
  variants,
  activeVariantIndex,
  onSelect,
}: Props) {
  const activeVariant = variants[activeVariantIndex];

  function handleSelect(groupKey: string, value: string) {
    // Build desired attributes from current variant + clicked change
    const desired: Record<string, string | undefined> = {};
    for (const g of groups) {
      desired[g.key] = activeVariant?.[g.key as keyof ProductVariant] as string | undefined;
    }
    desired[groupKey] = value;

    // Try exact match first
    const exact = variants.findIndex((v) =>
      groups.every((g) => {
        const d = desired[g.key];
        if (!d) return true; // no constraint
        return (v as unknown as Record<string, string | undefined>)[g.key] === d;
      }),
    );
    if (exact >= 0) {
      onSelect(exact);
      return;
    }

    // Fallback: match only the clicked group
    const partial = variants.findIndex(
      (v) => (v as unknown as Record<string, string | undefined>)[groupKey] === value,
    );
    if (partial >= 0) {
      onSelect(partial);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {groups.map((group) => {
        const activeValue = activeVariant?.[group.key as keyof ProductVariant] as string | undefined;
        return (
          <div key={group.key}>
            <p
              style={{
                fontSize: '13px',
                fontWeight: 800,
                color: '#0f172a',
                letterSpacing: '1px',
                margin: '0 0 10px 0',
              }}
            >
              {group.name}:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {group.values.map((value) => {
                const isSelected = activeValue === value;
                return (
                  <button
                    key={value}
                    onClick={() => handleSelect(group.key, value)}
                    style={{
                      padding: '10px 20px',
                      borderRadius: '10px',
                      border: isSelected ? '2px solid #2563eb' : '2px solid rgba(15,23,42,0.10)',
                      background: isSelected ? 'rgba(37,99,235,0.06)' : '#fff',
                      color: isSelected ? '#2563eb' : '#64748b',
                      fontWeight: isSelected ? 700 : 500,
                      fontSize: '14px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      outline: 'none',
                      fontFamily: 'inherit',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(37,99,235,0.25)';
                        (e.currentTarget as HTMLElement).style.color = '#334155';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(15,23,42,0.10)';
                        (e.currentTarget as HTMLElement).style.color = '#64748b';
                      }
                    }}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
