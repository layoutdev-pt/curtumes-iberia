import { useLanguage } from '../contexts/LanguageContext';
import { PageHeader } from '../components/ui/PageHeader';
import { motion } from 'framer-motion';

const content = {
  PT: {
    title: "Sustentabilidade e Responsabilidade",
    intro: "A sustentabilidade ocupa igualmente um lugar central na estratégia da Curtumes Ibéria.",
    lwgTitle: "Certificação Gold LWG",
    lwgText: "Este compromisso foi reconhecido através da atribuição da classificação Gold pela Leather Working Group — a classificação mais elevada desta organização internacional, que avalia o desempenho ambiental e as boas práticas das empresas do setor do couro.",
    circularTitle: "Economia Circular",
    circularText: "A empresa integra um modelo de economia circular, ao transformar um subproduto da indústria alimentar num material durável, versátil e de elevado valor acrescentado. Ao longo dos anos, tem investido em tecnologias mais eficientes, na otimização do tratamento da água, na redução do impacto ambiental e na utilização de soluções energéticas mais sustentáveis."
  },
  EN: {
    title: "Sustainability and Responsibility",
    intro: "Sustainability is also central to Curtumes Ibéria’s strategy.",
    lwgTitle: "LWG Gold Rating",
    lwgText: "This commitment has been recognised with a Gold rating from the Leather Working Group — the organisation’s highest rating, which assesses the environmental performance and responsible practices of companies operating in the leather industry.",
    circularTitle: "Circular Economy",
    circularText: "The company operates within a circular economy model, transforming a by-product of the food industry into a durable, versatile and high-value material. Over the years, it has invested in more efficient technologies, water treatment optimisation, environmental impact reduction and more sustainable energy solutions."
  }
};

export function Sustentabilidade() {
  const { language } = useLanguage();
  const data = content[language];

  return (
    // ATENÇÃO: Removido o pt-44 para o Header colar ao topo
    <div className="bg-[#F8FAFC] min-h-screen pb-32 relative font-sans">
      
      {/* HEADER DINÂMICO APLICADO AQUI */}
      <PageHeader 
        title={data.title} 
        subtitle={data.intro} 
        backgroundImage="/imagens/historia_img/img4.avif" // Pode trocar pela imagem que quiser
      />

      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
        <div className="absolute top-[50vh] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-blue-100 blur-[120px]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 mt-16">

        {/* ========================================================================= */}
        {/* 1. DESTAQUE: LWG GOLD (Imagem Esq / Texto Dir) - MOVIDO PARA O TOPO */}
        {/* ========================================================================= */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-16 py-16">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full md:w-2/5 flex justify-center md:justify-start"
          >
            {/* Logo isolado a flutuar no espaço negativo com fundo de destaque */}
            <div className="relative group p-8 bg-white rounded-3xl shadow-lg border border-gray-100">
              <div className="absolute inset-0 bg-yellow-400/10 blur-2xl rounded-full scale-110 opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
              <img 
                src="/logos/LWG_GOLD.png" 
                alt="Leather Working Group Gold Rating" 
                className="w-56 md:w-72 h-auto object-contain relative z-10 transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="w-full md:w-3/5 text-center md:text-left"
          >
            <h2 className="text-3xl md:text-5xl font-title font-bold text-institucional-blue mb-8">{data.lwgTitle}</h2>
            <p className="text-gray-500 text-lg md:text-xl font-light leading-relaxed">
              {data.lwgText}
            </p>
          </motion.div>

        </div>

        {/* ========================================================================= */}
        {/* 2. ECONOMIA CIRCULAR E ENERGIAS RENOVÁVEIS (Texto Esq / Imagem Dir) */}
        {/* ========================================================================= */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-16 py-24 border-t border-gray-200/50 mt-12">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
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

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full md:w-2/5 flex justify-center md:justify-end"
          >
            <img 
              src="/imagens/historia_img/img2.avif" 
              alt="Energias Renováveis e Painéis Solares" 
              className="w-full aspect-[4/3] object-cover rounded-3xl shadow-md border border-gray-100"
            />
          </motion.div>

        </div>

      </div>
    </div>
  );
}