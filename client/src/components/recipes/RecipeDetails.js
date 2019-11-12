import React from "react";
import { Query } from "react-apollo";
import { FETCH_RECIPE } from "../../graphql/queries";
import ImageUpload from "./RecipeImageUpload";
import RateRecipe from "./RateRecipe";
import { Loading, ErrorMsg } from "../utils/HelperComponents";
import styled from "styled-components";

const SubText = styled.p`
  font-size: 14px;
`;

const List = styled.ul`
  padding: 20px;
  text-align: left;
  li:nth-of-type(odd) {
    background: rgba(0, 0, 0, 0.1);
  }
`;
const RecipeDetails = props => {
  const recipeId = props.match.params.recipeId;

  // used to map steps & ingredients, which are in an array
  const generateListItems = list => {
    return list.map((item,idx) => <li key={idx}>{item}</li>);
  };

  return (
    <Query query={FETCH_RECIPE} variables={{ id: recipeId }}>
      {({ loading, error, data }) => {
        if (loading) return <Loading />;
        if (error) return <ErrorMsg />;
        if (!data.recipe)
          return (
            <div className="main-content-row">
              <p>Recipe not found...</p>
            </div>
          );

        return [
          <div key="details" className="main-content-row">
            <header className="detail-col">
              <h2>{data.recipe.name}</h2>
              <SubText>
                Rated:{" "}
                {Math.round(data.recipe.averageRate * 100) / 100 === 0
                  ? "unrated"
                  : Math.round(data.recipe.averageRate * 100) / 100 +
                    " out of 5"}
              </SubText>
              <img
                src={data.recipe.image}
                alt="recipe"
                className="img"
                style={{ width: "100%", height: "300px" }}
              />
            </header>
            <List key="ingredients" className="details-col">
              <h3 id="ingredients">Ingredients</h3>
              {generateListItems(data.recipe.ingredients)}
            </List>
            <List key="instructions" className="detail-col">
              <h3 id="instructions">Cooking Instructions</h3>
              {generateListItems(data.recipe.steps)}
            </List>
          </div>,
          <ImageUpload key="image" recipeId={recipeId} />,
          <RateRecipe key="rating" recipeId={recipeId} />
        ];
      }}
    </Query>
  );
};

export default RecipeDetails;
