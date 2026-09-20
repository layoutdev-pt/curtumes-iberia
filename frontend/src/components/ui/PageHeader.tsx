import { motion } from 'framer-motion';
import { RevealText } from './RevealText';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
}

/**
 * Hero único partilhado por todas as páginas internas (Sobre Nós, Artigos,
 * Sustentabilidade, Contactos) para garantir a mesma altura, o mesmo overlay
 * e o mesmo tratamento tipográfico em todos os separadores.
 */
export function PageHeader({ title, subtitle, backgroundImage }: PageHeaderProps) {
  return (
    <section className="relative w-full h-[65vh] min-h-[520px] flex items-center justify-center overflow-hidden bg-institucional-blue">
      {/* Imagem de fundo por inteiro, com ligeiro zoom-out de entrada */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Escurecimento para legibilidade do texto */}
      <div className="absolute inset-0 z-10 bg-institucional-blue/70" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-transparent to-black/40" />

      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto pt-20">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-title font-bold text-white uppercase tracking-tight mb-6 drop-shadow-lg min-h-[1.2em]">
          <RevealText text={title.toUpperCase()} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
          className="text-lg md:text-xl text-blue-50/90 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-md"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}
