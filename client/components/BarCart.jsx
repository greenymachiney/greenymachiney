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
    this.deleteLiquor = this.deleteLiquor.bind(this);
  }

handleClick() {
  const { liquor } = this.state
  axios.put('/drunk/liquorList', {liquorList: liquor})
  .then(() => this.getLiquorList())
}

deleteLiquor(liquor) {
  console.log(liquor)
  axios.put('/drunk/liquorList/delete', {liquorList: liquor})
   .then(() => this.getLiquorList())
}

// getSpecificLiquorRecipes(liquor) {
//   axios.get(`/drunk/cocktailByIngredient/${liquor}`)
  
// }

getLiquorList() {
  axios.get('/drunk/liquorList')
  .then(({data}) => this.setState({liquorList: data}))
}

getSpecificLiquorRecipes(liquor) {
  axios.get(`/drunk/cocktailByIngredient/${liquor}`)
  .then(({data}) => {
    if(data !== 'None Found') {
      this.setState({drinks: data})
    }
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

  const addToShoppingList = (ingredient) => {
    axios.post('/shopping/addItem', { item: ingredient })
      .catch(err => console.error(err));
  }
}

componentDidMount() {
  this.getLiquorList();
}

  render() {
  const {drink} = this.state
  return (
      <div>
        <h1 className='drinkBookHeader'>Bar Cart</h1>
        <div>
        {
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
                      <button onClick={() => addToShoppingList(ingredient)} className="btn btn-success btn-sm add-ingredient-button" title="add to your shopping list!">
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

            <div className="save-drink-button">
              <button className="btn btn-success btn-sm" onClick={this.saveDrink}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                </svg>
              </button>
            </div>
              </div>
              </div>
              </div>
          </div>
        }
        </div>
          <div className='child inline-block-child search'>
       <input type='text' name='liquor' className='search-box' value={this.state.liquor} onChange={(event) =>  this.setState({liquor: event.target.value})}/>
          <button className="btn btn-success btn-sm search" onClick={this.handleClick}>add liquor</button>
          </div>
          <div className="shopping-list">
         {
         this.state.liquorList.map((liquor, index) => (
              <button key={index} className="list-group-item list-group-item-action" onClick={() => this.getSpecificLiquorRecipes(liquor)} >{liquor}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16" onClick={() => this.deleteLiquor(liquor)}>
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
              </svg>
              </button>
         ))
         }
        </div>
        <hr></hr>
        <div className="shopping-list">
        {
            !this.state.drinks.length ? null :
            <div className="list-group">
              <div>
                {
                  this.state.drinks.map((drink, i) => (
                    <div key={i}  onClick={() => {
                        const drinkObj = this.getCocktailByExactName(drink.strDrink)
                        this.setState({drink: {drinkObj}})
                      }} type="button" className="list-group-item list-group-item-action" aria-current="true" >{drink.strDrink}</div>
                  ))
                }
              </div>
            </div>
          }
          </div>
      </div>
  );
  }
}

export default BarCart; 