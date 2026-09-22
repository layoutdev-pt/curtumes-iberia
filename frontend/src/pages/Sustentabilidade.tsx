import { useLanguage } from "../contexts/LanguageContext";
import { motion } from "framer-motion";
import { PageHeader } from "../components/ui/PageHeader";
import { PillarsAccordion, type PillarItem } from "../components/ui/PillarsAccordion";

const content = {
  PT: {
    heroTitle: "Sustentabilidade",
    heroText:
      "Transformamos um subproduto da indústria alimentar num material durável e de elevado valor, enquanto procuramos reduzir o impacto dos nossos processos e utilizar os recursos de forma cada vez mais eficiente.",

    introTitle: "Sustentabilidade faz parte do processo.",
    introText:
      "A responsabilidade ambiental não é uma iniciativa isolada. Faz parte da forma como produzimos, investimos e evoluímos.",

    pillars: [
      {
        id: 1,
        number: "01",
        title: "Economia Circular",
        description:
          "Damos valor e longevidade a um recurso que já existe: peles provenientes da indústria alimentar que se transformam num material durável e versátil.",
        // TODO: substituir por fotografia da matéria-prima numa fase inicial do processo.
        image: "/tour/DSCF9294.webp",
      },
      {
        id: 2,
        number: "02",
        title: "Produção Mais Responsável",
        description:
          "Produtos químicos selecionados de acordo com os requisitos aplicáveis e processos continuamente otimizados para reduzir consumos e desperdícios.",
        image: "/tour/DSCF9039.webp",
      },
      {
        id: 3,
        number: "03",
        title: "Recursos & Ambiente",
        description:
          "Energia renovável produzida em Vila Moreira e toda a água encaminhada para a ETAR de Alcanena antes de regressar ao meio ambiente.",
        image: "/tour/DSCF9217.webp",
      },
      {
        id: 4,
        number: "04",
        title: "Responsabilidade em Toda a Cadeia",
        description:
          "Do bem-estar animal às condições de trabalho na fábrica: uma produção responsável começa nas pessoas e nos fornecedores que dela fazem parte.",
        image: "/tour/DSCF9261.webp",
      },
    ] as PillarItem[],

    blocks: [
      {
        id: "economia-circular",
        eyebrow: "Economia Circular",
        title: "Uma matéria-prima com uma segunda vida",
        text: "O couro que produzimos tem origem em peles provenientes da indústria alimentar. Ao transformar este subproduto num material durável e versátil, evitamos que uma matéria-prima existente seja simplesmente descartada.\n\nÉ aqui que começa a economia circular na Curtumes Ibéria: dar valor e longevidade a um recurso que já existe.",
        // TODO: fotografia da matéria-prima/peles na fábrica, numa fase inicial do processo.
        image: "/tour/DSCF9294.webp",
        align: "left",
      },
      {
        id: "produtos-quimicos",
        eyebrow: "Produção Mais Responsável",
        title: "Produtos Químicos",
        text: "Selecionamos e utilizamos produtos químicos de acordo com os requisitos aplicáveis e com as listas de substâncias restritas relevantes para o setor, incluindo REACH e CADS.\n\nTrabalhamos continuamente para tornar os nossos processos mais eficientes e responsáveis.",
        image: "/tour/DSCF9039.webp",
        align: "right",
      },
      {
        id: "desperdicio",
        eyebrow: "Produção Mais Responsável",
        title: "Redução de Desperdício",
        text: "Monitorizamos os consumos de água e energia e investimos em equipamentos e processos que permitem otimizar recursos e reduzir desperdícios na produção.\n\nProcuramos também reduzir o consumo de plástico e encontrar soluções mais eficientes no dia a dia da fábrica.",
        image: "/tour/DSCF9217.webp",
        align: "left",
      },
    ],

    lwg: {
      eyebrow: "Um Compromisso Reconhecido",
      title: "LWG Gold Rated",
      text: "A Curtumes Ibéria alcançou a classificação Gold da Leather Working Group (LWG), na sequência da auditoria às suas práticas e desempenho ambiental.\n\nEsta classificação reconhece o trabalho desenvolvido em áreas como gestão ambiental, consumo de recursos e processos de produção.",
      footer: "LWG Gold Rated | Desempenho Ambiental",
      image: "/tour/DSCF9337.webp",
      badge: "/logos/CUR224.png",
    },

    blocks2: [
      {
        id: "energia",
        eyebrow: "Recursos & Ambiente",
        title: "Energias Renováveis",
        text: "A Curtumes Ibéria investe na produção de energia renovável através de painéis solares instalados em Vila Moreira.\n\nA produção de energia solar permite reduzir o consumo de energia proveniente da rede e contribuir para uma produção mais eficiente e responsável.",
        // TODO: substituir pela fotografia dos painéis solares em Vila Moreira
        // (Google Drive: 1UHuC5rukP7T9p5SySnjfHLcaAFlkK2dI). A imagem anterior
        // era uma foto de stock de turbinas eólicas — não corresponde à empresa.
        image: "/tour/DSCF9740.webp",
        align: "right",
      },
      {
        id: "agua",
        eyebrow: "Recursos & Ambiente",
        title: "Gestão e Tratamento da Água",
        text: "Toda a água utilizada nos nossos processos é encaminhada para a Estação de Tratamento de Águas Residuais de Alcanena, reconhecida como uma referência no tratamento de águas residuais da indústria de curtumes.\n\nApós o tratamento, a água é devolvida ao meio ambiente, contribuindo para a proteção da Ribeira do Carvalho e do ecossistema envolvente.\n\nA Curtumes Ibéria trabalha em articulação com a ETAR de Alcanena, num processo essencial para uma produção mais responsável.",
        image: "/tour/DSCF9071.webp",
        align: "left",
      },
      {
        id: "bem-estar-animal",
        eyebrow: "Responsabilidade em Toda a Cadeia",
        title: "Bem-estar Animal",
        text: "A Curtumes Ibéria utiliza exclusivamente peles provenientes da indústria alimentar, integrando uma cadeia de economia circular que dá uma nova utilização a este subproduto.\n\nEm colaboração com os nossos fornecedores, asseguramos o cumprimento dos padrões internacionais da OIE relativos ao bem-estar animal e dos requisitos da CITES, excluindo espécies ameaçadas ou protegidas.",
        image: "/tour/DSCF9242.webp",
        align: "right",
      },
      {
        id: "pessoas",
        eyebrow: "Responsabilidade em Toda a Cadeia",
        title: "As Nossas Pessoas",
        text: "Uma produção responsável começa pelas pessoas que fazem parte dela.\n\nInvestimos na segurança, nas condições de trabalho e na melhoria contínua dos processos, promovendo um ambiente de trabalho seguro e responsável.",
        // TODO: substituir por fotografia real da equipa dentro da fábrica (não posada).
        image: "/tour/DSCF9365.webp",
        align: "left",
      },
    ],

    closingTitle: "Fazer melhor é um processo contínuo.",
    closingText:
      "Continuamos a investir, testar e melhorar a forma como produzimos, com o objetivo de reduzir o impacto da nossa atividade e contribuir para uma indústria do couro cada vez mais responsável.",
  },

  EN: {
    heroTitle: "Sustainability",
    heroText:
      "We transform a by-product of the food industry into a durable, high-value material, while working to reduce the impact of our processes and use resources ever more efficiently.",

    introTitle: "Sustainability is part of the process.",
    introText:
      "Environmental responsibility is not an isolated initiative. It is part of the way we produce, invest and evolve.",

    pillars: [
      {
        id: 1,
        number: "01",
        title: "Circular Economy",
        description:
          "We give value and longevity to a resource that already exists: hides from the food industry turned into a durable, versatile material.",
        image: "/tour/DSCF9294.webp",
      },
      {
        id: 2,
        number: "02",
        title: "More Responsible Production",
        description:
          "Chemicals selected in line with applicable requirements, and processes continuously optimised to reduce consumption and waste.",
        image: "/tour/DSCF9039.webp",
      },
      {
        id: 3,
        number: "03",
        title: "Resources & Environment",
        description:
          "Renewable energy produced in Vila Moreira and all water routed to the Alcanena treatment plant before returning to the environment.",
        image: "/tour/DSCF9217.webp",
      },
      {
        id: 4,
        number: "04",
        title: "Responsibility Across the Chain",
        description:
          "From animal welfare to working conditions in the factory: responsible production starts with the people and suppliers who are part of it.",
        image: "/tour/DSCF9261.webp",
      },
    ] as PillarItem[],

    blocks: [
      {
        id: "economia-circular",
        eyebrow: "Circular Economy",
        title: "A raw material with a second life",
        text: "The leather we produce comes from hides sourced from the food industry. By transforming this by-product into a durable and versatile material, we prevent an existing raw material from simply being discarded.\n\nThis is where the circular economy begins at Curtumes Ibéria: giving value and longevity to a resource that already exists.",
        image: "/tour/DSCF9294.webp",
        align: "left",
      },
      {
        id: "produtos-quimicos",
        eyebrow: "More Responsible Production",
        title: "Chemicals",
        text: "We select and use chemicals in accordance with applicable requirements and with the restricted substances lists relevant to the sector, including REACH and CADS.\n\nWe work continuously to make our processes more efficient and responsible.",
        image: "/tour/DSCF9039.webp",
        align: "right",
      },
      {
        id: "desperdicio",
        eyebrow: "More Responsible Production",
        title: "Waste Reduction",
        text: "We monitor water and energy consumption and invest in equipment and processes that optimise resources and reduce waste in production.\n\nWe also work to reduce plastic consumption and to find more efficient solutions in the factory's day-to-day operations.",
        image: "/tour/DSCF9217.webp",
        align: "left",
      },
    ],

    lwg: {
      eyebrow: "A Recognised Commitment",
      title: "LWG Gold Rated",
      text: "Curtumes Ibéria achieved the Gold rating from the Leather Working Group (LWG), following an audit of its practices and environmental performance.\n\nThis rating recognises the work developed in areas such as environmental management, resource consumption and production processes.",
      footer: "LWG Gold Rated | Environmental Performance",
      image: "/tour/DSCF9337.webp",
      badge: "/logos/CUR224.png",
    },

    blocks2: [
      {
        id: "energia",
        eyebrow: "Resources & Environment",
        title: "Renewable Energy",
        text: "Curtumes Ibéria invests in renewable energy production through solar panels installed in Vila Moreira.\n\nSolar energy production reduces the consumption of grid electricity and contributes to a more efficient and responsible production.",
        image: "/tour/DSCF9740.webp",
        align: "right",
      },
      {
        id: "agua",
        eyebrow: "Resources & Environment",
        title: "Water Management and Treatment",
        text: "All the water used in our processes is routed to the Alcanena Wastewater Treatment Plant, recognised as a benchmark in the treatment of wastewater from the tanning industry.\n\nAfter treatment, the water is returned to the environment, contributing to the protection of the Ribeira do Carvalho and the surrounding ecosystem.\n\nCurtumes Ibéria works together with the Alcanena treatment plant, in a process that is essential to a more responsible production.",
        image: "/tour/DSCF9071.webp",
        align: "left",
      },
      {
        id: "bem-estar-animal",
        eyebrow: "Responsibility Across the Chain",
        title: "Animal Welfare",
        text: "Curtumes Ibéria uses exclusively hides sourced from the food industry, forming part of a circular economy chain that gives this by-product a new use.\n\nIn collaboration with our suppliers, we ensure compliance with the international OIE standards on animal welfare and with CITES requirements, excluding endangered or protected species.",
        image: "/tour/DSCF9242.webp",
        align: "right",
      },
      {
        id: "pessoas",
        eyebrow: "Responsibility Across the Chain",
        title: "Our People",
        text: "Responsible production starts with the people who are part of it.\n\nWe invest in safety, in working conditions and in the continuous improvement of our processes, promoting a safe and responsible working environment.",
        image: "/tour/DSCF9365.webp",
        align: "left",
      },
    ],

    closingTitle: "Doing better is a continuous process.",
    closingText:
      "We continue to invest, test and improve the way we produce, with the goal of reducing the impact of our activity and contributing to an increasingly responsible leather industry.",
  },
};

type Bloco = {
  id: string;
  eyebrow: string;
  title: string;
  text: string;
  image: string;
  align: string;
};

/** Bloco full-width com fotografia por inteiro — o formato escolhido para toda a página. */
function ContentBlock({ block, index }: { block: Bloco; index: number }) {
  const isLeft = block.align === "left";

  return (
    <div
      // Afastado do topo para os cards não colarem à navbar enquanto empilham.
      // Em ecrãs baixos o recuo encolhe, para o card não sair fora do viewport.
      className="sticky w-full"
      style={{
        top: `calc(max(96px, min(160px, 18vh)) + ${index * 18}px)`,
        zIndex: index + 1,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full h-[75vh] min-h-[540px] max-h-[760px] overflow-hidden group flex items-stretch bg-institucional-blue"
      >
        {/* Fotografia de fundo, por inteiro e sem moldura */}
        <div className="absolute inset-0 z-0">
          <img
            src={block.image}
            alt={block.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
            loading="lazy"
          />
        </div>



        <div
          className={`relative z-10 w-full h-full flex ${isLeft ? "justify-start" : "justify-end"}`}
        >
          <div className="w-full md:w-7/12 lg:w-6/12 h-full">
            <div className="bg-institucional-blue/30 backdrop-blur-md ring-1 ring-inset ring-white/20 p-6 sm:p-8 lg:p-12 h-full flex flex-col justify-center">
              <span className="text-[11px] font-bold tracking-[0.3em] text-blue-200 uppercase mb-4">
                {block.eyebrow}
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-title font-bold text-white uppercase tracking-tight mb-6 drop-shadow-md leading-tight flex-shrink-0">
                {block.title}
              </h2>

              <div className="text-blue-50 text-sm sm:text-base font-light leading-relaxed space-y-3.5 drop-shadow-sm">
                {block.text.split("\n\n").map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function Sustentabilidade() {
  const { language } = useLanguage();
  const data = content[language];

  return (
    <div className="bg-[#F8FAFC] min-h-screen relative">
      {/* Hero igual ao de Sobre Nós */}
      {/* TODO: substituir pela imagem de capa indicada pelo cliente
          (Google Drive: 1oTZKDKX_VSELWdkR3TAMCjZG7IiuWoA0). */}
      <PageHeader
        title={data.heroTitle}
        subtitle={data.heroText}
        backgroundImage="/tour/DSCF9337.webp"
      />

      {/* ===================================================================== */}
      {/* PILARES — ACORDEÃO LOGO A SEGUIR AO HERO */}
      {/* ===================================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pt-16 md:pt-20"
      >
        <PillarsAccordion items={data.pillars} />
      </motion.div>

      {/* ===================================================================== */}
      {/* INTRODUÇÃO */}
      {/* ===================================================================== */}
      <div className="max-w-4xl mx-auto px-6 py-20 md:py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-title font-bold text-institucional-blue uppercase tracking-tight mb-8 leading-[1.1]">
            {data.introTitle}
          </h2>
          <p className="text-gray-700 text-lg md:text-xl font-light leading-relaxed">
            {data.introText}
          </p>
        </motion.div>
      </div>

      {/* ===================================================================== */}
      {/* BLOCOS: ECONOMIA CIRCULAR + PRODUÇÃO MAIS RESPONSÁVEL */}
      {/* ===================================================================== */}
      <div className="w-full relative">
        <div className="flex flex-col">
          {data.blocks.map((block, index) => (
            <ContentBlock key={block.id} block={block} index={index} />
          ))}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* LWG — GRANDE BLOCO CENTRAL */}
      {/* ===================================================================== */}
      <div className="w-full relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full min-h-[70vh] overflow-hidden bg-institucional-blue flex items-center justify-center"
        >
          <img
            src={data.lwg.image}
            alt="Produção Curtumes Ibéria"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-institucional-blue/60"></div>

          <div className="relative z-10 max-w-4xl mx-auto text-center px-6 py-20 md:py-28 flex flex-col items-center">
            <img
              src={data.lwg.badge}
              alt="LWG Gold Rated"
              className="w-32 h-32 md:w-44 md:h-44 object-contain mb-10 drop-shadow-2xl"
              loading="lazy"
            />

            <span className="text-[11px] font-bold tracking-[0.35em] text-blue-200 uppercase mb-5">
              {data.lwg.eyebrow}
            </span>

            <h2 className="text-4xl md:text-6xl font-title font-bold text-white uppercase tracking-tight mb-8 leading-[1.05]">
              {data.lwg.title}
            </h2>

            <div className="text-blue-50 text-base md:text-lg font-light leading-relaxed space-y-4 max-w-3xl">
              {data.lwg.text.split("\n\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-white/25 w-full max-w-2xl">
              <span className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-white">
                {data.lwg.footer}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ===================================================================== */}
      {/* BLOCOS: RECURSOS & AMBIENTE + RESPONSABILIDADE EM TODA A CADEIA */}
      {/* ===================================================================== */}
      <div className="w-full relative">
        <div className="flex flex-col">
          {data.blocks2.map((block, index) => (
            <ContentBlock key={block.id} block={block} index={index} />
          ))}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* FECHO */}
      {/* ===================================================================== */}
      <div className="w-full bg-institucional-blue text-white py-24 md:py-32 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-6 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-title font-bold text-white uppercase tracking-tight mb-8 leading-[1.1]">
            {data.closingTitle}
          </h2>
          <p className="text-blue-50 text-lg md:text-xl font-light leading-relaxed">
            {data.closingText}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
