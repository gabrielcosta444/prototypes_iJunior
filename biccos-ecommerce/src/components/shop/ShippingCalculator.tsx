import { MapPin } from 'lucide-react'
import { type FormEvent, useState } from 'react'

export function ShippingCalculator() {
  const [cep, setCep] = useState('')
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const digits = cep.replace(/\D/g, '')
    if (digits.length !== 8) {
      setMessage({ type: 'error', text: 'Digite os 8 números do seu CEP.' })
      return
    }
    setMessage({ type: 'success', text: 'Entrega econômica: chega entre 3 e 5 dias úteis · R$ 12,90*' })
  }

  return (
    <div className="shipping-calculator">
      <div className="shipping-calculator__title"><MapPin size={18} /><strong>Calcule a entrega</strong></div>
      <form onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="shipping-cep">CEP</label>
        <input
          id="shipping-cep"
          inputMode="numeric"
          maxLength={9}
          placeholder="00000-000"
          value={cep}
          onChange={(event) => setCep(event.target.value)}
        />
        <button type="submit">Calcular</button>
      </form>
      {message && <p className={`shipping-calculator__message shipping-calculator__message--${message.type}`} role={message.type === 'error' ? 'alert' : 'status'}>{message.text}</p>}
      <small>*Simulação para fins de layout.</small>
    </div>
  )
}
