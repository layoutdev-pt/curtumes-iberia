import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { PageHeader } from '../components/ui/PageHeader';
import { motion, AnimatePresence } from 'framer-motion';

const content = {
  PT: {
    title: "Os Nossos Contactos",
    subtitle: "Fale com a nossa equipa, solicite amostras ou agende uma visita à Curtumes Ibéria.",
    address: "Rua 24 de Junho, 1399\n2380-639 Vila Moreira, Portugal",
    agentsTitle: "Os Nossos Parceiros",
    agentsText: "Encontre o contacto Curtumes Ibéria mais próximo de si.",
    quickWhatsAppTitle: "WhatsApp",
    quickLocationTitle: "Fábrica & Showroom",
    formTitle: "Solicitar Contacto",
    formSubtitle: "Preencha o formulário e diga-nos o que procura. A nossa equipa entrará em contacto consigo.",
    formIntentLabel: "Qual o seu objetivo? *",
    formIntentPlaceholder: "Selecione uma opção",
    formIntentOptions: [
      "Pedido de Amostras",
      "Desenvolvimento à Medida",
      "Cotação / Encomenda B2B",
      "Dúvida / Apoio Técnico",
      "Outro"
    ],
    formSectorLabel: "Setor de Atividade *",
    formSectorPlaceholder: "Selecione um setor",
    formSectorOptions: [
      "Calçado",
      "Marroquinaria",
      "Vestuário",
      "Estofos / Mobiliário",
      "Outro"
    ],
    formName: "Nome / Empresa *",
    formEmail: "E-mail *",
    formMessage: "Detalhes do Pedido *",
    formMessageHint: "Referências, cores, quantidades ou outras informações relevantes.",
    formSubmit: "Envie o Pedido",
    formSecure: "Dados Seguros",
    formSuccess: "Pedido enviado com sucesso! A nossa equipa entrará em contacto brevemente.",
    whyTitle: "Porquê Curtumes Ibéria?",
    whyPoints: [
      { title: "Apoio Comercial", desc: "Uma equipa disponível para acompanhar cada pedido e encontrar a solução adequada." },
      { title: "Amostras", desc: "Desenvolvimento e envio de amostras de acordo com as necessidades de cada cliente." },
      { title: "LWG Gold Rated", desc: "Classificação Gold da Leather Working Group, que reconhece o nosso desempenho ambiental." },
      { title: "Desenvolvimento à Medida", desc: "Desenvolvimento de artigos, cores e acabamentos adaptados a diferentes requisitos." },
      { title: "Terceira Geração", desc: "Mais de 60 anos de conhecimento, hoje nas mãos da terceira geração da família." }
    ]
  },
  EN: {
    title: "Our Contacts",
    subtitle: "Talk to our team, request samples or schedule a visit to Curtumes Ibéria.",
    address: "Rua 24 de Junho, 1399\n2380-639 Vila Moreira, Portugal",
    agentsTitle: "Our Partners",
    agentsText: "Find the Curtumes Ibéria contact closest to you.",
    quickWhatsAppTitle: "WhatsApp",
    quickLocationTitle: "Factory & Showroom",
    formTitle: "Request Contact",
    formSubtitle: "Fill in the form and tell us what you are looking for. Our team will get in touch with you.",
    formIntentLabel: "What is your goal? *",
    formIntentPlaceholder: "Select an option",
    formIntentOptions: [
      "Sample Request",
      "Bespoke Development",
      "B2B Quote / Order",
      "Technical Support",
      "Other"
    ],
    formSectorLabel: "Industry Sector *",
    formSectorPlaceholder: "Select a sector",
    formSectorOptions: [
      "Footwear",
      "Leather Goods",
      "Apparel",
      "Upholstery / Furniture",
      "Other"
    ],
    formName: "Name / Company *",
    formEmail: "E-mail *",
    formMessage: "Request Details *",
    formMessageHint: "References, colours, quantities or other relevant information.",
    formSubmit: "Send Request",
    formSecure: "Secure Data",
    formSuccess: "Request sent successfully! Our team will contact you shortly.",
    whyTitle: "Why Curtumes Ibéria?",
    whyPoints: [
      { title: "Commercial Support", desc: "A team available to follow up on every request and find the right solution." },
      { title: "Samples", desc: "Development and shipping of samples according to each client's needs." },
      { title: "LWG Gold Rated", desc: "Gold rating from the Leather Working Group, recognising our environmental performance." },
      { title: "Bespoke Development", desc: "Development of articles, colours and finishes adapted to different requirements." },
      { title: "Third Generation", desc: "More than 60 years of knowledge, today in the hands of the family's third generation." }
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

      <div className="max-w-[1300px] mx-auto px-6 w-full relative z-10 pt-16 lg:pt-20 pb-0 space-y-16 lg:space-y-24">

        {/* CANAIS DE CONTACTO RÁPIDO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-20 -mt-24 lg:-mt-32 mb-12 max-w-5xl mx-auto w-full"
        >
          <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 p-6 md:p-4 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">

            {/* WhatsApp */}
            <a
              href="https://wa.me/351962900019"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 group flex-1 w-full justify-center hover:bg-gray-50/60 p-4 transition-all"
            >
              <div className="w-14 h-14 bg-green-50 rounded-full flex flex-shrink-0 items-center justify-center text-green-600 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.25em] font-bold mb-1">{data.quickWhatsAppTitle}</p>
                <span className="text-gray-900 font-title font-bold text-lg group-hover:text-green-600 transition-colors">+351 962 900 019</span>
              </div>
            </a>

            <div className="hidden md:block w-px h-16 bg-gray-200/60"></div>

            {/* Localização */}
            <a
              href="https://maps.google.com/?q=Rua+24+de+Junho+1399+2380-639+Vila+Moreira+Portugal"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 group flex-1 w-full justify-center hover:bg-gray-50/60 p-4 transition-all"
            >
              <div className="w-14 h-14 bg-orange-50 rounded-full flex flex-shrink-0 items-center justify-center text-orange-500 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.25em] font-bold mb-1">{data.quickLocationTitle}</p>
                <span className="text-gray-900 font-title font-bold text-sm leading-snug whitespace-pre-line group-hover:text-orange-500 transition-colors">{data.address}</span>
              </div>
            </a>

          </div>
        </motion.div>

        {/* FORMULÁRIO + PORQUÊ CURTUMES IBÉRIA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-stretch">
          {/* Formulário */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 h-full"
          >
            <div className="bg-white p-8 md:p-12 border border-gray-200 relative overflow-hidden h-full flex flex-col justify-center">
              <div className="mb-10">
                <h2 className="text-3xl md:text-4xl font-title font-bold text-institucional-blue uppercase tracking-tight mb-4">{data.formTitle}</h2>
                <p className="text-gray-500 text-base leading-relaxed font-light">{data.formSubtitle}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-[0.2em] mb-2">
                      {data.formIntentLabel}
                    </label>
                    <div className="relative">
                      <select required defaultValue="" className="w-full p-3.5 bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-institucional-blue outline-none transition-all text-sm appearance-none">
                        <option value="" disabled>{data.formIntentPlaceholder}</option>
                        {data.formIntentOptions.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-[0.2em] mb-2">
                      {data.formSectorLabel}
                    </label>
                    <div className="relative">
                      <select required defaultValue="" className="w-full p-3.5 bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-institucional-blue outline-none transition-all text-sm appearance-none">
                        <option value="" disabled>{data.formSectorPlaceholder}</option>
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
                    <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-[0.2em] mb-2">
                      {data.formName}
                    </label>
                    <input type="text" required className="w-full p-3.5 bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-institucional-blue outline-none transition-all text-sm" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-[0.2em] mb-2">
                      {data.formEmail}
                    </label>
                    <input type="email" required className="w-full p-3.5 bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-institucional-blue outline-none transition-all text-sm" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-[0.2em] mb-2">
                    {data.formMessage}
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder={data.formMessageHint}
                    className="w-full p-3.5 bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-institucional-blue outline-none transition-all text-sm resize-none"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 font-bold uppercase tracking-[0.2em] text-xs text-white transition-all flex items-center justify-center gap-3 ${
                      loading ? 'bg-blue-400 cursor-wait' : 'bg-institucional-blue hover:bg-blue-900'
                    }`}
                  >
                    {loading ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <span>{data.formSubmit}</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </>
                    )}
                  </button>
                  <div className="flex items-center justify-center mt-6">
                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">
                      <svg className="w-4 h-4 text-institucional-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                      {data.formSecure}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>

          {/* PORQUÊ CURTUMES IBÉRIA? */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 h-full"
          >
            <div className="bg-institucional-blue text-white p-8 md:p-10 relative overflow-hidden h-full flex flex-col">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>

              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl md:text-2xl font-title font-bold uppercase tracking-tight mb-10 relative z-10"
              >
                {data.whyTitle}
              </motion.h2>

              <div className="space-y-7 relative z-10">
                {data.whyPoints.map((point, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.55,
                      delay: 0.2 + i * 0.16,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex gap-4 group cursor-default p-2 -m-2 rounded-sm hover:bg-white/[0.04] transition-colors"
                  >
                    <span className="flex-shrink-0 font-title font-bold text-lg text-white/40 tabular-nums pt-0.5 group-hover:text-blue-300 transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-bold text-sm uppercase tracking-[0.15em] mb-1.5 group-hover:text-blue-100 transition-colors">
                        {point.title}
                      </h3>
                      <p className="text-sm text-blue-100/70 leading-relaxed font-light group-hover:text-blue-100/90 transition-colors">
                        {point.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* OS NOSSOS PARCEIROS */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="pt-10 border-t border-gray-200"
        >
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-title font-bold text-institucional-blue uppercase tracking-tight mb-4">
              {data.agentsTitle}
            </h2>
            <p className="text-gray-500 font-light text-lg">
              {data.agentsText}
            </p>
          </div>

          <div className="bg-white border border-gray-200 p-2 max-w-5xl mx-auto">
            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-3 p-4 mb-2">
              {agentesInternacionais.map((pais) => (
                <button
                  key={pais.id}
                  onClick={() => setActiveTab(pais.id)}
                  className={`px-6 py-2.5 font-bold text-[11px] uppercase tracking-[0.2em] transition-all border ${
                    activeTab === pais.id
                      ? 'bg-institucional-blue text-white border-institucional-blue'
                      : 'bg-white text-gray-500 border-gray-200 hover:text-institucional-blue hover:border-institucional-blue'
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
                    <div key={idx} className="w-full max-w-sm bg-gray-50/60 p-6 border border-gray-100 hover:border-institucional-blue/30 transition-all">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-white flex items-center justify-center text-institucional-blue border border-gray-100">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        </div>
                        <h3 className="font-bold text-gray-900 text-xs uppercase tracking-[0.2em]">
                          {agente.localKey ? t(agente.localKey as any) : agente.local}
                        </h3>
                      </div>

                      <h4 className="font-bold text-institucional-blue mb-2 text-lg font-title">
                        {agente.nomeKey ? t(agente.nomeKey as any) : agente.nome}
                      </h4>
                      <p className="text-sm text-gray-500 mb-6 h-10 line-clamp-2 font-light">
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
