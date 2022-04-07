import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateRecipes = () => {
  const [createRecipes, setUserRecipes] = useState({
    name: "",
    ingridients: "",
    instructions: "",
  });
  console.log(createRecipes, "State 1");

  // useEffect(() => {
  //   sendPostRecipeToServer();
  // }, []);

  const handleInputEvent = (event) => {
    const { name, value } = event.target;
    console.log("LINE 29", createRecipes.ingridients);
    setUserRecipes((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
    console.log(name);
  };

  const sendPostRecipeToServer = (event) => {
    event.preventDefault();

    let ingridient = createRecipes.ingridients;
    console.log("LINE 32", ingridient);
    axios
      .post("/createrecipe/add", {
        recipe: {
          name: createRecipes.name,
          instructions: createRecipes.instructions,
          ingridients: createRecipes.instructions,
        },
      })
      .then((data) => {
        console.log("LINE 31 SUCCESSFUL DELIVERY", data);
        setCreateRecipes((state) => {
          return {
            ...state,
            name: "",
            instructions: "",
            ingridients: "",
          };
        });
      })
      .catch((err) => {
        console.error("LINE 33 TOO BAD", err);
      });
  };

  //const handleClick = () => {};
  const { name, ingridients, instructions } = createRecipes;
  return (
    <div>
      <h3>My Own recipes</h3>
      <form onSubmit={sendPostRecipeToServer}>
        <input
          type="text"
          placeholder="name of recipe"
          value={name}
          name="name"
          onChange={handleInputEvent}
        ></input>
        <input
          type="text"
          placeholder="ingridients"
          value={ingridients}
          name="ingridients"
          onChange={handleInputEvent}
        ></input>
        <input
          type="text"
          placeholder="instructions"
          value={instructions}
          name="instructions"
          onChange={handleInputEvent}
        ></input>
        <button type="submit">Save your recipe</button>
      </form>
    </div>
  );
};

export default CreateRecipes;
