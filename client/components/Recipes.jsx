import React, { useState } from "react";
import axios from 'axios';
class Recipes extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      drinks: [],
    };
    this.getSavedDrinks = this.getSavedDrinks.bind(this);
    this.getDrinkData = this.getDrinkData.bind(this);
  }



  getSavedDrinks() {
    axios.get('/drunk/drinks')
      .then(({ data }) => this.setState({drinks: data}))
      .catch(err => console.error(err));
  }

  getDrinkData() {
    const { drinks } = this.state;
    axios.get(`cocktailByName/${drinks}`)
      .then(({ data }) => console.log(data[0], 'drink data!'))
      .catch(err => console.error(err));
  }



  componentDidMount(){
    this.getSavedDrinks();
    this.getDrinkData();
  }



  render() {
    const { drinks } = this.state
  return (
    <div className="list-group">
      <h1 className='drinkBookHeader'>Drink Book</h1>
    {
    drinks.map((drink, i) => (
      <a href="#" className="list-group-item list-group-item-action" aria-current="true" key={i}>
      <div className="d-flex w-100 justify-content-between" key={i}>
        <h5 className="mb-1" key={i}>{drink}</h5>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/MargaritaReal.jpg/1200px-MargaritaReal.jpg" width="100" height="100"></img>
      </div>
      <p className="mb-1">Some placeholder content in a paragraph.</p>
      <small>And some small print.</small>
    </a>
    ))
    }
</div>
  )
  }
}

export default Recipes;