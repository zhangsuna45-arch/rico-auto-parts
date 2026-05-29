import { ProductCard } from '@/components/ProductCard';
import type { Product } from '@/data/products';

export function RelatedProducts({ products }: { products: Product[] }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
