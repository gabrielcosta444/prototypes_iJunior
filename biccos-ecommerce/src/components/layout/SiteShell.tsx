import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { CartDrawer } from '../shop/CartDrawer'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export function SiteShell() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <ScrollToTop />
      <SiteHeader />
      <main className="site-main" id="conteudo"><Outlet /></main>
      <SiteFooter />
      <CartDrawer />
    </>
  )
}
