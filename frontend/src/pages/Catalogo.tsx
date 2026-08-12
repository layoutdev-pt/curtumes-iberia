import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

interface Artigo {
  id: string;
  referencia: string;
  categoria: string;
  titulo_pt: string;
  titulo_en: string;
  descricao_pt: string;
  descricao_en: string;
  imagem_url: string;
}

const categoriasFiltro = [
  { id: 'all', labelPT: 'Todas as Categorias', labelEN: 'All Categories' },
  { id: 'Artigos Chrome Free', labelPT: 'Artigos Chrome Free', labelEN: 'Chrome Free Articles' },
  { id: 'Artigos Hidrofugados', labelPT: 'Artigos Hidrofugados', labelEN: 'Waterproof Articles' },
  { id: 'Outros Artigos', labelPT: 'Outros Artigos', labelEN: 'Other Articles' },
];

export function Catalogo() {
  const { language } = useLanguage();
  const formRef = useRef<HTMLDivElement>(null); // Referência para fazer scroll automático no Mobile

  const [artigos, setArtigos] = useState<Artigo[]>([]);
  const [loadingDados, setLoadingDados] = useState(true);
  
  const [artigoSelecionado, setArtigoSelecionado] = useState<Artigo | null>(null);
  const [filtroAtivo, setFiltroAtivo] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchArtigos = async () => {
      try {
        const { data, error } = await supabase
          .from('artigos')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) setArtigos(data);
      } catch (error) {
        console.error("Erro ao carregar o catálogo:", error);
      } finally {
        setLoadingDados(false);
      }
    };

    fetchArtigos();
  }, []);

  const artigosFiltrados = artigos.filter(artigo => 
    filtroAtivo === 'all' ? true : artigo.categoria === filtroAtivo
  );

  const getCategoriaLabel = (id: string) => {
    const cat = categoriasFiltro.find(c => c.id === id);
    if (!cat) return '';
    return language === 'PT' ? cat.labelPT : cat.labelEN;
  };

  // Função para selecionar artigo e subir a página em ecrãs móveis
  const handleSelectArticle = (artigo: Artigo) => {
    setArtigoSelecionado(artigo);
    // Se for ecrã menor que 'lg' (1024px), faz scroll suave para o formulário
    if (window.innerWidth < 1024) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen lg:h-screen pt-24 lg:pt-28 bg-[#F8FAFC] relative overflow-x-hidden">
      
      {/* ELEMENTOS GRÁFICOS DO BRAND BOOK */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
        <div className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-blue-200 via-green-100 to-orange-100 blur-3xl opacity-50 mix-blend-multiply"></div>
        <svg className="absolute top-[10%] right-[30%] w-96 h-96 text-institucional-blue/10 rotate-12" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M45.7,-76.4C58.9,-69.3,69.1,-55.4,78.2,-41.1C87.3,-26.8,95.3,-12.1,94.2,2C93.1,16.1,82.8,29.6,72.4,41.4C62,53.2,51.5,63.3,39,70.5C26.5,77.7,11.9,82,-3.1,87C-18.1,92,-33.5,77.7,-46.8,68.2C-60.1,58.7,-71.3,44.1,-77.6,28.1C-83.9,12.1,-85.3,-5.3,-79.8,-20.1C-74.3,-34.9,-61.9,-47.1,-48.5,-54.6C-35.1,-62.1,-20.7,-64.9,-4.9,-56.9C10.9,-48.9,21.8,-30.1,32.4,-83.4Z" transform="translate(100 100)" />
        </svg>
      </div>

      {/* LATERAL ESQUERDA: Formulário Animado */}
      <motion.div 
        ref={formRef}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full lg:w-[400px] xl:w-[450px] bg-white p-6 lg:p-8 shadow-[10px_0_15px_-3px_rgba(0,0,0,0.05)] z-20 flex flex-col relative border-b lg:border-b-0 lg:border-r border-gray-100 lg:h-full lg:overflow-y-auto custom-scrollbar"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-institucional-blue to-blue-400"></div>
        
        <h2 className="text-2xl font-title font-bold text-institucional-blue mb-6 mt-2">
          {language === 'PT' ? 'Solicitar Encomenda' : 'Request Order'}
        </h2>
        
        <form className="flex-grow flex flex-col space-y-5">
          
          <div className={`p-4 rounded-lg border transition-colors ${artigoSelecionado ? 'bg-blue-50/50 border-institucional-blue/30' : 'bg-gray-50 border-gray-200'}`}>
            <p className="text-xs text-institucional-blue uppercase tracking-wider font-bold mb-1">
              {language === 'PT' ? 'Artigo de Interesse' : 'Selected Article'}
            </p>
            {artigoSelecionado ? (
              <div>
                <p className="text-gray-900 font-semibold leading-snug">
                  {language === 'PT' ? artigoSelecionado.titulo_pt : artigoSelecionado.titulo_en}
                </p>
                <p className="text-xs text-gray-500 font-mono mt-1">REF: {artigoSelecionado.referencia}</p>
              </div>
            ) : (
              <p className="text-gray-400 text-sm italic">
                {language === 'PT' ? 'Selecione uma pele no catálogo abaixo.' : 'Select a leather from the catalog below.'}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
              {language === 'PT' ? 'Empresa / NIF *' : 'Company / VAT *'}
            </label>
            <input type="text" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded focus:bg-white focus:ring-2 focus:ring-institucional-blue/20 focus:border-institucional-blue outline-none transition-all text-sm" required />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
              {language === 'PT' ? 'Nome de Contacto *' : 'Contact Name *'}
            </label>
            <input type="text" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded focus:bg-white focus:ring-2 focus:ring-institucional-blue/20 focus:border-institucional-blue outline-none transition-all text-sm" required />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
              {language === 'PT' ? 'E-mail Corporativo *' : 'Corporate E-mail *'}
            </label>
            <input type="email" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded focus:bg-white focus:ring-2 focus:ring-institucional-blue/20 focus:border-institucional-blue outline-none transition-all text-sm" required />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
              {language === 'PT' ? 'Área Estimada (SqFt) *' : 'Estimated Area (SqFt) *'}
            </label>
            <input type="number" min="1" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded focus:bg-white focus:ring-2 focus:ring-institucional-blue/20 focus:border-institucional-blue outline-none transition-all text-sm" required />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
              {language === 'PT' ? 'Especificações' : 'Specifications'}
            </label>
            <textarea rows={3} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded focus:bg-white focus:ring-2 focus:ring-institucional-blue/20 focus:border-institucional-blue outline-none transition-all text-sm resize-none"></textarea>
          </div>

          <div className="pt-4 lg:mt-auto lg:pt-6">
            <button 
              type="submit" 
              className="w-full bg-institucional-blue text-white py-3.5 rounded font-bold hover:bg-blue-900 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!artigoSelecionado}
            >
              {language === 'PT' ? 'Submeter Pedido' : 'Submit Order'}
            </button>
            {!artigoSelecionado && (
              <p className="text-xs text-red-500 text-center mt-3 font-medium">
                {language === 'PT' ? 'É obrigatório selecionar um artigo.' : 'It is mandatory to select an article.'}
              </p>
            )}
          </div>
        </form>
      </motion.div>

      {/* LATERAL DIREITA: Catálogo de Produtos */}
      <div className="flex-1 p-4 sm:p-6 lg:p-10 relative z-10 lg:h-full lg:overflow-y-auto custom-scrollbar">
        
        {/* Cabeçalho Animado */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 lg:mb-10 border-b border-gray-200/60 pb-6 relative z-20"
        >
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl lg:text-4xl font-title font-bold text-institucional-blue tracking-tight">
              {language === 'PT' ? 'Catálogo de Artigos' : 'Leather Catalog'}
            </h1>
            <p className="text-gray-500 mt-2 text-sm max-w-md">
              {language === 'PT' 
                ? 'Explore a nossa gama de peles desenvolvidas sob processos de economia circular.' 
                : 'Explore our range of leathers developed under circular economy processes.'}
            </p>
          </div>
          
          <div className="relative w-full md:w-64">
            <button 
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white/95 backdrop-blur-md border border-gray-200 rounded-xl text-sm font-bold text-institucional-blue shadow-sm hover:border-institucional-blue/50 focus:outline-none focus:ring-2 focus:ring-institucional-blue/20 transition-all"
            >
              <span>{getCategoriaLabel(filtroAtivo)}</span>
              <svg 
                className={`w-4 h-4 text-institucional-blue transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="fixed inset-0 z-30" onClick={() => setIsDropdownOpen(false)}></div>
            )}
            
            <ul 
              className={`absolute right-0 z-40 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden transition-all duration-300 origin-top transform ${
                isDropdownOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
              }`}
            >
              {categoriasFiltro.map(cat => (
                <li 
                  key={cat.id}
                  onClick={() => {
                    setFiltroAtivo(cat.id);
                    setIsDropdownOpen(false);
                  }}
                  className={`px-4 py-3 text-sm cursor-pointer transition-colors ${
                    filtroAtivo === cat.id 
                      ? 'bg-institucional-blue text-white font-bold' 
                      : 'text-gray-600 hover:bg-blue-50 hover:text-institucional-blue font-medium'
                  }`}
                >
                  {language === 'PT' ? cat.labelPT : cat.labelEN}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Grelha de Produtos Reais da Base de Dados */}
        {loadingDados ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-institucional-blue"></div>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 pb-12">
            <AnimatePresence>
              {artigosFiltrados.length > 0 ? (
                artigosFiltrados.map((artigo, index) => (
                  <motion.div 
                    layout 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }} 
                    key={artigo.id} 
                    className={`bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm border transition-all duration-300 cursor-pointer group hover:shadow-xl hover:-translate-y-1 ${
                      artigoSelecionado?.id === artigo.id ? 'border-institucional-blue ring-2 ring-institucional-blue/30' : 'border-gray-100 hover:border-gray-300'
                    }`}
                    onClick={() => handleSelectArticle(artigo)}
                  >
                    <div className="h-48 lg:h-52 bg-institucional-blue/5 overflow-hidden relative">
                      <img src={artigo.imagem_url} alt={artigo.titulo_pt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out mix-blend-multiply" />
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 text-xs font-bold rounded-full text-institucional-blue shadow-sm border border-gray-100">
                        {artigo.referencia}
                      </div>
                    </div>
                    <div className="p-5 lg:p-6">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">
                        {language === 'PT' ? categoriasFiltro.find(c => c.id === artigo.categoria)?.labelPT : categoriasFiltro.find(c => c.id === artigo.categoria)?.labelEN}
                      </p>
                      <h3 className="font-title font-bold text-lg lg:text-xl text-gray-900 mb-2 lg:mb-3">
                        {language === 'PT' ? artigo.titulo_pt : artigo.titulo_en}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {language === 'PT' ? artigo.descricao_pt : artigo.descricao_en}
                      </p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="col-span-full py-12 text-center"
                >
                  <p className="text-gray-500 font-medium">
                    {language === 'PT' ? 'Não foram encontrados artigos nesta categoria.' : 'No articles found in this category.'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}