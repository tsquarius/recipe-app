import React from "react";
import RecipeGridItem from "./RecipeGridItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Loader = styled.aside`
  display: ${props => props.offset === "none" ? 'none' : 'flex'};
  justify-content: center;
  align-content: center;
`;

const LoadButton = styled.button`
  width: 40%
`;


const RecipeGridDisplay = props => {
  const { recipes, loadMore, offset } = props;

  const indexGrid = () => {
    const rows = [];
    recipes.forEach((recipe, idx) => {
      const rowNum = Math.floor(idx / 4);
      if (rows[rowNum]) {
        rows[rowNum].push(recipe);
      } else {
        rows[rowNum] = [recipe];
      }
    });

    return rows.map((row, idx) => (
      <div className="grid-row" key={idx}>
        {row.map(recipe => (
          <RecipeGridItem key={recipe._id} recipe={recipe} />
        ))}
      </div>
    ));
  };

  return [
    //render grid
    indexGrid(),
    //"load more" button in the bottom
    <Loader key="loader" offset={offset} loadMore className="bottom-row">
      <LoadButton
        onClick={e => {
          e.preventDefault();
          let loadStyle = offset
            ? recipes.length
            : recipes[recipes.length - 1]._id;
          loadMore(loadStyle);
        }}
      >
        Load More <br />
        <FontAwesomeIcon title="load more" icon="angle-double-down" />
      </LoadButton>
    </Loader>
  ];
};

export default RecipeGridDisplay;
