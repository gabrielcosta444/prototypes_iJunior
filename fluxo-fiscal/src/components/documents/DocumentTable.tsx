import { ChevronLeft, ChevronRight, FileCode2, FileText, ReceiptText, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { DocumentRecord } from '../../types/domain';
import { StatusBadge } from '../ui/StatusBadge';

function typeIcon(type: string) {
  if (type === 'NF-e') return <FileCode2 size={16} />;
  if (type === 'Recibo') return <ReceiptText size={16} />;
  return <FileText size={16} />;
}

export function DocumentTable({ records }: { records: DocumentRecord[] }) {
  const navigate = useNavigate();
  return (
    <section className="data-card">
      <div className="table-scroll">
        <table className="data-table documents-table">
          <thead><tr><th>Documento</th><th>Fornecedor</th><th>Tipo</th><th>Origem</th><th>Emissão</th><th>Valor</th><th>Categoria</th><th>Status</th></tr></thead>
          <tbody>
            {records.map((document) => (
              <tr key={document.id} onClick={() => navigate(`/app/documentos/${document.id.includes('145829') ? 'nfe-145829' : document.id}`)}>
                <td><div className="document-cell"><span>{typeIcon(document.type)}</span><div><strong>{document.title}</strong><small>XML validado</small></div></div></td>
                <td><div className="supplier-cell"><span>{document.supplier.slice(0, 2).toUpperCase()}</span><strong>{document.supplier}</strong></div></td>
                <td>{document.type}</td><td>{document.origin}</td><td>{document.issuedAt}</td><td className="value-cell">{document.value}</td><td><span className={document.category.startsWith('Aguardando') ? 'category-pending' : ''}>{document.category}</span></td><td><StatusBadge status={document.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {records.length === 0 ? <div className="empty-table"><Search size={24} /><strong>Nenhum documento encontrado</strong><span>Ajuste os termos da sua busca.</span></div> : (
        <footer className="table-footer"><span>Mostrando 1–{records.length} de 1.284 documentos</span><div><button aria-label="Página anterior"><ChevronLeft size={14} /></button><button className="active">1</button><button>2</button><button>3</button><span>...</span><button>161</button><button aria-label="Próxima página"><ChevronRight size={14} /></button></div></footer>
      )}
    </section>
  );
}
