const { Router } = require('express');
const drunkRouter = Router();
const ReactDOMServer = require('react-dom/server');

const authCheck = (req, res, next) => {
  if (!req.user) {
    //if user not logged in, redirect
    res.redirect('/');
  } else {
    next();
  }
}

drunkRouter.get('/', authCheck, (req, res) => {
  res.send('logged in ' + req.user.username);
})

// drunkRouter.get('/about', (req, res) => {
//   ReactDOMServer.renderToString(`<h2>About</h2>`);
// })

module.exports = drunkRouter;