import { BarChart3, CheckCircle2, ClipboardCheck, Eye, FileText, Leaf, LocateFixed, LockKeyhole, Mail, MapPin, Smartphone, Workflow } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Brand } from '../components/ui/Brand';
import { Button } from '../components/ui/Button';

const flow = [
  { label: 'Planejamento', caption: 'OS e equipes', icon: ClipboardCheck },
  { label: 'Campo', caption: 'Execução offline', icon: Smartphone },
  { label: 'Validação', caption: 'Evidências e revisão', icon: Eye },
  { label: 'Resultado', caption: 'Indicadores e relatório', icon: BarChart3 },
];

export function LoginPage() {
  const navigate = useNavigate();
  return (
    <main className="login-page">
      <section className="login-panel">
        <Brand />
        <div className="login-panel__content">
          <span className="eyebrow"><Leaf size={15} /> Plataforma operacional</span>
          <h1>Gestão de Operações</h1>
          <p>Controle, rastreabilidade e eficiência da operação em campo.</p>
          <form onSubmit={(event) => { event.preventDefault(); navigate('/admin/dashboard'); }}>
            <label>E-mail<div className="input-shell"><Mail size={18} /><input defaultValue="tiago.oliveira@generalgreen.com.br" type="email" /></div></label>
            <label>Senha<div className="input-shell"><LockKeyhole size={18} /><input defaultValue="generalgreen" type="password" /></div></label>
            <div className="login-options"><label className="check-label"><input type="checkbox" defaultChecked /> Lembrar acesso</label><button type="button">Esqueci minha senha</button></div>
            <Button block type="submit">Entrar</Button>
          </form>
          <small className="login-security"><CheckCircle2 size={15} /> Ambiente protegido e monitorado</small>
        </div>
      </section>
      <section className="login-visual">
        <div className="login-visual__heading"><span>OPERAÇÃO CONECTADA</span><h2>Do planejamento à comprovação em campo.</h2><p>Uma visão única para controlar equipes, produtividade, evidências e resultados.</p></div>
        <div className="login-flow">
          {flow.map(({ label, caption, icon: Icon }, index) => <div className="login-flow__item" key={label}><span><Icon size={21} /></span><div><strong>{label}</strong><small>{caption}</small></div>{index < flow.length - 1 && <i />}</div>)}
        </div>
        <div className="login-visual__chips"><span><MapPin size={15} /> Geolocalização</span><span><FileText size={15} /> Relatório PDF</span><span><Workflow size={15} /> Fluxo rastreável</span><span><LocateFixed size={15} /> Evidência operacional</span></div>
      </section>
    </main>
  );
}
