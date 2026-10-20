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
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [savingOrder, setSavingOrder] = useState(false);
  const [newOrder, setNewOrder] = useState({
    nome_cliente: '', empresa_nif: '', email_cliente: '', telefone_cliente: '',
    referencia_produto: '', quantidade_m2: '', notas: ''
  });

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

  const eliminarEncomenda = async (pedido: Pedido) => {
    const confirmado = window.confirm(`Eliminar permanentemente a encomenda de ${pedido.empresa_nif || pedido.nome_cliente}? Esta ação não pode ser anulada.`);
    if (!confirmado) return;

    const { error } = await supabase.from('encomendas').delete().eq('id', pedido.id);
    if (error) {
      console.error('Erro ao eliminar encomenda:', error);
      window.alert('Não foi possível eliminar a encomenda. Verifique as permissões e tente novamente.');
      return;
    }
    setPedidos(current => current.filter(item => item.id !== pedido.id));
  };

  const criarEncomenda = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSavingOrder(true);
    const payload = {
      nome_cliente: newOrder.nome_cliente.trim(),
      empresa_nif: newOrder.empresa_nif.trim(),
      email_cliente: newOrder.email_cliente.trim(),
      telefone_cliente: newOrder.telefone_cliente.trim() || null,
      referencia_produto: newOrder.referencia_produto.trim(),
      quantidade_m2: newOrder.quantidade_m2 ? Number(newOrder.quantidade_m2) : null,
      notas: newOrder.notas.trim() || null,
      status: 'pendente'
    };

    const { data: inserted, error } = await supabase.from('encomendas').insert([payload]).select().single();
    setSavingOrder(false);
    if (error) {
      console.error('Erro ao criar encomenda:', error);
      window.alert('Não foi possível criar a encomenda. Verifique os dados e tente novamente.');
      return;
    }
    setPedidos(current => [inserted as Pedido, ...current]);
    setNewOrder({ nome_cliente: '', empresa_nif: '', email_cliente: '', telefone_cliente: '', referencia_produto: '', quantidade_m2: '', notas: '' });
    setShowCreateForm(false);
  };

  return (
    <div className="flex flex-col h-full">
      
      <div className="mb-8 flex flex-col xl:flex-row xl:justify-between xl:items-end gap-5">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] font-bold text-amber-700 mb-2">Curtumes Ibéria · Dashboard</p>
          <h1 className="text-3xl md:text-4xl font-title font-bold text-institucional-blue">{data.title}</h1>
          <p className="text-gray-500 mt-2">{data.subtitle}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
        <div className="w-full sm:w-80 relative">
          <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder={data.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-institucional-blue/20 focus:border-institucional-blue shadow-sm font-title"
          />
        </div>
        <button onClick={() => setShowCreateForm(true)} className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-institucional-blue text-white font-title font-bold shadow-lg shadow-blue-950/10 hover:bg-blue-950 transition-colors whitespace-nowrap">
          <span className="text-lg leading-none">+</span> {language === 'PT' ? 'Nova encomenda' : 'New order'}
        </button>
        </div>
      </div>

      {!loading && <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-6">
        {(language === 'PT' ? [
          ['Total de encomendas', pedidos.length],
          ['Pendentes', pedidos.filter(p => normalizeStatus(p.status) === 'Pendente').length],
          ['Em processamento', pedidos.filter(p => normalizeStatus(p.status) === 'Em Processamento').length],
          ['Concluídas', pedidos.filter(p => normalizeStatus(p.status) === 'Entregue').length]
        ] : [
          ['Total orders', pedidos.length],
          ['Pending', pedidos.filter(p => normalizeStatus(p.status) === 'Pendente').length],
          ['Processing', pedidos.filter(p => normalizeStatus(p.status) === 'Em Processamento').length],
          ['Completed', pedidos.filter(p => normalizeStatus(p.status) === 'Entregue').length]
        ]).map(([label, value]) => <div key={label} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-500 font-medium">{label}</p>
          <p className="text-2xl font-title font-bold text-institucional-blue mt-1">{value}</p>
        </div>)}
      </div>}

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
              <div key={coluna} className="flex flex-col min-w-[320px] w-[320px] bg-slate-100/80 rounded-2xl p-4 border border-slate-200/80 h-[calc(100vh-300px)] min-h-[440px]">
                
                <div className="flex justify-between items-center mb-6 flex-shrink-0">
                  <h2 className="font-title font-bold text-gray-800 text-base">{data.states[coluna]}</h2>
                  <span className="bg-white text-institucional-blue text-xs font-bold font-title px-3 py-1.5 rounded-full border border-gray-200">
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
                      <div key={pedido.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all group flex flex-col relative overflow-hidden flex-shrink-0">
                        
                        <div className={`absolute top-0 left-0 w-full h-1 ${
                          coluna === 'Pendente' ? 'bg-orange-400' :
                          coluna === 'Em Processamento' ? 'bg-blue-400' :
                          coluna === 'Expedido' ? 'bg-purple-400' : 'bg-green-400'
                        }`}></div>

                        <div className="flex justify-between items-start mb-4">
                          <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded border border-gray-200 truncate max-w-[120px]" title={pedido.id}>
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

                        <div className="mt-auto pt-3 border-t border-gray-100 flex flex-col gap-2">
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
                          <button onClick={() => eliminarEncomenda(pedido)} className="w-full inline-flex items-center justify-center gap-2 py-2 text-xs font-bold text-red-600 hover:text-white hover:bg-red-600 border border-red-100 hover:border-red-600 rounded-lg transition-colors" aria-label={`${language === 'PT' ? 'Eliminar encomenda de' : 'Delete order for'} ${pedido.empresa_nif}`}>
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4h6v3m-9 0h12" /></svg>
                            {language === 'PT' ? 'Eliminar encomenda' : 'Delete order'}
                          </button>
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

      {showCreateForm && <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-4" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget && !savingOrder) setShowCreateForm(false); }}>
        <form onSubmit={criarEncomenda} className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl" aria-labelledby="create-order-title">
          <div className="p-6 md:p-8 border-b border-gray-100 flex items-start justify-between">
            <div><p className="text-xs uppercase tracking-[0.2em] text-amber-700 font-bold mb-2">{language === 'PT' ? 'Gestão de encomendas' : 'Order management'}</p><h2 id="create-order-title" className="text-2xl font-title font-bold text-institucional-blue">{language === 'PT' ? 'Adicionar encomenda' : 'Add order'}</h2></div>
            <button type="button" onClick={() => setShowCreateForm(false)} disabled={savingOrder} className="text-gray-400 hover:text-gray-700 text-2xl leading-none" aria-label={language === 'PT' ? 'Fechar' : 'Close'}>×</button>
          </div>
          <div className="p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {([
              ['nome_cliente', language === 'PT' ? 'Nome do cliente' : 'Customer name', 'text', true],
              ['empresa_nif', language === 'PT' ? 'Empresa / NIF' : 'Company / VAT', 'text', true],
              ['email_cliente', 'Email', 'email', true],
              ['telefone_cliente', language === 'PT' ? 'Telefone (opcional)' : 'Phone (optional)', 'tel', false],
              ['referencia_produto', language === 'PT' ? 'Referência do artigo' : 'Article reference', 'text', true],
              ['quantidade_m2', language === 'PT' ? 'Quantidade (m²)' : 'Quantity (m²)', 'number', false]
            ] as const).map(([field, label, type, required]) => <label key={field} className="text-sm font-semibold text-gray-700">{label}<input type={type} min={type === 'number' ? '0' : undefined} step={type === 'number' ? 'any' : undefined} required={required} value={newOrder[field]} onChange={event => setNewOrder(current => ({ ...current, [field]: event.target.value }))} className="mt-1.5 w-full px-3.5 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-institucional-blue/20 focus:border-institucional-blue" /></label>)}
            <label className="text-sm font-semibold text-gray-700 sm:col-span-2">{language === 'PT' ? 'Notas / especificações' : 'Notes / specifications'}<textarea rows={4} value={newOrder.notas} onChange={event => setNewOrder(current => ({ ...current, notas: event.target.value }))} className="mt-1.5 w-full px-3.5 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-institucional-blue/20 focus:border-institucional-blue resize-y" /></label>
            <p className="sm:col-span-2 text-xs text-gray-500">{language === 'PT' ? 'A encomenda será criada com o estado Pendente.' : 'The order will be created with Pending status.'}</p>
          </div>
          <div className="px-6 md:px-8 py-5 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
            <button type="button" disabled={savingOrder} onClick={() => setShowCreateForm(false)} className="px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-200">{language === 'PT' ? 'Cancelar' : 'Cancel'}</button>
            <button type="submit" disabled={savingOrder} className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-institucional-blue hover:bg-blue-950 disabled:opacity-60">{savingOrder ? (language === 'PT' ? 'A guardar…' : 'Saving…') : (language === 'PT' ? 'Criar encomenda' : 'Create order')}</button>
          </div>
        </form>
      </div>}
    </div>
  );
}
