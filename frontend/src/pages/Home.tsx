import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, useInView } from 'framer-motion';
import { ComposableMap, Geographies, Geography, Line, Marker } from 'react-simple-maps';
import { GalleryMarquee } from '../components/ui/GalleryMarquee';
import { TypewriterText } from '../components/ui/TypewriterText';

const content = {
  PT: {
    heroCtaCatalog: "Explorar Catálogo",
    heroCtaHistory: "A Nossa História",
    stats: [
      { number: "55+", label: "Anos de Tradição", sub: "Desde 1963 no setor" },
      { number: "LWG", label: "Medalha de Ouro", sub: "Classificação ambiental máxima" },
      { number: "100%", label: "Energia Renovável", sub: "Produção sustentável" },
      { number: "13+", label: "Países de Exportação", sub: "Alcance mundial" }
    ],
    collectionsTitle: "Coleções em Destaque",
    collectionsSubtitle: "Peles de qualidade superior desenvolvidas para as exigências do calçado e marroquinaria de luxo.",
    collections: [
      {
        title: "Artigos Hidrofugados",
        desc: "Máxima resistência à água sem comprometer a flexibilidade e a respirabilidade.",
        image: "/tour/DSCF9039.webp",
        tag: "Impermeabilidade"
      },
      {
        title: "Napas & Anilinas",
        desc: "Toque natural, suavidade excecional e acabamento nobre para alta-costura.",
        image: "/tour/DSCF9217.webp",
        tag: "Toque Nobre"
      },
      {
        title: "Camurças & Nubucks",
        desc: "Textura aveludada e consistência de cor perfeita para coleções contemporâneas.",
        image: "/tour/DSCF9288.webp",
        tag: "Aveludado"
      },
      {
        title: "Ceras, Óleos & Fantasia",
        desc: "Efeitos visuais marcantes com acabamentos artesanais e tecnologia inovadora.",
        image: "/tour/DSCF9306.webp",
        tag: "Inovação"
      }
    ],
    viewAllCatalog: "Ver Todos os Artigos",
    missionTitle: "Um Legado de Excelência",
    missionText: "Desde 1963 que a Curtumes Ibéria se dedica a transformar matéria-prima num material durável e de elevado valor acrescentado. Integrados num modelo de economia circular, aliamos o nosso conhecimento técnico à inovação tecnológica para entregar couro da máxima qualidade, sempre com o mais alto rigor e compromisso ambiental.",
    missionBtn: "Conhecer a Nossa História",
    globalTitle: "Presença Global",
    globalText: "Mais de 60 anos a exportar qualidade portuguesa para o mundo.",
    globalBtn: "Ver Presença Internacional",
    globeTextLeft: "Da tradição ibérica para a alta-costura. Os nossos couros marcam forte presença nos exigentes pólos de calçado em Espanha, vestindo também a elegância singular de mercados como França, Itália e Reino Unido.",
    globeTextRight: "A atravessar oceanos para calçar o mundo. A nossa qualidade superior chega às exigentes linhas de produção da Índia e do Vietname, respondendo com excelência à rigorosa procura dos Estados Unidos.",
    susTitle: "Compromisso Ambiental & LWG Gold",
    susSubtitle: "Integramos a economia circular com certificação Gold do Leather Working Group e 100% de energias renováveis.",
    susBtn: "Saber Mais sobre Sustentabilidade",
    ctaFinalTitle: "Pronto para dar vida à sua próxima coleção?",
    ctaFinalText: "A nossa equipa comercial e técnica está pronta para responder às suas especificações com amostras personalizadas e consultoria especializada.",
    ctaFinalBtnContact: "Entrar em Contacto",
    ctaFinalBtnCatalog: "Explorar o Catálogo"
  },
  EN: {
    heroCtaCatalog: "Explore Catalog",
    heroCtaHistory: "Our Legacy",
    stats: [
      { number: "55+", label: "Years of Tradition", sub: "Since 1963 in the industry" },
      { number: "LWG", label: "Gold Rated Member", sub: "Top environmental rating" },
      { number: "100%", label: "Green Energy", sub: "Sustainable production" },
      { number: "13+", label: "Export Markets", sub: "Global worldwide reach" }
    ],
    collectionsTitle: "Featured Collections",
    collectionsSubtitle: "Superior quality leathers tailored to the demanding requirements of luxury footwear and leather goods.",
    collections: [
      {
        title: "Waterproof Leathers",
        desc: "Maximum water resistance while retaining premium breathability and softness.",
        image: "/tour/DSCF9039.webp",
        tag: "Water Repellent"
      },
      {
        title: "Nappas & Anilines",
        desc: "Natural feel, exceptional softness and exquisite finish for haute-couture.",
        image: "/tour/DSCF9217.webp",
        tag: "Natural Touch"
      },
      {
        title: "Suedes & Nubucks",
        desc: "Velvety texture and outstanding color consistency for contemporary collections.",
        image: "/tour/DSCF9288.webp",
        tag: "Velvet Feel"
      },
      {
        title: "Waxes, Oils & Fantasy",
        desc: "Striking visual effects with artisanal craftsmanship and state-of-the-art innovation.",
        image: "/tour/DSCF9306.webp",
        tag: "Innovation"
      }
    ],
    viewAllCatalog: "View All Products",
    missionTitle: "A Legacy of Excellence",
    missionText: "Since 1963, Curtumes Ibéria has been dedicated to transforming raw materials into durable, high-value products. Operating within a circular economy model, we combine our technical expertise with technological innovation to deliver leather of the highest quality, always with the utmost rigor and environmental commitment.",
    missionBtn: "Discover Our History",
    globalTitle: "Global Presence",
    globalText: "Over 60 years exporting Portuguese quality to the world.",
    globalBtn: "View International Reach",
    globeTextLeft: "From Iberian tradition to haute couture. Our leathers have a strong presence in Spain's demanding footwear hubs, also dressing the singular elegance of markets like France, Italy, and the United Kingdom.",
    globeTextRight: "Crossing oceans to shoe the world. Our premium quality reaches the demanding production lines of India and Vietnam, responding with excellence to the rigorous requirements of the United States.",
    susTitle: "Environmental Commitment & LWG Gold",
    susSubtitle: "We champion the circular economy with Gold Rating certification by the Leather Working Group and 100% renewable energy.",
    susBtn: "Learn More About Sustainability",
    ctaFinalTitle: "Ready to bring your next collection to life?",
    ctaFinalText: "Our commercial and technical team is ready to assist your exact specifications with customized samples and dedicated consulting.",
    ctaFinalBtnContact: "Get in Touch",
    ctaFinalBtnCatalog: "Explore the Catalog"
  }
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
  { name: "Estados Unidos", coordinates: [-95.7128, 37.0902] as [number, number] },
  { name: "Índia", coordinates: [78.9628, 20.5936] as [number, number] },
  { name: "China", coordinates: [104.1953, 35.8616] as [number, number] },
  { name: "Vietname", coordinates: [108.2021, 14.0583] as [number, number] }
];

export function Home() {
  const { language } = useLanguage();
  const data = content[language];
  
  const [rotation, setRotation] = useState<[number, number, number]>([0, -20, 0]);
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
          const speed = 0.5 - 0.40 * Math.cos((currentLong * Math.PI) / 180);
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
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none">
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

          {/* Botões de Ação Imediata no Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 z-20"
          >
            <Link
              to="/catalogo"
              className="px-8 py-4 bg-white text-institucional-blue hover:bg-blue-50 font-bold uppercase tracking-wider text-sm rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 group"
            >
              <span>{data.heroCtaCatalog}</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <Link
              to="/historia"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/30 font-bold uppercase tracking-wider text-sm rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              {data.heroCtaHistory}
            </Link>
          </motion.div>
        </div>
        
        {/* Seta suave a indicar scroll */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
        >
          <svg className="w-6 h-6 text-white/60 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* 
        =========================================================================
        2. FAIXA DE MÉTRICAS & CONFIANÇA (TRUST BADGES)
        ========================================================================= 
      */}
      <section className="relative z-20 -mt-10 sm:-mt-14 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
          {data.stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`flex flex-col items-center text-center ${idx > 0 ? 'pt-4 sm:pt-0' : ''}`}
            >
              <span className="text-3xl sm:text-4xl font-title font-bold text-institucional-blue mb-1">
                {stat.number}
              </span>
              <span className="text-sm sm:text-base font-bold text-gray-800">
                {stat.label}
              </span>
              <span className="text-xs text-gray-500 mt-0.5">
                {stat.sub}
              </span>
            </motion.div>
          ))}
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
                to="/catalogo"
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
                    <span>{language === 'PT' ? 'Ver no Catálogo' : 'View in Catalog'}</span>
                    <svg className="w-4 h-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
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
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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

            <div ref={globeRef} className="w-full lg:w-1/2 max-w-2xl h-[400px] md:h-[500px] relative pointer-events-none flex justify-center items-center order-1 lg:order-2 z-0 -my-8 md:-my-12">
              <div className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-blue-500/20 blur-[80px] z-0"></div>

              <ComposableMap 
                projection="geoOrthographic" 
                projectionConfig={{ scale: 220, rotate: rotation }}
                className="w-full h-full relative z-10 opacity-90 pointer-events-none"
              >
                <circle cx={400} cy={300} r={220} fill="#00183A" stroke="#ffffff" strokeWidth={0.5} strokeOpacity={0.1} />
                
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
                    style={{ filter: "drop-shadow(0 0 4px rgba(96, 165, 250, 0.6))" }}
                  />
                ))}

                {destinations.map((dest, i) => (
                  <Marker key={`marker-${i}`} coordinates={dest.coordinates} className="pointer-events-none">
                    <circle r={2} fill="#93C5FD" opacity={0.9} />
                  </Marker>
                ))}

                <Marker coordinates={origin} className="pointer-events-none">
                  <circle r={6} fill="#ffffff" opacity={0.3} className="animate-ping" />
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
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>

        </div>
      </section>

      {/* 
        =========================================================================
        6. DESTAQUE DE SUSTENTABILIDADE & LWG GOLD
        ========================================================================= 
      */}
      <section className="py-24 px-6 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-gray-100 shadow-md relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16"
          >
            <div className="w-full lg:w-7/12 space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-institucional-blue text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-institucional-blue"></span>
                {language === 'PT' ? 'Economia Circular & Ética' : 'Circular Economy & Ethics'}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-title font-bold text-institucional-blue tracking-tight">
                {data.susTitle}
              </h2>
              <p className="text-gray-600 text-base sm:text-lg font-light leading-relaxed max-w-2xl">
                {data.susSubtitle}
              </p>
              <div>
                <Link
                  to="/sustentabilidade"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-institucional-blue hover:bg-blue-900 text-white font-bold uppercase tracking-wider text-sm rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <span>{data.susBtn}</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="w-full lg:w-5/12 flex justify-center">
              <div className="w-48 sm:w-60 aspect-square bg-slate-50 border border-slate-100 rounded-3xl p-6 flex items-center justify-center shadow-inner">
                <img 
                  src="/LWG_temp.jpeg" 
                  alt="LWG Gold Rating" 
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
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