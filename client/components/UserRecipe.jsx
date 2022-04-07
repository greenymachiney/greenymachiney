import React, { useEffect, useState } from "react";

const UserRecipe = ({ recipes, handleClick }) => {
  const [displayRecipe, setDisplayRecipes] = useState(recipes);
  useEffect(() => {
    setDisplayRecipes((state) => {
      return { ...state };
    });
  }, [recipes]);

  return (
    <div>
      <ul onClick={handleClick}>
        <li>{displayRecipe.recipeName}</li>
        <li>{displayRecipe.ingridients}</li>
        <li>{displayRecipe.instructions}</li>
      </ul>
    </div>
  );
};

export default UserRecipe;
