import React, { useState } from "react";
import axios from 'axios';
class Recipes extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      drinks: [],
    };
    this.getSavedDrinks = this.getSavedDrinks.bind(this);
  }
  getSavedDrinks() {
    axios.get('/drunk/drinks')
      .then(({ data }) => data.map(drink => {
       return axios.get(`/drunk/cocktailByName/${drink}`)
        .then(({ data }) => {
          this.setState(prevState => ({
            drinks: [...prevState.drinks, data[0]]
          }))
        })
      }))
  }
  // getDrinkData() {
  //   const { drinks } = this.state;
  //   console.log(drinks, 'hey hey hey')
  //   drinks.map(drink => {
  //     axios.get(`cocktailByName/${drink}`)
  //     .then(({ data }) => console.log(data, 'drink data!'))
  //     .catch(err => console.error(err));
  //   })
  // }
  componentDidMount(){
    this.getSavedDrinks();
  }
  render() {
    const { drinks } = this.state
  return (
    <div className="list-group">
      <h1 className='drinkBookHeader'>Drink Book</h1>
      {/* {
        drinks.map((drink, i) =>
          <div key={i}>
            {drink.strDrink}
            <img src={drink.strDrinkThumb} height="300px"></img>
          </div>)
      } */}
    {
    drinks.map((drink, i) => (
      <a href="#" className="list-group-item list-group-item-action" aria-current="true" key={i}>
      <div className="d-flex w-100 justify-content-between" key={i}>
        <h5 className="mb-1" key={i}>{drink.strDrink}</h5>
        <img src={drink.strDrinkThumb} width="100" height="100"></img>
      </div>
      <p className="mb-1">{drink.strInstructions}</p>
      <small>{drink.strCategory}</small>
    </a>
    ))
    }
</div>
  )
  }
}

export default Recipes;