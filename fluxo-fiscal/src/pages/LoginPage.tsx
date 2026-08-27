import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Database, Eye, EyeOff, FileCheck2, FileInput, FolderCheck, LockKeyhole, Mail, Network, ShieldCheck } from 'lucide-react';
import { Brand } from '../components/layout/Brand';
import { Button } from '../components/ui/Button';

const sources = ['Outlook', 'Nomus ERP', 'NF-e', 'CT-e', 'NFS-e', 'SharePoint'];
const stages = [
  { icon: FileInput, label: 'Documentos' },
  { icon: Database, label: 'Processamento' },
  { icon: FileCheck2, label: 'Classificação' },
  { icon: FolderCheck, label: 'SharePoint' },
];

export function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    window.setTimeout(() => navigate('/app/dashboard'), 450);
  }

  return (
    <main className="login-page">
      <section className="login-panel">
        <div className="login-panel__inner">
          <Brand />
          <div className="login-copy">
            <span className="login-kicker"><ShieldCheck size={14} /> Ambiente Allebras</span>
            <h1>Fluxo Fiscal</h1>
            <p>Gestão e automação documental para toda a operação fiscal.</p>
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            <label>E-mail<div className="field-with-icon"><Mail size={17} /><input type="email" defaultValue="gabriel@allebras.com.br" required /></div></label>
            <label>Senha<div className="field-with-icon"><LockKeyhole size={17} /><input type={showPassword ? 'text' : 'password'} defaultValue="allebras" required /><button type="button" aria-label="Mostrar senha" onClick={() => setShowPassword((value) => !value)}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></label>
            <div className="login-form__meta"><label><input type="checkbox" defaultChecked /> Lembrar acesso</label><button type="button">Esqueci minha senha</button></div>
            <Button type="submit" loading={loading}>Entrar <ArrowRight size={17} /></Button>
          </form>
          <p className="login-help">Acesso para a equipe Allebras e fornecedores autorizados.</p>
        </div>
      </section>
      <section className="login-visual">
        <div className="login-visual__grid" aria-hidden="true" />
        <div className="login-visual__content">
          <span className="login-visual__eyebrow"><Network size={15} /> Ecossistema integrado</span>
          <h2>Todos os documentos.<br />Um único fluxo.</h2>
          <p>Da captura ao arquivamento, cada etapa acontece de forma automática, segura e rastreável.</p>
          <div className="login-flow">
            {stages.map(({ icon: Icon, label }, index) => (
              <div className="login-flow__item" key={label}>
                <span><Icon size={19} /></span><strong>{label}</strong>
                {index < stages.length - 1 && <ArrowRight className="login-flow__arrow" size={16} />}
              </div>
            ))}
          </div>
          <div className="source-cloud">
            {sources.map((source, index) => <span key={source} className={index === 5 ? 'source-cloud__destination' : ''}>{index === 5 && <CheckCircle2 size={13} />}{source}</span>)}
          </div>
          <div className="login-visual__proof"><CheckCircle2 size={18} /><div><strong>1.284 documentos orquestrados</strong><span>nos últimos 30 dias</span></div><b>99,4%</b></div>
        </div>
      </section>
    </main>
  );
}
