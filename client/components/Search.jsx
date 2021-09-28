import React, { useState } from "react";
import axios from "axios";

import Drink from "./Drink.jsx";

const Search = () => {
  const [drink, setDrink] = useState({});
  const [drinks, setDrinks] = useState([]);
  const [search, setSearch] = useState('');

  const getRandomCocktail = () => {
    axios.get('/drunk/randomCocktail')
      .then(({ data }) => {
        console.log('RANDOM COCKTAIL: ', data[0]);
        setDrink(data[0]);
      })
      .catch(err => console.error(err));
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
    axios.put('/drunk/saveCocktail', { drink: drink })
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
        <Drink drink={drink} saveDrink={saveDrink}/>
      }
      <hr />
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
                drinks.map((drink, i) => <li key={i}><a onClick={() => getCocktailByExactName(drink.strDrink)}>{drink.strDrink}</a></li>)
              }
            </ul>
          </div>
        }
      </div>
    </div>
  )
}

export default Search;