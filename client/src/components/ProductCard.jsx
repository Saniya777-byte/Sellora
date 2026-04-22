import { ShoppingBag, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

export function ProductCardSkeleton() {
  return (
    <div className="product-card product-card--skeleton" aria-busy="true" aria-label="Loading product">
      <div className="skeleton product-card__img-area" />
      <div className="product-card__body">
        <div className="skeleton" style={{ height: 12, width: '50%' }} />
        <div className="skeleton" style={{ height: 18, width: '88%', marginTop: 8 }} />
        <div className="skeleton" style={{ height: 14, width: '40%', marginTop: 10 }} />
        <div className="skeleton" style={{ height: 38, borderRadius: 4, marginTop: 16 }} />
      </div>
    </div>
  );
}

function StarRating({ rate, count }) {
  const full = Math.round(rate);
  return (
    <div className="product-card__rating" aria-label={`Rated ${rate} out of 5 (${count} reviews)`}>
      <div className="product-card__stars" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            size={11}
            className={i < full ? 'star--filled' : 'star--empty'}
            fill={i < full ? 'currentColor' : 'none'}
          />
        ))}
      </div>
      <span className="product-card__review-count">({count})</span>
    </div>
  );
}

function ProductCard({ product, onNavigate }) {
  const { addItem } = useCart();

  if (!product) return null;

  const { id, title, price, image, rating, category } = product;

  const handleAdd = (e) => {
    e.stopPropagation();
    addItem(product);
  };

  return (
    <article
      className="product-card"
      data-testid="product-card"
      aria-label={title}
      onClick={() => onNavigate?.('product', { id })}
    >
      {/* Image */}
      <div className="product-card__img-area">
        <img
          src={image}
          alt={title}
          className="product-card__img"
          loading="lazy"
        />
        <div className="product-card__overlay">
          <button
            id={`quick-add-${id}`}
            data-testid={`quick-add-${id}`}
            className="btn btn-gold btn-sm product-card__quick-add"
            onClick={handleAdd}
            aria-label={`Add ${title} to cart`}
          >
            <ShoppingBag size={14} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="product-card__body">
        <span className="product-card__category">{category}</span>
        <h3 className="product-card__title">{title}</h3>
        {rating && <StarRating rate={rating.rate} count={rating.count} />}
        <div className="product-card__footer">
          <span className="product-card__price">${price.toFixed(2)}</span>
          <button
            id={`add-${id}`}
            data-testid={`add-to-cart-${id}`}
            className="product-card__add-icon"
            onClick={handleAdd}
            aria-label={`Add ${title} to cart`}
          >
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
