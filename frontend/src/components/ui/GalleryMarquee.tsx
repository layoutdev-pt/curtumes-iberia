import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

/**
 * Selecção manual: apenas fotografias com máquinas e/ou pessoas em trabalho.
 * Ficam de fora os planos de pormenor de couro, amostras de cor e paredes.
 */
const images = [
  '/tour/DSCF9738.webp', // sala dos fulões
  '/tour/DSCF9039.webp', // operador junto à tina
  '/tour/DSCF9226.webp', // equipa a inspecionar a pele
  '/tour/DSCF9343.webp', // operador na máquina de acabamento
  '/tour/DSCF9207.webp', // dois operadores a transportar a pele
  '/tour/DSCF9284.webp', // operador na máquina
  '/tour/DSCF9264.webp', // bancada de trabalho
  '/tour/DSCF9283.webp', // operador na linha
  '/tour/DSCF9218.webp', // operador na mesa de corte
  '/tour/DSCF9365.webp', // operador na máquina
  '/tour/DSCF9227.webp', // máquina em funcionamento
  '/tour/DSCF9294.webp'  // mãos no processo
];

export function GalleryMarquee() {
  const { language } = useLanguage();

  return (
    <div className="w-full overflow-hidden bg-white py-16 md:py-24 relative flex flex-col">
      <div className="max-w-[1500px] mx-auto px-6 mb-12 w-full">
        <h2 className="text-4xl md:text-5xl font-title font-bold text-institucional-blue uppercase tracking-tight">
          {language === 'PT' ? 'A Nossa Produção' : 'Our Production'}
        </h2>
      </div>

      <div className="relative flex w-full">
        {/* Esfumar as extremidades para um efeito premium */}
        <div className="absolute top-0 bottom-0 left-0 w-16 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-16 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <motion.div
          className="flex space-x-4 md:space-x-6 min-w-max px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 45,
            repeat: Infinity,
          }}
        >
          {/* Duplicar o array para criar o efeito infinito sem saltos */}
          {[...images, ...images].map((src, index) => (
            <div key={index} className="w-80 h-56 md:w-[640px] md:h-[440px] overflow-hidden flex-shrink-0 relative group">
              <img
                src={src}
                alt="Produção Curtumes Ibéria"
                loading="lazy"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
