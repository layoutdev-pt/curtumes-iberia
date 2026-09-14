import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { PageHeader } from '../components/ui/PageHeader';
import { motion } from 'framer-motion';

const content = {
  PT: {
    title: "Contactos",
    subtitle: "Entre em contacto com a nossa equipa ou com um dos nossos parceiros comerciais oficiais.",
    headquarters: "Sede e Unidade Fabril",
    address: "Rua 24 de Junho, 1399, 2380-639 Vila Moreira, Portugal",
    phoneNote: "chamada rede fixa nacional",
    agentsTitle: "Rede de Parceiros Comerciais",
    agentsText: "A Curtumes Ibéria conta com uma rede de parceiros com presença estratégica nos principais polos da indústria do calçado e marroquinaria.",
    formTitle: "Envie-nos uma Mensagem",
    formName: "Nome / Empresa *",
    formEmail: "E-mail *",
    formSubject: "Assunto *",
    formMessage: "Mensagem *",
    formSubmit: "Enviar Mensagem",
  },
  EN: {
    title: "Contacts",
    subtitle: "Get in touch with our team or one of our official commercial partners.",
    headquarters: "Headquarters & Production Plant",
    address: "Rua 24 de Junho, 1399, 2380-639 Vila Moreira, Portugal",
    phoneNote: "national landline call",
    agentsTitle: "Commercial Partners Network",
    agentsText: "Curtumes Ibéria has a network of partners with a strategic presence in the main hubs of the footwear and leather goods industry.",
    formTitle: "Send us a Message",
    formName: "Name / Company *",
    formEmail: "E-mail *",
    formSubject: "Subject *",
    formMessage: "Message *",
    formSubmit: "Send Message",
  }
};

const agentesInternacionais: any[] = [
  { 
    id: 'pt', 
    paisPT: 'Portugal', 
    paisEN: 'Portugal', 
    agentes: [
      {
        localKey: 'contact.agent.rui.location',
        nomeKey: 'contact.agent.rui.name',
        moradaKey: 'contact.agent.rui.address',
        telefone: '+351 925 514 173',
        email: 'ruimalaca@curtumesiberia.pt'
      },
      {
        local: 'Felgueiras',
        nome: 'Carlos Alberto Leite',
        morada: 'Lugar do Calvário, lote 9, 4610-408 Lagares Felgueiras',
        telefone: '+351 935 543 215',
        email: 'ribapel@sapo.pt'
      },
      {
        local: 'São João da Madeira',
        nome: 'Luis Miguel Vieira dos Santos',
        morada: 'Avenida Liberdade, n. 866 - Trás Q, 3700-163 São João da Madeira',
        telefone: '+351 966 002 201',
        email: 'miguel.josapel@gmail.com'
      }
    ] 
  },
  { 
    id: 'es', 
    paisPT: 'Espanha', 
    paisEN: 'Spain', 
    agentes: [
      {
        local: 'Elche | Alicante',
        nome: 'Manuel Soler Garcia',
        morada: 'Calle Antonio Brotons Pastor, 33 bajo, 03205 Elche',
        telefone: '+34 660 419 687',
        email: 'manuelsolergarcia1956@gmail.com'
      }
    ] 
  },
  { 
    id: 'it', 
    paisPT: 'Itália', 
    paisEN: 'Italy', 
    agentes: [
      {
        local: 'Marche',
        nome: 'Nicolò Ruggeri',
        morada: 'Via Cruce 16, 63814 Torre San Patrizio (FM)',
        telefone: '+39 328 183 1968',
        email: 'nicolo.ruggeri@gmail.com'
      }
    ] 
  },
  { 
    id: 'uk', 
    paisPT: 'Reino Unido', 
    paisEN: 'United Kingdom', 
    agentes: [
      {
        local: 'Northampton',
        nome: 'A A & A CRACK & SONS | Stephen Crack',
        morada: '16 Pennard Close, Nn4 7be, Brackmills, Northampton',
        telefone: '+44 160 487 444 2',
        email: 'stephen@aacrack.com'
      }
    ] 
  },
];

export function Contactos() {
  const { language, t } = useLanguage();
  const data = content[language];
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert(language === 'PT' ? 'Mensagem enviada com sucesso!' : 'Message sent successfully!');
      setLoading(false);
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen relative overflow-hidden flex flex-col">
      
      {/* HEADER DINÂMICO APLICADO AQUI */}
      <PageHeader 
        title={data.title} 
        subtitle={data.subtitle} 
        backgroundImage="/tour/DSCF9299.webp" // Substitua pela imagem desejada
      />

      {/* Elementos Gráficos de Fundo */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30 mt-[50vh]">
        <div className="absolute top-0 right-[20%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-purple-100 via-blue-50 to-orange-50 blur-3xl mix-blend-multiply"></div>
        <svg className="absolute bottom-10 right-10 w-[400px] h-[400px] text-institucional-blue/5 -rotate-45" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M45.7,-76.4C58.9,-69.3,69.1,-55.4,78.2,-41.1C87.3,-26.8,95.3,-12.1,94.2,2C93.1,16.1,82.8,29.6,72.4,41.4C62,53.2,51.5,63.3,39,70.5C26.5,77.7,11.9,82,-3.1,87C-18.1,92,-33.5,77.7,-46.8,68.2C-60.1,58.7,-71.3,44.1,-77.6,28.1C-83.9,12.1,-85.3,-5.3,-79.8,-20.1C-74.3,-34.9,-61.9,-47.1,-48.5,-54.6C-35.1,-62.1,-20.7,-64.9,-4.9,-56.9C10.9,-48.9,21.8,-30.1,32.4,-83.4Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 py-24">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* COLUNA ESQUERDA: Informação Institucional e Agentes */}
          <div className="flex-1 flex flex-col justify-center">

            {/* Sede com Contactos Completos */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-12"
            >
              <h2 className="text-sm font-bold uppercase tracking-widest text-institucional-blue mb-3">
                {data.headquarters}
              </h2>
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm block w-full max-w-xl">
                <p className="text-gray-900 font-bold mb-4">{data.address}</p>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-institucional-blue opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>+351 249 890 676 <span className="text-xs text-gray-400 font-medium ml-1">({data.phoneNote})</span></span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-institucional-blue opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span>+351 [Inserir Telemóvel]</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-green-500 opacity-80" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <span>+351 [Inserir WhatsApp]</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-institucional-blue opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:curtiberia@curtumesiberia.pt" className="hover:text-institucional-blue hover:underline transition-all">
                      curtiberia@curtumesiberia.pt
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Agentes Internacionais Detalhados */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <h2 className="text-xl font-title font-bold text-institucional-blue mb-3">
                {data.agentsTitle}
              </h2>
              <p className="text-sm text-gray-500 mb-6 max-w-xl">
                {data.agentsText}
              </p>
              
              <div className="grid grid-cols-1 gap-4 max-w-xl h-96 overflow-y-auto pr-2 custom-scrollbar">
                {agentesInternacionais.map((pais) => (
                  <div key={pais.id} className="bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-gray-100 shadow-sm hover:border-institucional-blue/30 transition-colors">
                    <h3 className="font-title font-bold text-lg text-institucional-blue mb-4 border-b border-gray-100 pb-2">
                      {language === 'PT' ? pais.paisPT : pais.paisEN}
                    </h3>
                    <div className="space-y-6">
                      {pais.agentes.map((agente: any, idx: number) => (
                        <div key={idx} className="space-y-1.5">
                          <h4 className="font-bold text-gray-900 text-sm">
                            {agente.localKey ? t(agente.localKey as any) : agente.local} <span className="text-gray-400 font-normal mx-1">|</span> {agente.nomeKey ? t(agente.nomeKey as any) : agente.nome}
                          </h4>
                          <p className="text-xs text-gray-500 leading-relaxed">
                            {agente.moradaKey ? t(agente.moradaKey as any) : agente.morada}
                          </p>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-bold text-institucional-blue mt-1">
                            <a href={`tel:${agente.telefone.replace(/\s/g, '')}`} className="hover:underline flex items-center">
                              <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                              {agente.telefone}
                            </a>
                            <a href={`mailto:${agente.email}`} className="hover:underline flex items-center">
                              <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                              {agente.email}
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* COLUNA DIREITA: Formulário de Contacto Animado */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="flex-1 w-full max-w-md mx-auto lg:mx-0"
          >
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
          </motion.div>

        </div>
      </div>
    </div>
  );
}