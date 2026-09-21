-- =============================================================================
-- CURTUMES IBÉRIA — alterações à base de dados
-- =============================================================================
-- Reúne todas as alterações de dados pedidas no PDF e nas revisões seguintes.
--
-- COMO APLICAR
--   1. Abra o painel do Supabase do projeto.
--   2. Menu lateral > SQL Editor > New query.
--   3. Cole este ficheiro inteiro e carregue em "Run".
--   4. Confirme o resultado com as consultas de verificação no fim.
--
-- O script é idempotente: pode ser executado mais do que uma vez sem estragar
-- nada. Corre dentro de uma transação — se alguma instrução falhar, nada é
-- gravado.
--
-- NOTA sobre os tipos das colunas: este script assume que `tags`, `cores` e
-- `categorias` são `jsonb` (o predefinido no Supabase). Se o Postgres se queixar
-- de "column is of type json", acrescente `::json` no fim de cada subconsulta
-- assinalada com [CAST].
-- =============================================================================

begin;

-- -----------------------------------------------------------------------------
-- 1. Coluna `destaque`
-- -----------------------------------------------------------------------------
-- Marca os artigos que aparecem na secção "Artigos em Destaque" da homepage.
-- Sem esta coluna a homepage mostra apenas os 3 artigos mais recentes e a
-- consola do browser regista um aviso em cada carregamento.

alter table public.artigos
  add column if not exists destaque boolean not null default false;

create index if not exists artigos_destaque_idx
  on public.artigos (destaque, created_at desc)
  where destaque;


-- -----------------------------------------------------------------------------
-- 2. Retirar as etiquetas "Just In Time" e "Biodegradáveis"
-- -----------------------------------------------------------------------------
-- Pedido no PDF: ">> Retirar dos Artigos: Just In Time / Biodegradáveis".

update public.artigos
set tags = (                                                        -- [CAST]
  select coalesce(jsonb_agg(t), '[]'::jsonb)
  from jsonb_array_elements(tags::jsonb) as t
  where lower(coalesce(t->>'pt', '')) not in
          ('just in time', 'biodegradáveis', 'biodegradaveis', 'biodegradável', 'biodegradavel')
    and lower(coalesce(t->>'en', '')) not in
          ('just in time', 'biodegradable', 'biodegradables')
)
where tags is not null
  and jsonb_typeof(tags::jsonb) = 'array'
  and exists (
    select 1
    from jsonb_array_elements(tags::jsonb) as t
    where lower(coalesce(t->>'pt', '')) in
            ('just in time', 'biodegradáveis', 'biodegradaveis', 'biodegradável', 'biodegradavel')
       or lower(coalesce(t->>'en', '')) in
            ('just in time', 'biodegradable', 'biodegradables')
  );


-- -----------------------------------------------------------------------------
-- 3. Categoria "Fantasia" no plural
-- -----------------------------------------------------------------------------
-- Pedido no PDF: "Fantasias está no singular, tem que estar no plural como
-- todas as outras". O site já filtra por "Fantasias"; sem esta correção os
-- artigos antigos deixam de aparecer nesse filtro.

update public.artigos
set categoria = 'Fantasias'
where categoria = 'Fantasia';


-- -----------------------------------------------------------------------------
-- 4. Uniformizar "Artigos Hidrofugados" para "Hidrofugados"
-- -----------------------------------------------------------------------------
-- A lista de categorias múltiplas do formulário gravava "Artigos Hidrofugados",
-- mas a categoria principal e os filtros do site usam "Hidrofugados".

update public.artigos
set categorias = (                                                  -- [CAST]
  select coalesce(jsonb_agg(
    case when c #>> '{}' = 'Artigos Hidrofugados'
         then to_jsonb('Hidrofugados'::text)
         else c end
  ), '[]'::jsonb)
  from jsonb_array_elements(categorias::jsonb) as c
)
where categorias is not null
  and jsonb_typeof(categorias::jsonb) = 'array'
  and categorias::jsonb @> '["Artigos Hidrofugados"]'::jsonb;


-- -----------------------------------------------------------------------------
-- 5. Acrescentar `referencia` às cores já gravadas
-- -----------------------------------------------------------------------------
-- Pedido no PDF: "Cores é que têm referência, e tem que ter uma imagem porque
-- não é uma cor standard". As cores novas já são gravadas com referência; esta
-- instrução acrescenta o campo vazio às antigas, para a estrutura ficar igual.
--
-- ATENÇÃO: o SQL só cria o campo. As referências e as fotografias de cada cor
-- têm de ser preenchidas por si na dashboard (ver nota no fim do ficheiro).

update public.artigos
set cores = (                                                       -- [CAST]
  select coalesce(jsonb_agg(
    case when c ? 'referencia' then c
         else c || '{"referencia": ""}'::jsonb end
  ), '[]'::jsonb)
  from jsonb_array_elements(cores::jsonb) as c
)
where cores is not null
  and jsonb_typeof(cores::jsonb) = 'array'
  and exists (
    select 1 from jsonb_array_elements(cores::jsonb) as c
    where not (c ? 'referencia')
  );

commit;


-- =============================================================================
-- VERIFICAÇÃO — corra estas consultas depois do commit
-- =============================================================================

-- 5.1 A coluna `destaque` existe? (deve devolver 1 linha)
select column_name, data_type, column_default
from information_schema.columns
where table_schema = 'public' and table_name = 'artigos' and column_name = 'destaque';

-- 5.2 Sobrou alguma etiqueta proibida? (deve devolver 0 linhas)
select id, referencia, tags
from public.artigos
where tags::jsonb::text ilike '%just in time%'
   or tags::jsonb::text ilike '%biodegrad%';

-- 5.3 Sobrou alguma categoria no singular? (deve devolver 0 linhas)
select id, referencia, categoria
from public.artigos
where categoria = 'Fantasia'
   or categorias::jsonb @> '["Artigos Hidrofugados"]'::jsonb;

-- 5.4 Panorama dos artigos: quais estão em destaque e quantas cores têm
--     fotografia associada.
select
  referencia,
  categoria,
  destaque,
  jsonb_array_length(cores::jsonb)                                   as total_cores,
  (select count(*) from jsonb_array_elements(cores::jsonb) c
    where coalesce(c->>'img_url', '') <> '')                         as cores_com_foto,
  (select count(*) from jsonb_array_elements(cores::jsonb) c
    where coalesce(c->>'referencia', '') <> '')                      as cores_com_referencia
from public.artigos
order by created_at desc;


-- =============================================================================
-- O QUE ESTE SCRIPT **NÃO** FAZ
-- =============================================================================
-- a) Fotografias das cores. As cores gravadas antes desta revisão têm
--    `img_url` vazio e continuam a mostrar apenas o quadrado de cor no site.
--    Só é possível corrigir carregando a fotografia de cada cor na dashboard
--    (Dashboard > Adicionar Artigo > separador "2. Variantes de Cor").
--
-- b) Arrumar em pastas as fotografias já carregadas no Storage. Os uploads
--    novos vão para catalogo-imagens/public/<artigo>/<cor>/, mas os ficheiros
--    antigos continuam em catalogo-imagens/public/. Mover ficheiros no Storage
--    não se faz por SQL.
--
-- c) Escolher os destaques. Depois de correr este script, marque-os na
--    Dashboard > Inventário de Catálogo, na coluna "Destaque" (estrela).
--    A homepage mostra os 3 destaques mais recentes.
