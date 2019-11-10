import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthRoute from "../utils/route_util";

//Components
import Nav from "./Nav";
import Login from "./auth/Login";
import Register from "./auth/Register";
import RecipeIndex from "./recipes/RecipeIndex";
import RecipeSearch from "./search/RecipeSearch";
import RecipeDetails from './recipes/RecipeDetails';
import NewRecipe from './recipes/RecipeForm';

const App = () => {
  return (
    <div id="app">
      <header className="main-head">
        <h1>Recipe App</h1>
      </header>
      <nav className="main-nav">
        <Nav />
      </nav>

      <Switch>
        <Route component={NewRecipe} exact path="/recipes/new" />
        <Route component={RecipeDetails} exact path="/recipes/:recipeId" />
        <Route component={RecipeSearch} exact path="/search/" />
        <Route component={RecipeIndex} exact path="/recipes" />
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
      <footer className="main-footer">
        Project by Toan Tran <br />
        Github <br />
        linkedin
      </footer>
    </div>
  );
};

export default App;
