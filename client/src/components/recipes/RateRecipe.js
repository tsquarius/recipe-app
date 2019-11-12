import React, { useState } from "react";
import { Mutation, Query } from "react-apollo";
import { RATE_RECIPE } from "../../graphql/mutations";
import { IS_LOGGED_IN } from "../../graphql/queries";
import { Loading, ErrorMsg } from "../utils/HelperComponents";

const RateRecipe = props => {
  const { recipeId } = props;
  const [rating, setRating] = useState(1);
  const [message, setMessage] = useState("");

  const changeRating = e => {
    setRating(e.target.value);
  };

  const submitRating = (e, rateRecipe) => {
    e.preventDefault();
    rateRecipe({
      variables: {
        id: recipeId,
        rating: parseInt(rating)
      }
    }).then(data => {
      if (!data) {
        setMessage(
          "Your rating did not go through. Please make sure you're logged"
        );
      }
    });
  };

  const rateValueOptions = () => {
    return Array.from(Array(6).keys())
      .slice(1)
      .map(rate => (
        <option key={rate} value={rate}>
          {rate}
        </option>
      ));
  };

  return (
    <Query query={IS_LOGGED_IN}>
      {({ loading, error, data }) => {
        if (loading) return <Loading />;
        if (error) return <ErrorMsg />;
        if (data.isLoggedIn) {
          return (
            <Mutation
              mutation={RATE_RECIPE}
              onCompleted={data => {
                setMessage(`You have rated this recipe a ${rating}`);
              }}
            >
              {(rateRecipe, { data }) => {
                return (
                  <div className="main-content-row">
                    <form onSubmit={e => submitRating(e, rateRecipe)}>
                      <select value={rating} onChange={changeRating}>
                        {rateValueOptions()}
                      </select>
                      <button type="submit">Rate!</button>
                    </form>
                    <p>{message}</p>
                  </div>
                );
              }}
            </Mutation>
          );
        } else {
          return null;
        }
      }}
    </Query>
  );
};

export default RateRecipe;
