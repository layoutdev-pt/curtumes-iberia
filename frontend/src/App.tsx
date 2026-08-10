import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Catalogo as CatalogoPublico } from './pages/Catalogo';
import { Historia } from './pages/Historia';
import { Sustentabilidade } from './pages/Sustentabilidade';
import { Contactos } from './pages/Contactos';
import { PoliticaPrivacidade } from './pages/Legal/PoliticaPrivacidade';
import { TermosUtilizacao } from './pages/Legal/TermosUtilizacao';

// Importações do Dashboard
import { Login } from './pages/Dashboard/Login';
import { DashboardLayout } from './pages/Dashboard/DashboardLayout';
import { Kanban } from './pages/Dashboard/Kanban';
import { GestaoCatalogo } from './pages/Dashboard/GestaoCatalogo';
import { LanguageProvider } from './contexts/LanguageContext';

function AppContent() {
  const location = useLocation();
  
  // Verificamos se estamos numa rota de administração ou de login
  const isDashboardRoute = location.pathname.startsWith('/dashboard');
  const isLoginRoute = location.pathname === '/login';
  
  // Oculta a Navbar e o Footer no Dashboard e no Login
  const showPublicLayout = !isDashboardRoute && !isLoginRoute;

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* A Navbar agora SÓ aparece se estivermos no site público */}
      {showPublicLayout && <Navbar />}
      
      <main className="flex-grow">
        <Routes>
          {/* Frontend Público */}
          <Route path="/" element={<Home />} />
          <Route path="/historia" element={<Historia />} />
          <Route path="/sustentabilidade" element={<Sustentabilidade />} />
          <Route path="/catalogo" element={<CatalogoPublico />} />
          <Route path="/contactos" element={<Contactos />} />
          <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
          <Route path="/termos-utilizacao" element={<TermosUtilizacao />} />
          
          {/* Login Isolado (Sem Navbar e Sem Footer) */}
          <Route path="/login" element={<Login />} />
          
          {/* Rotas Agrupadas do Dashboard com Sidebar (Sem Navbar e Sem Footer) */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Kanban />} />
            <Route path="catalogo" element={<GestaoCatalogo />} />
          </Route>
        </Routes>
      </main>

      {/* Renderização condicional do Footer */}
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