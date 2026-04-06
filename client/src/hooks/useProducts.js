/**
 * useProducts – Fetch jewelry from FakeStore API with loading/error state
 */
import { useState, useEffect, useCallback } from 'react';
import { fetchJewelry } from '../services/api';

export function useProducts() {
  const [products, setProducts]   = useState([]);
  const [loading,  setLoading]    = useState(true);
  const [error,    setError]      = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchJewelry();
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Could not load products.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return { products, loading, error, retry: load };
}
