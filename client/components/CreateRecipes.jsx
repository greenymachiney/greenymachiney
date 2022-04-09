import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateRecipes = () => {
  const [recipe, setRecipe] = useState({
    recipeName: "",
    ingredients: "",
    instructions: "",
    category: "",
    recipes: [],
  });

  const handleInputEvent = (event) => {
    const { name, value } = event.target;
    setRecipe((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  //save drink
  const saveDrink = () => {
    axios
      .put("/drunk/userDrinks", {
        drink: {
          recipeName: recipe.recipeName,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          category: recipe.category,
        },
      })
      .then(() => console.log("saved!"))
      .catch((err) => console.error(err));
  };

  const { recipeName, ingredients, instructions, category } = recipe;
  return (
    <div>
      <h3>Create a drink!</h3>
      <form onSubmit={saveDrink}>
        <input
          type="text"
          placeholder="name of recipe"
          value={recipeName}
          name="recipeName"
          onChange={handleInputEvent}
        ></input>
        <input
          type="text"
          placeholder="ingredients"
          value={ingredients}
          name="ingredients"
          onChange={handleInputEvent}
        ></input>
        <input
          type="text"
          placeholder="instructions"
          value={instructions}
          name="instructions"
          onChange={handleInputEvent}
        ></input>
        <input
          type="text"
          placeholder="category"
          value={category}
          name="category"
          onChange={handleInputEvent}
        ></input>
        <button type="submit">Save to Drink Book</button>
      </form>
    </div>
  );
};

export default CreateRecipes;
