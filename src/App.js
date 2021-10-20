import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom';
// Importing components

import Routes from './components/routes/Routes';
import { UserProvider } from './components/user/UserContext';

function App() {

  return (
    <div>
      <UserProvider>
        <Router>
          <Switch>
            <Routes/>
          </Switch>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
