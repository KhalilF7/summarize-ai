/*global chrome*/
import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './views/Login';
import Signup from './views/Signup';
import Summary from './views/Summary';


const App = () => (
  <BrowserRouter>
    <Container maxWidth="lg">
      <Routes>
        <Route path="/" element={<Summary />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Container>
  </BrowserRouter>
);

export default App;