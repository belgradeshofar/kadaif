// app/components/CategoriesGrid.tsx

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES } from '../constants/categories';

export default function CategoriesGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {CATEGORIES.map(cat => (
        <Link
          href={`/category/${cat.slug}`}
          key={cat.slug}
          className="group block overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition"
        >
          <div className="relative w-full aspect-square group-hover:scale-105 transition-transform">
            <Image
              src={cat.image}
              alt={cat.slug}
              fill
              className="object-cover transition-all duration-300 ease-in-out"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
