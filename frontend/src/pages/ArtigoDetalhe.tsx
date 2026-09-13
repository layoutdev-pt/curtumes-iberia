import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export function ArtigoDetalhe() {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  
  const [artigo, setArtigo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [corAtiva, setCorAtiva] = useState<number | null>(null);

  // Estados do Formulário de Encomenda
  const [formEncomenda, setFormEncomenda] = useState({
    empresa: '', nome: '', email: '', quantidade: '', obs: ''
  });
  
  // Estado de envio
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const fetchArtigo = async () => {
      try {
        const { data, error } = await supabase.from('artigos').select('*').eq('id', id).single();
        if (error) throw error;
        if (data) {
          const parsedArtigo = {
            ...data,
            cores: typeof data.cores === 'string' ? JSON.parse(data.cores) : data.cores || [],
            detalhes: typeof data.detalhes === 'string' ? JSON.parse(data.detalhes) : data.detalhes || [],
            tags: typeof data.tags === 'string' ? JSON.parse(data.tags) : data.tags || []
          };
          setArtigo(parsedArtigo);
          
          if (parsedArtigo.cores && parsedArtigo.cores.length > 0) {
            setCorAtiva(0);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchArtigo();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-institucional-blue"></div>
    </div>;
  }

  if (!artigo) return <div className="min-h-screen pt-32 text-center font-title text-xl">Artigo não encontrado.</div>;

  const handleFormChange = (e: any) => {
    setFormEncomenda({ ...formEncomenda, [e.target.name]: e.target.value });
  };

  // ------------------------------------------------------------------
  // LÓGICA DE SUBMISSÃO PARA O KANBAN
  // ------------------------------------------------------------------
  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Cria a string da cor para o Kanban (se houver cor selecionada)
      const corSelecionada = corAtiva !== null 
        ? `${artigo.cores[corAtiva].nome_pt} / ${artigo.cores[corAtiva].nome_en}`
        : 'S/Cor';

      // Junta as notas com a cor selecionada (caso exista)
      const notasFormatadas = `Cor Selecionada: ${corSelecionada}\n\n${formEncomenda.obs}`;

      // Insere na base de dados na tabela 'encomendas'
      // O status 'pendente' garante que aparece na primeira coluna do Kanban
      const { error } = await supabase.from('encomendas').insert([{
        referencia_produto: artigo.referencia,
        nome_cliente: formEncomenda.nome,
        empresa_nif: formEncomenda.empresa,
        email_cliente: formEncomenda.email,
        quantidade_m2: formEncomenda.quantidade,
        status: 'pendente',
        notas: notasFormatadas
      }]);

      if (error) throw error;

      setSubmitSuccess(true);
      setFormEncomenda({ empresa: '', nome: '', email: '', quantidade: '', obs: '' }); // Limpa formulário
      
      // Oculta a mensagem de sucesso ao fim de 5 segundos
      setTimeout(() => setSubmitSuccess(false), 5000);

    } catch (error: any) {
      console.error("Erro na encomenda:", error);
      alert("Erro ao enviar pedido: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-32 pb-24 relative overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* BREADCRUMBS DE NAVEGAÇÃO */}
        <nav className="flex items-center text-sm text-gray-500 mb-8 font-medium space-x-2">
          <Link to="/catalogo" className="hover:text-institucional-blue transition-colors">
            {language === 'PT' ? 'Catálogo' : 'Catalog'}
          </Link>
          <span>/</span>
          <span className="text-gray-400">{artigo.categoria}</span>
          <span>/</span>
          <span className="text-institucional-blue font-bold font-title">{artigo.referencia}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">
          
          {/* LADO ESQUERDO: Imagens e Especificações */}
          <div className="space-y-8">
            
            {/* Imagem Principal Dinâmica */}
            <motion.div 
              layoutId={`img-${artigo.id}`}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 aspect-square md:aspect-[4/3] relative flex items-center justify-center p-8"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-gray-50 to-white -z-10"></div>
              <AnimatePresence mode="wait">
                <motion.img 
                  key={corAtiva !== null ? corAtiva : 'default'}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  src={(corAtiva !== null && artigo.cores[corAtiva]?.img_url) ? artigo.cores[corAtiva].img_url : artigo.imagem_url}
                  alt={language === 'PT' ? artigo.titulo_pt : artigo.titulo_en}
                  className="w-full h-full object-cover rounded-xl shadow-md mix-blend-multiply"
                />
              </AnimatePresence>
            </motion.div>

            {/* SELEÇÃO DE CORES INTERATIVA */}
            {artigo.cores && artigo.cores.length > 0 && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-sm font-title font-bold uppercase tracking-wider text-gray-400 mb-4">
                  {language === 'PT' ? 'Variantes de Cor' : 'Color Variants'}
                </h3>
                <div className="flex flex-wrap gap-4">
                  {artigo.cores.map((cor: any, idx: number) => (
                    <button 
                      key={idx}
                      type="button"
                      onClick={() => setCorAtiva(idx)}
                      className={`group flex items-center space-x-3 p-2 pr-4 rounded-full border transition-all ${corAtiva === idx ? 'border-institucional-blue bg-blue-50/50 shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <span className={`w-8 h-8 rounded-full border shadow-inner transition-transform ${corAtiva === idx ? 'scale-110 border-institucional-blue' : 'border-gray-300 group-hover:scale-105'}`} style={{ backgroundColor: cor.hex }}></span>
                      <span className={`text-sm font-medium ${corAtiva === idx ? 'text-institucional-blue font-bold' : 'text-gray-600'}`}>
                        {language === 'PT' ? cor.nome_pt : cor.nome_en}
                      </span>
                    </button>
                  ))}
                </div>
                
                {/* Descrição específica da cor (se existir) */}
                <AnimatePresence mode="wait">
                  {corAtiva !== null && (artigo.cores[corAtiva].desc_pt || artigo.cores[corAtiva].desc_en) && (
                    <motion.p 
                      key={`desc-${corAtiva}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 text-sm text-gray-500 italic bg-gray-50 p-3 rounded-lg border border-gray-100"
                    >
                      {language === 'PT' ? artigo.cores[corAtiva].desc_pt : artigo.cores[corAtiva].desc_en}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* FICHA TÉCNICA (DETALHES) */}
            {artigo.detalhes && artigo.detalhes.length > 0 && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-sm font-title font-bold uppercase tracking-wider text-gray-400 mb-4">
                  {language === 'PT' ? 'Ficha Técnica' : 'Technical Specifications'}
                </h3>
                <div className="divide-y divide-gray-100">
                  {artigo.detalhes.map((det: any, idx: number) => (
                    <div key={idx} className="py-3 flex justify-between">
                      <span className="text-gray-500 font-medium">{language === 'PT' ? det.tipo_pt : det.tipo_en}</span>
                      <span className="text-gray-900 font-bold text-right ml-4">{language === 'PT' ? det.valor_pt : det.valor_en}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* LADO DIREITO: Informação de Venda e Formulário */}
          <div className="flex flex-col h-full">
            <div className="mb-8">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-blue-50 text-institucional-blue text-xs font-bold px-3 py-1.5 rounded-md tracking-wider uppercase">
                  {artigo.categoria}
                </span>
                <span className="text-gray-400 font-mono text-sm font-bold">REF: {artigo.referencia}</span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-title font-bold text-gray-900 mb-6">
                {language === 'PT' ? artigo.titulo_pt : artigo.titulo_en}
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {language === 'PT' ? artigo.descricao_pt : artigo.descricao_en}
              </p>

              {/* TAGS / SELOS DE CONFIANÇA */}
              {artigo.tags && artigo.tags.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-10 pb-10 border-b border-gray-200">
                  {artigo.tags.map((tag: any, idx: number) => (
                    <div key={idx} className="bg-green-50/50 border border-green-100 text-green-700 px-4 py-2 rounded-xl font-medium text-sm flex items-center shadow-sm font-title">
                      <span className="text-lg mr-2">{tag.icone}</span> 
                      {language === 'PT' ? tag.pt : tag.en}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* FORMULÁRIO DE ENCOMENDA INTEGRADO */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-institucional-blue/10 mt-auto relative overflow-hidden">
              
              {/* Alerta de Sucesso Animado */}
              <AnimatePresence>
                {submitSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute top-0 left-0 w-full bg-green-500 text-white p-4 font-bold text-center text-sm shadow-md z-20"
                  >
                    {language === 'PT' ? '✅ Pedido enviado com sucesso! Será contactado brevemente.' : '✅ Request sent successfully! You will be contacted shortly.'}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 bg-institucional-blue rounded-full flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-title font-bold text-institucional-blue">
                  {language === 'PT' ? 'Solicitar Cotação' : 'Request Quotation'}
                </h3>
              </div>

              {/* Form Submits via HandleOrderSubmit */}
              <form onSubmit={handleOrderSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2 font-title">{language === 'PT' ? 'Empresa / NIF *' : 'Company / VAT *'}</label>
                    <input type="text" name="empresa" value={formEncomenda.empresa} onChange={handleFormChange} required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-institucional-blue/20 outline-none transition-all text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2 font-title">{language === 'PT' ? 'Nome *' : 'Name *'}</label>
                    <input type="text" name="nome" value={formEncomenda.nome} onChange={handleFormChange} required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-institucional-blue/20 outline-none transition-all text-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2 font-title">E-mail *</label>
                    <input type="email" name="email" value={formEncomenda.email} onChange={handleFormChange} required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-institucional-blue/20 outline-none transition-all text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2 font-title">{language === 'PT' ? 'Quantidade (m²) *' : 'Amount (m²) *'}</label>
                    <input type="number" min="1" step="0.1" name="quantidade" value={formEncomenda.quantidade} onChange={handleFormChange} required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-institucional-blue/20 outline-none transition-all text-sm" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 font-title">{language === 'PT' ? 'Notas Adicionais' : 'Additional Notes'}</label>
                  <textarea rows={3} name="obs" value={formEncomenda.obs} onChange={handleFormChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-institucional-blue/20 outline-none transition-all text-sm resize-none" placeholder={language === 'PT' ? "Detalhes sobre a encomenda..." : "Order details..."}></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full text-white py-4 rounded-xl font-bold font-title tracking-wider text-lg shadow-md mt-4 transition-all ${isSubmitting ? 'bg-blue-400 cursor-wait' : 'bg-institucional-blue hover:bg-blue-900 hover:-translate-y-0.5 hover:shadow-lg'}`}
                >
                  {isSubmitting 
                    ? (language === 'PT' ? 'A Enviar...' : 'Sending...') 
                    : (language === 'PT' ? 'Enviar Pedido de Cotação' : 'Send Quotation Request')
                  }
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}