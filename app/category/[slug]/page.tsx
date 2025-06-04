
// app/category/[slug]/page.tsx
import path from 'path';
import { promises as fs } from 'fs';
import ProductList from '../../components/ProductList';

interface RawProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default async function CategoryPage({
  params
}: {
  params: { slug: string }
}) {
  const { slug } = await params;
  const file = path.join(process.cwd(), 'data', 'products.json');
  const raw = await fs.readFile(file, 'utf-8').catch(() => '[]');
  const products: RawProduct[] = JSON.parse(raw);

  const filtered = products.filter(
    p => p.category.toLowerCase() === slug.toLowerCase()
  );

  const formatted = filtered.map(p => ({
    ...p,
    price: `${p.price.toFixed(0)} RSD`,
    slug: p.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-]/g, '')
  }));

  return (
    <main className="px-6 py-12 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold capitalize mb-8">
        {slug.replace('-', ' ')}
      </h1>
      {formatted.length > 0 ? (
        <ProductList products={formatted} />
      ) : (
        <p className="text-gray-600">Nema proizvoda u ovoj kategoriji.</p>
      )}
    </main>
  );
}
