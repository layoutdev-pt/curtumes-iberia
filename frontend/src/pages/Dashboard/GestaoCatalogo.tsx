import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useLanguage } from '../../contexts/LanguageContext';

const content = {
  PT: {
    title: "Novo Artigo",
    subtitle: "A estrutura bilingue e as variantes são validadas antes da submissão.",
    btnProcessing: "A processar e gravar...",
    btnSubmit: "Gravar Artigo no Catálogo",
    alertMissing: "Erro: Campos Base (Ref, Nome, Imagem Principal) são obrigatórios.",
    alertFail: "Falha no servidor de Upload.",
    alertSuccess: "Artigo gravado com sucesso no catálogo!"
  },
  EN: {
    title: "New Article",
    subtitle: "The bilingual structure and variants are validated before submission.",
    btnProcessing: "Processing and saving...",
    btnSubmit: "Save Article to Catalog",
    alertMissing: "Error: Base Fields (Ref, Name, Main Image) are mandatory.",
    alertFail: "Upload server failed.",
    alertSuccess: "Article successfully saved to the catalog!"
  }
};

export function GestaoCatalogo() {
  const { language } = useLanguage();
  const data = content[language];
  const [activeTab, setActiveTab] = useState('base');

  // Estado Central de todo o Artigo
  const [formData, setFormData] = useState({
    referencia: '',
    categoria: 'Hidrofogados',
    titulo_pt: '',
    titulo_en: '',
    descricao_pt: '',
    descricao_en: '',
    imagem: null as File | null,
    cores: [] as any[],
    detalhes: [] as any[],
    tags: [] as any[]
  });
  
  const [loading, setLoading] = useState(false);

  // Estados temporários para adicionar novos arrays
  const [tempCor, setTempCor] = useState({ hex: '#000000', nome_pt: '', nome_en: '', desc_pt: '', desc_en: '', img_url: '' });
  const [tempDetalhe, setTempDetalhe] = useState({ tipo_pt: '', tipo_en: '', valor_pt: '', valor_en: '' });
  const [tempTag, setTempTag] = useState({ pt: '', en: '', icone: '♻️' });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, imagem: e.target.files[0] }));
    }
  };

  // Funções de Adição aos Arrays
  const addCor = () => {
    if(!tempCor.nome_pt) return;
    setFormData(prev => ({ ...prev, cores: [...prev.cores, tempCor] }));
    setTempCor({ hex: '#000000', nome_pt: '', nome_en: '', desc_pt: '', desc_en: '', img_url: '' });
  };

  const addDetalhe = () => {
    if(!tempDetalhe.tipo_pt || !tempDetalhe.valor_pt) return;
    setFormData(prev => ({ ...prev, detalhes: [...prev.detalhes, tempDetalhe] }));
    setTempDetalhe({ tipo_pt: '', tipo_en: '', valor_pt: '', valor_en: '' });
  };

  const addTag = () => {
    if(!tempTag.pt) return;
    setFormData(prev => ({ ...prev, tags: [...prev.tags, tempTag] }));
    setTempTag({ pt: '', en: '', icone: '♻️' });
  };

  // Submissão Final
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titulo_pt || !formData.imagem) {
      alert(data.alertMissing);
      return;
    }

    setLoading(true);

    try {
      // 1. Upload da Imagem Principal
      const imageFormData = new FormData();
      imageFormData.append('imagem', formData.imagem);

      // CORREÇÃO: URL a apontar para a rota exata de upload do backend
      const backendResponse = await fetch('https://curtumes-backend.onrender.com/api/upload-catalogo', {
        method: 'POST',
        body: imageFormData,
      });

      if (!backendResponse.ok) throw new Error(data.alertFail);
      const backendData = await backendResponse.json();
      const imagemUrl = backendData.urlImagem; 

      // 2. Gravar no Supabase (Com os arrays JSON)
      const { error: dbError } = await supabase.from('artigos').insert([{
        referencia: formData.referencia, 
        categoria: formData.categoria,
        titulo_pt: formData.titulo_pt, 
        titulo_en: formData.titulo_en,
        descricao_pt: formData.descricao_pt, 
        descricao_en: formData.descricao_en,
        imagem_url: imagemUrl,
        cores: formData.cores,
        detalhes: formData.detalhes,
        tags: formData.tags
      }]);

      if (dbError) throw dbError;

      alert(data.alertSuccess);
      // Reset Total
      setFormData({ referencia: '', categoria: 'Hidrofogados', titulo_pt: '', titulo_en: '', descricao_pt: '', descricao_en: '', imagem: null, cores: [], detalhes: [], tags: [] });
      (document.getElementById('imagem-input') as HTMLInputElement).value = '';
      
    } catch (error: any) {
      console.error(error);
      alert('Erro: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Componente Auxiliar para as Abas
  const TabBtn = ({ id, label }: { id: string, label: string }) => (
    <button type="button" onClick={() => setActiveTab(id)} className={`px-4 py-2 font-bold text-sm rounded-t-lg transition-colors border-b-2 ${activeTab === id ? 'border-institucional-blue text-institucional-blue bg-blue-50' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>
      {label}
    </button>
  );

  return (
    <div className="flex flex-col max-w-6xl pb-20">
      <div className="mb-8">
        <h1 className="text-4xl font-title font-bold text-institucional-blue">{data.title}</h1>
        <p className="text-gray-500 mt-2">{data.subtitle}</p>
      </div>

      {/* NAVEGAÇÃO POR ABAS */}
      <div className="flex border-b border-gray-200 mb-6 flex-wrap">
        <TabBtn id="base" label="1. Dados Base" />
        <TabBtn id="cores" label="2. Variantes de Cor" />
        <TabBtn id="detalhes" label="3. Ficha Técnica" />
        <TabBtn id="tags" label="4. Etiquetas (Tags)" />
      </div>

      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-10">
          
          {/* ======================================================== */}
          {/* ABA 1: DADOS BASE (O Cartão Principal) */}
          {/* ======================================================== */}
          {activeTab === 'base' && (
            <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 border-b border-gray-100">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Referência Única *</label>
                  <input type="text" name="referencia" value={formData.referencia} onChange={handleChange} required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm" placeholder="Ex: CF-005" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Categoria *</label>
                  <select name="categoria" value={formData.categoria} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm">
                    <option value="Hidrofogados">Hidrofogados</option>
                    <option value="Camurças">Camurças</option>
                    <option value="Napas">Napas</option>
                    <option value="Anilinas">Anilinas</option>
                    <option value="Fantasia">Fantasia</option>
                    <option value="Nubucks">Nubucks</option>
                    <option value="Floaters">Floaters</option>
                    <option value="Ceras e Óleos">Ceras e Óleos</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-8 border-b border-gray-100">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-gray-800 text-lg mb-4">PT (Português)</h3>
                  <div className="space-y-4">
                    <input type="text" name="titulo_pt" value={formData.titulo_pt} onChange={handleChange} placeholder="Nome do Artigo" required className="w-full p-3 border rounded-lg text-sm" />
                    <textarea name="descricao_pt" value={formData.descricao_pt} onChange={handleChange} placeholder="Descrição Geral do Produto" rows={4} required className="w-full p-3 border rounded-lg text-sm resize-none"></textarea>
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-gray-800 text-lg mb-4">EN (English)</h3>
                  <div className="space-y-4">
                    <input type="text" name="titulo_en" value={formData.titulo_en} onChange={handleChange} placeholder="Article Name" required className="w-full p-3 border rounded-lg text-sm" />
                    <textarea name="descricao_en" value={formData.descricao_en} onChange={handleChange} placeholder="General Description" rows={4} required className="w-full p-3 border rounded-lg text-sm resize-none"></textarea>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
                <label className="block text-sm font-bold text-institucional-blue mb-1">Imagem de Capa (Catálogo) *</label>
                <input id="imagem-input" type="file" accept="image/*" onChange={handleImageChange} required className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:bg-institucional-blue file:text-white" />
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* ABA 2: VARIANTES DE COR */}
          {/* ======================================================== */}
          {activeTab === 'cores' && (
            <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-lg mb-4 text-gray-800">Adicionar Nova Cor</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="col-span-1">
                    <label className="block text-xs font-bold text-gray-500 mb-1">Cor Hex</label>
                    <div className="flex items-center space-x-2">
                      <input type="color" value={tempCor.hex} onChange={e => setTempCor({...tempCor, hex: e.target.value})} className="h-10 w-10 cursor-pointer" />
                      <input type="text" value={tempCor.hex} onChange={e => setTempCor({...tempCor, hex: e.target.value})} className="w-full p-2 border rounded-lg text-sm uppercase" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Nome Cor PT</label>
                    <input type="text" value={tempCor.nome_pt} onChange={e => setTempCor({...tempCor, nome_pt: e.target.value})} placeholder="Ex: Castanho Escuro" className="w-full p-2 border rounded-lg text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Nome Cor EN</label>
                    <input type="text" value={tempCor.nome_en} onChange={e => setTempCor({...tempCor, nome_en: e.target.value})} placeholder="Ex: Dark Brown" className="w-full p-2 border rounded-lg text-sm" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <textarea placeholder="Descrição Específica desta Cor (Opcional - PT)" value={tempCor.desc_pt} onChange={e => setTempCor({...tempCor, desc_pt: e.target.value})} className="w-full p-2 border rounded-lg text-sm resize-none" rows={2}></textarea>
                  <textarea placeholder="Specific Color Description (Optional - EN)" value={tempCor.desc_en} onChange={e => setTempCor({...tempCor, desc_en: e.target.value})} className="w-full p-2 border rounded-lg text-sm resize-none" rows={2}></textarea>
                </div>
                <button type="button" onClick={addCor} className="bg-green-600 text-white px-4 py-2 rounded font-bold text-sm hover:bg-green-700">+ Adicionar à Lista</button>
              </div>

              {/* Lista de Cores Adicionadas */}
              {formData.cores.length > 0 && (
                <div className="border border-gray-200 rounded-xl overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-100 text-xs uppercase font-bold text-gray-500">
                      <tr><th className="p-3">Cor</th><th className="p-3">Nome PT</th><th className="p-3">Nome EN</th><th className="p-3">Ação</th></tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {formData.cores.map((cor, idx) => (
                        <tr key={idx}>
                          <td className="p-3"><div className="w-6 h-6 rounded-full border border-gray-300" style={{backgroundColor: cor.hex}}></div></td>
                          <td className="p-3">{cor.nome_pt}</td>
                          <td className="p-3">{cor.nome_en}</td>
                          <td className="p-3">
                            <button type="button" onClick={() => setFormData(p => ({...p, cores: p.cores.filter((_, i) => i !== idx)}))} className="text-red-500 font-bold hover:underline">Remover</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* ABA 3: FICHA TÉCNICA (DETALHES) */}
          {/* ======================================================== */}
          {activeTab === 'detalhes' && (
            <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-lg text-gray-800 mb-1">Adicionar Especificação Técnica</h3>
                <p className="text-xs text-gray-500 mb-4">
                  Nota: Adicione as especificações obrigatórias: <strong>Espessura (Thickness)</strong>, <strong>Tamanho médio (Average size)</strong> e <strong>Tipo de artigo (Type of the article)</strong>.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-blue-600 uppercase">Característica PT</label>
                    <input type="text" value={tempDetalhe.tipo_pt} onChange={e => setTempDetalhe({...tempDetalhe, tipo_pt: e.target.value})} placeholder="Ex: Tamanho médio" className="w-full p-2 border rounded-lg text-sm" />
                    <input type="text" value={tempDetalhe.valor_pt} onChange={e => setTempDetalhe({...tempDetalhe, valor_pt: e.target.value})} placeholder="Ex: 1.2 - 1.4 mm" className="w-full p-2 border rounded-lg text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-600 uppercase">Feature EN</label>
                    <input type="text" value={tempDetalhe.tipo_en} onChange={e => setTempDetalhe({...tempDetalhe, tipo_en: e.target.value})} placeholder="Ex: Average size" className="w-full p-2 border rounded-lg text-sm" />
                    <input type="text" value={tempDetalhe.valor_en} onChange={e => setTempDetalhe({...tempDetalhe, valor_en: e.target.value})} placeholder="Ex: 1.2 - 1.4 mm" className="w-full p-2 border rounded-lg text-sm" />
                  </div>
                </div>
                <button type="button" onClick={addDetalhe} className="bg-green-600 text-white px-4 py-2 rounded font-bold text-sm hover:bg-green-700">+ Adicionar à Ficha</button>
              </div>

              {formData.detalhes.length > 0 && (
                <div className="border border-gray-200 rounded-xl overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-100 text-xs uppercase font-bold text-gray-500">
                      <tr><th className="p-3">Característica (PT / EN)</th><th className="p-3">Valor (PT / EN)</th><th className="p-3">Ação</th></tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {formData.detalhes.map((det, idx) => (
                        <tr key={idx}>
                          <td className="p-3 font-medium">{det.tipo_pt} <span className="text-gray-400 font-normal">/ {det.tipo_en}</span></td>
                          <td className="p-3">{det.valor_pt} <span className="text-gray-400">/ {det.valor_en}</span></td>
                          <td className="p-3">
                            <button type="button" onClick={() => setFormData(p => ({...p, detalhes: p.detalhes.filter((_, i) => i !== idx)}))} className="text-red-500 font-bold hover:underline">Remover</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* ABA 4: TAGS DE DESTAQUE */}
          {/* ======================================================== */}
          {activeTab === 'tags' && (
            <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-lg mb-4 text-gray-800">Adicionar Etiqueta (Selo de Confiança)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Emoji / Ícone</label>
                    <select value={tempTag.icone} onChange={e => setTempTag({...tempTag, icone: e.target.value})} className="w-full p-2 border rounded-lg text-sm text-2xl">
                      <option value="♻️">♻️ (Sustentável)</option>
                      <option value="🛡️">🛡️ (Garantia)</option>
                      <option value="💧">💧 (Waterproof)</option>
                      <option value="⭐">⭐ (Premium)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Texto PT</label>
                    <input type="text" value={tempTag.pt} onChange={e => setTempTag({...tempTag, pt: e.target.value})} placeholder="Ex: Sustentável" className="w-full p-2 border rounded-lg text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Texto EN</label>
                    <input type="text" value={tempTag.en} onChange={e => setTempTag({...tempTag, en: e.target.value})} placeholder="Ex: Sustainable" className="w-full p-2 border rounded-lg text-sm" />
                  </div>
                </div>
                <button type="button" onClick={addTag} className="bg-green-600 text-white px-4 py-2 rounded font-bold text-sm hover:bg-green-700">+ Adicionar Etiqueta</button>
              </div>

              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {formData.tags.map((tag, idx) => (
                    <div key={idx} className="bg-institucional-blue/5 border border-institucional-blue/20 text-institucional-blue px-4 py-2 rounded-full font-medium text-sm flex items-center shadow-sm">
                      <span className="text-lg mr-2">{tag.icone}</span> {tag.pt}
                      <button type="button" onClick={() => setFormData(p => ({...p, tags: p.tags.filter((_, i) => i !== idx)}))} className="ml-3 text-red-400 hover:text-red-600">&times;</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* BOTÃO DE GRAVAÇÃO GLOBAL SEMPRE VISÍVEL */}
          <div className="flex justify-end pt-8 border-t border-gray-200 mt-10">
            <button 
              type="submit" disabled={loading}
              className={`text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl transition-all ${loading ? 'bg-blue-400 cursor-wait' : 'bg-institucional-blue hover:bg-blue-900 hover:-translate-y-1'}`}
            >
              {loading ? data.btnProcessing : data.btnSubmit}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}