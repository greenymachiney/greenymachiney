import React, { useState } from "react";
import axios from "axios";
import VideoPlayer from "./VideoPlayer.jsx";

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

  const addToShoppingList = (ingredient) => {
    axios.post('/shopping/addItem', { item: ingredient })
      .catch(err => console.error(err));
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
            <div className="card-text" style={{marginBottom: '10px'}}>
              <h5>Ingredients:</h5>
              <div>
                {
                  getIngredients().map((ingredient, i) => <div key={i} className='ingredient-item'>
                    <button onClick={() => addToShoppingList(ingredient)} className="btn btn-success btn-sm add-ingredient-button" title="add to your shopping list!">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="2 2 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                      </svg>
                    </button>
                    {drink[`strMeasure${i + 1}`]} {ingredient}
                  </div>)
                }
              </div>
            </div>
            <div className="card-text">
              <h5>Instructions:</h5>
              <div>{drink.strInstructions}</div>
            </div>
            <div className="save-drink-button">
              <button className="btn btn-success btn-sm" onClick={saveDrink} title="save to your recipes!">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                </svg>
              </button>
            </div>
            <hr></hr>
            <VideoPlayer drink={drink} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Drink;