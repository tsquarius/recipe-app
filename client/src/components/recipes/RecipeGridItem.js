import React from "react";

const RecipeGridItem = ({ recipe }) => {
  return (
    <section className="grid-col">
      <h3>{recipe.name}</h3>
      {/* <div className="img-card">
              <img src={recipe.image} className="img" />
            </div> */}
      <span className="rating">Rated: 
        {Math.round(recipe.averageRate * 100) / 100}
      </span>
      <span className="author">Recipe by: {recipe.author}</span>
    </section>
  );
};

export default RecipeGridItem;
