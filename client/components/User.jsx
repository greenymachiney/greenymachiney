import React, { useState } from "react";
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";

import BarCart from './BarCart.jsx';
import Recipes from './Recipes.jsx';
import Search from './Search.jsx';
import Events from "./Events.jsx";
import Login from "./Login.jsx";
import ShoppingList from "./ShoppingList.jsx";
import Profile from './Profile.jsx';

const User = () => {
  const { path, url } = useRouteMatch();

  const [menu, setMenu] = useState('none');

  const toggleMenu = () => {
    setMenu(menu === 'none' ? 'block' : 'none');
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light trueNav">
        <a className="navbar-brand">DRINK DAT</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{display: menu}}>
          <div className="navbar-nav me-auto">
            <Link to={`${url}/barcart`} className="nav-item nav-link">Bar Cart</Link>
            <Link to={`${url}/recipes`} className="nav-item nav-link">Drink Book</Link>
            <Link to={`${url}/events`} className="nav-item nav-link">Events</Link>
            <Link to={`${url}/shoppinglist`} className="nav-item nav-link">Shopping List</Link>
            <Link to={`${url}/search`} className="nav-item nav-link">Search</Link>
            <Link to={`${url}/profile`} className="nav-item nav-link">Profile</Link>
          </div>
          <div className="navbar-nav">
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
          <Route path={`${path}/shoppinglist`}>
            <ShoppingList />
          </Route>
          <Route path={`${path}/events`}>
            <Events />
          </Route>
          <Route path={`${path}/profile`}>
            <Profile />
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