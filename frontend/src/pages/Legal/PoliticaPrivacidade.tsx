import { useLanguage } from '../../contexts/LanguageContext';

const content = {
  PT: {
    title: "Política de Privacidade",
    intro: "A Curtumes Ibéria, S.A. (NIF: 500574960), com sede na Rua 24 de Junho, 1399, 2380-639 Vila Moreira, Portugal, está empenhada em proteger a privacidade dos seus utilizadores.",
    sec1Title: "1. Recolha de Dados",
    sec1Text: "Apenas recolhemos os dados estritamente necessários para o processamento de encomendas B2B e resposta a contactos. Não efetuamos rastreio geográfico por IP, respeitando a privacidade de utilizadores em VPNs corporativas."
  },
  EN: {
    title: "Privacy Policy",
    intro: "Curtumes Ibéria, S.A. (VAT: 500574960), headquartered at Rua 24 de Junho, 1399, 2380-639 Vila Moreira, Portugal, is committed to protecting the privacy of its users.",
    sec1Title: "1. Data Collection",
    sec1Text: "We only collect data strictly necessary for B2B order processing and responding to contacts. We do not perform geographical IP tracking, respecting the privacy of users on corporate VPNs."
  }
};

export function PoliticaPrivacidade() {
  const { language } = useLanguage();
  const data = content[language];

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <div className="max-w-4xl mx-auto py-32 px-8 relative z-10">
        <h1 className="text-4xl md:text-5xl font-title font-bold text-institucional-blue mb-12">
          {data.title}
        </h1>
        
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 space-y-8 text-gray-700 leading-relaxed text-lg">
          <p className="font-medium text-gray-900">
            {data.intro}
          </p>
          
          <div>
            <h2 className="text-2xl font-title font-bold text-institucional-blue mb-4">
              {data.sec1Title}
            </h2>
            <p>
              {data.sec1Text}
            </p>
          </div>
          
          {/* Adicionar restantes cláusulas em dictionary posteriormente */}
        </div>
      </div>
    </div>
  );
}