import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { getProductBySlug } from '../../data/products'
import { useShop } from '../../store/ShopContext'
import { Button } from '../ui/Button'

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
const freeShippingTarget = 110

export function CartDrawer() {
  const { items, subtotal, isCartOpen, closeCart, setQuantity, removeItem } = useShop()

  if (!isCartOpen) return null

  const shippingProgress = Math.min(100, (subtotal / freeShippingTarget) * 100)
  const shippingDifference = Math.max(0, freeShippingTarget - subtotal)

  return (
    <div className="cart-layer">
      <button className="cart-layer__backdrop" aria-label="Fechar ao clicar fora" onClick={closeCart} />
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <header className="cart-drawer__header">
          <div>
            <span className="eyebrow">crocâncias escolhidas</span>
            <h2 id="cart-title">Sua sacola</h2>
          </div>
          <button className="icon-button" aria-label="Fechar sacola" onClick={closeCart}><X /></button>
        </header>

        <div className="shipping-progress">
          <div className="shipping-progress__copy">
            {shippingDifference > 0
              ? <>Faltam <strong>{currency.format(shippingDifference)}</strong> para o frete grátis*</>
              : <><strong>Frete grátis desbloqueado!</strong> Sua sacola chegou lá.</>}
          </div>
          <div className="shipping-progress__track" aria-hidden="true">
            <span style={{ width: `${shippingProgress}%` }} />
          </div>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <span className="cart-empty__icon"><ShoppingBag size={34} /></span>
            <h3>Sua sacola está leve.</h3>
            <p>Escolha um sabor e deixe a gente cuidar da crocância.</p>
            <Button onClick={closeCart}>Continuar escolhendo</Button>
          </div>
        ) : (
          <div className="cart-lines">
            {items.map((item) => {
              const product = getProductBySlug(item.slug)
              if (!product) return null
              return (
                <article className={`cart-line theme-${product.theme}`} key={item.slug}>
                  <div className="cart-line__visual">
                    <img src={product.image} alt="" />
                  </div>
                  <div className="cart-line__body">
                    <span className="eyebrow">{product.flavor}</span>
                    <h3>{product.name}</h3>
                    <p>{currency.format(product.price)}</p>
                    <div className="cart-line__actions">
                      <div className="quantity-control quantity-control--small">
                        <button
                          aria-label={`Diminuir quantidade de ${product.name}`}
                          onClick={() => setQuantity(item.slug, item.quantity - 1)}
                        ><Minus size={15} /></button>
                        <span aria-live="polite">{item.quantity}</span>
                        <button
                          aria-label={`Aumentar quantidade de ${product.name}`}
                          onClick={() => setQuantity(item.slug, item.quantity + 1)}
                        ><Plus size={15} /></button>
                      </div>
                      <button
                        className="cart-line__remove"
                        aria-label={`Remover ${product.name}`}
                        onClick={() => removeItem(item.slug)}
                      ><Trash2 size={17} /></button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}

        <footer className="cart-drawer__footer">
          <div className="cart-drawer__subtotal">
            <span>Subtotal</span>
            <strong>{currency.format(subtotal)}</strong>
          </div>
          <Button variant="dark" fullWidth disabled={items.length === 0}>Checkout em breve</Button>
          <small>*Valores e condição de frete são ilustrativos neste protótipo.</small>
        </footer>
      </aside>
    </div>
  )
}
