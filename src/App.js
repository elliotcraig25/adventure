import React, { Component } from 'react';
import {HashRouter as Router} from 'react-router-dom';
import routes from './routes';
import './App.css';
import './Reset.css';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          {routes}
        </Router>
      </div>
    );
  }
}

export default App;
