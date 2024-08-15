import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSuccess, handleError } from '../util';
import { ToastContainer } from 'react-toastify';

function Home() {
  const [loggedInUser, setLoggedUser] = useState('');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedUser(localStorage.getItem('loggedInUser'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logged out');

    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  const fetchProducts = async () => {
    try {
      const url = "https://mern-app-indol-ten.vercel.app/products";
      const response = await fetch(url, {
        method: 'GET', // specify method as GET (default is GET but good to be explicit)
        headers: {
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'application/json', // ensure correct Content-Type if necessary
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setProducts(result);
      console.log(result);
    } catch (err) {
      handleError(err);
    }
  };
  

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
    <h1>WelCome</h1>
      <h1>{loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>

      <div>
        {
          products && products.map((item, index) => (
            <ul key={index}>
              <li>{item.name}: {item.price}</li>
            </ul>
          ))
        }
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home;