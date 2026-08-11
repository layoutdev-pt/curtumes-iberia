import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useLanguage } from '../../contexts/LanguageContext';

const content = {
  PT: {
    title: "Novo Artigo",
    subtitle: "A estrutura bilingue é validada antes da submissão.",
    refLabel: "Referência Única *",
    catLabel: "Categoria *",
    cat1: "Artigos Chrome Free",
    cat2: "Artigos Hidrofugados",
    cat3: "Outros Artigos",
    imgLabel: "Imagem Original *",
    imgDesc: "A imagem será convertida para formato WebP através do pipeline Node.js.",
    btnProcessing: "A processar pipeline e gravar...",
    btnSubmit: "Gravar Artigo no Catálogo",
    alertMissing: "Erro: Todos os campos bilingues e a imagem são obrigatórios.",
    alertFail: "Falha no servidor Node.js.",
    alertSuccess: "Artigo gravado com sucesso no catálogo!"
  },
  EN: {
    title: "New Article",
    subtitle: "The bilingual structure is validated before submission.",
    refLabel: "Unique Reference *",
    catLabel: "Category *",
    cat1: "Chrome Free Articles",
    cat2: "Waterproof Articles",
    cat3: "Other Articles",
    imgLabel: "Original Image *",
    imgDesc: "The image will be converted to WebP format through the Node.js pipeline.",
    btnProcessing: "Processing pipeline and saving...",
    btnSubmit: "Save Article to Catalog",
    alertMissing: "Error: All bilingual fields and the image are mandatory.",
    alertFail: "Node.js server failed.",
    alertSuccess: "Article successfully saved to the catalog!"
  }
};

export function GestaoCatalogo() {
  const { language } = useLanguage();
  const data = content[language];

  const [formData, setFormData] = useState({
    referencia: '',
    categoria: 'Artigos Chrome Free',
    titulo_pt: '',
    titulo_en: '',
    descricao_pt: '',
    descricao_en: '',
    imagem: null as File | null,
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, imagem: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titulo_pt || !formData.titulo_en || !formData.descricao_pt || !formData.descricao_en || !formData.imagem) {
      alert(data.alertMissing);
      return;
    }

    setLoading(true);

    try {
      const imageFormData = new FormData();
      imageFormData.append('imagem', formData.imagem);

      const backendResponse = await fetch('https://curtumes-backend.onrender.com', {
        method: 'POST',
        body: imageFormData,
      });

      if (!backendResponse.ok) throw new Error(data.alertFail);
      
      const backendData = await backendResponse.json();
      const imagemUrl = backendData.urlImagem; 

      const { error: dbError } = await supabase.from('artigos').insert([{
        referencia: formData.referencia, categoria: formData.categoria,
        titulo_pt: formData.titulo_pt, titulo_en: formData.titulo_en,
        descricao_pt: formData.descricao_pt, descricao_en: formData.descricao_en,
        imagem_url: imagemUrl, 
      }]);

      if (dbError) throw dbError;

      alert(data.alertSuccess);
      setFormData({ referencia: '', categoria: 'Artigos Chrome Free', titulo_pt: '', titulo_en: '', descricao_pt: '', descricao_en: '', imagem: null });
      (document.getElementById('imagem-input') as HTMLInputElement).value = '';

    } catch (error: any) {
      console.error(error);
      alert('Erro: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col max-w-5xl">
      <div className="mb-10">
        <h1 className="text-4xl font-title font-bold text-institucional-blue">{data.title}</h1>
        <p className="text-gray-500 mt-2">{data.subtitle}</p>
      </div>

      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 border-b border-gray-100">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">{data.refLabel}</label>
              <input type="text" name="referencia" value={formData.referencia} onChange={handleChange} required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-institucional-blue/20 focus:border-institucional-blue outline-none transition-all text-sm font-medium" placeholder="Ex: CF-005" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">{data.catLabel}</label>
              {/* O valor (value) mantemos o original para gravar na base de dados, mas mudamos a etiqueta (label) visível */}
              <select name="categoria" value={formData.categoria} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-institucional-blue/20 focus:border-institucional-blue outline-none transition-all text-sm font-medium text-gray-700">
                <option value="Artigos Chrome Free">{data.cat1}</option>
                <option value="Artigos Hidrofugados">{data.cat2}</option>
                <option value="Outros Artigos">{data.cat3}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-8 border-b border-gray-100">
            <div className="bg-[#F8FAFC] p-6 rounded-xl border border-gray-200">
              <div className="flex items-center mb-6">
                <span className="bg-institucional-blue text-white text-xs font-bold px-2 py-1 rounded-md mr-3 shadow-sm">PT</span>
                <h3 className="font-title font-bold text-gray-800 text-lg">Português</h3>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2">Nome do Artigo *</label>
                  <input type="text" name="titulo_pt" value={formData.titulo_pt} onChange={handleChange} required className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-institucional-blue/20 outline-none transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2">Descrição Detalhada *</label>
                  <textarea name="descricao_pt" value={formData.descricao_pt} onChange={handleChange} rows={4} required className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-institucional-blue/20 outline-none transition-all text-sm resize-none"></textarea>
                </div>
              </div>
            </div>

            <div className="bg-[#F8FAFC] p-6 rounded-xl border border-gray-200">
              <div className="flex items-center mb-6">
                <span className="bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded-md mr-3 shadow-sm">EN</span>
                <h3 className="font-title font-bold text-gray-800 text-lg">English</h3>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2">Article Name *</label>
                  <input type="text" name="titulo_en" value={formData.titulo_en} onChange={handleChange} required className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-institucional-blue/20 outline-none transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2">Detailed Description *</label>
                  <textarea name="descricao_en" value={formData.descricao_en} onChange={handleChange} rows={4} required className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-institucional-blue/20 outline-none transition-all text-sm resize-none"></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
            <label className="block text-sm font-bold text-institucional-blue mb-1">{data.imgLabel}</label>
            <p className="text-xs text-gray-500 mb-4">{data.imgDesc}</p>
            <input id="imagem-input" type="file" accept="image/*" onChange={handleImageChange} required className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-institucional-blue file:text-white hover:file:bg-blue-900 file:transition-colors file:cursor-pointer bg-white border border-gray-200 rounded-lg" />
          </div>

          <div className="flex justify-end pt-4">
            <button 
              type="submit" disabled={loading}
              className={`text-white px-8 py-3.5 rounded-lg font-bold shadow-lg transition-all ${loading ? 'bg-blue-400 cursor-wait' : 'bg-institucional-blue hover:bg-blue-900 hover:-translate-y-0.5'}`}
            >
              {loading ? data.btnProcessing : data.btnSubmit}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}