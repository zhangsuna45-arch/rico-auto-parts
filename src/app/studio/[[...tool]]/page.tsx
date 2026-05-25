import { isSanityConfigured } from '@/sanity/env';
import { StudioPageClient } from './StudioPageClient';

export const dynamic = 'force-static';

export { metadata, viewport } from 'next-sanity/studio';

function SetupInstructions() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontFamily: 'system-ui, sans-serif',
        background: '#f7f9fc',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          maxWidth: '500px',
          padding: '40px',
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 10px 40px rgba(15,23,42,0.08)',
        }}
      >
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>
          Sanity Studio Not Configured
        </h1>
        <p style={{ color: '#64748b', lineHeight: 1.6, marginBottom: '16px' }}>
          Set the following environment variables to enable the CMS:
        </p>
        <code
          style={{
            display: 'block',
            background: '#f1f5f9',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '13px',
            textAlign: 'left',
            lineHeight: 1.8,
          }}
        >
          NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
          <br />
          NEXT_PUBLIC_SANITY_DATASET=production
          <br />
          SANITY_API_TOKEN=your-api-token
        </code>
      </div>
    </div>
  );
}

export default function StudioPage() {
  if (!isSanityConfigured()) {
    return <SetupInstructions />;
  }
  return <StudioPageClient />;
}
