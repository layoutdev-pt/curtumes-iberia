import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';

const content = {
  PT: {
    missionTitle: "Um Legado de Excelência",
    missionText: "Desde 1963 que a Curtumes Ibéria se dedica a transformar matéria-prima num material durável e de elevado valor acrescentado. Integrados num modelo de economia circular, aliamos o nosso conhecimento técnico à inovação tecnológica para entregar couro da máxima qualidade, sempre com o mais alto rigor e compromisso ambiental.",
    ctaCatalogTitle: "Catálogo de Artigos",
    ctaCatalogText: "Descubra a nossa gama de peles Chrome Free, Hidrofugadas e artigos técnicos para marroquinaria e calçado.",
    ctaCatalogBtn: "Explorar Catálogo",
    ctaSusTitle: "Compromisso Ambiental",
    ctaSusText: "Conheça as nossas certificações LWG Gold e ISO 9001, pilares da nossa integração na economia circular.",
    ctaSusBtn: "Ler sobre Sustentabilidade"
  },
  EN: {
    missionTitle: "A Legacy of Excellence",
    missionText: "Since 1963, Curtumes Ibéria has been dedicated to transforming raw materials into durable, high-value products. Operating within a circular economy model, we combine our technical expertise with technological innovation to deliver leather of the highest quality, always with the utmost rigor and environmental commitment.",
    ctaCatalogTitle: "Leather Catalog",
    ctaCatalogText: "Discover our range of Chrome Free, Waterproof leathers, and technical articles for footwear and leather goods.",
    ctaCatalogBtn: "Explore Catalog",
    ctaSusTitle: "Environmental Commitment",
    ctaSusText: "Learn about our LWG Gold and ISO 9001 certifications, the pillars of our integration into the circular economy.",
    ctaSusBtn: "Read about Sustainability"
  }
};

export function Home() {
  const { language } = useLanguage();
  const data = content[language];

  return (
    <div className="w-full flex flex-col bg-[#F8FAFC]">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-institucional-blue">
        
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          <source src="/videos/curtumesiberia.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-institucional-blue/30 mix-blend-multiply"></div>

        {/* Título animado com as diretrizes tipográficas exigidas */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          className="relative z-10 text-center px-4 mt-16"
        >
          <div className="relative inline-flex flex-col items-end">
            <h1 className="font-title font-bold text-6xl md:text-8xl lg:text-[10rem] text-white uppercase tracking-wider leading-none drop-shadow-lg text-left">
              All <br />
              About <br />
              Leather
            </h1>
            <span className="font-title italic font-medium text-white/75 text-2xl md:text-4xl tracking-widest mt-2 md:-mt-4 mr-2 drop-shadow-md">
              Since 1963
            </span>
          </div>
        </motion.div>
        
        {/* Indicador de scroll animado via transform: translateY() (GPU) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
          <svg 
            className="w-8 h-8 text-white/70 animate-bounce" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* 2. SECÇÃO DE SUSTENTABILIDADE E MISSÃO (Aparece suavemente no scroll) */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-32 px-6 relative overflow-hidden bg-white"
      >
        
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
          <div className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full bg-gradient-to-bl from-blue-50 to-transparent blur-3xl"></div>
          <svg className="absolute -bottom-20 -left-20 w-[500px] h-[500px] text-institucional-blue/5 -rotate-12" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M45.7,-76.4C58.9,-69.3,69.1,-55.4,78.2,-41.1C87.3,-26.8,95.3,-12.1,94.2,2C93.1,16.1,82.8,29.6,72.4,41.4C62,53.2,51.5,63.3,39,70.5C26.5,77.7,11.9,82,-3.1,87C-18.1,92,-33.5,77.7,-46.8,68.2C-60.1,58.7,-71.3,44.1,-77.6,28.1C-83.9,12.1,-85.3,-5.3,-79.8,-20.1C-74.3,-34.9,-61.9,-47.1,-48.5,-54.6C-35.1,-62.1,-20.7,-64.9,-4.9,-56.9C10.9,-48.9,21.8,-30.1,32.4,-83.4Z" transform="translate(100 100)" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-title font-bold text-institucional-blue text-4xl md:text-5xl mb-8">
            {data.missionTitle}
          </h2>
          <div className="w-16 h-1 bg-institucional-blue mx-auto mb-8"></div>
          <p className="text-lg md:text-xl leading-relaxed text-gray-600 font-medium">
            {data.missionText}
          </p>
        </div>
      </motion.section>

      {/* 3. SECÇÃO DE NAVEGAÇÃO B2B (Aparece suavemente no scroll, logo a seguir à secção anterior) */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        className="py-20 px-6 bg-[#F8FAFC]"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card Catálogo */}
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 group hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-0 transition-transform duration-500 group-hover:scale-125"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-title font-bold text-institucional-blue mb-4">{data.ctaCatalogTitle}</h3>
              <p className="text-gray-600 mb-10 leading-relaxed">
                {data.ctaCatalogText}
              </p>
            </div>
            <Link to="/catalogo" className="relative z-10 inline-flex items-center text-sm font-bold text-institucional-blue uppercase tracking-wider group-hover:text-blue-600 transition-colors">
              {data.ctaCatalogBtn}
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Card Sustentabilidade */}
          <div className="bg-institucional-blue p-10 rounded-2xl shadow-sm border border-blue-900 group hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -z-0 transition-transform duration-500 group-hover:scale-125"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-title font-bold text-white mb-4">{data.ctaSusTitle}</h3>
              <p className="text-blue-100 mb-10 leading-relaxed">
                {data.ctaSusText}
              </p>
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