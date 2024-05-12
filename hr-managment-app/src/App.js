import React from 'react';
import './App.css';

import Router from './Router/Router';
import Auth from './Context/Auth';

function App() {
  return (
    <Auth>
      <Router />
    </Auth>
  );
}

export default App;
