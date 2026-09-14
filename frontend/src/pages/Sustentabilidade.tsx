import { useLanguage } from '../contexts/LanguageContext';
import { PageHeader } from '../components/ui/PageHeader';
import { motion } from 'framer-motion';

const content = {
  PT: {
    title: "Sustentabilidade e Responsabilidade",
    subtitle: "O nosso compromisso com o ambiente",
    gridSections: [
      {
        id: "chemicals",
        title: "Produtos químicos",
        text: "Seguimos a lista global de Substâncias Restritas alinhadas com o REACH e CADS, que atende e excede os regulamentos mundiais.",
        image: "/tour/DSCF9039.webp"
      },
      {
        id: "waste",
        title: "Desperdício",
        text: "O consumo de energia e água é supervisionado de perto com máquinas e tecnologias de ponta. Por exemplo, fórmulas de produção de Spray para Roller reduzindo assim o desperdício de produção.\n\nDiariamente empenhamo-nos para reduzir o uso de plástico.",
        image: "/tour/DSCF9217.webp"
      },
      {
        id: "safety",
        title: "Segurança",
        text: "Priorizamos em manter um local de trabalho saudável e seguro para os nossos funcionários.\n\nAtuamos em conformidade com as diretrizes de saúde no trabalho.",
        image: "/tour/DSCF9261.webp"
      },
      {
        id: "audit",
        title: "Auditoria",
        text: "A Curtumes Ibéria SA é medalha de Ouro no Grupo LWG (Leather Working Group).\n\nO objetivo do LWG é melhorar a indústria de curtumes com as melhores práticas e políticas ambientais.",
        image: "/logos/LWG_GOLD.png",
        isLogo: true
      }
    ],
    fullWidthSections: [
      {
        id: "energy",
        title: "Energias renováveis",
        text: "A Curtumes Ibéria SA utiliza em toda a sua produção 100% de energias renováveis.\n\nTrabalhamos para fazer parte do compromisso ético e de respeito pelo meio ambiente.",
        image: "/imagens/historia_img/img2.avif",
        align: "right"
      },
      {
        id: "water",
        title: "Tratamento de águas | ETAR",
        text: "Toda a água utilizada em todo o processo é encaminhada para uma estação de tratamento de água - ETAR. A água é tratada e enviada para o rio local Ribeira do Carvalho, que é usado para diversas culturas.\n\nA Curtumes Ibéria SA tem orgulho de trabalhar com uma das melhores estações de tratamento de água - ETAR do mundo.",
        image: "/imagens/historia_img/img3.avif",
        align: "left"
      },
      {
        id: "animal-welfare",
        title: "Bem estar animal",
        text: "Priorizamos em manter um local de trabalho saudável e seguro para os nossos funcionários.\n\nAtuamos em conformidade com as diretrizes de saúde no trabalho.",        
        image: "/imagens/historia_img/img4.avif",
        align: "right"
      },
      {
        id: "responsibility",
        title: "Responsabilidade Corporativa",
        text: "A Curtumes Ibéria compromete-se em manter uma produção, flexível, limpa e profissional.\n\nAo longo dos anos temos investido para reduzir o nosso impacto ambiental.\n\nCom o nosso programa de responsabilidade corporativa, funcionários, fornecedores e stakeholders trabalham em comformidade com as boas práticas e responsabilidade ambiental.",
        image: "/imagens/historia_img/img5.avif",
        align: "left"
      }
    ]
  },
  EN: {
    title: "Sustainability and Responsibility",
    subtitle: "Our commitment to the environment",
    gridSections: [
      {
        id: "chemicals",
        title: "Chemicals",
        text: "We follow a global Product Restricted Substances lists such as REACH and CADS that meets and exceeds worldwide regulations.",
        image: "/tour/DSCF9039.webp"
      },
      {
        id: "waste",
        title: "Waste",
        text: "Energy and water consumption is closely monitored with state-of-the-art machines and technologies. For example, Spray production formulas for Roller thus reducing production waste.\n\nDaily we strive to reduce the use of plastic.",
        image: "/tour/DSCF9217.webp"
      },
      {
        id: "safety",
        title: "Safety",
        text: "At Curtumes Ibéria, animal welfare is fundamental.\n\nWe embrace a circular economy by using exclusively by-products from the food industry, categorically rejecting endangered species, Amazonian wildlife, or animals listed under CITES.\n\nWorking in alignment with our suppliers, we ensure strict compliance with international OIE standards throughout the supply chain, starting at the source.",      
      },
      {
        id: "audit",
        title: "Audit",
        text: "Curtumes Ibéria S.A. is a Gold Rated LWG (Leather Working Group) Member.\n\nLWG aims to improve the tanning industry with best practices and environmental policies.",
        image: "/logos/LWG_GOLD.png",
        isLogo: true
      }
    ],
    fullWidthSections: [
      {
        id: "energy",
        title: "Green Energy",
        text: "Curtumes Ibéria S.A. is proud to confirm that uses 100% of its energy consumption from renewable energies and as a result being more sustainable, clean and reducing our environmental footprint.",
        image: "/imagens/historia_img/img2.avif",
        align: "right"
      },
      {
        id: "water",
        title: "Water Treatment",
        text: "100% of the water used in the tannery, goes to a water treatment facility, where water is treated under a meticulous processes. Water is treated and sent to the local river Ribeira do Carvalho, which is then used for several possibilities such as irrigation.\n\nCurtumes Ibéria S.A. is proud to work with one of the best water treatment stations in the world.",
        image: "/imagens/historia_img/img3.avif",
        align: "left"
      },
      {
        id: "animal-welfare",
        title: "Animal Welfare",
        text: "At Curtumes Ibéria, animal welfare is fundamental.\n\nWe actively drive a circular economy by sourcing exclusively by-products of the food industry, strictly prohibiting endangered species, Amazon wildlife, and CITES-listed fauna.\n\nIn close collaboration with our suppliers, we enforce full compliance with international standards, such as WOAH guidelines, right from the origin of our supply chain.",
        image: "/imagens/historia_img/img4.avif",
        align: "right"
      },
      {
        id: "responsibility",
        title: "Corporate Responsability",
        text: "At Curtumes Ibéria we strive to have a clean, flexible and professional production.\n\nIn the last years we have been working to improve our environmental footprint.\n\nThrough our corporate responsability programm our employees aim for good practices and environmental responsibility and we also demand suppliers and all stakeholders to operate in the same standards.",
        image: "/imagens/historia_img/img5.avif",
        align: "left"
      }
    ]
  }
};

export function Sustentabilidade() {
  const { language } = useLanguage();
  const data = content[language];

  return (
    <div className="bg-[#F8FAFC] min-h-screen relative">
      
      {/* 
        =========================================================================
        HERO SECTION / PAGE HEADER 
        ========================================================================= 
      */}
      <div className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/tour/DSCF9337.webp" 
            alt="Sustainability Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-title font-bold text-white mb-6 tracking-tight drop-shadow-lg"
          >
            {data.subtitle}
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-24 h-1 bg-white mx-auto rounded-full opacity-80"
          ></motion.div>
        </div>
      </div>

      {/* 
        =========================================================================
        4-COLUMN GRID (Chemicals, Waste, Safety, Audit)
        ========================================================================= 
      */}
      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {data.gridSections.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col h-full group"
            >
              <div className="w-full aspect-square mb-8 overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center p-2 relative">
                {item.isLogo ? (
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-3/4 h-3/4 object-contain transform group-hover:scale-105 transition-transform duration-500" 
                  />
                ) : (
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover rounded-xl transform group-hover:scale-105 transition-transform duration-700" 
                  />
                )}
                {/* Subtle overlay effect */}
                <div className="absolute inset-0 bg-institucional-blue/0 group-hover:bg-institucional-blue/5 transition-colors duration-500 rounded-2xl pointer-events-none"></div>
              </div>
              
              <h3 className="text-2xl font-title font-bold text-institucional-blue mb-4 tracking-wide">
                {item.title}
              </h3>
              
              <div className="text-gray-600 text-base font-light leading-relaxed flex-grow">
                {item.text.split('\n\n').map((p, pIdx) => (
                  <p key={pIdx} className="mb-3 last:mb-0">{p}</p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 
        =========================================================================
        FULL WIDTH SECTIONS (Immersive Parallax/Cover with Overlay)
        ========================================================================= 
      */}
      <div className="w-full flex flex-col">
        {data.fullWidthSections.map((section, index) => {
          const isLeft = section.align === "left";
          
          return (
            <div key={section.id} className="relative w-full min-h-[70vh] md:min-h-[80vh] flex items-center overflow-hidden group">
              
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={section.image} 
                  alt={section.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                {/* Overlay gradient based on alignment to ensure text legibility */}
                <div className={`absolute inset-0 ${
                  isLeft 
                    ? 'bg-gradient-to-r from-black/80 via-black/50 to-transparent' 
                    : 'bg-gradient-to-l from-black/80 via-black/50 to-transparent'
                }`}></div>
                {/* Fallback general dark overlay for mobile */}
                <div className="absolute inset-0 bg-black/40 md:hidden"></div>
              </div>

              {/* Content Container */}
              <div className="w-full max-w-7xl mx-auto px-6 relative z-10 flex">
                <motion.div 
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`w-full md:w-1/2 lg:w-5/12 ${isLeft ? 'mr-auto' : 'ml-auto'}`}
                >
                  {/* Glassmorphism card for modern clean look */}
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 md:p-12 rounded-3xl shadow-2xl">
                    <h2 className="text-3xl md:text-5xl font-title font-bold text-white mb-6 drop-shadow-md">
                      {section.title}
                    </h2>
                    
                    <div className="w-16 h-1 bg-blue-400 mb-8 rounded-full opacity-80"></div>
                    
                    <div className="text-gray-100 text-lg md:text-xl font-light leading-relaxed space-y-5 drop-shadow-sm">
                      {section.text.split('\n\n').map((paragraph, pIdx) => (
                        <p key={pIdx}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}