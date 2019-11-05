import React from "react";
import { Query, ApolloConsumer } from "react-apollo";
import { Link, withRouter } from "react-router-dom";
import { IS_LOGGED_IN } from "../graphql/queries";

const Nav = props => {

  const logoutUser = (e, client) => {
    e.preventDefault();
    localStorage.removeItem("auth-token");
    client.writeData({ data: { isLoggedIn: false } });
    props.history.push("/");
  };

  return (
    <ApolloConsumer>
      {client => (
        <Query query={IS_LOGGED_IN}>
          {({ loading, error, data }) => {
            if (loading) return <h1>Loading...</h1>;
            if (error) return <h1>Error</h1>;

            if (data.isLoggedIn) {
              return (
                <button onClick={e => logoutUser(e, client)}>Logout</button>
              );
            } else {
              return (
                <div>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
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
