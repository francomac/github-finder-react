import React, { useState, useEffect, Fragment } from 'react';
import NavBar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  const [ users, setUsers ] = useState([]);
  const [ user, setUser ] = useState({});
  const [ repos, setRepos ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ alert, setAlert ] = useState(null);

  // Search Github Users
  const searchUsers = async (text) => {
    setLoading(true);

    const response = await axios.get(
      `https://api.github.com/search/users?q=${text}&
    client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}
    `
    );

    setUsers(response.data.items);
    setLoading(false);
  };

  // Get single Github User
  const getUser = async (userName) => {
    setLoading(true);

    const response = await axios.get(
      `https://api.github.com/users/${userName}?
    client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}
    `
    );

    setUser(response.data);
    setLoading(false);
  };

  // Get User Repos
  const getUserRepos = async (userName) => {
    setLoading(true);

    const response = await axios.get(
      `https://api.github.com/users/${userName}/repos?per_page=6&sort=created:asc&
    client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}
    `
    );

    setRepos(response.data);
    setLoading(false);
  };

  const showAlert = (newMsg, newType) => {
    setAlert({ msg: newMsg, type: newType });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  useEffect(() => {
    searchUsers('francomac');
  }, []);

  const name = 'francomac';
  const loadingTitle = false;
  const showName = true;

  return (
    <Router>
      <div className='App'>
        <NavBar title='Github Finder' />
        {loadingTitle ? <h4>Loading...</h4> : <h3>Hello {showName && name}!</h3>}
        <div className='container'>
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path='/'
              render={(props) => (
                <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={showAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )}
            />
            <Route exact path='/about' component={About} />
            <Route
              exact
              path='/user/:login'
              render={(props) => (
                <User
                  {...props}
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  user={user}
                  repos={repos}
                  loading={loading}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
