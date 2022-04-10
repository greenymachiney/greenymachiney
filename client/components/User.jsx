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
import CreateRecipes from './CreateRecipes.jsx';

const User = () => {
  const { path, url } = useRouteMatch();

  const [menu, setMenu] = useState('none');

  const toggleMenu = () => {
    setMenu(menu === 'none' ? 'block' : 'none');
  };

  const [lat, setLat] = useState();
  const [lon, setLon] = useState();

  navigator.geolocation.getCurrentPosition(function (position) {
    //returns lat/lon based on user location
    setLat(position.coords.latitude + 0.000001);
    setLon(position.coords.longitude + 0.000001);
  });

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
              <Link to={`${url}/createrecipes`} className="nav-item nav-link">
                Create Recipes
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
          <Route path={`${path}/profile`}>
            <Profile />
          </Route>
          <Route path={`${path}/createrecipes`}>
            <CreateRecipes />
          </Route>
          <Route path={`${path}/weather`}>
            <Weather lat={lat} lon={lon} />
          </Route>
          <Route exact path={`${path}`}>
            <BarCart />
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
        </Switch>

        {/* /////////////////////////////////// FOOTER COMMENTED OUT BY RENE ///////////////////////////////////*/}
      </div>
    </BrowserRouter>
  );
};

export default User;
