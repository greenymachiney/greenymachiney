import React, { useState } from "react";
import axios from "axios";

const Search = () => {
  const [drink, setDrink] = useState({});
  const [search, setSearch] = useState('');
  const [drinks, setDrinks] = useState([]);

  const getRandomCocktail = () => {
    axios.get('/drunk/randomCocktail')
      .then(({ data }) => {
        console.log('RANDOM COCKTAIL: ', data[0]);
        setDrink(data[0]);
      })
      .catch(err => console.error(err));
  }

  const getIngredients = () => {
    const ingredients = [];

    let count = 1;
    while (drink[`strIngredient${count}`]) {
      ingredients.push(drink[`strIngredient${count}`]);
      count++
    };

    return ingredients;
  }

  const getCocktailByName = () => {
    axios.get(`/drunk/cocktailByName/${search}`)
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
        setDrink(data[0]);
      })
      .catch(err => console.error(err));
  }

  const saveDrink = () => {
    axios.post('/drunk/saveCocktail', { drink: drink })
      .then(() => console.log('saved!'))
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
        !drink.strDrink ? null :
        <div>
          <div>Drink Name: {drink.strDrink}</div>
          <div><img src={drink.strDrinkThumb} height='300px'></img></div>
          <div>
            Ingredients:
            <ul>
              {
                getIngredients().map((ingredient, i) => <li key={i}>{drink[`strMeasure${i + 1}`]} {ingredient}</li>)
              }
            </ul>
          </div>
          <div>
            Instructions:
            <div>{drink.strInstructions}</div>
          </div>

          <div>
            <button onClick={saveDrink}>
              Save this drink to your drink book!
            </button>
          </div>

        </div>
      }
      <div>
        <input value={search} onChange={(e) => setSearch(e.target.value)}/>
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