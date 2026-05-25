'use client';

import { Link } from '@/i18n/navigation';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: '#0f172a',
        color: '#94a3b8',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '56px 24px 32px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'start',
        }}
      >
        {/* Left: Logo + Description + Copyright */}
        <div style={{ maxWidth: '360px' }}>
          <h3
            style={{
              fontSize: '22px',
              fontWeight: 900,
              color: '#fff',
              margin: '0 0 2px 0',
              lineHeight: 1.1,
            }}
          >
            RICO
          </h3>
          <p
            style={{
              fontSize: '10px',
              fontWeight: 600,
              color: '#64748b',
              letterSpacing: '5px',
              margin: '0 0 16px 0',
            }}
          >
            CAR ACCESSORIES
          </p>
          <p style={{ fontSize: '13px', lineHeight: 1.7, color: '#94a3b8', margin: '0 0 32px 0' }}>
            Professional automotive accessories supplier for wholesale and online markets.
          </p>
          <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
            &copy; {currentYear} RICO Car Accessories
          </p>
        </div>

        {/* Right: Contact */}
        <div style={{ fontSize: '13px', lineHeight: 2.4, color: '#94a3b8' }}>
          <p style={{ fontSize: '13px', fontWeight: 700, color: '#fff', margin: '0 0 8px 0' }}>
            Contact
          </p>
          <p style={{ margin: 0 }}>
            <span style={{ color: '#64748b' }}>T </span>
            <a href="tel:+8619854054842" style={{ color: '#94a3b8', textDecoration: 'none' }}>
              +86 19854054842
            </a>
          </p>
          <p style={{ margin: 0 }}>
            <span style={{ color: '#64748b' }}>E </span>
            <a href="mailto:suwenz0716@gmail.com" style={{ color: '#94a3b8', textDecoration: 'none' }}>
              suwenz0716@gmail.com
            </a>
          </p>
          <p style={{ margin: 0 }}>
            <span style={{ color: '#64748b' }}>A </span>
            Guangzhou, China
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px 32px',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          fontSize: '12px',
          color: '#64748b',
        }}
      >
        <a href="#" style={{ color: '#64748b', textDecoration: 'none' }}>Privacy Policy</a>
        <span style={{ margin: '0 12px', color: '#334155' }}>|</span>
        <a href="#" style={{ color: '#64748b', textDecoration: 'none' }}>Terms</a>
      </div>
    </footer>
  );
}
