import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Query } from "react-apollo";
import { IS_LOGGED_IN } from "../graphql/queries";

const AuthRoute = ({
  component: Component,
  path,
  exact,
  routeType, // routeType = "auth" => require to be logged out
  ...rest
}) => (
  <Query query={IS_LOGGED_IN}>
    {({ data }) => {
      // if require logged out status...
      if (routeType === "auth") {
        return (
          <Route
            path={path}
            exact={exact}
            render={props =>
              !data.isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
            }
          />
        );
      }
      // if require logged in status...
      else {
        return (
          <Route
            {...rest}
            render={props =>
              data.isLoggedIn ? (
                <Component {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
        );
      }
    }}
  </Query>
);

export default AuthRoute;
