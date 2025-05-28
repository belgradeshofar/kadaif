'use client';

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CheckoutPage() {
  const SHIPPING = 380;
  const PRIORITY_SURCHARGE = 200;
  const { items, clearCart } = useCart();
  const router = useRouter();

  // Form state
  const [email, setEmail] = useState('');           // nije više required
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [building, setBuilding] = useState('');
  const [floor, setFloor] = useState('');
  const [apartment, setApartment] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [notes, setNotes] = useState('');
  const [deliveryType, setDeliveryType] = useState<'standard' | 'priority'>('standard');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const deliveryCost = deliveryType === 'standard'
    ? SHIPPING
    : SHIPPING + PRIORITY_SURCHARGE;
  const total = subtotal + deliveryCost;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      setError('Morate prihvatiti uslove kupovine');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: {
            email: email || undefined,
            phone,
            firstName,
            lastName,
            address: {
              city,
              country: 'Srbija',
              street,
              streetNumber,
              building,
              floor,
              apartment,
              postalCode,
              notes,
            },
          },
          items,
          subtotal,
          deliveryType,
          deliveryCost,
          total,
          paymentMethod: 'cod',
        }),
      });
      if (!res.ok) throw new Error();
      clearCart();
      router.push('/thank-you');
    } catch {
      setError('Došlo je do greške pri kupovini.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1f140b] text-[#f1e5d1]">
        <p>
          Korpa je prazna.{' '}
          <a href="/" className="text-[#c79f61] underline">
            Vrati se u prodavnicu
          </a>.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1f140b] text-[#f1e5d1] px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#c79f61] mb-8 text-center">
        Podaci za porudžbinu
      </h1>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-12">
        {/* Informacije za dostavu */}
        <section className="space-y-6 bg-[#2d1a0e] p-8 rounded-lg shadow-inner border border-[#c79f61]">
          <h2 className="text-2xl font-serif font-semibold text-[#c79f61]">
            Informacije za dostavu
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email (nije obavezno) */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  w-full p-3 
                  bg-[#1f140b] text-[#f1e5d1] 
                  border border-[#c79f61] rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-[#c79f61]
                "
              />
            </div>
            {/* Telefon */}
            <div>
              <label className="block text-sm font-medium mb-1">
                *Telefon
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="
                  w-full p-3 
                  bg-[#1f140b] text-[#f1e5d1] 
                  border border-[#c79f61] rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-[#c79f61]
                "
              />
            </div>
            {/* Ime */}
            <div>
              <label className="block text-sm font-medium mb-1">
                *Ime
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="
                  w-full p-3 
                  bg-[#1f140b] text-[#f1e5d1] 
                  border border-[#c79f61] rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-[#c79f61]
                "
              />
            </div>
            {/* Prezime */}
            <div>
              <label className="block text-sm font-medium mb-1">
                *Prezime
              </label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="
                  w-full p-3 
                  bg-[#1f140b] text-[#f1e5d1] 
                  border border-[#c79f61] rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-[#c79f61]
                "
              />
            </div>
            {/* Grad */}
            <div>
              <label className="block text-sm font-medium mb-1">
                *Grad
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="
                  w-full p-3 
                  bg-[#1f140b] text-[#f1e5d1] 
                  border border-[#c79f61] rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-[#c79f61]
                "
              />
            </div>
            {/* Država */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Država
              </label>
              <input
                type="text"
                readOnly
                value="Srbija"
                className="
                  w-full p-3 
                  bg-[#2d1a0e] text-[#f1e5d1] 
                  border border-[#c79f61] rounded-lg
                "
              />
            </div>
            {/* Ulica */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                *Ulica
              </label>
              <input
                type="text"
                required
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="
                  w-full p-3 
                  bg-[#1f140b] text-[#f1e5d1] 
                  border border-[#c79f61] rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-[#c79f61]
                "
              />
            </div>
            {/* Broj */}
            <div>
              <label className="block text-sm font-medium mb-1">
                *Broj
              </label>
              <input
                type="text"
                required
                value={streetNumber}
                onChange={(e) => setStreetNumber(e.target.value)}
                className="
                  w-full p-3 
                  bg-[#1f140b] text-[#f1e5d1] 
                  border border-[#c79f61] rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-[#c79f61]
                "
              />
            </div>
            {/* Podbroj */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Podbroj
              </label>
              <input
                type="text"
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
                className="
                  w-full p-3 
                  bg-[#1f140b] text-[#f1e5d1] 
                  border border-[#c79f61] rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-[#c79f61]
                "
              />
            </div>
            {/* Sprat */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Sprat
              </label>
              <input
                type="text"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                className="
                  w-full p-3 
                  bg-[#1f140b] text-[#f1e5d1] 
                  border border-[#c79f61] rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-[#c79f61]
                "
              />
            </div>
            {/* Stan */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Stan
              </label>
              <input
                type="text"
                value={apartment}
                onChange={(e) => setApartment(e.target.value)}
                className="
                  w-full p-3 
                  bg-[#1f140b] text-[#f1e5d1] 
                  border border-[#c79f61] rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-[#c79f61]
                "
              />
            </div>
            {/* Poštanski broj */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                *Poštanski broj
              </label>
              <input
                type="text"
                required
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="
                  w-full p-3 
                  bg-[#1f140b] text-[#f1e5d1] 
                  border border-[#c79f61] rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-[#c79f61]
                "
              />
            </div>
            {/* Napomena */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Napomena
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="
                  w-full p-3 
                  bg-[#1f140b] text-[#f1e5d1] 
                  border border-[#c79f61] rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-[#c79f61]
                "
              />
            </div>
          </div>
        </section>

        {/* Tip isporuke */}
        <section className="space-y-3 max-w-2xl mx-auto">
          <h2 className="text-xl font-serif font-semibold text-[#c79f61]">
            Tip isporuke
          </h2>
          <div className="flex flex-col sm:flex-row gap-6">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="delivery"
                value="standard"
                checked={deliveryType === 'standard'}
                onChange={() => setDeliveryType('standard')}
                className="form-radio text-[#c79f61] focus:ring-[#c79f61]"
              />
              <span>
                Standardna (2–5 dana) – {SHIPPING} RSD
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="delivery"
                value="priority"
                checked={deliveryType === 'priority'}
                onChange={() => setDeliveryType('priority')}
                className="form-radio text-[#c79f61] focus:ring-[#c79f61]"
              />
              <span>
                Prioritetna (2–3 dana) – +{PRIORITY_SURCHARGE} RSD
              </span>
            </label>
          </div>
        </section>

        {/* Pregled korpe */}
        <section className="space-y-4 max-w-4xl mx-auto">
          <h2 className="text-xl font-serif font-semibold text-[#c79f61]">
            Vaša korpa
          </h2>
          <ul className="space-y-4">
            {items.map((i) => (
              <li
                key={i.id}
                className="flex items-center justify-between bg-[#2d1a0e] p-4 rounded-lg border border-[#c79f61]"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 relative">
                    <Image
                      src={i.image}
                      alt={i.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{i.name}</p>
                    <p className="text-sm">Veličina: {i.id.split('-').pop()}</p>
                    <p className="text-sm">Količina: {i.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold">{i.price * i.quantity} RSD</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Uslovi i poruči */}
        <section className="space-y-4 max-w-2xl mx-auto">
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="form-checkbox text-[#c79f61] focus:ring-[#c79f61]"
            />
            <span>
              Saglasan sam sa{' '}
              <a href="#" className="underline text-[#c79f61]">
                uslovima
              </a>{' '}
              <span className="text-red-500">*</span>
            </span>
          </label>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-4 
              bg-[#c79f61] text-[#1f140b] 
              font-semibold rounded-lg 
              hover:bg-opacity-90 
              transition
            "
          >
            {loading ? 'Obrađujem...' : 'PORUČI'}
          </button>
        </section>
      </form>
    </div>
  );
}
