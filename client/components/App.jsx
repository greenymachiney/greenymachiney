import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  HashRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios';

import Login from './Login.jsx';
import User from './User.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drinks: []
    };

  }



  getAllDrinks() {
    axios.get()
  }

  render() {
    return (
      <div>
        <h1>Drink Dat</h1>
      <Router>
        <Switch>
          <Route exact path="/" component={Login}>
          </Route>
          <Route path="/:users" component={User}>
          </Route>
          <Route>
            <div>404 page not available</div>
          </Route>
        </Switch>
      </Router>
    </div>
    )
  }
}



export default App;