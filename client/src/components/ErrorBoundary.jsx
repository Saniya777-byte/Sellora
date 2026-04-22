import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '2rem',
            textAlign: 'center',
            backgroundColor: '#fff5f5',
          }}
        >
          <h1 style={{ color: '#c53030', fontSize: '2rem', marginBottom: '1rem' }}>
            Oops! Something went wrong
          </h1>
          <p style={{ color: '#4a5568', fontSize: '1.1rem', marginBottom: '2rem' }}>
            We apologize for the inconvenience. Please refresh the page or try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#c53030',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#9b2c2c')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#c53030')}
          >
            Refresh Page
          </button>
          {process.env.NODE_ENV === 'development' && (
            <details
              style={{
                marginTop: '2rem',
                textAlign: 'left',
                backgroundColor: '#fff',
                padding: '1rem',
                borderRadius: '0.375rem',
                border: '1px solid #e2e8f0',
              }}
            >
              <summary style={{ cursor: 'pointer', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Error Details (Development Only)
              </summary>
              <pre style={{ overflow: 'auto', fontSize: '0.875rem' }}>
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
