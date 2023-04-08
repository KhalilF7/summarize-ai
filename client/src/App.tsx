/*global chrome*/
import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './views/Login';
import Signup from './views/Signup';
import Summary from './views/Summary';
import SummaryList from './views/SummaryList';


const App = () => (
  <BrowserRouter>
    <Container maxWidth="xs">
      <Routes>
        <Route path="/" element={<Summary />} />
        <Route path="/mysummaries" element={<SummaryList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Container>
  </BrowserRouter>
);

export default App;