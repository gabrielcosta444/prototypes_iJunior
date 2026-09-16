import { ArrowLeft, Check, PackageCheck, ShieldCheck, ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ComparisonTable } from '../components/sections/ComparisonTable'
import { ReviewsSection } from '../components/sections/ReviewsSection'
import { ProductAccordion } from '../components/shop/ProductAccordion'
import { ProductGrid } from '../components/shop/ProductGrid'
import { QuantityControl } from '../components/shop/QuantityControl'
import { Rating } from '../components/shop/Rating'
import { ShippingCalculator } from '../components/shop/ShippingCalculator'
import { products, getProductBySlug } from '../data/products'
import { useShop } from '../store/ShopContext'
import { NotFoundPage } from './NotFoundPage'

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export function ProductPage() {
  const { slug = '' } = useParams()
  const product = getProductBySlug(slug)
  const { addItem } = useShop()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  if (!product) return <NotFoundPage product />

  const siblingFlavors = products.filter((item) => item.category === 'sabor')
  const related = products.filter((item) => item.slug !== product.slug).slice(0, 3)

  function handleAdd() {
    addItem(product!.slug, quantity)
  }

  return (
    <>
      <section className={`product-detail theme-${product.theme}`}>
        <div className="container product-detail__breadcrumbs">
          <Link to="/produtos"><ArrowLeft size={15} /> Produtos</Link><span>/</span><span>{product.flavor}</span>
        </div>
        <div className="container product-detail__grid">
          <div className="product-gallery">
            <div className="product-gallery__main">
              <div className="product-gallery__badges">{product.badges.map((badge) => <span className="badge" key={badge}>{badge}</span>)}</div>
              <img src={product.gallery[selectedImage]} alt={`${product.name} — visual ${selectedImage + 1}`} />
              <span className="product-gallery__note">imagem de referência do brand book</span>
            </div>
            <div className="product-gallery__thumbs" aria-label="Galeria do produto">
              {product.gallery.map((image, index) => (
                <button
                  className={selectedImage === index ? 'is-active' : ''}
                  aria-label={`Mostrar visual ${index + 1} de ${product.name}`}
                  aria-pressed={selectedImage === index}
                  key={image}
                  onClick={() => setSelectedImage(index)}
                ><img src={image} alt="" /></button>
              ))}
            </div>
          </div>

          <div className="product-purchase">
            <span className="eyebrow">{product.eyebrow}</span>
            <h1>{product.name}</h1>
            <Rating value={product.rating} count={product.reviewCount} />
            <p className="product-purchase__description">{product.longDescription}</p>

            {product.category === 'sabor' && (
              <div className="flavor-selector">
                <span className="flavor-selector__label">Escolha o sabor: <strong>{product.flavor}</strong></span>
                <div>
                  {siblingFlavors.map((flavor) => (
                    <Link
                      className={`flavor-swatch theme-${flavor.theme}${flavor.slug === product.slug ? ' is-active' : ''}`}
                      aria-label={flavor.flavor}
                      aria-current={flavor.slug === product.slug ? 'true' : undefined}
                      to={`/produto/${flavor.slug}`}
                      key={flavor.slug}
                    ><span style={{ background: 'var(--theme)' }} />{flavor.flavor}</Link>
                  ))}
                </div>
              </div>
            )}

            <div className="product-purchase__price">
              <div>
                {product.compareAtPrice && <s>{currency.format(product.compareAtPrice)}</s>}
                <strong>{currency.format(product.price)}</strong>
                <span>ou 3x de {currency.format(product.price / 3)} sem juros*</span>
              </div>
              <span className="stock-pill"><i /> em estoque</span>
            </div>
            <div className="product-purchase__actions">
              <QuantityControl value={quantity} onChange={setQuantity} label={product.name} />
              <button className="button button--dark product-add" onClick={handleAdd} aria-label={`Adicionar ${quantity} ${product.name} à sacola`}>
                <ShoppingBag size={18} /> Adicionar à sacola
              </button>
            </div>
            <ShippingCalculator />
            <div className="purchase-trust">
              <span><ShieldCheck /> Compra segura</span>
              <span><PackageCheck /> Envio nacional*</span>
            </div>

            <div className="product-accordions">
              <ProductAccordion title="Por que você vai amar" open><p>{product.longDescription}</p><ul><li>Textura crocante e tempero marcante</li><li>Pacote prático para levar</li><li>Uma alternativa salgada para a rotina</li></ul></ProductAccordion>
              <ProductAccordion title="Ingredientes"><p>{product.ingredients}</p><small>Lista demonstrativa; consulte o rótulo final para alergênicos e composição oficial.</small></ProductAccordion>
              <ProductAccordion title="Informação nutricional"><div className="nutrition-mini">{product.facts.map((fact) => <span key={fact.label}><strong>{fact.value}</strong>{fact.label}</span>)}</div><small>*Valores ilustrativos para validação de layout.</small></ProductAccordion>
            </div>
          </div>
        </div>
      </section>

      <section className="product-facts-strip">
        <div className="container">
          {product.facts.map((fact, index) => <div key={fact.label}><span>0{index + 1}</span><strong>{fact.value}</strong><p>{fact.label}</p></div>)}
        </div>
      </section>

      <section className="product-story section">
        <div className="container product-story__grid">
          <div>
            <span className="section-kicker">Abriu. Fez crec.</span>
            <h2>Snack simples, presença gigante.</h2>
            <p>Um ingrediente conhecido ganha outra textura quando encontra azeite, calor e uma boa mistura de temperos.</p>
            <ul><li><Check /> pronto para comer</li><li><Check /> fácil de levar</li><li><Check /> cinco sabores</li></ul>
          </div>
          <div className="product-story__image"><img src="/assets/biccos-purple-pack.png" alt="Pacote Bicco's em destaque" /></div>
        </div>
      </section>

      <ComparisonTable />
      <ReviewsSection />

      <section className="related-section section">
        <div className="container">
          <span className="section-kicker">Continue crocando</span>
          <h2 className="section-title">Você também pode gostar.</h2>
          <ProductGrid products={related} />
        </div>
      </section>

      <div className="mobile-purchase-bar">
        <div><span>{product.name}</span><strong>{currency.format(product.price)}</strong></div>
        <button onClick={handleAdd}>Adicionar</button>
      </div>
    </>
  )
}
