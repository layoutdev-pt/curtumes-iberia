import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { motion } from 'framer-motion';

const content = {
  PT: {
    cofinanced: "Cofinanciado por:",
    logosPlaceholder: "[Logótipos PRF / UE]",
    privacy: "Política de Privacidade",
    terms: "Termos de Utilização"
  },
  EN: {
    cofinanced: "Co-financed by:",
    logosPlaceholder: "[PRF / EU Logos]",
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          
          {/* Identidade e Redes Sociais */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="font-title font-bold text-xl mb-4">CURTUMES IBÉRIA</h3>
            <div className="flex justify-center md:justify-start space-x-6 mb-4 text-sm font-medium">
              <a href="https://www.facebook.com/curtumesiberia" target="_blank" rel="noreferrer" className="hover:opacity-75 transition-opacity">Facebook</a>
              <a href="https://www.instagram.com/curtumesiberia/" target="_blank" rel="noreferrer" className="hover:opacity-75 transition-opacity">Instagram</a>
              <a href="https://www.linkedin.com/company/curtumes-iberia" target="_blank" rel="noreferrer" className="hover:opacity-75 transition-opacity">LinkedIn</a>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">Rua 24 de Junho, 1399<br/>2380-639 Vila Moreira, Portugal</p>
          </div>

          {/* Financiamento Governamental (Obrigatório) */}
          <div className="flex flex-col items-center md:items-center text-center md:text-left">
            <h4 className="font-bold mb-4">{data.cofinanced}</h4>
            {/* Marcador de lugar para os logótipos reais do PRF */}
            <div className="w-full sm:w-48 h-16 bg-white/10 border border-white/20 flex items-center justify-center rounded text-sm">
              {data.logosPlaceholder}
            </div>
          </div>

          {/* Links Legais Traduzidos (Centrados no mobile, originais no desktop) */}
          <div className="flex mt-3 flex-col items-center md:items-end text-center md:text-right space-y-2 text-sm pt-4 md:pt-0 border-t border-white/10 md:border-t-0">
            <Link to="/politica-privacidade" className="hover:underline py-1 md:py-0">{data.privacy}</Link>
            <Link to="/termos-utilizacao" className="hover:underline py-1 md:py-0">{data.terms}</Link>
            <p className="mt-4 opacity-60 text-xs sm:text-sm">© {new Date().getFullYear()} Curtumes Ibéria, S.A.</p>
          </div>
          
        </div>
      </div>
    </motion.footer>
  );
}