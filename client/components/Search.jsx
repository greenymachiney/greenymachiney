import React, { useState } from "react";
import axios from "axios";

const Search = () => {
  const [randomCocktail, setRandomCocktail] = useState();

  const getRandomCocktail = () => {
    axios.get('/drunk/randomCocktail')
      .then(({ data }) => {
        console.log(data);
      })
  }

  return (
    <div>
      search for a new drink recipe
      <div>
        <button onClick={getRandomCocktail}>
          Get a Random Cocktail
        </button>
      </div>
    </div>
  )
}

export default Search;