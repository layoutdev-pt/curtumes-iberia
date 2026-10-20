// DashboardLayout.tsx
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useLanguage } from '../../contexts/LanguageContext';

const content = {
  PT: {
    panel: "Painel de Controlo",
    orders: "Gestão de Encomendas",
    inventory: "Inventário Catálogo",
    addCatalog: "Adicionar Artigo",
    viewSite: "Ver Site Público",
    logout: "Terminar Sessão"
  },
  EN: {
    panel: "Control Panel",
    orders: "Order Management",
    inventory: "Catalog Inventory",
    addCatalog: "Add Article",
    viewSite: "View Public Site",
    logout: "Logout"
  }
};

export function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const data = content[language];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F4F6F8]">
      
      <aside className="w-16 md:w-72 shrink-0 bg-institucional-blue text-white flex flex-col shadow-xl z-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
        
        <div className="p-3 md:p-8 border-b border-white/10 relative z-10 flex flex-col items-center">
          <img src="/logos/Icone_Branco.svg" alt="Logo" className="h-9 md:h-12 w-auto md:mb-4" />
          <h2 className="hidden md:block text-xl font-title font-bold tracking-wide">Admin Global</h2>
          <p className="hidden md:block text-xs text-blue-200 mt-1 uppercase tracking-widest">{data.panel}</p>
        </div>
        
        <nav className="flex-1 p-2 md:p-4 space-y-2 overflow-y-auto relative z-10 mt-2 md:mt-4">
          <Link 
            to="/dashboard" 
            title={data.orders}
            className={`flex items-center justify-center md:justify-start px-2 md:px-4 py-3.5 rounded-xl transition-all font-title font-bold ${
              location.pathname === '/dashboard' 
                ? 'bg-white text-institucional-blue shadow-md translate-x-1' 
                : 'hover:bg-white/10 text-gray-300 hover:text-white'
            }`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
            <span className="hidden md:inline">{data.orders}</span>
          </Link>
          
          <Link 
            to="/dashboard/lista-catalogo" 
            title={data.inventory}
            className={`flex items-center justify-center md:justify-start px-2 md:px-4 py-3.5 rounded-xl transition-all font-title font-bold ${
              location.pathname === '/dashboard/lista-catalogo' 
                ? 'bg-white text-institucional-blue shadow-md translate-x-1' 
                : 'hover:bg-white/10 text-gray-300 hover:text-white'
            }`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <span className="hidden md:inline">{data.inventory}</span>
          </Link>

          <Link 
            to="/dashboard/catalogo" 
            title={data.addCatalog}
            className={`flex items-center justify-center md:justify-start px-2 md:px-4 py-3.5 rounded-xl transition-all font-title font-bold ${
              location.pathname === '/dashboard/catalogo' 
                ? 'bg-white text-institucional-blue shadow-md translate-x-1' 
                : 'hover:bg-white/10 text-gray-300 hover:text-white'
            }`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden md:inline">{data.addCatalog}</span>
          </Link>
        </nav>

        <div className="p-2 md:p-6 border-t border-white/10 relative z-10">
          <Link to="/" title={data.viewSite} className="w-full text-center block px-1 md:px-4 py-2 text-[10px] md:text-xs font-bold text-blue-200 hover:text-white transition-colors mb-2 md:mb-4 border border-white/20 rounded-lg font-title tracking-wider">
            <span className="hidden md:inline">{data.viewSite}</span><span className="md:hidden">↗</span>
          </Link>
          <button 
            onClick={handleLogout}
            title={data.logout}
            className="w-full flex items-center justify-center px-1 md:px-4 py-2.5 text-sm text-red-200 hover:text-white hover:bg-red-500/20 rounded-lg transition-colors font-title font-bold tracking-wider"
          >
            <svg className="w-4 h-4 md:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="hidden md:inline">{data.logout}</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <div className="flex-1 overflow-y-auto p-4 md:p-8 xl:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
