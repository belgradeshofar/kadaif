// app/category/[slug]/page.tsx

import React from 'react';
import productsData from '../../../data/products.json';
import ProductList from '../../components/ProductList';

interface RawProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  // productsData je niz objekata iz data/products.json
  const products: RawProduct[] = Array.isArray(productsData) ? productsData : [];

  const filtered = products.filter(
    (p) => p.category.toLowerCase() === params.slug.toLowerCase()
  );

  const formatted = filtered.map((p) => ({
    ...p,
    price: `${p.price.toFixed(0)} RSD`,
    slug: p.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-]/g, ''),
  }));

  return (
    <main className="px-6 py-12 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold capitalize mb-8">
        {params.slug.replace('-', ' ')}
      </h1>
      {formatted.length > 0 ? (
        <ProductList products={formatted} />
      ) : (
        <p className="text-gray-600">Nema proizvoda u ovoj kategoriji.</p>
      )}
    </main>
  );
}
