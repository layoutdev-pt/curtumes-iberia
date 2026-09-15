
import { motion } from 'framer-motion';

const images = [
  '/tour/DSCF9039.webp',
  '/tour/DSCF9070.webp',
  '/tour/DSCF9075.webp',
  '/tour/DSCF9071.webp',
  '/tour/DSCF9223.webp',
  '/tour/DSCF9235.webp',
  '/tour/DSCF9242.webp',
  '/tour/DSCF9245.webp',
  '/tour/DSCF9082.webp',
  '/tour/DSCF9337.webp'
];

export function GalleryMarquee() {
  return (
    <div className="w-full overflow-hidden bg-white py-12 md:py-24 relative flex flex-col">
      <div className="max-w-7xl mx-auto px-6 mb-12 w-full">
        <h2 className="text-3xl md:text-4xl font-title font-bold text-institucional-blue mb-4">A Nossa Produção</h2>
        <div className="w-12 h-1 bg-institucional-blue opacity-70"></div>
      </div>
      
      <div className="relative flex w-full">
        {/* Esfumar as extremidades para um efeito premium */}
        <div className="absolute top-0 bottom-0 left-0 w-16 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-16 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <motion.div
          className="flex space-x-6 md:space-x-8 min-w-max px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 45,
            repeat: Infinity,
          }}
        >
          {/* Duplicar o array para criar o efeito infinito sem saltos */}
          {[...images, ...images].map((src, index) => (
            <div key={index} className="w-64 h-44 md:w-[450px] md:h-[300px] rounded-2xl overflow-hidden shadow-md flex-shrink-0 relative group border border-gray-100">
              <div className="absolute inset-0 bg-institucional-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 mix-blend-multiply pointer-events-none"></div>
              <img 
                src={src} 
                alt="Produção Curtumes Ibéria" 
                loading="lazy"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
