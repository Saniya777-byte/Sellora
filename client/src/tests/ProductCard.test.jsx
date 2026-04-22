import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProductCard, { ProductCardSkeleton } from '../components/ProductCard';

const mockAddItem = vi.fn();
vi.mock('../context/CartContext', () => ({
  useCart: () => ({ addItem: mockAddItem }),
}));

const MOCK_PRODUCT = {
  id: 1,
  title: 'Gold Petite Micropave Ring',
  price: 9.99,
  category: 'jewelery',
  description: 'Elegant gold ring with micro-pave setting.',
  image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
  rating: { rate: 3.9, count: 70 },
};

describe('ProductCardSkeleton', () => {
  it('renders with aria-busy=true', () => {
    const { container } = render(<ProductCardSkeleton />);
    const el = container.querySelector('[aria-busy="true"]');
    expect(el).toBeInTheDocument();
  });

  it('has "Loading product" aria-label', () => {
    render(<ProductCardSkeleton />);
    expect(screen.getByLabelText('Loading product')).toBeInTheDocument();
  });

  it('renders skeleton shimmer elements', () => {
    const { container } = render(<ProductCardSkeleton />);
    const skeletons = container.querySelectorAll('.skeleton');
    expect(skeletons.length).toBeGreaterThan(0);
  });
});

describe('ProductCard – Rendering', () => {
  it('renders product title', () => {
    render(<ProductCard product={MOCK_PRODUCT} />);
    expect(screen.getByText('Gold Petite Micropave Ring')).toBeInTheDocument();
  });

  it('renders formatted price', () => {
    render(<ProductCard product={MOCK_PRODUCT} />);
    expect(screen.getByText('$9.99')).toBeInTheDocument();
  });

  it('renders category label', () => {
    render(<ProductCard product={MOCK_PRODUCT} />);
    expect(screen.getByText('jewelery')).toBeInTheDocument();
  });

  it('renders product image with correct alt text', () => {
    render(<ProductCard product={MOCK_PRODUCT} />);
    const img = screen.getByAltText('Gold Petite Micropave Ring');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', MOCK_PRODUCT.image);
  });

  it('renders image with lazy loading', () => {
    render(<ProductCard product={MOCK_PRODUCT} />);
    const img = screen.getByAltText('Gold Petite Micropave Ring');
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  it('renders rating aria-label', () => {
    render(<ProductCard product={MOCK_PRODUCT} />);
    expect(screen.getByLabelText(/Rated 3.9 out of 5/i)).toBeInTheDocument();
  });

  it('renders review count', () => {
    render(<ProductCard product={MOCK_PRODUCT} />);
    expect(screen.getByText('(70)')).toBeInTheDocument();
  });

  it('renders add-to-cart button(s)', () => {
    render(<ProductCard product={MOCK_PRODUCT} />);
    const buttons = screen.getAllByLabelText(/Add Gold Petite Micropave Ring to cart/i);
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });

  it('returns null when no product is passed', () => {
    const { container } = render(<ProductCard />);
    expect(container.firstChild).toBeNull();
  });

  it('renders article element with aria-label of product title', () => {
    render(<ProductCard product={MOCK_PRODUCT} />);
    const article = screen.getByRole('article');
    expect(article).toHaveAttribute('aria-label', 'Gold Petite Micropave Ring');
  });
});

describe('ProductCard – Interactions', () => {
  beforeEach(() => {
    mockAddItem.mockClear();
  });

  it('calls addItem when add-to-cart icon button clicked', () => {
    render(<ProductCard product={MOCK_PRODUCT} />);
    const btns = screen.getAllByRole('button', { name: /Add Gold Petite Micropave Ring to cart/i });
    fireEvent.click(btns[0]);
    expect(mockAddItem).toHaveBeenCalledWith(MOCK_PRODUCT);
  });

  it('calls onNavigate with product page when card article clicked', () => {
    const mockNav = vi.fn();
    render(<ProductCard product={MOCK_PRODUCT} onNavigate={mockNav} />);
    const article = screen.getByRole('article');
    fireEvent.click(article);
    expect(mockNav).toHaveBeenCalledWith('product', { id: MOCK_PRODUCT.id });
  });

  it('does not propagate click from Add button to card', () => {
    const mockNav = vi.fn();
    render(<ProductCard product={MOCK_PRODUCT} onNavigate={mockNav} />);
    const btns = screen.getAllByRole('button', { name: /Add Gold Petite Micropave Ring to cart/i });
    fireEvent.click(btns[0]);
    expect(mockNav).not.toHaveBeenCalled();
    expect(mockAddItem).toHaveBeenCalled();
  });

  it('passes correct product object to addItem', () => {
    render(<ProductCard product={MOCK_PRODUCT} />);
    const btns = screen.getAllByRole('button', { name: /Add Gold Petite Micropave Ring to cart/i });
    fireEvent.click(btns[0]);
    expect(mockAddItem).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        title: 'Gold Petite Micropave Ring',
        price: 9.99,
      }),
    );
  });
});

describe('ProductCard – Star Rating', () => {
  it('renders 5 star elements', () => {
    const { container } = render(<ProductCard product={MOCK_PRODUCT} />);
    const stars = container.querySelectorAll('.product-card__stars svg');
    expect(stars).toHaveLength(5);
  });

  it('renders correct filled star count for rating 3.9 (rounds to 4)', () => {
    const { container } = render(<ProductCard product={MOCK_PRODUCT} />);
    const filled = container.querySelectorAll('.star--filled');
    expect(filled.length).toBe(4); // Math.round(3.9) = 4
  });
});

describe('ProductCard – Edge Cases', () => {
  it('renders without rating gracefully', () => {
    const noRating = { ...MOCK_PRODUCT, rating: undefined };
    render(<ProductCard product={noRating} />);
    expect(screen.getByText('Gold Petite Micropave Ring')).toBeInTheDocument();
    expect(screen.queryByLabelText(/Rated/i)).not.toBeInTheDocument();
  });

  it('handles very long title without crashing', () => {
    const longTitle = { ...MOCK_PRODUCT, title: 'A '.repeat(50).trim() };
    expect(() => render(<ProductCard product={longTitle} />)).not.toThrow();
  });

  it('renders without onNavigate prop without crashing', () => {
    expect(() => render(<ProductCard product={MOCK_PRODUCT} />)).not.toThrow();
  });

  it('renders zero price correctly', () => {
    const freeProduct = { ...MOCK_PRODUCT, price: 0 };
    render(<ProductCard product={freeProduct} />);
    expect(screen.getByText('$0.00')).toBeInTheDocument();
  });
});
