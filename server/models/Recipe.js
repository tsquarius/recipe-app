const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  scrapeId: {
    type: Number,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false
  },
  rating: [
    {
      user: { type: String, required: false },
      rating: { type: Number, required: false }
    }
  ],
  author: {
    type: String,
    required: true
  },
  ingredients: [
    {
      type: String,
      required: true
    }
  ],
  steps: [
    {
      type: String,
      required: true
    }
  ],
  viewCount: {
    type: Number,
    required: false,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  },
  averageRate: {
    type: Number,
    default: function() {
      const reducer = (acc, cv) => {
        return acc + cv;
      };
      const rates = this.rating.map(rater => rater.rating);
      if (rates.length === 0) return;
      return rates.reduce(reducer) / rates.length;
    }
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
});

RecipeSchema.statics.updateRating = (id, user, rating) => {
  const Recipe = mongoose.model("recipes");
  return Recipe.findById(id).then(recipe => {
    recipe.rating.forEach(rater => {
      if (rater.user.toString() === user.toString()) {
        recipe.rating.pull(rater);
      }
    });

    recipe.rating.push({ user, rating });

    return recipe.save();
  });
};

RecipeSchema.statics.removeRating = (id, user) => {
  const Recipe = mongoose.model("recipes");
  return Recipe.findById(id).then(recipe => {
    recipe.rating.forEach(rater => {
      if (rater.user.toString() === user.toString()) {
        recipe.rating.pull(rater);
      }
    });
    return recipe.save();
  });
};

RecipeSchema.statics.addViewCount = id => {
  const Recipe = mongoose.model("recipes");
  return Recipe.findById(id).then(recipe => {
    recipe.viewCount += 1;
    return recipe.save();
  });
};

RecipeSchema.statics.addNewRecipe = (data, currentUser) => {
  const Recipe = mongoose.model("recipes");
  const User = mongoose.model("users");

  return new Recipe(Object.assign(data, { author: currentUser.username }))
    .save()
    .then(recipe => {
      return User.findById(currentUser._id).then(user => {
        user.recipes.push(recipe);
        recipe.user = user;

        return Promise.all([recipe.save(), user.save()]).then(
          ([recipe, user]) => recipe
        );
      });
    });
};

module.exports = mongoose.model("recipes", RecipeSchema);
