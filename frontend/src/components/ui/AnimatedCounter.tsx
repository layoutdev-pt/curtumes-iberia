import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  /** Valor numérico a contar. Ignorado quando `display` é fornecido. */
  value?: number;
  text: string;
  suffix?: string;
  /** Texto fixo (ex.: "LWG GOLD") para métricas que não são números. */
  display?: string;
  /** Linha de apoio por baixo do rótulo, como nos KPIs da homepage. */
  sub?: string;
  className?: string;
}

/**
 * KPI com contagem animada. A tipografia acompanha a faixa de métricas da
 * homepage: número grande em azul institucional, rótulo em caixa alta com
 * tracking largo e uma linha de apoio em cinzento leve.
 */
export function AnimatedCounter({ value = 0, text, suffix = '', display, sub, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView && !display) {
      let animationFrameId: number;
      const duration = 2000;
      const startTime = performance.now();

      const updateCount = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing function (easeOutExpo)
        const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        setCount(Math.floor(easeOut * value));

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(updateCount);
        } else {
          setCount(value);
        }
      };

      animationFrameId = requestAnimationFrame(updateCount);

      return () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    }
  }, [isInView, value, display]);

  return (
    <div ref={ref} className={`flex flex-col items-center text-center ${className ?? ''}`}>
      <div className="flex items-baseline mb-3">
        <span className="text-5xl sm:text-6xl lg:text-7xl font-title font-bold text-institucional-blue tracking-tight tabular-nums uppercase">
          {display ?? count}
        </span>
        {suffix && (
          <span className="text-5xl sm:text-6xl lg:text-7xl font-title font-bold text-institucional-blue tracking-tight">
            {suffix}
          </span>
        )}
      </div>
      <h3 className="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-[0.25em] mb-2">{text}</h3>
      {sub && (
        <p className="text-xs sm:text-sm text-gray-500 font-light leading-relaxed max-w-[220px]">{sub}</p>
      )}
    </div>
  );
}
