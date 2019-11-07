import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthRoute from "../utils/route_util";

//Components
import Nav from "./Nav";
import Login from "./auth/Login";
import Register from "./auth/Register";


const App = () => {
  return (
    <div>
      <h1>Recipe App</h1>
      <Nav />
      <Switch>
        <AuthRoute
          component={Login}
          path="/login"
          exact={true}
          routeType="auth"
        />
        <AuthRoute
          component={Register}
          path="/register"
          exact={true}
          routeType="auth"
        />
      </Switch>
    </div>
  );
};

export default App;
