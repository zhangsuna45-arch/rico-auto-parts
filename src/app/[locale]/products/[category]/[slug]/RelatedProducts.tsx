import { ProductCard } from '@/components/ProductCard';
import type { Product } from '@/data/products';

export function RelatedProducts({ products }: { products: Product[] }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(360px,1fr))',
        gap: '30px',
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
