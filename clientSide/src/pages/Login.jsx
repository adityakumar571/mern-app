import React, { useState } from 'react'; // Removed duplicate import
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleSuccess, handleError } from '../util';

function Login() {
  const [loginInfo, setloginInfo] = useState({
    email: '',
    password: ''
  });

  const Navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyloginInfo = { ...loginInfo };
    copyloginInfo[name] = value;
    setloginInfo(copyloginInfo); // Corrected function name
  };

  console.log(loginInfo);

  const handleLogin = async (e) => { // Added 'async' here
    e.preventDefault();

    const { email, password } = loginInfo;

    if (!email || !password) {
      return handleError('Email and password are required');
    }

    try {
      const url = "https://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });

      const result = await response.json();
      console.log(result);
      const { success, massage, error, jwtToken } = result;

      if (success) {
        handleSuccess(massage);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', email); // Store email instead of name
        setTimeout(() => {
          Navigate('/Home');
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(massage)
      }

    } catch (err) {
      handleError(err.message || 'An error occurred');
    }
  };

  return (
    <div className='container'>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            onChange={handleChange}
            type='email'
            name='email'
            placeholder='Enter your Email...'
            value={loginInfo.email}
          />
        </div>

        <div>
          <label htmlFor='password'>Password</label>
          <input
            onChange={handleChange}
            type='password'
            name='password'
            placeholder='Enter your password...'
            value={loginInfo.password}
          />
        </div>

        <button type="submit">Login</button>

        <span>
          don't have account, sign up here: 
          <Link to="/Signup">Signup</Link>
        </span>
      </form>

      <ToastContainer />
    </div>
  );
}

export default Login;
