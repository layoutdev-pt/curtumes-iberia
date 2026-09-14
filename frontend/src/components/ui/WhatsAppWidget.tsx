import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { motion } from 'framer-motion';

const content = {
  PT: {
    company: "Curtumes Ibéria",
    subtitle: "Envie-nos as suas questões e dúvidas.",
    startChat: "Iniciar Conversa",
    message: "Olá! Gostaria de obter mais informações.",
  },
  EN: {
    company: "Curtumes Ibéria",
    subtitle: "Send us your questions and doubts.",
    startChat: "Start Chat",
    message: "Hello! I would like to get more information.",
  }
};

export function WhatsAppWidget() {
  const { language } = useLanguage();
  const data = content[language];
  const [isOpen, setIsOpen] = useState(false);

  // IMPORTANTE: Substitua pelo número real da empresa (com código do país, sem o +)
  // Exemplo para Portugal: 351912345678
  const phoneNumber = "351962900019"; 
  const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(data.message)}`;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-6 right-6 z-[100]"
    >
      
      {/* Botão Redondo Principal - Fica relativo para segurar o tamanho da div */}
      <button
        onClick={() => setIsOpen(true)}
        className={`bg-[#25D366] text-white w-14 h-14 rounded-full shadow-2xl hover:bg-[#1ebd57] transition-all duration-300 ease-out flex items-center justify-center focus:outline-none origin-center ${
          isOpen 
            ? 'opacity-0 scale-50 rotate-90 pointer-events-none' 
            : 'opacity-100 scale-100 rotate-0 pointer-events-auto hover:scale-110'
        }`}
        aria-label="Abrir janela do WhatsApp"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </button>

      {/* A Mini Janela (Popover) - Ancorada ao bottom-0 right-0 */}
      <div 
        className={`absolute bottom-0 right-0 w-80 bg-gray-50 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 origin-bottom-right transition-all duration-300 ease-out ${
          isOpen 
            ? 'opacity-100 scale-100 pointer-events-auto' 
            : 'opacity-0 scale-50 pointer-events-none'
        }`}
      >
        {/* Cabeçalho Verde */}
        <div className="bg-[#25D366] p-5 flex items-start justify-between">
          <div className="flex items-center gap-3 text-white">
            <svg className="w-8 h-8 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <div>
              <h4 className="font-title font-bold text-sm tracking-wider">{data.company}</h4>
              <p className="text-xs text-green-100 mt-0.5 leading-tight">
                {data.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-green-600 p-1.5 rounded-full transition-colors focus:outline-none"
            aria-label="Fechar"
          >
            {/* Ícone de Fechar (X) */}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Corpo (Botão de Redirecionamento) */}
        <div className="p-5">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-white hover:bg-gray-50 border border-gray-200 p-4 rounded-xl flex items-center justify-between transition-colors shadow-sm group"
            onClick={() => setIsOpen(false)}
          >
            <div className="flex items-center gap-3">
              <div className="bg-[#25D366] p-2 rounded-full text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
              <span className="font-title font-bold text-gray-800 text-sm group-hover:text-[#25D366] transition-colors">
                {data.startChat}
              </span>
            </div>
            {/* Ícone de Seta (ChevronRight) */}
            <svg className="w-5 h-5 text-gray-400 group-hover:text-[#25D366] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
      
    </motion.div>
  );
}