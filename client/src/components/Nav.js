import React from "react";
import { Query, ApolloConsumer } from "react-apollo";
import { Link, withRouter } from "react-router-dom";
import { IS_LOGGED_IN } from "../graphql/queries";
import FacebookAuth from "./auth/fbAuth";

import SearchBar from "./search/SearchBar";

const Nav = props => {
  const logoutUser = (e, client) => {
    e.preventDefault();
    localStorage.removeItem("auth-token");
    client.writeData({ data: { isLoggedIn: false } });
    window.location.reload();
  };

  return (
    <ApolloConsumer>
      {client => (
        <Query query={IS_LOGGED_IN}>
          {({ loading, error, data }) => {
            if (loading) return <h1>Loading...</h1>;
            if (error) return <h1>Error</h1>;

            if (data.isLoggedIn) {
              return [
                <button key="userNav" onClick={e => logoutUser(e, client)}>Logout</button>,
                <SearchBar key="search" />,
                <Link key="newRecipe" to="/recipes/new">Submit a recipe</Link>
              ];
            } else {
              return (
                <div>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                  <FacebookAuth />
                </div>
              );
            }
          }}
        </Query>
      )}
    </ApolloConsumer>
  );
};

export default withRouter(Nav);
