import React, { Component } from 'react';
import NavBar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    users: [],
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const response = await axios.get(`https://api.github.com/users?
    client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}
    `);

    this.setState({ users: response.data, loading: false });
  }

  render() {
    const name = 'FrancoMaC';
    const loading = false;
    const showName = true;

    return (
      <div className='App'>
        {loading ? <h4>Loading...</h4> : <h3>Hello {showName && name}!</h3>}
        <NavBar title='Github Finder' />
        <div className='container'>
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
