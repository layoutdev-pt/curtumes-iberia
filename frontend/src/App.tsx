import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { Loader } from './components/layout/Loader';

import { Home } from './pages/Home';
import { Catalogo as CatalogoPublico } from './pages/Catalogo';
import { ArtigoDetalhe } from './pages/ArtigoDetalhe'; // <-- Import da Nova Página de Produto
import { Historia } from './pages/Historia';
import { Sustentabilidade } from './pages/Sustentabilidade';
import { Contactos } from './pages/Contactos';
import { PoliticaPrivacidade } from './pages/Legal/PoliticaPrivacidade';
import { TermosUtilizacao } from './pages/Legal/TermosUtilizacao';

import { Login } from './pages/Dashboard/Login';
import { DashboardLayout } from './pages/Dashboard/DashboardLayout';
import { Kanban } from './pages/Dashboard/Kanban';
import { GestaoCatalogo } from './pages/Dashboard/GestaoCatalogo';
import { ListaCatalogo } from './pages/Dashboard/ListaCatalogo';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

function AppContent() {
  const location = useLocation();
  const { language } = useLanguage();
  
  // Estado para controlar o Splash Screen inicial
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const isDashboardRoute = location.pathname.startsWith('/dashboard');
  const isLoginRoute = location.pathname === '/login';
  const showPublicLayout = !isDashboardRoute && !isLoginRoute;

  // Lógica para esconder o Loader após 1.8 segundos (tempo para a barra encher)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative">
      
      {/* O Loader é mostrado por cima de tudo enquanto isInitialLoading for true */}
      <AnimatePresence>
        {isInitialLoading && <Loader />}
      </AnimatePresence>
      
      <ScrollToTop />
      
      {showPublicLayout && (
        <div className="relative z-50">
          <motion.div key={`nav-${language}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <Navbar />
          </motion.div>
        </div>
      )}
      
      <main className="flex-grow flex flex-col relative z-0">
        <AnimatePresence mode="wait">
          {/* Só renderizamos as rotas após o Loader terminar, para as animações das páginas não dispararem "às escondidas" */}
          {!isInitialLoading && (
            <motion.div
              key={`${location.pathname}-${language}`} 
              initial={{ opacity: 0, y: 5 }}    
              animate={{ opacity: 1, y: 0 }}     
              exit={{ opacity: 0, y: -10 }}      
              transition={{ duration: 0.3, ease: "easeOut" }} 
              className="flex-grow flex flex-col"
            >
              <Routes location={location}>
                {/* Frontend Público */}
                <Route path="/" element={<Home />} />
                <Route path="/historia" element={<Historia />} />
                <Route path="/sustentabilidade" element={<Sustentabilidade />} />
                <Route path="/catalogo" element={<CatalogoPublico />} />
                <Route path="/produto/:id" element={<ArtigoDetalhe />} /> {/* <-- Nova Rota Registada */}
                <Route path="/contactos" element={<Contactos />} />
                <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
                <Route path="/termos-utilizacao" element={<TermosUtilizacao />} />
                
                {/* Login Isolado */}
                <Route path="/login" element={<Login />} />
                
                {/* Rotas Agrupadas do Dashboard com Sidebar */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<Kanban />} />
                    <Route path="lista-catalogo" element={<ListaCatalogo />} />
                    <Route path="catalogo" element={<GestaoCatalogo />} />
                  </Route>
                </Route>
              </Routes>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {showPublicLayout && <Footer key={`footer-${language}`} />}
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}

export default App;