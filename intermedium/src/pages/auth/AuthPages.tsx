import { Building2, Eye, EyeOff, HardHat, Mail, ShieldCheck } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePrototype } from '../../app/PrototypeContext';
import { Brand } from '../../components/Brand';
import { Button, InlineAlert } from '../../components/ui';
import type { UserRole } from '../../domain/types';

const roleHome: Record<UserRole, string> = { manager: '/sindico', provider: '/prestador', admin: '/admin' };

function AuthLayout({ children }: { children: React.ReactNode }) {
  return <main className="auth-page"><section className="auth-card">{children}</section></main>;
}

export function LoginPage() {
  const { loginDemo, loginWithEmail } = usePrototype();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const enterDemo = (role: UserRole) => {
    const user = loginDemo(role);
    navigate(roleHome[user.role]);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setError('');
    if (!email.trim() || !password) {
      setError('Informe seu e-mail e sua senha.');
      return;
    }
    const user = loginWithEmail(email);
    if (!user) {
      setError('Conta demonstrativa não encontrada. Use um dos acessos abaixo.');
      return;
    }
    navigate(roleHome[user.role]);
  };

  return (
    <AuthLayout>
      <div className="auth-card__brand"><Brand linkTo="" /></div>
      <div className="auth-card__heading">
        <h1>Bem-vindo</h1>
        <p>Acesse sua conta para continuar.</p>
      </div>
      <form className="form-stack" onSubmit={submit} noValidate>
        {error && <InlineAlert tone="danger">{error}</InlineAlert>}
        <label className="field">
          <span>E-mail</span>
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="seu@email.com" autoComplete="email" />
        </label>
        <label className="field">
          <span>Senha</span>
          <span className="input-with-action">
            <input type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Digite sua senha" autoComplete="current-password" />
            <button type="button" aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={19} /> : <Eye size={19} />}</button>
          </span>
        </label>
        <div className="auth-card__assist"><Link to="/recuperar-senha">Esqueci minha senha</Link></div>
        <Button type="submit" className="button--full">Entrar</Button>
      </form>
      <p className="auth-card__signup">Ainda não possui uma conta? <Link to="/cadastro">Criar conta</Link></p>
      <div className="demo-access">
        <div className="demo-access__label"><span>Acesso demonstrativo</span></div>
        <div className="demo-access__buttons">
          <button onClick={() => enterDemo('manager')}><Building2 size={17} /> Entrar como síndico</button>
          <button onClick={() => enterDemo('provider')}><HardHat size={17} /> Entrar como prestador</button>
          <button onClick={() => enterDemo('admin')}><ShieldCheck size={17} /> Entrar como administrador</button>
        </div>
      </div>
    </AuthLayout>
  );
}

export function RecoveryPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  return (
    <AuthLayout>
      <div className="auth-card__brand"><Brand linkTo="/login" /></div>
      <div className="auth-card__heading"><h1>Recuperar senha</h1><p>Enviaremos instruções para o e-mail informado.</p></div>
      {sent ? (
        <div className="success-message"><Mail size={28} /><h2>Confira seu e-mail</h2><p>Se existir uma conta para <strong>{email}</strong>, você receberá as instruções. Este envio é uma simulação.</p><Link to="/login" className="button button--primary">Voltar ao login</Link></div>
      ) : (
        <form className="form-stack" onSubmit={(event) => { event.preventDefault(); if (email.trim()) setSent(true); }}>
          <label className="field"><span>E-mail</span><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="seu@email.com" /></label>
          <Button type="submit" className="button--full">Enviar instruções</Button>
          <Link to="/login" className="text-link text-link--center">Voltar ao login</Link>
        </form>
      )}
    </AuthLayout>
  );
}

export function RegisterPage() {
  const navigate = useNavigate();
  return (
    <AuthLayout>
      <div className="auth-card__brand"><Brand linkTo="/login" /></div>
      <div className="auth-card__heading"><h1>Crie sua conta</h1><p>Escolha como você utilizará a FS Intermedium.</p></div>
      <div className="role-choice">
        <button onClick={() => navigate('/cadastro/condominio')}><Building2 /><span><strong>Sou síndico</strong><small>Encontre profissionais para o seu condomínio.</small></span></button>
        <button onClick={() => navigate('/cadastro/prestador')}><HardHat /><span><strong>Sou prestador</strong><small>Cadastre seus serviços e passe pela validação.</small></span></button>
      </div>
      <Link to="/login" className="text-link text-link--center">Já tenho uma conta</Link>
    </AuthLayout>
  );
}

export function ManagerRegistrationPage() {
  const { dispatch } = usePrototype();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ responsibleName: '', accountEmail: '', phone: '', name: '', address: '', region: '' });
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const id = `condo-${Date.now()}`;
    dispatch({ type: 'ADD_CONDOMINIUM', condominium: { id, ...form, createdAt: new Date().toISOString().slice(0, 10) } });
    setSaved(true);
    setTimeout(() => navigate('/login'), 900);
  };
  return (
    <AuthLayout>
      <div className="auth-card__brand"><Brand linkTo="/login" /></div>
      <div className="auth-card__heading"><h1>Cadastro do condomínio</h1><p>Preencha os dados básicos. O acesso é gratuito.</p></div>
      {saved && <InlineAlert tone="success">Cadastro criado. Redirecionando para o acesso...</InlineAlert>}
      <form className="form-grid" onSubmit={submit}>
        {Object.entries({ responsibleName: 'Nome do responsável', accountEmail: 'E-mail', phone: 'Telefone', name: 'Nome do condomínio', address: 'Endereço', region: 'Bairro / região' }).map(([key, label]) => (
          <label className={`field ${(key === 'address' || key === 'name') ? 'field--span-2' : ''}`} key={key}><span>{label}</span><input required value={form[key as keyof typeof form]} onChange={(event) => setForm({ ...form, [key]: event.target.value })} /></label>
        ))}
        <Button type="submit" className="field--span-2">Criar conta</Button>
      </form>
    </AuthLayout>
  );
}
