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
    <div className="card mb-3">
      <div className="row no-gutters">
        <div className="col-md-4">
          <img className="card-img-top" src={drink.strDrinkThumb}></img>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h2 className="card-title">{drink.strDrink}</h2>
            <div className="card-text">
              Ingredients:
              <ul>
                {
                  getIngredients().map((ingredient, i) => <li key={i}>{drink[`strMeasure${i + 1}`]} {ingredient}</li>)
                }
              </ul>
            </div>
            <div className="card-text">
              Instructions:
              <div>{drink.strInstructions}</div>
            </div>

            <div>
              <button onClick={saveDrink}>
                Save this drink to your drink book!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Drink;