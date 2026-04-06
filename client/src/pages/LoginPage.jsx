/**
 * LoginPage – Elegant sign-in form
 */
import { useState } from 'react';
import { Eye, EyeOff, Diamond, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

function LoginPage({ onNavigate }) {
  const { login, loading, error, setError } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPwd, setShowPwd] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await login(form);
    if (ok) onNavigate('home');
  };

  return (
    <main className="login-page page" id="main-content">
      {/* Left panel */}
      <div className="login-panel login-panel--brand" aria-hidden="true">
        <div className="login-panel__content">
          <div className="login-panel__logo">
            <Diamond size={20} />
            <span>SELLORA</span>
          </div>
          <blockquote className="login-panel__quote">
            &quot;Every piece tells a story. Find yours.&quot;
          </blockquote>
          <div className="login-panel__ring" />
        </div>
      </div>

      {/* Right panel – form */}
      <div className="login-panel login-panel--form">
        <div className="login-form-wrap">
          <div className="login-header">
            <p className="section-sub">Welcome back</p>
            <h1 className="login-title">Sign in to Sellora</h1>
            <p className="login-subtitle">
              Access your jewelry collection, orders and wishlist.
            </p>
          </div>

          {error && (
            <div className="login-error" role="alert">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form id="login-form" className="login-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="username-input">Username</label>
              <input
                id="username-input"
                name="username"
                type="text"
                className="form-input"
                placeholder="johnd"
                value={form.username}
                onChange={handleChange}
                autoComplete="username"
                required
              />
            </div>

            <div className="form-group">
              <div className="login-pwd-header">
                <label className="form-label" htmlFor="password-input">Password</label>
                <button type="button" className="login-forgot" onClick={e => e.preventDefault()}>
                  Forgot password?
                </button>
              </div>
              <div className="login-pwd-wrap">
                <input
                  id="password-input"
                  name="password"
                  type={showPwd ? 'text' : 'password'}
                  className="form-input login-pwd-input"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="login-pwd-toggle"
                  onClick={() => setShowPwd(s => !s)}
                  aria-label={showPwd ? 'Hide password' : 'Show password'}
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              id="login-submit-btn"
              type="submit"
              className="btn btn-gold btn-lg login-submit"
              disabled={loading || !form.username || !form.password}
            >
              {loading ? <span className="login-spinner" aria-hidden="true" /> : null}
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          {/* Demo hint */}
          <div className="login-demo">
            <span className="login-demo__label">Demo credentials</span>
            <code>johnd / m38hmF$</code>
          </div>

          <p className="login-register">
            New to Sellora?{' '}
            <button
              id="create-account-btn"
              type="button"
              className="login-register-link"
              onClick={() => onNavigate('home')}
            >
              Create an account
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
