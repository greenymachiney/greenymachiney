const axios = require('axios');

const getRandomCocktail = () => {
  return axios.get('http://thecocktaildb.com/api/json/v1/1/random.php')
    .then(response => response)
    .catch(err => console.error('error in cocktail api call: ', err));
};

const getCocktailByIngredient = (ingredient) => {
  return axios.get(`http://thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    .then(response => response)
    .catch(err => console.error(err));
};

const getCocktailByName = (name) => {
  return axios.get(`http://thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
    .then(response => response)
    .catch(err => console.error(err));
}

module.exports = {
  getRandomCocktail,
  getCocktailByIngredient,
  getCocktailByName
}