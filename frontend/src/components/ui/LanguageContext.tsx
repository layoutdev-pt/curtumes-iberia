import { createContext, useState, useContext, useEffect, type ReactNode } from 'react';

// 1. Definição de Tipos
type Language = 'PT' | 'EN';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

// 2. Criação do Contexto
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 3. Provider (O componente que envolve a aplicação)
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('PT');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    
    if (savedLanguage) {
      // Se já escolheu antes, respeita
      setLanguage(savedLanguage);
    } else {
      // API alterada para ipwho.is (não bloqueia localhost nem precisa de CORS)
      const detectLanguageByIP = async () => {
        try {
          const response = await fetch('https://ipwho.is/');
          const data = await response.json();
          
          if (data.country_code === 'PT' || data.country_code === 'BR') {
            setLanguage('PT');
            localStorage.setItem('language', 'PT');
          } else {
            setLanguage('EN');
            localStorage.setItem('language', 'EN');
          }
        } catch (error) {
          console.error("Erro ao detetar idioma por IP:", error);
          setLanguage('EN');
          localStorage.setItem('language', 'EN');
        }
      };
      
      detectLanguageByIP();
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'PT' ? 'EN' : 'PT';
    setLanguage(newLang);
    localStorage.setItem('language', newLang); 
  };

  const translations: Record<Language, Record<string, string>> = {
    PT: {
      'nav.home': 'Início',
      'nav.about': 'Sobre Nós',
      'nav.sustainability': 'Sustentabilidade',
      'nav.catalog': 'Catálogo',
      'nav.contact': 'Contactos',
    },
    EN: {
      'nav.home': 'Home',
      'nav.about': 'About Us',
      'nav.sustainability': 'Sustainability',
      'nav.catalog': 'Catalog',
      'nav.contact': 'Contact',
    }
  };

  const t = (key: string) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};