'use client';

import { memo } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import type { BlogPost } from '@/data/blogs';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard = memo(function BlogCard({ post }: BlogCardProps) {
  const t = useTranslations('blog');

  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <article
        style={{
          background: '#fff',
          borderRadius: '32px',
          overflow: 'hidden',
          border: '1px solid rgba(15,23,42,0.06)',
          boxShadow: '0 10px 30px rgba(15,23,42,0.04)',
          cursor: 'pointer',
          transition: 'transform 0.3s ease',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-8px)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        }}
      >
        <div
          style={{
            height: '240px',
            background: '#e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <div style={{ fontSize: '48px', opacity: 0.5 }}>📰</div>
        </div>

        <div
          style={{
            padding: '30px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
            }}
          >
            <span
              style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '2px',
                color: '#2563eb',
              }}
            >
              {post.category}
            </span>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>
              {post.readTime} {t('minRead')}
            </span>
          </div>

          <h3
            style={{
              fontSize: '24px',
              fontWeight: 900,
              color: '#0f172a',
              marginBottom: '12px',
              lineHeight: 1.3,
            }}
          >
            {post.title}
          </h3>

          <p
            style={{
              fontSize: '15px',
              color: '#64748b',
              lineHeight: 1.7,
              flex: 1,
              marginBottom: '20px',
            }}
          >
            {post.excerpt}
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid rgba(15,23,42,0.06)',
              paddingTop: '20px',
            }}
          >
            <div>
              <p style={{ fontSize: '13px', color: '#0f172a', fontWeight: 600 }}>
                {post.author}
              </p>
              <p style={{ fontSize: '12px', color: '#94a3b8' }}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <div style={{ color: '#2563eb', fontWeight: 700, fontSize: '14px' }}>
              Read →
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
});
