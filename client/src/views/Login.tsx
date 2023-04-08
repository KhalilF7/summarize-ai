import { useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';

import './style.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/auth/login', {
        email,
        password,
      });

      setRedirect(true);
      localStorage.setItem('token', response.data.token); // store the token in local storage or state
    } catch (error) {
      console.log(error);
    }
  };
  

  if(redirect){
    return <Navigate replace to="/" />
  }
  return (
    <div  className="centered">
    <form onSubmit={handleSubmit} className="login-form">
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">Log In</button>
      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        <span>Don't have an account? </span>
        <Link to="/signup" style={{ textDecoration: 'underline' }}>Sign Up</Link>
      </div>
    </form>
    </div>
  );
}

export default Login;
