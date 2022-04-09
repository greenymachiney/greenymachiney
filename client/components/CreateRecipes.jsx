import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateRecipes = () => {
  const [recipe, setRecipe] = useState({
    recipeName: "",
    ingredients: "",
    instructions: "",
    category: "",
    recipes: [],
  });

  const handleInputEvent = (event) => {
    const { name, value } = event.target;
    setRecipe((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  //save drink
  const saveDrink = () => {
    axios
      .put("/drunk/userDrinks", {
        drink: {
          recipeName: recipe.recipeName,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          category: recipe.category,
        },
      })
      .then(() => console.log("saved!"))
      .catch((err) => console.error(err));
  };

  //CLOUDINARY USER PHOTO UPLOAD SETUP
  //   <CloudinaryContext cloudName="ddg1jsejq">
  //   <div>
  //     <Image publicId="sample" width="50" />
  //   </div>
  //   <Image publicId="sample" width="0.5" />
  // </CloudinaryContext>
  const upLoadPresetName = "Crwlr-FIVE-Guys";
  const cloudName = "ddg1jsejq";

  const cloudinaryAPI_KEY = "836695157638662";
  
  const cloudinary_URL =
    "https://api.cloudinary.com/v1_1/ddpdhbrkj/image/upload";

  const { recipeName, ingredients, instructions, category } = recipe;
  return (
    <div>
      <h3>Create a drink!</h3>
      <form onSubmit={saveDrink}>
        <input
          type="text"
          placeholder="name of recipe"
          value={recipeName}
          name="recipeName"
          onChange={handleInputEvent}
        ></input>
        <input
          type="text"
          placeholder="ingredients"
          value={ingredients}
          name="ingredients"
          onChange={handleInputEvent}
        ></input>
        <input
          type="text"
          placeholder="instructions"
          value={instructions}
          name="instructions"
          onChange={handleInputEvent}
        ></input>
        <input
          type="text"
          placeholder="category"
          value={category}
          name="category"
          onChange={handleInputEvent}
        ></input>
        <button type="submit">Save to Drink Book</button>
      </form>
    </div>
  );
};

export default CreateRecipes;

/**
 *   document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("/api/signuploadwidget");
    const data = await response.json();

    const options = {
      cloudName: data.cloudname,
      apiKey: data.apikey,
      uploadSignatureTimestamp: data.timestamp,
      uploadSignature: data.signature,
      cropping: false,
      folder: "signed_upload_demo_uw",
    };

    const processResults = (error, result) => {
      if (!error && result && result.event === "success") {
        console.log(result);

        var str = JSON.stringify(result, null, 4);
        document.getElementById("uwdata").innerHTML += str;
      }
    };

    const myWidget = window.cloudinary.createUploadWidget(
      options,
      processResults
    );
    document
      .getElementById("upload_widget")
      .addEventListener("click", () => myWidget.open(), false);
  });
 */
