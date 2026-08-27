import { Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { AddDocumentModal } from '../../components/documents/AddDocumentModal';
import { DocumentFilters } from '../../components/documents/DocumentFilters';
import { DocumentTable } from '../../components/documents/DocumentTable';
import { Button } from '../../components/ui/Button';
import { PageHeader } from '../../components/ui/PageHeader';
import { documents } from '../../data/mockData';

export function DocumentsPage() {
  const [search, setSearch] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const filtered = useMemo(() => {
    const term = search.trim().toLocaleLowerCase('pt-BR');
    if (!term) return documents;
    return documents.filter((item) => [item.title, item.supplier, item.type, item.origin, item.category].some((field) => field.toLocaleLowerCase('pt-BR').includes(term)));
  }, [search]);

  return (
    <div>
      <PageHeader title="Documentos fiscais" subtitle="Todos os documentos recebidos pelas diferentes fontes da operação." actions={<Button icon={<Plus size={17} />} onClick={() => setAddOpen(true)}>Adicionar documento</Button>} />
      <DocumentFilters search={search} onSearchChange={setSearch} />
      <DocumentTable records={filtered} />
      {addOpen && <AddDocumentModal onClose={() => setAddOpen(false)} />}
    </div>
  );
}
