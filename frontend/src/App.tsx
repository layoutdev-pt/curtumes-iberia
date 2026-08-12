import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // <-- Importações das animações

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/layout/ScrollToTop'; // <-- O nosso novo utilitário

import { Home } from './pages/Home';
import { Catalogo as CatalogoPublico } from './pages/Catalogo';
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
import { LanguageProvider } from './contexts/LanguageContext';

function AppContent() {
  const location = useLocation();
  
  const isDashboardRoute = location.pathname.startsWith('/dashboard');
  const isLoginRoute = location.pathname === '/login';
  const showPublicLayout = !isDashboardRoute && !isLoginRoute;

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. O utilitário que atira o utilizador para o topo em cada clique */}
      <ScrollToTop />
      
      {showPublicLayout && <Navbar />}
      
      <main className="flex-grow flex flex-col relative overflow-hidden">
        {/* 2. AnimatePresence gere a saída e entrada das páginas */}
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 5 }}    // Estado inicial (invisível e ligeiramente abaixo)
            animate={{ opacity: 1, y: 0 }}     // Estado final (visível e no sítio)
            exit={{ opacity: 0, y: -10 }}      // Como sai (desvanece e sobe)
            transition={{ duration: 0.4, ease: "easeOut" }} // Suavidade da transição
            className="flex-grow flex flex-col"
          >
            {/* É obrigatório passar a location para o Routes quando usamos AnimatePresence */}
            <Routes location={location}>
              {/* Frontend Público */}
              <Route path="/" element={<Home />} />
              <Route path="/historia" element={<Historia />} />
              <Route path="/sustentabilidade" element={<Sustentabilidade />} />
              <Route path="/catalogo" element={<CatalogoPublico />} />
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
        </AnimatePresence>
      </main>

      {showPublicLayout && <Footer />}
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