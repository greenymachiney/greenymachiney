<<<<<<< HEAD
import React, { useState } from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";

import BarCart from "./BarCart.jsx";
import Recipes from "./Recipes.jsx";
import Search from "./Search.jsx";
import Events from "./Events.jsx";
import Login from "./Login.jsx";
import ShoppingList from "./ShoppingList.jsx";
import CreateRecipes from "./CreateRecipes.jsx";
=======
import React, { useState } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import {
  Switch,
  Route,
  BrowserRouter,
  Link,
  useRouteMatch,
} from 'react-router-dom';
const googleMapsApiKey = 'AIzaSyBr7t_kZMkAIIUXDyHkB002uPLl95nS3cc';

// import { Wrapper } from '@googlemaps/react-wrapper';

import BarCart from './BarCart.jsx';
import Recipes from './Recipes.jsx';
import Search from './Search.jsx';
import Events from './Events.jsx';
import CreateBarCrawl from './CreateBarCrawl.jsx';
import CreateStaticEvent from './CreateStaticEvent.jsx';
import Login from './Login.jsx';
import ShoppingList from './ShoppingList.jsx';
import Weather from './Weather.jsx';
import Profile from './Profile.jsx';
>>>>>>> f9150abc70f7192a88613d23ad01ed2ea54183a0

const User = () => {
  const { path, url } = useRouteMatch();

  const [menu, setMenu] = useState("none");

  const toggleMenu = () => {
<<<<<<< HEAD
    setMenu(menu === "none" ? "block" : "none");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light trueNav">
        <a className="navbar-brand">DRINK DAT</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
          style={{ display: menu }}
        >
          <div className="navbar-nav me-auto">
            <Link to={`${url}/barcart`} className="nav-item nav-link">
              Bar Cart
            </Link>
            <Link to={`${url}/recipes`} className="nav-item nav-link">
              Drink Book
            </Link>
            <Link to={`${url}/events`} className="nav-item nav-link">
              Events
            </Link>
            <Link to={`${url}/shoppinglist`} className="nav-item nav-link">
              Shopping List
            </Link>
            <Link to={`${url}/search`} className="nav-item nav-link">
              Search
            </Link>
            <Link to={`${url}/createrecipes`} className="nav-item nav-link">
              Create Recipe
            </Link>
          </div>
          <div className="navbar-nav">
            <a href="/auth/logout" className="nav-item nav-link log-out">
              Log Out
            </a>
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
        <Route path={`${path}/createrecipes`}>
          <CreateRecipes />
        </Route>
        <Route path={`${path}`}>
          <BarCart />
        </Route>
      </Switch>

      <div className="footer fixed-bottom">
        <div className="text-center p-3">
          2021{" "}
          <a
            className="text-dark"
            href="https://github.com/greenymachiney/greenymachiney"
          >
            Greeny Machiney
          </a>{" "}
          - Emma Pejko, Amelia Neville, Jake Young, Luke Johnson
        </div>
      </div>
    </div>
=======
    setMenu(menu === 'none' ? 'block' : 'none');
  };

  return (
    <BrowserRouter>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light trueNav">
          <a className="navbar-brand">DRINK DAT</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={toggleMenu}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
            style={{ display: menu }}
          >
            <div className="navbar-nav me-auto">
              <Link to={`${url}/barcart`} className="nav-item nav-link">
                Bar Cart
              </Link>
              <Link to={`${url}/recipes`} className="nav-item nav-link">
                Drink Book
              </Link>
              <Link to={`${url}/events`} className="nav-item nav-link">
                Events
              </Link>
              <Link to={`${url}/shoppinglist`} className="nav-item nav-link">
                Shopping List
              </Link>
              <Link to={`${url}/search`} className="nav-item nav-link">
                Search
              </Link>
              <Link to={`${url}/weather`} className="nav-item nav-link">
                Weather
              </Link>
              <Link to={`${url}/profile`} className="nav-item nav-link">
                Profile
              </Link>
            </div>
            <div className="navbar-nav">
              <a href="/auth/logout" className="nav-item nav-link log-out">
                Log Out
              </a>
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
          {/* /////////////////////////////////// Event Routes START RENE ///////////////////////////////////*/}

          {/* WRAP ALL EVENT ENDPOINTS IN A SWITCH STATEMENT */}
          <Switch>
            {/* DEFINE THE EXACT PATH OF THE PARENT EVENT VIEW/COMPONENT */}
            <Route exact path={`${path}/events`}>
              <Events />
            </Route>
            {/* LINK BAR CRAWL ROUTE TO CREATEBARCRAWL COMPONENT */}
            <Route
              exact
              path={`${path}/events/create-bar-crawl`}
              element={<CreateBarCrawl />}
            >
              <CreateBarCrawl />
            </Route>
            {/* LINK BAR CRAWL ROUTE TO CREATESTATICEVENT COMPONENT */}
            <Route
              exact
              path={`${path}/events/create-static-event`}
              element={<CreateStaticEvent />}
            >
              <CreateStaticEvent />
            </Route>
          </Switch>
          {/* /////////////////////////////////// Event Routes END RENE ///////////////////////////////////*/}

          <Route path={`${path}/weather`}>
            <Weather />
          </Route>

          <Route path={`${path}/profile`}>
            <Profile />
          </Route>
          <Route exact path={`${path}`}>
            <BarCart />
          </Route>
        </Switch>

        {/* /////////////////////////////////// FOOTER COMMENTED OUT BY RENE ///////////////////////////////////*/}
      </div>
    </BrowserRouter>
>>>>>>> f9150abc70f7192a88613d23ad01ed2ea54183a0
  );
};

export default User;
