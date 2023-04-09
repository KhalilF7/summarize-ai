import React, { useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';


/**
 * Signup component.
 * @returns JSX element containing the Signup form.
 */
const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  /**
   * Handles form submit event.
   * @param {Object} event - The event object.
   */
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/auth/signup', {
        name,
        email,
        password,
      });

      setRedirect(true);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (redirect) {
    return <Navigate replace to="/login" />;
  }

  return (
    <div className="centered">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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
            onChange={(event) => setPassword(event.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <span>Already have an account? </span>
          <Link to="/login" style={{ textDecoration: 'underline' }}>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
