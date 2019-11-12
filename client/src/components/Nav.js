import React from "react";
import { Query, ApolloConsumer } from "react-apollo";
import { Link, withRouter } from "react-router-dom";
import { IS_LOGGED_IN } from "../graphql/queries";
import FacebookAuth from "./auth/fbAuth";
import { Loading, ErrorMsg } from "./utils/HelperComponents";
import SearchBar from "./search/SearchBar";

const Nav = props => {
  const logoutUser = (e, client) => {
    e.preventDefault();
    localStorage.removeItem("auth-token");
    client.writeData({ data: { isLoggedIn: false } });
    if (window.FB) window.FB.logout();
  };

  return (
    <ApolloConsumer>
      {client => (
        <Query query={IS_LOGGED_IN}>
          {({ loading, error, data }) => {
            if (loading) return <Loading />;
            if (error) return <ErrorMsg />;
            if (data.isLoggedIn) {
              return [
                <nav key="search" className="main-nav">
                  <SearchBar />
                </nav>,
                <nav key="submit" className="main-nav-left">
                  <Link className="button" key="newRecipe" to="/recipes/new">
                    Submit a recipe
                  </Link>
                </nav>,
                <div key="userNav" className="main-nav-auth">
                  <button title="logout" onClick={e => logoutUser(e, client)}>
                    Logout
                  </button>
                </div>
              ];
            } else {
              return [
                <nav key="search" className="main-nav out">
                  <SearchBar />
                </nav>,
                <div key="auth" className="main-nav-auth">
                  <Link title="login" className="button" to="/login">
                    Login
                  </Link>
                  <Link title="register" className="button" to="/register">
                    Register
                  </Link>
                  <FacebookAuth />
                </div>
              ];
            }
          }}
        </Query>
      )}
    </ApolloConsumer>
  );
};

export default withRouter(Nav);
