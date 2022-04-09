import axios from "axios";
import React from "react";

import Drink from "./Drink.jsx";

class BarCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liquor: "",
      liquorList: [],
      drinks: [],
      drink: {},
      search: "",
    };
    this.getLiquorList = this.getLiquorList.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getSpecificLiquorRecipes = this.getSpecificLiquorRecipes.bind(this);
    this.getCocktailByExactName = this.getCocktailByExactName.bind(this);
    this.getIngredients = this.getIngredients.bind(this);
    this.saveDrink = this.saveDrink.bind(this);
    this.deleteLiquor = this.deleteLiquor.bind(this);
    this.addToShoppingList = this.addToShoppingList.bind(this);
  }

  handleClick() {
    const { liquor } = this.state;
    axios
      .put("/drunk/liquorList", { liquorList: liquor })
      .then(() => this.getLiquorList());
  }

  deleteLiquor(liquor) {
    axios
      .put("/drunk/liquorList/delete", { liquorList: liquor })
      .then(() => this.getLiquorList());
  }

  getLiquorList() {
    axios
      .get("/drunk/liquorList")
      .then(({ data }) => this.setState({ liquorList: data }));
  }

  getSpecificLiquorRecipes(liquor) {
    axios.get(`/drunk/cocktailByIngredient/${liquor}`).then(({ data }) => {
      if (data !== "None Found") {
        this.setState({ drinks: data });
      }
    });
  }

  getCocktailByExactName(name) {
    axios
      .get(`/drunk/cocktailByName/${name}`)
      .then(({ data }) => {
        this.setState({ drink: data[0] });
      })
      .catch((err) => console.error(err));
  }

  getIngredients() {
    const ingredients = [];

    let count = 1;
    while (this.state.drink[`strIngredient${count}`]) {
      ingredients.push(this.state.drink[`strIngredient${count}`]);
      count++;
    }
    return ingredients;
  }

  saveDrink() {
    axios
      .post("/drunk/saveCocktail", { drink: this.state.drink })
      .then(() => console.log("saved!"))
      .catch((err) => console.error(err));
  }

  addToShoppingList(ingredient) {
    axios
      .post("/shopping/addItem", { item: ingredient })
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.getLiquorList();
  }

  render() {
    const { drink } = this.state;
    return (
      <div>
        <div className="bar-cart-header">
          <h1>Bar Cart</h1>
        </div>
        <div>
          {!drink.strDrink ? null : (
            <Drink drink={drink} saveDrink={this.saveDrink} />
          )}
          {/* {
          !drink.strDrink ? null :
          <div className="card mb-3">
          <div className="row no-gutters">
            <div className="col-md-4">
              <img className="card-img-top" src={drink.strDrinkThumb}></img>
            </div>
            <div className="col-md-8">
              <div className="card-body">
            <h2 className="card-title" >{drink.strDrink}</h2>
            <div>
              <h5>
                Ingredients:
              </h5>
              <div>
                {
                  this.getIngredients().map((ingredient, i) => <div key={i} className='ingredient-item'>
                      <button onClick={() => this.addToShoppingList(ingredient)} className="btn btn-success btn-sm add-ingredient-button" title="add to your shopping list!">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="2 2 16 16">
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                  </button>
                  {drink[`strMeasure${i + 1}`]} {ingredient}
                
                </div>)
                }
              </div>
            </div>
            <div>
              Instructions:
              <div>{drink.strInstructions}</div>
            </div>
              </div>
              </div>
              </div>
          </div>
        } */}
        </div>
        <div className="child inline-block-child search">
          <input
            type="text"
            name="liquor"
            className="search-box"
            value={this.state.liquor}
            onChange={(event) => this.setState({ liquor: event.target.value })}
          />
        </div>
        <div className="child inline-block-child search">
          <button
            className="btn btn-success btn-sm search"
            onClick={this.handleClick}
          >
            add liquor
          </button>
        </div>
        <div className="shopping-list">
          {this.state.liquorList.map((liquor, index) => (
            <button
              key={index}
              className="list-group-item list-group-item-action"
            >
              <span onClick={() => this.getSpecificLiquorRecipes(liquor)}>
                {liquor}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash"
                viewBox="0 0 16 16"
                onClick={() => this.deleteLiquor(liquor)}
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path
                  fillRule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                />
              </svg>
            </button>
          ))}
        </div>
        <hr></hr>
        <div className="shopping-list">
          {!this.state.drinks.length ? null : (
            <div className="list-group">
              <div>
                {this.state.drinks.map((drink, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      const drinkObj = this.getCocktailByExactName(
                        drink.strDrink
                      );
                      this.setState({ drink: { drinkObj } });
                    }}
                    type="button"
                    className="list-group-item list-group-item-action"
                    aria-current="true"
                  >
                    {drink.strDrink}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default BarCart;
