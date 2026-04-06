/**
 * App – Root with simple state-based router
 */
import { useState, useCallback } from 'react';
import './index.css';

import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage          from './pages/HomePage';
import ProductsPage      from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage          from './pages/CartPage';
import LoginPage         from './pages/LoginPage';

function Router({ page, pageProps, onNavigate }) {
  switch (page) {
    case 'home':
      return <HomePage onNavigate={onNavigate} />;
    case 'products':
      return <ProductsPage onNavigate={onNavigate} initialSearch={pageProps?.search || ''} />;
    case 'product':
      return <ProductDetailPage productId={pageProps?.id} onNavigate={onNavigate} />;
    case 'cart':
      return <CartPage onNavigate={onNavigate} />;
    case 'login':
      return <LoginPage onNavigate={onNavigate} />;
    default:
      return <HomePage onNavigate={onNavigate} />;
  }
}

function AppShell() {
  const [page,      setPage]      = useState('home');
  const [pageProps, setPageProps] = useState({});

  const navigate = useCallback((target, props = {}) => {
    setPage(target);
    setPageProps(props);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <Navbar currentPage={page} onNavigate={navigate} />
      <Router page={page} pageProps={pageProps} onNavigate={navigate} />
      <Footer onNavigate={navigate} />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppShell />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
