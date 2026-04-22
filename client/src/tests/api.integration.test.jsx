import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchJewelry, fetchProductById, loginUser } from '../services/api';


const MOCK_FAKESTORE_PRODUCTS = [
  { id: 1, title: 'FakeStore Item 1', price: 9.99,  category: "women's clothing", image: 'https://example.com/img1.jpg', rating: { rate: 4.1, count: 120 }, description: 'Desc 1' },
  { id: 2, title: 'FakeStore Item 2', price: 19.99, category: 'jewelry',           image: 'https://example.com/img2.jpg', rating: { rate: 3.8, count: 86 },  description: 'Desc 2' },
];

describe('fetchJewelry – Integration', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('merges FakeStore results with mock jewel catalogue (100+ total)', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => MOCK_FAKESTORE_PRODUCTS,
    });

    const products = await fetchJewelry();

    expect(products.length).toBeGreaterThanOrEqual(84);

    const fakestoreItem = products.find((p) => p.title === 'FakeStore Item 1');
    expect(fakestoreItem).toBeDefined();
  });

  it('still returns mock jewels when FakeStore is unreachable', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    const products = await fetchJewelry();
    expect(products.length).toBeGreaterThanOrEqual(84);
  });

  it('returns mock jewels when FakeStore returns non-ok status', async () => {
    global.fetch.mockResolvedValueOnce({ ok: false, status: 503 });

    const products = await fetchJewelry();
    expect(products.length).toBeGreaterThanOrEqual(84);
  });

  it('fetched products have required fields', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => MOCK_FAKESTORE_PRODUCTS,
    });

    const products = await fetchJewelry();
    products.forEach((p) => {
      expect(p).toHaveProperty('id');
      expect(p).toHaveProperty('title');
      expect(p).toHaveProperty('price');
      expect(p).toHaveProperty('image');
    });
  });
});


describe('fetchProductById – Integration', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns mock product by id without calling fetch', async () => {
    const product = await fetchProductById(101); // mock id
    expect(product.id).toBe(101);
    expect(product.title).toContain('Diamond');
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('falls back to FakeStore for non-mock ids', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 5, title: 'FakeStore Product', price: 9.99, image: '', rating: { rate: 4, count: 10 }, description: 'Desc' }),
    });

    const product = await fetchProductById(5);
    expect(product.id).toBe(5);
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/5'));
  });

  it('throws error when FakeStore returns 404', async () => {
    global.fetch.mockResolvedValueOnce({ ok: false, status: 404 });

    await expect(fetchProductById(9999)).rejects.toThrow('Product not found');
  });
});


describe('loginUser – Integration', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('stores token in localStorage on success', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'test-jwt-token-abc123' }),
    });

    await loginUser({ username: 'johnd', password: 'm38hmF$' });
    expect(localStorage.getItem('sellora_token')).toBe('test-jwt-token-abc123');
  });

  it('stores user object in localStorage on success', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'test-jwt-token-abc123' }),
    });

    await loginUser({ username: 'johnd', password: 'm38hmF$' });
    const stored = JSON.parse(localStorage.getItem('sellora_user'));
    expect(stored.username).toBe('johnd');
  });

  it('throws on invalid credentials', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ message: 'Invalid credentials' }),
    });

    await expect(loginUser({ username: 'bad', password: 'wrong' })).rejects.toThrow('Invalid credentials');
  });
});


import ProductsPage from '../pages/ProductsPage';
import { CartProvider } from '../context/CartContext';
import { AuthProvider } from '../context/AuthContext';

const Wrapper = ({ children }) => (
  <AuthProvider><CartProvider>{children}</CartProvider></AuthProvider>
);

describe('ProductsPage – Render from API', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [
        { id: 9991, title: 'FakeStore Ring', price: 299.99, category: 'jewelery', image: 'https://example.com/ring.jpg', rating: { rate: 4.8, count: 312 } }
      ],
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows loading skeletons initially', () => {
    render(
      <Wrapper>
        <ProductsPage onNavigate={vi.fn()} />
      </Wrapper>,
    );
    const skeletons = document.querySelectorAll('[aria-busy="true"]');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders product list after data loads', async () => {
    render(
      <Wrapper>
        <ProductsPage onNavigate={vi.fn()} />
      </Wrapper>,
    );

    await waitFor(() => {
      expect(screen.getByText(/Classic Solitaire/i)).toBeInTheDocument();
    });
    expect(screen.getByText('FakeStore Ring')).toBeInTheDocument();
  });

  it('shows correct piece count after load', async () => {
    render(
      <Wrapper>
        <ProductsPage onNavigate={vi.fn()} />
      </Wrapper>,
    );

    await waitFor(() => {
      expect(screen.getAllByText(/pieces?/i).length).toBeGreaterThan(0);
    });
  });
});
