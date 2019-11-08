import React from "react";

const RecipeGridItem = ({ recipe }) => {
  return (
    <section className="grid-col">
      <h3>{recipe.name}</h3>
      {/* <div className="img-card">
              <img src={recipe.image} className="img" />
            </div> */}
      <span className="rating">Ratings</span>
      <span className="author">{recipe.author}</span>
    </section>
  );
};

export default RecipeGridItem;
