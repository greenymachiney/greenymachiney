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

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light trueNav">
        <a className="navbar-brand">DRINK DAT</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to={`${url}/barcart`} className="nav-item nav-link">Bar Cart</Link>
            <Link to={`${url}/recipes`} className="nav-item nav-link">Drink Book</Link>
            <Link to={`${url}/events`} className="nav-item nav-link">Events</Link>
            <Link to={`${url}/search`} className="nav-item nav-link">Search</Link>
            <a href='/auth/logout' className="nav-item nav-link log-out">Log Out</a>
          </div>
        </div>
      </nav>

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
          <Route path={`${path}`}>
            <BarCart />
          </Route>
        </Switch>

        <div className="footer fixed-bottom">
          <div className="text-center p-3">
            2021 <a className="text-dark" href="https://github.com/greenymachiney/greenymachiney">Greeny Machiney</a> - Emma Pejko, Amelia Neville, Jake Young, Luke Johnson
          </div>
        </div>

      </div>
  )
}

export default User;