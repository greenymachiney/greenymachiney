import React, { Component, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./GlobalStyles.jsx";
import { lightTheme, darkTheme } from "./Themes.jsx";
import Toggle from "./Toggler.jsx"
import  { useDarkMode } from "./UseDarkMode.jsx"
import Login from "./Login.jsx";
import User from "./User.jsx";

const App = () => {

  const [theme, themeToggler, mountedComponent] = useDarkMode();

  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  if(!mountedComponent) return <div/>

  return (
    <div>
      <ThemeProvider theme={themeMode}>
        <>
          <GlobalStyles />
          <Toggle theme={theme} toggleTheme={themeToggler} />
          <Router>
            <Switch>
              <Route exact path="/" component={Login}></Route>
              <Route path="/:users" component={User}></Route>
              <Route>
                <div>404 page not available</div>
              </Route>
            </Switch>
          </Router>
        </>
      </ThemeProvider>
    </div>
  );
};

export default App;
