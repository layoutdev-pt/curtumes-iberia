import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useLanguage } from '../../contexts/LanguageContext';

const content = {
  PT: {
    title: "Inventário de Catálogo",
    subtitle: "Consulte, edite ou remova os artigos atualmente disponíveis.",
    loading: "A carregar catálogo...",
    ref: "Referência",
    article: "Artigo",
    category: "Categoria",
    actions: "Ações",
    edit: "Editar",
    delete: "Apagar",
    deleteConfirm: "Tem a certeza que deseja apagar este artigo?",
    editTitle: "Editar Artigo",
    imgNote: "Deixe em branco se não quiser alterar a imagem atual.",
    saveBtn: "Guardar Alterações",
    cancelBtn: "Cancelar",
    successEdit: "Artigo atualizado com sucesso!",
    successDelete: "Artigo removido com sucesso!"
  },
  EN: {
    title: "Catalog Inventory",
    subtitle: "View, edit, or remove currently available articles.",
    loading: "Loading catalog...",
    ref: "Reference",
    article: "Article",
    category: "Category",
    actions: "Actions",
    edit: "Edit",
    delete: "Delete",
    deleteConfirm: "Are you sure you want to delete this article?",
    editTitle: "Edit Article",
    imgNote: "Leave blank if you do not want to change the current image.",
    saveBtn: "Save Changes",
    cancelBtn: "Cancel",
    successEdit: "Article successfully updated!",
    successDelete: "Article successfully removed!"
  }
};

export function ListaCatalogo() {
  const { language } = useLanguage();
  const data = content[language];

  const [artigos, setArtigos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const [editingArtigo, setEditingArtigo] = useState<any | null>(null);
  const [editImage, setEditImage] = useState<File | null>(null);

  const fetchArtigos = async () => {
    setLoading(true);
    const { data: fetch, error } = await supabase.from('artigos').select('*').order('created_at', { ascending: false });
    
    if (!error && fetch) {
      // Parsing de segurança para os novos campos JSONB
      const parsedData = fetch.map(art => ({
        ...art,
        cores: typeof art.cores === 'string' ? JSON.parse(art.cores) : art.cores || [],
        detalhes: typeof art.detalhes === 'string' ? JSON.parse(art.detalhes) : art.detalhes || [],
        tags: typeof art.tags === 'string' ? JSON.parse(art.tags) : art.tags || []
      }));
      setArtigos(parsedData);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArtigos();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm(data.deleteConfirm)) return;
    
    setIsProcessing(true);
    const { error } = await supabase.from('artigos').delete().eq('id', id);
    if (error) {
      alert("Erro ao apagar: " + error.message);
    } else {
      alert(data.successDelete);
      fetchArtigos();
    }
    setIsProcessing(false);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      let imagemUrl = editingArtigo.imagem_url;

      if (editImage) {
        const imageFormData = new FormData();
        imageFormData.append('imagem', editImage);

        const backendResponse = await fetch('https://curtumes-backend.onrender.com/api/upload-catalogo', {
          method: 'POST',
          body: imageFormData,
        });

        if (!backendResponse.ok) throw new Error('Falha no servidor de imagens Node.js.');
        const backendData = await backendResponse.json();
        imagemUrl = backendData.urlImagem;
      }

      // IMPORTANTE: Devolver os arrays JSON intactos na atualização
      const { error } = await supabase.from('artigos').update({
        referencia: editingArtigo.referencia,
        categoria: editingArtigo.categoria,
        titulo_pt: editingArtigo.titulo_pt,
        titulo_en: editingArtigo.titulo_en,
        descricao_pt: editingArtigo.descricao_pt,
        descricao_en: editingArtigo.descricao_en,
        imagem_url: imagemUrl,
        cores: editingArtigo.cores,
        detalhes: editingArtigo.detalhes,
        tags: editingArtigo.tags
      }).eq('id', editingArtigo.id);

      if (error) throw error;

      alert(data.successEdit);
      setEditingArtigo(null);
      setEditImage(null);
      fetchArtigos();

    } catch (error: any) {
      alert('Erro: ' + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col max-w-6xl pb-20">
      <div className="mb-10">
        <h1 className="text-4xl font-title font-bold text-institucional-blue">{data.title}</h1>
        <p className="text-gray-500 mt-2">{data.subtitle}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-gray-500 font-bold animate-pulse">{data.loading}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-gray-200">
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-24">Img</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">{data.ref}</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">{data.article}</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">{data.category}</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">{data.actions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {artigos.map((artigo) => (
                  <tr key={artigo.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4">
                      {artigo.imagem_url ? (
                        <div className="w-12 h-12 rounded-lg bg-gray-200 overflow-hidden border border-gray-200 shadow-sm">
                          <img src={artigo.imagem_url} alt="Thumb" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200"></div>
                      )}
                    </td>
                    <td className="p-4 font-mono text-sm font-bold text-gray-600">{artigo.referencia}</td>
                    <td className="p-4">
                      <div className="font-bold text-gray-900">{language === 'PT' ? artigo.titulo_pt : artigo.titulo_en}</div>
                      {/* Pequeno helper visual para mostrar quantas cores tem */}
                      {artigo.cores && artigo.cores.length > 0 && (
                        <div className="text-[10px] text-gray-400 font-medium mt-1">{artigo.cores.length} Variante(s) de Cor</div>
                      )}
                    </td>
                    <td className="p-4">
                      <span className="bg-blue-50 text-institucional-blue text-xs font-bold px-2.5 py-1 rounded-md">
                        {artigo.categoria}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-3">
                      <button onClick={() => setEditingArtigo(artigo)} className="text-sm font-bold text-blue-500 hover:text-blue-700 transition-colors">
                        {data.edit}
                      </button>
                      <button onClick={() => handleDelete(artigo.id)} className="text-sm font-bold text-red-500 hover:text-red-700 transition-colors">
                        {data.delete}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {artigos.length === 0 && (
              <div className="p-10 text-center text-gray-500">Sem artigos registados.</div>
            )}
          </div>
        )}
      </div>

      {/* MODAL DE EDIÇÃO FLUTUANTE */}
      {editingArtigo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-institucional-blue/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="p-6 border-b border-gray-100 bg-[#F8FAFC] flex justify-between items-center">
              <h2 className="text-2xl font-title font-bold text-institucional-blue">{data.editTitle}: {editingArtigo.referencia}</h2>
              <button onClick={() => setEditingArtigo(null)} className="text-gray-400 hover:text-gray-800 font-bold text-xl">&times;</button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar">
              <form id="editForm" onSubmit={handleEditSubmit} className="space-y-6">
                
                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 mb-6 text-sm text-blue-700 flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span><strong>Aviso:</strong> A edição de Variantes de Cor, Ficha Técnica e Tags só está disponível através da criação de um novo artigo.</span>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Referência</label>
                    <input type="text" value={editingArtigo.referencia} onChange={(e) => setEditingArtigo({...editingArtigo, referencia: e.target.value})} required className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Categoria</label>
                    <select value={editingArtigo.categoria} onChange={(e) => setEditingArtigo({...editingArtigo, categoria: e.target.value})} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm">
                      <option value="Artigos Chrome Free">Artigos Chrome Free</option>
                      <option value="Artigos Hidrofugados">Artigos Hidrofugados</option>
                      <option value="Outros Artigos">Outros Artigos</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-blue-600 uppercase mb-1">Título PT</label>
                      <input type="text" value={editingArtigo.titulo_pt} onChange={(e) => setEditingArtigo({...editingArtigo, titulo_pt: e.target.value})} required className="w-full p-2.5 border border-gray-200 rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-blue-600 uppercase mb-1">Descrição PT</label>
                      <textarea rows={3} value={editingArtigo.descricao_pt} onChange={(e) => setEditingArtigo({...editingArtigo, descricao_pt: e.target.value})} required className="w-full p-2.5 border border-gray-200 rounded-lg text-sm resize-none"></textarea>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Title EN</label>
                      <input type="text" value={editingArtigo.titulo_en} onChange={(e) => setEditingArtigo({...editingArtigo, titulo_en: e.target.value})} required className="w-full p-2.5 border border-gray-200 rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Description EN</label>
                      <textarea rows={3} value={editingArtigo.descricao_en} onChange={(e) => setEditingArtigo({...editingArtigo, descricao_en: e.target.value})} required className="w-full p-2.5 border border-gray-200 rounded-lg text-sm resize-none"></textarea>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Substituir Imagem</label>
                  <p className="text-xs text-gray-500 mb-3">{data.imgNote}</p>
                  <input type="file" accept="image/*" onChange={(e) => { if(e.target.files) setEditImage(e.target.files[0]) }} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-institucional-blue file:text-white hover:file:bg-blue-900 cursor-pointer transition-colors" />
                </div>

              </form>
            </div>

            <div className="p-6 border-t border-gray-100 bg-white flex justify-end space-x-4">
              <button onClick={() => setEditingArtigo(null)} className="px-6 py-2.5 rounded-lg font-bold text-gray-600 hover:bg-gray-100 transition-colors">
                {data.cancelBtn}
              </button>
              <button form="editForm" type="submit" disabled={isProcessing} className={`px-6 py-2.5 rounded-lg font-bold text-white transition-colors ${isProcessing ? 'bg-blue-400' : 'bg-institucional-blue hover:bg-blue-900'}`}>
                {isProcessing ? 'A processar...' : data.saveBtn}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}