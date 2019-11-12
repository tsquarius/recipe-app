import React from "react";
import RecipeGridItem from "./RecipeGridItem";

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
    <aside key="loader" className={loadMore === "none" ? "hide" : "bottom-row"}>
      <button
        onClick={e => {
          e.preventDefault();
          let loadStyle = offset
            ? recipes.length
            : recipes[recipes.length - 1]._id;
          loadMore(loadStyle);
        }}
      >
        load more
      </button>
    </aside>
  ];
};

export default RecipeGridDisplay;
