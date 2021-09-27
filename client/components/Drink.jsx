import React, { useState } from "react";

const Drink = ({ drink, saveDrink }) => {

  const getIngredients = () => {
    const ingredients = [];

    let count = 1;
    while (drink[`strIngredient${count}`]) {
      ingredients.push(drink[`strIngredient${count}`]);
      count++;
    };

    return ingredients;
  }

  return (
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
  )
}

export default Drink;