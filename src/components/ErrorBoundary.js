import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console or error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card border-danger">
                <div className="card-header bg-danger text-white">
                  <h4 className="mb-0">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    Algo salió mal
                  </h4>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    Lo sentimos, ocurrió un error inesperado. Por favor intenta recargar la página.
                  </p>
                  
                  <div className="d-flex gap-2">
                    <button 
                      onClick={this.handleReload}
                      className="btn btn-primary"
                    >
                      <i className="fas fa-redo me-2"></i>
                      Recargar Página
                    </button>
                    
                    <button 
                      onClick={() => window.history.back()}
                      className="btn btn-secondary"
                    >
                      <i className="fas fa-arrow-left me-2"></i>
                      Volver
                    </button>
                  </div>

                  {process.env.NODE_ENV === 'development' && (
                    <details className="mt-3">
                      <summary className="text-muted small">
                        Detalles del error (solo en desarrollo)
                      </summary>
                      <div className="mt-2">
                        <pre className="bg-light p-3 small text-danger">
                          {this.state.error && this.state.error.toString()}
                          <br />
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </div>
                    </details>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;