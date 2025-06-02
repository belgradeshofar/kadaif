'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import CartPopup from './CartPopup';

export default function Header() {
  const { items, isCartOpen, openCart, closeCart } = useCart();
  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToKalup = () => {
    const el = document.getElementById('kalup-dubai');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <header className="relative bg-[#1f140b] border-b border-[#c79f61] shadow-md z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl sm:text-3xl font-bold text-[#c79f61] tracking-wide"
            style={{
              fontFamily: 'Georgia, Times New Roman, Times, serif',
              fontWeight: 700,
              letterSpacing: '0.03em',
            }}
          >
            Kadaif Shop
          </Link>

          {/* Desktop nav */}
          <nav className="hidden sm:flex space-x-4 md:space-x-8">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-semibold uppercase rounded-full transition text-[#f1e5d1] hover:bg-[#c79f61] hover:text-black"
              style={{ fontFamily: 'Georgia, Times New Roman, Times, serif' }}
            >
              Početna
            </Link>
            <button
              onClick={scrollToKalup}
              className="px-4 py-2 text-sm font-semibold uppercase rounded-full transition text-[#f1e5d1] hover:bg-[#c79f61] hover:text-black"
              style={{ fontFamily: 'Georgia, Times New Roman, Times, serif' }}
            >
              Naruči
            </button>
          </nav>

          {/* Mobile icons */}
          <div className="flex items-center space-x-2">
            {/* Menu toggle */}
            <button
              className="sm:hidden p-2 text-[#f1e5d1] hover:bg-[#2d1a0e] hover:text-[#c79f61] rounded-full transition"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Zatvori meni' : 'Otvori meni'}
            >
              {menuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>

            {/* Cart icon */}
            <button
              className="relative p-2 text-[#f1e5d1] hover:bg-[#2d1a0e] hover:text-[#c79f61] rounded-full transition"
              onClick={openCart}
              aria-label="Otvori korpu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7h13L17 13M7 13L5.4 5M17 13l1.5 7"
                />
              </svg>
              {mounted && count > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-600 text-white rounded-full text-[10px] w-5 h-5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div
          className={`sm:hidden absolute top-full left-0 w-full bg-[#1f140b] transform origin-top transition-transform duration-200 ${
            menuOpen ? 'scale-y-100' : 'scale-y-0'
          }`}
        >
          <nav className="flex flex-col px-4 pb-4 space-y-2">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2 text-[#f1e5d1] font-semibold rounded hover:bg-[#2d1a0e] hover:text-[#c79f61] transition"
              style={{ fontFamily: 'Georgia, Times New Roman, Times, serif' }}
            >
              Početna
            </Link>
            <button
              onClick={scrollToKalup}
              className="w-full text-left px-3 py-2 text-[#f1e5d1] font-semibold rounded hover:bg-[#2d1a0e] hover:text-[#c79f61] transition"
              style={{ fontFamily: 'Georgia, Times New Roman, Times, serif' }}
            >
              Naruči
            </button>
          </nav>
        </div>
      </header>

      {/* Cart drawer */}
      <CartPopup open={isCartOpen} onClose={closeCart} />
    </>
  );
}
