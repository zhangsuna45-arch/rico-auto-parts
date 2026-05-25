import { sanityClient } from '../client';
import { isSanityConfigured } from '../env';
import { products as mockProducts, type Product } from '@/data/products';
import { categories as mockCategories, type Category } from '@/data/categories';
import { blogPosts as mockBlogPosts, type BlogPost } from '@/data/blogs';

export interface CategoryWithProducts {
  category: Category;
  products: Product[];
}
import {
  categoriesQuery,
  productsQuery,
  productsByCategoryQuery,
  productBySlugQuery,
  blogPostsQuery,
  blogPostBySlugQuery,
  featuredProductsQuery,
} from './queries';

function useMock(): boolean {
  if (process.env.NODE_ENV === 'development') return true;
  return !isSanityConfigured() || !sanityClient;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchSanity<T>(query: string, params?: Record<string, any>): Promise<T> {
  if (!sanityClient) throw new Error('Sanity client not available');
  return sanityClient.fetch<T>(query, params || {});
}

export async function getCategories(): Promise<Category[]> {
  if (useMock()) return mockCategories;
  try {
    const result = await fetchSanity<SanityCategory[]>(categoriesQuery);
    return result.map(mapCategory);
  } catch {
    return mockCategories;
  }
}

export async function getProducts(): Promise<Product[]> {
  if (useMock()) return mockProducts;
  try {
    const result = await fetchSanity<SanityProduct[]>(productsQuery);
    return result.length > 0 ? result.map(mapProduct) : mockProducts;
  } catch {
    return mockProducts;
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  if (useMock()) return mockProducts.slice(0, 6);
  try {
    const result = await fetchSanity<SanityProduct[]>(featuredProductsQuery);
    return result.length > 0 ? result.map(mapProduct) : mockProducts.slice(0, 6);
  } catch {
    return mockProducts.slice(0, 6);
  }
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  if (useMock()) return mockProducts.filter((p) => p.categorySlug === categorySlug);
  try {
    const result = await fetchSanity<SanityProduct[]>(productsByCategoryQuery, {
      categorySlug,
    });
    return result.length > 0
      ? result.map(mapProduct)
      : mockProducts.filter((p) => p.categorySlug === categorySlug);
  } catch {
    return mockProducts.filter((p) => p.categorySlug === categorySlug);
  }
}

export async function getProductsGroupedByCategory(): Promise<CategoryWithProducts[]> {
  const allProducts = await getProducts();
  const allCategories = await getCategories();
  return allCategories.map((cat) => ({
    category: cat,
    products: allProducts.filter((p) => p.categorySlug === cat.slug),
  }));
}

export async function getProductBySlug(
  slug: string,
  categorySlug: string,
): Promise<Product | null> {
  if (useMock())
    return mockProducts.find((p) => p.slug === slug && p.categorySlug === categorySlug) ?? null;
  try {
    const result = await fetchSanity<SanityProduct | null>(productBySlugQuery, {
      slug,
      categorySlug,
    });
    if (result) return mapProduct(result);
    return mockProducts.find((p) => p.slug === slug && p.categorySlug === categorySlug) ?? null;
  } catch {
    return mockProducts.find((p) => p.slug === slug && p.categorySlug === categorySlug) ?? null;
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (useMock()) return mockBlogPosts;
  try {
    const result = await fetchSanity<SanityBlogPost[]>(blogPostsQuery);
    return result.length > 0 ? result.map(mapBlogPost) : mockBlogPosts;
  } catch {
    return mockBlogPosts;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (useMock()) return mockBlogPosts.find((p) => p.slug === slug) ?? null;
  try {
    const result = await fetchSanity<SanityBlogPost | null>(blogPostBySlugQuery, { slug });
    if (result) return mapBlogPost(result);
    return mockBlogPosts.find((p) => p.slug === slug) ?? null;
  } catch {
    return mockBlogPosts.find((p) => p.slug === slug) ?? null;
  }
}

interface SanityCategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

interface SanityProduct {
  _id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  description: string;
  longDescription?: string;
  price?: string;
  specs?: { _key?: string; key: string; value: string }[];
  features?: string[];
  image: string;
  gallery?: string[];
  isFeatured?: boolean;
  supplyInfo?: {
    sku?: string;
    material?: string;
    size?: string;
    moq?: string;
    packaging?: string;
    certification?: string;
  };
}

interface SanityBlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  date: string;
  image?: string;
  readTime?: number;
}

function mapCategory(c: SanityCategory): Category {
  return {
    id: c._id,
    name: c.name,
    slug: c.slug,
    description: c.description,
    image: c.image || '',
  };
}

function mapProduct(p: SanityProduct): Product {
  return {
    id: p._id,
    name: p.name,
    slug: p.slug,
    category: p.category,
    categorySlug: p.categorySlug,
    description: p.description,
    longDescription: p.longDescription || '',
    price: p.price || 'Upon Request',
    specs: Array.isArray(p.specs)
      ? Object.fromEntries(p.specs.map((s) => [s.key, s.value]))
      : {},
    features: p.features || [],
    image: p.image || '',
    gallery: p.gallery || [],
    isFeatured: p.isFeatured || false,
    enterprise: {
      oem: p.supplyInfo?.sku || '',
      material: p.supplyInfo?.material || '',
      size: p.supplyInfo?.size || '',
      moq: p.supplyInfo?.moq || '',
      packaging: p.supplyInfo?.packaging || '',
      certification: p.supplyInfo?.certification || '',
    },
  };
}

function mapBlogPost(p: SanityBlogPost): BlogPost {
  return {
    id: p._id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    content: p.content,
    author: p.author,
    category: p.category,
    date: p.date,
    image: p.image || '',
    readTime: p.readTime || 5,
  };
}
