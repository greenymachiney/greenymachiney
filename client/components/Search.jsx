import React, { useState } from "react";
import axios from "axios";

const Search = () => {
  const [random, setRandom] = useState({});
  const [name, setName] = useState('');
  const [drinks, setDrinks] = useState([]);

  const getRandomCocktail = () => {
    axios.get('/drunk/randomCocktail')
      .then(({ data }) => {
        console.log('RANDOM COCKTAIL: ', data[0]);
        setRandom(data[0]);
      })
      .catch(err => console.error(err));
  }

  const getIngredients = (drink) => {
    const ingredients = [];

    let count = 1;
    while (random[`strIngredient${count}`] !== null) {
      ingredients.push(random[`strIngredient${count}`]);
      count++
    };

    return ingredients;
  }

  const getCocktailByName = () => {
    axios.get(`/drunk/cocktailByName/${name}`)
      .then(({ data }) => {
        console.log('DRINKS BY NAME LIST: ', data);
        setDrinks(data);
      })
      .catch(err => console.error(err));
  }

  const getCocktailByExactName = (name) => {
    axios.get(`/drunk/cocktailByName/${name}`)
      .then(({ data }) => {
        console.log('drink by exact name ', data[0]);
        setRandom(data[0]);
      })
      .catch(err => console.error(err));
  }

  return (
    <div>
      <div>
        <button onClick={getRandomCocktail}>
          Get a Random Drink
        </button>
      </div>
      {
        !random.strDrink ? null :
        <div>
          <div>Drink Name: {random.strDrink}</div>
          <div><img src={random.strDrinkThumb} height='300px'></img></div>
          <div>
            Ingredients:
            <ul>
              {
                getIngredients(random).map((ingredient, i) => <li key={i}>{random[`strMeasure${i + 1}`]} {ingredient}</li>)
              }
            </ul>
          </div>
          <div>
            Instructions:
            <div>{random.strInstructions}</div>
          </div>
        </div>
      }
      <div>
        <input value={name} onChange={(e) => setName(e.target.value)}/>
        <button onClick={getCocktailByName}>
          Get Drinks By Name
        </button>
        {
          !drinks ? null :
          <div>
            <ul>
              {
                drinks.map((drink, i) => <li key={i} onClick={() => getCocktailByExactName(drink.strDrink)}>{drink.strDrink}</li>)
              }
            </ul>
          </div>
        }
      </div>
    </div>
  )
}

export default Search;