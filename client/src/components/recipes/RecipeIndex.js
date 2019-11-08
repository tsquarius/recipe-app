import React from "react";

const RecipeIndex = props => {
  const { recipes, loadMore } = props;

  const indexGrid = () => {
    const rows = [];
    recipes.forEach((recipe, idx) => {
      let rowNum = Math.floor(idx/4);
      if (rows[rowNum]) {
        rows[rowNum].push(recipe);
       } else {
         rows[rowNum] = [recipe];
       }
    });

    return rows.map((row,idx) => 
      <div className="grid-row" key={idx}>
        {row.map(recipe => (
          <section className="grid-col" key={recipe._id}>
            <h3>{recipe.name}</h3>
            {/* <div className="img-card">
              <img src={recipe.image} className="img" />
            </div> */}
            <span className="rating">Ratings</span>
            <span className="author">{recipe.author}</span>
          </section>
        ))}
      </div>
    )
  };

  return [
    indexGrid(),
    <aside key="loader" className="bottom-row">
      <button
        onClick={e => {
          e.preventDefault();
          let newCursor = recipes[recipes.length - 1]._id;
          loadMore(newCursor);
        }}
      >
        load more
      </button>
    </aside>
  ];
};

export default RecipeIndex;
