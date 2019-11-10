import React from "react";
import { Query } from "react-apollo";
import { FETCH_RECIPE } from "../../graphql/queries";

const RecipeDetails = props => {
  const recipeId = props.match.params.recipeId;

  const generateListItems = list => {
    return list.map(item => <li key={item}>{item}</li>);
  };

  return (
    <Query query={FETCH_RECIPE} variables={{ id: recipeId }}>
      {({ loading, error, data }) => {

        if (loading)
          return (
            <div className="main-content-row">
              <p>Loading...</p>
            </div>
          );
        if (error)
          return (
            <div className="main-content-row">
              <p>Unexpected error has occurred</p>
            </div>
          );
        if (!data.recipe)
          return (
            <div className="main-content-row">
              <p>Recipe not found...</p>
            </div>
          );

        return (
          <div className="main-content-row">
            <h3>{data.recipe.name}</h3>
            <ul>
              <h4>Ingredients</h4>
              {generateListItems(data.recipe.ingredients)}
            </ul>
            <ol>
              <h4>Cooking Instructions</h4>
              {generateListItems(data.recipe.steps)}
            </ol>
          </div>
        );
      }}
    </Query>
  );
};

export default RecipeDetails;
