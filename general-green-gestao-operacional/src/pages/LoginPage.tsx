import { LockKeyhole, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Brand } from '../components/ui/Brand';
import { Button } from '../components/ui/Button';

export function LoginPage() {
  const navigate = useNavigate();

  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-title">
        <div className="login-card__brand">
          <Brand />
        </div>

        <header className="login-card__header">
          <h1 id="login-title">Acessar sua conta</h1>
          <p>Entre com seus dados para continuar.</p>
        </header>

        <form
          aria-labelledby="login-title"
          onSubmit={(event) => {
            event.preventDefault();
            navigate('/admin/dashboard');
          }}
        >
          <label>
            E-mail
            <div className="input-shell">
              <Mail aria-hidden="true" size={18} />
              <input defaultValue="tiago.oliveira@generalgreen.com.br" type="email" />
            </div>
          </label>

          <label>
            Senha
            <div className="input-shell">
              <LockKeyhole aria-hidden="true" size={18} />
              <input defaultValue="generalgreen" type="password" />
            </div>
          </label>

          <div className="login-options">
            <label className="check-label">
              <input type="checkbox" defaultChecked />
              Lembrar acesso
            </label>
            <button type="button">Esqueci minha senha</button>
          </div>

          <Button block type="submit">Entrar</Button>
        </form>
      </section>
    </main>
  );
}
