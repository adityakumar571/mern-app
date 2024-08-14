import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleSuccess,handleError } from '../util';
  // Ensure to import the styles for ToastContainer

function Signup() {
const[signupInfo, setSignupInfo]=useState({
  name:'',
  email:'',
  password:''
});

const Navigate=useNavigate();

const handleChange=(e)=>{
  const{name,value}=e.target;
  console.log(name,value);
  const copySignupInfo={...signupInfo};
  copySignupInfo[name]=value;
  setSignupInfo(copySignupInfo);
}
 
console.log(signupInfo)
const handleSignup = async (e) => { // Added 'async' here
  e.preventDefault();
  
  const { name, email, password } = signupInfo;
  
  if (!name || !email || !password) {
    return handleError('Name, email, and password are required');
  }
  
  try {
    const url = "http://localhost:8080/auth/signup"; // Corrected the typo here
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signupInfo)
    });

    const result = await response.json();
    console.log(result);
   const{success,message,error}=result;

    if(success){
      handleSuccess(message);
      setTimeout(()=>{
        Navigate('/login')
      },1000)
    }
    else if(error){
        const details=error.details[0].message;
        handleError(details);
    }
    else if(!success){
      handleError(message)
    }

  // Handle the success case if needed, e.g., showing a success message
  } catch (err) {
    handleError(err.message || 'An error occurred');
  }
};

  return (
    <div className='container'>
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor='name'>Name</label>
          <input
          onChange={handleChange}
            type='text'
            name='name'
            autoFocus
            placeholder='Enter your name...'
            value={signupInfo.name}
          />
        </div>

        <div>
          <label htmlFor='email'>Email</label>
          <input
           onChange={handleChange}
            type='email'
            name='email'
            placeholder='Enter your Email...'
            value={signupInfo.email}
          />
        </div>

        <div>
          <label htmlFor='password'>Password</label>
          <input 
           onChange={handleChange}
            type='password'
            name='password'
            placeholder='Enter your password...'
            value={signupInfo.password}
          />
        </div>
        
        <button type="submit">Signup</button>
        
        <span>
          Already have an account? 
          <Link to="/login">Login</Link>
        </span>
      </form>

      <ToastContainer />
    </div>
  );

}
export default Signup;