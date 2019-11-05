import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
import { ApolloLink } from "apollo-link";
import { onError } from "apollo-link-error";
import { HashRouter } from "react-router-dom";
import { VERIFY_USER } from "./graphql/mutations";

// maps our objects to their ids ("_id")
const cache = new InMemoryCache({
  dataIdFromObject: object => object._id || null
});

// allows us to carry info between our two servers (3000 & 5000)
const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
  headers: {
    authorization: localStorage.getItem("auth-token")
  }
});

// helps to log any errors that is received on the backend
const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]), //shows how to fetch data using our crreateHttp
  cache, // pass in the cache from above
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  }
});

// see if we have a token in our cache
const token = localStorage.getItem("auth-token");

// first assume we're logged in if we have a token
cache.writeData({
  data: {
    isLoggedIn: Boolean(token)
  }
});

// next query the backend to see if the token is legit -- return loggedIn status if so
if (token) {
  client
    .mutate({ mutation: VERIFY_USER, variables: { token } })
    .then(({ data }) => {
      cache.writeData({
        data: {
          isLoggedIn: data.verifyUser.loggedIn
        }
      });
    });
}

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <App />
      </HashRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
