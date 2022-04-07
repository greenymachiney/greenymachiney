import React, { useState, useEffect } from "react";
import axios from "axios";
import DisplayRecipe from "./DisplayRecipe.jsx";
import { render } from "react-dom";

class CreateRecipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeName: "",
      ingridients: "",
      instructions: "",
      recipes: [],
    };
    this.handleInputEvent = this.handleInputEvent.bind(this);
    this.saveDrink = this.saveDrink.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleInputEvent(event) {
    const { name, value } = event.target;
    console.log("LINE 29", this.state.ingridients);
    this.setState((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
    console.log(name);
  }

  //save drink
  saveDrink(event) {
    //event.preventDefault();
    axios
      .put("/drunk/saveCocktail", {
        drink: {
          recipeName: this.state.recipeName,
          ingridients: this.state.ingridients,
          instructions: this.state.instructions,
        },
      })
      .then(() => console.log("saved!"))
      .catch((err) => console.error(err));
  }
  componentDidMount() {
    this.saveDrink();
    axios.get("/drunk/drinks/create").then((data) => {
      console.log("LINE 15 FRONT END CREATE RECIPES ||", data);
      this.setState((recipes) => {
        return {
          ...recipes,
          recipes: data,
        };
      });
    });
  }

  handleClick() {
    this.setState((state) => ({ ...state }));
  }

  render() {
    const { recipeName, ingridients, instructions } = this.state;
    return (
      <div>
        <h3>My Own recipes</h3>
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
            placeholder="ingridients"
            value={ingridients}
            name="ingridients"
            onChange={this.handleInputEvent}
          ></input>
          <input
            type="text"
            placeholder="instructions"
            value={instructions}
            name="instructions"
            onChange={this.handleInputEvent}
          ></input>
          <button type="submit">Save your recipe</button>
        </form>
        <div>
          <br></br>
          <br></br>
          <h3>I made these ones myself</h3>
          <br></br>
          <br></br>
          <DisplayRecipe
            recipes={this.state.recipes}
            handleClick={this.handleClick}
          />
        </div>
      </div>
    );
  }
}

export default CreateRecipes;

// const sendPostRecipeToServer = (event) => {
//   event.preventDefault();

//   let ingridient = createRecipe.ingridients;
//   console.log("LINE 32", ingridient);
//   axios
//     .post("/createrecipe/add", {
//       recipe: {
//         recipeName: createRecipe.recipeName,
//         instructions: createRecipe.instructions,
//         ingridients: createRecipe.instructions,
//       },
//     })
//     .then((data) => {
//       console.log("LINE 31 SUCCESSFUL DELIVERY", data);
//       setCreateRecipes((state) => {
//         return {
//           ...state,
//           recipeName: "",
//           instructions: "",
//           ingridients: "",
//         };
//       });
//     })
//     .catch((err) => {
//       console.error("LINE 33 TOO BAD", err);
//     });
// };

///////////////////////////

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import DisplayRecipe from "./DisplayRecipe.jsx";

// const CreateRecipes = () => {
//   const [createRecipe, setUserRecipes] = useState({
//     recipeName: "",
//     ingridients: "",
//     instructions: "",
//     recipes: [],
//   });
//   console.log(createRecipe, "State 1");
//   const handleClick = () => {
//     useEffect(() => {
//       axios.get("/drunk/drinks/create").then((data) => {
//         console.log("LINE 15 FRONT END CREATE RECIPES ||", data);
//         setUserRecipes((recipes) => {
//           return {
//             ...recipes,
//             recipes: data,
//           };
//         });
//       });
//     }, []);
//   };

//   const handleInputEvent = (event) => {
//     const { name, value } = event.target;
//     console.log("LINE 29", createRecipe.ingridients);
//     setUserRecipes((state) => {
//       return {
//         ...state,
//         [name]: value,
//       };
//     });
//     console.log(name);
//   };

//   //save drink
//   const this.saveDrink = (event) => {
//     event.preventDefault();
//     axios
//       .put("/drunk/saveCocktail", {
//         drink: {
//           recipeName: createRecipe.recipeName,
//           ingridients: createRecipe.ingridients,
//           instructions: createRecipe.instructions,
//         },
//       })
//       .then(() => console.log("saved!"))
//       .catch((err) => console.error(err));
//   };

//   //const handleClick = () => {};
//   const { recipeName, ingridients, instructions } = createRecipe;
//   return (
//     <div>
//       <h3>My Own recipes</h3>
//       <form onSubmit={saveDrink}>
//         <input
//           type="text"
//           placeholder="name of recipe"
//           value={recipeName}
//           name="recipeName"
//           onChange={handleInputEvent}
//         ></input>
//         <input
//           type="text"
//           placeholder="ingridients"
//           value={ingridients}
//           name="ingridients"
//           onChange={handleInputEvent}
//         ></input>
//         <input
//           type="text"
//           placeholder="instructions"
//           value={instructions}
//           name="instructions"
//           onChange={handleInputEvent}
//         ></input>
//         <button type="submit">Save your recipe</button>
//       </form>
//       <div>
//         <br></br>
//         <br></br>
//         <h3>I made these ones myself</h3>
//         <br></br>
//         <br></br>
//         {/* <DisplayRecipe recipes={createRecipe} handleClick={handleClick} /> */}
//       </div>
//     </div>
//   );
// };

//export default CreateRecipes;

// const sendPostRecipeToServer = (event) => {
//   event.preventDefault();

//   let ingridient = createRecipe.ingridients;
//   console.log("LINE 32", ingridient);
//   axios
//     .post("/createrecipe/add", {
//       recipe: {
//         recipeName: createRecipe.recipeName,
//         instructions: createRecipe.instructions,
//         ingridients: createRecipe.instructions,
//       },
//     })
//     .then((data) => {
//       console.log("LINE 31 SUCCESSFUL DELIVERY", data);
//       setCreateRecipes((state) => {
//         return {
//           ...state,
//           recipeName: "",
//           instructions: "",
//           ingridients: "",
//         };
//       });
//     })
//     .catch((err) => {
//       console.error("LINE 33 TOO BAD", err);
//     });
// };
