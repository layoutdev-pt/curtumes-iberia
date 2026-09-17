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
import { GalleryMarquee } from "../components/ui/GalleryMarquee";
import { TypewriterText } from "../components/ui/TypewriterText";

const content = {
  PT: {
    heroCtaCatalog: "Explorar Catálogo",
    heroCtaHistory: "A Nossa História",
    stats: [
      { number: "60+", label: "Anos de Tradição", sub: "Desde 1963 no setor" },
      {
        number: "LWG",
        label: "Medalha de Ouro",
        sub: "Classificação ambiental máxima",
      },
      {
        number: "100%",
        label: "Energia Renovável",
        sub: "Produção sustentável",
      },
      { number: "13+", label: "Países de Exportação", sub: "Alcance mundial" },
    ],
    collectionsTitle: "Coleções em Destaque",
    collectionsSubtitle:
      "Peles de qualidade superior desenvolvidas para as exigências do calçado e marroquinaria de luxo.",
    collections: [
      {
        title: "Artigos Hidrofugados",
        desc: "Máxima resistência à água sem comprometer a flexibilidade e a respirabilidade.",
        image: "/tour/DSCF9039.webp",
        tag: "Impermeabilidade",
        filterId: "Hidrofugados",
      },
      {
        title: "Napas & Anilinas",
        desc: "Toque natural, suavidade excecional e acabamento nobre para alta-costura.",
        image: "/tour/DSCF9217.webp",
        tag: "Toque Nobre",
        filterId: "Napas",
      },
      {
        title: "Camurças & Nubucks",
        desc: "Textura aveludada e consistência de cor perfeita para coleções contemporâneas.",
        image: "/tour/DSCF9288.webp",
        tag: "Aveludado",
        filterId: "Camurças",
      },
      {
        title: "Ceras, Óleos & Fantasia",
        desc: "Efeitos visuais marcantes com acabamentos artesanais e tecnologia inovadora.",
        image: "/tour/DSCF9306.webp",
        tag: "Inovação",
        filterId: "Ceras e Óleos",
      },
    ],
    viewAllCatalog: "Ver Todos os Artigos",
    missionTitle: "Um Legado de Excelência",
    missionText:
      "Desde 1963 que a Curtumes Ibéria se dedica a transformar matéria-prima num material durável e de elevado valor acrescentado. Integrados num modelo de economia circular, aliamos o nosso conhecimento técnico à inovação tecnológica para entregar couro da máxima qualidade, sempre com o mais alto rigor e compromisso ambiental.",
    missionBtn: "Conhecer a Nossa História",
    globalTitle: "Presença Global",
    globalText: "Mais de 60 anos a exportar qualidade portuguesa para o mundo.",
    globalBtn: "Ver Presença Internacional",
    globeTextLeft:
      "Da tradição ibérica para a alta-costura. Os nossos couros marcam forte presença nos exigentes pólos de calçado em Espanha, vestindo também a elegância singular de mercados como França, Itália e Reino Unido.",
    globeTextRight:
      "A atravessar oceanos para calçar o mundo. A nossa qualidade superior chega às exigentes linhas de produção da Índia e do Vietname, respondendo com excelência à rigorosa procura dos Estados Unidos.",
    certTag: "Certificação Oficial",
    certCategory: "Leather Working Group",
    certTitle: "LWG Gold Rated",
    certEdition: "Excelência Ambiental · 2025",
    certPoint1:
      "100% de energia renovável e processos de curtimento em ciclo fechado.",
    certPoint2:
      "Subprodutos da indústria alimentar com rastreabilidade auditada.",
    certFooterLeft: "Membro Gold Auditado",
    certFooterRight: "Ver certificado",
    reviewsCategory: "Google Reviews",
    reviewsTitle: "Avaliação Máxima",
    reviewsSubtitle: "Nota 5.0 estrelas",
    reviewsScore: "5.0",
    reviewsPoint1:
      "Classificação máxima de 5.0 no Google por parceiros e marcas reais.",
    reviewsPoint2:
      "Fornecimento de excelência para o mercado em mais de 13 países.",
    reviewsFooterLeft: "Avaliação verificada",
    reviewsFooterRight: "GOOGLE.COM",
    ctaFinalTitle: "Pronto para dar vida à sua próxima coleção?",
    ctaFinalText:
      "A nossa equipa comercial e técnica está pronta para responder às suas especificações com amostras personalizadas e consultoria especializada.",
    ctaFinalBtnContact: "Entrar em Contacto",
    ctaFinalBtnCatalog: "Explorar o Catálogo",
  },
  EN: {
    heroCtaCatalog: "Explore Catalog",
    heroCtaHistory: "Our Legacy",
    stats: [
      {
        number: "60+",
        label: "Years of Tradition",
        sub: "Since 1963 in the industry",
      },
      {
        number: "LWG",
        label: "Gold Rated Member",
        sub: "Top environmental rating",
      },
      { number: "100%", label: "Green Energy", sub: "Sustainable production" },
      { number: "13+", label: "Export Markets", sub: "Global worldwide reach" },
    ],
    collectionsTitle: "Featured Collections",
    collectionsSubtitle:
      "Superior quality leathers tailored to the demanding requirements of luxury footwear and leather goods.",
    collections: [
      {
        title: "Waterproof Leathers",
        desc: "Maximum water resistance while retaining premium breathability and softness.",
        image: "/tour/DSCF9039.webp",
        tag: "Water Repellent",
        filterId: "Hidrofugados",
      },
      {
        title: "Nappas & Anilines",
        desc: "Natural feel, exceptional softness and exquisite finish for haute-couture.",
        image: "/tour/DSCF9217.webp",
        tag: "Natural Touch",
        filterId: "Napas",
      },
      {
        title: "Suedes & Nubucks",
        desc: "Velvety texture and outstanding color consistency for contemporary collections.",
        image: "/tour/DSCF9288.webp",
        tag: "Velvet Feel",
        filterId: "Camurças",
      },
      {
        title: "Waxes, Oils & Fantasy",
        desc: "Striking visual effects with artisanal craftsmanship and state-of-the-art innovation.",
        image: "/tour/DSCF9306.webp",
        tag: "Innovation",
        filterId: "Ceras e Óleos",
      },
    ],
    viewAllCatalog: "View All Products",
    missionTitle: "A Legacy of Excellence",
    missionText:
      "Since 1963, Curtumes Ibéria has been dedicated to transforming raw materials into durable, high-value products. Operating within a circular economy model, we combine our technical expertise with technological innovation to deliver leather of the highest quality, always with the utmost rigor and environmental commitment.",
    missionBtn: "Discover Our History",
    globalTitle: "Global Presence",
    globalText: "Over 60 years exporting Portuguese quality to the world.",
    globalBtn: "View International Reach",
    globeTextLeft:
      "From Iberian tradition to haute couture. Our leathers have a strong presence in Spain's demanding footwear hubs, also dressing the singular elegance of markets like France, Italy, and the United Kingdom.",
    globeTextRight:
      "Crossing oceans to shoe the world. Our premium quality reaches the demanding production lines of India and Vietnam, responding with excellence to the rigorous requirements of the United States.",
    certTag: "Official Certification",
    certCategory: "Leather Working Group",
    certTitle: "LWG Gold Rated",
    certEdition: "Environmental Excellence · 2025",
    certPoint1: "100% green energy and closed-loop water management.",
    certPoint2: "Food industry by-products with audited traceability.",
    certFooterLeft: "Audited Gold Member",
    certFooterRight: "View certificate",
    reviewsCategory: "Google Reviews",
    reviewsTitle: "Top Client Rating",
    reviewsSubtitle: "5.0-star rating",
    reviewsScore: "5.0",
    reviewsPoint1: "Maximum 5.0 Google rating based on authentic feedback.",
    reviewsPoint2:
      "Premium leather supply to trusted brands across 13+ countries.",
    reviewsFooterLeft: "Verified review",
    reviewsFooterRight: "GOOGLE.COM",
    ctaFinalTitle: "Ready to bring your next collection to life?",
    ctaFinalText:
      "Our commercial and technical team is ready to assist your exact specifications with customized samples and dedicated consulting.",
    ctaFinalBtnContact: "Get in Touch",
    ctaFinalBtnCatalog: "Explore the Catalog",
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

  const [rotation, setRotation] = useState<[number, number, number]>([
    0, -20, 0,
  ]);
  const requestRef = useRef<number>(0);

  const globeRef = useRef(null);
  const isGlobeInView = useInView(globeRef, { margin: "200px" });

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
        1. HERO SECTION COM VÍDEO E CTAS PRINCIPAIS
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
                <TypewriterText text={`ALL\nABOUT\nLEATHER`} speed={60} />
              </h1>
              <span className="font-title font-medium text-white/80 text-xl md:text-3xl tracking-widest mt-2 md:-mt-3 mr-2 drop-shadow-md">
                <TypewriterText text="Since 1963" delay={2600} speed={50} />
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
        2. FAIXA DE MÉTRICAS & CONFIANÇA (KPIS / TRUST BADGES)
        ========================================================================= 
      */}
      <section className="py-20 bg-[#F8FAFC] border-b border-gray-100/80 relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {data.stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden group flex flex-col items-center text-center"
              >
                {/* Glow decorativo suave no hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50/60 to-transparent rounded-full blur-2xl group-hover:scale-125 transition-transform pointer-events-none"></div>

                {/* Número em destaque */}
                <span className="text-4xl sm:text-5xl font-title font-bold text-institucional-blue mb-1 tracking-tight">
                  {stat.number}
                </span>

                {/* Título do KPI */}
                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-1">
                  {stat.label}
                </h3>

                {/* Subtítulo explicativo */}
                <p className="text-xs sm:text-sm text-gray-500 font-light leading-relaxed">
                  {stat.sub}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        =========================================================================
        3. MONTRA DE COLEÇÕES EM DESTAQUE (VISUAL PRODUCT DISCOVERY)
        ========================================================================= 
      */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-title font-bold text-institucional-blue mb-4"
          >
            {data.collectionsTitle}
          </motion.h2>
          <p className="text-gray-600 text-lg font-light leading-relaxed">
            {data.collectionsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {data.collections.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <Link
                to={`/catalogo?categoria=${item.filterId}`}
                className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <span className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-institucional-blue shadow-sm">
                    {item.tag}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-xl font-title font-bold text-institucional-blue mb-2 group-hover:text-blue-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed font-light mb-6">
                      {item.desc}
                    </p>
                  </div>

                  <div className="flex items-center text-xs font-bold uppercase tracking-wider text-institucional-blue group-hover:translate-x-1 transition-transform">
                    <span>
                      {language === "PT"
                        ? "Ver no Catálogo"
                        : "View in Catalog"}
                    </span>
                    <svg
                      className="w-4 h-4 ml-1.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/catalogo"
            className="inline-flex items-center gap-2 px-8 py-4 bg-institucional-blue hover:bg-blue-900 text-white font-bold uppercase tracking-wider text-sm rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <span>{data.viewAllCatalog}</span>
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
      </section>

      {/* 
        =========================================================================
        4. SECÇÃO EDITORIAL DE ARTESANATO & TRADIÇÃO
        ========================================================================= 
      */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-24 md:py-32 px-6 relative overflow-hidden bg-white border-y border-gray-100"
      >
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Texto de Missão */}
          <div>
            <h2 className="font-title font-bold text-institucional-blue text-4xl md:text-5xl mb-6">
              {data.missionTitle}
            </h2>
            <div className="w-16 h-1 bg-institucional-blue mb-8 rounded-full"></div>
            <p className="text-lg leading-relaxed text-gray-600 font-light mb-8">
              {data.missionText}
            </p>
            <Link
              to="/historia"
              className="inline-flex items-center gap-2 text-institucional-blue hover:text-blue-700 font-bold uppercase tracking-wider text-sm group"
            >
              <span>{data.missionBtn}</span>
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
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

          {/* Destaque Visual da Fábrica */}
          <div className="grid grid-cols-2 gap-4 h-full relative">
            <div className="flex flex-col justify-end">
              <img
                src="/imagens/fotos/Curtumes_Iberia_20.JPG"
                alt="Instalações Curtumes Ibéria"
                className="rounded-3xl shadow-lg w-full h-48 sm:h-64 object-cover hover:scale-[1.02] transition-transform duration-500 border border-gray-100"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col justify-start mt-8 sm:mt-12">
              <img
                src="/imagens/fotos/Curtumes_Iberia_23.JPG"
                alt="Modo de produção Curtumes Ibéria"
                className="rounded-3xl shadow-lg w-full h-56 sm:h-72 object-cover hover:scale-[1.02] transition-transform duration-500 border border-gray-100"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* 
        =========================================================================
        5. GLOBO INTERATIVO DE PRESENÇA MUNDIAL
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
            <h2 className="text-4xl md:text-5xl font-title font-bold text-white mb-4 drop-shadow-md">
              {data.globalTitle}
            </h2>
            <p className="text-white text-lg font-light drop-shadow-sm">
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
              <div className="w-12 h-1 bg-blue-400 mx-auto lg:ml-auto lg:mr-0 mb-6 opacity-70 rounded-full"></div>
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
              <div className="w-12 h-1 bg-blue-400 mx-auto lg:mr-auto lg:ml-0 mb-6 opacity-70 rounded-full"></div>
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
              className="pointer-events-auto inline-flex items-center justify-center px-8 py-3.5 border border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold uppercase tracking-wider text-sm transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {data.globalBtn}
              <svg
                className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
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
        6. DESTAQUE DUPLO: SUSTENTABILIDADE LWG GOLD & AVALIAÇÃO DE EXCELÊNCIA
        ========================================================================= 
      */}
      <section className="py-20 px-6 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            {/* Card 1: LWG Gold / Sustentabilidade */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Top Banner LWG Gold */}
              <div className="bg-gradient-to-br from-[#06182c] via-institucional-blue to-[#102d4f] p-7 sm:p-8 text-white relative overflow-hidden flex flex-col items-center text-center justify-between min-h-[210px]">
                {/* Glow decorativo suave */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl p-2 shadow-lg border border-white/20 flex items-center justify-center flex-shrink-0 relative z-10">
                  <img
                    src="/logos/CUR224.png"
                    alt="LWG Gold Rating"
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>

                <div className="mt-4 relative z-10 flex flex-col items-center">
                  <span className="text-[11px] font-bold tracking-widest text-blue-200 uppercase mb-0.5">
                    {data.certCategory}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-title font-bold text-white tracking-tight leading-tight">
                    {data.certTitle}
                  </h3>
                  <span className="text-xs sm:text-sm text-cyan-300 font-medium mt-0.5 block">
                    {data.certEdition}
                  </span>
                </div>
              </div>

              {/* Corpo com Pontos Verificados */}
              <div className="p-6 sm:p-7 space-y-3.5 flex-1 flex flex-col justify-center items-center text-center bg-white">
                <div className="flex items-center justify-center gap-2.5 text-center">
                  <div className="w-5 h-5 rounded-full bg-blue-50 text-institucional-blue flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3 h-3"
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
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed font-light">
                    {data.certPoint1}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2.5 text-center">
                  <div className="w-5 h-5 rounded-full bg-blue-50 text-institucional-blue flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed font-light">
                    {data.certPoint2}
                  </p>
                </div>
              </div>

              {/* Footer do Card */}
              <div className="border-t border-gray-100 px-6 sm:px-7 py-3.5 flex items-center justify-between text-xs text-gray-500 font-medium bg-slate-50/70">
                <span>{data.certFooterLeft}</span>
                <Link
                  to="/sustentabilidade"
                  className="inline-flex items-center gap-1.5 text-institucional-blue hover:text-blue-900 font-bold uppercase tracking-wider transition-colors"
                >
                  <span>{data.certFooterRight}</span>
                  <svg
                    className="w-3.5 h-3.5"
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
            </motion.div>

            {/* Card 2: 5.0 Google Reviews / Avaliação de Excelência */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Top Banner Reviews */}
              <div className="bg-gradient-to-br from-[#06182c] via-institucional-blue to-[#102d4f] p-7 sm:p-8 text-white relative overflow-hidden flex flex-col items-center text-center justify-between min-h-[210px]">
                {/* Glow decorativo suave */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>

                {/* Score badge com 5 estrelas */}
                <div className="bg-white text-gray-900 shadow-lg px-5 py-2 rounded-2xl flex flex-col items-center justify-center border border-white/30 relative z-10">
                  <span className="text-2xl sm:text-3xl font-title font-bold text-gray-900 leading-none">
                    {data.reviewsScore}
                  </span>
                  <div className="flex items-center gap-0.5 text-amber-400 text-xs mt-1">
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                  </div>
                </div>

                <div className="mt-4 relative z-10 flex flex-col items-center">
                  <span className="text-[11px] font-bold tracking-widest text-blue-200 uppercase mb-0.5">
                    {data.reviewsCategory}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-title font-bold text-white tracking-tight leading-tight">
                    {data.reviewsTitle}
                  </h3>
                  <span className="text-xs sm:text-sm text-cyan-300 font-medium mt-0.5 block">
                    {data.reviewsSubtitle}
                  </span>
                </div>
              </div>

              {/* Corpo com Avaliações & Feedback */}
              <div className="p-6 sm:p-7 space-y-3.5 flex-1 flex flex-col justify-center items-center text-center bg-white">
                <div className="flex items-center justify-center gap-2.5 text-center">
                  <div className="w-5 h-5 rounded-full bg-blue-50 text-institucional-blue flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3.5 h-3.5 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed font-light">
                    {data.reviewsPoint1}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2.5 text-center">
                  <div className="w-5 h-5 rounded-full bg-blue-50 text-institucional-blue flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3.5 h-3.5 fill-none"
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
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed font-light">
                    {data.reviewsPoint2}
                  </p>
                </div>
              </div>

              {/* Footer do Card */}
              <div className="border-t border-gray-100 px-6 sm:px-7 py-3.5 flex items-center justify-between text-xs text-gray-500 font-medium bg-slate-50/70">
                <span>{data.reviewsFooterLeft}</span>
                <span className="text-institucional-blue font-bold uppercase tracking-wider">
                  {data.reviewsFooterRight}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 
        =========================================================================
        7. GALERIA MARQUEE INFINITA (VISITA VISUAL)
        ========================================================================= 
      */}
      <GalleryMarquee />

      {/* 
        =========================================================================
        8. SECÇÃO FINAL DE CONVERSÃO B2B (CALL TO ACTION)
        ========================================================================= 
      */}
      <section className="py-24 px-6 bg-institucional-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-institucional-blue to-blue-900 opacity-90"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl font-title font-bold tracking-tight drop-shadow-md"
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
              className="w-full sm:w-auto px-8 py-4 bg-white text-institucional-blue hover:bg-blue-50 font-bold uppercase tracking-wider text-sm rounded-xl shadow-xl hover:shadow-2xl transition-all"
            >
              {data.ctaFinalBtnContact}
            </Link>
            <Link
              to="/catalogo"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/30 font-bold uppercase tracking-wider text-sm rounded-xl transition-all"
            >
              {data.ctaFinalBtnCatalog}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
