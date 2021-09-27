import React, { useState } from "react";
import axios from "axios";

const Search = () => {
  const [random, setRandom] = useState({});

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

  return (
    <div>
      search for a new drink recipe
      <div>
        <button onClick={getRandomCocktail}>
          Get a Random Drink
        </button>
      </div>
      {
        !random.strDrink ? null :
        <div>
          <div>Drink Name: {random.strDrink}</div>
          <div><img src={random.strDrinkThumb}></img></div>
          <div>
            Ingredients:
            {/* <ul>
              {
                getIngredients(random).map((ingredient, i) => <li key={i}>{ingredient}</li>)
              }
            </ul> */}
          </div>
        </div>
      }
    </div>
  )
}

export default Search;