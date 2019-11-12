import React from "react";
import { Query } from "react-apollo";
import { FETCH_RECIPES_PAGINATED } from "../../graphql/queries";
import RecipeGridDisplay from "./RecipeGridDisplay";
import NewestRecipes from './NewestRecipesIndex';

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

        return [
          <div key="header1" className="main-content-row">
            <h2>Latest submissions</h2>
          </div>,
          <NewestRecipes key="newest" />,
          <div key="header2" className="main-content-row">
            <h2>Browse throgh our collection</h2>
          </div>,
          <RecipeGridDisplay
            key="index"
            recipes={data.recipesPaginated}
            loadMore={newCursor =>
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
        ];
      }}
    </Query>
  );
};

export default Scroll;
