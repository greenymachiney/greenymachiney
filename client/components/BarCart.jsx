import axios from "axios";
import React, { useState } from "react";
import { getCocktailByIngredient } from "../../server/api/getCocktail";

class BarCart extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      liquor: '',
      liquorList: []
    };
    this.getLiquorList = this.getLiquorList.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

handleClick() {
  console.log('this.state.liquor:', this.state.liquor)
  const { liquor } = this.state
  axios.put('/drunk/liquorList', {liquorList: liquor})
  .then(() => this.getLiquorList())
}

getLiquorList() {
  axios.get('/drunk/liquorList')
  .then(({data}) => this.setState({liquorList: data}))
}

componentDidMount() {
  this.getLiquorList();
}

  render() {
  return (
    <div>
      <div>
       
      </div>
      <div>
     <input type='text' name='liquor' value={this.state.liquor} onChange={(event) =>  this.setState({liquor: event.target.value})}/>
     <div>{this.state.liquor}</div>
        <button onClick={this.handleClick}>add liquor</button>
        </div>
    </div>
  );
  }
}

export default BarCart;