import React from "react";
import { Query } from "react-apollo";
import { FETCH_RECIPE } from "../../graphql/queries";
import ImageUpload from "./RecipeImageUpload";
import RateRecipe from "./RateRecipe";
import { Loading, ErrorMsg } from "../utils/HelperComponents";

const RecipeDetails = props => {
  const recipeId = props.match.params.recipeId;

  // used to map steps & ingredients, which are in an array
  const generateListItems = list => {
    return list.map(item => <li key={item}>{item}</li>);
  };

  return (
    <Query query={FETCH_RECIPE} variables={{ id: recipeId }}>
      {({ loading, error, data }) => {
        if (loading) return <Loading />;
        if (error) return <ErrorMsg />;
        if (!data.recipe)
          return (
            <div className="main-content-row">
              <p>Recipe not found...</p>
            </div>
          );

        return [
          <div key="details" className="main-content-row">
            <h3>{data.recipe.name}</h3>
            <img
              src={data.recipe.image}
              alt="recipe"
              style={{ width: "300px", height: "300px" }}
            />
            <ul>
              <h4 id="ingredients">Ingredients</h4>
              {generateListItems(data.recipe.ingredients)}
            </ul>
            <ol>
              <h4 id="instructions">Cooking Instructions</h4>
              {generateListItems(data.recipe.steps)}
            </ol>
          </div>,
          <ImageUpload key="image" recipeId={recipeId} />,
          <RateRecipe key="rating" recipeId={recipeId} />
        ];
      }}
    </Query>
  );
};

export default RecipeDetails;
