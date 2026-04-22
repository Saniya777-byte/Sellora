import { Shield, Truck, RotateCcw, Package, ArrowRight, RefreshCw } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductCard, { ProductCardSkeleton } from '../components/ProductCard';
import './HomePage.css';

const HERO_WORDS = ['Timeless', 'Elegant', 'Forever'];

const TRUST_ITEMS = [
  { Icon: Shield, title: 'Authentic Jewelry',  desc: 'Certified genuine materials' },
  { Icon: Truck,  title: 'Free Shipping',       desc: 'On orders above $50' },
  { Icon: RotateCcw, title: 'Easy Returns',     desc: '30-day hassle-free returns' },
  { Icon: Package,   title: 'Secure Packaging', desc: 'Luxury gift-ready boxes' },
];

function HomePage({ onNavigate }) {
  const { products, loading, error, retry } = useProducts();
  const featured = products.slice(0, 4);

  return (
    <main className="home-page page" id="main-content">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero__inner container">
          <div className="hero__text">
            <p className="hero__eyebrow">New Collection 2025</p>
            <h1 id="hero-heading" className="hero__title">
              Fine Jewelry<br />
              <span className="hero__title-accent">Crafted for You</span>
            </h1>
            <p className="hero__subtitle">
              Discover handcrafted pieces that speak to your story. Each jewel is a work of art made to last a lifetime.
            </p>
            <div className="hero__cta-row">
              <button
                id="hero-shop-btn"
                className="btn btn-gold btn-lg"
                onClick={() => onNavigate('products')}
              >
                Shop the Collection
                <ArrowRight size={16} />
              </button>
              <button
                id="hero-story-btn"
                className="btn btn-outline btn-lg"
                onClick={() => onNavigate('products')}
              >
                Our Story
              </button>
            </div>
          </div>

          <div className="hero__visual" aria-hidden="true">
            <div className="hero__visual-ring">
              <img
                src="/hero-ring.png"
                alt="Fine jewelry hero piece"
                className="hero__visual-img"
              />
            </div>
            <div className="hero__visual-glow" />
            <div className="hero__feature-card hero__feature-card--a">
              <span className="hero__fc-label">Best Seller</span>
              <span className="hero__fc-value">Gold Ring</span>
            </div>
            <div className="hero__feature-card hero__feature-card--b">
              <span className="hero__fc-label">Crafted</span>
              <span className="hero__fc-value">925 Silver</span>
            </div>
          </div>
        </div>

        {/* Marquee strip */}
        <div className="hero__marquee" aria-hidden="true">
          <div className="hero__marquee-track">
            {[...HERO_WORDS, ...HERO_WORDS, ...HERO_WORDS, ...HERO_WORDS].map((w, i) => (
              <span key={i} className="hero__marquee-item">
                <span className="hero__marquee-dot" /> {w}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Bar ─────────────────────────────────────── */}
      <section className="trust-bar" aria-label="Why shop with us">
        <div className="container trust-bar__grid">
          {TRUST_ITEMS.map(({ Icon, title, desc }) => (
            <div key={title} className="trust-bar__item">
              <div className="trust-bar__icon-wrap">
                <Icon size={20} className="trust-bar__icon" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="trust-bar__title">{title}</h3>
                <p className="trust-bar__desc">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Products ──────────────────────────────── */}
      <section className="featured section" aria-labelledby="featured-heading">
        <div className="container">
          <div className="featured__header">
            <div>
              <p className="section-sub">Handpicked for you</p>
              <div className="section-divider" />
              <h2 id="featured-heading" className="section-heading">Featured Pieces</h2>
            </div>
            <button
              id="view-all-btn"
              className="btn btn-outline"
              onClick={() => onNavigate('products')}
            >
              View All <ArrowRight size={14} />
            </button>
          </div>

          {error && (
            <div className="state-wrap" role="alert">
              <RefreshCw size={32} className="state-icon" />
              <h3 className="state-title">Could not load products</h3>
              <p className="state-desc">{error}</p>
              <button id="retry-btn" className="btn btn-gold" onClick={retry}>Try Again</button>
            </div>
          )}

          {!error && (
            <div className="product-grid">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
                : featured.map((p) => (
                    <ProductCard key={p.id} product={p} onNavigate={onNavigate} />
                  ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Category Banner ───────────────────────────────── */}
      <section className="cat-banner section" aria-label="Browse categories">
        <div className="container">
          <div className="cat-banner__grid">
            {[
              { label: 'Rings',     bg: '#f8f4ee', cat: 'rings' },
              { label: 'Necklaces', bg: '#eef4f8', cat: 'necklaces' },
              { label: 'Earrings',  bg: '#f4eef8', cat: 'earrings' },
            ].map((item) => (
              <button
                key={item.label}
                id={`cat-${item.label.toLowerCase()}`}
                className="cat-banner__item"
                style={{ background: item.bg }}
                onClick={() => onNavigate('products')}
                aria-label={`Browse ${item.label}`}
              >
                <span className="cat-banner__label">{item.label}</span>
                <ArrowRight size={14} className="cat-banner__arrow" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ────────────────────────────────────── */}
      <section className="newsletter section" aria-label="Newsletter signup">
        <div className="container newsletter__inner">
          <div className="newsletter__text">
            <p className="section-sub">Stay in the loop</p>
            <h2 className="newsletter__title">Get early access to new collections</h2>
          </div>
          <form
            className="newsletter__form"
            onSubmit={(e) => e.preventDefault()}
            role="form"
            aria-label="Newsletter signup form"
          >
            <input
              id="newsletter-email"
              type="email"
              className="form-input newsletter__input"
              placeholder="Your email address"
              aria-label="Email address"
            />
            <button type="submit" className="btn btn-gold">Subscribe</button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
