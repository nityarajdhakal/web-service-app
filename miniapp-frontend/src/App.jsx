import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TermsPage from './pages/TermsPage';
import PricelistPage from './pages/PricelistPage';
import './App.css';

// This component protects routes that require authentication
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  // If a token exists, allow access. Otherwise, redirect to the login page.
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
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
        {/* Root path redirects to /home if authenticated, otherwise to /login */}
        <Route path="/" element={<Navigate to="/home" />} />
        {/* Any other path will redirect to the login page */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;



