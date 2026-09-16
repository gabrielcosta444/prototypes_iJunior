import { Route, Routes } from 'react-router-dom'
import { SiteShell } from '../components/layout/SiteShell'
import { HomePage } from '../pages/HomePage'
import { CatalogPage } from '../pages/CatalogPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { ProductPage } from '../pages/ProductPage'
import { StoryPage } from '../pages/StoryPage'

export function App() {
  return (
    <Routes>
      <Route element={<SiteShell />}>
        <Route index element={<HomePage />} />
        <Route path="produtos" element={<CatalogPage />} />
        <Route path="produto/:slug" element={<ProductPage />} />
        <Route path="sobre" element={<StoryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
