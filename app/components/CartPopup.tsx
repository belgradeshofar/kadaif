'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import Image from 'next/image';

const SHIPPING = 380;

export default function CartPopup({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { items, removeItem, clearCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const itemsTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const total = itemsTotal + SHIPPING;

  return (
    <div className="fixed inset-0 flex z-50">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}/>

      {/* Drawer */}
      <div className="relative ml-auto w-4/5 max-w-xs h-full bg-white text-gray-900 shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Korpa</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">&times;</button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-gray-500 text-center">Korpa je prazna.</p>
          ) : items.map(item => (
            <div key={item.id} className="flex items-center space-x-3">
              <div className="w-16 h-16 relative">
                <Image src={item.image} alt={item.name} fill className="object-cover rounded"/>
              </div>
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">{item.quantity} × {item.price} RSD</p>
              </div>
              <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700">&times;</button>
            </div>
          ))}
        </div>

        {/* Sticky footer */}
        <div className="sticky bottom-0 bg-white p-4 border-t space-y-3">
          <div className="flex justify-between"><span>Proizvodi:</span><span>{itemsTotal} RSD</span></div>
          <div className="flex justify-between"><span>Dostava:</span><span>{SHIPPING} RSD</span></div>
          <div className="flex justify-between font-semibold"><span>Ukupno:</span><span>{total} RSD</span></div>
          <button
            onClick={clearCart}
            disabled={items.length===0}
            className="w-full py-2 border border-gray-300 rounded disabled:opacity-50"
          >
            Isprazni korpu
          </button>
          <button
            onClick={() => { onClose(); router.push('/checkout'); }}
            className="w-full py-2 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            Idi na kasu
          </button>
        </div>
      </div>
    </div>
  );
}
