import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  HashRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios';

import Home from './Home.jsx';
import Profile from './Profile.jsx';
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
          <Route path="/">
            <Home />
          </Route>
          <Route path="/profile" component={Profile}>
            {/* <Profile /> */}
          </Route>
          <Route path='/users/:username'>
            <div>logged in</div>
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