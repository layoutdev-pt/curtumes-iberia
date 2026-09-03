import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const content = {
  PT: {
    cofinanced: "Cofinanciado por:",
    privacy: "Política de Privacidade",
    terms: "Termos de Utilização",
    newsTitle: "Subscreva a Newsletter",
    newsDesc: "Receba as últimas novidades do nosso catálogo B2B.",
    newsPlaceholder: "O seu e-mail",
    newsBtn: "Subscrever",
    newsSuccess: "✅ Subscrito com sucesso!",
    newsError: "❌ Erro. Tente novamente."
  },
  EN: {
    cofinanced: "Co-financed by:",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    newsTitle: "Subscribe to our Newsletter",
    newsDesc: "Get the latest updates from our B2B catalog.",
    newsPlaceholder: "Your e-mail",
    newsBtn: "Subscribe",
    newsSuccess: "✅ Successfully subscribed!",
    newsError: "❌ Error. Please try again."
  }
};

export function Footer() {
  const { language } = useLanguage();
  const data = content[language];

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      // Simulação da chamada à API
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 4000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-institucional-blue text-white py-12 mt-auto relative z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================= */}
        {/* SEÇÃO SUPERIOR: 3 Colunas (Simétricas e alinhadas ao Topo) */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start mb-12">
          
          {/* 1. Identidade e Contactos (Esquerda) */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="font-title font-bold text-lg lg:text-xl mb-3 tracking-wider">CURTUMES IBÉRIA</h3>
            <p className="text-sm opacity-80 leading-relaxed mb-5">
              Rua 24 de Junho, 1399<br/>2380-639 Vila Moreira, Portugal
            </p>
            <div className="flex justify-center md:justify-start space-x-6 text-sm font-medium">
              <a href="https://www.facebook.com/curtumesiberia" target="_blank" rel="noreferrer" className="hover:text-gray-300 transition-colors">Facebook</a>
              <a href="https://www.instagram.com/curtumesiberia/" target="_blank" rel="noreferrer" className="hover:text-gray-300 transition-colors">Instagram</a>
              <a href="https://www.linkedin.com/company/curtumes-iberia" target="_blank" rel="noreferrer" className="hover:text-gray-300 transition-colors">LinkedIn</a>
            </div>
          </div>

          {/* 2. Logomarca Central */}
          <div className="flex justify-center items-start pt-8 border-t border-white/10 md:border-t-0 md:pt-0">
            <img 
              src="/logos/VersaoComplementar_Logomarca_CoresOriginais.svg" 
              alt="Curtumes Ibéria" 
              className="h-20 md:h-28 w-auto object-contain opacity-90 scale-170 hover:opacity-100 transition-opacity brightness-0 invert"
            />
          </div>

          {/* 3. Newsletter (Direita) */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right border-t border-white/10 md:border-t-0 pt-8 md:pt-0">
            <div className="w-full max-w-sm flex flex-col items-center md:items-end">
              <h4 className="font-bold text-sm lg:text-base uppercase tracking-wider mb-2">{data.newsTitle}</h4>
              <p className="text-xs opacity-70 mb-5">{data.newsDesc}</p>
              
              <form onSubmit={handleNewsletterSubmit} className="relative w-full">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={data.newsPlaceholder} 
                  required
                  disabled={status === 'loading' || status === 'success'}
                  className="w-full bg-white/10 border border-white/20 rounded-full py-2.5 pl-4 pr-28 text-sm text-white placeholder-white/50 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all disabled:opacity-50" 
                />
                <button 
                  type="submit" 
                  disabled={status === 'loading' || status === 'success'}
                  className="absolute right-1 top-1 bottom-1 bg-white text-institucional-blue font-bold px-4 rounded-full text-xs hover:bg-gray-100 transition-all disabled:opacity-80 flex items-center justify-center min-w-[90px]"
                >
                  {status === 'loading' ? (
                    <div className="w-4 h-4 border-2 border-institucional-blue border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    data.newsBtn
                  )}
                </button>
              </form>

              <AnimatePresence mode="wait">
                {status === 'success' && (
                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-green-300 font-bold mt-3">
                    {data.newsSuccess}
                  </motion.p>
                )}
                {status === 'error' && (
                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-red-300 font-bold mt-3">
                    {data.newsError}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
          
        </div>

        {/* ========================================================= */}
        {/* SEÇÃO INFERIOR: Links Legais e Financiamento */}
        {/* ========================================================= */}
        <div className="flex flex-col border-t border-white/10 pt-8 mt-4">
          
          {/* Barra de Legalidades e Copyright Horizontal */}
          <div className="w-full flex flex-col md:flex-row justify-between items-center text-sm opacity-70 mb-10 space-y-4 md:space-y-0">
            <div className="flex space-x-6 font-medium">
              <Link to="/politica-privacidade" className="hover:underline hover:text-white transition-colors">{data.privacy}</Link>
              <Link to="/termos-utilizacao" className="hover:underline hover:text-white transition-colors">{data.terms}</Link>
            </div>
            <p className="text-xs md:text-sm">
              © {new Date().getFullYear()} Curtumes Ibéria, S.A.
            </p>
          </div>

          {/* Logótipos de Cofinanciamento */}
          <div className="flex flex-col items-center w-full">
            <h4 className="font-bold mb-6 text-xs uppercase tracking-widest opacity-60">
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

      </div>
    </motion.footer>
  );
}