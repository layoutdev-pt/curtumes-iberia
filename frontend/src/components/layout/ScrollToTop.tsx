import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollToTopProps {
  isInitialLoading?: boolean;
}

export function ScrollToTop({ isInitialLoading = false }: ScrollToTopProps) {
  const { pathname, hash } = useLocation();
  const prevPathname = useRef(pathname);
  const isFirstMount = useRef(true);

  // Desativa a restauração automática inconsistente do browser para controle preciso
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Guarda continuamente a posição do scroll para a página atual
  useEffect(() => {
    let timeoutId: number | null = null;

    const handleScroll = () => {
      if (timeoutId) cancelAnimationFrame(timeoutId);
      timeoutId = requestAnimationFrame(() => {
        // Não substitui se o loader inicial ainda estiver ativo
        if (!isInitialLoading) {
          sessionStorage.setItem(`scroll_pos_${pathname}`, window.scrollY.toString());
        }
      });
    };

    const handleBeforeUnload = () => {
      sessionStorage.setItem(`scroll_pos_${pathname}`, window.scrollY.toString());
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      if (timeoutId) cancelAnimationFrame(timeoutId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pathname, isInitialLoading]);

  // Restaura a posição no reload inicial ou gere o scroll para o topo em nova rota
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;

      // Se a URL contém um elemento âncora (ex: #presenca-internacional)
      if (hash) {
        const targetId = hash.replace('#', '');
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView();
        }, 150);
        return;
      }

      // Restaura a posição anterior se for refresh
      const savedPos = sessionStorage.getItem(`scroll_pos_${pathname}`);
      if (savedPos) {
        const targetY = parseInt(savedPos, 10);
        if (!isNaN(targetY) && targetY > 0) {
          window.scrollTo(0, targetY);
          requestAnimationFrame(() => window.scrollTo(0, targetY));
          setTimeout(() => window.scrollTo(0, targetY), 50);
          setTimeout(() => window.scrollTo(0, targetY), 200);
        }
      }
      return;
    }

    // Se o utilizador navegou para outra página (mudança real de rota)
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      sessionStorage.removeItem(`scroll_pos_${pathname}`);

      if (hash) {
        const targetId = hash.replace('#', '');
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }

      // Nova rota: scroll imediato para o topo
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
    }
  }, [pathname, hash]);

  // Quando o loader inicial terminar, reforça a estabilização da posição se foi reload
  useEffect(() => {
    if (!isInitialLoading) {
      if (hash) {
        const targetId = hash.replace('#', '');
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView();
        return;
      }

      const savedPos = sessionStorage.getItem(`scroll_pos_${pathname}`);
      if (savedPos) {
        const targetY = parseInt(savedPos, 10);
        if (!isNaN(targetY) && targetY > 0) {
          window.scrollTo(0, targetY);
        }
      }
    }
  }, [isInitialLoading, pathname, hash]);

  return null;
}