import React, { useState } from "react";
import axios from "axios";

const Search = () => {

  return (
    <div>
      search for a new drink recipe

      <button onClick={getRandomCocktail}>
        Get a Random Cocktail
      </button>
    </div>
  )
}

export default Search;