import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { labelCategoria } from '../lib/categorias';

import { Helmet } from 'react-helmet-async';

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

  if (!artigo) return (
    <div className="min-h-screen pt-32 text-center font-title text-xl">
      {language === 'PT' ? 'Artigo não encontrado.' : 'Article not found.'}
    </div>
  );

  const titulo = language === 'PT' ? artigo.titulo_pt : artigo.titulo_en;

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
      // Cor selecionada, identificada pela referência da cor (não é uma cor standard)
      const cor = corAtiva !== null ? artigo.cores[corAtiva] : null;
      const corSelecionada = cor
        ? `${cor.referencia ? `${cor.referencia} — ` : ''}${cor.nome_pt} / ${cor.nome_en}`
        : 'S/Cor';

      const notasFormatadas = `Cor Selecionada: ${corSelecionada}\n\n${formEncomenda.obs}`;

      // Insere na base de dados na tabela 'encomendas'
      // O status 'pendente' garante que aparece na primeira coluna do Kanban
      // NOTA: as colunas 'empresa_nif' e 'quantidade_m2' mantêm o nome original na BD;
      // no formulário passaram a ser apenas "Empresa" e "Quantidade (pés quadrados)".
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
      setFormEncomenda({ empresa: '', nome: '', email: '', quantidade: '', obs: '' });

      setTimeout(() => setSubmitSuccess(false), 5000);

    } catch (error: any) {
      console.error("Erro na encomenda:", error);
      alert("Erro ao enviar pedido: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const imagemAtiva = (corAtiva !== null && artigo.cores[corAtiva]?.img_url)
    ? artigo.cores[corAtiva].img_url
    : artigo.imagem_url;

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": titulo,
    "image": [imagemAtiva],
    "description": language === 'PT' ? artigo.descricao_pt : artigo.descricao_en,
    "sku": artigo.referencia,
    "brand": {
      "@type": "Brand",
      "name": "Curtumes Ibéria"
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-32 pb-0 relative overflow-x-clip">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
      </Helmet>
      <div className="max-w-[1500px] mx-auto px-6 relative z-10">

        {/* BREADCRUMBS — a referência do artigo é o próprio nome da pele */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center text-xs uppercase tracking-[0.2em] text-gray-500 mb-10 font-bold space-x-3"
        >
          <Link to="/catalogo" className="hover:text-institucional-blue transition-colors">
            {language === 'PT' ? 'Artigos' : 'Articles'}
          </Link>
          <span>/</span>
          <span className="text-gray-400">{labelCategoria(artigo.categoria, language)}</span>
          <span>/</span>
          <span className="text-institucional-blue font-title">{titulo}</span>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">

          {/* LADO ESQUERDO: Imagens e Especificações */}
          <div className="space-y-8">

            {/* Imagem principal — grande, por inteiro, sem moldura */}
            <motion.div
              layoutId={`img-${artigo.id}`}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden aspect-[4/5] relative bg-slate-100"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={corAtiva !== null ? corAtiva : 'default'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  src={imagemAtiva}
                  alt={titulo}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </motion.div>

            {/* SELEÇÃO DE CORES — círculos pequenos com nome e referência por baixo */}
            {artigo.cores && artigo.cores.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="bg-white p-6 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-xs font-title font-bold uppercase tracking-[0.25em] text-gray-400">
                    {language === 'PT' ? 'Cores Disponíveis' : 'Available Colours'}
                  </h3>
                  <span className="text-[11px] text-gray-400 font-medium">
                    {artigo.cores.length} {language === 'PT' ? (artigo.cores.length === 1 ? 'variante' : 'variantes') : (artigo.cores.length === 1 ? 'variant' : 'variants')}
                  </span>
                </div>

                {/* Grelha de círculos com nome por baixo */}
                <div className="flex flex-wrap gap-4 py-1">
                  {artigo.cores.map((cor: any, idx: number) => {
                    const isSelected = corAtiva === idx;
                    const nomeCor = language === 'PT' ? cor.nome_pt : cor.nome_en;

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCorAtiva(idx)}
                        className={`group flex flex-col items-center text-center transition-all focus:outline-none ${
                          isSelected ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                        }`}
                      >
                        {/* Círculo da cor */}
                        <div
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full p-0.5 transition-all duration-200 ${
                            isSelected
                              ? 'ring-2 ring-institucional-blue ring-offset-2 scale-105 shadow-sm'
                              : 'border border-gray-300 group-hover:border-institucional-blue group-hover:scale-105'
                          }`}
                        >
                          <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 shadow-inner flex items-center justify-center">
                            {cor.img_url ? (
                              <img
                                src={cor.img_url}
                                alt={nomeCor}
                                className="w-full h-full object-cover rounded-full"
                                loading="lazy"
                              />
                            ) : (
                              <div
                                className="w-full h-full rounded-full"
                                style={{ backgroundColor: cor.hex || '#cbd5e1' }}
                              />
                            )}
                          </div>
                        </div>

                        {/* Referência e Nome por baixo */}
                        <div className="mt-3">
                          {cor.referencia && (
                            <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">
                              {cor.referencia}
                            </span>
                          )}
                          <span
                            className={`block text-xs max-w-[85px] truncate ${
                              isSelected ? 'text-institucional-blue font-bold' : 'text-gray-600 group-hover:text-gray-900'
                            }`}
                          >
                            {nomeCor}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Descrição específica da cor (se existir) */}
                <AnimatePresence mode="wait">
                  {corAtiva !== null && (artigo.cores[corAtiva].desc_pt || artigo.cores[corAtiva].desc_en) && (
                    <motion.p
                      key={`desc-${corAtiva}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-5 text-xs md:text-sm text-gray-500 bg-gray-50 p-3.5 border border-gray-100 leading-relaxed"
                    >
                      {language === 'PT' ? artigo.cores[corAtiva].desc_pt : artigo.cores[corAtiva].desc_en}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* FICHA TÉCNICA (DETALHES) */}
            {artigo.detalhes && artigo.detalhes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="bg-white p-6 border border-gray-200"
              >
                <h3 className="text-xs font-title font-bold uppercase tracking-[0.25em] text-gray-400 mb-4">
                  {language === 'PT' ? 'Ficha Técnica' : 'Technical Specifications'}
                </h3>
                <div className="divide-y divide-gray-100">
                  {artigo.detalhes.filter((d: any) => d.tipo_pt !== 'Tipo de artigo').map((det: any, idx: number) => {
                    let valPt = det.valor_pt;
                    let valEn = det.valor_en;
                    // Unidades fixas do setor: espessura em mm, tamanho médio em pés quadrados.
                    if (det.tipo_pt === 'Espessura') {
                      valPt = `${valPt} mm`;
                      valEn = `${valEn} mm`;
                    } else if (det.tipo_pt === 'Tamanho médio') {
                      valPt = `${valPt} sqft`;
                      valEn = `${valEn} sqft`;
                    }
                    return (
                      <div key={idx} className="py-3.5 flex justify-between items-center">
                        <span className="text-gray-500 text-sm uppercase tracking-wider font-medium">{language === 'PT' ? det.tipo_pt : det.tipo_en}</span>
                        <span className="text-gray-900 font-bold text-right ml-4">{language === 'PT' ? valPt : valEn}</span>
                      </div>
                    );
                  })}
                </div>
                {artigo.detalhes.find((d: any) => d.tipo_pt === 'Tipo de artigo') && (
                  <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-institucional-blue font-title font-bold text-xs tracking-[0.2em] uppercase">
                      {language === 'PT' ? 'Tipo de artigo' : 'Type of article'}
                    </span>
                    <span className="text-gray-900 font-bold bg-blue-50 px-3 py-1 text-sm">
                      {language === 'PT'
                        ? artigo.detalhes.find((d: any) => d.tipo_pt === 'Tipo de artigo').valor_pt
                        : artigo.detalhes.find((d: any) => d.tipo_pt === 'Tipo de artigo').valor_en}
                    </span>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* LADO DIREITO: Informação de Venda e Formulário */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="mb-10"
            >
              <span className="inline-block bg-institucional-blue text-white text-[10px] font-bold px-3 py-1.5 tracking-[0.2em] uppercase mb-6">
                {labelCategoria(artigo.categoria, language)}
              </span>

              <h1 className="text-4xl md:text-6xl font-title font-bold text-institucional-blue uppercase tracking-tight mb-4 leading-[1.05]">
                {titulo}
              </h1>

              {/* Nome da cor ativa por baixo do nome do produto */}
              {corAtiva !== null && artigo.cores && artigo.cores[corAtiva] && (
                <div className="flex items-center gap-2 mb-8 text-sm">
                  <span className="text-xs uppercase tracking-wider font-bold text-gray-400">
                    {language === 'PT' ? 'Cor selecionada:' : 'Selected colour:'}
                  </span>
                  <span className="font-bold text-institucional-blue text-base">
                    {language === 'PT' ? artigo.cores[corAtiva].nome_pt : artigo.cores[corAtiva].nome_en}
                  </span>
                  {artigo.cores[corAtiva].referencia && (
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded">
                      {artigo.cores[corAtiva].referencia}
                    </span>
                  )}
                </div>
              )}

              <p className="text-lg text-gray-600 font-light leading-relaxed mb-8">
                {language === 'PT' ? artigo.descricao_pt : artigo.descricao_en}
              </p>

              {/* TAGS / SELOS DE CONFIANÇA */}
              {artigo.tags && artigo.tags.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-10 pb-10 border-b border-gray-200">
                  {artigo.tags.map((tag: any, idx: number) => (
                    <div key={idx} className="bg-white border border-gray-200 text-institucional-blue px-4 py-2 font-bold text-xs uppercase tracking-[0.15em] flex items-center font-title">
                      <span className="text-base mr-2">{tag.icone}</span>
                      {language === 'PT' ? tag.pt : tag.en}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* FORMULÁRIO DE ENCOMENDA INTEGRADO — Sticky que acompanha o scroll até ao fundo */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="bg-white p-8 md:p-10 border border-gray-200 relative overflow-hidden lg:sticky lg:top-28"
            >

              {/* Alerta de Sucesso Animado */}
              <AnimatePresence>
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute top-0 left-0 w-full bg-green-600 text-white p-4 font-bold text-center text-sm z-20"
                  >
                    {language === 'PT' ? 'Pedido enviado com sucesso! Será contactado brevemente.' : 'Request sent successfully! You will be contacted shortly.'}
                  </motion.div>
                )}
              </AnimatePresence>

              <h3 className="text-2xl md:text-3xl font-title font-bold text-institucional-blue uppercase tracking-tight mb-8">
                {language === 'PT' ? 'Solicitar Cotação' : 'Request Quotation'}
              </h3>

              <form onSubmit={handleOrderSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-2 font-title">{language === 'PT' ? 'Empresa *' : 'Company *'}</label>
                    <input type="text" name="empresa" value={formEncomenda.empresa} onChange={handleFormChange} required className="w-full p-3 bg-gray-50 border border-gray-200 focus:bg-white focus:border-institucional-blue outline-none transition-all text-sm" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-2 font-title">{language === 'PT' ? 'Nome *' : 'Name *'}</label>
                    <input type="text" name="nome" value={formEncomenda.nome} onChange={handleFormChange} required className="w-full p-3 bg-gray-50 border border-gray-200 focus:bg-white focus:border-institucional-blue outline-none transition-all text-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-2 font-title">E-mail *</label>
                    <input type="email" name="email" value={formEncomenda.email} onChange={handleFormChange} required className="w-full p-3 bg-gray-50 border border-gray-200 focus:bg-white focus:border-institucional-blue outline-none transition-all text-sm" />
                  </div>
                  <div>
                    {/* Neste setor a unidade é o pé quadrado, não o metro quadrado. Campo facultativo. */}
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-2 font-title">{language === 'PT' ? 'Quantidade (P²)' : 'Quantity (sqft)'}</label>
                    <input type="number" min="1" step="0.1" name="quantidade" value={formEncomenda.quantidade} onChange={handleFormChange} className="w-full p-3 bg-gray-50 border border-gray-200 focus:bg-white focus:border-institucional-blue outline-none transition-all text-sm" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-2 font-title">{language === 'PT' ? 'Notas Adicionais' : 'Additional Notes'}</label>
                  <textarea rows={3} name="obs" value={formEncomenda.obs} onChange={handleFormChange} className="w-full p-3 bg-gray-50 border border-gray-200 focus:bg-white focus:border-institucional-blue outline-none transition-all text-sm resize-none" placeholder={language === 'PT' ? "Referências, cores, quantidades ou outras informações relevantes." : "References, colours, quantities or other relevant information."}></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full text-white py-4 font-bold font-title uppercase tracking-[0.2em] text-xs mt-4 transition-all ${isSubmitting ? 'bg-blue-400 cursor-wait' : 'bg-institucional-blue hover:bg-blue-900'}`}
                >
                  {isSubmitting
                    ? (language === 'PT' ? 'A Enviar...' : 'Sending...')
                    : (language === 'PT' ? 'Envie o Pedido' : 'Send Request')
                  }
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
