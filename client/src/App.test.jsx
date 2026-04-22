import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll } from 'vitest';

beforeAll(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    })
  );
});

import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    expect(() => render(<App />)).not.toThrow();
  });

  it('displays SELLORA brand text', () => {
    render(<App />);
    const brandEls = screen.getAllByText(/SELLORA/i);
    expect(brandEls.length).toBeGreaterThan(0);
  });
});
