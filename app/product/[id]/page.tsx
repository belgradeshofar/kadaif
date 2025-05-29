// app/product/[id]/page.tsx
import React from 'react';
import path from 'path';
import { promises as fs } from 'fs';
import ProductDetail from '../../components/ProductDetail';

interface RawProduct {
  id: string;
  name: string;
  price: number | string;
  image: string;
  description?: string;
  sizeOptions?: string[];
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const dataFile = path.join(process.cwd(), 'data', 'products.json');

  let json: string;
  try {
    json = await fs.readFile(dataFile, 'utf-8');
  } catch (e) {
    console.error('❌ Nije moguće pročitati products.json:', e);
    return <h1 className="text-center mt-20 text-xl">Greška u učitavanju podataka.</h1>;
  }

  let products: RawProduct[] = [];
  try {
    products = JSON.parse(json || '[]');
  } catch (e) {
    console.error('❌ JSON parse greška:', e);
    return <h1 className="text-center mt-20 text-xl">Neispravan format podataka.</h1>;
  }

  const product = products.find((p) => p.id === params.id);
  if (!product) {
    return (
      <h1 className="text-center mt-20 text-xl">
        Proizvod nije pronađen.
      </h1>
    );
  }

  const formatted = {
    ...product,
    price: `${Number(product.price).toFixed(0)} RSD`,
  };

  return <ProductDetail product={formatted} />;
}
