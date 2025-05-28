// app/page.tsx

import React from 'react'
import Image from 'next/image'
import path from 'path'
import { promises as fs } from 'fs'
import ProductList from './components/ProductList'
import CategoriesGrid from './components/CategoriesGrid'
import SeoDubaiSection from './components/SeoDubaiSection'
import VodicDubaiSlatkisi from './components/VodicDubaiSlatkisi'

interface RawProduct {
  id: string
  name: string
  price: number
  image: string
  isFeatured?: boolean
}

interface Product {
  id: string
  name: string
  price: string
  image: string
}

export default async function HomePage() {
  // Učitavanje podataka o proizvodima
  const dataPath = path.join(process.cwd(), 'data', 'products.json')
  const rawJson = await fs.readFile(dataPath, 'utf-8').catch(() => '[]')
  const rawProducts: RawProduct[] = JSON.parse(rawJson)

  // Filtriranje istaknutih proizvoda
  const featured: Product[] = rawProducts
    .filter((p) => p.isFeatured)
    .map((p) => ({
      id: p.id,
      name: p.name,
      image: p.image,
      price: `${p.price.toFixed(0)} RSD`,
    }))

  return (
    <main className="bg-[#1f140b] text-[#f1e5d1] min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full aspect-[16/9] overflow-hidden">
        <Image
          src="/hero.png"
          alt="Kadaif Shop Hero"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2d1a0e]/20 to-[#2d1a0e]/60 z-10" />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <a
            href="#featured"
            className="px-8 py-4 border border-[#c79f61] text-[#c79f61] rounded-lg font-semibold shadow-md transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-[#c79f61] hover:text-black"
          >
            Pogledaj proizvode
          </a>
        </div>
      </section>

      {/* Istaknuti proizvodi */}
      <section
        id="featured"
        className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto"
      >
        <h2 className="text-4xl font-serif text-[#c79f61] tracking-wide mb-6">
          Istaknuti proizvodi
        </h2>
        {featured.length > 0 ? (
          <ProductList products={featured} />
        ) : (
          <p className="text-base font-light">
            Trenutno nema istaknutih proizvoda.
          </p>
        )}
      </section>

      {/* Kategorije */}
      <section
        id="categories"
        className="px-4 sm:px-6 lg:px-8 pb-16 max-w-7xl mx-auto"
      >
        <h2 className="text-4xl font-serif text-[#c79f61] tracking-wide mb-6">
          Kategorije
        </h2>
        <div className="transition-transform hover:scale-105 duration-300">
          <CategoriesGrid />
        </div>
      </section>

      {/* Nova SEO-optimizovana sekcija sa animacijama */}
      <SeoDubaiSection />
      <VodicDubaiSlatkisi />
    </main>
  )
}
