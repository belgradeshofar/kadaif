'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

const SIZE_OPTIONS = ['XS','S','M','L','XL','2XL','3XL','4XL','5XL'];
const SHIPPING_TEXT =
  'Standardna dostava (2–5 radnih dana). Ubrzana dostava: +380 RSD (2–3 radna dana).';
const RETURNS_TEXT =
  'Ako proizvod stigne oštećen ili ne odgovara opisu, javite nam se putem emaila ili telefona. Odgovorićemo vam u roku od 1 radnog dana.';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  description?: string;
}

export default function ProductDetail({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  const numericPrice = parseInt(product.price.replace(/[^0-9]/g, ''), 10);

  const handleAdd = () => {
    if (!size) {
      setError('Morate izabrati veličinu');
      return;
    }
    if (quantity < 1) {
      setError('Morate uneti količinu');
      return;
    }
    setError('');
    addItem({
      id: `${product.id}-${size}`,
      name: `${product.name} (${size})`,
      price: numericPrice,
      image: product.image,
      quantity,
    });
    openCart();
    setToast('Proizvod dodat u korpu!');
  };

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(''), 2000);
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <div className="bg-[#1f140b] text-[#f1e5d1] min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <nav className="text-sm mb-8">
          <Link href="/" className="hover:text-[#c79f61]">
            Početna
          </Link>{' '}
          /{' '}
          <Link href="/" className="hover:text-[#c79f61]">
            Prodavnica
          </Link>{' '}
          /{' '}
          <span className="font-medium">{product.name}</span>
        </nav>

        {/* Main */}
        <div className="bg-[#2d1a0e] rounded-xl shadow-xl overflow-hidden lg:flex">
          {/* Image */}
          <div className="lg:w-1/2 p-6 flex items-center justify-center">
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={800}
              className="object-contain rounded-md"
            />
          </div>

          {/* Details */}
          <div className="lg:w-1/2 p-10 flex flex-col justify-between space-y-8">
            <div>
              <h1 className="text-4xl font-serif font-bold">{product.name}</h1>
              <p className="text-3xl text-[#c79f61] font-semibold mt-3">
                {product.price}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-6">
              <div>
                <label className="block font-medium mb-2 text-[#f1e5d1]">
                  Veličina <span className="text-red-500">*</span>
                </label>
                <select
                  value={size}
                  onChange={e => {
                    setSize(e.target.value);
                    setError('');
                  }}
                  className="
                    block w-full 
                    bg-[#1f140b] text-[#f1e5d1] 
                    border border-[#c79f61] rounded-lg p-3
                    focus:ring-[#c79f61] focus:border-[#c79f61]
                  "
                >
                  <option disabled value="">
                    Izaberite veličinu
                  </option>
                  {SIZE_OPTIONS.map(s => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium mb-2 text-[#f1e5d1]">
                  Količina <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-3 py-1 bg-[#c79f61] text-[#1f140b] rounded"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={e =>
                      setQuantity(
                        Math.max(1, parseInt(e.target.value) || 1)
                      )
                    }
                    className="
                      w-full sm:w-28 p-3 
                      bg-[#1f140b] text-[#f1e5d1] 
                      border border-[#c79f61] rounded-lg 
                      focus:ring-[#c79f61] focus:border-[#c79f61] 
                      text-center
                    "
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-3 py-1 bg-[#c79f61] text-[#1f140b] rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Add to cart */}
            <div>
              <button
                type="button"
                onClick={handleAdd}
                className="
                  w-full py-4 
                  border border-[#c79f61] text-[#c79f61] 
                  rounded-lg font-semibold 
                  transition-transform transform
                  hover:scale-105 hover:bg-[#c79f61] hover:text-[#1f140b]
                "
              >
                Dodaj u korpu
              </button>
              {error && <p className="mt-2 text-red-500">{error}</p>}
            </div>

            {/* Star rating */}
            <div className="flex space-x-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[#c79f61] text-3xl">
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Product description */}
        <section className="mt-12 bg-[#2d1a0e] p-8 rounded-lg shadow-inner">
          <h2 className="text-2xl font-serif font-semibold mb-4 text-[#c79f61]">
            Opis proizvoda
          </h2>
          <p className="text-[#f1e5d1] leading-relaxed">
            {product.description || 'Nema dodatnih informacija.'}
          </p>
        </section>

        {/* Info sections */}
        <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#2d1a0e] p-6 rounded-lg border border-[#c79f61]">
            <h3 className="text-xl font-semibold mb-2 text-[#c79f61]">
              Dostava
            </h3>
            <p className="text-[#f1e5d1]">{SHIPPING_TEXT}</p>
          </div>
          <div className="bg-[#2d1a0e] p-6 rounded-lg border border-[#c79f61]">
            <h3 className="text-xl font-semibold mb-2 text-[#c79f61]">
              Reklamacije
            </h3>
            <p className="text-[#f1e5d1]">{RETURNS_TEXT}</p>
          </div>
        </section>
      </div>

      {/* Toast */}
      {toast && (
        <div
          aria-live="polite"
          className="
            fixed bottom-4 left-1/2 transform -translate-x-1/2 
            bg-[#c79f61] text-[#1f140b] 
            px-6 py-3 rounded-lg shadow-lg
          "
        >
          {toast}
        </div>
      )}
    </div>
  );
}
