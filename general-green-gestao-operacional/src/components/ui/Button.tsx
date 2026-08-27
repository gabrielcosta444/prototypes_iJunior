import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  block?: boolean;
}>;

export function Button({ children, variant = 'primary', block = false, className = '', ...props }: ButtonProps) {
  return <button className={`button button--${variant} ${block ? 'button--block' : ''} ${className}`} {...props}>{children}</button>;
}
