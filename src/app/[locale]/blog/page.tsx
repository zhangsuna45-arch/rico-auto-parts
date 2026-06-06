import { getBlogPosts } from '@/lib/data';
import { BlogCard } from '@/components/BlogCard';
import { BreadcrumbSchema } from '@/components/StructuredData';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

interface BlogListProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: BlogListProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: 'Blog | Rico Car Accessories',
    description:
      'Car accessories trends, product recommendations, and wholesale buying guides.',
    keywords: [
      'car accessories blog',
      'automotive accessories trends',
      'wholesale buying guides',
      'car electronics tips',
    ],
    alternates: {
      canonical: `https://www.ricocaraccessories.com/${locale}/blog`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `https://www.ricocaraccessories.com/${l}/blog`]),
      ),
    },
    openGraph: {
      title: 'Blog | Rico Car Accessories',
      description: 'Car accessories trends, product recommendations, and wholesale buying guides.',
      type: 'website',
    },
  };
}

export default async function BlogList({ params }: BlogListProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  const blogPosts = await getBlogPosts();

  return (
    <div style={{ background: '#f7f9fc', minHeight: '100vh' }}>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `/${locale}` },
          { name: 'Blog', url: `/${locale}/blog` },
        ]}
      />

      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
          color: '#fff',
          padding: '80px 60px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            color: 'rgba(255,255,255,0.9)',
            fontWeight: 700,
            letterSpacing: '4px',
            marginBottom: '20px',
            margin: '0 0 20px 0',
          }}
        >
          {t('industryInsights')}
        </p>
        <h1
          style={{
            fontSize: '64px',
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: '20px',
            margin: '0 0 20px 0',
          }}
        >
          {t('blogAndNews')}
        </h1>
        <p style={{ fontSize: '18px', opacity: 0.9, margin: 0 }}>
          {t('blogDescription')}
        </p>
      </div>

      {/* Blog Posts */}
      <section
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '72px 24px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '32px',
          }}
        >
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {blogPosts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: '18px', color: '#64748b' }}>
              {t('noPosts')}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
