import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Artigo {
  id: string;
  referencia: string;
  categoria: string;
  titulo_pt: string;
  titulo_en: string;
  descricao_pt: string;
  descricao_en: string;
  imagem_url: string;
  tags?: any;
}

const categoriasFiltro = [
  { id: 'all', labelPT: 'Todas as Categorias', labelEN: 'All Categories' },
  { id: 'Hidrofogados', labelPT: 'Hidrofogados', labelEN: 'Waterproof' },
  { id: 'Camurças', labelPT: 'Camurças', labelEN: 'Suedes' },
  { id: 'Napas', labelPT: 'Napas', labelEN: 'Nappas' },
  { id: 'Anilinas', labelPT: 'Anilinas', labelEN: 'Anilines' },
  { id: 'Fantasia', labelPT: 'Fantasia', labelEN: 'Fantasy' },
  { id: 'Nubucks', labelPT: 'Nubucks', labelEN: 'Nubucks' },
  { id: 'Floaters', labelPT: 'Floaters', labelEN: 'Floaters' },
  { id: 'Ceras e Óleos', labelPT: 'Ceras e Óleos', labelEN: 'Waxes and Oils' }
];

export function Catalogo() {
  const { language } = useLanguage();
  const [artigos, setArtigos] = useState<Artigo[]>([]);
  const [loadingDados, setLoadingDados] = useState(true);
  const [filtroAtivo, setFiltroAtivo] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchArtigos = async () => {
      try {
        const { data, error } = await supabase.from('artigos').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        
        if (data) {
          const parsedData = data.map(art => ({
            ...art,
            tags: typeof art.tags === 'string' ? JSON.parse(art.tags) : art.tags || []
          }));
          setArtigos(parsedData);
        }
      } catch (error) {
        console.error("Erro:", error);
      } finally {
        setLoadingDados(false);
      }
    };
    fetchArtigos();
  }, []);

  const artigosFiltrados = artigos.filter(artigo => filtroAtivo === 'all' ? true : artigo.categoria === filtroAtivo);

  const getCategoriaLabel = (id: string) => {
    const cat = categoriasFiltro.find(c => c.id === id);
    return language === 'PT' ? cat?.labelPT : cat?.labelEN;
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-32 pb-24 relative overflow-x-hidden">
      
      {/* Background Decorativo Suave */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
        <div className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-blue-200 via-green-100 to-orange-100 blur-3xl opacity-50 mix-blend-multiply"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Cabeçalho do Catálogo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-gray-200/60 pb-8"
        >
          <div className="mb-6 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-title font-bold text-institucional-blue tracking-tight">
              {language === 'PT' ? 'Catálogo' : 'Catalog'}
            </h1>
            <p className="text-gray-500 mt-3 text-lg max-w-xl leading-relaxed">
              {language === 'PT' 
                ? 'Explore a nossa gama de peles de elevada qualidade, desenvolvidas sob processos sustentáveis de economia circular.' 
                : 'Explore our range of high-quality leathers, developed under sustainable circular economy processes.'}
            </p>
          </div>
          
          <div className="relative w-full md:w-72">
            <button 
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-5 py-3.5 bg-white/95 backdrop-blur-md border border-gray-200 rounded-xl font-bold text-institucional-blue shadow-sm hover:border-institucional-blue/50 transition-all"
            >
              <span>{getCategoriaLabel(filtroAtivo)}</span>
              <svg className={`w-4 h-4 text-institucional-blue transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && <div className="fixed inset-0 z-30" onClick={() => setIsDropdownOpen(false)}></div>}
            
            <ul className={`absolute right-0 z-40 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden transition-all duration-300 origin-top transform ${isDropdownOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
              {categoriasFiltro.map(cat => (
                <li key={cat.id} onClick={() => { setFiltroAtivo(cat.id); setIsDropdownOpen(false); }} className={`px-5 py-3 text-sm cursor-pointer transition-colors ${filtroAtivo === cat.id ? 'bg-institucional-blue text-white font-bold' : 'text-gray-600 hover:bg-blue-50 hover:text-institucional-blue font-medium'}`}>
                  {language === 'PT' ? cat.labelPT : cat.labelEN}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* GRELHA SHOWROOM FULL-WIDTH */}
        {loadingDados ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-institucional-blue"></div>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence>
              {artigosFiltrados.length > 0 ? (
                artigosFiltrados.map((artigo, index) => (
                  <Link to={`/produto/${artigo.id}`} key={artigo.id}>
                    <motion.div 
                      layoutId={`card-${artigo.id}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }} 
                      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 group hover:shadow-2xl hover:-translate-y-2 h-full flex flex-col cursor-pointer"
                    >
                      <div className="aspect-[4/3] bg-institucional-blue/5 overflow-hidden relative">
                        <motion.img layoutId={`img-${artigo.id}`} src={artigo.imagem_url} alt={artigo.titulo_pt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out mix-blend-multiply" />
                        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 text-xs font-bold rounded-full text-institucional-blue shadow-sm border border-gray-100">
                          {artigo.referencia}
                        </div>
                        {artigo.tags && artigo.tags.length > 0 && (
                          <div className="absolute bottom-3 left-3 bg-green-500/90 backdrop-blur-md px-3 py-1.5 text-xs font-bold rounded-full text-white shadow-md flex items-center">
                            <span className="mr-1">{artigo.tags[0].icone}</span> {language === 'PT' ? artigo.tags[0].pt : artigo.tags[0].en}
                          </div>
                        )}
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">
                          {language === 'PT' ? categoriasFiltro.find(c => c.id === artigo.categoria)?.labelPT : categoriasFiltro.find(c => c.id === artigo.categoria)?.labelEN}
                        </p>
                        <h3 className="font-title font-bold text-xl text-gray-900 mb-3 group-hover:text-institucional-blue transition-colors">
                          {language === 'PT' ? artigo.titulo_pt : artigo.titulo_en}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-4 flex-grow">
                          {language === 'PT' ? artigo.descricao_pt : artigo.descricao_en}
                        </p>
                        <div className="mt-auto flex justify-between items-center text-sm font-bold text-institucional-blue opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                          {language === 'PT' ? 'Ver Ficha Completa' : 'View Details'}
                          <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-20 text-center">
                  <p className="text-gray-500 font-medium text-lg">
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