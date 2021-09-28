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
    this.getIngredients = this.getIngredients.bind(this);
    this.saveDrink = this.saveDrink.bind(this);
  }

handleClick() {
  console.log('this.state.liquor:', this.state.liquor)
  const { liquor } = this.state
  axios.put('/drunk/liquorList', {liquorList: liquor})
  .then(() => this.getLiquorList())
}

getSpecificLiquorRecipes(liquor) {
  axios.get(`/drunk/cocktailByIngredient/${liquor}`)
  
}

getLiquorList() {
  axios.get('/drunk/liquorList')
  .then(({data}) => this.setState({liquorList: data}))
}

getSpecificLiquorRecipes(liquor) {
  axios.get(`/drunk/cocktailByIngredient/${liquor}`)
  .then(({data}) => {
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
  console.log('DRINK STATE IN GET ING', this.state.drink);
  let count = 1;
  while (this.state.drink[`strIngredient${count}`]) {
    ingredients.push(this.state.drink[`strIngredient${count}`]);
    count++
  };
  return ingredients;
}

saveDrink() {
  axios.post('/drunk/saveCocktail', {drink: this.state.drink})
  .then(()=> console.log('saved!'))
  .catch(err => console.error(err));
}

componentDidMount() {
  this.getLiquorList();
}

  render() {
  const {drink} = this.state
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
                this.getIngredients().map((ingredient, i) => <li key={i}>{drink[`strMeasure${i + 1}`]} {ingredient}</li>)
              }
            </ul>
          </div>
          <div>
            Instructions:
            <div>{drink.strInstructions}</div>
          </div>

          <div>
            <button onClick={this.saveDrink}>
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
                this.state.drinks.map((drink, i) => (
                  <li key={i} onClick={() => {
                      const drinkObj = this.getCocktailByExactName(drink.strDrink)
                      this.setState({drink: {drinkObj}})
                    }}>{drink.strDrink}</li>
                ))
              }
            </ul>
          </div>
        }
    </div>
  )
  }
}

export default BarCart; 