import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom';
// Importing components

import Routes from './components/routes/Routes';

function App() {

  return (
    <div>
      <Router>
        <Switch>
          <Routes/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
