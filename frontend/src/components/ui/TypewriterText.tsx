import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number; // ms por caractere
  delay?: number; // atraso customizado em ms (opcional)
  cursor?: boolean;
  className?: string;
  onComplete?: () => void;
}

export function TypewriterText({
  text,
  speed = 45,
  delay,
  cursor = true,
  className = '',
  onComplete,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setIsTypingComplete(false);
    setHasStarted(false);

    // Se o site acabou de carregar (Loader ativo ~1.8s), aguarda o loader sair.
    // Em transições de página subsequentes, inicia rapidamente (~200ms).
    const timeSinceLoad = performance.now();
    const computedDelay =
      delay !== undefined
        ? delay
        : timeSinceLoad < 1900
        ? Math.max(200, 1950 - timeSinceLoad)
        : 200;

    const startTimeout = setTimeout(() => {
      setHasStarted(true);
    }, computedDelay);

    return () => clearTimeout(startTimeout);
  }, [text, delay]);

  useEffect(() => {
    if (!hasStarted) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTypingComplete(true);
        if (onComplete) onComplete();
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [hasStarted, text, speed, onComplete]);

  return (
    <span className={`inline-block ${className}`}>
      {displayedText.split('\n').map((line, i, arr) => (
        <React.Fragment key={i}>
          {line}
          {i < arr.length - 1 && <br />}
        </React.Fragment>
      ))}
      {cursor && !isTypingComplete && (
        <span className="inline-block ml-1 font-normal opacity-80 animate-pulse">
          |
        </span>
      )}
    </span>
  );
}
