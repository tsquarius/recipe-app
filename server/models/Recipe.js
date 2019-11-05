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
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

RecipeSchema.statics.updateRating = (id, user, rating) => {
  const Recipe = mongoose.model("recipes");
  return Recipe.findById(id).then(recipe => {
    recipe.rating.forEach(rater => {
      if (rater.user === user) {
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
      if (rater.user === user) {
        recipe.rating.pull(rater);
      }
    });
    return recipe.save();
  });
};

module.exports = mongoose.model("recipes", RecipeSchema);
