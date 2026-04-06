/**
 * ProductDetailPage – Full product view with large image, details, add to cart
 */
import { useState, useEffect } from 'react';
import { ShoppingBag, ArrowLeft, Star, Shield, Truck, RefreshCw } from 'lucide-react';
import { fetchProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import './ProductDetailPage.css';

function ProductDetailPage({ productId, onNavigate }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [added,   setAdded]   = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    if (!productId) return;
    setLoading(true);
    setError(null);
    fetchProductById(productId)
      .then(data => setProduct(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [productId]);

  const handleAdd = () => {
    if (!product) return;
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <main className="detail-page page" id="main-content">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="detail-breadcrumb" aria-label="Breadcrumb">
          <button className="detail-back" onClick={() => onNavigate('products')} aria-label="Back to products">
            <ArrowLeft size={15} />
            Back to collection
          </button>
        </nav>

        {/* Loading */}
        {loading && (
          <div className="detail-skeleton">
            <div className="skeleton detail-skeleton__img" />
            <div className="detail-skeleton__info">
              <div className="skeleton" style={{ height: 14, width: '35%' }} />
              <div className="skeleton" style={{ height: 28, width: '80%', marginTop: 12 }} />
              <div className="skeleton" style={{ height: 20, width: '25%', marginTop: 16 }} />
              <div className="skeleton" style={{ height: 80, marginTop: 24 }} />
              <div className="skeleton" style={{ height: 48, borderRadius: 4, marginTop: 32 }} />
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="state-wrap" role="alert">
            <RefreshCw size={32} className="state-icon" />
            <h2 className="state-title">Product not found</h2>
            <p className="state-desc">{error}</p>
            <button className="btn btn-gold" onClick={() => onNavigate('products')}>
              Back to collection
            </button>
          </div>
        )}

        {/* Content */}
        {!loading && !error && product && (
          <div className="detail-layout">
            {/* Image */}
            <div className="detail-img-col">
              <div className="detail-img-frame">
                <img
                  src={product.image}
                  alt={product.title}
                  className="detail-img"
                  loading="eager"
                />
              </div>
            </div>

            {/* Info */}
            <div className="detail-info-col">
              <span className="detail-category">{product.category}</span>
              <h1 className="detail-title">{product.title}</h1>

              {/* Rating */}
              {product.rating && (
                <div className="detail-rating">
                  <div className="detail-stars" aria-hidden="true">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < Math.round(product.rating.rate) ? 'currentColor' : 'none'}
                        className={i < Math.round(product.rating.rate) ? 'star--filled' : 'star--empty'}
                      />
                    ))}
                  </div>
                  <span className="detail-rating-text">
                    {product.rating.rate} · {product.rating.count} reviews
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="detail-price-row">
                <span className="detail-price">${product.price.toFixed(2)}</span>
                <span className="badge badge-gold">In Stock</span>
              </div>

              <div className="detail-divider" />

              {/* Description */}
              <p className="detail-desc">{product.description}</p>

              <div className="detail-divider" />

              {/* Add to cart */}
              <div className="detail-actions">
                <button
                  id="add-to-cart-btn"
                  className={`btn btn-lg detail-add-btn ${added ? 'detail-add-btn--added' : 'btn-gold'}`}
                  onClick={handleAdd}
                  aria-label={added ? 'Added to cart' : `Add ${product.title} to cart`}
                >
                  <ShoppingBag size={18} />
                  {added ? 'Added to Cart!' : 'Add to Cart'}
                </button>
              </div>

              {/* Trust badges */}
              <div className="detail-trust">
                {[
                  { icon: Shield, text: 'Authenticity guaranteed' },
                  { icon: Truck,  text: 'Free shipping over $50' },
                  { icon: RefreshCw, text: '30-day free returns' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="detail-trust__item">
                    <Icon size={14} className="detail-trust__icon" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default ProductDetailPage;
