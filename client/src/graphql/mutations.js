import gql from "graphql-tag";

export const FACEBOOK_AUTH = gql`
  mutation FacebookAuth($email: String!, $username: String!, $facebookId: String!) {
    facebookAuth(email: $email, username: $username, facebookId: $facebookId) {
      token
      loggedIn
    }
  }
`

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
    increaseViewCout(_id: $id) {
      _id
      viewCount
    }
  }
`;