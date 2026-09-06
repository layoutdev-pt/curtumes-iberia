import React, { createContext, useState, useContext, useEffect, type ReactNode } from 'react';

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
  // O estado inicial começa em 'EN' (ou 'PT'), mas será imediatamente atualizado pelo useEffect
  const [language, setLanguage] = useState<Language>('PT');

  // O useEffect TEM de estar aqui dentro, pois precisa de aceder ao 'setLanguage'
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    
    if (savedLanguage) {
      // Se o utilizador já escolheu antes, respeita essa escolha
      setLanguage(savedLanguage);
    } else {
      // Se for a primeira visita, deteta pelo IP da rede
      const detectLanguageByIP = async () => {
        try {
          const response = await fetch('https://ipapi.co/json/');
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
          // Fallback de segurança
          setLanguage('EN');
          localStorage.setItem('language', 'EN');
        }
      };
      
      detectLanguageByIP();
    }
  }, []); // Executa apenas uma vez quando a app carrega

  // Função para alternar o idioma no botão da Navbar
  const toggleLanguage = () => {
    const newLang = language === 'PT' ? 'EN' : 'PT';
    setLanguage(newLang);
    localStorage.setItem('language', newLang); // Guarda a escolha no browser
  };

  // Dicionário de traduções da Navbar
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

  // Função que devolve a tradução baseada na chave
  const t = (key: string) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// 4. Hook personalizado para usar nos outros ficheiros
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};