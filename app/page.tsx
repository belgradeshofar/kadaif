'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useCart } from '../app/context/CartContext'
import SeoDubaiSection from './components/SeoDubaiSection'
import VodicDubaiSlatkisi from './components/VodicDubaiSlatkisi'

export default function HomePage() {
  const { addItem, openCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10)
    if (value >= 1) {
      setQuantity(value)
    }
  }

  const handleAddToCart = () => {
    addItem({
      id: 'kalup-dubai',
      name: 'Kalup za Dubai čokolade',
      price: 1999,
      image: '/images/kalup-dubai-cokolade.jpg',
      quantity,
    })
    openCart()
  }

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
            href="#kalup-dubai"
            className="px-8 py-4 border border-[#c79f61] text-[#c79f61] rounded-lg font-semibold shadow-md transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-[#c79f61] hover:text-black"
          >
            Pogledaj proizvod
          </a>
        </div>
      </section>

      {/* Kalup za Dubai čokolade */}
      <section
        id="kalup-dubai"
        className="px-4 sm:px-6 lg:px-8 pb-16 max-w-7xl mx-auto text-center"
      >
        <h2 className="text-4xl font-serif text-[#c79f61] tracking-wide mb-6">
          Kalup za Dubai čokolade
        </h2>

        {/* Statična slika */}
        <div className="mb-6">
          <Image
            src="/kalup-dubai-cokolade.jpg"
            alt="Kalup za Dubai čokolade"
            width={800}
            height={600}
            className="mx-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Cena */}
        <p className="text-3xl font-bold mb-4">690 RSD</p>

        {/* Izbor količine */}
        <div className="flex justify-center items-center mb-6">
          <label htmlFor="quantity" className="mr-4 text-lg">
            Količina:
          </label>
          <input
            id="quantity"
            type="number"
            min={1}
            value={quantity}
            onChange={handleQuantityChange}
            className="w-20 text-center bg-[#2d1a0e] text-[#f1e5d1] border border-[#c79f61] rounded-lg py-2"
          />
        </div>

        {/* Dugme Dodaj u korpu */}
        <button
          onClick={handleAddToCart}
          className="inline-block px-8 py-4 bg-[#c79f61] text-black rounded-lg font-semibold shadow-md transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-[#c79f61]/80"
        >
          Dodaj u korpu
        </button>
      </section>

      {/* SEO i vodiči */}
      <SeoDubaiSection />
      <VodicDubaiSlatkisi />

      {/* Opširan tekst o tome šta je Kadaif i kako se pravi */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 max-w-7xl mx-auto text-start">
        <h2 className="text-4xl font-serif text-[#c79f61] tracking-wide mb-6">
          Šta je Kadaif i kako se pravi
        </h2>
        <p className="mb-6">
          Kadaif (ili kadayif, katayef) je tradicionalno orijentalno slatko pecivo koje potiče iz Turske i
          Bliskog istoka, a danas je veoma popularno širom Balkana i arapskih zemalja. Osnovu kadaifa čini
          posebna vrsta tankog rezanog testa, koje se, kada se peče i kombinujе sa bogatim filom, stvara
          hrskavu i zlatno-smeđu strukturu. Kadaif se često koristi za pripremu raznih desertnih varijanti,
          ali i u kombinaciji sa sirupom i orasima, pistacijama ili bademima.
        </p>
        <p className="mb-6">
          <strong>Sastav testa:</strong> Kadaif testo se pravi od jednostavne mešavine pšeničnog brašna i
          vode, a specifično je po tome što se kuva u posebnoj mašini (ili se ručno priprema) kako bi se
          stvorile izuzetno tanke niti testa. Tradicionalno se koristi brašno sa nižim sadržajem glutena da
          bi se dobile što finije, mrežaste niti. Kada se testo izlije na vruću ploču (ili se prosipa kroz
          rupičaste obrasce), ono se momentalno pretvara u duge tanke vlaknaste niti. Nakon toga, kadaif
          se kratko prepeče na suvoj površini dok se ne osuši, a zatim se premaže istopljenim maslacem ili
          puterom.
        </p>
        <p className="mb-6">
          <strong>Priprema i slaganje:</strong> Nakon što se kadaif testo osuši i dobije rumenu boju, priprema
          se fil. Najčešći filovi uključuju mlevene orahe, pistacije ili bademe, pomešane sa šećerom i
          aromama poput cimeta ili arome ruže. Nauljena tepsija se prethodno premaže maslacem, a zatim se
          pola količine kadaifa ravnomerno rasporedi po dnu. Na tu sloj ide fil od orašastih plodova, a
          preko njega se raspoređuje preostala polovina kadaifa. Sve se dobro pritiska rukama ili drvenom
          varjačom kako bi se postigao kompaktan sloj.
        </p>
        <p className="mb-6">
          <strong>Pečenje:</strong> Složen kadaif priprema se za pečenje tako što se njegovo gornje sloj
          dodatno premaže istopljenim puterom ili maslacem kako bi se tokom pečenja dobila zlatno-smeđa,
          hrskava korica. Peče se u prethodno zagrejanoj rerni na oko 180–190 °C (350–375 °F) oko 25–30
          minuta, ili dok vrh ne postane zlatan i mirisan.
        </p>
        <p className="mb-6">
          <strong>Priprema sirupa:</strong> Dok se kadaif peče, priprema se jednostavan šećerni sirup (lidua)
          koji se sastoji od vode, šećera i limunovog soka. Vodu i šećer zagrevamo na srednjoj vatri dok
          se šećer potpuno ne rastvori, a zatim dodamo nekoliko kapi limunovog soka. Sirup se kuva dok
          ne postane blago gust, a zatim se sklanja sa vatre i ostavlja da se prohladi na sobnoj temperaturi.
        </p>
        <p className="mb-6">
          <strong>Dodavanje sirupa:</strong> Čim se kadaif izvadi iz rerne, vruć se preliva hladnim ili
          mlako-mlakim sirupom, ravnomerno raspoređujući sirup po celoj površini. Ovo omogućava testu da
          upije sirup, a da zadrži hrskavost spolja. Nakon preliva, kadaif se ostavlja da odstoji 2–3 sata
          (po mogućstvu na sobnoj temperaturi) kako bi se potpuno formirao jedinstven ukus – na spoju
          hrskavog i šećerno-sirupastog.
        </p>
        <p className="mb-6">
          <strong>Serviranje:</strong> Kadaif se seče na pravougaone ili kvadratne komade, a po želji se
          može ukrasiti mlevenim pistacijama, bademima ili orahom neposredno pre serviranja. Ovaj desert je
          omiljen za svečane prilike, praznike i porodična okupljanja, jer svojim bogatim i aromatičnim
          spojem hrskavog i slatkog nikoga ne ostavlja ravnodušnim.
        </p>
        <p>
          U našoj radnji “Kadaif Shop” možete pronaći i ekskluzivne kalupe za pripremu kadaifa kod kuće,
          kao i gotove, sveže pripremljene porcije kadaifa sa različitim filovima i aromama. Ako želite da
          sami isprobate recept, pratite gorenavedene korake – uživanje u pravljenju i degustaciji
          kadaifa obezbeđuje autentičan doživljaj orijentalne poslastice.
        </p>
      </section>
    </main>
  )
}
