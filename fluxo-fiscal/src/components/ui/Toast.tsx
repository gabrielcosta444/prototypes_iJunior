import { CheckCircle2, Info, X } from 'lucide-react';

interface ToastProps {
  message: string;
  tone: 'success' | 'info';
  onClose: () => void;
}

export function Toast({ message, tone, onClose }: ToastProps) {
  return (
    <div className={`toast toast--${tone}`} role="status">
      {tone === 'success' ? <CheckCircle2 size={19} /> : <Info size={19} />}
      <span>{message}</span>
      <button type="button" onClick={onClose} aria-label="Fechar notificação"><X size={16} /></button>
    </div>
  );
}
