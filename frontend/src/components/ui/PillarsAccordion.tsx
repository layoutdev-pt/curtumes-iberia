import { useState } from 'react';

export interface PillarItem {
  id: number;
  number: string;
  title: string;
  description: string;
  image: string;
  darkTheme?: boolean;
  wrapText?: boolean;
}

/**
 * Acordeão horizontal de painéis: o painel ativo abre com o texto completo e
 * troca a fotografia de fundo. Sem cantos arredondados, conforme a direção de arte.
 */
export function PillarsAccordion({ items }: { items: PillarItem[] }) {
  const [activeId, setActiveId] = useState<number | null>(items[0]?.id ?? null);
  const [bgImageId, setBgImageId] = useState<number>(items[0]?.id ?? 0);

  const handlePanelClick = (id: number) => {
    if (activeId === id) {
      setActiveId(null);
    } else {
      setActiveId(id);
      setBgImageId(id);
    }
  };

  return (
    <section className="w-full bg-[#F8FAFC] py-4 px-4 md:py-6 md:px-12 lg:py-[30px] lg:px-[90px]">
      <div className="relative w-full h-[900px] md:h-[620px] lg:h-[720px] overflow-hidden bg-institucional-blue">
        {/* Camada de imagem de fundo (global) */}
        {items.map((item) => (
          <div
            key={`bg-${item.id}`}
            className={`absolute inset-0 z-0 transition-opacity duration-700 ease-in-out ${
              bgImageId === item.id ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover opacity-60 md:opacity-90"
              loading="lazy"
            />
            {/* Escurecimento para leitura */}
            <div className="absolute inset-0 bg-institucional-blue/60 md:bg-institucional-blue/40"></div>
          </div>
        ))}

        {/* Camada de painéis */}
        <div className="absolute inset-0 z-10 flex flex-col md:flex-row w-full h-full">
          {items.map((item, index) => {
            const isActive = activeId === item.id;
            const isLast = index === items.length - 1;

            return (
              <div
                key={item.id}
                onClick={() => handlePanelClick(item.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handlePanelClick(item.id);
                  }
                }}
                className={`
                  group cursor-pointer transition-colors duration-500 ease-in-out overflow-hidden relative flex-1
                  ${!isLast ? 'border-b md:border-b-0 md:border-r border-white/20' : ''}
                  ${isActive ? (item.darkTheme ? 'bg-black/70' : 'bg-white') : 'bg-transparent hover:bg-black/20'}
                `}
              >
                {/* Conteúdo do painel ativo */}
                <div
                  className={`absolute inset-0 flex flex-col px-6 pb-8 md:px-8 md:pb-10 lg:px-10 lg:pb-12 justify-end transition-opacity duration-500 delay-150 ${
                    isActive ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
                  }`}
                >
                  <span className="font-title text-5xl md:text-6xl leading-none font-bold text-institucional-blue/20 mb-4">
                    {item.number}
                  </span>
                  <h3 className={`font-title text-2xl md:text-3xl font-bold uppercase tracking-tight mb-4 ${item.darkTheme ? 'text-white' : 'text-institucional-blue'} ${item.wrapText ? 'break-words hyphens-auto' : ''}`}>
                    {item.title}
                  </h3>
                  <p className={`text-sm md:text-base lg:text-lg font-light leading-relaxed ${item.darkTheme ? 'text-blue-50' : 'text-gray-600'}`}>
                    {item.description}
                  </p>
                </div>

                {/* Conteúdo do painel inativo */}
                <div
                  className={`absolute inset-0 flex flex-col px-6 pb-8 md:px-8 md:pb-10 lg:px-10 lg:pb-12 justify-end items-start transition-opacity duration-300 ${
                    !isActive ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
                  }`}
                >
                  <span className="font-title text-7xl md:text-8xl lg:text-[120px] leading-none font-bold text-white/70 mb-2 md:mb-4">
                    {item.number}
                  </span>
                  <h3 className={`font-title text-xl md:text-2xl font-bold uppercase tracking-tight text-white ${item.wrapText ? 'break-words hyphens-auto' : ''}`}>
                    {item.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
