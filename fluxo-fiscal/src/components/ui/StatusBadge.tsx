import type { DocumentStatus, IntegrationStatus } from '../../types/domain';

type BadgeStatus = DocumentStatus | IntegrationStatus | 'Ativo' | 'Inativo' | 'Alta' | 'Média' | 'Baixa';

const toneMap: Record<BadgeStatus, string> = {
  'Concluído': 'success',
  'Processando': 'info',
  'Pendente': 'warning',
  'Duplicado': 'duplicate',
  'Erro': 'danger',
  'Operacional': 'success',
  'Atenção': 'warning',
  'Ativo': 'success',
  'Inativo': 'neutral',
  'Alta': 'danger',
  'Média': 'warning',
  'Baixa': 'neutral',
};

export function StatusBadge({ status }: { status: BadgeStatus }) {
  return (
    <span className={`status-badge status-badge--${toneMap[status]}`}>
      <span className="status-badge__dot" aria-hidden="true" />
      {status}
    </span>
  );
}
