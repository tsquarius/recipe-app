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
  query fetchRecipesPaginated($offset: Int, $limit: Int) {
    recipesPaginated(offset: $offset, limit: $limit) {
      _id
      name
      image
      averageRate
      author
    }
  }
`;

export const SEARCH_BY_INGREDIENTS = gql`
  query SearchByIngredients($ingredients: [String], $offset: Int, $limit: Int) {
    ingredientSearch(
      ingredients: $ingredients
      offset: $offset
      limit: $limit
    ) {
      _id
      name
      image
      averageRate
      author
    }
  }
`;

export const FETCH_RECIPE = gql`
  query FetchRecipe($id: ID!) {
    recipe(_id: $id) {
      _id
      name
      image
      averageRate
      author
      ingredients
      steps
      viewCount
    }
  }
`;

export const IS_AUTHOR = gql`
  query IsAuthor($id: ID!) {
    isAuthor(id: $id) {
      hasAccess
    }
  }
`;

export const NEWEST_RECIPE = gql`
  query NewestRecipe {
    newestRecipe {
      _id
      name
      image
      averageRate
      author
      ingredients
      steps
      viewCount
    }
  }
`;
