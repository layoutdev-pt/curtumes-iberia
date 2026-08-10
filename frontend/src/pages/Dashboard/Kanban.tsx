import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

type EstadoPedido = 'Pendente' | 'Em Processamento' | 'Expedido' | 'Entregue';

interface Pedido {
  id: string;
  cliente: string;
  nif: string;
  artigo: string;
  quantidade: number;
  estado: EstadoPedido;
  dataSubmissao: string;
}

const pedidosIniciais: Pedido[] = [
  { id: 'ENC-001', cliente: 'Calçado Silva, Lda', nif: '501000111', artigo: 'Couro Anilina CF', quantidade: 500, estado: 'Pendente', dataSubmissao: '2026-08-08' },
  { id: 'ENC-002', cliente: 'Marroquinaria Moderna', nif: '502000222', artigo: 'Couro Nobuck Hidrofugado', quantidade: 250, estado: 'Em Processamento', dataSubmissao: '2026-08-07' },
  { id: 'ENC-003', cliente: 'Sapatos & Companhia', nif: '503000333', artigo: 'Couro Estampado Croco', quantidade: 1000, estado: 'Expedido', dataSubmissao: '2026-08-05' },
  { id: 'ENC-004', cliente: 'Boutique XYZ', nif: '504000444', artigo: 'Couro Nappa CF', quantidade: 150, estado: 'Entregue', dataSubmissao: '2026-08-01' },
];

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
    subtitle: "Acompanhe e gira o processamento de catálogo B2B.",
    article: "Artigo:",
    qty: "Qtd:",
    moveTo: "Mover para",
    completed: "Encomenda Finalizada",
    states: {
      'Pendente': 'Pendente',
      'Em Processamento': 'Em Processamento',
      'Expedido': 'Expedido',
      'Entregue': 'Entregue'
    }
  },
  EN: {
    title: "Order Management",
    subtitle: "Track and manage B2B catalog processing.",
    article: "Article:",
    qty: "Qty:",
    moveTo: "Move to",
    completed: "Order Completed",
    states: {
      'Pendente': 'Pending',
      'Em Processamento': 'Processing',
      'Expedido': 'Shipped',
      'Entregue': 'Delivered'
    }
  }
};

export function Kanban() {
  const { language } = useLanguage();
  const data = content[language];

  const [pedidos, setPedidos] = useState<Pedido[]>(pedidosIniciais);

  const avancarEstado = (id: string, estadoAtual: EstadoPedido) => {
    const proximoEstado = transicaoSeguinte[estadoAtual];
    if (!proximoEstado) return;
    setPedidos(pedidosAtuais => 
      pedidosAtuais.map(pedido => pedido.id === id ? { ...pedido, estado: proximoEstado } : pedido)
    );
  };

  return (
    <div className="flex flex-col h-full">
      
      <div className="mb-10">
        <h1 className="text-4xl font-title font-bold text-institucional-blue">{data.title}</h1>
        <p className="text-gray-500 mt-2">{data.subtitle}</p>
      </div>

      <div className="flex flex-grow gap-6 overflow-x-auto pb-4 custom-scrollbar">
        {colunasKanban.map((coluna) => (
          <div key={coluna} className="flex flex-col min-w-[340px] w-[340px] bg-gray-200/40 rounded-2xl p-5 border border-gray-100">
            
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-title font-bold text-gray-800 text-lg">{data.states[coluna]}</h2>
              <span className="bg-white text-institucional-blue text-xs font-bold px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
                {pedidos.filter(p => p.estado === coluna).length}
              </span>
            </div>

            <div className="flex flex-col space-y-4 overflow-y-auto pr-2 flex-grow custom-scrollbar">
              {pedidos.filter(p => p.estado === coluna).map(pedido => (
                <div key={pedido.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group flex flex-col relative overflow-hidden">
                  
                  <div className={`absolute top-0 left-0 w-full h-1 ${
                    pedido.estado === 'Pendente' ? 'bg-orange-400' :
                    pedido.estado === 'Em Processamento' ? 'bg-blue-400' :
                    pedido.estado === 'Expedido' ? 'bg-purple-400' : 'bg-green-400'
                  }`}></div>

                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-mono font-bold bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md">
                      {pedido.id}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">{pedido.dataSubmissao}</span>
                  </div>
                  
                  <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1 truncate" title={pedido.cliente}>{pedido.cliente}</h3>
                  <p className="text-xs text-gray-500 mb-5">NIF: {pedido.nif}</p>
                  
                  <div className="bg-gray-50 p-3 rounded-lg text-sm mb-6 border border-gray-100">
                    <p className="text-gray-700 mb-1 truncate" title={pedido.artigo}>
                      <span className="font-semibold text-institucional-blue">{data.article}</span> {pedido.artigo}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold text-institucional-blue">{data.qty}</span> {pedido.quantidade} sqft
                    </p>
                  </div>

                  <div className="mt-auto">
                    {transicaoSeguinte[pedido.estado] ? (
                      <button
                        onClick={() => avancarEstado(pedido.id, pedido.estado)}
                        className="w-full bg-white border-2 border-institucional-blue text-institucional-blue text-sm py-2.5 rounded-lg hover:bg-institucional-blue hover:text-white transition-colors font-bold"
                      >
                        {data.moveTo} {data.states[transicaoSeguinte[pedido.estado]!]}
                      </button>
                    ) : (
                      <div className="w-full bg-green-50 text-green-700 text-sm py-2.5 rounded-lg text-center border border-green-200 font-bold flex items-center justify-center">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        {data.completed}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}