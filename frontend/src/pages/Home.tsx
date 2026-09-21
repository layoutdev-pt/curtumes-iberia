import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { motion, useInView } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  Line,
  Marker,
} from "react-simple-maps";
import { supabase } from "../lib/supabase";
import { labelCategoria } from "../lib/categorias";
import { GalleryMarquee } from "../components/ui/GalleryMarquee";
import { RevealText } from "../components/ui/RevealText";
import { AnimatedCounter } from "../components/ui/AnimatedCounter";

interface ArtigoDestaque {
  id: string;
  referencia: string;
  categoria: string;
  titulo_pt: string;
  titulo_en: string;
  imagem_url: string;
}

const content = {
  PT: {
    stats: [
      { value: 60, suffix: "+", label: "Anos de Experiência", sub: "Desde 1963 em Vila Moreira" },
      { value: 3, label: "Gerações", sub: "Uma empresa familiar" },
      { display: "LWG", label: "Classificação Gold", sub: "Classificação ambiental máxima" },
      { value: 13, suffix: "+", label: "Mercados", sub: "Da Europa ao resto do mundo" },
    ],
    featuredTitle: "Artigos em Destaque",
    featuredSubtitle:
      "Peles desenvolvidas para diferentes aplicações, acabamentos e exigências.",
    featuredCta: "Ver Artigos",
    viewAllCatalog: "Ver Todos os Artigos",
    missionTitle: "All About Leather. Since 1963.",
    missionText: [
      "Há mais de 60 anos que transformamos pele em couro, em Vila Moreira, Alcanena.",
      "Somos uma empresa familiar, hoje na terceira geração, com uma coisa muito clara: conhecemos a pele, respeitamos o processo e nunca deixamos de procurar novas formas de fazer melhor.",
      "Tradição, tecnologia e inovação fazem parte da mesma fábrica. O resultado são couros desenvolvidos para marcas e indústrias em diferentes mercados, sempre com a qualidade Curtumes Ibéria.",
    ],
    missionBtn: "Conheça a Nossa História",
    globalTitle: "De Portugal para o Mundo.",
    globalText: "Couro português presente em mercados de todo o mundo.",
    globeTitleLeft: "Europa",
    globeTextLeft:
      "Com uma forte presença europeia, a Curtumes Ibéria exporta para mercados como Espanha, França, Reino Unido, Alemanha, Itália, Suécia, Holanda e Roménia.",
    globeTitleRight: "Além da Europa",
    globeTextRight:
      "A nossa presença estende-se muito além da Europa, com clientes em mercados como Marrocos, Estados Unidos, Índia, China e Vietname.",
    globalBtn: "Conheça a Nossa Presença Internacional",
    certCategory: "Leather Working Group",
    certTitle: "LWG Gold Rated",
    certEdition: "Responsabilidade Ambiental · 2025",
    certPoint1: "Certificação Gold atribuída pela Leather Working Group (LWG).",
    certPoint2:
      "Compromisso contínuo com a melhoria do desempenho ambiental e dos processos de produção.",
    certFooter: "Certificação LWG Gold",
    certCta: "Ver Mais",
    ctaFinalTitle: "Procura uma pele específica?",
    ctaFinalText:
      "A nossa equipa comercial e técnica está disponível para encontrar a solução certa para o seu projeto e desenvolver artigos de acordo com as suas necessidades.",
    ctaFinalBtnContact: "Entre em Contacto",
    ctaFinalBtnCatalog: "Veja os Artigos",
  },
  EN: {
    stats: [
      { value: 60, suffix: "+", label: "Years of Experience", sub: "Since 1963 in Vila Moreira" },
      { value: 3, label: "Generations", sub: "A family-owned company" },
      { display: "LWG", label: "Gold Rated", sub: "Top environmental rating" },
      { value: 13, suffix: "+", label: "Markets", sub: "From Europe to the rest of the world" },
    ],
    featuredTitle: "Featured Articles",
    featuredSubtitle:
      "Leathers developed for different applications, finishes and requirements.",
    featuredCta: "View Articles",
    viewAllCatalog: "View All Articles",
    missionTitle: "All About Leather. Since 1963.",
    missionText: [
      "For more than 60 years we have been turning hides into leather, in Vila Moreira, Alcanena.",
      "We are a family-owned company, today in its third generation, with one thing very clear: we know leather, we respect the process and we never stop looking for new ways to do it better.",
      "Tradition, technology and innovation are part of the same factory. The result is leather developed for brands and industries across different markets, always with Curtumes Ibéria quality.",
    ],
    missionBtn: "Discover Our History",
    globalTitle: "From Portugal to the World.",
    globalText: "Portuguese leather present in markets all over the world.",
    globeTitleLeft: "Europe",
    globeTextLeft:
      "With a strong European presence, Curtumes Ibéria exports to markets such as Spain, France, the United Kingdom, Germany, Italy, Sweden, the Netherlands and Romania.",
    globeTitleRight: "Beyond Europe",
    globeTextRight:
      "Our presence extends far beyond Europe, with clients in markets such as Morocco, the United States, India, China and Vietnam.",
    globalBtn: "Discover Our International Presence",
    certCategory: "Leather Working Group",
    certTitle: "LWG Gold Rated",
    certEdition: "Environmental Responsibility · 2025",
    certPoint1: "Gold rating awarded by the Leather Working Group (LWG).",
    certPoint2:
      "Ongoing commitment to improving environmental performance and production processes.",
    certFooter: "LWG Gold Certification",
    certCta: "View More",
    ctaFinalTitle: "Looking for a specific leather?",
    ctaFinalText:
      "Our commercial and technical team is available to find the right solution for your project and to develop articles according to your needs.",
    ctaFinalBtnContact: "Get in Touch",
    ctaFinalBtnCatalog: "View the Articles",
  },
};

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const origin: [number, number] = [-8.2245, 39.3999];

const destinations = [
  { name: "Espanha", coordinates: [-3.7492, 40.4637] as [number, number] },
  { name: "França", coordinates: [2.2137, 46.2276] as [number, number] },
  { name: "Reino Unido", coordinates: [-3.4359, 55.3781] as [number, number] },
  { name: "Alemanha", coordinates: [10.4515, 51.1656] as [number, number] },
  { name: "Itália", coordinates: [12.5673, 41.8719] as [number, number] },
  { name: "Suécia", coordinates: [18.6435, 60.1281] as [number, number] },
  { name: "Holanda", coordinates: [5.2913, 52.1326] as [number, number] },
  { name: "Roménia", coordinates: [24.9667, 45.9431] as [number, number] },
  { name: "Marrocos", coordinates: [-7.0926, 31.7917] as [number, number] },
  {
    name: "Estados Unidos",
    coordinates: [-95.7128, 37.0902] as [number, number],
  },
  { name: "Índia", coordinates: [78.9628, 20.5936] as [number, number] },
  { name: "China", coordinates: [104.1953, 35.8616] as [number, number] },
  { name: "Vietname", coordinates: [108.2021, 14.0583] as [number, number] },
];

export function Home() {
  const { language } = useLanguage();
  const data = content[language];

  const [destaques, setDestaques] = useState<ArtigoDestaque[]>([]);

  const [rotation, setRotation] = useState<[number, number, number]>([
    0, -20, 0,
  ]);
  const requestRef = useRef<number>(0);

  const globeRef = useRef(null);
  const isGlobeInView = useInView(globeRef, { margin: "200px" });

  // Os destaques são artigos reais escolhidos na dashboard (coluna `destaque`).
  // Enquanto essa coluna não existir na base de dados, mostra os 3 mais recentes.
  useEffect(() => {
    const COLUNAS = "id, referencia, categoria, titulo_pt, titulo_en, imagem_url";

    const fetchDestaques = async () => {
      const marcados = await supabase
        .from("artigos")
        .select(COLUNAS)
        .eq("destaque", true)
        .order("created_at", { ascending: false })
        .limit(3);

      if (!marcados.error && marcados.data?.length) {
        setDestaques(marcados.data as ArtigoDestaque[]);
        return;
      }

      if (marcados.error) {
        console.warn(
          "Coluna `destaque` indisponível, a usar os artigos mais recentes:",
          marcados.error.message
        );
      }

      const recentes = await supabase
        .from("artigos")
        .select(COLUNAS)
        .order("created_at", { ascending: false })
        .limit(3);

      if (recentes.error) {
        console.error("Erro ao carregar artigos em destaque:", recentes.error);
        return;
      }
      if (recentes.data) setDestaques(recentes.data as ArtigoDestaque[]);
    };

    fetchDestaques();
  }, []);

  useEffect(() => {
    if (!isGlobeInView) return;

    let lastTime = performance.now();
    const fpsInterval = 1000 / 30;

    const rotate = (currentTime: number) => {
      requestRef.current = requestAnimationFrame(rotate);

      const elapsed = currentTime - lastTime;

      if (elapsed > fpsInterval) {
        lastTime = currentTime - (elapsed % fpsInterval);

        setRotation((prevRotation) => {
          const currentLong = prevRotation[0] % 360;
          const speed = 0.5 - 0.4 * Math.cos((currentLong * Math.PI) / 180);
          return [prevRotation[0] + speed, prevRotation[1], prevRotation[2]];
        });
      }
    };

    requestRef.current = requestAnimationFrame(rotate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isGlobeInView]);

  return (
    <div className="w-full flex flex-col bg-[#F8FAFC]">
      <style>{`
        @keyframes flowLine {
          to { stroke-dashoffset: -24; }
        }
        .anim-line {
          stroke-dasharray: 4 8;
          animation: flowLine 1.5s linear infinite;
        }
      `}</style>

      {/*
        =========================================================================
        1. HERO SECTION COM VÍDEO
        =========================================================================
      */}
      <section className="relative h-screen min-h-[650px] w-full overflow-hidden flex items-center justify-center bg-institucional-blue z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none"
        >
          <source src="/videos/curtumesiberia.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-institucional-blue/35 mix-blend-multiply pointer-events-none"></div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-12 md:mt-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="relative inline-flex flex-col items-end">
              <h1 className="font-title font-bold text-6xl md:text-8xl lg:text-[9.5rem] text-white uppercase tracking-wider leading-none drop-shadow-2xl text-left min-h-[3em]">
                <RevealText text={`ALL\nABOUT\nLEATHER`} stagger={0.18} duration={1.1} />
              </h1>
              <span className="font-title font-medium text-white/80 text-xl md:text-3xl tracking-widest mt-2 md:-mt-3 mr-2 drop-shadow-md">
                <RevealText text="Since 1963" delay={2500} duration={1} />
              </span>
            </div>
          </motion.div>
        </div>

        {/* Seta suave a indicar scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
        >
          <svg
            className="w-6 h-6 text-white/60 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </section>

      {/*
        =========================================================================
        2. FAIXA DE MÉTRICAS (EDITORIAL, SEM CARTÕES)
        =========================================================================
      */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-200 relative z-10 w-full">
        <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 lg:gap-x-16">
            {data.stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  display={stat.display}
                  text={stat.label}
                  sub={stat.sub}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/*
        =========================================================================
        3. ARTIGOS EM DESTAQUE (ARTIGOS REAIS DO CATÁLOGO, FOTOS GRANDES)
        =========================================================================
      */}
      {destaques.length > 0 && (
        <section className="py-16 md:py-20 px-6 max-w-[1500px] mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl sm:text-4xl font-title font-bold text-institucional-blue uppercase tracking-tight mb-3"
              >
                {data.featuredTitle}
              </motion.h2>
              <p className="text-gray-600 text-base md:text-lg font-light leading-relaxed">
                {data.featuredSubtitle}
              </p>
            </div>

            <Link
              to="/catalogo"
              className="inline-flex items-center gap-3 text-institucional-blue font-bold uppercase tracking-[0.2em] text-xs border-b-2 border-institucional-blue pb-2 hover:gap-4 transition-all self-start md:self-auto whitespace-nowrap"
            >
              <span>{data.viewAllCatalog}</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {destaques.map((artigo, idx) => (
              <motion.div
                key={artigo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
              >
                <Link to={`/produto/${artigo.id}`} className="group block">
                  <div className="relative w-full h-[280px] md:h-[360px] overflow-hidden bg-slate-100">
                    <img
                      src={artigo.imagem_url}
                      alt={language === "PT" ? artigo.titulo_pt : artigo.titulo_en}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                      loading="lazy"
                    />
                  </div>

                  <div className="pt-5 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.25em] mb-1.5">
                        {labelCategoria(artigo.categoria, language)}
                      </p>
                      <h3 className="text-xl md:text-2xl font-title font-bold text-institucional-blue uppercase tracking-tight">
                        {language === "PT" ? artigo.titulo_pt : artigo.titulo_en}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-institucional-blue whitespace-nowrap pt-1.5 group-hover:gap-3 transition-all">
                      <span>{data.featuredCta}</span>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/*
        =========================================================================
        4. ALL ABOUT LEATHER. SINCE 1963.
        =========================================================================
      */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-24 md:py-32 px-6 relative overflow-hidden bg-white border-y border-gray-200"
      >
        <div className="max-w-[1500px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div>
            <h2 className="font-title font-bold text-institucional-blue text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight mb-10 leading-[1.05]">
              {data.missionTitle}
            </h2>
            <div className="space-y-6 mb-10">
              {data.missionText.map((p, i) => (
                <p key={i} className="text-lg leading-relaxed text-gray-600 font-light">
                  {p}
                </p>
              ))}
            </div>
            <Link
              to="/historia"
              className="inline-flex items-center gap-3 text-institucional-blue hover:gap-4 font-bold uppercase tracking-[0.2em] text-xs border-b-2 border-institucional-blue pb-2 transition-all"
            >
              <span>{data.missionBtn}</span>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          {/* Destaque visual da fábrica — uma única imagem grande, sem moldura */}
          <div className="relative w-full overflow-hidden group">
            <img
              src="/imagens/fotos/Curtumes_Iberia_23.JPG"
              alt="Produção Curtumes Ibéria"
              className="w-full h-[420px] sm:h-[560px] lg:h-[680px] object-cover transform transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </div>
        </div>
      </motion.section>

      {/*
        =========================================================================
        5. DE PORTUGAL PARA O MUNDO (GLOBO INTERATIVO)
        =========================================================================
      */}
      <section className="w-full relative bg-institucional-blue py-24 overflow-hidden border-t border-blue-900 shadow-inner">
        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-12 md:mb-16 pointer-events-none"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-title font-bold text-white uppercase tracking-tight mb-4 drop-shadow-md">
              {data.globalTitle}
            </h2>
            <p className="text-blue-50 text-lg md:text-xl font-light drop-shadow-sm">
              {data.globalText}
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center justify-between w-full">
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
              className="w-full lg:w-1/4 order-2 lg:order-1 text-center lg:text-right mt-8 lg:mt-0 px-4 relative z-20 pointer-events-none"
            >
              <h3 className="text-white font-title font-bold text-xl uppercase tracking-[0.2em] mb-4">
                {data.globeTitleLeft}
              </h3>
              <div className="w-12 h-px bg-blue-400 mx-auto lg:ml-auto lg:mr-0 mb-6 opacity-70"></div>
              <p className="text-blue-50 text-base md:text-lg leading-relaxed font-light">
                {data.globeTextLeft}
              </p>
            </motion.div>

            <div
              ref={globeRef}
              className="w-full lg:w-1/2 max-w-2xl h-[400px] md:h-[500px] relative pointer-events-none flex justify-center items-center order-1 lg:order-2 z-0 -my-8 md:-my-12"
            >
              <div className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-blue-500/20 blur-[80px] z-0"></div>

              <ComposableMap
                projection="geoOrthographic"
                projectionConfig={{ scale: 220, rotate: rotation }}
                className="w-full h-full relative z-10 opacity-90 pointer-events-none"
              >
                <circle
                  cx={400}
                  cy={300}
                  r={220}
                  fill="#00183A"
                  stroke="#ffffff"
                  strokeWidth={0.5}
                  strokeOpacity={0.1}
                />

                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="#F8FAFC"
                        fillOpacity={0.15}
                        stroke="#ffffff"
                        strokeWidth={0.5}
                        style={{
                          default: { outline: "none" },
                          hover: { outline: "none" },
                          pressed: { outline: "none" },
                        }}
                      />
                    ))
                  }
                </Geographies>

                {destinations.map((dest, i) => (
                  <Line
                    key={`line-${i}`}
                    from={origin}
                    to={dest.coordinates}
                    stroke="#60A5FA"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    className="anim-line pointer-events-none"
                    style={{
                      filter: "drop-shadow(0 0 4px rgba(96, 165, 250, 0.6))",
                    }}
                  />
                ))}

                {destinations.map((dest, i) => (
                  <Marker
                    key={`marker-${i}`}
                    coordinates={dest.coordinates}
                    className="pointer-events-none"
                  >
                    <circle r={2} fill="#93C5FD" opacity={0.9} />
                  </Marker>
                ))}

                <Marker coordinates={origin} className="pointer-events-none">
                  <circle
                    r={6}
                    fill="#ffffff"
                    opacity={0.3}
                    className="animate-ping"
                  />
                  <circle r={3} fill="#ffffff" />
                </Marker>
              </ComposableMap>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
              className="w-full lg:w-1/4 order-3 lg:order-3 text-center lg:text-left mt-8 lg:mt-0 px-4 relative z-20 pointer-events-none"
            >
              <h3 className="text-white font-title font-bold text-xl uppercase tracking-[0.2em] mb-4">
                {data.globeTitleRight}
              </h3>
              <div className="w-12 h-px bg-blue-400 mx-auto lg:mr-auto lg:ml-0 mb-6 opacity-70"></div>
              <p className="text-blue-50 text-base md:text-lg leading-relaxed font-light">
                {data.globeTextRight}
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
            className="relative z-30 mt-12 md:mt-16 text-center"
          >
            <Link
              to="/historia"
              className="pointer-events-auto inline-flex items-center gap-3 justify-center px-10 py-4 border border-white/40 hover:bg-white hover:text-institucional-blue text-white font-bold uppercase tracking-[0.2em] text-xs transition-all duration-300"
            >
              {data.globalBtn}
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/*
        =========================================================================
        6. LEATHER WORKING GROUP — BLOCO ÚNICO A OCUPAR TUDO
        =========================================================================
      */}
      <section className="py-20 md:py-24 px-6 bg-[#F8FAFC]">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="max-w-[1500px] mx-auto bg-institucional-blue text-white overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Visual */}
            <div className="relative min-h-[420px] md:min-h-[520px] lg:min-h-[620px] bg-[#06182c]">
              <img
                src="/tour/DSCF9337.webp"
                alt="Produção Curtumes Ibéria"
                className="absolute inset-0 w-full h-full object-cover opacity-40"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center p-6 md:p-10">
                <img
                  src="/logos/CUR224.png"
                  alt="LWG Gold Rated"
                  className="w-64 h-64 md:w-[22rem] md:h-[22rem] lg:w-[26rem] lg:h-[26rem] max-w-full max-h-full object-contain drop-shadow-2xl"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Conteúdo */}
            <div className="p-10 md:p-16 lg:p-20 flex flex-col justify-center">
              <span className="text-[11px] font-bold tracking-[0.3em] text-blue-300 uppercase mb-4">
                {data.certCategory}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-title font-bold text-white uppercase tracking-tight leading-[1.05] mb-3">
                {data.certTitle}
              </h2>
              <span className="text-sm md:text-base text-cyan-300 font-medium mb-10 block">
                {data.certEdition}
              </span>

              <div className="space-y-5 mb-12">
                {[data.certPoint1, data.certPoint2].map((point, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <svg
                      className="w-5 h-5 text-cyan-300 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <p className="text-base md:text-lg text-blue-50 leading-relaxed font-light">
                      {point}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-white/20">
                <span className="text-xs uppercase tracking-[0.2em] text-blue-200 font-bold">
                  {data.certFooter}
                </span>
                <Link
                  to="/sustentabilidade"
                  className="inline-flex items-center gap-3 text-white hover:gap-4 font-bold uppercase tracking-[0.2em] text-xs border-b-2 border-white pb-2 transition-all"
                >
                  <span>{data.certCta}</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/*
        =========================================================================
        7. GALERIA MARQUEE INFINITA (VISITA VISUAL)
        =========================================================================
      */}
      <GalleryMarquee />

      {/*
        =========================================================================
        8. SECÇÃO FINAL DE CONVERSÃO B2B
        =========================================================================
      */}
      <section className="py-24 md:py-32 px-6 bg-institucional-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-institucional-blue to-blue-900 opacity-90"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-title font-bold uppercase tracking-tight drop-shadow-md"
          >
            {data.ctaFinalTitle}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg sm:text-xl text-blue-100 font-light max-w-3xl mx-auto leading-relaxed"
          >
            {data.ctaFinalText}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <Link
              to="/contactos"
              className="w-full sm:w-auto px-10 py-4 bg-white text-institucional-blue hover:bg-blue-50 font-bold uppercase tracking-[0.2em] text-xs transition-colors"
            >
              {data.ctaFinalBtnContact}
            </Link>
            <Link
              to="/catalogo"
              className="w-full sm:w-auto px-10 py-4 border border-white/40 hover:bg-white hover:text-institucional-blue text-white font-bold uppercase tracking-[0.2em] text-xs transition-all duration-300"
            >
              {data.ctaFinalBtnCatalog}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
