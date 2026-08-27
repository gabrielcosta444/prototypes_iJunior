import { ChevronDown, Filter, Search, SlidersHorizontal } from 'lucide-react';

const filters = ['Período', 'Status', 'Tipo', 'Origem', 'Fornecedor', 'Unidade', 'Categoria'];

export function DocumentFilters({ search, onSearchChange }: { search: string; onSearchChange: (value: string) => void }) {
  return (
    <div className="document-toolbar">
      <label className="document-search"><Search size={17} /><input value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Buscar por número, chave, fornecedor, CNPJ ou pedido..." /></label>
      <div className="document-filters" aria-label="Filtros de documentos">
        {filters.map((filter, index) => <button type="button" key={filter} className={index > 4 ? 'filter-secondary' : ''}>{index === 0 && <Filter size={13} />}{filter}<ChevronDown size={13} /></button>)}
        <button type="button" className="more-filters"><SlidersHorizontal size={14} />Mais filtros</button>
      </div>
    </div>
  );
}
