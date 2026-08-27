import { X } from 'lucide-react';
import type { PropsWithChildren, ReactNode } from 'react';

export function Modal({ open, onClose, title, children, footer }: PropsWithChildren<{
  open: boolean;
  onClose: () => void;
  title: string;
  footer?: ReactNode;
}>) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <header className="modal__header">
          <h2 id="modal-title">{title}</h2>
          <button className="icon-button" onClick={onClose} aria-label="Fechar"><X size={20} /></button>
        </header>
        <div className="modal__body">{children}</div>
        {footer && <footer className="modal__footer">{footer}</footer>}
      </section>
    </div>
  );
}
