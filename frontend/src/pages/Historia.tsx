import { useLanguage } from '../contexts/LanguageContext';

// Dicionário local para textos longos, respeitando rigorosamente o documento fornecido.
const content = {
  PT: {
    title: "A Nossa História",
    paragraphs: [
      "A história da Curtumes Ibéria começou em 1963, quando José Maria Cardoso Lopes Rosa, pai dos atuais principais acionistas, Joaquim José Moreira Rosa e Maria Gabriela Moreira Rosa, iniciou a atividade através de uma empresa em nome individual.",
      "Em finais de 1975, foi constituída a sociedade por quotas José Maria Cardoso Rosa & Filhos, Lda., assinalando uma nova fase de crescimento e consolidação da empresa.",
      "Desde os primeiros anos, a Curtumes Ibéria apostou na modernização dos processos produtivos, na inovação tecnológica e na proteção ambiental. Estes investimentos, aliados ao crescimento da procura de couro para o desenvolvimento de novos produtos a partir de meados da década de 1970, permitiram reforçar progressivamente a posição da empresa no mercado.",
      "Em 1993, a empresa transformou-se em sociedade anónima, acompanhada por um aumento do capital social, e adotou a atual denominação: Curtumes Ibéria, S.A.",
      "Ao longo de mais de seis décadas, a Curtumes Ibéria afirmou-se como uma das empresas de referência do setor na Península Ibérica. Atualmente, a terceira geração dá continuidade ao projeto familiar, conjugando o conhecimento acumulado ao longo dos anos com uma visão orientada para a inovação, a qualidade e a evolução constante.",
      "A empresa dedica-se à curtimenta e ao acabamento de peles de bovino, com uma gama diversificada de artigos destinados sobretudo às indústrias do calçado, da marroquinaria e da moda. A sua capacidade técnica permite desenvolver centenas de artigos diferentes, adaptados às tendências, às novas técnicas de acabamento e às necessidades específicas de um mercado cada vez mais exigente.",
      "Um dos principais pontos fortes da Curtumes Ibéria reside na capacidade de valorizar a matéria-prima através da tecnologia, do conhecimento técnico e do desenvolvimento de acabamentos diferenciadores. Desta forma, consegue criar couros de elevada qualidade, com características estéticas e funcionais adequadas à produção de calçado e artigos de moda."
    ],
    salesTitle: "Presença Global",
    salesText: "A internacionalização tem desempenhado um papel importante no crescimento da empresa. Com vendas mundiais para:",
    countries: [
      "Portugal", "Espanha", "França", "Reino Unido", "Alemanha", 
      "Itália", "Suécia", "Roménia", "Marrocos", "Estados Unidos", 
      "Índia", "China", "Vietname"
    ]
  },
  EN: {
    title: "Our History",
    paragraphs: [
      "Curtumes Ibéria’s history began in 1963, when José Maria Cardoso Lopes Rosa, father of the company’s current main shareholders, Joaquim José Moreira Rosa and Maria Gabriela Moreira Rosa, started the business as a sole proprietorship.",
      "At the end of 1975, José Maria Cardoso Rosa & Filhos, Lda. was established, marking a new stage in the company’s growth and consolidation.",
      "From its earliest years, Curtumes Ibéria invested in the modernisation of its production processes, technological innovation and environmental protection. These investments, combined with the growing demand for leather for the development of new products from the mid-1970s onwards, progressively strengthened the company’s position in the market.",
      "In 1993, the company became a public limited company, accompanied by an increase in share capital, and adopted its current name: Curtumes Ibéria, S.A.",
      "Over more than six decades, Curtumes Ibéria has established itself as one of the leading companies in the sector across the Iberian Peninsula. Today, the third generation continues the family project, combining accumulated expertise with a vision focused on innovation, quality and continuous development.",
      "The company specialises in the tanning and finishing of bovine hides, offering a diverse range of leathers primarily intended for the footwear, leather goods and fashion industries. Its technical expertise allows it to develop hundreds of different articles, adapted to new trends, finishing techniques and the specific requirements of an increasingly demanding market.",
      "One of Curtumes Ibéria’s main strengths is its ability to enhance raw materials through technology, technical expertise and the development of distinctive finishes. This allows the company to create high-quality leathers with the aesthetic and functional characteristics required for footwear and fashion products."
    ],
    salesTitle: "Global Presence",
    salesText: "Internationalisation has also played an important role in the company’s growth. With global sales to:",
    countries: [
      "Portugal", "Spain", "France", "United Kingdom", "Germany", 
      "Italy", "Sweden", "Romania", "Morocco", "United States", 
      "India", "China", "Vietnam"
    ]
  }
};

export function Historia() {
  const { language } = useLanguage();
  const data = content[language];

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-32 pb-24 relative overflow-hidden">
      
      {/* Elementos Gráficos de Fundo (Brand Book) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-gradient-to-bl from-blue-100 via-transparent to-transparent blur-3xl mix-blend-multiply"></div>
        <svg className="absolute bottom-20 -left-20 w-[600px] h-[600px] text-institucional-blue/5 rotate-45" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M45.7,-76.4C58.9,-69.3,69.1,-55.4,78.2,-41.1C87.3,-26.8,95.3,-12.1,94.2,2C93.1,16.1,82.8,29.6,72.4,41.4C62,53.2,51.5,63.3,39,70.5C26.5,77.7,11.9,82,-3.1,87C-18.1,92,-33.5,77.7,-46.8,68.2C-60.1,58.7,-71.3,44.1,-77.6,28.1C-83.9,12.1,-85.3,-5.3,-79.8,-20.1C-74.3,-34.9,-61.9,-47.1,-48.5,-54.6C-35.1,-62.1,-20.7,-64.9,-4.9,-56.9C10.9,-48.9,21.8,-30.1,32.4,-83.4Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Cabeçalho da Secção */}
        <div className="text-center mb-16">
          <span className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2 block">EST/ 1963</span>
          <h1 className="text-4xl md:text-5xl font-title font-bold text-institucional-blue">{data.title}</h1>
          <div className="w-16 h-1 bg-institucional-blue mx-auto mt-6"></div>
        </div>

        {/* Corpo de Texto (Estilo Editorial) */}
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-100 mb-16 space-y-6 text-gray-700 text-lg leading-relaxed">
          {data.paragraphs.map((paragraph, index) => (
            <p key={index} className={index === 0 ? "text-xl font-medium text-institucional-blue" : ""}>
              {paragraph}
            </p>
          ))}
        </div>

        {/* Secção de Vendas Mundiais */}
        <div className="text-center">
          <h2 className="text-2xl font-title font-bold text-institucional-blue mb-4">{data.salesTitle}</h2>
          <p className="text-gray-600 mb-8">{data.salesText}</p>
          
          <div className="flex flex-wrap justify-center gap-3">
            {data.countries.map((country, index) => (
              <span 
                key={index} 
                className="bg-white border border-gray-200 text-institucional-blue px-4 py-2 rounded-full text-sm font-bold shadow-sm"
              >
                {country}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}