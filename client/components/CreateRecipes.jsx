import React, { useState, useEffect } from "react";
import axios from "axios";
import { result } from "underscore";

const CreateRecipes = () => {
  const [recipe, setRecipe] = useState({
    recipeName: "",
    ingredients: "",
    instructions: "",
    category: "",
    recipes: [],
    thumbnail: "",
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

  const saveDrink = () => {
    axios
      .put("/drunk/userDrinks", {
        drink: {
          recipeName: recipe.recipeName,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          category: recipe.category,
          thumbnail: recipe.thumbnail,
        },
      })
      .then(() => console.log("saved!"))
      .catch((err) => console.error(err));
  };

  //CLOUDINARY USER PHOTO UPLOAD SETUP
  const upLoadPresetName = "Crwlr-FIVE-Guys";
  const cloudName = "ddg1jsejq";
  let showWidget = () => {
    let widget = window.cloudinary.createUploadWidget(
      {
        cloudName: `${cloudName}`,
        uploadPreset: `${upLoadPresetName}`,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("LINE 59", result.info.url);
          setRecipe((state) => {
            return {
              ...state,
              thumbnail: result.info.url,
            };
          });
          console.log("LINE 63", result.info.url);
        }
      }
    );
    widget.open();
  };

  useEffect(() => {}, [recipe.thumbnail]);

  const { recipeName, ingredients, instructions, category, thumbnail } = recipe;
  return (
    <div className="recipe-div">
      <h3 className="header-drink">Create a drink recipe!</h3>
      <br></br>
      <div>
        <button onClick={showWidget} className="input-btn">
          Upload Image
        </button>
        <br></br>
        {thumbnail && (
          <img src={thumbnail} width="200px" crop="scale" height="200px" />
        )}
        <br></br>
        <form onSubmit={saveDrink} className="user-drink">
          <input
            className="name"
            type="text"
            placeholder="name of recipe"
            value={recipeName}
            name="recipeName"
            onChange={handleInputEvent}
          ></input>
          <textarea
            className="input"
            type="text"
            placeholder="ingredients"
            value={ingredients}
            name="ingredients"
            onChange={handleInputEvent}
          ></textarea>
          <textarea
            className="input"
            type="text"
            placeholder="instructions"
            value={instructions}
            name="instructions"
            onChange={handleInputEvent}
          ></textarea>
          <input
            className="name"
            type="text"
            placeholder="category"
            value={category}
            name="category"
            onChange={handleInputEvent}
          ></input>
          <button type="submit" className="input">
            Send to Drink Book
          </button>
        </form>
      </div>
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

//   <CloudinaryContext cloudName="ddg1jsejq">
//   <div>
//     <Image publicId="sample" width="50" />
//   </div>
//   <Image publicId="sample" width="0.5" />
// </CloudinaryContext>

// const cloudinary_URL =
//   "https://api.cloudinary.com/v1_1/ddpdhbrkj/image/upload";
// console.log(recipe.thumbnail);
