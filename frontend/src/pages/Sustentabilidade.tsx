import { useLanguage } from "../contexts/LanguageContext";
import { motion } from "framer-motion";
import { TypewriterText } from "../components/ui/TypewriterText";

const content = {
  PT: {
    title: "Sustentabilidade e Responsabilidade",
    subtitle: "O nosso compromisso com o ambiente",
    gridSections: [
      {
        id: "chemicals",
        title: "Produtos químicos",
        text: "Seguimos a lista global de Substâncias Restritas alinhadas com o REACH e CADS, que atende e excede os regulamentos mundiais.",
        image: "/tour/DSCF9039.webp",
      },
      {
        id: "waste",
        title: "Desperdício",
        text: "O consumo de energia e água é supervisionado de perto com máquinas e tecnologias de ponta. Por exemplo, fórmulas de produção de Spray para Roller reduzindo assim o desperdício de produção.\n\nDiariamente empenhamo-nos para reduzir o uso de plástico.",
        image: "/tour/DSCF9217.webp",
      },
      {
        id: "safety",
        title: "Segurança",
        text: "Priorizamos em manter um local de trabalho saudável e seguro para os nossos funcionários.\n\nAtuamos em conformidade com as diretrizes de saúde no trabalho.",
        image: "/tour/DSCF9261.webp",
      },
    ],
    audit: {
      tag: "Certificação Oficial",
      title: "Auditoria — Medalha de Ouro LWG",
      text: "A Curtumes Ibéria SA é medalha de Ouro no Grupo LWG (Leather Working Group).\n\nO objetivo do LWG é melhorar a indústria de curtumes com as melhores práticas e políticas ambientais.",
      image: "/logos/CUR224.png",
      badges: ["Classificação Ouro Oficial", "Melhores Práticas Ambientais"],
    },
    fullWidthSections: [
      {
        id: "energy",
        title: "Energias renováveis",
        text: "A Curtumes Ibéria SA utiliza em toda a sua produção 100% de energias renováveis.\n\nTrabalhamos para fazer parte do compromisso ético e de respeito pelo meio ambiente.",
        image: "/imagens/historia_img/img2.avif",
        align: "right",
      },
      {
        id: "water",
        title: "Tratamento de águas | ETAR",
        text: "Toda a água utilizada em todo o processo é encaminhada para uma estação de tratamento de água - ETAR. A água é tratada e enviada para o rio local Ribeira do Carvalho, que é usado para diversas culturas.\n\nA Curtumes Ibéria SA tem orgulho de trabalhar com uma das melhores estações de tratamento de água - ETAR do mundo.",
        image: "/imagens/historia_img/img3.avif",
        align: "left",
      },
      {
        id: "animal-welfare",
        title: "Bem estar animal",
        text: "Na Curtumes Ibéria, o bem-estar animal é basilar. Integramos uma economia circular ao utilizar exclusivamente subprodutos da indústria alimentar, rejeitando categoricamente espécies ameaçadas, fauna da Amazónia ou animais listados na CITES.\n\nAlinhados com os nossos fornecedores, asseguramos o cumprimento rigoroso dos padrões internacionais da OIE desde a origem da cadeia produtiva.",
        image: "/imagens/historia_img/img4.avif",
        align: "right",
      },
      {
        id: "responsibility",
        title: "Responsabilidade Corporativa",
        text: "A Curtumes Ibéria compromete-se em manter uma produção, flexível, limpa e profissional.\n\nAo longo dos anos temos investido para reduzir o nosso impacto ambiental.\n\nCom o nosso programa de responsabilidade corporativa, funcionários, fornecedores e stakeholders trabalham em comformidade com as boas práticas e responsabilidade ambiental.",
        image: "/imagens/historia_img/img5.avif",
        align: "left",
      },
    ],
  },
  EN: {
    title: "Sustainability and Responsibility",
    subtitle: "Our commitment to the environment",
    gridSections: [
      {
        id: "chemicals",
        title: "Chemicals",
        text: "We follow a global Product Restricted Substances lists such as REACH and CADS that meets and exceeds worldwide regulations.",
        image: "/tour/DSCF9039.webp",
      },
      {
        id: "waste",
        title: "Waste",
        text: "Energy and water consumption is closely monitored with state-of-the-art machines and technologies. For example, Spray production formulas for Roller thus reducing production waste.\n\nDaily we strive to reduce the use of plastic.",
        image: "/tour/DSCF9217.webp",
      },
      {
        id: "safety",
        title: "Safety",
        text: "A healthy and safe workplace is a priority and we aim to guarantee that our employees will act in a safe and responsible way.\n\nWe ensure compliance with all applicable health laws where we operate.",
        image: "/tour/DSCF9261.webp",
      },
    ],
    audit: {
      tag: "Official Certification",
      title: "Audit — LWG Gold Rated Member",
      text: "Curtumes Ibéria S.A. is a Gold Rated LWG (Leather Working Group) Member.\n\nLWG aims to improve the tanning industry with best practices and environmental policies.",
      image: "/logos/CUR224.png",
      badges: ["Official Gold Rating", "Best Environmental Practices"],
    },
    fullWidthSections: [
      {
        id: "energy",
        title: "Green Energy",
        text: "Curtumes Ibéria S.A. is proud to confirm that uses 100% of its energy consumption from renewable energies and as a result being more sustainable, clean and reducing our environmental footprint.",
        image: "/imagens/historia_img/img2.avif",
        align: "right",
      },
      {
        id: "water",
        title: "Water Treatment",
        text: "100% of the water used in the tannery, goes to a water treatment facility, where water is treated under a meticulous processes. Water is treated and sent to the local river Ribeira do Carvalho, which is then used for several possibilities such as irrigation.\n\nCurtumes Ibéria S.A. is proud to work with one of the best water treatment stations in the world.",
        image: "/imagens/historia_img/img3.avif",
        align: "left",
      },
      {
        id: "animal-welfare",
        title: "Animal Welfare",
        text: "At Curtumes Ibéria, animal welfare is fundamental. We actively drive a circular economy by sourcing exclusively by-products of the food industry, strictly prohibiting endangered species, Amazon wildlife, and CITES-listed fauna.\n\nIn close collaboration with our suppliers, we enforce full compliance with international standards, such as WOAH guidelines, right from the origin of our supply chain.",
        image: "/imagens/historia_img/img4.avif",
        align: "right",
      },
      {
        id: "responsibility",
        title: "Corporate Responsability",
        text: "At Curtumes Ibéria we strive to have a clean, flexible and professional production.\n\nIn the last years we have been working to improve our environmental footprint.\n\nThrough our corporate responsability programm our employees aim for good practices and environmental responsibility and we also demand suppliers and all stakeholders to operate in the same standards.",
        image: "/imagens/historia_img/img5.avif",
        align: "left",
      },
    ],
  },
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
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-title font-bold text-white mb-6 tracking-tight drop-shadow-lg min-h-[1.2em]">
            <TypewriterText text={data.subtitle} speed={40} />
          </h1>
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
        3-COLUMN GRID (Chemicals, Waste, Safety)
        ========================================================================= 
      */}
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {data.gridSections.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col h-full group"
            >
              <div className="w-full aspect-square mb-8 overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-xl transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-institucional-blue/0 group-hover:bg-institucional-blue/5 transition-colors duration-500 rounded-2xl pointer-events-none"></div>
              </div>

              <h3 className="text-2xl font-title font-bold text-institucional-blue mb-4 tracking-wide">
                {item.title}
              </h3>

              <div className="text-gray-600 text-base font-light leading-relaxed flex-grow">
                {item.text.split("\n\n").map((p, pIdx) => (
                  <p key={pIdx} className="mb-3 last:mb-0">
                    {p}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 
        =========================================================================
        DESTAQUE DISCRETO: AUDITORIA / MEDALHA DE OURO LWG
        ========================================================================= 
      */}
      <div className="max-w-7xl mx-auto px-6 pb-24 pt-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-white rounded-3xl border border-gray-200/70 shadow-sm p-8 sm:p-10 lg:p-12 relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-12">
            {/* Logo LWG em container clean */}
            <div className="flex-shrink-0 w-36 h-36 sm:w-44 sm:h-44 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center p-4">
              <img
                src={data.audit.image}
                alt="Leather Working Group Gold Rating"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Texto & Badges discretos */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                {data.audit.tag}
              </div>

              <h3 className="text-2xl sm:text-3xl font-title font-bold text-institucional-blue tracking-tight">
                {data.audit.title}
              </h3>

              <div className="text-gray-600 text-base sm:text-lg font-light leading-relaxed space-y-2 max-w-3xl">
                {data.audit.text.split("\n\n").map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
                {data.audit.badges.map((badge, bIdx) => (
                  <span
                    key={bIdx}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm font-medium text-slate-700"
                  >
                    <svg
                      className="w-3.5 h-3.5 text-amber-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 
        =========================================================================
        FULL WIDTH SECTIONS (Stacking Cards Scroll Animation)
        ========================================================================= 
      */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16 relative">
        <div className="flex flex-col space-y-6 sm:space-y-8">
          {data.fullWidthSections.map((section, index) => {
            const isLeft = section.align === "left";

            return (
              <div
                key={section.id}
                className="sticky w-full"
                style={{
                  top: `calc(90px + ${index * 16}px)`,
                  zIndex: index + 1,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative w-full h-[65vh] min-h-[480px] max-h-[660px] rounded-3xl overflow-hidden shadow-2xl border border-white/20 group flex items-stretch p-6 sm:p-8 bg-slate-900"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={section.image}
                      alt={section.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                    />
                    {/* Overlay gradient based on alignment to ensure text legibility */}
                    <div
                      className={`absolute inset-0 pointer-events-none ${
                        isLeft
                          ? "bg-gradient-to-r from-black/60 via-black/30 to-black/10"
                          : "bg-gradient-to-l from-black/60 via-black/30 to-black/10"
                      }`}
                    ></div>
                    {/* Fallback general dark overlay for mobile */}
                    <div className="absolute inset-0 bg-black/40 md:hidden pointer-events-none"></div>
                  </div>

                  {/* Content Container perfeitamente alinhado com as margens simétricas do pai */}
                  <div
                    className={`relative z-10 w-full h-full flex ${isLeft ? "justify-start" : "justify-end"}`}
                  >
                    <div className="w-full md:w-7/12 lg:w-6/12 h-full">
                      {/* Glassmorphism card interior com estilo 100% idêntico nos 4 cards */}
                      <div className="bg-slate-950/60 backdrop-blur-xl border border-white/20 p-6 sm:p-8 lg:p-10 rounded-2xl shadow-2xl h-full flex flex-col justify-center">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-title font-bold text-white mb-3 sm:mb-4 drop-shadow-md leading-tight flex-shrink-0">
                          {section.title}
                        </h2>

                        <div className="w-12 sm:w-16 h-1 min-h-[4px] bg-blue-400 mb-4 sm:mb-6 rounded-full opacity-80 flex-shrink-0"></div>

                        <div className="text-gray-100 text-sm sm:text-base lg:text-base font-light leading-relaxed space-y-2.5 sm:space-y-3.5 drop-shadow-sm">
                          {section.text.split("\n\n").map((paragraph, pIdx) => (
                            <p key={pIdx}>{paragraph}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
