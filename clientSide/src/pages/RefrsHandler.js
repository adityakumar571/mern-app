import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function RefrsHandler({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      setIsAuthenticated(true);
    }

    if (
      (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup') &&
      token
    ) {
      navigate('/home', { replace: true }); // Use replace to prevent infinite history stack
    }
  }, [location, navigate, setIsAuthenticated]);

  return null;
}

export default RefrsHandler;