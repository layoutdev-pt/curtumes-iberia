/**
 * Lista única de categorias do catálogo.
 *
 * O `id` é o valor gravado na coluna `categoria` da tabela `artigos`.
 * Os rótulos existem em PT e EN para que nenhuma categoria apareça em português
 * quando o site está em inglês (e vice-versa).
 */
export interface Categoria {
  id: string;
  labelPT: string;
  labelEN: string;
}

export const CATEGORIAS: Categoria[] = [
  { id: 'Hidrofugados', labelPT: 'Hidrofugados', labelEN: 'Waterproof' },
  { id: 'Camurças', labelPT: 'Camurças', labelEN: 'Suedes' },
  { id: 'Napas', labelPT: 'Napas', labelEN: 'Nappas' },
  { id: 'Anilinas', labelPT: 'Anilinas', labelEN: 'Anilines' },
  { id: 'Fantasias', labelPT: 'Fantasias', labelEN: 'Fantasy' },
  { id: 'Nubucks', labelPT: 'Nubucks', labelEN: 'Nubucks' },
  { id: 'Floaters', labelPT: 'Floaters', labelEN: 'Floaters' },
  { id: 'Ceras e Óleos', labelPT: 'Ceras e Óleos', labelEN: 'Waxes and Oils' },
];

/** Filtro do catálogo: as categorias mais a opção "todas". */
export const CATEGORIAS_FILTRO: Categoria[] = [
  { id: 'all', labelPT: 'Todas as Categorias', labelEN: 'All Categories' },
  ...CATEGORIAS,
];

/**
 * Devolve o rótulo da categoria no idioma pedido.
 * Se o valor gravado não constar da lista (artigo antigo), devolve-o tal como está.
 */
export function labelCategoria(id: string, language: 'PT' | 'EN'): string {
  const cat = CATEGORIAS_FILTRO.find((c) => c.id === id);
  if (!cat) return id;
  return language === 'PT' ? cat.labelPT : cat.labelEN;
}
