import React, { Component } from 'react';
import NavBar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import Search from './components/users/Search';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
  };

  async componentDidMount() {
    // this.setState({ loading: true });
    // const response = await axios.get(`https://api.github.com/users?
    // client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    // client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}
    // `);

    // this.setState({ users: response.data, loading: false });
    this.searchUsers('francomac');
  }

  // Search Github Users
  searchUsers = async (text) => {
    this.setState({ loading: true });

    const response = await axios.get(
      `https://api.github.com/search/users?q=${text}&
    client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}
    `
    );

    this.setState({ users: response.data.items, loading: false });
  };

  setAlert = (newMsg, newType) => {
    this.setState({ alert: { msg: newMsg, type: newType } });

    setTimeout(() => {
      this.setState({ alert: null });
    }, 3000);
  };

  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  render() {
    const { users, loading } = this.state;
    const name = 'francomac';
    const loadingTitle = false;
    const showName = true;

    return (
      <div className='App'>
        <NavBar title='Github Finder' />
        {loadingTitle ? (
          <h4>Loading...</h4>
        ) : (
          <h3>Hello {showName && name}!</h3>
        )}
        <div className='container'>
          <Alert alert={this.state.alert} />
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true : false}
            setAlert={this.setAlert}
          />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
