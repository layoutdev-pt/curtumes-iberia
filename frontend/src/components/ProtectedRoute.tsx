import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Verifica se existe uma sessão ativa no Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthenticated(!!session);
      setLoading(false);
    });

    // Opcional: Escuta mudanças de autenticação (ex: se o token expirar)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    // Ecrã de carregamento elegante enquanto o Supabase valida a sessão
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-institucional-blue font-bold text-lg animate-pulse">A verificar autenticação...</div>
      </div>
    );
  }

  // Se não estiver logado, redireciona imediatamente para o login
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver logado, renderiza o painel (Outlet)
  return <Outlet />;
}