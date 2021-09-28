const { Router } = require('express');
const drunkRouter = Router();

const { getRandomCocktail, getCocktailByIngredient, getCocktailByName } = require('../api/getCocktail');
const { User } = require('../database');

// const authCheck = (req, res, next) => {
//   if (!req.user) {
//     //if user not logged in, redirect
//     res.redirect('/');
//   } else {
//     next();
//   }
// }

// drunkRouter.get('/', authCheck, (req, res) => {
//   //res.redirect('/'); //????
//   res.send('logged in ' + req.user);
// })

drunkRouter.get('/randomCocktail', (req, res) => {
  getRandomCocktail()
    .then(response => {
      //console.log(response.data.drinks);
      res.status(200).send(response.data.drinks);
    })
    .catch(err => {
      console.error('error in drunkRouter: ', err);
      res.sendStatus(404);
    })
});

drunkRouter.get('/cocktailByIngredient/:ingredient', (req , res) => {
  const { ingredient } = req.params;
  getCocktailByIngredient(ingredient)
    .then(response => {
      //console.log(response.data);
      res.status(200).send(response.data.drinks);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(404);
    })
});

drunkRouter.get('/cocktailByName/:name', (req, res) => {
  const { name } = req.params;
  getCocktailByName(name)
    .then(response => {
      //console.log(response.data);
      res.status(200).send(response.data.drinks);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(404);
    })
});

drunkRouter.post('/saveCocktail', (req, res) => {
  const { drink } = req.body;
  User.updateOne({ username: req.user.username}, {
    $push: {
      drinks: drink
    }
  })
    .then(response => {
      console.log(response);
      res.sendStatus(200);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(404);
    });

})

drunkRouter.get('/savedDrinks', (req, res) => {
  User.findOne({ username: req.user.username})
  .then((user) => {
    console.log('DATABASE RES',user)
    res.send(user.savedDrinks)})
  .catch(err => console.error(err))
})

drunkRouter.get('/liquorList', (req, res) => {
  User.findOne({ username: req.user.username})
  .then((user) => {
    console.log('DATABASE RES',user)
    res.send(user.liquorList)})
  .catch(err => console.error(err))
})

drunkRouter.put('/liquorList', (req, res) => {
  User.findOne({ username: req.user.username})
  .then(user => !user.liquorList.includes(req.body.liquorList) ? User.findOneAndUpdate({$push: {liquorList: req.body.liquorList}})
        .then(() => res.status(200).send())
        .catch((err) => {
          console.error(err);
          res.sendStatus(404);
        }) : res.sendStatus(200))
});


module.exports = drunkRouter;