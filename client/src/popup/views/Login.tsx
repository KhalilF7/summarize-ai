import { useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';

import './style.css';

/**
 * Login component that renders a form for logging in.
 */
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  /**
   * Event handler for changing the email input value.
   * @param {object} e - The event object.
   */
  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  /**
   * Event handler for changing the password input value.
   * @param {object} e - The event object.
   */
  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  /**
   * Event handler for submitting the login form.
   * @param {object} e - The event object.
   */
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

  // Redirect the user to the home page if they are logged in
  if(redirect){
    return <Navigate replace to="/" />
  }

  return (
    <div className="centered">
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