const benefits = ['10 g de proteína*', 'assado com azeite', 'crocância de verdade', 'cabe na bolsa', 'ingredientes simples*']

export function BenefitsMarquee() {
  return (
    <div className="benefits-marquee" aria-label="Diferenciais Bicco's">
      <div className="benefits-marquee__track">
        {[0, 1].map((group) => (
          <div className="benefits-marquee__group" aria-hidden={group === 1} key={group}>
            {benefits.map((benefit) => <span key={benefit}>{benefit}<i>✦</i></span>)}
          </div>
        ))}
      </div>
    </div>
  )
}
