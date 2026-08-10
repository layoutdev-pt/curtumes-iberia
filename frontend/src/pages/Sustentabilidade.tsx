import { useLanguage } from '../contexts/LanguageContext';

// Dicionário com os textos retirados estritamente da documentação oficial
const content = {
  PT: {
    title: "Sustentabilidade e Qualidade",
    intro: "A sustentabilidade ocupa igualmente um lugar central na estratégia da Curtumes Ibéria." /* */,
    circularTitle: "Economia Circular e Meio Ambiente",
    circularText: "A empresa integra um modelo de economia circular, ao transformar um subproduto da indústria alimentar num material durável, versátil e de elevado valor acrescentado. Ao longo dos anos, tem investido em tecnologias mais eficientes, na otimização do tratamento da água, na redução do impacto ambiental e na utilização de soluções energéticas mais sustentáveis." /*[cite: 5] */,
    lwgTitle: "Certificação Gold LWG",
    lwgText: "Este compromisso foi reconhecido através da atribuição da classificação Gold pela Leather Working Group — a classificação mais elevada desta organização internacional, que avalia o desempenho ambiental e as boas práticas das empresas do setor do couro." /*[cite: 5] */,
    isoTitle: "Sistema de Gestão da Qualidade",
    isoText: "A qualidade tem sido uma prioridade ao longo de toda a sua história. Em outubro de 2000, a empresa obteve a certificação ISO 9002 e, em outubro de 2003, alcançou a recertificação do Sistema de Gestão da Qualidade de acordo com a norma NP EN ISO 9001:2000. Estes marcos refletiram o compromisso da organização com a melhoria contínua dos processos, dos produtos e do serviço prestado aos clientes." /*[cite: 5] */
  },
  EN: {
    title: "Sustainability and Quality",
    intro: "Sustainability is also central to Curtumes Ibéria’s strategy." /*[cite: 5] */,
    circularTitle: "Circular Economy and Environment",
    circularText: "The company operates within a circular economy model, transforming a by-product of the food industry into a durable, versatile and high-value material. Over the years, it has invested in more efficient technologies, water treatment optimisation, environmental impact reduction and more sustainable energy solutions." /*[cite: 5] */,
    lwgTitle: "LWG Gold Rating",
    lwgText: "This commitment has been recognised with a Gold rating from the Leather Working Group — the organisation’s highest rating, which assesses the environmental performance and responsible practices of companies operating in the leather industry." /*[cite: 5] */,
    isoTitle: "Quality Management System",
    isoText: "Quality has remained a priority throughout the company’s history. In October 2000, Curtumes Ibéria obtained ISO 9002 certification and, in October 2003, achieved the recertification of its Quality Management System under the NP EN ISO 9001:2000 standard. These milestones reflected the company’s commitment to the continuous improvement of its processes, products and customer service." /*[cite: 5] */
  }
};

export function Sustentabilidade() {
  const { language } = useLanguage();
  const data = content[language];

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-44 pb-24 relative overflow-hidden">
      
      {/* Elementos Gráficos de Fundo */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <div className="absolute top-1/4 -left-[20%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-green-100 via-blue-50 to-transparent blur-3xl mix-blend-multiply"></div>
        <svg className="absolute top-20 right-10 w-[500px] h-[500px] text-institucional-blue/5 -rotate-12" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M45.7,-76.4C58.9,-69.3,69.1,-55.4,78.2,-41.1C87.3,-26.8,95.3,-12.1,94.2,2C93.1,16.1,82.8,29.6,72.4,41.4C62,53.2,51.5,63.3,39,70.5C26.5,77.7,11.9,82,-3.1,87C-18.1,92,-33.5,77.7,-46.8,68.2C-60.1,58.7,-71.3,44.1,-77.6,28.1C-83.9,12.1,-85.3,-5.3,-79.8,-20.1C-74.3,-34.9,-61.9,-47.1,-48.5,-54.6C-35.1,-62.1,-20.7,-64.9,-4.9,-56.9C10.9,-48.9,21.8,-30.1,32.4,-83.4Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-title font-bold text-institucional-blue mb-6">{data.title}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">{data.intro}</p>
        </div>

        {/* Secção de Economia Circular */}
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 mb-12">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h2 className="text-2xl font-title font-bold text-institucional-blue">{data.circularTitle}</h2>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed">
            {data.circularText}
          </p>
        </div>

        {/* Grelha de Certificações em Destaque */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Cartão LWG */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-yellow-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
            <div className="mb-6 flex justify-between items-start">
              <h3 className="text-xl font-title font-bold text-institucional-blue pr-8">{data.lwgTitle}</h3>
              <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">LWG Gold</span>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm">
              {data.lwgText}
            </p>
          </div>

          {/* Cartão ISO */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-blue-50 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
            <div className="mb-6 flex justify-between items-start">
              <h3 className="text-xl font-title font-bold text-institucional-blue pr-8">{data.isoTitle}</h3>
              <span className="bg-blue-100 text-institucional-blue text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">ISO 9001</span>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm">
              {data.isoText}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}