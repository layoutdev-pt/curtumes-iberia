import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { PageHeader } from '../components/ui/PageHeader';
import { CATEGORIAS_FILTRO, labelCategoria } from '../lib/categorias';

interface Artigo {
  id: string;
  referencia: string;
  categoria: string;
  titulo_pt: string;
  titulo_en: string;
  descricao_pt: string;
  descricao_en: string;
  imagem_url: string;
  cores?: any[];
  tags?: any;
  categorias?: string[];
}

const content = {
  PT: {
    heroTitle: 'Artigos',
    heroText: 'Conheça os nossos couros para calçado e marroquinaria, desenvolvidos em diferentes cores, texturas, acabamentos e características técnicas.',
    empty: 'Não foram encontrados artigos nesta categoria.',
    cta: 'Ver Artigo'
  },
  EN: {
    heroTitle: 'Articles',
    heroText: 'Discover our leathers for footwear and leather goods, developed in different colours, textures, finishes and technical characteristics.',
    empty: 'No articles found in this category.',
    cta: 'View Article'
  }
};

export function Catalogo() {
  const { language } = useLanguage();
  const data = content[language];
  const [searchParams, setSearchParams] = useSearchParams();
  const [artigos, setArtigos] = useState<Artigo[]>([]);
  const [loadingDados, setLoadingDados] = useState(true);

  const filtroAtivo = searchParams.get('categoria') || 'all';
  const setFiltroAtivo = (id: string) => {
    if (id === 'all') {
      searchParams.delete('categoria');
    } else {
      searchParams.set('categoria', id);
    }
    setSearchParams(searchParams);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchArtigos = async () => {
      try {
        const { data, error } = await supabase.from('artigos').select('*').order('created_at', { ascending: false });
        if (error) throw error;

        if (data) {
          const parsedData = data.map(art => ({
            ...art,
            cores: typeof art.cores === 'string' ? JSON.parse(art.cores) : art.cores || [],
            tags: typeof art.tags === 'string' ? JSON.parse(art.tags) : art.tags || [],
            categorias: typeof art.categorias === 'string' ? JSON.parse(art.categorias) : art.categorias || []
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


  return (
    <div className="bg-[#F8FAFC] min-h-screen relative overflow-x-hidden">

      {/* Hero igual ao de Sobre Nós */}
      <PageHeader
        title={data.heroTitle}
        subtitle={data.heroText}
        backgroundImage="/imagens/fotos/Artigos.JPG"
      />

      <div className="max-w-[1500px] mx-auto px-6 relative z-10 pt-16 md:pt-20 pb-24 md:pb-32">

        {/* Filtro por categoria */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-end items-center mb-12 border-b border-gray-200 pb-6"
        >
          <div className="relative w-full md:w-72">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-5 py-3.5 bg-white border border-gray-300 font-bold uppercase tracking-[0.15em] text-xs text-institucional-blue hover:border-institucional-blue transition-all"
            >
              <span>{labelCategoria(filtroAtivo, language)}</span>
              <svg className={`w-4 h-4 text-institucional-blue transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && <div className="fixed inset-0 z-30" onClick={() => setIsDropdownOpen(false)}></div>}

            <ul className={`absolute right-0 z-40 w-full mt-1 bg-white border border-gray-300 shadow-xl overflow-hidden transition-all duration-300 origin-top transform ${isDropdownOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
              {CATEGORIAS_FILTRO.map(cat => (
                <li key={cat.id} onClick={() => { setFiltroAtivo(cat.id); setIsDropdownOpen(false); }} className={`px-5 py-3 text-xs uppercase tracking-[0.15em] cursor-pointer transition-colors ${filtroAtivo === cat.id ? 'bg-institucional-blue text-white font-bold' : 'text-gray-600 hover:bg-blue-50 hover:text-institucional-blue font-medium'}`}>
                  {language === 'PT' ? cat.labelPT : cat.labelEN}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* GRELHA SHOWROOM — FOTOS GRANDES, SEM MOLDURA */}
        {loadingDados ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-institucional-blue"></div>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14">
            <AnimatePresence>
              {artigosFiltrados.length > 0 ? (
                artigosFiltrados.map((artigo, index) => (
                  <Link to={`/produto/${artigo.id}`} key={artigo.id} className="group">
                    <motion.div
                      layoutId={`card-${artigo.id}`}
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
                      className="h-full flex flex-col cursor-pointer"
                    >
                      <div className="aspect-[4/5] bg-slate-100 overflow-hidden relative">
                        <motion.img
                          layoutId={`img-${artigo.id}`}
                          src={artigo.imagem_url}
                          alt={language === 'PT' ? artigo.titulo_pt : artigo.titulo_en}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                        />
                        {artigo.tags && artigo.tags.length > 0 && (
                          <div className="absolute bottom-0 left-0 bg-institucional-blue px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-white flex items-center">
                            <span className="mr-2">{artigo.tags[0].icone}</span> {language === 'PT' ? artigo.tags[0].pt : artigo.tags[0].en}
                          </div>
                        )}
                      </div>

                      <div className="pt-5 flex flex-col flex-grow">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.25em] mb-2">
                          {labelCategoria(artigo.categoria, language)}
                        </p>
                        {/* O nome da pele é a própria referência do artigo */}
                        <h3 className="font-title font-bold text-2xl text-institucional-blue uppercase tracking-tight mb-3">
                          {language === 'PT' ? artigo.titulo_pt : artigo.titulo_en}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-5 flex-grow font-light">
                          {language === 'PT' ? artigo.descricao_pt : artigo.descricao_en}
                        </p>
                        {/* Variantes de Cor — pequenos círculos */}
                        {artigo.cores && artigo.cores.length > 0 && (
                          <div className="flex items-center gap-2 mb-4">
                            <div className="flex -space-x-1.5 items-center">
                              {artigo.cores.slice(0, 5).map((c: any, i: number) => (
                                <span
                                  key={i}
                                  className="w-3.5 h-3.5 rounded-full border border-white shadow-xs overflow-hidden inline-block bg-slate-200"
                                  title={language === 'PT' ? c.nome_pt : c.nome_en}
                                  style={
                                    c.img_url
                                      ? { backgroundImage: `url(${c.img_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                                      : { backgroundColor: c.hex || '#cbd5e1' }
                                  }
                                />
                              ))}
                            </div>
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                              {artigo.cores.length} {language === 'PT' ? (artigo.cores.length === 1 ? 'cor' : 'cores') : (artigo.cores.length === 1 ? 'colour' : 'colours')}
                            </span>
                          </div>
                        )}

                        <div className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-institucional-blue group-hover:gap-3 transition-all">
                          <span>{data.cta}</span>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-20 text-center">
                  <p className="text-gray-500 font-medium text-lg">{data.empty}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
