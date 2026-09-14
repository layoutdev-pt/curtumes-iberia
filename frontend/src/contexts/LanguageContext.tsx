import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Language = 'PT' | 'EN';

// Dicionário de traduções estáticas para a interface
const translations = {
  PT: {
    'nav.home': 'Início',
    'nav.about': 'Sobre Nós',
    'nav.sustainability': 'Sustentabilidade',
    'nav.catalog': 'Catálogo',
    'nav.contact': 'Contactos',
    'catalog.title': 'Catálogo de Artigos',
    'catalog.subtitle': 'Explore a nossa gama de peles desenvolvidas sob processos de economia circular.',
    'contact.agent.rui.location': 'Benedita | Lisboa | Porto',
    'contact.agent.rui.name': 'Rui Malaca',
    'contact.agent.rui.address': 'Rua 24 de Junho, 1399, 2380-639 Alcanena',
  },
  EN: {
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.sustainability': 'Sustainability',
    'nav.catalog': 'Catalog',
    'nav.contact': 'Contacts',
    'catalog.title': 'Leather Catalog',
    'catalog.subtitle': 'Explore our range of leathers developed under circular economy processes.',
    'contact.agent.rui.location': 'Benedita | Lisbon | Porto',
    'contact.agent.rui.name': 'Rui Malaca',
    'contact.agent.rui.address': 'Rua 24 de Junho, 1399, 2380-639 Alcanena',
  }
};

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: keyof typeof translations['PT']) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('PT');

  useEffect(() => {
    const savedLang = localStorage.getItem('preferred_language') as Language;
    
    if (savedLang) {
      setLanguage(savedLang);
    } else {
      // Deteção por IP conforme exigido na reunião
      const detectLanguageByIP = async () => {
        try {
          const response = await fetch('https://ipwho.is/');
          const data = await response.json();
          
          if (data.country_code === 'PT' || data.country_code === 'BR') {
            setLanguage('PT');
            localStorage.setItem('preferred_language', 'PT');
          } else {
            setLanguage('EN');
            localStorage.setItem('preferred_language', 'EN');
          }
        } catch (error) {
          console.error("Erro ao detetar idioma por IP, a usar idioma do browser como fallback:", error);
          
          // Se o adblocker cortar a API, cai para a deteção do browser
          const browserLang = navigator.language.toUpperCase();
          const fallbackLang = browserLang.startsWith('PT') ? 'PT' : 'EN';
          setLanguage(fallbackLang);
          localStorage.setItem('preferred_language', fallbackLang);
        }
      };
      
      detectLanguageByIP();
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'PT' ? 'EN' : 'PT';
    setLanguage(newLang);
    localStorage.setItem('preferred_language', newLang); 
  };

  const t = (key: keyof typeof translations['PT']) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage deve ser usado dentro de um LanguageProvider');
  return context;
};