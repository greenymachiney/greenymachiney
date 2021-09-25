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
import Profile from './Profile.jsx';
import Home from './Home.jsx';
import User from './User.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }

  render() {
    return (
      <div>
        <h1>Drink Dat</h1>
        {/* <div>
          <a href='/auth/google'>Google Log In</a>
        </div>
        <div>
          <a href='/auth/logout'>Google Log Out</a>
        </div> */}
      <Router>
        <Switch>
          <Route exact path="/" component={Login}>
          </Route>
          <Route path="/profile" component={Profile}>
            {/* <Profile /> */}
          </Route>
          <Route path="/:users" component={Home}>
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