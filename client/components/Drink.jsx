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
            <div className="save-drink-button">
              <button className="btn btn-success btn-sm" onClick={saveDrink} title="save to your recipes!">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Drink;