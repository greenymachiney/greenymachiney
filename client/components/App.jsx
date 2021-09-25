import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }



  render() {
    return (
    <Router>
      <div>
        <h1>Drink Dat</h1>
        <div>
          <a href='/auth/google'>Google Log In</a>
        </div>
        <div>
          <a href='/auth/logout'>Google Log Out</a>
        </div>
      </div>
    </Router>
    )
  }
}



export default App;