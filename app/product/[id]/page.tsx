// app/product/[id]/page.tsx

import React from 'react';
import productsData from '../../../data/products.json';
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
  // productsData je niz objekata iz data/products.json
  const products: RawProduct[] = Array.isArray(productsData) ? productsData : [];

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
