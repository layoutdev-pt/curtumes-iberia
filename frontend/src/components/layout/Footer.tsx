import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-institucional-blue text-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Identidade e Redes Sociais */}
          <div>
            <h3 className="font-title font-bold text-xl mb-4">CURTUMES IBÉRIA</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" target="_blank" rel="noreferrer" className="hover:opacity-75 transition-opacity">Facebook</a>
              <a href="#" target="_blank" rel="noreferrer" className="hover:opacity-75 transition-opacity">Instagram</a>
              <a href="#" target="_blank" rel="noreferrer" className="hover:opacity-75 transition-opacity">LinkedIn</a>
            </div>
            <p className="text-sm opacity-80">Rua 24 de Junho, 1399<br/>2380-639 Vila Moreira, Portugal</p>
          </div>

          {/* Financiamento Governamental (Obrigatório) */}
          <div className="flex flex-col items-start md:items-center">
            <h4 className="font-bold mb-4">Cofinanciado por:</h4>
            {/* Marcador de lugar para os logótipos reais do PRF */}
            <div className="w-48 h-16 bg-white/10 border border-white/20 flex items-center justify-center rounded text-sm">
              [Logótipos PRF / UE]
            </div>
          </div>

          {/* Links Legais em Hardcode */}
          <div className="flex flex-col items-start md:items-end space-y-2 text-sm">
            <Link to="/politica-privacidade" className="hover:underline">Política de Privacidade</Link>
            <Link to="/termos-utilizacao" className="hover:underline">Termos de Utilização</Link>
            <p className="mt-4 opacity-60">© {new Date().getFullYear()} Curtumes Ibéria, S.A.</p>
          </div>
          
        </div>
      </div>
    </footer>
  );
}