/*global chrome*/
import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './views/Login';
import Signup from './views/Signup';

const token = localStorage.getItem('token');
const isLoggedIn = !!token;

const App = () => (
  <BrowserRouter>
    <Container maxWidth="lg">
      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={isLoggedIn ? <Navigate to="/" /> : <Signup />} />
        <Route path="/" element={isLoggedIn ? <Navigate to="/" /> : <Navigate to="/login" />} />
      </Routes>
    </Container>
  </BrowserRouter>
);


export default App;