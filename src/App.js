import React, { Component } from "react";
import "./App.css";

class App extends Component {
  render() {
    const name = "FrancoMac";
    const loading = false;
    const showName = true;

    return (
      <div className='App'>
        <h1>My App</h1>
        {loading ? <h4>Loading...</h4> : <h3>Hello {showName && name}!</h3>}
      </div>
    );
  }
}

export default App;
