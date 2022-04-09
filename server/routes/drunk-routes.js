const { Router } = require('express');
const drunkRouter = Router();

const {
  getRandomCocktail,
  getCocktailByIngredient,
  getCocktailByName,
} = require('../api/getCocktail');
const { User } = require('../database');

//check if user is logged in
const authCheck = (req, res, next) => {
  if (!req.user) {
    //if user not logged in, redirect
    res.redirect('/');
  } else {
    next();
  }
};

//final redirect upon login
drunkRouter.get('/', authCheck, (req, res) => {
  console.log('LINE 23 || DRUNKROUTER || REQ || \n', req);
  res.redirect(`/${req.user.username}`);
});

//responds with a random cocktail from the api
drunkRouter.get('/randomCocktail', (req, res) => {
  getRandomCocktail()
    .then((response) => {
      res.status(200).send(response.data.drinks);
    })
    .catch((err) => {
      console.error('error in drunkRouter: ', err);
      res.sendStatus(404);
    });
});

//responds with a list of cocktails searched by ingredient in the api
drunkRouter.get('/cocktailByIngredient/:ingredient', (req, res) => {
  const { ingredient } = req.params;
  getCocktailByIngredient(ingredient)
    .then((response) => {
      return res.status(200).send(response.data.drinks);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(404);
    });
});

//responds with a list of cocktails searched by name in the api
drunkRouter.get('/cocktailByName/:name', (req, res) => {
  const { name } = req.params;
  getCocktailByName(name)
    .then((response) => {
      res.status(200).send(response.data.drinks);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(404);
    });
});

//saves a specific cocktail to a user
drunkRouter.put('/saveCocktail', (req, res) => {
  const { drink } = req.body;
  const { username } = req.user;

  User.findOne({ username })
    .then((user) => {
      if (!user.drinks.includes(drink.strDrink)) {
        User.updateOne(
          { username },
          {
            $push: {
              drinks: drink.strDrink,
            },
          }
        ).then(() => res.sendStatus(201));
      } else {
        res.sendStatus(201);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(404);
    });
});

//gets a users liquor list from the database
drunkRouter.get('/liquorList', (req, res) => {
  User.findOne({ username: req.user.username })
    .then((user) => res.send(user.liquorList))
    .catch((err) => console.error(err));
});

//adds to a users liquor list
drunkRouter.put('/liquorList', (req, res) => {
  User.findOne({ username: req.user.username }).then((user) =>
    !user.liquorList.includes(req.body.liquorList)
      ? User.updateOne(
          { username: user.username },
          { $push: { liquorList: req.body.liquorList } }
        )
          .then(() => res.status(200).send())
          .catch((err) => {
            console.error(err);
            res.sendStatus(404);
          })
      : res.sendStatus(200)
  );
});

//gets a users saved drinks from the database
drunkRouter.get('/drinks', (req, res) => {
  User.findOne({ username: req.user.username })
    .then((user) => {
      res.send(user.drinks);
    })
    .catch((err) => console.error(err));
});

//removes a drink from a users saved drinks in the database
drunkRouter.put('/drinks', (req, res) => {
  const { drinks } = req.body;
  const { username } = req.user;

  User.findOne({ username })
    .then((user) => {
      if (user.drinks.includes(drinks)) {
        User.updateOne(
          { username },
          {
            $pull: {
              drinks: drinks,
            },
          }
        ).then(() => res.sendStatus(201));
      } else {
        res.sendStatus(201);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(404);
    });
});

//deletes a liquor from a users liquor list in the database
drunkRouter.put('/liquorList/delete', (req, res) => {
  const { liquorList } = req.body;
  const { username } = req.user;

  User.findOne({ username })
    .then((user) => {
      if (user.liquorList.includes(liquorList)) {
        User.updateOne(
          { username },
          {
            $pull: {
              liquorList: liquorList,
            },
          }
        ).then(() => res.sendStatus(201));
      } else {
        res.sendStatus(201);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(404);
    });
});

module.exports = drunkRouter;
