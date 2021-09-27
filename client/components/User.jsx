import React from "react";
import {
  BrowserRouter as Router,
  HashRouter,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";

import BarCart from './BarCart.jsx';
import Recipes from './Recipes.jsx';
import Search from './Search.jsx';
import EventsCalendar from "./EventsCalendar.jsx";
import Login from "./Login.jsx";

const User = () => {
  const { path, url } = useRouteMatch();

  console.log('PATH: ', path);
  console.log('URL: ', url);

  return (

    <div>
        <ul>
          <li>
            <Link to={`${url}/barcart`}>Bar Cart</Link>
          </li>
          <li>
            <Link to={`${url}/recipes`}>Drink Book</Link>
          </li>
          <li>
            <Link to={`${url}/search`}>Get a new recipe!</Link>
          </li>
          <li>
            <Link to={`${url}/events`}>Plan a Cocktail Party!</Link>
          </li>
        </ul>
        <hr />
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path={`${path}/barcart`}>
            <BarCart />
          </Route>
          <Route path={`${path}/recipes`}>
            <Recipes />
          </Route>
          <Route path={`${path}/search`}>
            <Search />
          </Route>
          <Route path={`${path}/events`}>
            <EventsCalendar />
          </Route>
        </Switch>
      </div>
  )
}

export default User;