import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { motion } from 'framer-motion';

const content = {
  PT: {
    cofinanced: "Cofinanciado por:",
    privacy: "Política de Privacidade",
    terms: "Termos de Utilização"
  },
  EN: {
    cofinanced: "Co-financed by:",
    privacy: "Privacy Policy",
    terms: "Terms of Use"
  }
};

export function Footer() {
  const { language } = useLanguage();
  const data = content[language];

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-institucional-blue text-white py-12 mt-auto relative z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SEÇÃO SUPERIOR: 3 Colunas (Identidade, Logo, Links Legais) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center md:items-start mb-12">
          
          {/* 1. Identidade e Redes Sociais (Esquerda) */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left md:pt-4">
            <h3 className="font-title font-bold text-xl mb-4 tracking-wider">CURTUMES IBÉRIA</h3>
            <div className="flex justify-center md:justify-start space-x-6 mb-4 text-sm font-medium">
              <a href="https://www.facebook.com/curtumesiberia" target="_blank" rel="noreferrer" className="hover:opacity-75 transition-opacity">Facebook</a>
              <a href="https://www.instagram.com/curtumesiberia/" target="_blank" rel="noreferrer" className="hover:opacity-75 transition-opacity">Instagram</a>
              <a href="https://www.linkedin.com/company/curtumes-iberia" target="_blank" rel="noreferrer" className="hover:opacity-75 transition-opacity">LinkedIn</a>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Rua 24 de Junho, 1399<br/>2380-639 Vila Moreira, Portugal
            </p>
          </div>

          {/* 2. Logomarca Central */}
          <div className="flex justify-center items-center py-8 pt-16 md:py-0 border-t border-white/10 md:border-t-0">
            <img 
              src="/logos/VersaoComplementar_Logomarca_CoresOriginais.svg" 
              alt="Curtumes Ibéria" 
              /* w-56 força a largura no mobile (fica bem grande). md:w-auto e md:h-40 devolvem o controlo ao desktop */
              className="w-36 md:w-auto md:h-40 object-contain scale-120 opacity-90 hover:opacity-100 transition-opacity brightness-0 invert"
            />
          </div>

          {/* 3. Links Legais e Copyright (Direita) */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-2 text-sm pt-4 md:pt-10 border-t border-white/10 md:border-t-0 h-full md:justify-start">
            <Link to="/politica-privacidade" className="hover:underline py-1 md:py-0">{data.privacy}</Link>
            <Link to="/termos-utilizacao" className="hover:underline py-1 md:py-0">{data.terms}</Link>
            <p className="mt-4 opacity-60 text-xs sm:text-sm">
              © {new Date().getFullYear()} Curtumes Ibéria, S.A.
            </p>
          </div>
          
        </div>

        {/* SEÇÃO INFERIOR: Logótipos de Financiamento (Largura Total) */}
        <div className="flex flex-col items-center border-t border-white/10 pt-8 mt-4">
          <h4 className="font-bold mb-6 text-sm uppercase tracking-widest opacity-80">
            {data.cofinanced}
          </h4>
          <div className="w-full max-w-5xl bg-white p-4 md:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <img 
              src="/logos/Logos_Curtumes.avif" 
              alt="Logótipos de Cofinanciamento PRF e União Europeia" 
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

      </div>
    </motion.footer>
  );
}