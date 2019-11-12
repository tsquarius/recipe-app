import { useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";

import { UPDATE_RECIPE } from "../../graphql/mutations";
import { FETCH_RECIPE } from "../../graphql/queries";

const UpdateImage = props => {
  const { recipeId, url } = props;

  useEffect(() => {
    submitImageUpdate();
  });

  const [updateRecipe] = useMutation(UPDATE_RECIPE, {
    update(cache, {data}) {
      let recipe;
      try {
        recipe = cache.readQuery({ query: FETCH_RECIPE});
      } catch (err) {
        return;
      }

      if (recipe) {
        const recipeObj = recipe.recipe;
        cache.writeQuery({
          query: FETCH_RECIPE,
          data: {recipe: Object.assign(recipeObj, data )}
        });
      }

    }
  });

  const submitImageUpdate = () => {
    updateRecipe({
      variables: {
        id: recipeId,
        image: url
      }
    });
  };

  return null;

};

export default UpdateImage;
