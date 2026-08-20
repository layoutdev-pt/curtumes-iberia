import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { ComposableMap, Geographies, Geography, Line, Marker } from 'react-simple-maps';

// Dicionário reestruturado para o fluxo narrativo (Storytelling)
const content = {
  PT: {
    title: "A Nossa História",
    intro: "A história da Curtumes Ibéria começou em 1963, quando José Maria Cardoso Lopes Rosa, pai dos atuais principais acionistas, iniciou a atividade através de uma empresa em nome individual.",
    zigzag1: "Em finais de 1975, foi constituída a sociedade por quotas José Maria Cardoso Rosa & Filhos, Lda., assinalando uma nova fase de crescimento e consolidação da empresa.",
    zigzag2: "Desde os primeiros anos, a Curtumes Ibéria apostou na modernização dos processos produtivos, na inovação tecnológica e na proteção ambiental, fortalecendo a sua posição face à crescente procura de couro.",
    timelineTitle: "Marcos de Evolução",
    timeline: [
      { year: "1993", text: "A empresa transforma-se em sociedade anónima, acompanhada por um aumento do capital social, e adota a atual denominação: Curtumes Ibéria, S.A." },
      { year: "Anos 2000", text: "Afirmação como uma das empresas de referência do setor na Península Ibérica, expandindo a capacidade de desenvolver centenas de artigos diferentes." },
      { year: "Atualidade", text: "A terceira geração dá continuidade ao projeto familiar, conjugando o conhecimento acumulado com uma visão orientada para a inovação, qualidade e evolução constante." }
    ],
    conclusion: [
      "Dedicamo-nos à curtimenta e ao acabamento de peles de bovino, sobretudo para as indústrias do calçado, marroquinaria e moda.",
      "O nosso maior ponto forte reside na capacidade de valorizar a matéria-prima, criando couros de elevada qualidade com características estéticas únicas para um mercado cada vez mais exigente."
    ],
    salesTitle: "Presença Global",
    salesText: "A internacionalização tem desempenhado um papel vital. Com vendas mundiais para:",
    countries: [
      "Portugal", "Espanha", "França", "Reino Unido", "Alemanha", 
      "Itália", "Suécia", "Roménia", "Marrocos", "Estados Unidos", 
      "Índia", "China", "Vietname"
    ]
  },
  EN: {
    title: "Our History",
    intro: "Curtumes Ibéria’s history began in 1963, when José Maria Cardoso Lopes Rosa, father of the company’s current main shareholders, started the business as a sole proprietorship.",
    zigzag1: "At the end of 1975, José Maria Cardoso Rosa & Filhos, Lda. was established, marking a new stage in the company’s growth and consolidation.",
    zigzag2: "From its earliest years, Curtumes Ibéria invested in the modernisation of its production processes, technological innovation and environmental protection, strengthening its market position.",
    timelineTitle: "Milestones of Evolution",
    timeline: [
      { year: "1993", text: "The company became a public limited company, accompanied by an increase in share capital, and adopted its current name: Curtumes Ibéria, S.A." },
      { year: "2000s", text: "Established as one of the leading companies in the sector across the Iberian Peninsula, expanding the capacity to develop hundreds of different articles." },
      { year: "Today", text: "The third generation continues the family project, combining accumulated expertise with a vision focused on innovation, quality, and continuous development." }
    ],
    conclusion: [
      "We specialise in the tanning and finishing of bovine hides, primarily intended for the footwear, leather goods and fashion industries.",
      "Our main strength is the ability to enhance raw materials, creating high-quality leathers with unique aesthetic characteristics for an increasingly demanding market."
    ],
    salesTitle: "Global Presence",
    salesText: "Internationalisation has played a vital role. With global sales to:",
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
    <div className="bg-[#F8FAFC] min-h-screen pt-32 pb-0 relative overflow-x-hidden">
      
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

      {/* Fundo Gráfico */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-gradient-to-bl from-blue-100 via-transparent to-transparent blur-3xl mix-blend-multiply"></div>
      </div>

      {/* ========================================================================= */}
      {/* SECÇÃO 1: TÍTULO E INTRODUÇÃO */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-32">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2 block">EST/ 1963</span>
          <h1 className="text-4xl md:text-5xl font-title font-bold text-institucional-blue">{data.title}</h1>
          <div className="w-16 h-1 bg-institucional-blue mx-auto mt-6"></div>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* Imagem Esquerda - Mais pequena */}
          <motion.img 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            src="/imagens/historia_img/img1.avif" 
            className="hidden lg:block w-1/6 max-w-[220px] aspect-[3/4] object-cover rounded-xl shadow-lg border-4 border-white rotate-3"
            alt="História 1"
          />
          
          {/* Texto Intro - Mais largo */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-3/5 bg-white/90 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 text-center"
          >
            <p className="text-xl md:text-2xl font-medium text-institucional-blue leading-snug">
              {data.intro}
            </p>
          </motion.div>

          {/* Imagem Direita - Mais pequena */}
          <motion.img 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            src="/imagens/historia_img/img2.avif" 
            className="hidden lg:block w-1/6 max-w-[220px] aspect-[3/4] object-cover rounded-xl shadow-lg border-4 border-white -rotate-3"
            alt="História 2"
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECÇÃO 2: PASSOS DINÂMICOS (ZIG-ZAG) */}
      {/* ========================================================================= */}
      <div className="max-w-6xl mx-auto px-6 relative z-10 mb-32 space-y-24">
        
        {/* Passo 1: Card à Esquerda, Imagem à Direita */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-3/5 bg-white/80 backdrop-blur-sm p-8 lg:p-12 rounded-3xl shadow-sm border border-blue-50"
          >
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
              {data.zigzag1}
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-2/5"
          >
            <img src="/imagens/historia_img/img3.avif" className="w-full max-w-sm mx-auto aspect-square lg:aspect-[4/3] object-cover rounded-2xl shadow-xl -rotate-2" alt="Fábrica 1" />
          </motion.div>
        </div>

        {/* Passo 2: Imagem à Esquerda, Card à Direita */}
        <div className="flex flex-col flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-2/5"
          >
            <img src="/imagens/historia_img/img4.avif" className="w-full max-w-sm mx-auto aspect-square lg:aspect-[4/3] object-cover rounded-2xl shadow-xl rotate-2" alt="Fábrica 2" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-3/5 bg-white/80 backdrop-blur-sm p-8 lg:p-12 rounded-3xl shadow-sm border border-blue-50"
          >
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
              {data.zigzag2}
            </p>
          </motion.div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* SECÇÃO 3: TIMELINE */}
      {/* ========================================================================= */}
      <div className="w-full bg-white py-24 border-y border-gray-100 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          
          <div className="text-center mb-20">
            <h3 className="text-3xl md:text-4xl font-title font-bold text-institucional-blue">{data.timelineTitle}</h3>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-blue-200 -translate-x-1/2"></div>

            {data.timeline.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row items-center w-full mb-16 relative ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="hidden md:block absolute left-1/2 w-4 h-4 rounded-full bg-white border-4 border-institucional-blue -translate-x-1/2 z-10"></div>
                  
                  <div className="hidden md:block w-1/2"></div>
                  
                  <div className={`w-full md:w-1/2 flex flex-col ${isEven ? 'md:pl-16' : 'md:pr-16 md:text-right'}`}>
                    <span className="text-4xl md:text-5xl font-title font-black text-blue-100 mb-2">{item.year}</span>
                    <p className="text-gray-600 text-lg leading-relaxed relative z-10 -mt-4">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECÇÃO 4: CONCLUSÃO */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 py-32">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          <motion.img 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            src="/imagens/historia_img/img5.avif" 
            className="hidden lg:block w-1/6 max-w-[220px] aspect-[3/4] object-cover rounded-xl shadow-md rotate-2"
            alt="História 5"
          />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-3/5 text-center space-y-6"
          >
            {data.conclusion.map((p, i) => (
              <p key={i} className="text-gray-700 text-lg md:text-xl font-medium leading-relaxed">
                {p}
              </p>
            ))}
          </motion.div>

          <motion.img 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            src="/imagens/historia_img/img6.avif" 
            className="hidden lg:block w-1/6 max-w-[220px] aspect-[3/4] object-cover rounded-xl shadow-md -rotate-2"
            alt="História 6"
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECÇÃO 5: MAPA MUNDI */}
      {/* ========================================================================= */}
      <div className="w-full relative bg-institucional-blue py-20 overflow-hidden border-t border-blue-900 shadow-inner">
        <div className="max-w-7xl mx-auto px-6 relative z-20 text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-title font-bold text-white mb-6 drop-shadow-md">{data.salesTitle}</h2>
          <p className="text-white text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-sm">{data.salesText}</p>
        </div>

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