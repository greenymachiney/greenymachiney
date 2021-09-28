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
      {/* <div>
        <input value={search} onChange={(e) => setSearch(e.target.value)}/>
        <button className="btn btn-success btn-sm" onClick={getCocktailByName}>
          Get Drinks By Name
        </button>

        <button className="btn btn-success random-cocktail-button" onClick={getRandomCocktail}>
          Get a Random Drink
        </button>

      </div> */}

      <div className='parent'>
        <div className='child inline-block-child'>
          <input value={search} placeholder="Search for a new drink" onChange={(e) => setSearch(e.target.value)}/>
          <button className="btn btn-success btn-sm" onClick={getCocktailByName}>
            Search
          </button>
        </div>
        <div className='child inline-block-child random'>
          <button className="btn btn-success random-cocktail-button" onClick={getRandomCocktail}>
            Get a Random Drink
          </button>
        </div>
      </div>

      <hr />
      {
        !drink.strDrink ? null :
        <Drink drink={drink} saveDrink={saveDrink}/>
      }
      <hr />

      <div>
        {/* <input value={search} onChange={(e) => setSearch(e.target.value)}/>
        <button className="btn btn-success btn-sm" onClick={getCocktailByName}>
          Get Drinks By Name
        </button> */}
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