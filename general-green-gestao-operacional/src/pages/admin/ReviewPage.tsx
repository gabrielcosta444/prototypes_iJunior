import { AlertTriangle, ArrowLeft, Check, CheckCircle2, Clock3, Download, FileText, LocateFixed, MapPin, MessageSquareWarning, RotateCcw, ShieldCheck, Target, UserRound } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { PageHeader } from '../../components/ui/PageHeader';
import { evidences } from '../../data/mockData';
import { usePrototype } from '../../app/PrototypeContext';

export function ReviewPage() {
  const [approved, setApproved] = useState(false);
  const [returning, setReturning] = useState(false);
  const { approveActivity, returnActivity } = usePrototype();
  const navigate = useNavigate();
  return (
    <div className="review-page">
      <PageHeader title="Revisão da atividade" subtitle="OS #2026-0147 · Lavagem de módulos · UFV Serra Azul" actions={<Link className="button button--secondary" to="/admin/operations"><ArrowLeft size={17} /> Operações</Link>} />
      <div className="review-status"><span><ShieldCheck size={20} /></span><div><strong>Execução enviada para validação</strong><p>Sincronizada hoje às 16:32 por Marcos Pereira · Equipe 03</p></div><small>Tempo de execução: 8h 38min</small></div>
      <div className="review-layout">
        <div className="review-main">
          <section className="panel review-summary"><div className="panel__header"><div><h2>Resumo da execução</h2><p>Resultados informados pela equipe de campo</p></div><span className="review-complete"><Check size={14} /> Checklist completo</span></div><div className="review-metrics"><div><Target /><span><small>Produção realizada</small><strong>12.480 módulos</strong><p>Meta: 11.500 · <b>108,5%</b></p></span></div><div><Clock3 /><span><small>Período</small><strong>07:54 — 16:32</strong><p>8h 38min de execução</p></span></div><div><UserRound /><span><small>Equipe</small><strong>Equipe 03</strong><p>8 profissionais mobilizados</p></span></div></div></section>
          <section className="panel evidence-section"><div className="panel__header"><div><h2>Evidências fotográficas</h2><p>Registro visual georreferenciado da execução</p></div><span>6 arquivos</span></div><div className="evidence-grid">{evidences.map((item) => <article className="evidence-card" key={item.id}><div className={`evidence-card__image evidence-card__image--${item.id}`}><span>{item.stage}</span><LocateFixed size={18} /></div><div><strong>{item.stage} da execução</strong><small><Clock3 size={13} /> Hoje, {item.time}</small><small><MapPin size={13} /> {item.coordinates}</small></div></article>)}</div><div className="evidence-integrity"><ShieldCheck size={18} /><span><strong>Integridade verificada</strong><small>Horário e localização coletados automaticamente pelo dispositivo.</small></span></div></section>
          <section className="panel comparison-map"><div className="panel__header"><div><h2>Área atendida</h2><p>Trajeto e pontos de evidência registrados</p></div><span>11,2 km percorridos</span></div><div className="map-canvas"><span className="map-road road-1" /><span className="map-road road-2" /><span className="map-route" /><i className="map-pin pin-1">1</i><i className="map-pin pin-2">2</i><i className="map-pin pin-3">3</i><div className="map-label">UFV SERRA AZUL<small>Blocos A01 — A08</small></div></div></section>
        </div>
        <aside className="review-aside">
          <section className="panel validation-card"><div className="panel__header"><div><h2>Validação gerencial</h2><p>Confira os itens obrigatórios</p></div></div>{['APR concluída', 'Checklist operacional completo', 'Meta de produção informada', 'Evidências antes, durante e depois', 'Localização compatível com a UFV'].map((label) => <div className="validation-row" key={label}><CheckCircle2 size={17} /><span>{label}</span></div>)}<div className="validation-score"><span>Conformidade</span><strong>100%</strong></div></section>
          <section className="panel manager-note"><h2>Parecer do gestor</h2><textarea defaultValue="Execução validada conforme escopo e evidências apresentadas." /><label><input type="checkbox" defaultChecked /> Disponibilizar no portal do cliente</label></section>
          <div className="review-actions"><Button variant="danger" block onClick={() => setReturning(true)}><RotateCcw size={17} /> Solicitar correção</Button><Button block onClick={() => { approveActivity(); setApproved(true); }}><CheckCircle2 size={18} /> Aprovar atividade</Button></div>
          <button className="button button--ghost report-preview-link"><FileText size={17} /> Pré-visualizar relatório <Download size={15} /></button>
        </aside>
      </div>
      <Modal open={approved} onClose={() => setApproved(false)} title="Atividade aprovada" footer={<><Button variant="secondary" onClick={() => navigate('/admin/operations')}>Voltar às operações</Button><Button onClick={() => navigate('/admin/reports/preview')}>Ver relatório gerado</Button></>}><div className="success-modal"><span><CheckCircle2 size={28} /></span><h3>Validação concluída</h3><p>A OS #2026-0147 foi concluída. O relatório foi gerado e disponibilizado para a Solaris Energia.</p></div></Modal>
      <Modal open={returning} onClose={() => setReturning(false)} title="Solicitar correção" footer={<><Button variant="secondary" onClick={() => setReturning(false)}>Cancelar</Button><Button variant="danger" onClick={() => { returnActivity(); setReturning(false); navigate('/admin/operations'); }}>Enviar solicitação</Button></>}><div className="return-form"><span><MessageSquareWarning size={20} /></span><p>Descreva o que a equipe precisa corrigir antes de uma nova revisão.</p><textarea defaultValue="Adicionar uma fotografia final com visão ampla do bloco A08." /><small><AlertTriangle size={14} /> A atividade voltará para o aplicativo do técnico.</small></div></Modal>
    </div>
  );
}
