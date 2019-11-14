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

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faSpinner, faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";

import { faFacebook, faFacebookF } from "@fortawesome/free-brands-svg-icons";

library.add(faSearch, faSpinner, faFacebookF, faFacebook, faAngleDoubleDown);

// maps our objects to their ids ("_id")
const cache = new InMemoryCache({
  dataIdFromObject: object => object._id || null
});

let uri;
if (process.env.NODE_ENV === "production") {
  uri = `/graphql`;
} else {
  uri = "http://localhost:5000/graphql";
}

const httpLink = createHttpLink({
  uri: uri,
  headers: {
    authorization: localStorage.getItem("auth-token") || ""
  }
});

// helps to log any errors that is received on the backend
const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]), 
  cache, 
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
