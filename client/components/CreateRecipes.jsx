import React, { useState, useEffect } from "react";
import axios from "axios";
class CreateRecipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeName: "",
      ingredients: "",
      instructions: "",
      category: "",
      recipes: [],
    };
    this.handleInputEvent = this.handleInputEvent.bind(this);
    this.saveDrink = this.saveDrink.bind(this);
    //this.handleClick = this.handleClick.bind(this);
  }

  handleInputEvent(event) {
    const { name, value } = event.target;
    console.log("LINE 29", this.state.ingredients);
    this.setState((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
    console.log(name);
  }

  //save drink
  saveDrink() {
    //event.preventDefault();
    axios
      .put("/drunk/userDrinks", {
        drink: {
          recipeName: this.state.recipeName,
          ingredients: this.state.ingredients,
          instructions: this.state.instructions,
          category: this.state.category,
        },
      })
      .then(() => console.log("saved!"))
      .catch((err) => console.error(err));
  }

  render() {
    const { recipeName, ingredients, instructions, category } = this.state;
    return (
      <div>
        <h3>Create a drink!</h3>
        <form onSubmit={this.saveDrink}>
          <input
            type="text"
            placeholder="name of recipe"
            value={recipeName}
            name="recipeName"
            onChange={this.handleInputEvent}
          ></input>
          <input
            type="text"
            placeholder="ingredients"
            value={ingredients}
            name="ingredients"
            onChange={this.handleInputEvent}
          ></input>
          <input
            type="text"
            placeholder="instructions"
            value={instructions}
            name="instructions"
            onChange={this.handleInputEvent}
          ></input>
          <input
            type="text"
            placeholder="category"
            value={category}
            name="category"
            onChange={this.handleInputEvent}
          ></input>
          <button type="submit">Save to Drink Book</button>
        </form>
        <div>
          <br></br>
          <br></br>
          <h3>I made these ones myself</h3>
          <br></br>
          <br></br>
          {/* <DisplayRecipe
            recipes={this.state.recipes}
            handleClick={this.handleClick}
          /> */}
        </div>
      </div>
    );
  }
}

export default CreateRecipes;
