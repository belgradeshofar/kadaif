'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000); // reset for demo purposes
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-16">
      <div className="max-w-3xl w-full bg-gray-100 p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Kontaktirajte nas</h1>

        <div className="mb-8 text-center text-gray-700">
          <p>📞 <strong>063 836 0246</strong></p>
          <p>📧 <strong>milospetrovictekstoteka@gmail.com</strong></p>
        </div>

        {submitted ? (
          <div className="text-green-600 font-semibold text-center">
            Poruka je uspešno poslata. Hvala vam!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              required
              placeholder="Vaše ime"
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="email"
              name="email"
              required
              placeholder="Vaš email"
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <textarea
              name="message"
              required
              placeholder="Vaša poruka"
              rows={5}
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-900 transition"
            >
              Pošalji poruku
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
