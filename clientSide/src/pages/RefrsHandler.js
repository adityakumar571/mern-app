import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function RefrsHandler({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      setIsAuthenticated(true);
      // Redirect to home if authenticated user tries to access login or signup page
      if (location.pathname === '/login' || location.pathname === '/signup') {
        navigate('/home', { replace: true });
      }
    } else {
      setIsAuthenticated(false);
      // Redirect to login if trying to access protected routes without authentication
      if (location.pathname === '/home') {
        navigate('/login', { replace: true });
      }
    }
  }, [location, navigate, setIsAuthenticated]);

  return null;
}

export default RefrsHandler;