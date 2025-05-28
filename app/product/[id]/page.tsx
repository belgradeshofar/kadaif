// app/product/[id]/page.tsx
import React from 'react';
import path from 'path';
import { promises as fs } from 'fs';
import ProductDetail from '../../components/ProductDetail';

interface RawProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  sizeOptions?: string[];
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const dataFile = path.join(process.cwd(), 'data', 'products.json');
  const json = await fs.readFile(dataFile, 'utf-8');
  const products: RawProduct[] = JSON.parse(json || '[]');

  const product = products.find((p) => p.id === params.id);
  if (!product) {
    return (
      <h1 className="text-center mt-20 text-xl">
        Proizvod nije pronađen.
      </h1>
    );
  }

  // formatiraj cenu u RSD
  const formatted = {
    ...product,
    price: `${product.price.toFixed(0)} RSD`,
  };

  return <ProductDetail product={formatted} />;
}
