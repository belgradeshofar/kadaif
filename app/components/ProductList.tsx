'use client';

import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
}

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(p => (
        <Link href={`/product/${p.id}`} key={p.id} className="group block">
          <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden shadow hover:shadow-lg transition">
            <Image
              src={p.image}
              alt={p.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform"
            />
          </div>
          <h3 className="mt-2 text-base sm:text-lg font-medium">{p.name}</h3>
          <p className="mt-1 text-red-600 font-semibold">{p.price}</p>
        </Link>
      ))}
    </div>
  );
}
