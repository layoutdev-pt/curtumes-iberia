// Kanban.tsx
import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { supabase } from '../../lib/supabase';

type EstadoPedido = 'Pendente' | 'Em Processamento' | 'Expedido' | 'Entregue';

interface Pedido {
  id: string; 
  created_at: string;
  nome_cliente: string;
  empresa_nif: string;
  email_cliente: string;
  telefone_cliente?: string;
  referencia_produto: string;
  quantidade_m2: number;
  status: string; 
  notas: string | null;
}

const transicaoSeguinte: Record<EstadoPedido, EstadoPedido | null> = {
  'Pendente': 'Em Processamento',
  'Em Processamento': 'Expedido',
  'Expedido': 'Entregue',
  'Entregue': null, 
};

const colunasKanban: EstadoPedido[] = ['Pendente', 'Em Processamento', 'Expedido', 'Entregue'];

const content = {
  PT: {
    title: "Gestão de Encomendas",
    subtitle: "Acompanhe e gira o processamento dos pedidos do catálogo B2B.",
    loading: "A sincronizar encomendas...",
    searchPlaceholder: "Pesquisar (Nome, Email, NIF, Tel)...", 
    article: "Referência:",
    qty: "Qtd:",
    moveTo: "Mover para",
    completed: "Encomenda Finalizada",
    empty: "Sem encomendas",
    states: {
      'Pendente': 'Pendente',
      'Em Processamento': 'Em Processamento',
      'Expedido': 'Expedido',
      'Entregue': 'Entregue'
    }
  },
  EN: {
    title: "Order Management",
    subtitle: "Track and manage processing of B2B catalog orders.",
    loading: "Syncing orders...",
    searchPlaceholder: "Search (Name, Email, VAT, Phone)...", 
    article: "Reference:",
    qty: "Qty:",
    moveTo: "Move to",
    completed: "Order Completed",
    empty: "No orders",
    states: {
      'Pendente': 'Pending',
      'Em Processamento': 'Processing',
      'Expedido': 'Shipped',
      'Entregue': 'Delivered'
    }
  }
};

const normalizeStatus = (dbStatus: string): EstadoPedido => {
  const s = dbStatus.toLowerCase();
  if (s === 'em processamento') return 'Em Processamento';
  if (s === 'expedido') return 'Expedido';
  if (s === 'entregue') return 'Entregue';
  return 'Pendente'; 
};

export function Kanban() {
  const { language } = useLanguage();
  const data = content[language];

  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(''); 

  const fetchEncomendas = async () => {
    try {
      const { data: dbOrders, error } = await supabase
        .from('encomendas')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      if (dbOrders) {
        setPedidos(dbOrders);
      }
    } catch (error) {
      console.error("Erro ao carregar encomendas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEncomendas();
  }, []);

  const avancarEstado = async (id: string, estadoAtual: string) => {
    const estadoNormalizado = normalizeStatus(estadoAtual);
    const proximoEstado = transicaoSeguinte[estadoNormalizado];
    if (!proximoEstado) return;

    setPedidos(pedidosAtuais => 
      pedidosAtuais.map(pedido => pedido.id === id ? { ...pedido, status: proximoEstado } : pedido)
    );

    try {
      const { error } = await supabase
        .from('encomendas')
        .update({ status: proximoEstado })
        .eq('id', id);

      if (error) {
        throw error;
      }
    } catch (err) {
      console.error("Erro ao atualizar estado:", err);
      alert("Houve um erro ao sincronizar o estado com o servidor. A recarregar página...");
      fetchEncomendas(); 
    }
  };

  return (
    <div className="flex flex-col h-full">
      
      <div className="mb-10 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-title font-bold text-institucional-blue">{data.title}</h1>
          <p className="text-gray-500 mt-2">{data.subtitle}</p>
        </div>
        
        <div className="w-full md:w-96 relative">
          <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder={data.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-institucional-blue shadow-sm font-title"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center flex-grow">
           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-institucional-blue mr-4"></div>
           <span className="text-gray-500 font-bold font-title">{data.loading}</span>
        </div>
      ) : (
        <div className="flex flex-grow gap-6 overflow-x-auto pb-4 custom-scrollbar">
          {colunasKanban.map((coluna) => {
            
            const termo = searchQuery.toLowerCase();
            const encomendasDaColuna = pedidos.filter(p => {
              const matchesStatus = normalizeStatus(p.status) === coluna;
              
              const matchesSearch = termo === '' || 
                (p.nome_cliente?.toLowerCase().includes(termo)) ||
                (p.email_cliente?.toLowerCase().includes(termo)) ||
                (p.empresa_nif?.toLowerCase().includes(termo)) ||
                (p.telefone_cliente?.toLowerCase().includes(termo)); 

              return matchesStatus && matchesSearch;
            });

            return (
              <div key={coluna} className="flex flex-col min-w-[340px] w-[340px] bg-gray-200/40 rounded-2xl p-5 border border-gray-100 h-[calc(100vh-220px)]">
                
                <div className="flex justify-between items-center mb-6 flex-shrink-0">
                  <h2 className="font-title font-bold text-gray-800 text-lg">{data.states[coluna]}</h2>
                  <span className="bg-white text-institucional-blue text-xs font-bold font-title px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
                    {encomendasDaColuna.length}
                  </span>
                </div>

                <div className="flex flex-col space-y-4 overflow-y-auto pr-2 flex-grow custom-scrollbar">
                  {encomendasDaColuna.length === 0 ? (
                    <div className="text-center text-sm text-gray-400 font-title font-bold py-10 border-2 border-dashed border-gray-300 rounded-xl">
                      {data.empty}
                    </div>
                  ) : (
                    encomendasDaColuna.map(pedido => (
                      <div key={pedido.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group flex flex-col relative overflow-hidden flex-shrink-0">
                        
                        <div className={`absolute top-0 left-0 w-full h-1 ${
                          coluna === 'Pendente' ? 'bg-orange-400' :
                          coluna === 'Em Processamento' ? 'bg-blue-400' :
                          coluna === 'Expedido' ? 'bg-purple-400' : 'bg-green-400'
                        }`}></div>

                        <div className="flex justify-between items-start mb-4">
                          <span className="text-[10px] font-mono font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded border border-gray-200 truncate max-w-[120px]" title={pedido.id}>
                            {pedido.id.split('-')[0]}...
                          </span>
                          <span className="text-[10px] uppercase font-bold font-title text-gray-400 tracking-wider">
                            {new Date(pedido.created_at).toLocaleDateString(language === 'PT' ? 'pt-PT' : 'en-US')}
                          </span>
                        </div>
                        
                        <h3 className="font-title font-bold text-gray-900 text-lg leading-tight mb-1 truncate" title={pedido.empresa_nif}>
                          {pedido.empresa_nif}
                        </h3>
                        <p className="text-xs text-gray-500 mb-5 font-medium">
                          {pedido.nome_cliente} | {pedido.email_cliente}
                        </p>
                        
                        <div className="bg-gray-50 p-3 rounded-lg text-sm mb-4 border border-gray-100">
                          <p className="text-gray-700 mb-1 truncate font-medium" title={pedido.referencia_produto}>
                            <span className="font-bold font-title tracking-wider text-institucional-blue">{data.article}</span> {pedido.referencia_produto}
                          </p>
                          <p className="text-gray-700 font-medium">
                            <span className="font-bold font-title tracking-wider text-institucional-blue">{data.qty}</span> {pedido.quantidade_m2} m²
                          </p>
                        </div>

                        {pedido.notas && (
                          <div className="mb-6 p-3 bg-yellow-50/50 border border-yellow-100 rounded-lg text-[11px] text-gray-600 font-medium overflow-hidden">
                            <span className="font-bold text-yellow-800 uppercase block mb-1 font-title tracking-wider">Notas / Especificações:</span>
                            <div className="whitespace-pre-wrap">{pedido.notas}</div>
                          </div>
                        )}

                        <div className="mt-auto pt-2 border-t border-gray-50">
                          {transicaoSeguinte[coluna] ? (
                            <button
                              onClick={() => avancarEstado(pedido.id, pedido.status)}
                              className="w-full bg-white border-2 border-institucional-blue text-institucional-blue text-sm py-2.5 rounded-lg hover:bg-institucional-blue hover:text-white transition-colors font-title font-bold tracking-wider"
                            >
                              {data.moveTo} {data.states[transicaoSeguinte[coluna]!]}
                            </button>
                          ) : (
                            <div className="w-full bg-green-50 text-green-700 text-sm py-2.5 rounded-lg text-center border border-green-200 font-title font-bold tracking-wider flex items-center justify-center">
                              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                              {data.completed}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}