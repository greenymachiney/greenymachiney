import React, { useState } from "react";
import { getCocktailByIngredient } from "../../server/api/getCocktail";

class BarCart extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      allLiquors: [],
    };
  }



  render() {
  return (
    <div>
      <input type="text">
        </input>
        <button>add liquor</button>
    </div>
  )
  }
}

export default BarCart;