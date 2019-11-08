import React from "react";
import { Query } from "react-apollo";
import { SEARCH_BY_INGREDIENTS } from "../../graphql/queries";
import RecipeGridDisplay from "../recipes/RecipeGridDisplay";

const RecipeSearch = props => {
  const searchParams = props.location.search.replace("%20", " ").split(", ");
  const searchType = props.location.hash.substr(1);

  console.log(searchParams);

  return (
    <Query
      query={SEARCH_BY_INGREDIENTS}
      variables={{
        ingredients: searchParams,
        limit: 8,
        offset: 0,
        method: searchType
      }}
    >
      {({ loading, error, data, fetchMore }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error...</p>;

        return (
          <RecipeGridDisplay
            recipes={data.ingredientSearch}
            offset={true}
            loadMore={offset =>
              fetchMore({
                query: SEARCH_BY_INGREDIENTS,
                variables: {
                  ingredients: searchParams,
                  limit: 8,
                  offset: offset,
                  method: searchType
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  const prevRecipes = prev.ingredientSearch;
                  const newRecipes = fetchMoreResult.ingredientSearch;
                  return {
                    ingredientSearch: [...prevRecipes, ...newRecipes]
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

export default RecipeSearch;
