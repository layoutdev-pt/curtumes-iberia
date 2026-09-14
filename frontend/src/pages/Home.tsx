import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, useInView } from 'framer-motion';
import { ComposableMap, Geographies, Geography, Line, Marker } from 'react-simple-maps';
import { GalleryMarquee } from '../components/ui/GalleryMarquee';

const content = {
  PT: {
    missionTitle: "Um Legado de Excelência",
    missionText: "Desde 1963 que a Curtumes Ibéria se dedica a transformar matéria-prima num material durável e de elevado valor acrescentado. Integrados num modelo de economia circular, aliamos o nosso conhecimento técnico à inovação tecnológica para entregar couro da máxima qualidade, sempre com o mais alto rigor e compromisso ambiental.",
    ctaCatalogTitle: "Catálogo de Artigos",
    ctaCatalogText: "Descubra a nossa gama de peles Chrome Free, Hidrofugadas e artigos técnicos para marroquinaria e calçado.",
    ctaCatalogBtn: "Explorar Catálogo",
    ctaSusTitle: "Compromisso Ambiental",
    ctaSusText: "Conheça a nossa certificação LWG Gold, pilar da nossa integração na economia circular.",
    ctaSusBtn: "Ler sobre Sustentabilidade",
    globalTitle: "Presença Global",
    globalText: "Mais de 60 anos a exportar qualidade portuguesa para o mundo.",
    globalBtn: "Conhecer a Nossa História",
    globeTextLeft: "Da tradição ibérica para a alta-costura. Os nossos couros marcam forte presença nos exigentes pólos de calçado em Espanha, vestindo também a elegância singular de mercados como França, Itália e Reino Unido.",
    globeTextRight: "A atravessar oceanos para calçar o mundo. A nossa qualidade superior chega às exigentes linhas de produção da Índia e do Vietname, respondendo com excelência à rigorosa procura dos Estados Unidos."
  },
  EN: {
    missionTitle: "A Legacy of Excellence",
    missionText: "Since 1963, Curtumes Ibéria has been dedicated to transforming raw materials into durable, high-value products. Operating within a circular economy model, we combine our technical expertise with technological innovation to deliver leather of the highest quality, always with the utmost rigor and environmental commitment.",
    ctaCatalogTitle: "Leather Catalog",
    ctaCatalogText: "Discover our range of Chrome Free, Waterproof leathers, and technical articles for footwear and leather goods.",
    ctaCatalogBtn: "Explore Catalog",
    ctaSusTitle: "Environmental Commitment",
    ctaSusText: "Learn about our LWG Gold certification, the pillar of our integration into the circular economy.",
    ctaSusBtn: "Read about Sustainability",
    globalTitle: "Global Presence",
    globalText: "Over 60 years exporting Portuguese quality to the world.",
    globalBtn: "Discover Our History",
    globeTextLeft: "From Iberian tradition to haute couture. Our leathers have a strong presence in Spain's demanding footwear hubs, also dressing the singular elegance of markets like France, Italy, and the United Kingdom.",
    globeTextRight: "Crossing oceans to shoe the world. Our premium quality reaches the demanding production lines of India and Vietnam, responding with excellence to the rigorous requirements of the United States."
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

    // LÓGICA DE PERFORMANCE: Limitar o mapa a ~30 FPS para evitar bloqueio do React
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

      {/* 1. HERO SECTION */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-institucional-blue z-0">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none">
          <source src="/videos/curtumesiberia.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-institucional-blue/30 mix-blend-multiply pointer-events-none"></div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          className="relative text-center px-4 mt-16 pointer-events-none"
        >
          <div className="relative inline-flex flex-col items-end">
            <h1 className="font-title font-bold text-6xl md:text-8xl lg:text-[10rem] text-white uppercase tracking-wider leading-none drop-shadow-lg text-left">
              All <br /> About <br /> Leather
            </h1>
            <span className="font-title font-medium text-white/75 text-2xl md:text-4xl tracking-widest mt-2 md:-mt-4 mr-2 drop-shadow-md">
              Since 1963
            </span>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
        >
          <svg className="w-8 h-8 text-white/70 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* 2. SECÇÃO DE MISSÃO COM DESTAQUE VISUAL DA FÁBRICA */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-24 md:py-32 px-6 relative overflow-hidden bg-white"
      >
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
          <div className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full bg-gradient-to-bl from-blue-50 to-transparent blur-3xl"></div>
          <svg className="absolute -bottom-20 -left-20 w-[500px] h-[500px] text-institucional-blue/5 -rotate-12" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M45.7,-76.4C58.9,-69.3,69.1,-55.4,78.2,-41.1C87.3,-26.8,95.3,-12.1,94.2,2C93.1,16.1,82.8,29.6,72.4,41.4C62,53.2,51.5,63.3,39,70.5C26.5,77.7,11.9,82,-3.1,87C-18.1,92,-33.5,77.7,-46.8,68.2C-60.1,58.7,-71.3,44.1,-77.6,28.1C-83.9,12.1,-85.3,-5.3,-79.8,-20.1C-74.3,-34.9,-61.9,-47.1,-48.5,-54.6C-35.1,-62.1,-20.7,-64.9,-4.9,-56.9C10.9,-48.9,21.8,-30.1,32.4,-83.4Z" transform="translate(100 100)" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Texto de Missão */}
          <div>
            <h2 className="font-title font-bold text-institucional-blue text-4xl md:text-5xl mb-6">
              {data.missionTitle}
            </h2>
            <div className="w-16 h-1 bg-institucional-blue mb-8"></div>
            <p className="text-lg leading-relaxed text-gray-600 font-medium">
              {data.missionText}
            </p>
          </div>

          {/* Destaque Visual - Modo de Trabalho / Fábrica */}
          <div className="grid grid-cols-2 gap-4 h-full relative">
            <div className="flex flex-col justify-end">
              <img 
                src="/imagens/fotos/Curtumes_Iberia_20.JPG" 
                alt="Instalações Curtumes Ibéria" 
                className="rounded-2xl shadow-lg w-full h-48 md:h-64 object-cover hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
            <div className="flex flex-col justify-start mt-8 md:mt-12">
              <img 
                src="/imagens/fotos/Curtumes_Iberia_23.JPG" 
                alt="Modo de produção Curtumes Ibéria" 
                className="rounded-2xl shadow-lg w-full h-56 md:h-72 object-cover hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3. SECÇÃO GLOBO DE PRESENÇA MUNDIAL */}
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
            <p className="text-white text-lg font-medium drop-shadow-sm">
              {data.globalText}
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center justify-between w-full">
            
            <motion.div 
              initial={{ opacity: 0, x: 200 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 1.5 }}
              className="w-full lg:w-1/4 order-2 lg:order-1 text-center lg:text-right mt-8 lg:mt-0 px-4 relative z-20 pointer-events-none"
            >
              <div className="w-12 h-1 bg-blue-400 mx-auto lg:ml-auto lg:mr-0 mb-6 opacity-70"></div>
              <p className="text-blue-50 text-base md:text-lg leading-relaxed font-medium">
                {data.globeTextLeft}
              </p>
            </motion.div>

            <div ref={globeRef} className="w-full lg:w-1/2 max-w-2xl h-[400px] md:h-[500px] relative pointer-events-none flex justify-center items-center order-1 lg:order-2 z-0 -my-8 md:-my-12">
              <div className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-blue-500/20 blur-[80px] z-0"></div>

              {/* TS FIX: Classe padrão Tailwind substitui objetos incorretos em style */}
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
              initial={{ opacity: 0, x: -200 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.1, ease: "easeOut", delay: 1 }}
              className="w-full lg:w-1/4 order-3 lg:order-3 text-center lg:text-left mt-8 lg:mt-0 px-4 relative z-20 pointer-events-none"
            >
              <div className="w-12 h-1 bg-blue-400 mx-auto lg:mr-auto lg:ml-0 mb-6 opacity-70"></div>
              <p className="text-blue-50 text-base md:text-lg leading-relaxed font-medium">
                {data.globeTextRight}
              </p>
            </motion.div>

          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 2.2 }}
            className="relative z-30 mt-12 md:mt-16 text-center"
          >
            <Link 
              to="/historia" 
              className="pointer-events-auto inline-flex items-center justify-center px-8 py-3.5 border border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded font-bold uppercase tracking-wider text-sm transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {data.globalBtn}
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>

        </div>
      </section>

      {/* GALERIA ANIMADA (NOVA INJEÇÃO VISUAL) */}
      <GalleryMarquee />

      {/* 4. SECÇÃO DE NAVEGAÇÃO B2B */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        className="py-20 px-6 bg-[#F8FAFC]"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 group hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-0 transition-transform duration-500 group-hover:scale-125"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-title font-bold text-institucional-blue mb-4">{data.ctaCatalogTitle}</h3>
              <p className="text-gray-600 mb-10 leading-relaxed">{data.ctaCatalogText}</p>
            </div>
            <Link to="/catalogo" className="relative z-10 inline-flex items-center text-sm font-bold text-institucional-blue uppercase tracking-wider group-hover:text-blue-600 transition-colors">
              {data.ctaCatalogBtn}
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="bg-institucional-blue p-10 rounded-2xl shadow-sm border border-blue-900 group hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -z-0 transition-transform duration-500 group-hover:scale-125"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-title font-bold text-white mb-4">{data.ctaSusTitle}</h3>
              <p className="text-blue-100 mb-10 leading-relaxed">{data.ctaSusText}</p>
            </div>
            <Link to="/sustentabilidade" className="relative z-10 inline-flex items-center text-sm font-bold text-white uppercase tracking-wider opacity-90 group-hover:opacity-100 transition-opacity">
              {data.ctaSusBtn}
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </motion.section>

    </div>
  );
}