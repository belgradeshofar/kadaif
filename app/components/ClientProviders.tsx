// app/components/ClientProviders.tsx
'use client';

import React from 'react';
import { CartProvider } from '../context/CartContext';
import Header from './Header';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Header />
      {children}
    </CartProvider>
  );
}
