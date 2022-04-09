const { Router } = require("express");
const createRecipeRouter = Router();
const { User } = require("../database/User.js");
//const app = express();
/**
 * Get users recipe into the create recipe collection
 */
createRecipeRouter.get("/", (req, res) => {
  const { username } = req.user;
  console.log("LINE 7, SERVER SIDE ||", recipe);
  User.findOne({ username })
    .then((response) => {
      console.log(response);
      res.status(200).send(response.createdrecipes);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});
/**
 * Post recipe into the create recipe collection
 */
createRecipeRouter.post("/createrecipe/add", (req, res) => {
  const { recipe } = req.body;
  const { username } = req.user;

  User.findOne({ username })
    .then((user) => {
      if (!user.recipes.includes(recipe)) {
        User.update(
          { username },

          {
            $push: {
              recipe: recipe,
            },
          }
        ).then(() => res.sendStatus(201));
      } else {
        res.sendStatus(201);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});
