import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';

const content = {
  PT: {
    title: "Sustentabilidade e Qualidade",
    intro: "A sustentabilidade ocupa igualmente um lugar central na estratégia da Curtumes Ibéria.",
    circularTitle: "Economia Circular",
    circularText: "A empresa integra um modelo de economia circular, ao transformar um subproduto da indústria alimentar num material durável, versátil e de elevado valor acrescentado. Ao longo dos anos, tem investido em tecnologias mais eficientes, na otimização do tratamento da água, na redução do impacto ambiental e na utilização de soluções energéticas mais sustentáveis.",
    lwgTitle: "Certificação Gold LWG",
    lwgText: "Este compromisso foi reconhecido através da atribuição da classificação Gold pela Leather Working Group — a classificação mais elevada desta organização internacional, que avalia o desempenho ambiental e as boas práticas das empresas do setor do couro.",
    isoTitle: "Sistema de Gestão",
    isoText: "A qualidade tem sido uma prioridade ao longo de toda a sua história. Em outubro de 2000, a empresa obteve a certificação ISO 9002 e, em outubro de 2003, alcançou a recertificação do Sistema de Gestão da Qualidade de acordo com a norma NP EN ISO 9001:2000. Estes marcos refletiram o compromisso da organização com a melhoria contínua dos processos, dos produtos e do serviço prestado aos clientes."
  },
  EN: {
    title: "Sustainability and Quality",
    intro: "Sustainability is also central to Curtumes Ibéria’s strategy.",
    circularTitle: "Circular Economy",
    circularText: "The company operates within a circular economy model, transforming a by-product of the food industry into a durable, versatile and high-value material. Over the years, it has invested in more efficient technologies, water treatment optimisation, environmental impact reduction and more sustainable energy solutions.",
    lwgTitle: "LWG Gold Rating",
    lwgText: "This commitment has been recognised with a Gold rating from the Leather Working Group — the organisation’s highest rating, which assesses the environmental performance and responsible practices of companies operating in the leather industry.",
    isoTitle: "Quality Management",
    isoText: "Quality has remained a priority throughout the company’s history. In October 2000, Curtumes Ibéria obtained ISO 9002 certification and, in October 2003, achieved the recertification of its Quality Management System under the NP EN ISO 9001:2000 standard. These milestones reflected the company’s commitment to the continuous improvement of its processes, products and customer service."
  }
};

export function Sustentabilidade() {
  const { language } = useLanguage();
  const data = content[language];

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-44 pb-32 relative font-sans">
      
      {/* Fundo ultra-limpo apenas com um leve gradiente ambiente */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
        <div className="absolute top-0 -left-[10%] w-[50vw] h-[50vw] rounded-full bg-blue-100 blur-[120px]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* ========================================================================= */}
        {/* CABEÇALHO INTRODUTÓRIO */}
        {/* ========================================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-32 md:mb-48"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-6 block">Responsabilidade</span>
          <h1 className="text-4xl md:text-6xl font-title font-bold text-institucional-blue mb-8 tracking-tight">{data.title}</h1>
          <div className="w-px h-16 bg-institucional-blue/20 mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">{data.intro}</p>
        </motion.div>

        {/* ========================================================================= */}
        {/* 1. ECONOMIA CIRCULAR (Imagem Esq / Texto Dir) */}
        {/* ========================================================================= */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-16 py-24 border-t border-gray-200/50">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full md:w-2/5 flex justify-center md:justify-start"
          >
            {/* Ícone Minimalista Rotativo */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-48 h-48 md:w-64 md:h-64 rounded-full border-[1px] border-institucional-blue/20 flex items-center justify-center p-8 relative"
            >
              <div className="absolute inset-2 border-[1px] border-dashed border-institucional-blue/10 rounded-full"></div>
              <svg className="w-full h-full text-institucional-blue/40 stroke-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="w-full md:w-3/5 text-center md:text-left"
          >
            <h2 className="text-3xl md:text-4xl font-title font-bold text-institucional-blue mb-8">{data.circularTitle}</h2>
            <p className="text-gray-500 text-lg md:text-xl font-light leading-relaxed">
              {data.circularText}
            </p>
          </motion.div>

        </div>

        {/* ========================================================================= */}
        {/* 2. LWG GOLD (Texto Esq / Imagem Dir) */}
        {/* ========================================================================= */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-16 py-24 border-t border-gray-200/50">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="w-full md:w-3/5 text-center md:text-left"
          >
            <h2 className="text-3xl md:text-4xl font-title font-bold text-institucional-blue mb-8">{data.lwgTitle}</h2>
            <p className="text-gray-500 text-lg md:text-xl font-light leading-relaxed">
              {data.lwgText}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full md:w-2/5 flex justify-center md:justify-end"
          >
            {/* Logo isolado a flutuar no espaço negativo */}
            <div className="relative group">
              <div className="absolute inset-0 bg-yellow-400/20 blur-3xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <img 
                src="/logos/LWG_GOLD.png" 
                alt="Leather Working Group Gold Rating" 
                className="w-48 md:w-64 h-auto object-contain relative z-10 transform group-hover:-translate-y-2 transition-transform duration-500"
              />
            </div>
          </motion.div>

        </div>

        {/* ========================================================================= */}
        {/* 3. ISO 9001 (Tipografia Esq / Texto Dir) */}
        {/* ========================================================================= */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-16 py-24 border-t border-gray-200/50">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full md:w-2/5 flex justify-center md:justify-start"
          >
            {/* Design Tipográfico Minimalista simulando um carimbo/selo */}
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full border-[1px] border-institucional-blue/20 flex flex-col items-center justify-center p-8 bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow duration-500">
              <span className="text-4xl md:text-5xl font-light text-institucional-blue tracking-widest">ISO</span>
              <div className="w-8 h-px bg-institucional-blue/30 my-3"></div>
              <span className="text-xl md:text-2xl font-bold font-title text-institucional-blue tracking-widest">9001</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="w-full md:w-3/5 text-center md:text-left"
          >
            <h2 className="text-3xl md:text-4xl font-title font-bold text-institucional-blue mb-8">{data.isoTitle}</h2>
            <p className="text-gray-500 text-lg md:text-xl font-light leading-relaxed">
              {data.isoText}
            </p>
          </motion.div>

        </div>

      </div>
    </div>
  );
}