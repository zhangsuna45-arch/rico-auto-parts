import { getBlogPostBySlug, getBlogPosts } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { BlogPostingSchema, BreadcrumbSchema } from '@/components/StructuredData';
import { routing } from '@/i18n/routing';
import { renderMarkdown } from '@/lib/markdown';
import type { Metadata } from 'next';

interface BlogDetailProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  const params: { slug: string; locale: string }[] = [];
  for (const locale of routing.locales) {
    for (const p of posts) {
      params.push({ locale, slug: p.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: BlogDetailProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [
      post.category,
      'car accessories blog',
      'automotive accessories',
      'wholesale car accessories',
    ],
    alternates: {
      canonical: `https://www.ricocaraccessories.com/${locale}/blog/${post.slug}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `https://www.ricocaraccessories.com/${l}/blog/${post.slug}`]),
      ),
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogDetail({ params }: BlogDetailProps) {
  const { slug, locale } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div style={{ background: '#f7f9fc', minHeight: '100vh' }}>
      <BlogPostingSchema post={post} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `/${locale}` },
          { name: 'Blog', url: `/${locale}/blog` },
          { name: post.title, url: `/${locale}/blog/${post.slug}` },
        ]}
      />

      {/* Breadcrumb */}
      <div
        style={{
          background: '#fff',
          borderBottom: '1px solid rgba(15,23,42,0.06)',
          padding: '12px 40px',
          fontSize: '14px',
          color: '#64748b',
        }}
      >
        <Link href="/" style={{ color: '#2563eb', textDecoration: 'none' }}>
          Home
        </Link>
        <span> / </span>
        <Link href="/blog" style={{ color: '#2563eb', textDecoration: 'none' }}>
          Blog
        </Link>
      </div>

      {/* Article Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
          color: '#fff',
          padding: '48px 40px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginBottom: '20px',
            fontSize: '13px',
            opacity: 0.85,
          }}
        >
          <span>{post.category}</span>
          <span>|</span>
          <span>{post.readTime} min read</span>
          <span>|</span>
          <span>
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
        <h1
          style={{
            fontSize: '36px',
            fontWeight: 900,
            lineHeight: 1.25,
            margin: '0 0 12px 0',
            maxWidth: '800px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          {post.title}
        </h1>
        <p style={{ fontSize: '15px', opacity: 0.85, margin: 0 }}>
          By {post.author}
        </p>
      </div>

      {/* Article Content */}
      <section
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '72px 24px',
        }}
      >
        <div
          style={{
            background: '#fff',
            borderRadius: '24px',
            padding: '48px 40px',
            border: '1px solid rgba(15,23,42,0.06)',
            boxShadow: '0 10px 40px rgba(15,23,42,0.06)',
          }}
        >
          <div
            style={{
              fontSize: '16px',
              color: '#334155',
              lineHeight: 1.8,
            }}
          >
            {renderMarkdown(post.content)}
          </div>
        </div>

        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <Link
            href="/blog"
            style={{
              color: '#2563eb',
              fontWeight: 600,
              textDecoration: 'none',
              fontSize: '16px',
            }}
          >
            ← Back to Blog
          </Link>
        </div>
      </section>
    </div>
  );
}
