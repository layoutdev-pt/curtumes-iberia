import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const content = {
  PT: {
    title: "Contactos",
    subtitle: "Entre em contacto com a nossa equipa ou com um dos nossos parceiros comerciais oficiais.",
    headquarters: "Sede e Unidade Fabril",
    address: "Rua 24 de Junho, 1399, 2380-639 Vila Moreira",
    agentsTitle: "Rede de Parceiros Comerciais",
    agentsText: "A Curtumes Ibéria conta com uma rede de parceiros com presença estratégica nos principais polos da indústria do calçado e marroquinaria.",
    formTitle: "Envie-nos uma Mensagem",
    formName: "Nome / Empresa *",
    formEmail: "E-mail Corporativo *",
    formSubject: "Assunto *",
    formMessage: "Mensagem *",
    formSubmit: "Enviar Mensagem",
  },
  EN: {
    title: "Contacts",
    subtitle: "Get in touch with our team or one of our official commercial partners.",
    headquarters: "Headquarters & Production Plant",
    address: "Rua 24 de Junho, 1399, 2380-639 Vila Moreira, Portugal",
    agentsTitle: "Commercial Partners Network",
    agentsText: "Curtumes Ibéria has a network of partners with a strategic presence in the main hubs of the footwear and leather goods industry.",
    formTitle: "Send us a Message",
    formName: "Name / Company *",
    formEmail: "Corporate E-mail *",
    formSubject: "Subject *",
    formMessage: "Message *",
    formSubmit: "Send Message",
  }
};

// Dados extraídos estritamente do documento
const agentesInternacionais = [
  { id: 'pt', paisPT: 'Portugal', paisEN: 'Portugal', locais: ['Felgueiras', 'São João da Madeira'] },
  { id: 'es', paisPT: 'Espanha', paisEN: 'Spain', locais: ['Elche / Alicante'] },
  { id: 'it', paisPT: 'Itália', paisEN: 'Italy', locais: ['Marche'] },
  { id: 'uk', paisPT: 'Reino Unido', paisEN: 'United Kingdom', locais: ['Northampton'] },
];

export function Contactos() {
  const { language } = useLanguage();
  const data = content[language];
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulação do envio (será ligado ao backend Node.js posteriormente)
    setTimeout(() => {
      alert(language === 'PT' ? 'Mensagem enviada com sucesso!' : 'Message sent successfully!');
      setLoading(false);
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-[calc(100vh-80px)] pt-32 pb-24 relative overflow-hidden flex items-center">
      
      {/* Elementos Gráficos de Fundo (Abstractos e Suaves) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <div className="absolute top-0 right-[20%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-purple-100 via-blue-50 to-orange-50 blur-3xl mix-blend-multiply"></div>
        <svg className="absolute bottom-10 right-10 w-[400px] h-[400px] text-institucional-blue/5 -rotate-45" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M45.7,-76.4C58.9,-69.3,69.1,-55.4,78.2,-41.1C87.3,-26.8,95.3,-12.1,94.2,2C93.1,16.1,82.8,29.6,72.4,41.4C62,53.2,51.5,63.3,39,70.5C26.5,77.7,11.9,82,-3.1,87C-18.1,92,-33.5,77.7,-46.8,68.2C-60.1,58.7,-71.3,44.1,-77.6,28.1C-83.9,12.1,-85.3,-5.3,-79.8,-20.1C-74.3,-34.9,-61.9,-47.1,-48.5,-54.6C-35.1,-62.1,-20.7,-64.9,-4.9,-56.9C10.9,-48.9,21.8,-30.1,32.4,-83.4Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* COLUNA ESQUERDA: Informação Institucional e Agentes */}
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-title font-bold text-institucional-blue mb-6">
              {data.title}
            </h1>
            <p className="text-lg text-gray-600 mb-12 max-w-lg leading-relaxed">
              {data.subtitle}
            </p>

            {/* Sede */}
            <div className="mb-12">
              <h2 className="text-sm font-bold uppercase tracking-widest text-institucional-blue mb-3">
                {data.headquarters}
              </h2>
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm inline-block">
                <p className="text-gray-700 font-medium">{data.address}</p>
                <p className="text-gray-500 text-sm mt-1">Portugal</p>
              </div>
            </div>

            {/* Agentes Internacionais (Listagem Textual Limpa B2B) */}
            <div>
              <h2 className="text-xl font-title font-bold text-institucional-blue mb-3">
                {data.agentsTitle}
              </h2>
              <p className="text-sm text-gray-500 mb-6 max-w-md">
                {data.agentsText}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {agentesInternacionais.map((agente) => (
                  <div key={agente.id} className="bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-gray-100 hover:border-institucional-blue/30 transition-colors">
                    <h3 className="font-bold text-gray-900 mb-2">
                      {language === 'PT' ? agente.paisPT : agente.paisEN}
                    </h3>
                    <ul className="space-y-1">
                      {agente.locais.map((local, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center">
                          <span className="w-1.5 h-1.5 bg-institucional-blue rounded-full mr-2 opacity-70"></span>
                          {local}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COLUNA DIREITA: Formulário de Contacto */}
          <div className="flex-1 w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,40,88,0.1)] border border-gray-100 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-institucional-blue to-blue-400 rounded-t-2xl"></div>
              
              <h3 className="text-2xl font-title font-bold text-institucional-blue mb-8">
                {data.formTitle}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                    {data.formName}
                  </label>
                  <input type="text" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-institucional-blue/20 focus:border-institucional-blue outline-none transition-all text-sm" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                    {data.formEmail}
                  </label>
                  <input type="email" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-institucional-blue/20 focus:border-institucional-blue outline-none transition-all text-sm" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                    {data.formSubject}
                  </label>
                  <input type="text" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-institucional-blue/20 focus:border-institucional-blue outline-none transition-all text-sm" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                    {data.formMessage}
                  </label>
                  <textarea rows={4} required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-institucional-blue/20 focus:border-institucional-blue outline-none transition-all text-sm resize-none"></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className={`w-full py-3.5 rounded-lg font-bold text-white transition-all shadow-md mt-4 ${
                    loading ? 'bg-blue-400 cursor-wait' : 'bg-institucional-blue hover:bg-blue-900 hover:shadow-lg'
                  }`}
                >
                  {loading ? '...' : data.formSubmit}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}