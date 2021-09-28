import axios from "axios";
import React from "react";

class BarCart extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      liquor: '',
      liquorList: [],
      drinks: [],
      drink: {},
      search: '',
    };
    this.getLiquorList = this.getLiquorList.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getSpecificLiquorRecipes = this.getSpecificLiquorRecipes.bind(this);
    this.getCocktailByExactName = this.getCocktailByExactName.bind(this);
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

getSpecificLiquorRecipes(liquor) {
  axios.get(`/drunk/cocktailByIngredient/${liquor}`)
  .then(({data}) => {
    console.log(data);
   this.setState({drinks: data})
    })
  }

getCocktailByExactName(name) {
  axios.get(`/drunk/cocktailByName/${name}`)
    .then(({ data }) => {
      this.setState({drink: data[0]});
    })
    .catch(err => console.error(err));
}

getIngredients() {
  const ingredients = [];
  let count = 1;
  while (drink[`strIngredient${count}`]) {
    ingredients.push(drink[`strIngredient${count}`]);
    count++
  };
  return ingredients;
}

componentDidMount() {
  this.getLiquorList();
}

  render() {
  return (
    <div>
      <div>
      {
        !drink.strDrink ? null :
        <div>
          <div>Drink Name: {drink.strDrink}</div>
          <div><img src={drink.strDrinkThumb} height='300px'></img></div>
          <div>
            Ingredients:
            <ul>
              {
                getIngredients().map((ingredient, i) => <li key={i}>{drink[`strMeasure${i + 1}`]} {ingredient}</li>)
              }
            </ul>
          </div>
          <div>
            Instructions:
            <div>{drink.strInstructions}</div>
          </div>

          <div>
            <button onClick={saveDrink}>
              Save this drink to your drink book!
            </button>
          </div>

        </div>
      }
      </div>
        <div>
     <input type='text' name='liquor' value={this.state.liquor} onChange={(event) =>  this.setState({liquor: event.target.value})}/>
     <div>{this.state.liquor}</div>
        <button onClick={this.handleClick}>add liquor</button>
        </div>
        <ul>
       {this.state.liquorList.map((liquor, index) => (
           <li key={index}><button onClick={() => this.getSpecificLiquorRecipes(liquor)} >{liquor}</button></li>
       ))}
      </ul>
      {
          !this.state.drinks ? null :
          <div>
            <ul>
              {
                this.state.drinks.map((drink, i) => ( <li key={i} onClick={() => getCocktailByExactName(drink.strDrink)}>{drink.strDrink}</li>))
              }
            </ul>
          </div>
        }
    </div>
  );
  }
}

export default BarCart; 