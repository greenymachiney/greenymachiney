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
        setDrink(data[0]);
        setDrinks([]);
      })
      .catch(err => console.error(err));
  }

  const getCocktailByName = () => {
    if (search) {
      axios.get(`/drunk/cocktailByName/${search}`)
        .then(({ data }) => {
          setDrinks(data);
          setSearch('');
          data.length === 1 ? setDrink(data[0]) : setDrink({});
        })
        .catch(err => console.error(err));
    }
  }

  const getCocktailByExactName = (name) => {
    axios.get(`/drunk/cocktailByName/${name}`)
      .then(({ data }) => {
        setDrink(data[0]);
      })
      .catch(err => console.error(err));
  }

  const saveDrink = () => {
    axios.put('/drunk/saveCocktail', { drink: drink })
      .catch(err => console.error(err));
  }

  return (
    <div>
      <div className="bar-cart-header h1">
        <h1 >Search</h1>
      </div>

      <div>
        <div className='child inline-block-child search'>
          <input 
            className='search-box' 
            value={search} 
            placeholder="Search for a new drink" 
            onChange={(e) => setSearch(e.target.value)}/>
          <button 
            className="btn btn-success btn-sm search" 
            onClick={getCocktailByName}>
              Search
          </button>
        </div>
        <div className='child inline-block-child'>
          <button 
            className="btn btn-success btn-sm" 
            onClick={getRandomCocktail}>
            Get a Random Drink
          </button>
        </div>
      </div>

      <hr />
      {
        !drink.strDrink ? null :
        <Drink 
          drink={drink} 
          saveDrink={saveDrink}/>
      }
      <hr/>

      <div>
        {
          !drinks ? null :
          <div className="list-group">
            {
              drinks.map((drink, i) => 
                <button 
                  key={i} 
                  onClick={() => getCocktailByExactName(drink.strDrink)} 
                  type="button" 
                  className="list-group-item list-group-item-action" 
                  aria-current="true">{drink.strDrink}
                </button>)
            }
          </div>
        }
      </div>
    </div>
  )
}

export default Search;