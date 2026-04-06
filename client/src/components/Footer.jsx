/**
 * Footer component
 */
import { Diamond } from 'lucide-react';
import './Footer.css';

// Inline SVGs for brand icons (removed from lucide-react)
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const COL_LINKS = {
  'Collections': ['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Sets'],
  'Company':     ['Our Story', 'Craftsmanship', 'Blog', 'Careers'],
  'Help':        ['Sizing Guide', 'Returns & Exchanges', 'Shipping', 'Contact Us'],
};

function Footer({ onNavigate }) {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__top container">
        {/* Brand */}
        <div className="footer__brand-col">
          <button className="footer__logo" onClick={() => onNavigate?.('home')}>
            <Diamond size={14} className="footer__logo-icon" />
            <span>SELLORA</span>
          </button>
          <p className="footer__tagline">
            Timeless jewelry crafted for every milestone. Wear your story.
          </p>
          <div className="footer__socials">
            <a href="#" aria-label="Instagram" className="footer__social-link" onClick={e => e.preventDefault()}>
              <InstagramIcon />
            </a>
            <a href="#" aria-label="Twitter" className="footer__social-link" onClick={e => e.preventDefault()}>
              <TwitterIcon />
            </a>
            <a href="#" aria-label="Facebook" className="footer__social-link" onClick={e => e.preventDefault()}>
              <FacebookIcon />
            </a>
          </div>
        </div>

        {/* Links */}
        {Object.entries(COL_LINKS).map(([title, links]) => (
          <div key={title} className="footer__link-col">
            <h4 className="footer__col-title">{title}</h4>
            <ul>
              {links.map(l => (
                <li key={l}><a href="#" className="footer__link" onClick={e => e.preventDefault()}>{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer__bottom container">
        <p>© {new Date().getFullYear()} Sellora Jewelry. All rights reserved.</p>
        <div className="footer__bottom-links">
          {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(l => (
            <a key={l} href="#" className="footer__bottom-link" onClick={e => e.preventDefault()}>{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
