import React from "react";
import { Query } from "react-apollo";
import { NEWEST_RECIPE } from "../../graphql/queries";
import RecipeGridDisplay from "./RecipeGridDisplay";

const NewestRecipes = props => {
  return (
    <Query query={NEWEST_RECIPE}>
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

        return (
          <RecipeGridDisplay offset="none" recipes={data.newestRecipe} />
        );
      }}
    </Query>
  );
};

export default NewestRecipes;
