// app/thank-you/page.tsx
import React from 'react';
import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center max-w-md">
        {/* Ikonica potvrde */}
        <svg
          className="w-16 h-16 mx-auto text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2l4-4m5 2a9 9 0 11-18 0a9 9 0 0118 0z"
          />
        </svg>

        <h1 className="text-3xl font-bold mt-4">Hvala na porudžbini!</h1>
        <p className="mt-2 text-gray-700">
          Vaša porudžbina je uspešno primljena.  
      
        </p>

        <Link
          href="/"
          className="inline-block mt-6 px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
        >
          Nastavi kupovinu
        </Link>
      </div>
    </div>
  );
}
