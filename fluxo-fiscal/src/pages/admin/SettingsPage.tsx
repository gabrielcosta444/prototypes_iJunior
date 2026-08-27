import { BellRing, FileText, FolderOpen, Save, UserRound } from 'lucide-react';
import { usePrototype } from '../../app/PrototypeContext';
import { Button } from '../../components/ui/Button';
import { PageHeader } from '../../components/ui/PageHeader';

const cards = [
  { title: 'Padrão de nomenclatura', description: 'Defina como os arquivos serão renomeados antes do arquivamento.', icon: FileText, field: 'Formato', value: '{ANO}_{MÊS}_{FORNECEDOR}_{TIPO}_{NÚMERO}' },
  { title: 'Destino padrão', description: 'Biblioteca usada quando nenhuma regra específica indicar outro destino.', icon: FolderOpen, field: 'Caminho', value: 'SharePoint / Fiscal / Documentos' },
  { title: 'Notificações', description: 'Destinatários que recebem alertas sobre erros e pendências.', icon: BellRing, field: 'E-mails', value: 'fiscal@allebras.com.br; gabriel@allebras.com.br' },
  { title: 'Perfil administrativo', description: 'Dados exibidos nas trilhas de auditoria e ações manuais.', icon: UserRound, field: 'Nome', value: 'Gabriel Martins' },
];
export function SettingsPage() { const { showToast } = usePrototype(); return <div><PageHeader title="Configurações" subtitle="Preferências gerais do Fluxo Fiscal." /><section className="settings-grid">{cards.map(({ title, description, icon: Icon, field, value }) => <article className="settings-card card" key={title}><header><span><Icon size={17} /></span><div><h2>{title}</h2><p>{description}</p></div></header><label>{field}<input defaultValue={value} /></label><Button variant="secondary" size="sm" icon={<Save size={14} />} onClick={() => showToast('Configuração salva com sucesso')}>Salvar alterações</Button></article>)}</section></div>; }
