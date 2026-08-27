import { ArrowRight, Building2, CalendarDays, MapPin, Plus, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/ui/PageHeader';
import { projects } from '../../data/mockData';

export function ProjectsPage() {
  return <div><PageHeader title="Projetos" subtitle="Contratos operacionais e metas de execução por cliente." actions={<button className="button button--primary"><Plus size={17} /> Novo projeto</button>} /><section className="project-cards">{projects.map((project) => <article className="project-card" key={project.id}><header><span><Building2 size={19} /></span><span className="status-badge status-badge--ativo"><i /> Ativo</span></header><small>{project.client.toUpperCase()}</small><h2>{project.plant}</h2><p>{project.name}</p><dl><div><MapPin size={15} /><span><small>Serviço</small><strong>{project.service}</strong></span></div><div><CalendarDays size={15} /><span><small>Período</small><strong>{project.period}</strong></span></div></dl><div className="progress-heading"><span>Avanço contratual</span><strong>{project.progress}%</strong></div><div className="progress-bar"><i style={{ width: `${project.progress}%` }} /></div><footer><span><Target size={15} /><b>{project.production}</b> de {project.target}</span><Link to={`/admin/projects/${project.id}`}>Detalhes <ArrowRight size={15} /></Link></footer></article>)}</section></div>;
}
