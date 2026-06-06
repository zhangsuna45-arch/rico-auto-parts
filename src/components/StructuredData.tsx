import { JsonLd } from './JsonLd';
import type { Product } from '@/data/products';
import type { BlogPost } from '@/data/blogs';

const SITE_URL = 'https://www.ricocaraccessories.com';

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function OrganizationSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Rico Car Accessories',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      'Professional automotive accessories supplier for wholesale and online markets.',
    email: 'suwenz0716@gmail.com',
    telephone: '+86-19854054842',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Yuexiu District, Guangzhou',
      addressRegion: 'Guangdong',
      addressCountry: 'CN',
    },
    sameAs: ['https://wa.me/8619854054842'],
  };
  return <JsonLd data={data} />;
}

export function ProductSchema({ product }: { product: Product }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.longDescription,
    image: product.gallery.length > 0 ? product.gallery : [product.image],
    sku: product.enterprise.oem,
    brand: {
      '@type': 'Brand',
      name: 'Rico Car Accessories',
    },
    category: product.category,
    material: product.enterprise.material,
    manufacturer: {
      '@type': 'Organization',
      name: 'Rico Car Accessories',
    },
  };
  return <JsonLd data={data} />;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
  return <JsonLd data={data} />;
}

export function BlogPostingSchema({ post }: { post: BlogPost }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    datePublished: post.date,
    publisher: {
      '@type': 'Organization',
      name: 'Rico Car Accessories',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
  };
  return <JsonLd data={data} />;
}
