import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface RevealTextProps {
  /** Texto a revelar. Use '\n' para separar linhas. */
  text: string;
  /** Atraso inicial em ms. Se omitido, espera pelo Loader no primeiro carregamento. */
  delay?: number;
  /** Intervalo entre palavras, em segundos. */
  stagger?: number;
  /** Duração da revelação de cada palavra, em segundos. */
  duration?: number;
  className?: string;
}

/**
 * Revelação suave de texto: cada palavra entra com fade, uma subida curta e
 * a saída de um ligeiro desfoque. Substitui a antiga animação de máquina de
 * escrever, que era mais dura e deixava o cursor a piscar.
 */
export function RevealText({
  text,
  delay,
  stagger = 0.07,
  duration = 0.9,
  className = '',
}: RevealTextProps) {
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    setHasStarted(false);

    // No primeiro carregamento o Loader está visível cerca de 1,8s: só depois
    // disso vale a pena animar. Em navegações seguintes arranca quase de imediato.
    const timeSinceLoad = performance.now();
    const computedDelay =
      delay !== undefined
        ? delay
        : timeSinceLoad < 1900
        ? Math.max(150, 1950 - timeSinceLoad)
        : 150;

    const timeout = setTimeout(() => setHasStarted(true), computedDelay);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  const lines = text.split('\n');
  let wordIndex = 0;

  return (
    <span className={`inline-block ${className}`}>
      {lines.map((line, lineIdx) => (
        <span key={lineIdx} className="block">
          {line.split(' ').map((word, i, words) => {
            const index = wordIndex++;
            return (
              <span key={i}>
                <motion.span
                  className="inline-block will-change-[transform,filter,opacity]"
                  initial={{ opacity: 0, y: '0.35em', filter: 'blur(10px)' }}
                  animate={
                    hasStarted
                      ? { opacity: 1, y: '0em', filter: 'blur(0px)' }
                      : { opacity: 0, y: '0.35em', filter: 'blur(10px)' }
                  }
                  transition={{
                    duration,
                    delay: index * stagger,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}
                </motion.span>
                {i < words.length - 1 ? ' ' : null}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
