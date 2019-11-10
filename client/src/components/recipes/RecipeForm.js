import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { SUBMIT_NEW_RECIPE } from "../../graphql/mutations";

const RecipeForm = props => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState({ 0: "" });

  //note the value thet gets pushed into here is irrelevant
  //we just want to keep track of the number of elements here (index)
  const [ingredientFormHelper, setIngredientsFormHelper] = useState([0]);

  const [steps, setSteps] = useState({ 0: "" });
  const [stepsFormHelper, setStepsFormHelper] = useState([0]);

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handleDescriptionChange = e => {
    setDescription(e.target.value);
  };

  const handleIngredientsChange = (e, id) => {
    setIngredients(Object.assign({}, ingredients, { [id]: e.target.value }));
  };

  const handleStepsChange = (e, id) => {
    setSteps(Object.assign({}, ingredients, { [id]: e.target.value }));
  };

  const handleSubmit = (e, newRecipe) => {
    e.preventDefault();
    newRecipe({
      variables: {
        name,
        description,
        ingredients: Object.values(ingredients),
        steps: Object.values(steps)
      }
    }).then(data => {
      if (!data) {
        setMessage(
          "Unable to submit. Please make sure you're logged in and try again"
        );
      } else {
        props.history.push(`/recipes/${data.data.newRecipe._id}`);
      }
    });
  };

  const addAnotherListItem = (e, type) => {
    e.preventDefault();
    if (type === "ingredient") {
      setIngredientsFormHelper([...ingredientFormHelper, 1]);
    } else {
      setStepsFormHelper([...stepsFormHelper, 1]);
    }
  };

  return (
    <Mutation
      mutation={SUBMIT_NEW_RECIPE}
      onError={err => setMessage(err.message)}
      onCompleted={data => {
        const { name } = data.newRecipe;
        setMessage(`${name} has been uploaded successfully!`);
      }}
    >
      {(newRecipe, { data }) => (
        <div className="main-content-row">
          <h2>Submit a Recipe!</h2>
          <form onSubmit={e => handleSubmit(e, newRecipe)}>
            <input
              value={name}
              onChange={handleNameChange}
              placeholder="Recipe name"
            />
            <input
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Recipe description"
            />
            <div>
              {ingredientFormHelper.map((el, idx) => (
                <input
                  key={idx}
                  value={ingredients[idx]}
                  onChange={e => handleIngredientsChange(e, idx)}
                  placeholder="Enter an ingredient"
                />
              ))}
              <button onClick={e => addAnotherListItem(e, "ingredient")}>
                Add another ingredient
              </button>
            </div>
            <div>
              {stepsFormHelper.map((el, idx) => (
                <input
                  key={idx}
                  value={steps[idx]}
                  onChange={e => handleStepsChange(e, idx)}
                  placeholder="Enter a step"
                />
              ))}
              <button onClick={e => addAnotherListItem(e, "step")}>
                Add another step
              </button>
            </div>
            <button type="submit">Submit Recipe</button>
          </form>
          <p>{message}</p>
        </div>
      )}
    </Mutation>
  );
};

export default RecipeForm;
