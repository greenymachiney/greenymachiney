import React, { useState } from "react";
import axios from "axios";
class Recipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drinks: [],
      userDrinks: [],
    };
    this.getSavedDrinks = this.getSavedDrinks.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getUserDrinks = this.getUserDrinks.bind(this);
    this.deleteUserDrink = this.deleteUserDrink.bind(this);
  }

  getSavedDrinks() {
    axios.get("/drunk/drinks").then(({ data }) =>
      data.map((drink) => {
        return axios.get(`/drunk/cocktailByName/${drink}`).then(({ data }) => {
          this.setState((prevState) => ({
            drinks: [...prevState.drinks, data[0]],
          }));
        });
      })
    );
  }

  getUserDrinks() {
    axios.get("/drunk/userDrinks").then((data) => {
      console.log("LINE 15 FRONT END CREATE RECIPES ||", data);
      this.setState((recipes) => {
        return {
          ...recipes,
          userDrinks: data.data,
        };
      });
    });
  }

  componentDidMount() {
    this.getSavedDrinks();
    this.getUserDrinks();
  }

  handleClick(drink) {
    axios
      .put("/drunk/drinks", { drinks: drink })
      .then(() => this.setState({ drinks: [] }))
      .then(() => this.getSavedDrinks());
  }

  deleteUserDrink(drink) {
    axios
      .put("/drunk/userDrinks/delete", { drink: drink })
      .then(() => this.setState({ userDrinks: [] }))
      .then(() => this.getUserDrinks());
  }

  render() {
    const { drinks } = this.state;
    const { userDrinks } = this.state;
    console.log(userDrinks);
    // let apidrinks = drinks.filter((drink) => typeof drink === "string");
    console.log(drinks);
    return (
      <div className="list-group">
        <div className="recipes-header h1">
          <h1>Drink Book</h1>
        </div>
        <div>
          {userDrinks.map((drink, index) => (
            <a
              href="#"
              className="list-group-item list-group-item-action"
              aria-current="true"
              key={index}
              drink={drink}
            >
              <div className="d-flex w-100 justify-content-between" key={index}>
                <h5 className="mb-1 hey" key={index}>
                  {drink.recipeName}
                </h5>
                <img src={drink.strDrinkThumb} width="100" height="100"></img>
              </div>
              <p className="mb-1">{drink.instructions}</p>
              <small className="drinkCat">{drink.category}</small>
              <br />
              <br />

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash"
                viewBox="0 0 16 16"
                onClick={() => this.deleteUserDrink(drink)}
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path
                  fillRule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                />
              </svg>
            </a>
          ))}
        </div>

        {drinks.map((drink, i) => (
          <a
            href="#"
            className="list-group-item list-group-item-action"
            aria-current="true"
            key={i}
            drink={drink}
          >
            <div className="d-flex w-100 justify-content-between" key={i}>
              <h5 className="mb-1 hey" key={i}>
                {drink.strDrink}
              </h5>
              <img src={drink.strDrinkThumb} width="100" height="100"></img>
            </div>
            <p className="mb-1">{drink.strInstructions}</p>
            <small className="drinkCat">{drink.strCategory}</small>
            <br />
            <br />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash"
              viewBox="0 0 16 16"
              onClick={() => this.handleClick(drink.strDrink)}
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path
                fillRule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
          </a>
        ))}
      </div>
    );
  }
}

export default Recipes;

// className='btn-buggy' onClick={() => this.handleClick(drink.strDrink)}>Delete
