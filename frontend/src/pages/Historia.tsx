import { useLanguage } from '../contexts/LanguageContext';
import { PageHeader } from '../components/ui/PageHeader';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ComposableMap, Geographies, Geography, Line, Marker } from 'react-simple-maps';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';

const content = {
  PT: {
    heroTitle: "A Nossa História",
    heroText: "Mais de 60 anos de experiência, três gerações e uma história construída em torno do couro. Desde 1963, a Curtumes Ibéria transforma peles bovinas em couros para calçado e marroquinaria, combinando o conhecimento de várias gerações com tecnologia, inovação e uma aposta contínua na evolução dos seus processos.",

    originEyebrow: "Onde Tudo Começou",
    originFounder: "José Maria Cardoso Lopes Rosa, fundador da Curtumes Ibéria.",
    originText: [
      "A história da Curtumes Ibéria começou em 1963, quando José Maria Cardoso Lopes Rosa, pai dos atuais principais acionistas, Joaquim José Moreira Rosa e Maria Gabriela Moreira Rosa, iniciou a atividade através de uma empresa em nome individual.",
      "Em finais de 1975, foi constituída a sociedade por quotas José Maria Cardoso Rosa & Filhos, Lda., assinalando uma nova fase de crescimento e consolidação da empresa.",
      "Desde os primeiros anos, a Curtumes Ibéria apostou na modernização dos processos produtivos, na inovação tecnológica e na proteção ambiental. Estes investimentos, aliados ao crescimento da procura de couro para o desenvolvimento de novos produtos a partir de meados da década de 1970, permitiram reforçar progressivamente a posição da empresa no mercado.",
      "Em 1993, a empresa transformou-se em sociedade anónima, acompanhada por um aumento do capital social, e adotou a atual denominação: Curtumes Ibéria, S.A."
    ],

    stats: {
      anos: "Anos de Experiência",
      anosSub: "Desde 1963 em Vila Moreira",
      geracoes: "Gerações",
      geracoesSub: "Uma empresa familiar",
      lwg: "Classificação",
      lwgSub: "Classificação ambiental máxima"
    },

    generationsTitle: "Conhecimento que passa de geração em geração.",
    generationsText: [
      "Hoje, a terceira geração assume um papel ativo na Curtumes Ibéria, mantendo a proximidade de uma empresa familiar com a capacidade técnica e industrial necessária para responder a um mercado internacional.",
      "O conhecimento acumulado ao longo de décadas cruza-se com novas ideias, novas tecnologias e novas formas de trabalhar a pele."
    ],

    leatherTitle: "All About Leather.",
    leatherText: [
      "A Curtumes Ibéria dedica-se à curtimenta e ao acabamento de peles bovinas para calçado, marroquinaria e moda.",
      "Napas, anilinas, camurças, nubucks, artigos hidrofugados, ceras, óleos ou fantasias fazem parte de uma gama desenvolvida para responder a diferentes aplicações e necessidades.",
      "A capacidade técnica da nossa equipa permite desenvolver artigos, cores, texturas e acabamentos em colaboração com clientes, marcas e designers."
    ],
    leatherBtn: "Veja os Nossos Artigos",

    evolveTitle: "Evoluir faz parte do processo.",
    evolveText: [
      "Ao longo dos anos, a fábrica mudou. A tecnologia evoluiu. Os processos tornaram-se mais eficientes. E as possibilidades da pele multiplicaram-se.",
      "A Curtumes Ibéria investe continuamente em equipamentos, tecnologia e desenvolvimento técnico para melhorar a produção e criar novos artigos, sem perder o conhecimento que só mais de seis décadas de experiência conseguem trazer."
    ],

    worldTitle: "De Vila Moreira para o mundo.",
    worldText: [
      "O que começou em Alcanena ultrapassou há muito as fronteiras de Portugal.",
      "Hoje, os couros Curtumes Ibéria chegam a clientes em diferentes mercados europeus e internacionais, apoiados por uma rede de parceiros comerciais e por relações construídas ao longo dos anos.",
      "Portugal continua a ser casa. O mercado é global."
    ],
    worldBtn: "Conheça a Nossa Presença Internacional",

    betterTitle: "Produzir melhor também faz parte da história.",
    betterText: [
      "A evolução da Curtumes Ibéria não se mede apenas pela tecnologia ou pelos mercados onde está presente.",
      "A empresa transforma um subproduto da indústria alimentar num material durável e investe continuamente na melhoria do seu desempenho ambiental, desde a gestão da água e da energia à redução de desperdícios e à utilização de processos mais eficientes.",
      "Este trabalho é hoje reconhecido pela classificação Gold da Leather Working Group (LWG)."
    ],
    betterBtn: "Conheça o Nosso Compromisso",

    rebrandTitle: "2026. A mesma história, com uma nova imagem.",
    rebrandText: [
      "Mais de 60 anos depois, a Curtumes Ibéria muda por fora.",
      "Uma nova identidade para representar aquilo em que a empresa se tornou e aquilo que quer continuar a construir, sem perder o nome, o conhecimento e a história que a trouxeram até aqui."
    ],
    rebrandClaim: ["New logo. New identity. Same Curtumes.", "All About Leather."],

    salesTitle: "Presença Global",
    countries: [
      "Portugal", "Espanha", "França", "Reino Unido", "Alemanha",
      "Itália", "Suécia", "Roménia", "Marrocos", "Estados Unidos",
      "Índia", "China", "Vietname"
    ]
  },
  EN: {
    heroTitle: "Our History",
    heroText: "More than 60 years of experience, three generations and a history built around leather. Since 1963, Curtumes Ibéria has been turning bovine hides into leather for footwear and leather goods, combining the knowledge of several generations with technology, innovation and a continuous commitment to evolving its processes.",

    originEyebrow: "Where It All Began",
    originFounder: "José Maria Cardoso Lopes Rosa, founder of Curtumes Ibéria.",
    originText: [
      "Curtumes Ibéria's history began in 1963, when José Maria Cardoso Lopes Rosa, father of the company's current main shareholders, Joaquim José Moreira Rosa and Maria Gabriela Moreira Rosa, started the business as a sole proprietorship.",
      "At the end of 1975, José Maria Cardoso Rosa & Filhos, Lda. was established, marking a new stage in the company's growth and consolidation.",
      "From its earliest years, Curtumes Ibéria invested in the modernisation of its production processes, technological innovation and environmental protection. These investments, combined with the growing demand for leather for the development of new products from the mid-1970s onwards, progressively strengthened the company's position in the market.",
      "In 1993, the company became a public limited company, accompanied by an increase in share capital, and adopted its current name: Curtumes Ibéria, S.A."
    ],

    stats: {
      anos: "Years of Experience",
      anosSub: "Since 1963 in Vila Moreira",
      geracoes: "Generations",
      geracoesSub: "A family-owned company",
      lwg: "Rating",
      lwgSub: "Top environmental rating"
    },

    generationsTitle: "Knowledge passed from generation to generation.",
    generationsText: [
      "Today, the third generation plays an active role in Curtumes Ibéria, keeping the closeness of a family-owned company alongside the technical and industrial capacity required to serve an international market.",
      "The knowledge accumulated over decades meets new ideas, new technologies and new ways of working with leather."
    ],

    leatherTitle: "All About Leather.",
    leatherText: [
      "Curtumes Ibéria specialises in the tanning and finishing of bovine hides for footwear, leather goods and fashion.",
      "Nappas, anilines, suedes, nubucks, waterproof articles, waxes, oils and fantasy finishes are part of a range developed to meet different applications and requirements.",
      "Our team's technical capacity allows us to develop articles, colours, textures and finishes in collaboration with clients, brands and designers."
    ],
    leatherBtn: "View Our Articles",

    evolveTitle: "Evolving is part of the process.",
    evolveText: [
      "Over the years, the factory has changed. Technology has evolved. Processes have become more efficient. And the possibilities of leather have multiplied.",
      "Curtumes Ibéria invests continuously in equipment, technology and technical development to improve production and create new articles, without losing the knowledge that only more than six decades of experience can bring."
    ],

    worldTitle: "From Vila Moreira to the world.",
    worldText: [
      "What started in Alcanena went beyond the borders of Portugal a long time ago.",
      "Today, Curtumes Ibéria leathers reach clients across different European and international markets, supported by a network of commercial partners and by relationships built over the years.",
      "Portugal remains home. The market is global."
    ],
    worldBtn: "Discover Our International Presence",

    betterTitle: "Producing better is also part of the history.",
    betterText: [
      "Curtumes Ibéria's evolution is not measured only by technology or by the markets where it operates.",
      "The company transforms a by-product of the food industry into a durable material and invests continuously in improving its environmental performance, from water and energy management to waste reduction and the use of more efficient processes.",
      "This work is today recognised by the Gold rating from the Leather Working Group (LWG)."
    ],
    betterBtn: "Discover Our Commitment",

    rebrandTitle: "2026. The same history, with a new image.",
    rebrandText: [
      "More than 60 years on, Curtumes Ibéria is changing on the outside.",
      "A new identity to represent what the company has become and what it wants to keep building, without losing the name, the knowledge and the history that brought it here."
    ],
    rebrandClaim: ["New logo. New identity. Same Curtumes.", "All About Leather."],

    salesTitle: "Global Presence",
    countries: [
      "Portugal", "Spain", "France", "United Kingdom", "Germany",
      "Italy", "Sweden", "Romania", "Morocco", "United States",
      "India", "China", "Vietnam"
    ]
  }
};

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const origin: [number, number] = [-8.2245, 39.3999];

const destinations = [
  { name: "Espanha", coordinates: [-3.7492, 40.4637] as [number, number] },
  { name: "França", coordinates: [2.2137, 46.2276] as [number, number] },
  { name: "Reino Unido", coordinates: [-3.4359, 55.3781] as [number, number] },
  { name: "Alemanha", coordinates: [10.4515, 51.1656] as [number, number] },
  { name: "Itália", coordinates: [12.5673, 41.8719] as [number, number] },
  { name: "Suécia", coordinates: [18.6435, 60.1281] as [number, number] },
  { name: "Roménia", coordinates: [24.9667, 45.9431] as [number, number] },
  { name: "Marrocos", coordinates: [-7.0926, 31.7917] as [number, number] },
  { name: "Estados Unidos", coordinates: [-95.7128, 37.0902] as [number, number] },
  { name: "Índia", coordinates: [78.9628, 20.5936] as [number, number] },
  { name: "China", coordinates: [104.1953, 35.8616] as [number, number] },
  { name: "Vietname", coordinates: [108.2021, 14.0583] as [number, number] }
];

/**
 * Fotografias de máquinas, trabalhadores, bancada e fulões para a secção
 * "Evoluir faz parte do processo". Todas em formato paisagem, para encaixarem
 * nas células do bento sem cortes agressivos.
 */
const evolveGallery = [
  '/tour/DSCF9738.webp', // fulões (célula grande)
  '/tour/DSCF9343.webp', // máquina de acabamento
  '/tour/DSCF9226.webp', // equipa a inspecionar a pele
  '/tour/DSCF9039.webp', // operador junto à tina
  '/tour/DSCF9284.webp', // operador na máquina
  '/tour/DSCF9264.webp'  // bancada de trabalho
];

/** Cabeçalho de secção reutilizado em toda a página (título sempre em caixa alta). */
function SectionTitle({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2
      className={`text-3xl md:text-4xl lg:text-5xl font-title font-bold uppercase tracking-tight leading-[1.1] ${
        light ? 'text-white' : 'text-institucional-blue'
      }`}
    >
      {children}
    </h2>
  );
}

function TextCta({ to, label, light = false }: { to: string; label: string; light?: boolean }) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-3 font-bold uppercase tracking-[0.2em] text-xs border-b-2 pb-2 hover:gap-4 transition-all ${
        light ? 'text-white border-white' : 'text-institucional-blue border-institucional-blue'
      }`}
    >
      <span>{label}</span>
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </Link>
  );
}

/**
 * Secção a duas colunas em que a fotografia vai até à ponta do ecrã.
 * O texto mantém-se alinhado com a grelha do resto da página.
 */
function SplitSection({
  image,
  alt,
  imageSide,
  children,
}: {
  image: string;
  alt: string;
  imageSide: 'left' | 'right';
  children: React.ReactNode;
}) {
  const imageRight = imageSide === 'right';

  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-2 items-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: imageRight ? -90 : 90 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={`px-6 md:px-12 lg:px-20 py-16 lg:py-28 ${imageRight ? 'lg:order-1' : 'lg:order-2'}`}
      >
        <div className={`max-w-xl space-y-8 ${imageRight ? 'lg:ml-auto' : 'lg:mr-auto'}`}>
          {children}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: imageRight ? 90 : -90 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={`relative w-full overflow-hidden group ${imageRight ? 'lg:order-2' : 'lg:order-1'}`}
      >
        <img
          src={image}
          alt={alt}
          className="w-full h-[420px] md:h-[620px] lg:h-[820px] object-cover transform transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      </motion.div>
    </section>
  );
}

/** Deslocamentos iniciais do bento: as imagens pequenas saem de trás da maior. */
const bentoOrigem: Record<number, { x: string; y: string }> = {
  1: { x: '-110%', y: '0%' },
  2: { x: '-110%', y: '-60%' },
  3: { x: '0%', y: '-110%' },
  4: { x: '0%', y: '-110%' },
  5: { x: '-70%', y: '-110%' },
};

export function Historia() {
  const { language } = useLanguage();
  const data = content[language];

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-0 relative overflow-x-hidden">

      <style>{`
        @keyframes flowLine {
          to { stroke-dashoffset: -24; }
        }
        .anim-line {
          stroke-dasharray: 4 8;
          animation: flowLine 1.5s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-css {
          display: flex;
          width: fit-content;
          animation: marquee 35s linear infinite;
        }
      `}</style>

      <PageHeader
        title={data.heroTitle}
        subtitle={data.heroText}
        backgroundImage="/imagens/fotos/Curtumes_Iberia_29.JPG"
      />

      {/* ========================================================================= */}
      {/* ONDE TUDO COMEÇOU */}
      {/* ========================================================================= */}
      <div className="w-full pt-24 md:pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 px-6"
        >
          <h2 className="text-sm md:text-base font-bold text-gray-400 tracking-[0.4em] uppercase mb-6">
            {data.originEyebrow}
          </h2>
          <p className="text-2xl md:text-3xl font-title text-institucional-blue font-light max-w-[1500px] mx-auto">
            {data.originFounder}
          </p>
        </motion.div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-center overflow-hidden">
          <motion.div
            initial={{ opacity: 0, x: -90 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full overflow-hidden group shadow-sm lg:order-1"
          >
            <img
              src="/imagens/fotos/Curtumes_Iberia_26.JPG"
              alt="Curtumes Ibéria, Vila Moreira"
              className="w-full h-[420px] md:h-[620px] lg:h-[820px] object-cover transform transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 90 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="px-6 md:px-12 lg:px-20 py-16 lg:py-28 lg:order-2"
          >
            <div className="max-w-xl lg:mr-auto space-y-6">
              {data.originText.map((p, i) => (
                <p key={i} className="text-gray-800 text-base md:text-lg font-light leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* IMAGEM GRANDE 1 — POR INTEIRO, SEM MOLDURA */}
      {/* ========================================================================= */}
      <div className="w-full pb-24 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full relative h-[60vh] md:h-[80vh] overflow-hidden"
        >
          <img
            src="/tour/DSCF9296.webp"
            className="w-full h-full object-cover"
            alt="Instalações Curtumes Ibéria"
            loading="lazy"
          />
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* ESTATÍSTICAS: 60+ ANOS · 3 GERAÇÕES · LWG GOLD */}
      {/* ========================================================================= */}
      {/* Mesmo tratamento da faixa de métricas da homepage: sem caixas nem
          divisórias, a ocupar a largura da página. */}
      <section className="py-16 md:py-24 bg-white border-y border-gray-200 relative z-10 w-full mb-24">
        <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-8 lg:gap-x-16">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0 }}
            >
              <AnimatedCounter value={60} suffix="+" text={data.stats.anos} sub={data.stats.anosSub} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <AnimatedCounter value={3} text={data.stats.geracoes} sub={data.stats.geracoesSub} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <AnimatedCounter display="LWG Gold" text={data.stats.lwg} sub={data.stats.lwgSub} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CONHECIMENTO QUE PASSA DE GERAÇÃO EM GERAÇÃO */}
      {/* ========================================================================= */}
      <SplitSection
        image="/tour/DSCF9306.webp"
        alt="Conhecimento que passa de geração em geração"
        imageSide="right"
      >
        <SectionTitle>{data.generationsTitle}</SectionTitle>
        {data.generationsText.map((p, i) => (
          <p key={i} className="text-gray-700 text-lg font-light leading-relaxed">
            {p}
          </p>
        ))}
      </SplitSection>

      {/* ========================================================================= */}
      {/* ALL ABOUT LEATHER */}
      {/* ========================================================================= */}
      <SplitSection image="/tour/DSCF9324.webp" alt="All About Leather" imageSide="left">
        <SectionTitle>{data.leatherTitle}</SectionTitle>
        {data.leatherText.map((p, i) => (
          <p key={i} className="text-gray-700 text-lg font-light leading-relaxed">
            {p}
          </p>
        ))}
        <div className="pt-2">
          <TextCta to="/catalogo" label={data.leatherBtn} />
        </div>
      </SplitSection>

      {/* ========================================================================= */}
      {/* EVOLUIR FAZ PARTE DO PROCESSO — SECÇÃO MUITO VISUAL */}
      {/* ========================================================================= */}
      <div className="max-w-[1500px] mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-14"
        >
          <SectionTitle>{data.evolveTitle}</SectionTitle>
          <div className="space-y-6">
            {data.evolveText.map((p, i) => (
              <p key={i} className="text-gray-700 text-lg font-light leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Mosaico bento: a imagem grande fica por cima e as pequenas saem de trás dela */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {evolveGallery.map((src, i) => {
            const isBig = i === 0;
            const origem = bentoOrigem[i] ?? { x: '0%', y: '0%' };

            return (
              <motion.div
                key={src}
                initial={
                  isBig
                    ? { opacity: 0, scale: 0.96 }
                    : { opacity: 0, x: origem.x, y: origem.y, scale: 0.85 }
                }
                whileInView={
                  isBig
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 1, x: '0%', y: '0%', scale: 1 }
                }
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: isBig ? 0.6 : 0.9,
                  delay: isBig ? 0 : 0.25 + i * 0.09,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`overflow-hidden ${
                  isBig ? 'md:col-span-2 md:row-span-2 relative z-20' : 'relative z-0'
                }`}
              >
                <img
                  src={src}
                  alt="Produção Curtumes Ibéria"
                  className={`w-full object-cover ${isBig ? 'h-64 md:h-[608px]' : 'h-64 md:h-[296px]'}`}
                  loading="lazy"
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DE VILA MOREIRA PARA O MUNDO */}
      {/* ========================================================================= */}
      <SplitSection
        image="/tour/DSCF9560.webp"
        alt="De Vila Moreira para o mundo"
        imageSide="right"
      >
        <SectionTitle>{data.worldTitle}</SectionTitle>
        {data.worldText.map((p, i) => (
          <p key={i} className="text-gray-700 text-lg font-light leading-relaxed">
            {p}
          </p>
        ))}
        <div className="pt-2">
          <a
            href="#presenca-internacional"
            className="inline-flex items-center gap-3 text-institucional-blue border-institucional-blue font-bold uppercase tracking-[0.2em] text-xs border-b-2 pb-2 hover:gap-4 transition-all"
          >
            <span>{data.worldBtn}</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </SplitSection>

      {/* ========================================================================= */}
      {/* PRODUZIR MELHOR TAMBÉM FAZ PARTE DA HISTÓRIA */}
      {/* ========================================================================= */}
      <div className="w-full bg-institucional-blue text-white py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="max-w-[1500px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start"
        >
          <SectionTitle light>{data.betterTitle}</SectionTitle>
          <div className="space-y-6">
            {data.betterText.map((p, i) => (
              <p key={i} className="text-blue-50 text-lg font-light leading-relaxed">
                {p}
              </p>
            ))}
            <div className="pt-4">
              <TextCta to="/sustentabilidade" label={data.betterBtn} light />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* 2026 — NOVA IMAGEM */}
      {/* ========================================================================= */}
      <section className="w-full grid grid-cols-1 lg:grid-cols-2 items-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -90 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="px-6 md:px-12 lg:px-20 py-16 lg:py-28 lg:order-1"
        >
          <div className="max-w-xl lg:ml-auto space-y-8">
            <SectionTitle>{data.rebrandTitle}</SectionTitle>
            {data.rebrandText.map((p, i) => (
              <p key={i} className="text-gray-700 text-lg font-light leading-relaxed">
                {p}
              </p>
            ))}
            <div className="pt-4 space-y-1">
              {data.rebrandClaim.map((line, i) => (
                <p key={i} className="text-institucional-blue font-title font-bold text-xl md:text-2xl uppercase tracking-tight">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </motion.div>

        {/* TODO: substituir pela imagem oficial da nova identidade 2026
            (Google Drive: 1yGEWVunzF8qka3dy18OJnzq9OBG50us1). */}
        <motion.div
          initial={{ opacity: 0, x: 90 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="bg-institucional-blue flex items-center justify-center p-16 md:p-24 w-full h-[420px] md:h-[620px] lg:h-[820px] lg:order-2"
        >
          <img
            src="/logos/VersaoPrincipal_CoresOriginais.svg"
            alt="Nova identidade Curtumes Ibéria"
            className="w-full max-w-md object-contain brightness-0 invert"
            loading="lazy"
          />
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* PRESENÇA GLOBAL -> MAPA */}
      {/* ========================================================================= */}
      {/* O título fica encostado ao topo e o carrossel ao fundo: nenhum deles
          se sobrepõe ao mapa, que ocupa a faixa central da secção. */}
      <div id="presenca-internacional" className="w-full relative bg-institucional-blue overflow-hidden border-t border-blue-900 shadow-inner scroll-mt-24 flex flex-col">
        {/* Brilho atmosférico para dar profundidade e sofisticação */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[360px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-6 relative z-20 text-center pt-8 md:pt-12 pb-3 md:pb-5">
          <p className="text-blue-300 text-xs md:text-sm font-bold uppercase tracking-[0.25em] mb-2 drop-shadow-sm">
            {language === 'PT' ? 'Alcance Internacional' : 'International Reach'}
          </p>
          <h2 className="text-4xl md:text-5xl font-title font-bold text-white uppercase tracking-tight drop-shadow-md">
            {data.salesTitle}
          </h2>
        </div>

        {/* MAPA MUNDI — suavizado nas margens superior e inferior com máscara gradiente e enquadramento equilibrado */}
        <div
          className="w-full max-w-6xl mx-auto opacity-75 pointer-events-none relative z-10 h-[320px] md:h-[460px] lg:h-[540px] overflow-hidden flex items-center justify-center [mask-image:linear-gradient(to_bottom,transparent_0%,black_16%,black_84%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_16%,black_84%,transparent_100%)]"
        >
          {/* Camada extra de suavização no topo e fundo */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-institucional-blue via-institucional-blue/60 to-transparent pointer-events-none z-20" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-institucional-blue via-institucional-blue/60 to-transparent pointer-events-none z-20" />

          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 122, center: [10, 16] }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#F8FAFC"
                    fillOpacity={0.15}
                    stroke="#ffffff"
                    strokeWidth={0.5}
                    strokeDasharray="2 2"
                    style={{ default: { outline: "none" }, hover: { outline: "none" }, pressed: { outline: "none" } }}
                  />
                ))
              }
            </Geographies>

            {destinations.map((dest, i) => (
              <Line
                key={`line-${i}`}
                from={origin}
                to={dest.coordinates}
                stroke="#60A5FA"
                strokeWidth={1.5}
                strokeLinecap="round"
                className="anim-line"
                style={{ filter: "drop-shadow(0 0 4px rgba(96, 165, 250, 0.6))" }}
              />
            ))}

            {destinations.map((dest, i) => (
              <Marker key={`marker-${i}`} coordinates={dest.coordinates}>
                <circle r={2} fill="#93C5FD" opacity={0.9} />
              </Marker>
            ))}

            <Marker coordinates={origin}>
              <circle r={6} fill="#ffffff" opacity={0.3} className="animate-ping" />
              <circle r={3} fill="#ffffff" />
            </Marker>

          </ComposableMap>
        </div>

        <div className="w-full overflow-hidden bg-white/10 backdrop-blur-sm border-t border-white/10 py-5 mt-auto relative z-20 flex">
          <div className="animate-marquee-css flex whitespace-nowrap">
            {[...data.countries, ...data.countries].map((country, index) => (
              <span
                key={index}
                className="mx-8 text-white text-xl md:text-2xl font-bold font-title uppercase tracking-widest drop-shadow-md"
              >
                {country} <span className="text-blue-400 opacity-50 ml-8">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
