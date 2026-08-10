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
  },
  EN: {
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.sustainability': 'Sustainability',
    'nav.catalog': 'Catalog',
    'nav.contact': 'Contacts',
    'catalog.title': 'Leather Catalog',
    'catalog.subtitle': 'Explore our range of leathers developed under circular economy processes.',
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
    // Cumprimento da regra de arquitetura: ler localStorage ou o cabeçalho do browser, ignorar IP
    const savedLang = localStorage.getItem('preferred_language') as Language;
    if (savedLang) {
      setLanguage(savedLang);
    } else {
      const browserLang = navigator.language.toUpperCase();
      if (browserLang.startsWith('EN')) {
        setLanguage('EN');
      }
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'PT' ? 'EN' : 'PT';
    setLanguage(newLang);
    localStorage.setItem('preferred_language', newLang); // Persistência obrigatória
  };

  // Função tradutora
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