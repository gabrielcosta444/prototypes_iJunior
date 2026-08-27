import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export function NotFoundPage() {
  return <main className="empty-page"><span>404</span><h1>Página não encontrada</h1><p>Este caminho não faz parte do protótipo.</p><Link to="/"><Button>Voltar ao início</Button></Link></main>;
}
