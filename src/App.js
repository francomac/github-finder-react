import React, { Component } from 'react';
import NavBar from './components/layout/Navbar';
import Users from './components/users/Users';
import './App.css';

class App extends Component {
  render() {
    const name = 'FrancoMaC';
    const loading = false;
    const showName = true;

    return (
      <div className='App'>
        {loading ? <h4>Loading...</h4> : <h3>Hello {showName && name}!</h3>}
        <NavBar title='Github Finder' />
        <div className='container'>
          <Users />
        </div>
      </div>
    );
  }
}

export default App;
