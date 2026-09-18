import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { PageHeader } from '../components/ui/PageHeader';
import { motion, AnimatePresence } from 'framer-motion';

const content = {
  PT: {
    title: "Contactos",
    subtitle: "Inicie o seu projeto, solicite amostras ou agende uma visita à nossa unidade fabril.",
    headquarters: "Sede e Unidade Fabril",
    address: "Rua 24 de Junho, 1399\n2380-639 Vila Moreira, Portugal",
    phoneNote: "chamada rede fixa nacional",
    agentsTitle: "Rede de Parceiros Comerciais",
    agentsText: "A Curtumes Ibéria conta com uma rede de parceiros com presença estratégica nos principais polos da indústria do calçado e marroquinaria.",
    quickCallTitle: "Linha Comercial Direta",
    quickCallDesc: "Apoio B2B rápido e especializado.",
    quickCallAction: "Ligar Agora",
    quickWhatsAppTitle: "WhatsApp",
    quickWhatsAppDesc: "Amostras, orçamentos e dúvidas.",
    quickWhatsAppAction: "Enviar Mensagem",
    quickLocationTitle: "Sede Fabril",
    quickLocationDesc: "Visitas técnicas e recolha.",
    quickLocationAction: "Ver no Mapa",
    formTitle: "Solicitar Contacto",
    formSubtitle: "Preencha o formulário para um atendimento personalizado.",
    formIntentLabel: "Qual o seu objetivo? *",
    formIntentOptions: [
      "Pedido de Amostras (Catálogo)",
      "Desenvolvimento à Medida",
      "Cotação / Encomenda B2B",
      "Dúvida / Apoio Técnico",
      "Outro"
    ],
    formSectorLabel: "Setor de Atividade *",
    formSectorOptions: [
      "Calçado",
      "Marroquinaria",
      "Estofos / Mobiliário",
      "Outro"
    ],
    formName: "Nome / Empresa *",
    formEmail: "E-mail *",
    formMessage: "Detalhes do Pedido (Ex: Referências, Cores, Quantidades) *",
    formSubmit: "ENVIAR PEDIDO",
    formSuccess: "Pedido enviado com sucesso! A nossa equipa entrará em contacto brevemente.",
    trustTitle: "Garantias",
    trustPoints: [
      { title: "Resposta Rápida", desc: "Acompanhamento comercial dedicado em menos de 24 horas." },
      { title: "Amostragem Global", desc: "Envio rápido de amostras e catálogos para todo o mundo." },
      { title: "LWG Gold Rated", desc: "Excelência ambiental auditada e produção 100% verde." },
      { title: "Desenvolvimento Custom", desc: "Capacidade para afinar cores e artigos à sua medida." }
    ]
  },
  EN: {
    title: "Contacts",
    subtitle: "Start your project, request samples, or schedule a visit to our production plant.",
    headquarters: "Headquarters & Production Plant",
    address: "Rua 24 de Junho, 1399\n2380-639 Vila Moreira, Portugal",
    phoneNote: "national landline call",
    agentsTitle: "Commercial Partners Network",
    agentsText: "Curtumes Ibéria has a network of partners with a strategic presence in the main hubs of the footwear and leather goods industry.",
    quickCallTitle: "Direct Commercial Line",
    quickCallDesc: "Fast and specialized B2B support.",
    quickCallAction: "Call Now",
    quickWhatsAppTitle: "WhatsApp",
    quickWhatsAppDesc: "Samples, quotes, and quick queries.",
    quickWhatsAppAction: "Send Message",
    quickLocationTitle: "Headquarters",
    quickLocationDesc: "Technical visits and pickup.",
    quickLocationAction: "View on Map",
    formTitle: "Request Commercial Contact",
    formSubtitle: "Fill out the form for personalized service. We guarantee a response in less than 24 business hours.",
    formIntentLabel: "What is your goal? *",
    formIntentOptions: [
      "Sample Request (Catalog)",
      "Bespoke Development",
      "B2B Quote / Order",
      "Technical Support",
      "Other"
    ],
    formSectorLabel: "Industry Sector *",
    formSectorOptions: [
      "Footwear",
      "Leather Goods",
      "Upholstery / Furniture",
      "Other"
    ],
    formName: "Full Name / Company *",
    formEmail: "Professional E-mail *",
    formMessage: "Request Details (e.g., References, Colors, Quantities) *",
    formSubmit: "Send Request",
    formSuccess: "Request sent successfully! Our team will contact you shortly.",
    trustTitle: "B2B Guarantees",
    trustPoints: [
      { title: "Fast Response", desc: "Dedicated commercial follow-up in under 24 hours." },
      { title: "Global Sampling", desc: "Fast shipping of samples and catalogs worldwide." },
      { title: "LWG Gold Rated", desc: "Audited environmental excellence and 100% green energy." },
      { title: "Custom Development", desc: "Ability to fine-tune colors and leathers to your needs." }
    ]
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
  const [activeTab, setActiveTab] = useState('pt');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert(data.formSuccess);
      setLoading(false);
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  const activeAgents = agentesInternacionais.find(p => p.id === activeTab)?.agentes || [];

  return (
    <div className="bg-[#F8FAFC] min-h-screen relative overflow-hidden flex flex-col">
      <PageHeader 
        title={data.title} 
        subtitle={data.subtitle} 
        backgroundImage="/tour/DSCF9299.webp" 
      />

      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30 mt-[50vh]">
        <div className="absolute top-0 right-[20%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-purple-100 via-blue-50 to-orange-50 blur-3xl mix-blend-multiply"></div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 w-full relative z-10 py-16 lg:py-20 space-y-16 lg:space-y-20">
        
        {/* QUICK CONTACT CHANNELS - FLOATING BAR */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-20 -mt-24 lg:-mt-32 mb-12 max-w-5xl mx-auto w-full"
        >
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl md:rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white p-6 md:p-4 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            
            {/* WhatsApp */}
            <a 
              href="https://wa.me/351962900019" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-5 group flex-1 w-full justify-center md:justify-center hover:bg-gray-50/50 p-4 rounded-2xl md:rounded-full transition-all"
            >
               <div className="w-14 h-14 bg-green-50 rounded-full flex flex-shrink-0 items-center justify-center text-green-600 group-hover:scale-110 transition-transform duration-300">
                 <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                 </svg>
               </div>
               <div>
                 <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1">{data.quickWhatsAppTitle}</p>
                 <span className="text-gray-900 font-title font-bold text-lg group-hover:text-green-600 transition-colors">+351 962 900 019</span>
               </div>
            </a>
            
            {/* Divider */}
            <div className="hidden md:block w-px h-16 bg-gray-200/50"></div>

            {/* Location */}
            <a 
              href="https://maps.google.com/?q=Rua+24+de+Junho+1399+2380-639+Vila+Moreira+Portugal" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-5 group flex-1 w-full justify-center md:justify-center hover:bg-gray-50/50 p-4 rounded-2xl md:rounded-full transition-all"
            >
               <div className="w-14 h-14 bg-orange-50 rounded-full flex flex-shrink-0 items-center justify-center text-orange-500 group-hover:scale-110 transition-transform duration-300">
                 <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                 </svg>
               </div>
               <div>
                 <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1">{data.quickLocationTitle}</p>
                 <span className="text-gray-900 font-title font-bold text-sm leading-snug whitespace-pre-line group-hover:text-orange-500 transition-colors">{data.address}</span>
               </div>
            </a>

          </div>
        </motion.div>

        {/* B2B FORM AND TRUST STRIP */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-stretch">
          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 h-full"
          >
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,40,88,0.08)] border border-gray-100 relative overflow-hidden h-full flex flex-col justify-center">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-institucional-blue via-blue-400 to-institucional-blue"></div>
              
              <div className="mb-8">
                <h3 className="text-2xl font-title font-bold text-institucional-blue mb-3">{data.formTitle}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{data.formSubtitle}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                      {data.formIntentLabel}
                    </label>
                    <div className="relative">
                      <select required className="w-full p-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-institucional-blue/20 focus:border-institucional-blue outline-none transition-all text-sm appearance-none">
                        <option value="" disabled selected>Selecione uma opção</option>
                        {data.formIntentOptions.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                      {data.formSectorLabel}
                    </label>
                    <div className="relative">
                      <select required className="w-full p-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-institucional-blue/20 focus:border-institucional-blue outline-none transition-all text-sm appearance-none">
                        <option value="" disabled selected>Selecione um setor</option>
                        {data.formSectorOptions.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                      {data.formName}
                    </label>
                    <input type="text" required className="w-full p-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-institucional-blue/20 focus:border-institucional-blue outline-none transition-all text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                      {data.formEmail}
                    </label>
                    <input type="email" required className="w-full p-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-institucional-blue/20 focus:border-institucional-blue outline-none transition-all text-sm" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                    {data.formMessage}
                  </label>
                  <textarea rows={4} required className="w-full p-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-institucional-blue/20 focus:border-institucional-blue outline-none transition-all text-sm resize-none"></textarea>
                </div>

                <div className="pt-2">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-md flex items-center justify-center gap-2 ${
                      loading ? 'bg-blue-400 cursor-wait' : 'bg-institucional-blue hover:bg-blue-900 hover:shadow-xl hover:-translate-y-0.5'
                    }`}
                  >
                    {loading ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <span>{data.formSubmit}</span>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </>
                    )}
                  </button>
                  <div className="flex items-center justify-center gap-4 mt-6">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                      <svg className="w-4 h-4 text-institucional-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                      {language === 'PT' ? 'Dados Seguros' : 'Secure Data'}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Trust Strip */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1 h-full"
          >
            <div className="bg-institucional-blue text-white p-8 md:p-10 rounded-2xl shadow-xl relative overflow-hidden h-full flex flex-col justify-between">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
              
              <h3 className="text-xl font-title font-bold mb-8 flex items-center gap-3">
                <svg className="w-6 h-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                {data.trustTitle}
              </h3>

              <div className="space-y-8 relative z-10">
                {data.trustPoints.map((point, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <span className="font-bold text-orange-400">{i + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-base mb-1">{point.title}</h4>
                      <p className="text-sm text-blue-100/70 leading-relaxed">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* AGENTS SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="pt-10 border-t border-gray-200"
        >
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-title font-bold text-institucional-blue mb-4">
              {data.agentsTitle}
            </h2>
            <p className="text-gray-500">
              {data.agentsText}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 max-w-5xl mx-auto">
            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-3 p-4 mb-2">
              {agentesInternacionais.map((pais) => (
                <button
                  key={pais.id}
                  onClick={() => setActiveTab(pais.id)}
                  className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-sm border ${
                    activeTab === pais.id 
                      ? 'bg-institucional-blue text-white border-institucional-blue scale-105 shadow-md' 
                      : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-900 hover:shadow'
                  }`}
                >
                  {language === 'PT' ? pais.paisPT : pais.paisEN}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6 md:p-10 min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-wrap justify-center gap-6"
                >
                  {activeAgents.map((agente: any, idx: number) => (
                    <div key={idx} className="w-full max-w-sm bg-gray-50/50 rounded-xl p-6 border border-gray-100 hover:border-institucional-blue/20 hover:shadow-md transition-all">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-institucional-blue shadow-sm">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        </div>
                        <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wide">
                          {agente.localKey ? t(agente.localKey as any) : agente.local}
                        </h4>
                      </div>
                      
                      <h5 className="font-bold text-institucional-blue mb-2 text-lg">
                        {agente.nomeKey ? t(agente.nomeKey as any) : agente.nome}
                      </h5>
                      <p className="text-sm text-gray-500 mb-6 h-10 line-clamp-2">
                        {agente.moradaKey ? t(agente.moradaKey as any) : agente.morada}
                      </p>
                      
                      <div className="space-y-3 pt-4 border-t border-gray-200/60">
                        <a href={`tel:${agente.telefone.replace(/\s/g, '')}`} className="flex items-center text-sm font-bold text-gray-700 hover:text-institucional-blue transition-colors">
                          <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                          {agente.telefone}
                        </a>
                        <a href={`mailto:${agente.email}`} className="flex items-center text-sm font-bold text-gray-700 hover:text-institucional-blue transition-colors">
                          <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                          <span className="truncate">{agente.email}</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}