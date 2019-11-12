import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import AuthRoute from "../utils/route_util";

//Components
import Nav from "./Nav";
import Welcome from './Welcome';
import Login from "./auth/Login";
import Register from "./auth/Register";
import RecipeIndex from "./recipes/RecipeIndex";
import RecipeSearch from "./search/RecipeSearch";
import RecipeDetails from "./recipes/RecipeDetails";
import NewRecipe from "./recipes/RecipeForm";

const App = () => {
  return (
    <div id="app">
      <header className="main-head">
        <h1>
          <Link to="/recipes">forage</Link>
        </h1>
      </header>
      <Nav />

      <Switch>
        <Route exact path="/" component={Welcome} />
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
        <p>
          Thank you so much for viewing my project.
        </p>
        <a href="https://github.com/tsquarius/">Visit my Github</a> <br />
      </footer>
    </div>
  );
};

export default App;
