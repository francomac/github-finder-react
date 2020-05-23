import React from 'react';
import NavBar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import User from './components/users/User';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import About from './components/pages/About';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';

const App = () => {
  const name = 'francomac';
  const loadingTitle = false;
  const showName = true;

  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className='App'>
            <NavBar title='Github Finder' />
            <div className='container'>
              {loadingTitle ? <h4>Loading...</h4> : <h3>Hello {showName && name}!</h3>}
              <Alert />
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
                <Route exact path='/user/:login' component={User} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
