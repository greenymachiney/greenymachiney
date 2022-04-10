import React, { useState } from "react";
import axios from "axios";
import Drink from "./Drink.jsx"

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
    this.saveDrink = this.saveDrink.bind(this);
  }

  saveDrink() {
    axios
      .post("/drunk/saveCocktail", { drink: this.state.drink })
      .then(() => console.log("saved!"))
      .catch((err) => console.error(err));
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

  getCocktailByExactName(name) {
    axios.get(`/drunk/cocktailByName/${name}`)
      .then(({ data }) => {
        this.state.drinks = data[0];
      })
      .catch(err => console.error(err));
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
    console.log("LINE 53", drink);
    axios
      .put("/drunk/userDrinks/delete", { drink: drink })
      .then((data) => {
        console.log("LINE 57", data);
        this.setState({ userDrinks: [] });
      })
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
          {/* {
            !drinks ? null :
            <div className="list-group">
              {
                drinks.map((drink, i) => 
                  <Drink 
                    drink={drink} 
                    saveDrink={saveDrink}
                  />
                )
              }
            </div>
          } */}
          {userDrinks.map((drink, index) => (
            <Drink drink={drink} saveDrink={this.saveDrink} />
          ))}
        </div>

        {drinks.map((drink, i) => (
          <Drink drink={drink} saveDrink={this.saveDrink} />
        ))}
      </div>
    );
  }
}

export default Recipes;

// className='btn-buggy' onClick={() => this.handleClick(drink.strDrink)}>Delete
