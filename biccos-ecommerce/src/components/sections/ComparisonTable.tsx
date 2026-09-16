import { Check, Minus } from 'lucide-react'

const rows = [
  ['Experiência', 'Salgado e crocante', 'Geralmente doce e macia'],
  ['Base', 'Grão-de-bico assado', 'Mistura proteica processada'],
  ['Ingredientes', 'Lista curta e reconhecível*', 'Pode ter adoçantes e aromatizantes'],
  ['Momento', 'Lanche, happy hour ou caminho', 'Pré ou pós-treino'],
  ['Preparo', 'Abriu, fez crec', 'Abriu e comeu'],
]

export function ComparisonTable() {
  return (
    <section className="comparison-section section" id="comparacao">
      <div className="container">
        <div className="comparison-heading">
          <div>
            <span className="section-kicker">Sem duelo de maromba</span>
            <h2 className="section-title">Bicco’s <em>vs.</em> a barrinha de sempre.</h2>
          </div>
          <p>Proteína também pode ser salgada, crocante e parecer comida de verdade. Compare formatos — e escolha o que combina com sua fome.</p>
        </div>
        <div className="comparison-card">
          <table>
            <thead>
              <tr><th>Na prática</th><th><span className="comparison-logo">B</span> Bicco’s</th><th>Barrinha genérica</th></tr>
            </thead>
            <tbody>
              {rows.map(([label, biccos, bar]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  <td data-label="Bicco’s"><Check size={18} />{biccos}</td>
                  <td data-label="Barrinha"><Minus size={18} />{bar}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="comparison-note">*Comparação ilustrativa baseada em formatos comuns. Consulte sempre o rótulo de cada produto.</p>
        </div>
      </div>
    </section>
  )
}
