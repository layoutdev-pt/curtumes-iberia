import { useLanguage } from '../contexts/LanguageContext';
import { PageHeader } from '../components/ui/PageHeader';
import { motion } from 'framer-motion';
import { ComposableMap, Geographies, Geography, Line, Marker } from 'react-simple-maps';

const content = {
  PT: {
    title1: "A Nossa História",
    text1: "Com mais de 55 anos de experiência, a Curtumes Ibéria SA líder global na indústria do couro, focada no processo de couros bovinos para calçado e marroquinaria.",
    title2: "Inovação",
    text2a: "Ao longo dos anos, procuramos desenvolver os melhores artigos com consistência e qualidade e colocando sempre o ambiente em primeiro lugar.",
    text2b: "Apresentamos sempre aos nossos clientes as coleções mais inovadoras, trabalhando em colaboração com designers e marcas.",
    title3: "Na Vanguarda",
    text3: "Estamos constantemente a investir em novas tecnologias, máquinas e processos para melhorar os sistemas de produção e estar na vanguarda da indústria do couro.",
    salesTitle: "Presença Global",
    countries: [
      "Portugal", "Espanha", "França", "Reino Unido", "Alemanha", 
      "Itália", "Suécia", "Roménia", "Marrocos", "Estados Unidos", 
      "Índia", "China", "Vietname"
    ]
  },
  EN: {
    title1: "Our History",
    text1: "With over 55 years of experience, Curtumes Ibéria SA is a global leader in the leather industry, focused on processing bovine leathers for footwear and leather goods.",
    title2: "Innovation",
    text2a: "Over the years, we seek to develop the best articles with consistency and quality, always putting the environment first.",
    text2b: "We always present our clients with the most innovative collections, working in collaboration with designers and brands.",
    title3: "At the Forefront",
    text3: "We are constantly investing in new technologies, machinery and processes to improve production systems and stay at the forefront of the leather industry.",
    salesTitle: "Global Presence",
    countries: [
      "Portugal", "Spain", "France", "United Kingdom", "Germany", 
      "Italy", "Sweden", "Romania", "Morocco", "United States", 
      "India", "China", "Vietnam"
    ]
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

export function Historia() {
  const { language } = useLanguage();
  const data = content[language];

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-0 relative overflow-x-hidden">
      
      <style>{`
        @keyframes flowLine {
          to { stroke-dashoffset: -24; }
        }
        .anim-line {
          stroke-dasharray: 4 8;
          animation: flowLine 1.5s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-css {
          display: flex;
          width: fit-content;
          animation: marquee 35s linear infinite;
        }
      `}</style>

      {/* HEADER DINÂMICO APLICADO AQUI */}
      <PageHeader 
        title={data.title1} 
        subtitle={data.text1} 
        backgroundImage="/imagens/fotos/Curtumes_Iberia_29.JPG"
      />

      {/* Fundo Gráfico Suave */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30 mt-[50vh]">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-gradient-to-bl from-blue-100 via-transparent to-transparent blur-3xl mix-blend-multiply"></div>
      </div>

      {/* ========================================================================= */}
      {/* SECÇÃO 1: A NOSSA HISTÓRIA (Imagem principal mantida) */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 mt-24 mb-24">
        <motion.img 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          src="/imagens/fotos/Curtumes_Iberia_24.JPG" 
          className="w-full aspect-video md:aspect-[21/9] object-cover rounded-2xl shadow-lg border border-gray-100"
          alt="Instalações Curtumes Ibéria"
        />
      </div>

      {/* ========================================================================= */}
      {/* SECÇÃO 2: INOVAÇÃO */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-title font-bold text-institucional-blue">{data.title2}</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              {data.text2a}
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              {data.text2b}
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <img src="/imagens/fotos/DSCF3713.jpg" className="w-full h-80 md:h-96 object-cover rounded-3xl shadow-md" alt="Processos de Inovação" />
          </motion.div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECÇÃO 3: NA VANGUARDA */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-32">
        <div className="flex flex-col flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <img src="/imagens/fotos/Curtumes_Iberia_26.JPG" className="w-full h-80 md:h-96 object-cover rounded-3xl shadow-md" alt="Tecnologia e Vanguarda" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-title font-bold text-institucional-blue">{data.title3}</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              {data.text3}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECÇÃO 4: PRESENÇA GLOBAL */}
      {/* ========================================================================= */}
      <div className="w-full relative bg-institucional-blue py-20 overflow-hidden border-t border-blue-900 shadow-inner">
        <div className="max-w-7xl mx-auto px-6 relative z-20 text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-title font-bold text-white drop-shadow-md">{data.salesTitle}</h2>
        </div>

        {/* MAPA MUNDI */}
        <div className="max-w-6xl mx-auto opacity-70 pointer-events-none relative z-10 -my-10 lg:-my-24">
          <ComposableMap projection="geoMercator" projectionConfig={{ scale: 120 }}>
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
                    strokeDasharray="2 2"
                    style={{ default: { outline: "none" }, hover: { outline: "none" }, pressed: { outline: "none" } }}
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
                className="anim-line"
                style={{ filter: "drop-shadow(0 0 4px rgba(96, 165, 250, 0.6))" }}
              />
            ))}

            {destinations.map((dest, i) => (
              <Marker key={`marker-${i}`} coordinates={dest.coordinates}>
                <circle r={2} fill="#93C5FD" opacity={0.9} />
              </Marker>
            ))}

            <Marker coordinates={origin}>
              <circle r={6} fill="#ffffff" opacity={0.3} className="animate-ping" />
              <circle r={3} fill="#ffffff" />
            </Marker>
            
          </ComposableMap>
        </div>

        <div className="w-full overflow-hidden bg-white/10 backdrop-blur-sm border-y border-white/10 py-5 mt-10 relative z-20 flex">
          <div className="animate-marquee-css flex whitespace-nowrap">
            {[...data.countries, ...data.countries].map((country, index) => (
              <span 
                key={index} 
                className="mx-8 text-white text-xl md:text-2xl font-bold font-title tracking-widest drop-shadow-md"
              >
                {country} <span className="text-blue-400 opacity-50 ml-8">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}