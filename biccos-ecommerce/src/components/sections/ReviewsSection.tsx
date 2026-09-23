import { reviews } from '../../data/reviews'
import { Rating } from '../shop/Rating'

export function ReviewsSection() {
  return (
    <section className="reviews-section section" data-reveal>
      <div className="container">
        <div className="reviews-heading">
          <div>
            <span className="section-kicker">Avaliações</span>
            <h2 className="section-title">A opinião de quem <em>já provou.</em></h2>
          </div>
          <div className="reviews-summary">
            <strong>4.9</strong>
            <Rating value={4.9} />
            <span>+240 avaliações ilustrativas</span>
          </div>
        </div>
        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <article className={`review-card review-card--${index + 1}`} data-reveal data-reveal-delay={index + 1} key={review.id}>
              <div className="review-card__top"><Rating value={review.rating} /><span>“</span></div>
              <h3>{review.title}</h3>
              <p>{review.body}</p>
              <footer>
                <span className="review-card__avatar">{review.initials}</span>
                <span><strong>{review.author}</strong><small>{review.role} · {review.product}</small></span>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
