import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { SUBMIT_NEW_RECIPE } from "../../graphql/mutations";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: auto;
`;

const Input = styled.input`
  width: 70%;
  margin: auto;
  margin-bottom: 5px;
  border-radius: 10px;
  border: 1px solid lightgray;
  padding: 10px;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const AddButton = styled.button`
  width: 1.5em;
  margin: auto;
  border-radius: 50%;
`;

const SubmitButton = styled.button`
  background: #eca2ff;
  @media (min-width: 700px) {
    width: 30%;
    margin: auto;
    font-size: 20px;
  }
`;

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
    setSteps(Object.assign({}, steps, { [id]: e.target.value }));
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
        <div className="main-content-section">
          <h2>Submit a Recipe!</h2>
          <Form onSubmit={e => handleSubmit(e, newRecipe)}>
            <Input
              title="Recipe name"
              value={name}
              onChange={handleNameChange}
              placeholder="Recipe name"
            />
            <Input
              title="Description"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Recipe description"
            />
            <ListContainer>
              {ingredientFormHelper.map((el, idx) => (
                <Input
                  title="Ingredients"
                  key={idx}
                  value={ingredients[idx]}
                  onChange={e => handleIngredientsChange(e, idx)}
                  placeholder="Enter an ingredient"
                />
              ))}
              <AddButton
                title="add another ingredient"
                onClick={e => addAnotherListItem(e, "ingredient")}
              >
                +
              </AddButton>
            </ListContainer>
            <ListContainer>
              {stepsFormHelper.map((el, idx) => (
                <Input
                  title="Step"
                  key={idx}
                  value={steps[idx]}
                  onChange={e => handleStepsChange(e, idx)}
                  placeholder="Enter a step"
                />
              ))}
              <AddButton
                title="add another step"
                onClick={e => addAnotherListItem(e, "step")}
              >
                +
              </AddButton>
            </ListContainer>
            <SubmitButton title="Submit" type="submit">
              Submit Recipe
            </SubmitButton>
          </Form>
          <p>{message}</p>
        </div>
      )}
    </Mutation>
  );
};

export default RecipeForm;
