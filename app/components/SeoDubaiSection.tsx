'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

// Animacione varijante
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.3 } },
}
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { ease: 'easeOut', duration: 0.8 } },
}
const zoomInVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.8 } },
}

export default function BestDubaiSection() {
  return (
    <section
      id="best-dubai-chocolate"
      className="relative bg-gradient-to-br from-[#1a0f05] to-[#411f14] text-[#f1e5d1] py-24 px-6 lg:px-12 overflow-hidden"
    >
      {/* Dekorativni oblici u pozadini */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-tr from-yellow-600 to-transparent rounded-full mix-blend-multiply filter blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          className="absolute bottom-10 right-10 w-72 h-72 bg-gradient-to-tl from-[#c79f61] to-transparent rounded-full mix-blend-multiply filter blur-3xl"
        />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="relative max-w-6xl mx-auto space-y-16 z-10"
      >
        {/* Naslov */}
        <motion.h2
          variants={fadeInUpVariants}
          className="text-5xl lg:text-7xl font-serif text-center font-bold leading-tight"
        >
          Kadaif Dubai Čokolada<br />Luksuz koji traje
        </motion.h2>

        {/* Podnaslov */}
        <motion.p
          variants={fadeInUpVariants}
          className="text-center max-w-3xl mx-auto text-lg lg:text-xl font-light"
        >
          Otkrijte savršeni spoj najfinijeg kakaoa i egzotičnih začina. Kadaif Dubai čokolada stvorena je za istinske hedoniste.
        </motion.p>

        {/* Hero slika */}
        <motion.div variants={zoomInVariants} className="overflow-hidden rounded-2xl shadow-2xl mx-auto w-full max-w-4xl">
          <Image
            src="/dubai-chocolate-premium.jpg"
            alt="Kadaif Dubai čokolada u luksuznom ambalaži"
            width={1200}
            height={600}
            className="object-cover w-full h-full"
          />
        </motion.div>

        {/* Feature kartice */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: '🥇', title: 'Prvi u Luksuzu', desc: 'Ekskluzivna receptura nastala u srcu Emirata.' },
            { icon: '🌾', title: 'Autentični Sastojci', desc: 'Šafran, kardamom i listići jestivog zlata.' },
            { icon: '📦', title: 'Elegantan Dizajn', desc: 'Ručna izrada i prestižna ambalaža.' },
            { icon: '⚡', title: 'Brza Dostava', desc: '2–5 radnih dana širom Evrope.' }
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUpVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-[#2d1a0e] p-6 rounded-xl flex flex-col items-center text-center shadow-lg"
            >
              <span className="text-4xl mb-4">{feature.icon}</span>
              <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-base font-light">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

     {/* Izjave korisnika */}
<motion.div
  variants={containerVariants}
  className="w-full"
>
  <motion.h3
    variants={fadeInUpVariants}
    className="text-3xl lg:text-4xl font-serif text-center text-[#c79f61] font-bold mb-10"
  >
    Šta kažu ljubitelji čokolade
  </motion.h3>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">
    {[
      {
        name: 'Marko R.',
        quote: 'Kadaif Dubai čokolada je definitivan vrhunac luksuza. Svaki zalogaj je priča.',
      },
      {
        name: 'Jelena S.',
        quote: 'Pakovanje koje oduševljava, ukus koji ne zaboravljaš. Moj prvi izbor.',
      },
      {
        name: 'Srđan P.',
        quote: 'Zlatni standard čokolade. Poklonio sam prijatelju, sad i on naručuje!',
      },
    ].map((t, i) => (
      <motion.div
        key={i}
        variants={fadeInUpVariants}
        whileHover={{ scale: 1.06, boxShadow: '0 8px 36px 0 #c79f61aa' }}
        className="
          bg-[#1f140b]/90
          rounded-2xl
          border border-[#c79f61] 
          shadow-xl
          p-8
          flex flex-col
          items-start
          transition
          hover:ring-2 hover:ring-[#c79f61]/60
          min-h-[190px]
        "
      >
        <div className="text-lg font-semibold text-[#c79f61] mb-2">
          {t.name}
        </div>
        <div className="text-base lg:text-lg text-[#f1e5d1] italic">
          “{t.quote}”
        </div>
      </motion.div>
    ))}
  </div>
</motion.div>


        {/* Poziv na akciju */}
        <motion.div variants={fadeInUpVariants} className="text-center">
          <Link
            href="#featured"
            className="inline-block bg-[#c79f61] text-black px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transition transform hover:scale-105"
          >
            Pregledajte Proizvode
          </Link>
        </motion.div>

      </motion.div>
    </section>

  )


}
