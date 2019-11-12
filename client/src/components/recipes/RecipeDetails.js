import React from "react";
import { Query } from "react-apollo";
import { FETCH_RECIPE, IS_AUTHOR } from "../../graphql/queries";
import ImageUpload from "./RecipeImageUpload";

const RecipeDetails = props => {
  const recipeId = props.match.params.recipeId;

  // used to map steps & ingredients, which are in an array
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

        return [
          <div key="details" className="main-content-row">
            <h3>{data.recipe.name}</h3>
            <img
              src={data.recipe.image}
              alt="recipe"
              style={{ width: "300px", height: "300px" }}
            />
            <ul>
              <h4>Ingredients</h4>
              {generateListItems(data.recipe.ingredients)}
            </ul>
            <ol>
              <h4>Cooking Instructions</h4>
              {generateListItems(data.recipe.steps)}
            </ol>
          </div>,
          <Query key="access" query={IS_AUTHOR} variables={{ id: recipeId }}>
            {({ loading, error, data }) => {
              if (loading)
                return (
                  <div className="main-content-row">
                    <p>Loading...</p>
                  </div>
                );
              if (error) return null;
              if (data.isAuthor.hasAccess) {
                return <ImageUpload key="imageUpload" recipeId={recipeId} />;
              } else {
                return <p>"" {console.log(data.isAuthor)}</p>;
              }
            }}
          </Query>
        ];
      }}
    </Query>
  );
};

export default RecipeDetails;
