import type { OrderStatus } from '../../domain/types';

const labels: Record<OrderStatus | 'aprovada' | 'ativo' | 'rascunho' | 'offline', string> = {
  programada: 'Programada',
  'em-execucao': 'Em execução',
  'aguardando-sincronizacao': 'Pendente de sincronização',
  'aguardando-revisao': 'Aguardando revisão',
  devolvida: 'Devolvida',
  concluida: 'Concluída',
  aprovada: 'Aprovada',
  ativo: 'Ativo',
  rascunho: 'Rascunho',
  offline: 'Offline',
};

export function StatusBadge({ status }: { status: keyof typeof labels }) {
  return <span className={`status-badge status-badge--${status}`}><i />{labels[status]}</span>;
}
