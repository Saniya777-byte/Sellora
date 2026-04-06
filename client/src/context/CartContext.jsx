/**
 * CartContext – global cart state via React Context
 */
import { createContext, useContext, useReducer, useCallback } from 'react';

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const exists = state.find(i => i.id === action.product.id);
      if (exists) {
        return state.map(i =>
          i.id === action.product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...state, { ...action.product, qty: 1 }];
    }
    case 'REMOVE':
      return state.filter(i => i.id !== action.id);
    case 'INCREMENT':
      return state.map(i => i.id === action.id ? { ...i, qty: i.qty + 1 } : i);
    case 'DECREMENT':
      return state.map(i =>
        i.id === action.id ? { ...i, qty: Math.max(1, i.qty - 1) } : i
      );
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, []);

  const addItem      = useCallback(product => dispatch({ type: 'ADD', product }), []);
  const removeItem   = useCallback(id      => dispatch({ type: 'REMOVE',    id }), []);
  const increment    = useCallback(id      => dispatch({ type: 'INCREMENT',  id }), []);
  const decrement    = useCallback(id      => dispatch({ type: 'DECREMENT',  id }), []);
  const clearCart    = useCallback(()      => dispatch({ type: 'CLEAR' }), []);

  const totalItems   = items.reduce((s, i) => s + i.qty, 0);
  const totalPrice   = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, increment, decrement, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
