import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TermsPage from './pages/TermsPage';
import PricelistPage from './pages/PricelistPage';
import './App.css';


const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
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
        
        {/* Root path redirects to login or home depending on auth status */}
        <Route 
          path="/" 
          element={
            localStorage.getItem('token') ? <Navigate to="/home" /> : <Navigate to="/login" />
          } 
        />
        
        {/* Any other path redirects to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;



