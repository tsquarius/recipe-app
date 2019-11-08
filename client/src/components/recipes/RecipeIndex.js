import React from "react";
import { Query } from "react-apollo";
import { FETCH_RECIPES_PAGINATED } from "../../graphql/queries";
import RecipeGridDisplay from "./RecipeGridDisplay";

const Scroll = props => {

  return (
    <Query
      query={FETCH_RECIPES_PAGINATED}
      variables={{ limit: 8 }}
      // fetchPolicy="cache-and-network"
    >
      {({ loading, error, data, fetchMore }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error occurred...</p>;

        return (
          <RecipeGridDisplay
            recipes={data.recipesPaginated}
            loadMore={(newCursor) =>
              fetchMore({
                query: FETCH_RECIPES_PAGINATED,
                variables: {
                  limit: 8,
                  cursor: newCursor
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  const prevRecipes = prev.recipesPaginated;
                  const newRecipes = fetchMoreResult.recipesPaginated;
                  return {
                    recipesPaginated: [...prevRecipes, ...newRecipes]
                  };
                }
              })
            }
          />
        );
      }}
    </Query>
  );
};

export default Scroll;
