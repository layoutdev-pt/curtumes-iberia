import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export function AnimatedCounter({ value, text, suffix = '' }: { value: number, text: string, suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const startTime = performance.now();

      const updateCount = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing function (easeOutExpo)
        const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        setCount(Math.floor(easeOut * value));

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          setCount(value);
        }
      };

      requestAnimationFrame(updateCount);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-6 text-center">
      <div className="flex items-baseline mb-2">
        <span className="text-5xl md:text-7xl font-title font-bold text-institucional-blue tabular-nums">
          {count}
        </span>
        <span className="text-4xl md:text-5xl font-title font-bold text-institucional-blue ml-1">{suffix}</span>
      </div>
      <span className="text-gray-500 font-bold uppercase tracking-widest text-xs md:text-sm">{text}</span>
    </div>
  );
}
