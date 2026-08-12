import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  const { language, toggleLanguage, t } = useLanguage();

  // ------------------------------------------------------------------
  // CONFIGURAÇÃO INDEPENDENTE DAS LOGOS (3 ESTADOS POSSÍVEIS)
  // ------------------------------------------------------------------
  const LOGO_CONFIG = {
    transparente_escuro: {
      src: "/logos/Icone_Branco.svg",
      classes: "h-12 md:h-18 lg:h-18 w-auto object-contain transition-all duration-300 origin-left scale-140",
    },
    transparente_claro: {
      src: "/logos/Icone_CoresOriginais_FundoBranco_copy.svg",
      classes: "h-12 md:h-18 lg:h-18 w-auto object-contain transition-all duration-300 origin-left scale-140",
    },
    solida: {
      src: "/logos/VersaoComplementar_Logomarca_CoresOriginais.svg",
      classes: "h-12 md:h-14 lg:h-26 w-auto object-contain transition-all duration-300 origin-left scale-120",
    }
  };

  // Motor de Decisão da Logo principal
  let currentLogo;
  if (isScrolled) {
    currentLogo = LOGO_CONFIG.solida; 
  } else if (isMobileMenuOpen) {
    // Se o menu abrir no topo, forçamos a logo colorida pois o fundo do menu é branco
    currentLogo = LOGO_CONFIG.transparente_claro;
  } else {
    currentLogo = isHomePage ? LOGO_CONFIG.transparente_escuro : LOGO_CONFIG.transparente_claro;
  }

  // Cor global dos textos na barra (Azul ou Branco)
  const useDarkText = isScrolled || !isHomePage;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevenir o scroll da página quando o menu mobile está aberto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  // Fechar o menu mobile sempre que a rota mudar
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // ------------------------------------------------------------------
  // ESTADO ATIVO DOS LINKS (Destaque consoante a página)
  // ------------------------------------------------------------------
  const getLinkClasses = (path: string, isMobile = false) => {
    const isActive = location.pathname === path;
    
    if (isMobile) {
      return `block text-2xl font-title transition-all duration-300 ${
        isActive ? 'font-bold text-institucional-blue translate-x-2' : 'font-medium text-gray-500 hover:text-institucional-blue'
      }`;
    }

    return `transition-all duration-300 ${
      isActive 
        ? 'font-bold opacity-100'
        : 'font-medium opacity-75 hover:opacity-100'
    }`;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ease-in-out ${
          isScrolled ? 'bg-white shadow-sm py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            <Link to="/" className="flex-shrink-0 cursor-pointer flex items-center relative z-50">
              <img 
                src={currentLogo.src} 
                alt="Curtumes Ibéria, S.A." 
                className={currentLogo.classes}
              />
            </Link>

            <div className="flex items-center space-x-4 md:space-x-8 relative z-50">
              {/* NAVEGAÇÃO DESKTOP */}
              <nav className={`hidden md:flex space-x-6 text-sm ${useDarkText ? 'text-institucional-blue' : 'text-white'}`}>
                <Link to="/" className={getLinkClasses('/')}>{t('nav.home')}</Link>
                <Link to="/historia" className={getLinkClasses('/historia')}>{t('nav.about')}</Link>
                <Link to="/sustentabilidade" className={getLinkClasses('/sustentabilidade')}>{t('nav.sustainability')}</Link>
                <Link to="/catalogo" className={getLinkClasses('/catalogo')}>{t('nav.catalog')}</Link>
                <Link to="/contactos" className={getLinkClasses('/contactos')}>{t('nav.contact')}</Link>
              </nav>

              {/* TOGGLE DE IDIOMA */}
              <button 
                onClick={toggleLanguage}
                className={`px-3 py-1 rounded border font-medium transition-colors ${
                  useDarkText || isMobileMenuOpen
                    ? 'border-institucional-blue text-institucional-blue hover:bg-institucional-blue hover:text-white' 
                    : 'border-white text-white hover:bg-white hover:text-institucional-blue'
                }`}
                aria-label="Mudar idioma"
              >
                {language}
              </button>

              {/* BOTÃO HAMBURGUER (MOBILE) */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden p-2 -mr-2 transition-colors ${
                  useDarkText || isMobileMenuOpen ? 'text-institucional-blue' : 'text-white'
                }`}
                aria-label="Menu"
              >
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* OVERLAY DO MENU MOBILE */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-30 bg-white/95 backdrop-blur-md md:hidden flex flex-col pt-32 px-8 pb-12 overflow-y-auto"
          >
            <nav className="flex flex-col space-y-8 mt-4">
              <Link to="/" className={getLinkClasses('/', true)}>{t('nav.home')}</Link>
              <Link to="/historia" className={getLinkClasses('/historia', true)}>{t('nav.about')}</Link>
              <Link to="/sustentabilidade" className={getLinkClasses('/sustentabilidade', true)}>{t('nav.sustainability')}</Link>
              <Link to="/catalogo" className={getLinkClasses('/catalogo', true)}>{t('nav.catalog')}</Link>
              <Link to="/contactos" className={getLinkClasses('/contactos', true)}>{t('nav.contact')}</Link>
            </nav>

            <div className="mt-auto pt-12 border-t border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Curtumes Ibéria, S.A.</p>
              <a href="mailto:curtiberia@curtumesiberia.pt" className="text-institucional-blue font-medium text-sm block mb-2">curtiberia@curtumesiberia.pt</a>
              <p className="text-gray-500 text-sm">
                +351 249 890 676 <span className="text-xs font-medium ml-1">({language === 'PT' ? 'chamada rede fixa nacional' : 'national landline call'})</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}