import { CheckCircle2, X } from 'lucide-react';
import { usePrototype } from '../../app/PrototypeContext';

export function Toast() {
  const { toast, clearToast } = usePrototype();
  if (!toast) return null;
  return (
    <div className="toast" role="status">
      <CheckCircle2 size={20} />
      <span>{toast}</span>
      <button onClick={clearToast} aria-label="Fechar notificação"><X size={17} /></button>
    </div>
  );
}
