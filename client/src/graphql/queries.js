import gql from "graphql-tag";

export const IS_LOGGED_IN = gql`
  query isUserLoggedIn {
    isLoggedIn @client
  }
`;

export const FETCH_RECIPES = gql`
  query FetchRecipes {
    recipes {
      _id
      name
      image
      rating {
        user
        rating
      }
      author
    }
  }
`;

export const FETCH_RECIPES_PAGINATED = gql`
  query fetchRecipesPaginated($cursor: ID, $limit: Int) {
    recipesPaginated(cursor: $cursor, limit: $limit) {
      _id
      name
      image
      rating {
        user
        rating
      }
      author
    }
  }
`;