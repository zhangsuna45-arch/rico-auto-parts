import { NextResponse } from 'next/server';
import { isAirtableConfigured } from '@/lib/airtable';
import { getProducts } from '@/lib/data';
import { getCategories } from '@/lib/data';

export async function GET() {
  try {
    const [products, categories] = await Promise.all([
      getProducts(),
      getCategories(),
    ]);

    const categoryMap = new Map(
      categories.map((c) => [c.slug, c.name]),
    );

    const withImages = products
      .filter((p) => p.image && p.image.length > 0)
      .map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        categorySlug: p.categorySlug,
        seriesSlug: p.seriesSlug,
        image: p.image,
        categoryName: categoryMap.get(p.categorySlug) || p.category,
      }));

    return NextResponse.json({ products: withImages });
  } catch {
    return NextResponse.json({ products: [] }, { status: 500 });
  }
}
