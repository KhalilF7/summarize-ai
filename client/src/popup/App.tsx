/*global chrome*/

import React, { useEffect, useState, createContext } from 'react';
import { Container } from '@material-ui/core';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './views/Login';
import Signup from './views/Signup';
import HighlightList from './views/HighlightList';

export const TokenContext = createContext<{ token: string | null, setToken: (token: string | null) => void }>({ token: null, setToken: () => {} });

/**
 * The main app component that renders the routes for the app.
 */
function App () {
  const [token, setToken] = useState(localStorage.getItem('token'))
  return (
    <HashRouter>
      <TokenContext.Provider value={{ token, setToken }} >
        <Container maxWidth="xs">
          <Routes>
            {/* Renders the highlight list view for the / path */}
            <Route path="/" element={!token ? <Navigate to="/login" /> : <HighlightList />} />

            {/* Renders the login view for the /login path */}
            <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />

            {/* Renders the signup view for the /signup path */}
            <Route path="/signup" element={token ? <Navigate to="/" /> : <Signup />} />
          </Routes>
        </Container>
      </TokenContext.Provider>
    </HashRouter>
  );
};

export default App;
