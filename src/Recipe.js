import React from "react";
import style from "./Recipe.module.css";

const Recipe = ({ Title, Calories, imgurl, ingredients }) => {
  return (
    <div className={style.recipe}>
      <h1>{Title}</h1>
      <ol>
        {ingredients.map((ingredient, i) => (
          <li key={i}>{ingredient.text}</li>
        ))}
      </ol>
      <p>Calories:{parseFloat(Calories).toFixed(2)}</p>
      <img className={style.image} src={imgurl} alt="" />
    </div>
  );
};

export default Recipe;
