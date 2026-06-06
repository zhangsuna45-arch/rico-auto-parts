'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const LANG_DATA: Record<string, { flag: string; name: string }> = {
  en: { flag: '🇬🇧', name: 'English' },
  es: { flag: '🇪🇸', name: 'Español' },
  fr: { flag: '🇫🇷', name: 'Français' },
  de: { flag: '🇩🇪', name: 'Deutsch' },
  ar: { flag: '🇸🇦', name: 'العربية' },
  ru: { flag: '🇷🇺', name: 'Русский' },
};

export function LangSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchTo = (nextLocale: string) => {
    setOpen(false);
    router.replace(pathname, { locale: nextLocale });
  };

  const current = LANG_DATA[locale] || LANG_DATA.en;

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Switch language"
        style={{
          background: 'transparent',
          border: '1px solid rgba(15,23,42,0.12)',
          borderRadius: '8px',
          padding: '8px 14px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 600,
          color: '#0f172a',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontFamily: 'inherit',
        }}
      >
        <span>{current.flag}</span>
        <span>{current.name.split(' ')[0]}</span>
        <span style={{ fontSize: '10px', marginLeft: '2px' }}>▾</span>
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '8px',
            background: '#fff',
            borderRadius: '12px',
            boxShadow: '0 10px 40px rgba(15,23,42,0.12)',
            border: '1px solid rgba(15,23,42,0.08)',
            minWidth: '180px',
            zIndex: 200,
            overflow: 'hidden',
          }}
        >
          {routing.locales.map((l) => {
            const lang = LANG_DATA[l];
            return (
              <button
                key={l}
                onClick={() => switchTo(l)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '12px 16px',
                  border: 'none',
                  background: l === locale ? '#eff6ff' : 'transparent',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: l === locale ? 700 : 500,
                  color: l === locale ? '#2563eb' : '#0f172a',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontFamily: 'inherit',
                  borderBottom: '1px solid rgba(15,23,42,0.04)',
                }}
              >
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
                {l === locale && (
                  <span style={{ marginLeft: 'auto', color: '#2563eb' }}>✓</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
