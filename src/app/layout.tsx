import { Geist, Geist_Mono } from 'next/font/google';
import { getLocale } from 'next-intl/server';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      style={{ margin: 0, padding: 0 }}
    >
      <body
        style={{
          margin: 0,
          padding: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
        <GoogleAnalytics gaId="G-JFTRXY6Q21" />
      </body>
    </html>
  );
}
