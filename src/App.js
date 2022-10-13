import React, { useState, useEffect } from "react";
import "./App.css";
import Recipe from "./Recipe";
import emoji from "emoji-dictionary";
import axios from "axios";


const App = () => {
  const APP_ID = "73af1357"
  const APP_KEY = "ca8218207ae2265fc942600abcf2b237"

  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState("")
  const [query, setQuery] = useState("")
  

  useEffect(() => {
    getrecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const getrecipes = async () => {
    axios.get(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
      .then(response => {
        console.log(response.data.hits)
        setRecipes(response.data.hits)
      })
      .catch(error => { console.log(error) })
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const updateQuery = (q) => {
    q.preventDefault();
    setQuery(search);
    setSearch("");
  };

  const results = query;
  
  

  return (
    <div className="App">
      <form onSubmit={updateQuery} className="search-form ">
        <input
          className="search-input"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>

      
      {recipes.length === 0 && query !== "" ? <h2 className="search-result" >Oops...Try something else { emoji.getUnicode("confused")}</h2> :
        query !== "" ? <h1 className="search-result">Recipes with "{results}"{ emoji.getUnicode("yum")}</h1> :
          <h1 className="search-result"> Search for recipes{ emoji.getUnicode("grin")}</h1>}
      
      
      
      <div className="recipe">
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.calories}
            Title={recipe.recipe.label}
            Calories={recipe.recipe.calories}
            imgurl={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
