import { Menu, Search, ShoppingBag, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useShop } from '../../store/ShopContext'
import { BrandMark } from '../ui/BrandMark'

const links = [
  { to: '/produtos', label: 'Sabores' },
  { to: '/#comparacao', label: "Por que Bicco's" },
  { to: '/sobre', label: 'Nossa história' },
]

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { itemCount, openCart } = useShop()

  return (
    <>
      <div className="promo-marquee" aria-label="Benefícios da loja">
        <div className="promo-marquee__track">
          {[0, 1].map((group) => (
            <div className="promo-marquee__group" aria-hidden={group === 1} key={group}>
              <span className="promo-marquee__item">cupom 1ª compra: BEMVINDO</span>
              <span className="promo-marquee__item">frete grátis acima de R$ 110*</span>
              <span className="promo-marquee__item">assado, crocante e pronto pra ir</span>
            </div>
          ))}
        </div>
      </div>
      <header className="site-header">
        <div className="site-header__inner container">
          <button className="icon-button site-header__menu" aria-label="Abrir menu" onClick={() => setMenuOpen(true)}>
            <Menu />
          </button>
          <BrandMark />
          <nav className="site-nav" aria-label="Navegação principal">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to}>{link.label}</NavLink>
            ))}
          </nav>
          <div className="site-header__actions">
            <Link className="icon-button site-header__search" to="/produtos" aria-label="Buscar produtos"><Search /></Link>
            <button className="cart-button" aria-label={`Sacola, ${itemCount} itens`} onClick={openCart}>
              <ShoppingBag size={19} />
              <span>Sacola</span>
              <strong>{itemCount}</strong>
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu principal">
          <div className="mobile-menu__top">
            <BrandMark inverse />
            <button className="icon-button" aria-label="Fechar menu" onClick={() => setMenuOpen(false)}><X /></button>
          </div>
          <nav aria-label="Navegação mobile">
            <Link to="/" onClick={() => setMenuOpen(false)}>Início</Link>
            {links.map((link, index) => (
              <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)}>
                <span>0{index + 1}</span>{link.label}
              </Link>
            ))}
          </nav>
          <p>O snack salgado que acompanha sua rotina sem complicar.</p>
        </div>
      )}
    </>
  )
}
