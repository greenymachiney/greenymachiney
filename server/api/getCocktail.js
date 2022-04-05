const axios = require('axios');

const key = require('../../config/keys').api.cocktail; // commented out .api.cocktails since we haven't gotten an api key yet.


const getRandomCocktail = () => {
  return axios
    .get(`http://thecocktaildb.com/api/json/v2/${key}/random.php`)
    .then((response) => response)
    .catch((err) => console.error('error in cocktail api call: ', err));
};

const getCocktailByIngredient = (ingredient) => {
  return axios
    .get(
      `http://thecocktaildb.com/api/json/v2/${key}/filter.php?i=${ingredient}`
    )
    .then((response) => response)
    .catch((err) => console.error(err));
};

const getCocktailByName = (name) => {
  return axios
    .get(`http://thecocktaildb.com/api/json/v2/${key}/search.php?s=${name}`)
    .then((response) => response)
    .catch((err) => console.error(err));
};

module.exports = {
  getRandomCocktail,
  getCocktailByIngredient,
  getCocktailByName,
};
