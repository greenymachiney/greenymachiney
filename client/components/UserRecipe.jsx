import React, { useState, useEffect } from "react";
import axios from "axios";

const UserRecipes = () => {
  const [userRecipes, setUserRecipes] = useState({
    name: "",
    ingridients: [],
    intructions: "",
  });

  const handleInputEvent = () => {
    const [name, value] = e.target;
    setUserRecipes((state) => {
      return {
        ...state,
        [name]: value,
        [name]: [value],
        [name]: value,
      };
    });
  };

  const sendPostRecipeToServer = () => {
    axios
      .post("/userrecipes", {
        userRecipes: {
          name: userRecipes.name,
          instructions: userRecipes.instructions,
          ingridients: userRecipes.ingridients,
        },
      })
      .then((data) => {
        console.log("LINE 31 SUCCESSFUL DELIVERY", data);
      })
      .catch((err) => {
        console.error("LINE 33 TOO BAD", err);
      });
  };

  useEffect(() => {
    sendPostRecipeToServer();
  }, []);

  const handleClick = () => {};

  return (
    <div>
      <h3>My Own recipes</h3>
      <form onSubmit={sendPostRecipeToServer}>
        <input
          type="text"
          placeholder="name of recipe"
          value={userRecipes.name}
          name="name"
          onChange={handleInputEvent}
        ></input>
        <input
          type="text"
          placeholder="ingridients"
          value={userRecipes.name}
          name="indgridients"
          onChange={handleInputEvent}
        ></input>
        <input
          type="text"
          placeholder="name of recipe"
          value={userRecipes.name}
          name="instructions"
          onChange={handleInputEvent}
        ></input>
        <button type="submit"></button>
      </form>
    </div>
  );
};

export default UserRecipes;
