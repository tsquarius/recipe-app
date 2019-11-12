import gql from "graphql-tag";

export const FACEBOOK_AUTH = gql`
  mutation FacebookAuth(
    $email: String!
    $username: String!
    $facebookId: String!
  ) {
    facebookAuth(email: $email, username: $username, facebookId: $facebookId) {
      token
      loggedIn
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      loggedIn
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    register(username: $username, email: $email, password: $password) {
      token
      loggedIn
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation LogoutUser($id: ID!) {
    logout(_id: $id) {
      token
      loggedIn
    }
  }
`;

export const VERIFY_USER = gql`
  mutation VerifyUser($token: String!) {
    verifyUser(token: $token) {
      loggedIn
    }
  }
`;

export const INCREASE_VIEW_COUNT = gql`
  mutation IncreaseViewCount($id: ID!) {
    increaseViewCount(_id: $id) {
      _id
      viewCount
    }
  }
`;

export const SUBMIT_NEW_RECIPE = gql`
  mutation SubmitNewRecipe(
    $name: String!
    $description: String
    $ingredients: [String]
    $steps: [String]
    $image: String
  ) {
    newRecipe(
      name: $name
      description: $description
      ingredients: $ingredients
      steps: $steps
      image: $image
    ) {
      _id
      name
      description
      image
      steps
      ingredients
      author
    }
  }
`;

export const UPDATE_RECIPE = gql`
  mutation UpdateRecipe(
    $id: ID!
    $name: String
    $description: String
    $ingredients: [String]
    $steps: [String]
    $image: String
  ) {
    updateRecipe(
      id: $id
      name: $name
      description: $description
      ingredients: $ingredients
      steps: $steps
      image: $image
    ) {
      _id
      name
      description
      image
      steps
      ingredients
      author
    }
  }
`;

export const RATE_RECIPE = gql`
  mutation RateRecipe($id: ID!, $rating: Num) {
    rateRecipe(id: $id, rating: $rating) {
      _id
      averageRate
    }
  }
`;