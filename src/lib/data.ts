import { products as mockProducts, type Product } from '@/data/products';
import { categories as mockCategories, type Category } from '@/data/categories';
import { blogPosts as mockBlogPosts, type BlogPost } from '@/data/blogs';
import { seriesList, type ProductSeries } from '@/data/series';
import {
  isAirtableConfigured,
  fetchTable,
  fetchRecord,
  extractAttachmentUrl,
  extractAttachments,
} from './airtable';

export interface CategoryWithProducts {
  category: Category;
  products: Product[];
}

function useMock(): boolean {
  return !isAirtableConfigured();
}

// ── Airtable field shape types ──

type AirtableCategory = Record<string, unknown>;
type AirtableProduct = Record<string, unknown>;
type AirtableBlog = Record<string, unknown>;
type AirtableSeries = Record<string, unknown>;

// ── JSON decode helpers ──

function parseJson<T>(raw: unknown, fallback: T): T {
  if (typeof raw !== 'string') return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

// ── Mappers ──

function mapCategory(r: AirtableCategory): Category {
  return {
    id: String(r.id ?? ''),
    name: String(r.Name ?? ''),
    slug: String(r.Slug ?? ''),
    description: String(r.Description ?? ''),
    image: extractAttachmentUrl(r.Image),
  };
}

function mapProduct(r: AirtableProduct): Product {
  const enterprise = parseJson<Record<string, string>>(r.Enterprise, {});

  return {
    id: String(r.id ?? ''),
    name: String(r.Name ?? ''),
    slug: String(r.Slug ?? ''),
    category: String(r.Category ?? ''),
    categorySlug: String(r.CategorySlug ?? ''),
    series: String(r.Series ?? ''),
    seriesSlug: String(r.SeriesSlug ?? ''),
    description: String(r.Description ?? ''),
    longDescription: String(r.LongDescription ?? ''),
    price: String(r.Price || 'Upon Request'),
    specs: parseJson<Record<string, string>>(r.Specs, {}),
    features: parseJson<string[]>(r.Features, []),
    image: extractAttachmentUrl(r.Image),
    gallery: extractAttachments(r.Gallery),
    isFeatured: Boolean(r.IsFeatured),
    enterprise: {
      oem: enterprise.oem ?? '',
      material: enterprise.material ?? '',
      size: enterprise.size ?? '',
      moq: enterprise.moq ?? '',
      packaging: enterprise.packaging ?? '',
      certification: enterprise.certification ?? '',
    },
    variants: parseJson<Product['variants']>(r.Variants, undefined),
    variantGroups: parseJson<Product['variantGroups']>(r.VariantGroups, undefined),
  };
}

function mapBlog(r: AirtableBlog): BlogPost {
  return {
    id: String(r.id ?? ''),
    title: String(r.Title ?? ''),
    slug: String(r.Slug ?? ''),
    excerpt: String(r.Excerpt ?? ''),
    content: String(r.Content ?? ''),
    author: String(r.Author ?? ''),
    category: String(r.Category ?? ''),
    date: String(r.Date ?? ''),
    image: extractAttachmentUrl(r.Image),
    readTime: Number(r.ReadTime) || 5,
  };
}

function mapSeries(r: AirtableSeries): ProductSeries {
  return {
    id: String(r.id ?? ''),
    name: String(r.Name ?? ''),
    slug: String(r.Slug ?? ''),
    categorySlug: String(r.CategorySlug ?? ''),
    description: String(r.Description ?? ''),
    image: extractAttachmentUrl(r.Image),
  };
}

// ── Data Functions ──

export async function getCategories(): Promise<Category[]> {
  if (useMock()) return mockCategories;
  try {
    const records = await fetchTable<AirtableCategory>('Categories', {
      sort: [{ field: 'Order', direction: 'asc' }],
    });
    return records.length > 0 ? records.map(mapCategory) : mockCategories;
  } catch {
    return mockCategories;
  }
}

export async function getSeries(): Promise<ProductSeries[]> {
  if (useMock()) return seriesList;
  try {
    const records = await fetchTable<AirtableSeries>('Series', {
      sort: [{ field: 'Order', direction: 'asc' }],
    });
    return records.length > 0 ? records.map(mapSeries) : seriesList;
  } catch {
    return seriesList;
  }
}

export async function getProducts(): Promise<Product[]> {
  if (useMock()) return mockProducts;
  try {
    const records = await fetchTable<AirtableProduct>('Products', {
      sort: [
        { field: 'Order', direction: 'asc' },
        { field: 'Name', direction: 'asc' },
      ],
    });
    return records.length > 0 ? records.map(mapProduct) : mockProducts;
  } catch {
    return mockProducts;
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  if (useMock()) return mockProducts.filter((p) => p.isFeatured);
  try {
    const records = await fetchTable<AirtableProduct>('Products', {
      filterByFormula: '{IsFeatured}=1',
      sort: [{ field: 'Order', direction: 'asc' }],
    });
    return records.length > 0
      ? records.map(mapProduct)
      : mockProducts.filter((p) => p.isFeatured);
  } catch {
    return mockProducts.filter((p) => p.isFeatured);
  }
}

export async function getProductsByCategory(
  categorySlug: string,
): Promise<Product[]> {
  if (useMock())
    return mockProducts.filter((p) => p.categorySlug === categorySlug);
  try {
    const records = await fetchTable<AirtableProduct>('Products', {
      filterByFormula: `{CategorySlug}="${categorySlug}"`,
      sort: [{ field: 'Order', direction: 'asc' }],
    });
    return records.length > 0
      ? records.map(mapProduct)
      : mockProducts.filter((p) => p.categorySlug === categorySlug);
  } catch {
    return mockProducts.filter((p) => p.categorySlug === categorySlug);
  }
}

export async function getProductsBySeries(
  categorySlug: string,
  seriesSlug: string,
): Promise<Product[]> {
  if (useMock())
    return mockProducts.filter(
      (p) => p.categorySlug === categorySlug && p.seriesSlug === seriesSlug,
    );
  try {
    const all = await getProductsByCategory(categorySlug);
    return all.filter((p) => p.seriesSlug === seriesSlug);
  } catch {
    return mockProducts.filter(
      (p) => p.categorySlug === categorySlug && p.seriesSlug === seriesSlug,
    );
  }
}

export async function getProductsGroupedByCategory(): Promise<
  CategoryWithProducts[]
> {
  const [allProducts, allCategories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);
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
    return (
      mockProducts.find(
        (p) => p.slug === slug && p.categorySlug === categorySlug,
      ) ?? null
    );
  try {
    const record = await fetchRecord<AirtableProduct>(
      'Products',
      `AND({Slug}="${slug}",{CategorySlug}="${categorySlug}")`,
    );
    if (record) return mapProduct(record);
    return (
      mockProducts.find(
        (p) => p.slug === slug && p.categorySlug === categorySlug,
      ) ?? null
    );
  } catch {
    return (
      mockProducts.find(
        (p) => p.slug === slug && p.categorySlug === categorySlug,
      ) ?? null
    );
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (useMock()) return mockBlogPosts;
  try {
    const records = await fetchTable<AirtableBlog>('BlogPosts', {
      sort: [{ field: 'Date', direction: 'desc' }],
    });
    return records.length > 0 ? records.map(mapBlog) : mockBlogPosts;
  } catch {
    return mockBlogPosts;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (useMock())
    return mockBlogPosts.find((p) => p.slug === slug) ?? null;
  try {
    const record = await fetchRecord<AirtableBlog>(
      'BlogPosts',
      `{Slug}="${slug}"`,
    );
    if (record) return mapBlog(record);
    return mockBlogPosts.find((p) => p.slug === slug) ?? null;
  } catch {
    return mockBlogPosts.find((p) => p.slug === slug) ?? null;
  }
}
