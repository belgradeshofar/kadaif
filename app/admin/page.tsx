// app/admin/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { CATEGORIES } from '../constants/categories';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: boolean;
  description?: string;
  isFeatured?: boolean;
}

const ADMIN_PASSWORD = 'admin123';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    image: '',
    category: '',
    stock: true,
    description: '',
    isFeatured: false
  });
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!authenticated) return;
    fetch('/api/products')
      .then(res => res.json())
      .then(setProducts)
      .catch(console.error);
  }, [authenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError(null);
    } else {
      setError('Pogrešna lozinka');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm(prev => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : name === 'price'
          ? parseFloat(value)
          : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Dodavanje...');
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error();
      const newProduct: Product = await res.json();
      setProducts(prev => [...prev, newProduct]);
      setForm({
        name: '',
        price: 0,
        image: '',
        category: '',
        stock: true,
        description: '',
        isFeatured: false
      });
      setStatus('Uspešno dodato!');
    } catch {
      setStatus('Došlo je do greške');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Da li ste sigurni da želite da obrišete ovaj proizvod?'))
      return;
    try {
      const res = await fetch('/api/products', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        setProducts(prev => prev.filter(p => p.id !== id));
      }
    } catch {
      console.error('Greška pri brisanju');
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex justify-center items-center p-6 bg-gray-50">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm bg-white p-6 rounded shadow space-y-4"
        >
          <h1 className="text-2xl font-bold">Admin prijava</h1>
          <input
            type="password"
            placeholder="Lozinka"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border rounded p-2"
          />
          {error && <p className="text-red-500">{error}</p>}
          <button className="w-full bg-black text-white py-2 rounded">
            Prijavi se
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow mb-8 max-w-lg space-y-4"
      >
        <h2 className="text-xl font-semibold">Dodaj / Izmeni proizvod</h2>

        <input
          type="text"
          name="name"
          placeholder="Naziv"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Cena (RSD)"
          value={form.price}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
          min={0}
        />

        <input
          type="text"
          name="image"
          placeholder="URL slike"
          value={form.image}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        >
          <option value="" disabled>
            Izaberite kategoriju
          </option>
          {CATEGORIES.map((c: { slug: string }) => (
            <option key={c.slug} value={c.slug}>
              {c.slug.replace('-', ' ')}
            </option>
          ))}
        </select>

        <textarea
          name="description"
          placeholder="Opis"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="stock"
            checked={form.stock}
            onChange={handleChange}
            className="h-4 w-4"
          />
          <span>Na stanju</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isFeatured"
            checked={form.isFeatured}
            onChange={handleChange}
            className="h-4 w-4"
          />
          <span>Istaknut proizvod</span>
        </label>

        <button className="w-full bg-black text-white py-2 rounded">
          Sačuvaj
        </button>
        {status && <p>{status}</p>}
      </form>

      <div className="bg-white p-6 rounded shadow max-w-3xl space-y-4">
        <h2 className="text-xl font-semibold">Postojeći proizvodi</h2>
        {products.map(p => (
          <div
            key={p.id}
            className="flex justify-between items-center border-b pb-2"
          >
            <div>
              <p className="font-medium">{p.name}</p>
              <p className="text-sm text-gray-600">
                {p.category} | {p.isFeatured ? 'Istaknut' : '---'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="font-semibold">
                {p.price.toFixed(0)} RSD
              </span>
              <button
                onClick={() => handleDelete(p.id)}
                className="text-red-500 hover:text-red-700"
              >
                Obriši
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
