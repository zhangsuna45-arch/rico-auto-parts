'use client';

import { useState, useEffect } from 'react';

const CATALOGUE_LINKS = [
  { label: 'External Resource 1', href: 'https://t.doruo.cn/2n0jc2JmE' },
  { label: 'External Resource 2', href: 'https://t.doruo.cn/2n0juuEOQ' },
  { label: 'External Resource 3', href: 'https://t.doruo.cn/2n0jI7p3W' },
  { label: 'External Resource 4', href: 'https://t.doruo.cn/2n0jSkXKg' },
];

export function CatalogueButton() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '14px 28px',
          background: '#0f172a',
          color: '#fff',
          border: 'none',
          borderRadius: '12px',
          fontWeight: 600,
          fontSize: '14px',
          cursor: 'pointer',
          letterSpacing: '-0.01em',
          transition: 'background 0.2s, transform 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#1e293b';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#0f172a';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2Z" />
        </svg>
        View Catalogue
      </button>

      {open && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '24px',
              maxWidth: '480px',
              width: '100%',
              padding: '40px 36px',
              boxShadow: '0 25px 80px rgba(0,0,0,0.15)',
              position: 'relative',
              animation: 'modal-in 0.3s ease-out',
            }}
          >
            <button
              onClick={() => setOpen(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: 'none',
                background: '#f1f5f9',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#64748b',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#e2e8f0';
                e.currentTarget.style.color = '#0f172a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f1f5f9';
                e.currentTarget.style.color = '#64748b';
              }}
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            <h2
              style={{
                fontSize: 'clamp(24px, 3vw, 32px)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: '#0f172a',
                margin: '0 0 8px 0',
              }}
            >
              Catalogue Website
            </h2>

            <p
              style={{
                fontSize: '14px',
                color: '#94a3b8',
                margin: '0 0 28px 0',
                lineHeight: 1.6,
              }}
            >
              Browse our complete product catalogues online.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {CATALOGUE_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '15px 18px',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    color: '#0f172a',
                    fontWeight: 600,
                    fontSize: '14px',
                    letterSpacing: '-0.01em',
                    transition: 'border-color 0.2s, background 0.2s, transform 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#0f172a';
                    e.currentTarget.style.background = '#fff';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.background = '#f8fafc';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <style
            dangerouslySetInnerHTML={{
              __html: `
                @keyframes modal-in {
                  from { opacity: 0; transform: translateY(16px) scale(0.97); }
                  to { opacity: 1; transform: translateY(0) scale(1); }
                }
              `,
            }}
          />
        </div>
      )}
    </>
  );
}
