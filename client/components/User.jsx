import React from "react";
import {
  BrowserRouter as Router,
  HashRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './Home.jsx';

const User = ({ match }) => {
  console.log(match.url);

  return (
    <Route path={`${match.path}/:username`} component={Home}/>
  )
}

export default User;