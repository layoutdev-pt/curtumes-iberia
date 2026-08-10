import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  const { language, toggleLanguage, t } = useLanguage();

  // ------------------------------------------------------------------
  // CONFIGURAÇÃO INDEPENDENTE DAS LOGOS (3 ESTADOS POSSÍVEIS)
  // ------------------------------------------------------------------
  const LOGO_CONFIG = {
    // 1. Topo Transparente SOBRE FUNDO ESCURO (Herobanner da Home)
    transparente_escuro: {
      src: "/logos/Icone_Branco.svg",
      classes: "h-12 md:h-18 lg:h-18 w-auto object-contain transition-all duration-300 origin-left scale-140",
    },
    // 2. Topo Transparente SOBRE FUNDO CLARO (Páginas Secundárias no topo)
    transparente_claro: {
      src: "/logos/Icone_CoresOriginais_FundoBranco_copy.svg",
      classes: "h-12 md:h-18 lg:h-18 w-auto object-contain transition-all duration-300 origin-left scale-140",
    },
    // 3. Barra Sólida (Com Scroll em qualquer página)
    solida: {
      src: "/logos/VersaoComplementar_Logomarca_CoresOriginais.svg",
      classes: "h-12 md:h-14 lg:h-26 w-auto object-contain transition-all duration-300 origin-left scale-120",
    }
  };

  // Motor de Decisão da Logo
  let currentLogo;
  if (isScrolled) {
    currentLogo = LOGO_CONFIG.solida; 
  } else {
    currentLogo = isHomePage ? LOGO_CONFIG.transparente_escuro : LOGO_CONFIG.transparente_claro;
  }

  // Cor global dos textos (Azul ou Branco)
  const useDarkText = isScrolled || !isHomePage;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ------------------------------------------------------------------
  // ESTADO ATIVO DOS LINKS (Destaque consoante a página)
  // ------------------------------------------------------------------
  const getLinkClasses = (path: string) => {
    const isActive = location.pathname === path;
    return `transition-all duration-300 ${
      isActive 
        ? 'font-bold opacity-100' // Destacado se for a página atual
        : 'font-medium opacity-75 hover:opacity-100' // Mais discreto se não for
    }`;
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? 'bg-white shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          <Link to="/" className="flex-shrink-0 cursor-pointer flex items-center">
            <img 
              src={currentLogo.src} 
              alt="Curtumes Ibéria, S.A." 
              className={currentLogo.classes}
            />
          </Link>

          <div className="flex items-center space-x-8">
            <nav className={`hidden md:flex space-x-6 text-sm ${useDarkText ? 'text-institucional-blue' : 'text-white'}`}>
              
              {/* Links com o destaque dinâmico gerado pela função getLinkClasses */}
              <Link to="/" className={getLinkClasses('/')}>
                {t('nav.home')}
              </Link>
              
              <Link to="/historia" className={getLinkClasses('/historia')}>
                {t('nav.about')}
              </Link>
              
              <Link to="/sustentabilidade" className={getLinkClasses('/sustentabilidade')}>
                {t('nav.sustainability')}
              </Link>
              
              <Link to="/catalogo" className={getLinkClasses('/catalogo')}>
                {t('nav.catalog')}
              </Link>
              
              <Link to="/contactos" className={getLinkClasses('/contactos')}>
                {t('nav.contact')}
              </Link>
              
            </nav>

            <button 
              onClick={toggleLanguage}
              className={`px-3 py-1 rounded border font-medium transition-colors ${
                useDarkText 
                  ? 'border-institucional-blue text-institucional-blue hover:bg-institucional-blue hover:text-white' 
                  : 'border-white text-white hover:bg-white hover:text-institucional-blue'
              }`}
              aria-label="Mudar idioma"
            >
              {language}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}