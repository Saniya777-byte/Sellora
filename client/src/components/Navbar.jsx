/**
 * Navbar – Sticky header with logo, nav links, icons
 */
import { useState, useEffect } from 'react';
import { ShoppingBag, User, Search, Menu, X, Diamond } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar({ currentPage, onNavigate }) {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal,  setSearchVal]  = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nav = (page, opts) => { onNavigate(page, opts); setMenuOpen(false); };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      nav('products', { search: searchVal.trim() });
      setSearchOpen(false);
      setSearchVal('');
    }
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
      {/* Top strip */}
      <div className="navbar__strip">
        <span>Free delivery on all orders above ₹2,999</span>
      </div>

      <nav className="navbar__main container" aria-label="Main navigation">
        {/* Mobile hamburger */}
        <button
          id="nav-hamburger"
          className="navbar__hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Logo */}
        <button id="nav-logo" className="navbar__logo" onClick={() => nav('home')} aria-label="Sellora home">
          <Diamond size={16} className="navbar__logo-icon" />
          <span className="navbar__logo-text">SELLORA</span>
        </button>

        {/* Desktop links */}
        <ul className="navbar__links" role="list">
          {[
            { label: 'Home',     page: 'home' },
            { label: 'Jewelry',  page: 'products' },
          ].map(link => (
            <li key={link.page}>
              <button
                id={`nav-${link.page}`}
                className={`navbar__link ${currentPage === link.page ? 'navbar__link--active' : ''}`}
                onClick={() => nav(link.page)}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Icon actions */}
        <div className="navbar__actions">
          {/* Search */}
          <button
            id="nav-search"
            className="navbar__icon-btn"
            onClick={() => setSearchOpen(o => !o)}
            aria-label="Search"
          >
            <Search size={18} />
          </button>

          {/* User */}
          {user ? (
            <button
              id="nav-user"
              className="navbar__icon-btn"
              onClick={logout}
              aria-label={`Sign out ${user.username}`}
              title={`Signed in as ${user.username} – click to sign out`}
            >
              <User size={18} />
            </button>
          ) : (
            <button
              id="nav-login"
              className="navbar__icon-btn"
              onClick={() => nav('login')}
              aria-label="Sign in"
            >
              <User size={18} />
            </button>
          )}

          {/* Cart */}
          <button
            id="nav-cart"
            className="navbar__icon-btn navbar__cart-btn"
            onClick={() => nav('cart')}
            aria-label={`Cart (${totalItems} items)`}
          >
            <ShoppingBag size={18} />
            {totalItems > 0 && (
              <span className="navbar__cart-count" aria-hidden="true">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Search bar dropdown */}
      {searchOpen && (
        <div className="navbar__search-bar container">
          <form onSubmit={handleSearch} className="navbar__search-form" role="search">
            <Search size={16} className="navbar__search-icon" />
            <input
              id="search-input"
              type="search"
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              placeholder="Search jewelry…"
              className="navbar__search-input"
              autoFocus
              aria-label="Search products"
            />
            <button type="submit" className="btn btn-gold btn-sm">Go</button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setSearchOpen(false)}>
              <X size={15} />
            </button>
          </form>
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div className="navbar__mobile-menu">
          {[
            { label: 'Home',     page: 'home' },
            { label: 'Jewelry',  page: 'products' },
            { label: 'Cart',     page: 'cart' },
            ...(user
              ? [{ label: 'Sign Out', page: null, action: logout }]
              : [{ label: 'Sign In',  page: 'login' }])
          ].map((item, i) => (
            <button
              key={i}
              className={`navbar__mobile-link ${currentPage === item.page ? 'navbar__mobile-link--active' : ''}`}
              onClick={() => item.action ? (item.action(), setMenuOpen(false)) : nav(item.page)}
            >
              {item.label}
              {item.page === 'cart' && totalItems > 0 && (
                <span className="navbar__cart-count">{totalItems}</span>
              )}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

export default Navbar;
