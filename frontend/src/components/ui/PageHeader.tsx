import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
}

export function PageHeader({ title, subtitle, backgroundImage }: PageHeaderProps) {
  return (
    <section className="relative w-full h-[50vh] min-h-[450px] flex items-center justify-center overflow-hidden bg-institucional-blue">
      {/* Imagem de Fundo com animação de scale suave (Parallax feel) */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-320"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Overlay Escuro para destacar o texto (como nas referências) */}
      <div className="absolute inset-0 z-10 bg-institucional-blue/90 mix-blend-multiply blur-[202px]"></div>
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-institucional-blue/20 blur-[202px]"></div>

      {/* Conteúdo Centralizado com Animação Fluida */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto pt-20">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl lg:text-6xl font-title font-bold text-white mb-6 tracking-tight drop-shadow-lg"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-lg md:text-xl text-blue-50/90 font-medium leading-relaxed max-w-3xl mx-auto drop-shadow-md"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}