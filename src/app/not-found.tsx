import { Metadata } from 'next';
import { Link } from '@/i18n/navigation';

export const metadata: Metadata = {
  title: 'Page Not Found | Rico Auto Parts',
  description: 'The page you are looking for does not exist.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div
      style={{
        background: '#f7f9fc',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '60px',
      }}
    >
      <div>
        <p
          style={{
            color: '#2563eb',
            fontWeight: 700,
            letterSpacing: '4px',
            margin: '0 0 20px 0',
          }}
        >
          404 ERROR
        </p>
        <h1
          style={{
            fontSize: '72px',
            fontWeight: 900,
            color: '#0f172a',
            margin: '0 0 20px 0',
          }}
        >
          Page Not Found
        </h1>
        <p
          style={{
            fontSize: '18px',
            color: '#64748b',
            margin: '0 0 40px 0',
          }}
        >
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            background: '#2563eb',
            color: '#fff',
            padding: '16px 40px',
            borderRadius: '12px',
            fontWeight: 800,
            fontSize: '16px',
            textDecoration: 'none',
          }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
