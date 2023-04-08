/*global chrome*/
import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './views/Login';
import Signup from './views/Signup';
import Summary from './views/Summary';
import HighlightList from './views/HighlightList';


const App = () => (
  <BrowserRouter>
    <Container maxWidth="xs">
      <Routes>
        <Route path="/" element={<Summary />} />
        <Route path="/myhighlights" element={<HighlightList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Container>
  </BrowserRouter>
);

export default App;