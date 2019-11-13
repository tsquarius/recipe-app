import React from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { INCREASE_VIEW_COUNT } from "../../graphql/mutations";

const RecipeGridItem = ({ recipe }) => {
  const [increaseViewCount] = useMutation(INCREASE_VIEW_COUNT);

  const handleViewCountIncrease = e => {
    increaseViewCount({
      variables: {
        id: recipe._id
      }
    });
  };

  return (
    <section className="grid-col">
      <h3>
        <Link to={`/recipes/${recipe._id}`} onClick={handleViewCountIncrease}>
          {recipe.name}{" "}
        </Link>
      </h3>
      <div className="img-card">
        <Link to={`/recipes/${recipe._id}`} onClick={handleViewCountIncrease}>
          <img src={recipe.image} className="img" alt={recipe.name} />
        </Link>
      </div>
      <span className="author">Recipe by: {recipe.author}</span>
      <span className="rating">
        Rating: 
        {Math.round(recipe.averageRate * 100) / 100 === 0
          ? "unrated"
          : Math.round(recipe.averageRate * 100) / 100}
      </span>
    </section>
  );
};

export default RecipeGridItem;
