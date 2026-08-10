import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useLanguage } from '../../contexts/LanguageContext'; // Importamos o motor bilingue

const content = {
  PT: {
    panel: "Painel de Controlo",
    orders: "Gestão de Encomendas",
    catalog: "Gestão de Catálogo",
    viewSite: "Ver Site Público",
    logout: "Terminar Sessão"
  },
  EN: {
    panel: "Control Panel",
    orders: "Order Management",
    catalog: "Catalog Management",
    viewSite: "View Public Site",
    logout: "Logout"
  }
};

export function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Consumir o idioma
  const { language } = useLanguage();
  const data = content[language];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F8FAFC]">
      
      <aside className="w-72 bg-institucional-blue text-white flex flex-col shadow-2xl z-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
        
        <div className="p-8 border-b border-white/10 relative z-10 flex flex-col items-center">
          <img src="/logos/Icone_Branco.svg" alt="Logo" className="h-12 w-auto mb-4" />
          <h2 className="text-xl font-title font-bold tracking-wide">Admin Global</h2>
          <p className="text-xs text-blue-200 mt-1 uppercase tracking-widest">{data.panel}</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto relative z-10 mt-4">
          <Link 
            to="/dashboard" 
            className={`flex items-center px-4 py-3.5 rounded-xl transition-all font-medium ${
              location.pathname === '/dashboard' 
                ? 'bg-white text-institucional-blue shadow-md translate-x-1' 
                : 'hover:bg-white/10 text-gray-300 hover:text-white'
            }`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
            {data.orders}
          </Link>
          
          <Link 
            to="/dashboard/catalogo" 
            className={`flex items-center px-4 py-3.5 rounded-xl transition-all font-medium ${
              location.pathname === '/dashboard/catalogo' 
                ? 'bg-white text-institucional-blue shadow-md translate-x-1' 
                : 'hover:bg-white/10 text-gray-300 hover:text-white'
            }`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            {data.catalog}
          </Link>
        </nav>

        <div className="p-6 border-t border-white/10 relative z-10">
          <Link to="/" className="w-full text-center block px-4 py-2 text-xs text-blue-200 hover:text-white transition-colors mb-4 border border-white/20 rounded-lg">
            {data.viewSite}
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-2.5 text-sm text-red-200 hover:text-white hover:bg-red-500/20 rounded-lg transition-colors font-bold"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {data.logout}
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <div className="flex-1 overflow-y-auto p-8 md:p-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
}