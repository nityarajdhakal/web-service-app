import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TermsPage from './pages/TermsPage';
import PricelistPage from './pages/PricelistPage';
import './App.css';

// Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: 'red' }}>
          <h1>Something went wrong</h1>
          <pre>{this.state.error?.toString()}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route 
            path="/home" 
            element={
              <PrivateRoute>
                <PricelistPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/pricelist" 
            element={
              <PrivateRoute>
                <PricelistPage />
              </PrivateRoute>
            } 
          />
          
          {/* Root path redirects to login or home depending on auth status */}
          <Route 
            path="/" 
            element={
              localStorage.getItem('token') ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />
            } 
          />
          
          {/* Any other path redirects to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;



