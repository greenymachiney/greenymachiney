import React, { useEffect, useState } from "react";
import UserRecipe from "./UserRecipe.jsx";

const DisplayRecipe = ({ recipes, handleClick }) => {
  //const [mapRecipes, setMapRecipes] = useState(recipes.data);
  console.log(recipes.data);
  return (
    <div>
      {mapRecipes.recipes.map((recipe) => {
        console.log("LINE 8 DISPLAY RECIPE", recipe);
        return <UserRecipe recipe={recipe} handleClick={handleClick} />;
      })}
    </div>
  );
};

export default DisplayRecipe;
