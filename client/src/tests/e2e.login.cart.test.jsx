import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import App from '../App';

const MOCK_PRODUCTS = [
  { id: 101, title: 'Classic Solitaire Diamond Ring', price: 299.99, category: 'rings', image: 'https://example.com/ring.jpg', rating: { rate: 4.8, count: 312 }, description: 'A timeless diamond ring.' },
  { id: 201, title: 'Diamond Tennis Necklace', price: 699.00, category: 'necklaces', image: 'https://example.com/necklace.jpg', rating: { rate: 4.9, count: 201 }, description: 'Brilliant diamonds on a chain.' },
];

beforeAll(() => {
  global.fetch = vi.fn((url) => {
    if (String(url).includes('/auth/login')) {
      return Promise.resolve({
        ok: true,
        json: async () => ({ token: 'mock-jwt-token-e2e' }),
      });
    }
    if (String(url).includes('/products')) {
      return Promise.resolve({
        ok: true,
        json: async () => MOCK_PRODUCTS,
      });
    }
    return Promise.resolve({ ok: true, json: async () => [] });
  });
  localStorage.clear();
});

afterAll(() => {
  vi.restoreAllMocks();
  localStorage.clear();
});

describe('App – Smoke', () => {
  it('renders without crashing', () => {
    expect(() => render(<App />)).not.toThrow();
  });

  it('displays SELLORA brand text in navigation', () => {
    const { unmount } = render(<App />);
    const brandEls = screen.getAllByText(/SELLORA/i);
    expect(brandEls.length).toBeGreaterThan(0);
    unmount();
  });

  it('shows cart icon in navbar', () => {
    const { unmount } = render(<App />);
    const cartBtn = screen.getByLabelText(/Cart/i);
    expect(cartBtn).toBeInTheDocument();
    unmount();
  });
});

describe('Login Flow', () => {
  it('navigates to login page when sign-in icon clicked', async () => {
    const { unmount } = render(<App />);
    const loginBtn = screen.getByLabelText('Sign in');
    fireEvent.click(loginBtn);
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Sign in to Sellora/i })).toBeInTheDocument();
    });
    unmount();
  });

  it('login form has username and password fields', async () => {
    const { unmount } = render(<App />);
    fireEvent.click(screen.getByLabelText('Sign in'));
    await waitFor(() => {
      expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    });
    unmount();
  });

  it('submits login and redirects on success', async () => {
    const { unmount } = render(<App />);

    fireEvent.click(screen.getByLabelText('Sign in'));
    await waitFor(() => screen.getByLabelText(/Username/i));

    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'johnd' } });
    fireEvent.change(screen.getByLabelText(/Password/i, { selector: 'input' }), { target: { value: 'm38hmF$' } });

    await act(async () => {
      fireEvent.submit(screen.getByRole('form', { name: '' }) || document.getElementById('login-form'));
    });

    await waitFor(() => {
      expect(localStorage.getItem('sellora_token')).toBe('mock-jwt-token-e2e');
    });
    unmount();
  });
});

describe('Add to Cart Flow', () => {
  it('cart starts empty', () => {
    const { unmount } = render(<App />);
    const cartBtn = screen.getByLabelText(/Cart \(0 items\)/i);
    expect(cartBtn).toBeInTheDocument();
    unmount();
  });

  it('products page shows product grid after loading', async () => {
    const { unmount } = render(<App />);
    const shopBtn = screen.getByText(/Shop the Collection/i);
    if (shopBtn) fireEvent.click(shopBtn);

    await waitFor(
      () => {
        const titles = screen.queryAllByText(/Diamond/i);
        expect(titles.length).toBeGreaterThan(0);
      },
      { timeout: 3000 },
    );
    unmount();
  });
});
