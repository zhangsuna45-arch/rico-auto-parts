import type { Metadata } from 'next';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppCTA } from '@/components/WhatsAppCTA';
import { routing } from '@/i18n/routing';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    metadataBase: new URL('https://www.ricocaraccessories.com'),
    title: {
      default: 'Rico Auto Parts - Premium OEM Automotive Components',
      template: '%s | Rico Auto Parts',
    },
    description:
      'Leading OEM automotive component supplier for global markets. Precision-engineered engine parts, transmission systems, suspension & braking, and electrical components since 1998.',
    keywords: [
      'OEM auto parts',
      'automotive components',
      'engine parts',
      'transmission systems',
      'suspension parts',
      'brake components',
      'auto parts manufacturer',
      'Rico Auto Parts',
    ],
    authors: [{ name: 'Rico Auto Parts' }],
    creator: 'Rico Auto Parts',
    publisher: 'Rico Auto Parts',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'ar' ? 'ar_SA' : `${locale}_${locale.toUpperCase()}`,
      url: 'https://www.ricocaraccessories.com',
      siteName: 'Rico Auto Parts',
      title: 'Rico Auto Parts - Premium OEM Automotive Components',
      description:
        'Leading OEM automotive component supplier for global markets. Precision-engineered parts since 1998.',
      images: [
        {
          url: '/placeholder-2.svg',
          width: 1200,
          height: 630,
          alt: 'Rico Auto Parts Manufacturing',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Rico Auto Parts - Premium OEM Automotive Components',
      description: 'Leading OEM automotive component supplier for global markets.',
      images: ['/placeholder-2.svg'],
    },
    alternates: {
      canonical: 'https://www.ricocaraccessories.com',
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `https://www.ricocaraccessories.com/${l}`]),
      ),
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
      <WhatsAppCTA />
    </NextIntlClientProvider>
  );
}
