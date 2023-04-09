/*global chrome*/
import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './views/Login';
import Signup from './views/Signup';
import Summary from './views/Summary';
import HighlightList from './views/HighlightList';

/**
 * The main app component that renders the routes for the app.
 */
const App = () => (
  <BrowserRouter>
    <Container maxWidth="xs">
      <Routes>
        {/* Renders the summary view for the root path */}
        <Route path="/" element={<Summary />} />

        {/* Renders the highlight list view for the /myhighlights path */}
        <Route path="/myhighlights" element={<HighlightList />} />

        {/* Renders the login view for the /login path */}
        <Route path="/login" element={<Login />} />

        {/* Renders the signup view for the /signup path */}
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Container>
  </BrowserRouter>
);

export default App;
