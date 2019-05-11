import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Greet from './components/Greet.js'
import Welcome from './components/Welcome.js'
import D3graph from './components/D3graph.js'
import Dashboard from './components/DashBoard.js'
import Button from "@material-ui/core/Button";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Dashboard />
        {/*
        <Greet />
        <D3graph width={800} height={600} />
        <Button variant="contained" color="primary">
          Hello World
        </Button>
      */}
      </div>
    );
  }
}

export default App;
