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

module.exports = mongoose.model("recipes", RecipeSchema);
