import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { ComposableMap, Geographies, Geography, Line, Marker } from 'react-simple-maps';

// Dicionário local
const content = {
  PT: {
    title: "A Nossa História",
    paragraphs: [
      "A história da Curtumes Ibéria começou em 1963, quando José Maria Cardoso Lopes Rosa, pai dos atuais principais acionistas, Joaquim José Moreira Rosa e Maria Gabriela Moreira Rosa, iniciou a atividade através de uma empresa em nome individual.",
      "Em finais de 1975, foi constituída a sociedade por quotas José Maria Cardoso Rosa & Filhos, Lda., assinalando uma nova fase de crescimento e consolidação da empresa.",
      "Desde os primeiros anos, a Curtumes Ibéria apostou na modernização dos processos produtivos, na inovação tecnológica e na proteção ambiental. Estes investimentos, aliados ao crescimento da procura de couro para o desenvolvimento de novos produtos a partir de meados da década de 1970, permitiram reforçar progressivamente a posição da empresa no mercado.",
      "Em 1993, a empresa transformou-se em sociedade anónima, acompanhada por um aumento do capital social, e adotou a atual denominação: Curtumes Ibéria, S.A.",
      "Ao longo de mais de seis décadas, a Curtumes Ibéria afirmou-se como uma das empresas de referência do setor na Península Ibérica. Atualmente, a terceira geração dá continuidade ao projeto familiar, conjugando o conhecimento acumulado ao longo dos anos com uma visão orientada para a inovação, a qualidade e a evolução constante.",
      "A empresa dedica-se à curtimenta e ao acabamento de peles de bovino, com uma gama diversificada de artigos destinados sobretudo às indústrias do calçado, da marroquinaria e da moda. A sua capacidade técnica permite desenvolver centenas de artigos diferentes, adaptados às tendências, às novas técnicas de acabamento e às necessidades específicas de um mercado cada vez mais exigente.",
      "Um dos principais pontos fortes da Curtumes Ibéria reside na capacidade de valorizar a matéria-prima através da tecnologia, do conhecimento técnico e do desenvolvimento de acabamentos diferenciadores. Desta forma, consegue criar couros de elevada qualidade, com características estéticas e funcionais adequadas à produção de calçado e artigos de moda."
    ],
    salesTitle: "Presença Global",
    salesText: "A internacionalização tem desempenhado um papel importante no crescimento da empresa. Com vendas mundiais para:",
    countries: [
      "Portugal", "Espanha", "França", "Reino Unido", "Alemanha", 
      "Itália", "Suécia", "Roménia", "Marrocos", "Estados Unidos", 
      "Índia", "China", "Vietname"
    ]
  },
  EN: {
    title: "Our History",
    paragraphs: [
      "Curtumes Ibéria’s history began in 1963, when José Maria Cardoso Lopes Rosa, father of the company’s current main shareholders, Joaquim José Moreira Rosa and Maria Gabriela Moreira Rosa, started the business as a sole proprietorship.",
      "At the end of 1975, José Maria Cardoso Rosa & Filhos, Lda. was established, marking a new stage in the company’s growth and consolidation.",
      "From its earliest years, Curtumes Ibéria invested in the modernisation of its production processes, technological innovation and environmental protection. These investments, combined with the growing demand for leather for the development of new products from the mid-1970s onwards, progressively strengthened the company’s position in the market.",
      "In 1993, the company became a public limited company, accompanied by an increase in share capital, and adopted its current name: Curtumes Ibéria, S.A.",
      "Over more than six decades, Curtumes Ibéria has established itself as one of the leading companies in the sector across the Iberian Peninsula. Today, the third generation continues the family project, combining accumulated expertise with a vision focused on innovation, quality and continuous development.",
      "The company specialises in the tanning and finishing of bovine hides, offering a diverse range of leathers primarily intended for the footwear, leather goods and fashion industries. Its technical expertise allows it to develop hundreds of different articles, adapted to new trends, finishing techniques and the specific requirements of an increasingly demanding market.",
      "One of Curtumes Ibéria’s main strengths is its ability to enhance raw materials through technology, technical expertise and the development of distinctive finishes. This allows the company to create high-quality leathers with the aesthetic and functional characteristics required for footwear and fashion products."
    ],
    salesTitle: "Global Presence",
    salesText: "Internationalisation has also played an important role in the company’s growth. With global sales to:",
    countries: [
      "Portugal", "Spain", "France", "United Kingdom", "Germany", 
      "Italy", "Sweden", "Romania", "Morocco", "United States", 
      "India", "China", "Vietnam"
    ]
  }
};

// Topologia JSON base para o mapa-múndi
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Coordenadas Geoespaciais (Longitude, Latitude)
const origin: [number, number] = [-8.2245, 39.3999]; // Portugal Continental Rigoroso

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
      
      {/* Injeção de @keyframes GPU-accelerated */}
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
          animation: marquee 35s linear infinite; /* Ligeiramente mais lento para facilitar leitura */
        }
      `}</style>

      {/* Elementos Gráficos de Fundo */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-gradient-to-bl from-blue-100 via-transparent to-transparent blur-3xl mix-blend-multiply"></div>
        <svg className="absolute bottom-20 -left-20 w-[600px] h-[600px] text-institucional-blue/5 rotate-45" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M45.7,-76.4C58.9,-69.3,69.1,-55.4,78.2,-41.1C87.3,-26.8,95.3,-12.1,94.2,2C93.1,16.1,82.8,29.6,72.4,41.4C62,53.2,51.5,63.3,39,70.5C26.5,77.7,11.9,82,-3.1,87C-18.1,92,-33.5,77.7,-46.8,68.2C-60.1,58.7,-71.3,44.1,-77.6,28.1C-83.9,12.1,-85.3,-5.3,-79.8,-20.1C-74.3,-34.9,-61.9,-47.1,-48.5,-54.6C-35.1,-62.1,-20.7,-64.9,-4.9,-56.9C10.9,-48.9,21.8,-30.1,32.4,-83.4Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 mb-20">
        
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

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-100 space-y-6 text-gray-700 text-lg leading-relaxed"
        >
          {data.paragraphs.map((paragraph, index) => (
            <p key={index} className={index === 0 ? "text-xl font-medium text-institucional-blue" : ""}>
              {paragraph}
            </p>
          ))}
        </motion.div>
      </div>

      {/* Secção Geoespacial */}
      <div className="w-full relative bg-institucional-blue py-20 overflow-hidden border-t border-blue-900 shadow-inner">
        <div className="max-w-7xl mx-auto px-6 relative z-20 text-center mb-12">
          {/* Título mais forte e legível */}
          <h2 className="text-4xl md:text-5xl font-title font-bold text-white mb-6 drop-shadow-md">{data.salesTitle}</h2>
          {/* Subtítulo mais claro e com maior leitura */}
          <p className="text-white text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-sm">{data.salesText}</p>
        </div>

        {/* MAPA SVG */}
        <div className="max-w-6xl mx-auto opacity-70 pointer-events-none relative z-10 -my-10 lg:-my-24">
          <ComposableMap projection="geoMercator" projectionConfig={{ scale: 120 }}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#F8FAFC"
                    fillOpacity={0.15} /* Ligeiramente mais visível o contorno dos continentes */
                    stroke="#ffffff"
                    strokeWidth={0.5}
                    strokeDasharray="2 2"
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
                className="anim-line"
                style={{
                  filter: "drop-shadow(0 0 4px rgba(96, 165, 250, 0.6))",
                }}
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

        {/* Fita Marquee Infinita */}
        <div className="w-full overflow-hidden bg-white/10 backdrop-blur-sm border-y border-white/10 py-5 mt-10 relative z-20 flex">
          <div className="animate-marquee-css flex whitespace-nowrap">
            {[...data.countries, ...data.countries].map((country, index) => (
              <span 
                key={index} 
                /* Texto dos países mais nítido, forte e espaçado para leitura imediata */
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