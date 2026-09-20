// TermosUtilizacao.tsx
import { useLanguage } from '../../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { RevealText } from '../../components/ui/RevealText';

const content = {
  PT: {
    title: "Termos de Utilização",
    intro: "O acesso e utilização do website da Curtumes Ibéria, S.A. estão sujeitos aos seguintes termos e condições.",
    sec1Title: "1. Catálogo B2B",
    sec1Text: "O nosso catálogo é exclusivamente direcionado a profissionais. As especificações técnicas do couro podem sofrer ligeiras alterações mediante as técnicas de acabamento aplicadas."
  },
  EN: {
    title: "Terms of Use",
    intro: "Access and use of the Curtumes Ibéria, S.A. website are subject to the following terms and conditions.",
    sec1Title: "1. B2B Catalog",
    sec1Text: "Our catalog is exclusively aimed at professionals. The technical specifications of the leather may undergo slight changes depending on the finishing techniques applied."
  }
};

export function TermosUtilizacao() {
  const { language } = useLanguage();
  const data = content[language];

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <div className="max-w-4xl mx-auto pt-28 pb-20 px-4 sm:px-6 md:px-8 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-title font-bold text-institucional-blue mb-8 md:mb-12 min-h-[1.2em]">
            <RevealText text={data.title} />
          </h1>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="bg-white p-6 sm:p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 space-y-6 md:space-y-8 text-gray-700 leading-relaxed text-base sm:text-lg"
        >
          <p className="font-medium text-gray-900">
            {data.intro}
          </p>
          
          <div>
            <h2 className="text-xl sm:text-2xl font-title font-bold text-institucional-blue mb-3 md:mb-4">
              {data.sec1Title}
            </h2>
            <p>
              {data.sec1Text}
            </p>
          </div>
          
        </motion.div>
      </div>
    </div>
  );
}