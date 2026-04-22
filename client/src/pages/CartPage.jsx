import { Trash2, ShoppingBag, ArrowRight, Plus, Minus, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './CartPage.css';

function CartItem({ item, onIncrement, onDecrement, onRemove }) {
  const { id, title, price, image, qty } = item;
  return (
    <div className="cart-item" data-testid="cart-item">
      {/* Thumbnail */}
      <div className="cart-item__img-wrap">
        <img src={image} alt={title} className="cart-item__img" loading="lazy" />
      </div>

      {/* Info */}
      <div className="cart-item__info">
        <h3 className="cart-item__name">{title}</h3>
        <span className="cart-item__price-unit">${price.toFixed(2)} each</span>
      </div>

      {/* Qty controls */}
      <div className="cart-item__qty-ctrl">
        <button
          id={`decrement-${id}`}
          className="cart-item__qty-btn"
          onClick={() => onDecrement(id)}
          aria-label="Decrease quantity"
          disabled={qty <= 1}
        >
          <Minus size={13} />
        </button>
        <span className="cart-item__qty" aria-label={`Quantity: ${qty}`}>{qty}</span>
        <button
          id={`increment-${id}`}
          className="cart-item__qty-btn"
          onClick={() => onIncrement(id)}
          aria-label="Increase quantity"
        >
          <Plus size={13} />
        </button>
      </div>

      {/* Line total */}
      <span className="cart-item__total">${(price * qty).toFixed(2)}</span>

      {/* Remove */}
      <button
        id={`remove-${id}`}
        data-testid={`remove-${id}`}
        className="cart-item__remove"
        onClick={() => onRemove(id)}
        aria-label={`Remove ${title}`}
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}

function CartPage({ onNavigate }) {
  const { items, removeItem, increment, decrement, totalItems, totalPrice, clearCart } = useCart();

  const shipping   = totalPrice >= 50 ? 0 : 9.99;
  const orderTotal = totalPrice + shipping;

  if (items.length === 0) {
    return (
      <main className="cart-page page" id="main-content">
        <div className="container">
          <div className="state-wrap" style={{ minHeight: '65vh' }}>
            <ShoppingBag size={40} className="state-icon" />
            <h1 className="state-title">Your bag is empty</h1>
            <p className="state-desc">
              Discover our collection of fine jewelry and find your perfect piece.
            </p>
            <button id="cart-browse-btn" className="btn btn-gold btn-lg" onClick={() => onNavigate('products')}>
              Continue Shopping <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page page" id="main-content">
      <div className="container">
        <div className="cart-page__header section">
          <h1 className="section-heading">Shopping Bag</h1>
          <p className="section-sub">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
          <div className="section-divider" />
        </div>

        <div className="cart-layout">
          {/* Items column */}
          <div className="cart-items-col">
            <div className="cart-cols-header">
              <span>Product</span>
              <span className="cart-cols-center">Quantity</span>
              <span className="cart-cols-right">Total</span>
            </div>

            <div className="cart-items-list" role="list" aria-label="Cart items">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrement={increment}
                  onDecrement={decrement}
                  onRemove={removeItem}
                />
              ))}
            </div>

            <div className="cart-items-footer">
              <button
                id="continue-shopping-btn"
                className="btn btn-ghost"
                onClick={() => onNavigate('products')}
              >
                <ArrowRight size={14} style={{ transform: 'rotate(180deg)' }} />
                Continue Shopping
              </button>
              <button
                id="clear-cart-btn"
                className="btn btn-outline btn-sm"
                onClick={clearCart}
              >
                Clear Bag
              </button>
            </div>
          </div>

          {/* Summary sidebar */}
          <aside className="cart-summary" aria-label="Order summary">
            <div className="cart-summary__card">
              <h2 className="cart-summary__title">Order Summary</h2>

              <div className="cart-summary__lines">
                <div className="cart-summary__line">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="cart-summary__line">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <span className="cart-summary__free">Free</span> : `$${shipping.toFixed(2)}`}</span>
                </div>
                {shipping > 0 && (
                  <p className="cart-summary__shipping-note">
                    Add ${(50 - totalPrice).toFixed(2)} more for free shipping
                  </p>
                )}
              </div>

              <div className="cart-summary__divider" />

              <div className="cart-summary__total">
                <span>Total</span>
                <span className="cart-summary__total-val">${orderTotal.toFixed(2)}</span>
              </div>

              <button id="checkout-btn" className="btn btn-gold btn-lg cart-summary__checkout">
                Proceed to Checkout
                <ArrowRight size={16} />
              </button>

              <div className="cart-summary__trust">
                <Lock size={13} />
                <span>Secure &amp; Encrypted Checkout</span>
              </div>
            </div>

            {/* Promo */}
            <div className="cart-promo">
              <label htmlFor="promo-input" className="cart-promo__label">Gift Card or Promo Code</label>
              <div className="cart-promo__row">
                <input
                  id="promo-input"
                  type="text"
                  className="form-input"
                  placeholder="Enter code"
                />
                <button id="apply-promo-btn" className="btn btn-outline btn-sm">Apply</button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default CartPage;
