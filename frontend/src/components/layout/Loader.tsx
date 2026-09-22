import { motion } from 'framer-motion';

export function Loader() {
  return (
    <motion.div
      key="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
      className="fixed inset-0 z-[9999] bg-[#F8FAFC] flex flex-col items-center justify-center overflow-hidden touch-none select-none"
      onWheel={(e) => e.preventDefault()}
      onTouchMove={(e) => e.preventDefault()}
    >
      {/* Sombra de fundo subtil para dar profundidade */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-30">
        <div className="w-[60vw] h-[60vw] rounded-full bg-blue-100 blur-[120px]"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Logomarca Animada */}
        <motion.img
          initial={{ opacity: 0, scale: 1, y: 20 }}
          animate={{ opacity: 1, scale: 2, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          src="/logos/Icone_CoresOriginais_FundoBranco_copy.svg"
          alt="Curtumes Ibéria Logo"
          className="h-20 md:h-24 w-auto mb-6 object-contain"
        />

        {/* Título */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-2xl md:text-3xl font-title font-bold text-institucional-blue mb-10 tracking-[0.2em] uppercase"
        >
          Curtumes Ibéria
        </motion.h2>

        {/* Barra de Progresso */}
        <div className="w-64 md:w-80 h-[3px] bg-gray-200 rounded-full overflow-hidden mb-6 relative">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute top-0 left-0 h-full bg-institucional-blue rounded-full"
          />
        </div>

        {/* Frase / Lema (Fade in suave no final) */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-xs md:text-sm font-title font-medium text-gray-400 tracking-[0.3em] uppercase"
        >
          All About Leather <span className="mx-2 text-institucional-blue/30">•</span> Est. 1963
        </motion.p>
      </div>
    </motion.div>
  );
}