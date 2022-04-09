const { Router } = require("express");
const shoppingRouter = Router();

const { User } = require("../database");
const { getBeerWineSpiritsStores } = require("../api/getStores");

//gets users shopping list from the database
shoppingRouter.get("/", (req, res) => {
  const { username } = req.user;

  User.findOne({ username })
    .then((user) => res.status(200).send(user.shoppinglist))
    .catch((err) => {
      console.error(err);
      res.sendStatus(404);
    });
});

//adds an item to a users shopping list
shoppingRouter.post("/addItem", (req, res) => {
  const { item } = req.body;
  const { username } = req.user;

  User.findOne({ username })
    .then((user) => {
      if (!user.shoppinglist.includes(item)) {
        User.updateOne(
          { username },
          {
            $push: {
              shoppinglist: item,
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

//deletes an item from a users shopping list
shoppingRouter.put("/removeItem", (req, res) => {
  const { item } = req.body;
  const { username } = req.user;

  User.findOne({ username })
    .then((user) => {
      if (user.shoppinglist.includes(item)) {
        User.updateOne(
          { username },
          {
            $pull: {
              shoppinglist: item,
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

//sends location to yelp api and responds with a list of stores
shoppingRouter.get("/stores/:location", (req, res) => {
  const { location } = req.params;
  getBeerWineSpiritsStores(location)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(404);
    });
});

module.exports = shoppingRouter;
