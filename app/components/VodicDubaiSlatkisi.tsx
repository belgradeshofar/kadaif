'use client';

import { motion } from 'framer-motion';

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { ease: 'easeOut', duration: 0.8 } },
};

export default function VodicDubaiSlatkisi() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={fadeInUpVariants}
      className="
        relative z-20 max-w-5xl mx-auto mt-20 mb-24
        rounded-3xl shadow-2xl
        px-8 py-14 sm:px-14
        bg-[#22150d]/95 backdrop-blur-md
        ring-2 ring-[#c79f61]/30
        transition-all
      "
      style={{
        fontFamily: 'Merriweather, Georgia, serif',
      }}
    >
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-center mb-6 text-[#e5c089] drop-shadow-xl font-serif">
        Vodič kroz DUBAI SLATKIŠE
      </h2>
      <div className="mx-auto mb-10 w-24 h-1 rounded-full bg-gradient-to-r from-[#dec08d] via-yellow-200 to-[#efba8a] opacity-90"></div>

      <article className="prose prose-lg md:prose-xl prose-invert max-w-none leading-relaxed text-[1.25rem] md:text-[1.45rem]">
        <h3 className="!text-2xl md:!text-3xl text-[#dec08d] font-semibold mt-8 mb-4 font-serif">Kadaif – svileni koreni Levanta</h3>
        <p>
          Kadaif (tur. <b>kadayif</b>) potiče iz osmanske kuhinje, ali se njegovu najprofinjeniju verziju danas susreće upravo u Dubaiju, gde se tradicionalna, gotovo pergament-tanka nit testa kombinuje sa datuljinim sirupom, ružinom vodicom i prahom pistacija. Za razliku od balkanskih varijanti sa orasima i šećernim agdom, emiratski pristup teži intenzivnoj aromi arabijskih začina uz minimalnu slatkoću. Struktura je ključ: pravilno filigransko testo mora škripati pod zubom, ali se istopiti pod toplotom nepca. Time kadaif prelazi iz puste balkanske nostalgije u desertni haute-couture.
        </p>
        <hr className="my-8 opacity-30 border-[#efba8a]" />

        <h3 className="!text-2xl md:!text-3xl text-[#dec08d] font-semibold mt-8 mb-4 font-serif">Dubai čokolada – zlato u kocki</h3>
        <p>
          <b>Dubai čokolada</b> nije samo brend; to je koncept luksuza koji podrazumeva dvostruku selekciju kakao zrna (najčešće hibrid Trinitario iz Ekvadora i odležani Forastero iz Gane), infuziju šafrana iz Kermana i kardamoma iz Kerale, te završni sloj jestivog zlatnog lista debljine svega pet mikrona. Niskotemperaturno končovanje (ispod 45 °C) čuva hlapljiva ulja, dok se sadržaj krupno mlevenih pistacija ili dehidriranog kamiljeg mleka dodaje tek u fazi temperiranja da ne bi pregoreo. Rezultat je čokolada sa parfemskom kompleksnošću u kojoj se gorko, zemljano i cvetno ukrštaju bez agresivnog šećernog udara.
        </p>
        <hr className="my-8 opacity-30 border-[#efba8a]" />

        <h3 className="!text-2xl md:!text-3xl text-[#dec08d] font-semibold mt-8 mb-4 font-serif">Kupovina & čuvanje</h3>
        <p>
          Kadaif kupujte u vakuum pakovanju sa jasno naznačenim datumom ekstrudiranja; posivele niti ukazuju na oksidaciju. Čokoladu birajte prema <i>snap-testu</i>: kocka mora dati čist, jasan zvuk pri lomljenju, bez belih pruga (fat bloom). Optimalno skladištenje: 16 – 18 °C, relativna vlažnost &lt; 60 %. Frižider nije preporučljiv zbog kondenzacije – radije koristite termo-kutiju sa silikagelom.
        </p>
        <hr className="my-8 opacity-30 border-[#efba8a]" />

        <h3 className="!text-2xl md:!text-3xl text-[#dec08d] font-semibold mt-8 mb-4 font-serif">Ritual posluživanja</h3>
        <p>
          U Emiratima se kadaif najpre prepeče kratko na <b>ghee</b> puteru, prelije sirupom od muskovada i servira uz <i>qahwa</i> (arabijsku kafu sa kardamomom). U srpskom kontekstu, pokušajte ga karamelizovati na suvom tiganju pa spojiti s polutvrdim ovčjim sirom – kontrast slano-slatko otvara nove slojeve ukusa. Dubai čokoladu poslužite na 22 °C, tanko isečenih listića, uz karak čaj ili biran, ne previše taninski porto; jači alkoholi ubijaju njenu cvetnu aromatiku.
        </p>
        <hr className="my-8 opacity-30 border-[#efba8a]" />

        <h3 className="!text-2xl md:!text-3xl text-[#dec08d] font-semibold mt-8 mb-4 font-serif">Uparivanje kadaifa i čokolade</h3>
        <p>
          Za tzv. <i>stacked dessert</i> postavite disk od nežno zapečenog kadaifa, preko toga ganache od Dubai čokolade (70 % kakao + šafran), zatim gel od datulja i pospite prahom malih, delikatno tostiranih badema. Teksturna dinamika (hrskavo–kremasto) i temperaturni kontrast (mlako–hladno) stvaraju višeslojni gustativni narativ.
        </p>
        <hr className="my-8 opacity-30 border-[#efba8a]" />

        <h3 className="!text-2xl md:!text-3xl text-[#dec08d] font-semibold mt-8 mb-4 font-serif">Nutritivna & senzorna mapa</h3>
        <p>
          Kadaif: dominantan složeni ugljeni hidrat (70 %), niska masnoća; čokolada: više mononezasićenih masnih kiselina (oleinska), antioksidansi (flavanoli) 400 mg/100 g. Zajedno nude stabilnu krivu glikemije ako se porcioniraju u ≤ 35 g. Aromatski kotačić pri degustaciji detektuje note meda, žalfije, praženog sezama (kadaif) i tonke, delikatne dima, sušenog cveta nara (čokolada).
        </p>
        <hr className="my-8 opacity-30 border-[#efba8a]" />

        <h3 className="!text-2xl md:!text-3xl text-[#dec08d] font-semibold mt-8 mb-4 font-serif">Integracija u srpsku trpezu</h3>
        <p>
          Na <i>slavi</i> može zameniti klasični sitni kolač: servirajte minijaturne rolnice kadaifa s prelivom od šumskih jagoda, pored kojih stoji tabla Dubai čokolade kao „digestif“. Za iftar ili posnu trpezu, kombinujte s rashlađenim sorbetom od nara. Time se tradicionalni kontekst širi bez kompromisa prema lokalnom ukusu.
        </p>
        <hr className="my-8 opacity-30 border-[#efba8a]" />

        <h3 className="!text-2xl md:!text-3xl text-[#dec08d] font-semibold mt-8 mb-4 font-serif">Saveti za entuzijaste</h3>
        <ul>
          <li>Šećerni sirup: zamenite klasični šećer datuljinim nektarom za niži GI.</li>
          <li>Mikroplanerom ostružite zamrznutu Dubai čokoladu direktno na topao kadaif – dobijate momentalno aromatsko „parno kupatilo“.</li>
          <li>Eksperiment: prepečeni kadaif izmrvite u prah, pomešajte s toplom čokoladom i dobijate „desertni pesak“ pogodan za <i>plating</i> savremenih tanjira.</li>
        </ul>
      </article>
    </motion.section>
  );
}
